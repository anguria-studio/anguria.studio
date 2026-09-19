"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type RefObject } from "react";
import { flushSync } from "react-dom";
import type { Dictionary } from "@/lib/dictionaries/en";
import { captureSize, dockTransforms, hasServicePreview, previewServices, serviceCapture, railDividerY, railServices, type SelectableService, type PreviewLayout, type PreviewTheme } from "@/lib/paguro-service-preview";
import styles from "./paguro-service-preview.module.css";
import { usePaguroPreviewHints } from "./use-paguro-preview-hints";
import type { PreviewHintHistory } from "@/lib/paguro-preview-hints";
import type { DemoNotification } from "@/lib/paguro-island";

type PreviewCopy = Dictionary["paguroHero"]["serviceOverlay"];

function frame(x: number, y: number, width: number, height: number): CSSProperties {
  return { left: `${x / captureSize.width * 100}%`, top: `${y / captureSize.height * 100}%`, width: `${width / captureSize.width * 100}%`, height: `${height / captureSize.height * 100}%` };
}

function WorkspaceHeading({ name, y }: { name: string; y: number }) {
  return <div className={styles.workspace} style={frame(188, y, 196, 24)}>
    <span className={styles.workspaceChevron} aria-hidden="true">
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 4.5 3 3 3-3" /></svg>
    </span>
    <span>{name}</span>
  </div>;
}

export function PaguroServicePreview({ service: requestedService, layout: requestedLayout, onLayoutChange, theme: requestedTheme, copy, onUnavailable, hintHistory, notifications, onServiceSelect }: {
  service: SelectableService;
  layout: PreviewLayout;
  onLayoutChange: (layout: PreviewLayout) => void;
  theme: PreviewTheme;
  copy: PreviewCopy;
  onUnavailable: () => void;
  hintHistory: RefObject<PreviewHintHistory>;
  notifications: readonly DemoNotification[];
  onServiceSelect: (service: SelectableService) => void;
}) {
  const captureRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const [pointerY, setPointerY] = useState<number | null>(null);
  const [keyboardFocused, setKeyboardFocused] = useState<number | null>(null);
  const [displayed, setDisplayed] = useState({ service: requestedService, layout: requestedLayout, theme: requestedTheme });
  const { service: selectedService, layout, theme } = displayed;

  useEffect(() => {
    let cancelled = false;
    const src = serviceCapture(requestedService, requestedLayout, requestedTheme);
    const image = captureRef.current?.querySelector<HTMLImageElement>(`img[src="${src}"]`);
    if (!image) return;
    // Decode the mounted layer itself: decoding a detached Image does not
    // guarantee that an async-decoded DOM image is ready to paint.
    image.decode().then(() => {
      if (cancelled) return;
      // Commit within the decoded frame, keeping the old capture and controls
      // visible until the replacement can be painted together.
      flushSync(() => setDisplayed({ service: requestedService, layout: requestedLayout, theme: requestedTheme }));
    }).catch(() => {
      // A failed background capture must not remove the working preview.
    });
    return () => { cancelled = true; };
  }, [requestedService, requestedLayout, requestedTheme]);

  function selectService(service: string) {
    if (!hasServicePreview(service)) return;
    onServiceSelect(service);
  }
  const { hint, demoPointerY } = usePaguroPreviewHints({ captureRef, toggleRef, dockRef, history: hintHistory, layout });
  const compact = layout === "compact";
  const transforms = dockTransforms(compact ? pointerY ?? (keyboardFocused === null ? demoPointerY : railServices[keyboardFocused].compactY) : null);
  const dividerOffset = transforms[3].offset + (transforms[3].scale - 1) * 11;

  function trackPointer(event: PointerEvent<HTMLDivElement>) {
    if (!compact || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width * captureSize.width;
    const y = (event.clientY - bounds.top) / bounds.height * captureSize.height;
    // The fixed viewport includes the magnified overflow, keeping icons stable
    // when the pointer crosses the photographed rail's right edge.
    setPointerY(x >= 178 && x <= 250 && y >= 156 && y <= 520 ? y : null);
  }

  return (
    <div ref={captureRef} className={styles.capture} data-layout={layout} data-theme={theme} data-hint={hint ?? undefined} onPointerMove={trackPointer} onPointerLeave={() => setPointerY(null)}>
      {/* Preload every service at low priority; only the requested capture
          takes priority. Mounted layers also remain ready for repeat visits. */}
      {previewServices.flatMap((service) => (["dark", "light"] as const).flatMap((scheme) => (["sidebar", "compact"] as const).map((arrangement) => {
        const showing = service === selectedService && scheme === theme && arrangement === layout;
        const src = serviceCapture(service, arrangement, scheme);
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={`${service}-${arrangement}-${scheme}`} src={src} alt={showing ? `${railServices.find((entry) => entry.id === service)?.name} — ${copy.captureAlt}` : ""} width={2880} height={1800} draggable={false}
            loading="eager" decoding="sync"
            fetchPriority={service === requestedService && scheme === requestedTheme && arrangement === requestedLayout ? "high" : "low"} onError={showing ? onUnavailable : undefined}
            className={styles.screenshot} style={{ opacity: showing ? 1 : 0 }} />
        );
      })))}

      <button ref={toggleRef} type="button" className={styles.layoutToggle} style={frame(compact ? 270 : 360, 114, 24, 24)}
        aria-label={compact ? copy.expand : copy.collapse} onClick={() => { setPointerY(null); setKeyboardFocused(null); onLayoutChange(compact ? "sidebar" : "compact"); }}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><rect x="2" y="3" width="16" height="14" rx="3" /><path d="M8 3v14M4.5 7h1M4.5 10h1M4.5 13h1" /></svg>
      </button>

      <div ref={dockRef} className={styles.hintRegion} style={frame(178, 156, 72, 364)} aria-hidden="true" />

      {!compact && <>
        <WorkspaceHeading name={copy.personal} y={170} />
        <WorkspaceHeading name={copy.work} y={348} />
      </>}
      {compact && <div className={styles.divider} style={{ ...frame(189, railDividerY, 22, 1), "--icon-offset": dividerOffset } as CSSProperties} />}

      <ul aria-label={copy.services} className={styles.services}>
        {railServices.map((service, index) => {
          const { scale, offset } = transforms[index];
          const centerY = compact ? service.compactY : service.sidebarY;
          return <li key={service.id} role="button" tabIndex={0} aria-label={`${service.name}, ${copy[service.workspace]}`} aria-current={service.id === selectedService ? "true" : undefined}
            className={styles.service} data-service={service.id} data-magnified={scale > 1.01}
            style={{ ...frame(compact ? 183 : 188, centerY - (compact ? 18 : 15), compact ? 36 : 196, compact ? 36 : 30), "--icon-scale": scale, "--icon-offset": offset } as CSSProperties}
            // Pointer focus must not keep the dock enlarged after hover ends.
            onPointerDown={() => setKeyboardFocused(null)}
            onClick={() => selectService(service.id)}
            onFocus={(event) => setKeyboardFocused(event.currentTarget.matches(":focus-visible") ? index : null)}
            onBlur={() => setKeyboardFocused(null)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectService(service.id);
                return;
              }
              const direction = event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
              if (!direction) return;
              event.preventDefault();
              const nextIndex = (index + direction + railServices.length) % railServices.length;
              const siblings = event.currentTarget.parentElement?.querySelectorAll<HTMLElement>("li");
              siblings?.[nextIndex]?.focus();
              setKeyboardFocused(nextIndex);
            }}>
            <span className={styles.mark}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/paguro/services/${service.id}.svg`} alt="" width={22} height={22} draggable={false} />
              {notifications.some((notification) => notification.service === service.id) && <span className={styles.notificationDot} aria-hidden="true" />}
            </span>
            <span className={compact ? styles.tooltip : styles.label} aria-hidden="true">{service.name}</span>
          </li>;
        })}
      </ul>
    </div>
  );
}

/**
 * The rail at rest, drawn over a still capture. The mobile hero shows a
 * photograph instead of a working preview, and the photographed rail is empty
 * — the icons have always been the site's, not the capture's — so without this
 * the frame reads as an empty shell. Nothing here takes input, and the overlay
 * is hidden from assistive tech because the capture's alt text already
 * describes the workspace.
 */
export function PaguroStaticRail({ theme }: { theme: PreviewTheme }) {
  const transforms = dockTransforms(null);
  const dividerOffset = transforms[3].offset + (transforms[3].scale - 1) * 11;
  return (
    <div className={styles.capture} data-layout="compact" data-theme={theme} data-static="true" aria-hidden="true">
      <div className={styles.divider} style={{ ...frame(189, railDividerY, 22, 1), "--icon-offset": dividerOffset } as CSSProperties} />
      <ul className={styles.services}>
        {railServices.map((service, index) => {
          const { scale, offset } = transforms[index];
          return <li key={service.id} className={styles.service} data-service={service.id}
            style={{ ...frame(183, service.compactY - 18, 36, 36), "--icon-scale": scale, "--icon-offset": offset } as CSSProperties}>
            <span className={styles.mark}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/paguro/services/${service.id}.svg`} alt="" width={22} height={22} draggable={false} />
            </span>
          </li>;
        })}
      </ul>
    </div>
  );
}
