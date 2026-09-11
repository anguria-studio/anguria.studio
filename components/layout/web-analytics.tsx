"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { site } from "@/lib/apps";

const subscribe = () => () => {};
const isProductionHost = () => window.location.hostname === site.domain || window.location.hostname === `www.${site.domain}`;
const serverSnapshot = () => false;

export function WebAnalytics() {
  // Static exports also run on localhost and preview hosts. Check the actual
  // browser hostname before loading the beacon so those visits stay out.
  const enabled = useSyncExternalStore(subscribe, isProductionHost, serverSnapshot);
  if (!enabled) return null;

  return (
    <Script
      id="cloudflare-web-analytics"
      type="module"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: "1468850d0a414502b93313aaca30561a" })}
      strategy="afterInteractive"
    />
  );
}
