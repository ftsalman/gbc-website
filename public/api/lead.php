<?php
/**
 * GBC lead endpoint for the live (Apache/PHP) hosting — PHP twin of server/app.js.
 * POST /api/lead (JSON from src/lib/submitLead.js):
 *   1. validate  2. email the lead via SMTP  3. send the Meta CAPI Lead event
 *   4. reply { success: true, eventId } so the browser Pixel can deduplicate.
 * Errors reply { success: false, error }.
 * Secrets live in api/config.php (not in git — copy config.example.php and upload it).
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond($status, $data) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['success' => false, 'error' => 'POST only.']);
}

if (!is_file(__DIR__ . '/config.php')) {
    error_log('GBC lead: api/config.php is missing.');
    respond(500, ['success' => false, 'error' => 'Server config missing: upload api/config.php.']);
}
require __DIR__ . '/config.php';

const FALLBACK_EMAIL = 'sales@connectgbc.com';
const FORM_LABELS = [
    'contact_page'      => 'Contact page',
    'promo_popup'       => 'Home page callback popup',
    'visa_details'      => 'Visa enquiry',
    'footer_newsletter' => 'Footer newsletter',
    'blog_newsletter'   => 'Blog newsletter',
];

$raw = file_get_contents('php://input', false, null, 0, 20480);
$body = json_decode($raw ?: '', true);
if (!is_array($body)) {
    respond(400, ['success' => false, 'error' => 'Invalid request. Please check your details and try again.']);
}

// Honeypot: real users never fill the hidden "website" field.
if (!empty($body['website'])) {
    respond(200, ['success' => true]);
}

function clean($value, $max) {
    return is_string($value) ? mb_substr(trim($value), 0, $max, 'UTF-8') : '';
}
// For values placed in mail headers: no line breaks.
function oneLine($value) {
    return trim(preg_replace('/[\r\n]+/', ' ', $value));
}

$name     = oneLine(clean($body['name'] ?? '', 120));
$email    = strtolower(clean($body['email'] ?? '', 160));
$phone    = oneLine(clean($body['phone'] ?? '', 40));
$message  = clean($body['message'] ?? '', 5000);
$formName = oneLine(clean($body['formName'] ?? '', 50)) ?: 'unknown';
$pageUrl  = oneLine(clean($body['pageUrl'] ?? '', 500));

if ($email === '' && $phone === '') {
    respond(400, ['success' => false, 'error' => 'Email or phone is required.']);
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, ['success' => false, 'error' => 'Please enter a valid email address.']);
}

$label = FORM_LABELS[$formName] ?? $formName;
$rows = array_filter([
    'Form'    => $label,
    'Name'    => $name,
    'Email'   => $email,
    'Phone'   => $phone,
    'Page'    => $pageUrl,
    'Message' => $message,
], 'strlen');

$text = '';
$html = '<table cellpadding="6">';
foreach ($rows as $key => $value) {
    $text .= "$key: $value\n";
    $html .= '<tr><td valign="top"><strong>' . $key . '</strong></td><td style="white-space:pre-wrap">'
           . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . '</td></tr>';
}
$html .= '</table>';

$recipients = array_values(array_filter(array_map('trim', explode(',', CONTACT_TO))));

try {
    smtpSend([
        'to'      => $recipients,
        'replyTo' => $email ?: null,
        'subject' => "GBC website enquiry ($label): " . ($name ?: $email ?: $phone),
        'text'    => $text,
        'html'    => $html,
    ]);
} catch (Throwable $e) {
    error_log('GBC lead email delivery failed: ' . $e->getMessage());
    respond(502, ['success' => false, 'error' => 'We couldn\'t send your message. Please try again later or email ' . FALLBACK_EMAIL . '.']);
}

// Lead delivered — now (and only now) report it to Meta Conversions API.
$bytes = random_bytes(16);
$bytes[6] = chr((ord($bytes[6]) & 0x0f) | 0x40); // UUID v4
$bytes[8] = chr((ord($bytes[8]) & 0x3f) | 0x80);
$eventId = vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($bytes), 4));

if (defined('META_DATASET_ID') && META_DATASET_ID && defined('META_ACCESS_TOKEN') && META_ACCESS_TOKEN) {
    try {
        sendMetaLead($eventId, $email, $phone, $name, $pageUrl, $formName, $body);
    } catch (Throwable $e) {
        error_log('GBC Meta CAPI send failed: ' . $e->getMessage()); // never fail the lead because Meta is down
    }
}

respond(200, ['success' => true, 'eventId' => $eventId]);


// ════════════════════════════════════════════════════════════════
// Minimal SMTP client (SSL on 465, STARTTLS on 587) — same settings as server/mail.js
// ════════════════════════════════════════════════════════════════

function smtpSend($mail) {
    $port = (int) SMTP_PORT;
    $host = SMTP_HOST;
    $secure = $port === 465;
    $context = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true, 'SNI_enabled' => true]]);
    $socket = @stream_socket_client(($secure ? 'ssl://' : 'tcp://') . "$host:$port", $errno, $errstr, 10, STREAM_CLIENT_CONNECT, $context);
    if (!$socket) throw new RuntimeException("SMTP connect failed: $errstr ($errno)");
    stream_set_timeout($socket, 15);

    $read = function () use ($socket) {
        $response = '';
        while (($line = fgets($socket, 1024)) !== false) {
            $response .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') break; // last line of a (multi-line) reply
        }
        return $response;
    };
    $cmd = function ($command, $expect) use ($socket, $read) {
        if ($command !== null) fwrite($socket, $command . "\r\n");
        $response = $read();
        if (!in_array((int) substr($response, 0, 3), (array) $expect, true)) {
            $shown = preg_match('/^AUTH|^[A-Za-z0-9+\/=]+$/', (string) $command) ? '[auth]' : $command;
            throw new RuntimeException("SMTP '$shown' failed: " . trim($response));
        }
        return $response;
    };

    try {
        $cmd(null, 220);
        $helo = 'EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost');
        $cmd($helo, 250);
        if (!$secure) {
            $cmd('STARTTLS', 220);
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT)) {
                throw new RuntimeException('SMTP STARTTLS failed.');
            }
            $cmd($helo, 250);
        }
        $cmd('AUTH LOGIN', 334);
        $cmd(base64_encode(SMTP_USER), 334);
        $cmd(base64_encode(SMTP_PASS), 235);

        $cmd('MAIL FROM:<' . MAIL_FROM_EMAIL . '>', 250);
        foreach ($mail['to'] as $rcpt) $cmd("RCPT TO:<$rcpt>", [250, 251]);
        $cmd('DATA', 354);

        $boundary = 'b' . bin2hex(random_bytes(12));
        $domain = substr(strrchr(MAIL_FROM_EMAIL, '@'), 1);
        $headers = [
            'From: ' . encodeHeader(MAIL_FROM_NAME) . ' <' . MAIL_FROM_EMAIL . '>',
            'To: ' . implode(', ', $mail['to']),
            'Subject: ' . encodeHeader($mail['subject']),
            'Date: ' . date('r'),
            'Message-ID: <' . bin2hex(random_bytes(16)) . "@$domain>",
            'MIME-Version: 1.0',
            "Content-Type: multipart/alternative; boundary=\"$boundary\"",
        ];
        if ($mail['replyTo']) $headers[] = 'Reply-To: ' . $mail['replyTo'];

        $data = implode("\r\n", $headers) . "\r\n\r\n"
              . "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
              . chunk_split(base64_encode($mail['text']))
              . "--$boundary\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
              . chunk_split(base64_encode($mail['html']))
              . "--$boundary--\r\n";
        fwrite($socket, $data);
        $cmd('.', 250);
        fwrite($socket, "QUIT\r\n");
    } finally {
        fclose($socket);
    }
}

function encodeHeader($value) {
    return preg_match('/[^\x20-\x7E]/', $value) ? '=?UTF-8?B?' . base64_encode($value) . '?=' : $value;
}


// ════════════════════════════════════════════════════════════════
// Meta Conversions API (same as server/meta.js)
// ════════════════════════════════════════════════════════════════

function sendMetaLead($eventId, $email, $phone, $name, $pageUrl, $formName, $body) {
    $userData = [
        'client_ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        'client_user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? clean($body['userAgent'] ?? '', 500),
        'fbp' => clean($body['fbp'] ?? '', 200),
        'fbc' => clean($body['fbc'] ?? '', 300),
    ];
    if ($email) $userData['em'] = [hash('sha256', $email)];
    $digits = preg_replace('/\D/', '', $phone);
    if (strpos($digits, '00') === 0) $digits = substr($digits, 2);
    if (strlen($digits) === 10 && $digits[0] === '0') $digits = '971' . substr($digits, 1);
    if ($digits) $userData['ph'] = [hash('sha256', $digits)];
    $first = $name ? strtolower(preg_split('/\s+/', $name)[0]) : '';
    if ($first) $userData['fn'] = [hash('sha256', $first)];
    $userData = array_filter($userData);

    $payload = ['data' => [[
        'event_name'       => 'Lead',
        'event_time'       => time(),
        'event_id'         => $eventId,
        'action_source'    => 'website',
        'event_source_url' => $pageUrl ?: ($_SERVER['HTTP_REFERER'] ?? ''),
        'user_data'        => $userData,
        'custom_data'      => ['content_name' => $formName],
    ]]];
    if (defined('META_TEST_EVENT_CODE') && META_TEST_EVENT_CODE) $payload['test_event_code'] = META_TEST_EVENT_CODE;

    $version = defined('META_API_VERSION') && META_API_VERSION ? META_API_VERSION : 'v23.0';
    $ch = curl_init("https://graph.facebook.com/$version/" . META_DATASET_ID . '/events?access_token=' . urlencode(META_ACCESS_TOKEN));
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS     => json_encode($payload),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 8,
    ]);
    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($code < 200 || $code >= 300) throw new RuntimeException("HTTP $code: $res");
}
