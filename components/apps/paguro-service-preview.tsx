"use client";

import { useRef, useState, type CSSProperties, type PointerEvent, type RefObject } from "react";
import type { Dictionary } from "@/lib/dictionaries/en";
import { captureSize, dockTransforms, hasServicePreview, railDividerY, railServices, type SelectableService, type PreviewLayout, type PreviewTheme } from "@/lib/paguro-service-preview";
import { PaguroServiceCapture } from "./paguro-service-capture";
import type { Locale } from "@/lib/i18n";
import styles from "./paguro-service-preview.module.css";
import { usePaguroPreviewHints } from "./use-paguro-preview-hints";
import type { PreviewHintHistory } from "@/lib/paguro-preview-hints";
import type { DemoNotification } from "@/lib/paguro-island";

type PreviewCopy = Dictionary["paguroHero"]["serviceOverlay"];

function frame(x: number, y: number, width: number, height: number): CSSProperties {
  return { left: `${x / captureSize.width * 100}%`, top: `${y / captureSize.height * 100}%`, width: `${width / captureSize.width * 100}%`, height: `${height / captureSize.height * 100}%` };
}

function Bell({ muted = false }: { muted?: boolean }) {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 8a5 5 0 0 1 10 0v4l2 3H3l2-3V8Zm3 9h4" />
    {muted && <path d="m2 2 16 16" strokeWidth="2" />}
  </svg>;
}

function WorkspaceHeading({ name, y, expanded = true, onToggle, muted = false }: { name: string; y: number; expanded?: boolean; onToggle?: () => void; muted?: boolean }) {
  const contents = <>
    <span className={styles.workspaceChevron} aria-hidden="true">
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 4.5 3 3 3-3" /></svg>
    </span>
    <span>{name}</span>
    {muted && <span className={styles.workspaceMute}><Bell muted /></span>}
  </>;
  return onToggle
    ? <button type="button" className={styles.workspace} style={frame(188, y, 196, 24)} aria-expanded={expanded} onClick={onToggle}>{contents}</button>
    : <div className={styles.workspace} style={frame(188, y, 196, 24)}>{contents}</div>;
}

export function PaguroServicePreview({ service: requestedService, layout: requestedLayout, onLayoutChange, theme, copy, locale, muted, onMuteChange, hintHistory, notifications, onServiceSelect }: {
  service: SelectableService;
  layout: PreviewLayout;
  onLayoutChange: (layout: PreviewLayout) => void;
  theme: PreviewTheme;
  copy: PreviewCopy;
  locale: Locale;
  muted: boolean;
  onMuteChange: () => void;
  hintHistory: RefObject<PreviewHintHistory>;
  notifications: readonly DemoNotification[];
  onServiceSelect: (service: SelectableService) => void;
}) {
  const captureRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const [pointerY, setPointerY] = useState<number | null>(null);
  const [keyboardFocused, setKeyboardFocused] = useState<number | null>(null);
  const selectedService = requestedService;
  const layout = requestedLayout;
  const [expandedWorkspaces, setExpandedWorkspaces] = useState({ personal: true, work: true });
  const ui = locale === "it"
    ? { back: "Indietro", forward: "Avanti", mute: "Silenzia notifiche", unmute: "Riattiva notifiche", add: "Aggiungi servizio", settings: "Impostazioni", unread: "notifiche non lette", mutedStatus: "notifiche silenziate" }
    : { back: "Back", forward: "Forward", mute: "Mute notifications", unmute: "Unmute notifications", add: "Add service", settings: "Settings", unread: "unread notifications", mutedStatus: "notifications muted" };
  const workOffset = expandedWorkspaces.personal ? 0 : 136;

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
    // when the pointer crosses the rail’s right edge.
    setPointerY(x >= 178 && x <= 250 && y >= 156 && y <= 520 ? y : null);
  }

  return (
    <div ref={captureRef} className={styles.capture} data-layout={layout} data-theme={theme} data-live-frame="true" data-hint={hint ?? undefined} onPointerMove={trackPointer} onPointerLeave={() => setPointerY(null)}>
      <div className={styles.liveRail} style={frame(178, compact ? 152 : 108, compact ? 44 : 216, compact ? 640 : 684)} aria-hidden="true" />
      <PaguroServiceCapture service={selectedService} layout={layout} theme={theme}
        style={frame(compact ? 232 : 404, 152, compact ? 1030 : 858, 640)} />
      <div className={styles.trafficLights} style={frame(189, 119, 62, 14)} aria-hidden="true"><i /><i /><i /></div>
      <span className={styles.windowTitle} style={frame(compact ? 300 : 412, 115, 240, 24)}>{railServices.find((entry) => entry.id === selectedService)?.name}</span>
      <div className={styles.windowTools} style={frame(1130, 112, 124, 28)}>
        <button type="button" aria-label={ui.back} title={ui.back} disabled>‹</button>
        <button type="button" aria-label={ui.forward} title={ui.forward} disabled>›</button>
        <span className={styles.reloadDecoration} aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 6a6 6 0 1 0 .5 7M12 2l4 4-5 1" /></svg></span>
        <button type="button" aria-label={muted ? ui.unmute : ui.mute} title={muted ? ui.unmute : ui.mute} aria-pressed={muted} onClick={onMuteChange}><Bell muted={muted} /></button>
      </div>
      {!compact && <div className={styles.sidebarFooter} style={frame(188, 748, 196, 34)}>
        <button type="button" disabled className={styles.addService}><span aria-hidden="true">＋</span>{ui.add}</button>
        <button type="button" disabled className={styles.settingsButton} aria-label={ui.settings}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 3 1-1h4l1 3 3 1 3 1-1 4 1 3-3 2-1 3-4 1-3-2-3 1-2-3-2-2 1-4 2-2 1-3Z" /><circle cx="12" cy="12" r="3.5" /></svg></button>
      </div>}

      <button ref={toggleRef} type="button" className={styles.layoutToggle} style={frame(compact ? 270 : 360, 114, 24, 24)}
        aria-label={compact ? copy.expand : copy.collapse} aria-expanded={!compact} onClick={() => { setPointerY(null); setKeyboardFocused(null); onLayoutChange(compact ? "sidebar" : "compact"); }}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><rect x="2" y="3" width="16" height="14" rx="3" /><path d="M8 3v14M4.5 7h1M4.5 10h1M4.5 13h1" /></svg>
      </button>

      <div ref={dockRef} className={styles.hintRegion} style={frame(178, 156, 72, 364)} aria-hidden="true" />

      {!compact && <>
        <WorkspaceHeading name={copy.personal} y={170} expanded={expandedWorkspaces.personal} muted={muted} onToggle={() => setExpandedWorkspaces((current) => ({ ...current, personal: !current.personal }))} />
        <WorkspaceHeading name={copy.work} y={348 - workOffset} expanded={expandedWorkspaces.work} muted={muted} onToggle={() => setExpandedWorkspaces((current) => ({ ...current, work: !current.work }))} />
      </>}
      <div className={styles.divider} style={{ ...frame(189, railDividerY, 22, 1), "--icon-offset": dividerOffset } as CSSProperties} />

      <ul aria-label={copy.services} className={styles.services}>
        {railServices.map((service, index) => {
          const { scale, offset } = transforms[index];
          const centerY = compact ? service.compactY : service.sidebarY - (service.workspace === "work" ? workOffset : 0);
          const count = notifications.filter((notification) => notification.service === service.id).length;
          return <li key={service.id} hidden={!compact && !expandedWorkspaces[service.workspace]} role="button" tabIndex={0} aria-label={`${service.name}, ${copy[service.workspace]}${count ? `, ${count} ${ui.unread}` : ""}${muted ? `, ${ui.mutedStatus}` : ""}`} aria-current={service.id === selectedService ? "true" : undefined}
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
              const siblings = Array.from(event.currentTarget.parentElement?.querySelectorAll<HTMLElement>("li:not([hidden])") ?? []);
              const next = siblings[(siblings.indexOf(event.currentTarget) + direction + siblings.length) % siblings.length];
              next?.focus();
              setKeyboardFocused(railServices.findIndex((entry) => entry.id === next?.dataset.service));
            }}>
            <span className={styles.mark}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/paguro/services/${service.id}.svg`} alt="" width={22} height={22} draggable={false} />
              {compact && count > 0 && <span className={styles.notificationBadge} aria-hidden="true">{count}</span>}
              {compact && muted && <span className={styles.compactMute}><Bell muted /></span>}
            </span>
            <span className={styles.label} aria-hidden="true">{service.name}</span>
            {!compact && <span className={styles.serviceStatus} aria-hidden="true">{count > 0 && <span className={styles.notificationBadge}>{count}</span>}{muted && <span className={styles.rowMute}><Bell muted /></span>}</span>}
            {compact && <span className={styles.tooltip} aria-hidden="true">{service.name}</span>}
          </li>;
        })}
      </ul>
    </div>
  );
}

/**
 * The rail at rest, drawn over a still capture. Both stills the hero can show
 * — the mobile photograph and the fallback the desktop drops to when a capture
 * will not load — photograph an empty rail, because the icons have always been
 * the site's rather than the capture's. Without this they read as empty
 * shells. Nothing here takes input, and the overlay is hidden from assistive
 * tech because the capture's alt text already describes the workspace.
 */
export function PaguroStaticRail({ theme, layout, copy }: { theme: PreviewTheme; layout: PreviewLayout; copy: PreviewCopy }) {
  const compact = layout === "compact";
  const transforms = dockTransforms(null);
  const dividerOffset = transforms[3].offset + (transforms[3].scale - 1) * 11;
  return (
    <div className={styles.capture} data-layout={layout} data-theme={theme} data-static="true" aria-hidden="true">
      {!compact && <>
        <WorkspaceHeading name={copy.personal} y={170} />
        <WorkspaceHeading name={copy.work} y={348} />
      </>}
      {compact && <div className={styles.divider} style={{ ...frame(189, railDividerY, 22, 1), "--icon-offset": dividerOffset } as CSSProperties} />}

      <ul className={styles.services}>
        {railServices.map((service, index) => {
          const { scale, offset } = transforms[index];
          const centerY = compact ? service.compactY : service.sidebarY;
          return <li key={service.id} className={styles.service} data-service={service.id}
            style={{ ...frame(compact ? 183 : 188, centerY - (compact ? 18 : 15), compact ? 36 : 196, compact ? 36 : 30), "--icon-scale": scale, "--icon-offset": offset } as CSSProperties}>
            <span className={styles.mark}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/paguro/services/${service.id}.svg`} alt="" width={22} height={22} draggable={false} />
            </span>
            {!compact && <span className={styles.label}>{service.name}</span>}
          </li>;
        })}
      </ul>
    </div>
  );
}
