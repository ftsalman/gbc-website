import { getMetaCookies, trackLead } from "./metaPixel";

const LEAD_ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT;

/**
 * Sends a form enquiry to the Google Apps Script backend, which:
 *   1. validates it, 2. saves it to the Google Sheet, 3. sends the CAPI Lead.
 * Only if the backend replies success do we fire the browser Pixel Lead,
 * using the same eventId so Meta deduplicates the two events.
 *
 * @param {string} formName  e.g. "contact_page", "visa_details", "promo_popup", "newsletter"
 * @param {{name?: string, email?: string, phone?: string, message?: string}} fields
 * @returns {Promise<{success: true, eventId: string}>} throws on failure
 */
export async function submitLead(formName, fields) {
  if (!LEAD_ENDPOINT) {
    throw new Error("VITE_LEAD_ENDPOINT is not configured.");
  }

  const payload = {
    ...fields,
    formName,
    pageUrl: window.location.href,
    userAgent: navigator.userAgent,
    ...getMetaCookies(),
  };

  let response;
  try {
    response = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Unable to connect. Please check your connection and try again.");
  }

  const text = await response.text();
  let result;
  try {
    result = JSON.parse(text);
  } catch {
    console.error(`[lead] HTTP ${response.status} non-JSON response:`, text.slice(0, 500));
    throw new Error("Unexpected response from lead server.");
  }

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Lead could not be saved.");
  }

  // Lead is saved on the server -> now (and only now) fire the browser Lead.
  trackLead(result.eventId, { content_name: formName });
  return result;
}
