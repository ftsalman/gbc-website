import cors from "cors";
import express from "express";

// LOCAL DEVELOPMENT stand-in for public/api/meta/lead.php (Vite can't run PHP).
// Same request/response contract as lead.php: { success, eventId? } or { success: false, error }.
// It only emails the lead — no Meta CAPI and no eventId, so testing locally never
// sends Lead events to Meta. Production uses lead.php on the PHP hosting.

const FALLBACK_EMAIL = "typing@connectgbc.com";

const FORM_LABELS = {
  contact_page: "Contact page",
  promo_popup: "Home page callback popup",
  visa_details: "Visa enquiry",
  footer_newsletter: "Footer newsletter",
  blog_newsletter: "Blog newsletter",
};

export function createApp({ sendEmail, mailFrom, contactTo, corsOrigin }) {
  const app = express();

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

  app.post(["/api/meta/lead.php", "/api/send-mail"], async (req, res) => {
    const body = req.body ?? {};

    // Honeypot: real users never fill the hidden "website" field.
    if (body.website) return res.json({ success: true });

    const form = {
      name: clean(body.name, 120),
      email: clean(body.email, 160).toLowerCase(),
      phone: clean(body.phone, 40),
      message: clean(body.message, 3000),
      formName: clean(body.formName, 50) || "unknown",
      pageUrl: clean(body.pageUrl, 500),
    };

    // Same rules as lead.php
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
        subject: `New lead (${label}): ${form.name || form.email || form.phone}`,
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

      res.json({ success: true });
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
