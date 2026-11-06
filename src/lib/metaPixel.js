// Meta Pixel (browser side).
// The Pixel ID is public, so it is safe in a VITE_ variable.
// The Conversions API access token must NEVER be added here — it lives only in
// the Google Apps Script backend (see google-apps-script/Code.gs).

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;

let initialised = false;

/** Loads Meta's official base code and calls fbq('init'). Does NOT send PageView;
 *  MetaPageViewTracker sends every PageView (including the first) so it is never duplicated. */
export function initMetaPixel() {
  if (initialised || typeof window === "undefined") return;
  if (!PIXEL_ID) {
    console.warn("[Meta Pixel] VITE_META_PIXEL_ID is not set — Pixel disabled.");
    return;
  }
  initialised = true;

  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */

  window.fbq("init", PIXEL_ID);
}

export function trackPageView() {
  if (window.fbq) window.fbq("track", "PageView");
}

/** Browser Lead — call ONLY after the backend confirmed the lead was saved.
 *  eventId must be the same ID the backend sent to the Conversions API (deduplication). */
export function trackLead(eventId, customData = {}) {
  if (window.fbq && eventId) {
    window.fbq("track", "Lead", customData, { eventID: eventId });
  }
}

function readCookie(name) {
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/** _fbp / _fbc cookies, sent to the backend so the CAPI event matches the browser. */
export function getMetaCookies() {
  let fbc = readCookie("_fbc");
  // If the visitor arrived from an ad but the Pixel hasn't written _fbc yet, build it from fbclid.
  if (!fbc) {
    const fbclid = new URLSearchParams(window.location.search).get("fbclid");
    if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  }
  return { fbp: readCookie("_fbp"), fbc };
}
