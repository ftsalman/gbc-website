// Production entry for the lead API (`npm start` in server/). In development it runs inside `npm run dev`.
import { createApp } from "./app.js";
import { createMailer } from "./mail.js";
import { createMetaTracker } from "./meta.js";

const { MAIL_FROM, CONTACT_TO, PORT = 3001, CORS_ORIGIN } =
  process.env;

if (!MAIL_FROM || !CONTACT_TO?.split(",").some((email) => email.trim())) {
  console.error("Set MAIL_FROM and CONTACT_TO in .env before starting the contact API.");
  process.exit(1);
}

let mailer;
try {
  mailer = createMailer(process.env);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
if (mailer.provider === "resend" && /@resend\.dev\b/i.test(MAIL_FROM)) {
  console.warn(
    "MAIL_FROM uses Resend's test domain, which only sends to your Resend account email. Verify a domain in Resend and update MAIL_FROM to send enquiries to CONTACT_TO.",
  );
}
const metaTracker = createMetaTracker(process.env);
const app = createApp({
  sendEmail: mailer.sendEmail,
  mailFrom: MAIL_FROM,
  contactTo: CONTACT_TO,
  corsOrigin: CORS_ORIGIN,
  metaTracker,
  // TRUST_PROXY=1 when running behind a reverse proxy (nginx, cPanel Node app, etc.)
  trustProxy: /^\d+$/.test(process.env.TRUST_PROXY ?? "") ? Number(process.env.TRUST_PROXY) : process.env.TRUST_PROXY,
});

app.listen(PORT, "0.0.0.0", (error) => {
  if (error) {
    console.error(`Could not start the contact API on port ${PORT}: ${error.message}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Contact API listening on :${PORT} using ${mailer.provider}`);
  console.log(
    metaTracker.enabled
      ? `Meta Conversions API on${metaTracker.testMode ? " (TEST MODE — remove META_TEST_EVENT_CODE for live)" : ""}`
      : "Meta Conversions API off (set META_DATASET_ID and META_ACCESS_TOKEN to enable)",
  );
});
