<?php
// Copy to config.php (same folder), fill in, and upload to public_html/api/config.php on the server.
// config.php is git-ignored and blocked from web access — never commit real values.

const MAIL_FROM_NAME  = 'GBC Website';
const MAIL_FROM_EMAIL = 'sales@connectgbc.com';   // must be SMTP_USER (or a verified alias)
const CONTACT_TO      = 'sales@connectgbc.com';   // comma-separated for several recipients

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;                            // 465 = SSL, 587 = STARTTLS
const SMTP_USER = 'sales@connectgbc.com';
const SMTP_PASS = '';                             // Gmail app password

// Meta Conversions API (optional — leave empty to skip)
const META_DATASET_ID      = '';
const META_ACCESS_TOKEN    = '';
const META_API_VERSION     = 'v23.0';
const META_TEST_EVENT_CODE = '';
