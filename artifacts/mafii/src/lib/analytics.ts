// Loads GA4 and the Meta Pixel only when their IDs are provided at build time,
// and records every hand-off to GlossGenius as a "book_click" conversion.
type Fn = (...args: unknown[]) => void;
declare global {
  interface Window { dataLayer?: unknown[]; gtag?: Fn; fbq?: Fn & { queue?: unknown[]; loaded?: boolean; version?: string; push?: Fn; callMethod?: Fn }; _fbq?: unknown }
}

const ga4 = import.meta.env.VITE_GA4_ID as string | undefined;
const pixel = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

function loadScript(src: string) {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export function initAnalytics() {
  if (typeof window === "undefined") return;
  if (ga4) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer!.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", ga4);
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${ga4}`);
  }
  if (pixel && !window.fbq) {
    const fbq = function (...args: unknown[]) {
      fbq.callMethod ? fbq.callMethod(...args) : fbq.queue!.push(args);
    } as NonNullable<Window["fbq"]>;
    fbq.push = fbq; fbq.loaded = true; fbq.version = "2.0"; fbq.queue = [];
    window.fbq = fbq; window._fbq = fbq;
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", pixel);
    fbq("track", "PageView");
  }
}

export function trackPageView(path: string) {
  window.gtag?.("event", "page_view", { page_path: path });
  window.fbq?.("track", "PageView");
}

export function trackGiftCardClick(placement: string) {
  window.gtag?.("event", "gift_card_click", { placement });
  window.fbq?.("trackCustom", "GiftCardClick", { placement });
}

export function trackBookClick(placement: string) {
  window.gtag?.("event", "book_click", { placement });
  window.fbq?.("track", "Lead", { content_name: placement });
}

/** Carries ad-campaign UTM tags from the landing URL through to GlossGenius. */
function landingParams() {
  const current = new URLSearchParams(window.location.search);
  try {
    if (current.has("utm_source")) sessionStorage.setItem("mafii_utm", current.toString());
    return new URLSearchParams(sessionStorage.getItem("mafii_utm") || current.toString());
  } catch {
    return current;
  }
}

export function bookingUrl(base: string, placement: string) {
  const url = new URL(base);
  const landing = typeof window === "undefined" ? new URLSearchParams() : landingParams();
  url.searchParams.set("utm_source", landing.get("utm_source") || "mafii_website");
  url.searchParams.set("utm_medium", landing.get("utm_medium") || "website");
  url.searchParams.set("utm_campaign", landing.get("utm_campaign") || "organic");
  url.searchParams.set("utm_content", placement);
  return url.toString();
}
