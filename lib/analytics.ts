type TrackProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Push a funnel event to GA4 (if NEXT_PUBLIC_GA_ID is configured) and the
 * dataLayer. Silently no-ops on the server and when no analytics is loaded.
 */
export function track(event: string, props: TrackProps = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer?.push({ event, ...props });
    window.gtag?.("event", event, props);
    if (process.env.NODE_ENV === "development") {
      console.debug("[track]", event, props);
    }
  } catch {
    /* analytics must never break the app */
  }
}
