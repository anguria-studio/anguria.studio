"use client";

import { useRef, useState, type CSSProperties, type PointerEvent, type RefObject } from "react";
import type { Dictionary } from "@/lib/dictionaries/en";
import { captureSize, dockTransforms, railDividerY, railServices, type PreviewLayout, type PreviewTheme } from "@/lib/paguro-service-preview";
import styles from "./paguro-service-preview.module.css";
import { usePaguroPreviewHints } from "./use-paguro-preview-hints";
import type { PreviewHintHistory } from "@/lib/paguro-preview-hints";

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

export function PaguroServicePreview({ layout, onLayoutChange, theme, copy, onUnavailable, hintHistory }: {
  layout: PreviewLayout;
  onLayoutChange: (layout: PreviewLayout) => void;
  theme: PreviewTheme;
  copy: PreviewCopy;
  onUnavailable: () => void;
  hintHistory: RefObject<PreviewHintHistory>;
}) {
  const captureRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const [pointerY, setPointerY] = useState<number | null>(null);
  const [keyboardFocused, setKeyboardFocused] = useState<number | null>(null);
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
      {/* All four captures stay mounted so both the layout toggle and the menu
          bar's theme switch cross-fade rather than waiting on a fetch. The
          scheme the visitor is not looking at loads at low priority, keeping
          it off the critical path. */}
      {(["dark", "light"] as const).flatMap((scheme) => (["sidebar", "compact"] as const).map((arrangement) => {
        const showing = scheme === theme && arrangement === layout;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={`${arrangement}-${scheme}`} src={`/shots/paguro-overlay/${arrangement}-${scheme}.png`} alt={showing ? copy.captureAlt : ""} width={2880} height={1800} draggable={false}
            fetchPriority={scheme === theme ? "high" : "low"} onError={onUnavailable}
            className={styles.screenshot} style={{ opacity: showing ? 1 : 0 }} />
        );
      }))}

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
          return <li key={service.id} tabIndex={0} aria-label={`${service.name}, ${copy[service.workspace]}`} aria-current={service.id === "whatsapp" ? "true" : undefined}
            className={styles.service} data-service={service.id} data-magnified={scale > 1.01}
            style={{ ...frame(compact ? 183 : 188, centerY - (compact ? 18 : 15), compact ? 36 : 196, compact ? 36 : 30), "--icon-scale": scale, "--icon-offset": offset } as CSSProperties}
            // Pointer focus must not keep the dock enlarged after hover ends.
            onPointerDown={() => setKeyboardFocused(null)}
            onFocus={(event) => setKeyboardFocused(event.currentTarget.matches(":focus-visible") ? index : null)}
            onBlur={() => setKeyboardFocused(null)}
            onKeyDown={(event) => {
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
            </span>
            <span className={compact ? styles.tooltip : styles.label} aria-hidden="true">{service.name}</span>
          </li>;
        })}
      </ul>
    </div>
  );
}
