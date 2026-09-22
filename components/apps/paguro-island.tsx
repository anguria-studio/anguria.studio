"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { Dictionary } from "@/lib/dictionaries/en";
import { dragAppearance, foldPlacement, islandHeight, islandLayout, serviceNames, shouldDismiss } from "@/lib/paguro-island";
import type { DemoNotification, IslandAction, IslandPhase } from "@/lib/paguro-island";
import styles from "./paguro-island.module.css";

type Props = {
  copy: Dictionary["paguroHero"];
  notifications: DemoNotification[];
  phase: IslandPhase;
  dispatch: (action: IslandAction) => void;
  openNotification: (notification: DemoNotification) => void;
  remove: (ids: number[], all: boolean) => void;
};

type Drag = {
  id: number; pointer: number; x: number; y: number; lastX: number; lastTime: number;
  velocity: number; horizontal?: boolean; element: HTMLElement; width: number;
};

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Bell() {
  return <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M10 2a5 5 0 0 0-5 5v3l-1.5 3a1 1 0 0 0 .9 1.5h11.2a1 1 0 0 0 .9-1.5L15 10V7a5 5 0 0 0-5-5Zm-2 14a2 2 0 0 0 4 0H8Z" /></svg>;
}

// Recompute in the animation frame, without React renders during scrolling.
function paintStack(scroller: HTMLDivElement) {
  const rows = Array.from(scroller.querySelectorAll<HTMLElement>("[data-row]"));
  const reduce = reducedMotion();
  const visible: { element: HTMLElement; rect: DOMRect }[] = [];
  for (const row of rows) {
    const bottom = row.offsetTop + islandLayout.cardHeight - scroller.scrollTop;
    const placement = foldPlacement(bottom, scroller.clientHeight, rows.length);
    row.style.transform = `translateY(${placement.offset}px) scale(${reduce ? 1 : placement.scale})`;
    row.style.opacity = String(placement.opacity);
    row.style.pointerEvents = placement.opacity === 0 ? "none" : "";
    const card = row.querySelector<HTMLElement>("[data-card]")!;
    card.style.maskImage = "none";
    if (placement.opacity > 0) visible.push({ element: card, rect: card.getBoundingClientRect() });
  }

  // Erase covered cards before drawing the front glass, as the native app's
  // destination-out blend does. Otherwise translucent cards show text twice.
  visible.forEach(({ element, rect }, index) => {
    const covers = visible.slice(0, index).filter(({ rect: front }) =>
      front.bottom > rect.top && front.top < rect.bottom && front.right > rect.left && front.left < rect.right);
    if (!covers.length || !rect.width) return;
    const scale = rect.width / element.offsetWidth;
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    const cuts = covers.map(({ rect: front }) => `<rect x="${(front.left - rect.left) / scale}" y="${(front.top - rect.top) / scale}" width="${front.width / scale}" height="${front.height / scale}" rx="${12 * front.width / rect.width}" fill="black"/>`).join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -8 ${width + 16} ${height + 16}"><mask id="cut" maskUnits="userSpaceOnUse" x="-8" y="-8" width="${width + 16}" height="${height + 16}"><rect x="-8" y="-8" width="${width + 16}" height="${height + 16}" fill="white"/>${cuts}</mask><rect x="-8" y="-8" width="${width + 16}" height="${height + 16}" fill="white" mask="url(#cut)"/></svg>`;
    element.style.maskImage = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  });
}

export function PaguroIsland({ copy, notifications, phase, dispatch, remove, openNotification }: Props) {
  const shell = useRef<HTMLDivElement>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const hovered = useRef(false);
  const keyboard = useRef(false);
  const drag = useRef<Drag | null>(null);
  const pending = useRef(new Set<number>());
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const alertTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const frame = useRef(0);
  const animateUntil = useRef(0);
  const mounted = useRef(true);
  const suppressClick = useRef(false);
  const expanded = phase === "expanded";
  const preview = phase === "preview";
  const latest = notifications[0];
  const latestID = latest?.id;
  const previousID = useRef(0);

  const repaint = useCallback((duration = 0) => {
    animateUntil.current = Math.max(animateUntil.current, performance.now() + duration);
    if (frame.current) return;
    const draw = () => {
      if (scroll.current) paintStack(scroll.current);
      frame.current = performance.now() < animateUntil.current ? requestAnimationFrame(draw) : 0;
    };
    frame.current = requestAnimationFrame(draw);
  }, []);

  useLayoutEffect(() => {
    if (scroll.current) paintStack(scroll.current);
    repaint(450);
  }, [notifications, expanded, repaint]);

  useEffect(() => {
    const observer = new ResizeObserver(() => repaint());
    if (scroll.current) observer.observe(scroll.current);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => repaint();
    motion.addEventListener("change", update);
    mounted.current = true;
    return () => {
      mounted.current = false;
      observer.disconnect();
      motion.removeEventListener("change", update);
      cancelAnimationFrame(frame.current);
      frame.current = 0;
      clearTimeout(collapseTimer.current);
      clearTimeout(alertTimer.current);
    };
  }, [repaint]);

  useEffect(() => {
    // A new sample gets a four-second compact preview. Hover takes over.
    if (latestID !== undefined && latestID > previousID.current) {
      previousID.current = latestID;
      if (scroll.current) scroll.current.scrollTop = 0;
      // Leaving the notch to send a sample can queue a collapse before arrival.
      clearTimeout(collapseTimer.current);
    }
    if (phase !== "preview" || latestID === undefined) return;
    alertTimer.current = setTimeout(() => {
      if (!shell.current?.contains(document.activeElement)) dispatch({ type: "expire", id: latestID });
    }, 4000);
    return () => clearTimeout(alertTimer.current);
  }, [latestID, phase, dispatch]);

  function collapse() {
    dispatch({ type: "collapse" });
    if (shell.current?.contains(document.activeElement)) toggle.current?.focus({ preventScroll: true });
  }

  function scheduleCollapse() {
    clearTimeout(collapseTimer.current);
    if (phase === "collapsed") return;
    collapseTimer.current = setTimeout(() => {
      if (!hovered.current && !drag.current && !(keyboard.current && shell.current?.contains(document.activeElement))) {
        dispatch({ type: "collapse", latestID });
      }
    }, 180);
  }

  function reveal(row: HTMLElement) {
    const scroller = scroll.current;
    if (!scroller) return;
    const top = Number(row.dataset.index) * islandLayout.pitch + islandLayout.top;
    const safeBottom = scroller.clientHeight - (notifications.length > 3 ? islandLayout.clearance : 0);
    if (top - scroller.scrollTop < islandLayout.top) scroller.scrollTop = top - islandLayout.top;
    else if (top + islandLayout.cardHeight - scroller.scrollTop > safeBottom) scroller.scrollTop = top + islandLayout.cardHeight - safeBottom;
    repaint();
  }

  async function dismiss(ids: number[], all = false) {
    const fresh = ids.filter((id) => !pending.current.has(id));
    if (!fresh.length) return;
    fresh.forEach((id) => pending.current.add(id));
    const rows = Array.from(scroll.current!.querySelectorAll<HTMLElement>("[data-row]"));
    const leaving = rows.filter((row) => fresh.includes(Number(row.dataset.row)));
    const focused = leaving.some((row) => row.contains(document.activeElement));
    if (focused || (all && shell.current?.contains(document.activeElement))) {
      const firstIndex = rows.indexOf(leaving[0]);
      const available = rows.filter((row) => !pending.current.has(Number(row.dataset.row)));
      const next = available.find((row) => rows.indexOf(row) > firstIndex) ?? available.at(-1);
      (next?.querySelector<HTMLButtonElement>("[data-body]") ?? toggle.current)?.focus({ preventScroll: true });
    }
    const reduce = reducedMotion();
    const viewport = scroll.current!.getBoundingClientRect();
    let visibleIndex = 0;
    let exitDuration = 180;
    const animations = leaving.map((row) => {
      row.inert = true;
      const card = row.querySelector<HTMLElement>("[data-card]")!;
      const bounds = row.getBoundingClientRect();
      const visible = bounds.bottom > viewport.top && bounds.top < viewport.bottom
        && Number(getComputedStyle(row).opacity) > 0;
      // Stagger the visible stack, without waiting on a long offscreen history.
      const delay = all && !reduce && visible ? Math.min(visibleIndex++, 4) * 65 : 0;
      exitDuration = Math.max(exitDuration, delay + 180);
      const animation = card.animate([
        { transform: getComputedStyle(card).transform, opacity: getComputedStyle(card).opacity },
        { transform: reduce ? "none" : `translateX(${card.offsetWidth + 40}px) scale(.96)`, opacity: 0 },
      ], { duration: 180, delay, easing: "ease-out", fill: "forwards" });
      return animation.finished;
    });
    repaint(exitDuration + 50);
    await Promise.allSettled(animations);
    if (!mounted.current) return;
    remove(fresh, all);
    fresh.forEach((id) => pending.current.delete(id));
  }

  function startDrag(event: ReactPointerEvent<HTMLDivElement>, id: number) {
    if (event.button !== 0 || (event.target as HTMLElement).closest("[data-dismiss]") || pending.current.has(id)) return;
    suppressClick.current = false;
    drag.current = { id, pointer: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX, lastTime: event.timeStamp, velocity: 0, element: event.currentTarget, width: event.currentTarget.offsetWidth };
  }

  function moveDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || current.pointer !== event.pointerId) return;
    const x = event.clientX - current.x;
    const y = event.clientY - current.y;
    if (current.horizontal === undefined && Math.hypot(x, y) >= 8) {
      current.horizontal = Math.abs(x) > Math.abs(y);
      suppressClick.current = true;
      if (current.horizontal) {
        current.element.setPointerCapture(event.pointerId);
        current.element.dataset.dragging = "true";
      }
    }
    if (!current.horizontal) return;
    event.preventDefault();
    const elapsed = event.timeStamp - current.lastTime;
    if (elapsed > 0) current.velocity = (event.clientX - current.lastX) / elapsed * 1000;
    current.lastX = event.clientX;
    current.lastTime = event.timeStamp;
    const appearance = dragAppearance(x, current.width, reducedMotion());
    current.element.style.transform = `translateX(${appearance.offset}px)`;
    current.element.style.opacity = String(appearance.opacity);
    repaint();
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>, cancelled = false) {
    const current = drag.current;
    if (!current || current.pointer !== event.pointerId) return;
    drag.current = null;
    delete current.element.dataset.dragging;
    if (current.element.hasPointerCapture(event.pointerId)) current.element.releasePointerCapture(event.pointerId);
    const x = event.clientX - current.x;
    const velocity = event.timeStamp - current.lastTime > 100 ? 0 : current.velocity;
    if (current.horizontal && !cancelled && shouldDismiss(x, velocity, current.width)) void dismiss([current.id]);
    else {
      current.element.style.transform = "";
      current.element.style.opacity = "";
      repaint(400);
    }
    // Pointer capture suppresses leave events; check the actual release point.
    const rect = shell.current?.getBoundingClientRect();
    hovered.current = !!rect && event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    dispatch({ type: "hover", active: hovered.current });
    if (!hovered.current) scheduleCollapse();
  }

  return (
    <div className={styles.silhouette} data-phase={phase} data-open={expanded} data-empty={notifications.length === 0}>
    <div ref={shell} className={styles.island} data-phase={phase} data-open={expanded} style={{ height: expanded ? islandHeight(notifications.length) : preview ? 120 : islandLayout.toolbarHeight }}
      onPointerEnter={(event) => {
        if (event.pointerType === "touch") return;
        hovered.current = true;
        clearTimeout(collapseTimer.current);
        dispatch({ type: "hover", active: true });
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "touch") return;
        hovered.current = false;
        dispatch({ type: "hover", active: false });
        if (drag.current && !drag.current.horizontal) drag.current = null;
        scheduleCollapse();
      }}
      onPointerDown={() => { keyboard.current = false; dispatch({ type: "keyboard-focus", active: false }); }}
      onFocusCapture={(event) => {
        if ((event.target as HTMLElement).matches(":focus-visible")) {
          keyboard.current = true;
          dispatch({ type: "keyboard-focus", active: true });
        }
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          keyboard.current = false;
          dispatch({ type: "keyboard-focus", active: false });
          scheduleCollapse();
        }
      }}
      onKeyDown={(event) => {
        keyboard.current = true;
        dispatch({ type: "keyboard-focus", active: true });
        if (event.key === "Escape") { event.preventDefault(); collapse(); return; }
        const row = (event.target as HTMLElement).closest<HTMLElement>("[data-row]");
        if (!row) return;
        if (event.key === "Delete" || event.key === "Backspace") { event.preventDefault(); void dismiss([Number(row.dataset.row)]); }
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          const rows = Array.from(scroll.current!.querySelectorAll<HTMLElement>("[data-row]")).filter((item) => !item.inert);
          const next = rows[rows.indexOf(row) + (event.key === "ArrowDown" ? 1 : -1)];
          next?.querySelector<HTMLButtonElement>("[data-body]")?.focus({ preventScroll: true });
        }
      }}>
      <div className={styles.toolbar}>
        <button ref={toggle} type="button" className={preview ? styles.preview : styles.counter} aria-expanded={preview ? undefined : expanded} aria-controls={preview ? undefined : "paguro-notifications"} aria-label={preview && latest ? `${serviceNames[latest.service]}: ${latest.title}` : expanded ? copy.collapse : `${copy.open} (${notifications.length})`}
          aria-describedby={preview ? "paguro-latest-notification" : undefined}
          onClick={(event) => {
            keyboard.current = event.detail === 0;
            if (preview && latest) openNotification(latest);
            else if (expanded) collapse();
            else dispatch({ type: "expand" });
          }}>
          {preview && latest ? <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/paguro/services/${latest.service}.svg`} alt="" width="34" height="34" draggable="false" />
            <span id="paguro-latest-notification" className={styles.previewContent} key={latest.id}>
              <strong className={styles.previewService}>{serviceNames[latest.service]}</strong>
              <span className={styles.previewTitle}>{latest.title}</span>
              <span className={styles.previewMessage}>{latest.message}</span>
            </span>
            <span className={styles.previewCount}>{notifications.length > 99 ? "99+" : notifications.length}</span>
          </> : <>{expanded && <Bell />}{notifications.length > 0 && <span>{notifications.length}</span>}</>}
        </button>
        {expanded && <button type="button" className={styles.clear} onClick={() => void dismiss(notifications.map(({ id }) => id), true)}>{copy.clear}</button>}
      </div>
      <div ref={scroll} id="paguro-notifications" className={styles.scroll} onScroll={() => repaint()} aria-hidden={!expanded} inert={!expanded}>
        <div className={styles.history} style={{ height: islandLayout.top + notifications.length * islandLayout.pitch - islandLayout.gap + (notifications.length > 3 ? islandLayout.clearance : 0) }}>
          {notifications.map((notification, index) => (
            <div key={notification.id} data-row={notification.id} data-index={index} className={styles.row} style={{ top: islandLayout.top + index * islandLayout.pitch, zIndex: notifications.length - index }}
              onFocusCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) reveal(event.currentTarget); }}>
              <div className={styles.arrival}>
                <div data-card className={styles.card} onPointerDown={(event) => startDrag(event, notification.id)} onPointerMove={moveDrag}
                  onPointerUp={(event) => endDrag(event)} onPointerCancel={(event) => endDrag(event, true)}>
                  <button data-body type="button" className={styles.body} aria-label={`${serviceNames[notification.service]}, ${notification.title}. ${notification.message}`}
                    onClick={(event) => { if (event.detail === 0 || !suppressClick.current) { toggle.current?.focus({ preventScroll: true }); openNotification(notification); } suppressClick.current = false; }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/paguro/services/${notification.service}.svg`} alt="" width="30" height="30" draggable="false" />
                    <span className={styles.content}>
                      <span className={styles.metadata}><strong>{serviceNames[notification.service]}</strong><span>{copy.now}</span></span>
                      <span className={styles.title}>{notification.title}</span>
                      <span className={styles.message}>{notification.message}</span>
                    </span>
                  </button>
                  <button data-dismiss type="button" className={styles.dismiss} onClick={() => void dismiss([notification.id])} aria-label={`${copy.dismiss}: ${notification.title}`}>
                    <span><svg viewBox="0 0 12 12" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m2 2 8 8M2 10l8-8" /></svg></span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.camera} aria-hidden="true" />
    </div>
    </div>
  );
}
