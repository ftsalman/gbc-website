import crypto from "node:crypto";

// Meta Conversions API (server-side events). Credentials stay on the server only.
// Needs META_DATASET_ID + META_ACCESS_TOKEN; when they're missing, sending is skipped.

const sha256 = (value) =>
  value
    ? crypto.createHash("sha256").update(String(value).trim().toLowerCase()).digest("hex")
    : undefined;

export function createMetaTracker(env) {
  const datasetId = env.META_DATASET_ID?.trim();
  const accessToken = env.META_ACCESS_TOKEN?.trim();
  const apiVersion = env.META_API_VERSION?.trim() || "v23.0";
  const testEventCode = env.META_TEST_EVENT_CODE?.trim();
  const enabled = Boolean(datasetId && accessToken);

  async function sendEvent({ eventName, eventId, email, phone, ip, userAgent, fbp, fbc, pageUrl }) {
    if (!enabled) return null;

    const user_data = {
      client_ip_address: ip,
      client_user_agent: userAgent,
      em: email ? [sha256(email)] : undefined,
      ph: phone ? [sha256(String(phone).replace(/\D/g, ""))] : undefined,
      fbp,
      fbc,
    };
    Object.keys(user_data).forEach((key) => {
      if (!user_data[key]) delete user_data[key];
    });

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          action_source: "website",
          event_source_url: pageUrl,
          user_data,
        },
      ],
      ...(testEventCode ? { test_event_code: testEventCode } : {}),
    };

    const url =
      `https://graph.facebook.com/${apiVersion}/${datasetId}/events` +
      `?access_token=${encodeURIComponent(accessToken)}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok) throw new Error(JSON.stringify(result));
    return result;
  }

  return { enabled, testMode: Boolean(testEventCode), sendEvent };
}

/** Reads one cookie (e.g. _fbp / _fbc) from the raw Cookie header — no cookie-parser needed. */
export function readCookie(req, name) {
  const match = (req.headers.cookie || "").match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}
