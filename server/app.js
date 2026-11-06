import cors from "cors";
import express from "express";
import crypto from "node:crypto";
import { readCookie } from "./meta.js";

const FALLBACK_EMAIL = "typing@connectgbc.com";

export function createApp({ sendEmail, mailFrom, contactTo, corsOrigin, metaTracker, trustProxy }) {
  const app = express();
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

  // Every website form posts here with a formType; each type lists its required fields.
  const FORM_TYPES = {
    contact: { label: "Contact enquiry", required: ["name", "email", "message"] },
    callback: { label: "Callback request", required: ["name", "email", "phone"] },
    visa: { label: "Visa enquiry", required: ["name", "email", "phone"] },
    newsletter: { label: "Newsletter signup", required: ["email"] },
  };

  app.post("/api/send-mail", async (req, res) => {
    const body = req.body ?? {};

    // Honeypot: real users never fill the hidden "website" field.
    if (body.website) return res.json({ success: true });

    const type = FORM_TYPES[body.formType] ? body.formType : "contact";
    const { label, required } = FORM_TYPES[type];

    const form = {
      name: clean(body.name, 100),
      email: clean(body.email, 254),
      phone: clean(body.phone, 40),
      message: clean(body.message, 5000),
      source: clean(body.source, 200),
    };

    if (required.some((field) => !form[field])) {
      return res.status(400).json({ success: false, message: "Please complete all required fields." });
    }
    if (!emailPattern.test(form.email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address." });
    }

    const rows = [
      ["Form", label],
      ["Name", form.name],
      ["Email", form.email],
      ["Phone", form.phone],
      ["Interested in", form.source],
      ["Message", form.message],
    ].filter(([, value]) => value);

    try {
      const { data, error } = await sendEmail({
        from: mailFrom,
        to: contactTo.split(",").map((email) => email.trim()).filter(Boolean),
        replyTo: form.email,
        subject: `GBC website – ${label} from ${form.name || form.email}`,
        text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
        html: `<table cellpadding="6">${rows
          .map(
            ([label, value]) =>
              `<tr><td valign="top"><strong>${label}</strong></td><td style="white-space:pre-wrap">${escape(value)}</td></tr>`,
          )
          .join("")}</table>`,
      });

      if (error) throw error;
      if (!data?.id) {
        throw new Error("Email provider did not accept the enquiry.");
      }

      // Enquiry delivered — now (and only now) report it to Meta Conversions API.
      // The browser Pixel sends the same eventId so Meta deduplicates the two events.
      const eventId = crypto.randomUUID();
      const eventName = type === "newsletter" ? "Subscribe" : "Lead";
      if (metaTracker?.enabled) {
        const pageUrl = /^https?:\/\//.test(body.pageUrl) ? clean(body.pageUrl, 500) : req.get("referer");
        try {
          await metaTracker.sendEvent({
            eventName,
            eventId,
            email: form.email,
            phone: form.phone,
            ip: req.ip,
            userAgent: req.get("user-agent"),
            fbp: readCookie(req, "_fbp"),
            fbc: readCookie(req, "_fbc"),
            pageUrl,
          });
        } catch (metaError) {
          // Never fail the enquiry because Meta is down.
          console.error("Meta CAPI send failed:", metaError.message);
        }
      }

      res.json({ success: true, eventId, eventName });
    } catch (error) {
      console.error("Contact enquiry delivery failed:", error.message);
      res.status(502).json({
        success: false,
        message: `We couldn't send your message. Please try again later or email ${FALLBACK_EMAIL}.`,
      });
    }
  });

  // Never return the website HTML for an unknown API route.
  app.use("/api", (_req, res) => {
    res.status(404).json({ success: false, message: "API endpoint not found." });
  });

  app.use((error, _req, res, _next) => {
    const status = error.status === 413 ? 413 : error.status === 400 ? 400 : 500;
    res.status(status).json({
      success: false,
      message: status === 413
        ? "Your message is too long. Please shorten it."
        : status === 400
          ? "Invalid request. Please check your details and try again."
          : "We couldn't send your message. Please try again.",
    });
  });

  return app;
}
