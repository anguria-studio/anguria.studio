"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { analytics, beforeAnalyticsSend, isAnalyticsHost, trackLinkClick } from "@/lib/analytics";

const subscribe = () => () => {};
const isProductionHost = () => isAnalyticsHost(window.location.hostname);
const serverSnapshot = () => false;

// Module initialization precedes next/script's effects and first pageview.
if (typeof window !== "undefined") window.anguriaBeforeSend = beforeAnalyticsSend;

export function WebAnalytics() {
  // Static exports also run on localhost and preview hosts. Check the actual
  // browser hostname before loading Umami so those visits stay out.
  const enabled = useSyncExternalStore(subscribe, isProductionHost, serverSnapshot);

  useEffect(() => {
    if (!enabled) return;
    document.addEventListener("click", trackLinkClick, true);
    document.addEventListener("auxclick", trackLinkClick, true);
    return () => {
      document.removeEventListener("click", trackLinkClick, true);
      document.removeEventListener("auxclick", trackLinkClick, true);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <Script
      id="umami-analytics"
      src={analytics.script}
      data-website-id={analytics.websiteId}
      data-domains={analytics.domains}
      data-before-send="anguriaBeforeSend"
      data-exclude-hash="true"
      strategy="afterInteractive"
    />
  );
}
