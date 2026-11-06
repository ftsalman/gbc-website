import crypto from "node:crypto";

// Meta Conversions API (server-side Lead events). Credentials stay on the server only.
// Needs META_DATASET_ID + META_ACCESS_TOKEN; when they're missing, sending is skipped.

const sha256 = (value) =>
  value
    ? crypto.createHash("sha256").update(String(value).trim().toLowerCase()).digest("hex")
    : undefined;

// Digits with country code; local UAE numbers like 0501234567 become 971501234567.
const normalizePhone = (phone) => {
  let digits = String(phone || "").replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 10 && digits.startsWith("0")) digits = "971" + digits.slice(1);
  return digits;
};

export function createMetaTracker(env) {
  const datasetId = env.META_DATASET_ID?.trim();
  const accessToken = env.META_ACCESS_TOKEN?.trim();
  const apiVersion = env.META_API_VERSION?.trim() || "v23.0";
  const testEventCode = env.META_TEST_EVENT_CODE?.trim();
  const enabled = Boolean(datasetId && accessToken);

  async function sendLead({ eventId, email, phone, name, ip, userAgent, fbp, fbc, pageUrl, formName }) {
    if (!enabled) return null;

    const firstName = name ? name.trim().split(/\s+/)[0] : "";
    const user_data = {
      client_ip_address: ip,
      client_user_agent: userAgent,
      em: email ? [sha256(email)] : undefined,
      ph: normalizePhone(phone) ? [sha256(normalizePhone(phone))] : undefined,
      fn: firstName ? [sha256(firstName)] : undefined,
      fbp,
      fbc,
    };
    Object.keys(user_data).forEach((key) => {
      if (!user_data[key]) delete user_data[key];
    });

    const payload = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          action_source: "website",
          event_source_url: pageUrl,
          user_data,
          custom_data: { content_name: formName },
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

  return { enabled, testMode: Boolean(testEventCode), sendLead };
}
