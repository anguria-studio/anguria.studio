"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { previewServices, railServices, serviceCapture, type PreviewLayout, type PreviewTheme, type SelectableService } from "@/lib/paguro-service-preview";
import styles from "./paguro-service-preview.module.css";

/** Keep the old crop stretched until the live sidebar has finished moving. */
export function PaguroServiceCapture({ service, layout, theme, style }: {
  service: SelectableService;
  layout: PreviewLayout;
  theme: PreviewTheme;
  style: CSSProperties;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const [settledLayout, setSettledLayout] = useState(layout);
  const [displayed, setDisplayed] = useState({ service, layout, theme });

  useEffect(() => {
    let cancelled = false;
    const element = viewport.current;
    if (!element) return;
    // Flush the new geometry before reading transitions. With reduced motion
    // (or unchanged geometry), there are none and the crop swaps immediately.
    element.getBoundingClientRect();
    const transitions = element.getAnimations();
    Promise.all(transitions.map((animation) => animation.finished)).then(() => {
      if (!cancelled) setSettledLayout(layout);
    }).catch(() => {
      // Layout reversals invalidate this effect. Other cancellations (such as
      // enabling reduced motion) should settle the current target immediately.
      if (!cancelled) setSettledLayout(layout);
    });
    return () => { cancelled = true; };
  }, [layout]);

  useEffect(() => {
    if (settledLayout !== layout) return;
    let cancelled = false;
    const src = serviceCapture(service, settledLayout, theme);
    const image = viewport.current?.querySelector<HTMLImageElement>(`img[src="${src}"]`);
    image?.decode().then(() => {
      if (!cancelled) setDisplayed({ service, layout: settledLayout, theme });
    }).catch(() => {
      // Keep the last working screenshot if the replacement cannot load.
    });
    return () => { cancelled = true; };
  }, [service, settledLayout, layout, theme]);

  return <div ref={viewport} className={styles.content} style={style} data-capture-layout={displayed.layout}>
    {previewServices.flatMap((id) => (["light", "dark"] as const).flatMap((scheme) => (["compact", "sidebar"] as const).map((arrangement) => {
      const active = id === displayed.service && scheme === displayed.theme && arrangement === displayed.layout;
      const x = arrangement === "compact" ? 232 : 404;
      const width = 1262 - x;
      return (
        // Retain the real service content, cropping away the photographed app
        // chrome. Percentage sizing stretches this crop with its live viewport.
        // eslint-disable-next-line @next/next/no-img-element
        <img key={`${id}-${scheme}-${arrangement}`} src={serviceCapture(id, arrangement, scheme)}
          alt={active ? `${railServices.find((entry) => entry.id === id)?.name} screenshot` : ""}
          width={2880} height={1800} loading="eager" decoding="sync" draggable={false}
          fetchPriority={id === service && scheme === theme && arrangement === layout ? "high" : "low"}
          className={styles.serviceScreenshot}
          style={{ opacity: active ? 1 : 0, width: `${1440 / width * 100}%`, height: `${900 / 640 * 100}%`, left: `${-x / width * 100}%`, top: `${-152 / 640 * 100}%` }} />
      );
    })))}
  </div>;
}
