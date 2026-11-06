<?php
/**
 * GBC Lead endpoint — receives form submissions from React,
 * saves the lead via Resend email, sends Meta CAPI Lead event,
 * and returns { success, eventId } so the browser Pixel can deduplicate.
 */

header('Content-Type: application/json; charset=utf-8');

// Allow the website origin (adjust for production domain).
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'POST only']);
    exit;
}

// ── Load secrets ──
if (!file_exists(__DIR__ . '/config.php')) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server config missing: upload api/meta/config.php']);
    exit;
}
require_once __DIR__ . '/config.php';

// ── Parse body (supports both JSON and text/plain from the React helper) ──
$raw = file_get_contents('php://input');
$body = json_decode($raw, true);
if (!$body) {
    echo json_encode(['success' => false, 'error' => 'Invalid request body.']);
    exit;
}

// ── Clean & validate ──
$name     = mb_substr(trim($body['name'] ?? ''), 0, 120);
$email    = mb_substr(trim(strtolower($body['email'] ?? '')), 0, 160);
$phone    = mb_substr(trim($body['phone'] ?? ''), 0, 40);
$message  = mb_substr(trim($body['message'] ?? ''), 0, 3000);
$formName = mb_substr(trim($body['formName'] ?? 'unknown'), 0, 50);
$pageUrl  = mb_substr(trim($body['pageUrl'] ?? ''), 0, 500);
$ua       = mb_substr(trim($body['userAgent'] ?? ''), 0, 500);
$fbp      = mb_substr(trim($body['fbp'] ?? ''), 0, 200);
$fbc      = mb_substr(trim($body['fbc'] ?? ''), 0, 300);

if (!$email && !$phone) {
    echo json_encode(['success' => false, 'error' => 'Email or phone is required.']);
    exit;
}
if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Please enter a valid email address.']);
    exit;
}

// ── Generate event ID for deduplication ──
$eventId = sprintf(
    '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
    mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff),
    mt_rand(0, 0x0fff) | 0x4000, mt_rand(0, 0x3fff) | 0x8000,
    mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
);

// ── 1. Send lead email via Resend ──
$emailStatus = 'skipped';
if (defined('RESEND_API_KEY') && RESEND_API_KEY) {
    $subject = "New lead ({$formName}): " . ($name ?: $email ?: $phone);
    $htmlBody  = "<h2>New Website Lead</h2>";
    $htmlBody .= "<p><strong>Form:</strong> {$formName}</p>";
    $htmlBody .= "<p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>";
    $htmlBody .= "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>";
    $htmlBody .= "<p><strong>Phone:</strong> " . htmlspecialchars($phone) . "</p>";
    $htmlBody .= "<p><strong>Page:</strong> " . htmlspecialchars($pageUrl) . "</p>";
    if ($message) {
        $htmlBody .= "<hr><p>" . nl2br(htmlspecialchars($message)) . "</p>";
    }
    $htmlBody .= "<hr><p style='color:#999;font-size:12px'>Event ID: {$eventId}</p>";

    $resendPayload = json_encode([
        'from'    => MAIL_FROM_NAME . ' <' . MAIL_FROM_EMAIL . '>',
        'to'      => [CONTACT_TO],
        'subject' => $subject,
        'html'    => $htmlBody,
        'reply_to' => $email ?: null,
    ]);

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . RESEND_API_KEY,
        ],
        CURLOPT_POSTFIELDS     => $resendPayload,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
    ]);
    $resendRes  = curl_exec($ch);
    $resendCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $emailStatus = ($resendCode >= 200 && $resendCode < 300) ? 'sent' : "FAILED:{$resendCode}";
    if ($emailStatus !== 'sent') {
        error_log("Resend failed [{$resendCode}]: {$resendRes}");
    }
}

// ── 2. Send Meta CAPI Lead event ──
$capiStatus = 'skipped';
if (defined('META_DATASET_ID') && META_DATASET_ID && defined('META_ACCESS_TOKEN') && META_ACCESS_TOKEN) {
    $capiStatus = sendMetaCapi($eventId, $email, $phone, $name, $pageUrl, $ua, $fbp, $fbc, $formName);
}

// ── 3. Log to a local CSV (backup) ──
$logFile = __DIR__ . '/leads.csv';
$isNew = !file_exists($logFile);
$fp = fopen($logFile, 'a');
if ($fp) {
    if ($isNew) fputcsv($fp, ['Timestamp','Form','Name','Email','Phone','Message','Page','EventID','Email Status','CAPI Status']);
    fputcsv($fp, [date('c'), $formName, $name, $email, $phone, $message, $pageUrl, $eventId, $emailStatus, $capiStatus]);
    fclose($fp);
}

// ── 4. Return success to React ──
echo json_encode(['success' => true, 'eventId' => $eventId]);
exit;


// ════════════════════════════════════════════════════════════════
// Meta Conversions API helper
// ════════════════════════════════════════════════════════════════

function sendMetaCapi($eventId, $email, $phone, $name, $pageUrl, $ua, $fbp, $fbc, $formName) {
    $userData = [];
    if ($ua)    $userData['client_user_agent'] = $ua;
    if ($email) $userData['em'] = [hash('sha256', strtolower(trim($email)))];

    $normPhone = normalizePhone($phone);
    if ($normPhone) $userData['ph'] = [hash('sha256', $normPhone)];

    $firstName = $name ? explode(' ', trim($name))[0] : '';
    if ($firstName) $userData['fn'] = [hash('sha256', strtolower(trim($firstName)))];

    if ($fbp) $userData['fbp'] = $fbp;
    if ($fbc) $userData['fbc'] = $fbc;

    // Get the real client IP (behind proxy).
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['HTTP_X_REAL_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? '';
    if ($ip) {
        // X-Forwarded-For can be comma-separated; take the first (original client).
        $ip = trim(explode(',', $ip)[0]);
        $userData['client_ip_address'] = $ip;
    }

    $payload = [
        'data' => [[
            'event_name'      => 'Lead',
            'event_time'      => time(),
            'event_id'        => $eventId,
            'action_source'   => 'website',
            'event_source_url'=> $pageUrl,
            'user_data'       => $userData,
            'custom_data'     => ['content_name' => $formName],
        ]],
    ];

    if (defined('META_TEST_EVENT_CODE') && META_TEST_EVENT_CODE) {
        $payload['test_event_code'] = META_TEST_EVENT_CODE;
    }

    $url = 'https://graph.facebook.com/' . META_API_VERSION . '/' . META_DATASET_ID
         . '/events?access_token=' . urlencode(META_ACCESS_TOKEN);

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS     => json_encode($payload),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
    ]);
    $res  = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($code >= 200 && $code < 300) {
        return 'sent';
    }
    error_log("Meta CAPI failed [{$code}]: {$res}");
    return "FAILED:{$code}";
}

function normalizePhone($phone) {
    $digits = preg_replace('/\D/', '', $phone);
    if (!$digits) return '';
    // Strip leading 00 (international prefix).
    if (strpos($digits, '00') === 0) $digits = substr($digits, 2);
    // Local UAE number (0501234567) → add 971.
    if (strlen($digits) === 10 && $digits[0] === '0') $digits = '971' . substr($digits, 1);
    return $digits;
}
