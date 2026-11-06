/**
 * GBC website lead backend — Google Apps Script web app (bound to a Google Sheet).
 *
 * Flow (per the GBC Ads Meta Pixel + CAPI guide):
 *   React form submit -> this doPost validates & saves the lead to the Sheet
 *   -> sends Lead to Meta Conversions API -> returns { success, eventId }
 *   -> React fires the browser Pixel Lead with the same eventId -> Meta deduplicates.
 *
 * Credentials live ONLY in Project Settings > Script Properties (never in React / git):
 *   META_DATASET_ID       Dataset / Pixel ID from Events Manager
 *   META_ACCESS_TOKEN     Conversions API access token
 *   META_API_VERSION      v25.0
 *   META_TEST_EVENT_CODE  e.g. TEST12345 — testing only, DELETE this property for live
 *   NOTIFY_EMAIL          (optional) address that gets an email for every new lead
 *
 * Setup steps: see google-apps-script/README.md
 */

var SHEET_NAME = 'Leads';
var HEADERS = [
  'Timestamp', 'Form', 'Name', 'Email', 'Phone', 'Message',
  'Page URL', 'Event ID', 'Meta CAPI status',
];

function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var lead = cleanLead_(body);

    // 1. Validate.
    if (!lead.email && !lead.phone) return json_({ success: false, error: 'Email or phone is required.' });
    if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
      return json_({ success: false, error: 'Please enter a valid email address.' });
    }

    var eventId = Utilities.getUuid();

    // 2. Save the lead. If this throws, we return failure and NO Lead event is sent.
    var row = saveLead_(lead, eventId);

    // 3. Only after a successful save, send the server Lead to Meta.
    //    A Meta failure must NOT fail the lead — it is already saved; we record the error on the row.
    var capiStatus;
    try {
      sendMetaLead_(lead, eventId);
      capiStatus = 'sent';
    } catch (err) {
      capiStatus = 'FAILED: ' + String(err).slice(0, 400);
      console.error('Meta CAPI send failed: ' + err);
    }
    getSheet_().getRange(row, HEADERS.indexOf('Meta CAPI status') + 1).setValue(capiStatus);

    notify_(lead);

    // 4. Return success + eventId to React (browser Pixel uses the same ID).
    return json_({ success: true, eventId: eventId });
  } catch (err) {
    console.error(err);
    return json_({ success: false, error: 'Server error. Please try again.' });
  }
}

/** Optional: lets you open the web-app URL in a browser to confirm it is deployed. */
function doGet() {
  return json_({ ok: true, service: 'gbc-lead-endpoint' });
}

// ---------------------------------------------------------------------------

function cleanLead_(b) {
  function s(v, max) { return String(v == null ? '' : v).trim().slice(0, max); }
  return {
    formName: s(b.formName, 50),
    name: s(b.name, 120),
    email: s(b.email, 160).toLowerCase(),
    phone: s(b.phone, 40),
    message: s(b.message, 3000),
    pageUrl: s(b.pageUrl, 500),
    userAgent: s(b.userAgent, 500),
    fbp: s(b.fbp, 200),
    fbc: s(b.fbc, 300),
  };
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Appends the lead and returns its row number. Lock prevents two submits colliding. */
function saveLead_(lead, eventId) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = getSheet_();
    // Leading apostrophe stops Sheets treating "=..." input as a formula / "+971..." as a number.
    function safe(v) { return v ? "'" + v : ''; }
    sheet.appendRow([
      new Date(), lead.formName, safe(lead.name), lead.email, safe(lead.phone),
      safe(lead.message), lead.pageUrl, eventId, 'pending',
    ]);
    SpreadsheetApp.flush();
    return sheet.getLastRow();
  } finally {
    lock.releaseLock();
  }
}

function sha256_(value) {
  if (!value) return undefined;
  var bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    String(value).trim().toLowerCase(),
    Utilities.Charset.UTF_8
  );
  return bytes.map(function (b) { return ('0' + (b & 0xff).toString(16)).slice(-2); }).join('');
}

/** Digits only, with country code (Meta requirement). Local UAE numbers (05x...) get 971. */
function normalizePhone_(phone) {
  var d = String(phone || '').replace(/\D/g, '');
  if (!d) return '';
  if (d.indexOf('00') === 0) d = d.slice(2);
  if (d.length === 10 && d.charAt(0) === '0') d = '971' + d.slice(1);
  return d;
}

function sendMetaLead_(lead, eventId) {
  var props = PropertiesService.getScriptProperties();
  var datasetId = props.getProperty('META_DATASET_ID');
  var token = props.getProperty('META_ACCESS_TOKEN');
  var version = props.getProperty('META_API_VERSION');
  var testCode = props.getProperty('META_TEST_EVENT_CODE');
  if (!datasetId || !token || !version) throw new Error('Meta Script Properties are not configured.');

  var firstName = lead.name ? lead.name.split(/\s+/)[0] : '';
  var userData = {
    // Apps Script cannot see the visitor's IP, so client_ip_address is not available here.
    client_user_agent: lead.userAgent || undefined,
    em: lead.email ? [sha256_(lead.email)] : undefined,
    ph: lead.phone ? [sha256_(normalizePhone_(lead.phone))] : undefined,
    fn: firstName ? [sha256_(firstName)] : undefined,
    fbp: lead.fbp || undefined, // never hashed
    fbc: lead.fbc || undefined, // never hashed
  };
  Object.keys(userData).forEach(function (k) {
    if (userData[k] === undefined) delete userData[k];
  });

  var payload = {
    data: [{
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: 'website',
      event_source_url: lead.pageUrl,
      user_data: userData,
      custom_data: { content_name: lead.formName },
    }],
  };
  if (testCode) payload.test_event_code = testCode;

  var url = 'https://graph.facebook.com/' + version + '/' + datasetId + '/events' +
    '?access_token=' + encodeURIComponent(token);

  var res = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });
  var code = res.getResponseCode();
  if (code < 200 || code >= 300) throw new Error(code + ' ' + res.getContentText());
  return JSON.parse(res.getContentText());
}

function notify_(lead) {
  var to = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL');
  if (!to) return;
  try {
    MailApp.sendEmail({
      to: to,
      subject: 'New website lead (' + lead.formName + '): ' + (lead.name || lead.email || lead.phone),
      body: [
        'Form: ' + lead.formName,
        'Name: ' + lead.name,
        'Email: ' + lead.email,
        'Phone: ' + lead.phone,
        'Page: ' + lead.pageUrl,
        '',
        lead.message,
      ].join('\n'),
      replyTo: lead.email || undefined,
    });
  } catch (err) {
    console.error('Notification email failed: ' + err);
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Run this once from the editor to test the Meta connection without the website. */
function testMetaLead() {
  sendMetaLead_({
    formName: 'editor_test', name: 'Test User', email: 'test@example.com', phone: '0501234567',
    pageUrl: 'https://gbccorporate.com/contact', userAgent: 'Apps Script test',
  }, Utilities.getUuid());
  console.log('Sent — check Events Manager > Test Events.');
}
