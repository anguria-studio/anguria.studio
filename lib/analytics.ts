import { appSlugs, site } from "./apps";
import { defaultLocale, isLocale, type Locale } from "./i18n";

export const analytics = {
  script: "https://umami-xi-blond.vercel.app/script.js",
  websiteId: "b3df61ab-0490-4a73-a49b-7a65a2dceccf",
  domains: `${site.domain},www.${site.domain}`,
};

export type AnalyticsData = Record<string, string | number | boolean>;
export type AnalyticsEvent =
  | "link-click"
  | "download-click"
  | "app-store-click"
  | "source-click"
  | "contact-click"
  | "language-switch"
  | "product-select"
  | "hero-interaction"
  | "faq-expand";

type UmamiPayload = {
  url?: string;
  name?: string;
  tag?: string;
  data?: AnalyticsData;
  [key: string]: unknown;
};

declare global {
  interface Window {
    umami?: { track: (name: string, data?: AnalyticsData) => Promise<unknown> | void };
    anguriaBeforeSend?: typeof beforeAnalyticsSend;
  }
}

export function isAnalyticsHost(hostname: string): boolean {
  return hostname === site.domain || hostname === `www.${site.domain}`;
}

/** Stable product and route names across all translations, retaining subpages. */
export function analyticsContext(url: string) {
  const path = new URL(url, site.url).pathname;
  const segments = path.split("/").filter(Boolean);
  let locale: Locale = defaultLocale;
  if (segments[0] && isLocale(segments[0])) locale = segments.shift() as Locale;
  const product = appSlugs.find((slug) => slug === segments[0]) ?? "studio";
  const route = segments.length ? `/${segments.join("/")}` : "/";
  const page = route === "/" ? "home" : product === "studio" ? "not-found" : segments.slice(1).join("/") || "product";
  return { product, locale, route, page };
}

/** Umami invokes this for automatic pageviews as well as custom events. */
export function beforeAnalyticsSend(type: string, payload: UmamiPayload): UmamiPayload {
  if (type !== "event") return payload;
  const context = analyticsContext(payload.url ?? "/");
  return {
    ...payload,
    // Tags let the main traffic dashboard group each product across locales.
    tag: context.product,
    // Umami requires a named event to store custom event properties.
    ...(payload.name ? { data: { ...payload.data, ...context } } : {}),
  };
}

/** Analytics must never interrupt a demo, navigation, or download. */
export function trackEvent(name: AnalyticsEvent, data: AnalyticsData = {}): void {
  if (typeof window === "undefined" || !isAnalyticsHost(window.location.hostname)) return;
  try {
    void Promise.resolve(window.umami?.track(name, data)).catch(() => {});
  } catch {
    // A blocked or unavailable tracker leaves the site's interactions intact.
  }
}

/** All anchors are covered, including future routes and middle-clicks. */
export function trackLinkClick(event: MouseEvent): void {
  if (event.type === "auxclick" ? event.button !== 1 : event.button !== 0) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  const link = target.closest<HTMLAnchorElement>("a[href]");
  if (!link) return;
  const destination = new URL(link.href, window.location.href);
  if (!["https:", "http:", "mailto:", "tel:"].includes(destination.protocol)) return;
  const internal = destination.origin === window.location.origin || isAnalyticsHost(destination.hostname);
  const location = link.closest<HTMLElement>("[data-analytics-location]")?.dataset.analyticsLocation
    ?? (link.closest("header") ? "header" : link.closest("footer") ? "footer" : "content");
  const name = (link.dataset.analyticsEvent as AnalyticsEvent | undefined)
    ?? (link.hreflang ? "language-switch" : destination.protocol === "mailto:" ? "contact-click" : link.hasAttribute("download") ? "download-click" : "link-click");
  trackEvent(name, {
    // Destination queries (e.g. email subjects) are unnecessary for click counts.
    destination: `${internal ? "" : destination.origin === "null" ? destination.protocol : destination.origin}${destination.pathname}${destination.hash}`.slice(0, 500),
    label: link.dataset.analyticsLabel ?? destination.pathname,
    location,
    external: !internal,
    ...(internal ? { target_product: analyticsContext(destination.href).product } : {}),
    ...(link.hreflang ? { target_locale: link.hreflang } : {}),
  });
}
