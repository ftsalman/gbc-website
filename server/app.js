import cors from "cors";
import express from "express";

import crypto from "node:crypto";

// Lead API used by every website form (src/lib/submitLead.js):
//   1. validate  2. email the lead via SMTP (server/mail.js)  3. send the Meta CAPI Lead event
//   4. reply { success: true, eventId } so the browser Pixel sends the same eventId (dedup).
// Errors reply { success: false, error }.

const FALLBACK_EMAIL = "sales@connectgbc.com";

const FORM_LABELS = {
  contact_page: "Contact page",
  promo_popup: "Home page callback popup",
  visa_details: "Visa enquiry",
  footer_newsletter: "Footer newsletter",
  blog_newsletter: "Blog newsletter",
};

export function createApp({ sendEmail, mailFrom, contactTo, corsOrigin, metaTracker, trustProxy }) {
  const app = express();
  // Behind a reverse proxy, lets req.ip be the visitor's IP (for Meta matching).
  if (trustProxy) app.set("trust proxy", trustProxy);

  app.use(express.json({ limit: "20kb" }));
  if (corsOrigin) {
    app.use(cors({ origin: corsOrigin.split(",").map((origin) => origin.trim()).filter(Boolean) }));
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const escape = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (char) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
          char
        ],
    );

  const clean = (value, max) =>
    typeof value === "string" ? value.trim().slice(0, max) : "";

  const fail = (res, status, error) => res.status(status).json({ success: false, error });

  app.post("/api/lead", async (req, res) => {
    const body = req.body ?? {};

    // Honeypot: real users never fill the hidden "website" field.
    if (body.website) return res.json({ success: true });

    const form = {
      name: clean(body.name, 120),
      email: clean(body.email, 160).toLowerCase(),
      phone: clean(body.phone, 40),
      message: clean(body.message, 5000),
      formName: clean(body.formName, 50) || "unknown",
      pageUrl: clean(body.pageUrl, 500),
    };

    if (!form.email && !form.phone) return fail(res, 400, "Email or phone is required.");
    if (form.email && !emailPattern.test(form.email)) {
      return fail(res, 400, "Please enter a valid email address.");
    }

    const label = FORM_LABELS[form.formName] || form.formName;
    const rows = [
      ["Form", label],
      ["Name", form.name],
      ["Email", form.email],
      ["Phone", form.phone],
      ["Page", form.pageUrl],
      ["Message", form.message],
    ].filter(([, value]) => value);

    try {
      const { data, error } = await sendEmail({
        from: mailFrom,
        to: contactTo.split(",").map((email) => email.trim()).filter(Boolean),
        replyTo: form.email || undefined,
        subject: `GBC website enquiry (${label}): ${form.name || form.email || form.phone}`,
        text: rows.map(([key, value]) => `${key}: ${value}`).join("\n"),
        html: `<table cellpadding="6">${rows
          .map(
            ([key, value]) =>
              `<tr><td valign="top"><strong>${key}</strong></td><td style="white-space:pre-wrap">${escape(value)}</td></tr>`,
          )
          .join("")}</table>`,
      });

      if (error) throw error;
      if (!data?.id) throw new Error("Email provider did not accept the enquiry.");

      // Lead delivered — now (and only now) report it to Meta Conversions API.
      const eventId = crypto.randomUUID();
      if (metaTracker?.enabled) {
        try {
          await metaTracker.sendLead({
            eventId,
            email: form.email,
            phone: form.phone,
            name: form.name,
            ip: req.ip,
            userAgent: req.get("user-agent") || clean(body.userAgent, 500),
            fbp: clean(body.fbp, 200) || undefined,
            fbc: clean(body.fbc, 300) || undefined,
            pageUrl: form.pageUrl || req.get("referer"),
            formName: form.formName,
          });
        } catch (metaError) {
          // Never fail the lead because Meta is down.
          console.error("Meta CAPI send failed:", metaError.message);
        }
      }

      res.json({ success: true, eventId });
    } catch (error) {
      console.error("Lead email delivery failed:", error.message);
      fail(res, 502, `We couldn't send your message. Please try again later or email ${FALLBACK_EMAIL}.`);
    }
  });

  // Never return the website HTML for an unknown API route.
  app.use("/api", (_req, res) => fail(res, 404, "API endpoint not found."));

  app.use((error, _req, res, _next) => {
    const status = error.status === 413 ? 413 : error.status === 400 ? 400 : 500;
    fail(
      res,
      status,
      status === 413
        ? "Your message is too long. Please shorten it."
        : status === 400
          ? "Invalid request. Please check your details and try again."
          : "We couldn't send your message. Please try again.",
    );
  });

  return app;
}
