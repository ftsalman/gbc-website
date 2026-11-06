const FALLBACK_EMAIL = "typing@connectgbc.com";

/**
 * Sends any website form to the mail API (server/app.js).
 * formType: "contact" | "callback" | "visa" | "newsletter"
 * Throws an Error with a user-friendly message on failure.
 */
export async function sendMail(formType, fields) {
  let response;
  try {
    response = await fetch("/api/send-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ formType, pageUrl: window.location.href, ...fields }),
    });
  } catch {
    throw new Error("Unable to connect. Please check your connection and try again.");
  }

  const result = await response.json().catch(() => null);
  if (!response.ok || result?.success !== true) {
    throw new Error(
      result?.message ||
        `We couldn't send your message. Please try again later or email ${FALLBACK_EMAIL}.`,
    );
  }

  // Browser Pixel event — only after the server confirmed the enquiry, and with the
  // same eventID the server sent to Conversions API, so Meta counts it once.
  if (result.eventId && window.fbq) {
    window.fbq("track", result.eventName || "Lead", {}, { eventID: result.eventId });
  }
  return result;
}
