import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Sends a Meta Pixel PageView on every route change (SPA navigation).
// The first page load is already tracked by the base code in index.html,
// so the initial render is skipped to avoid a duplicate PageView.
export function MetaPageViewTracker() {
  const location = useLocation();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (window.fbq) window.fbq("track", "PageView");
  }, [location.pathname, location.search]);

  return null;
}
