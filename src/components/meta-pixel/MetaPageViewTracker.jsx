import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../../lib/metaPixel";

// Sends a PageView on first load and on every SPA route change.
// The ref guard stops StrictMode's double effect run from sending duplicates.
export function MetaPageViewTracker() {
  const location = useLocation();
  const lastTracked = useRef(null);

  useEffect(() => {
    const key = location.pathname + location.search;
    if (lastTracked.current === key) return;
    lastTracked.current = key;
    trackPageView();
  }, [location.pathname, location.search]);

  return null;
}
