"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import styles from "./hero-shots.module.css";

type Shot = {
  id: string;
  label: string;
  alt: string;
  src: string;
  icon: ReactNode;
  desktopOnly?: boolean;
};

// Keep keyboard navigation in sync with the CSS that hides desktop-only tabs.
const mobileQuery = "(max-width: 767px)";
const readMobile = () => window.matchMedia(mobileQuery).matches;
const readServerMobile = () => false;

function subscribeToMobile(callback: () => void) {
  const media = window.matchMedia(mobileQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function HeroShots({ app, label, shots, width, height, desktopClassName, frameClassName, children }: {
  app: string;
  label: string;
  shots: readonly Shot[];
  width: number;
  height: number;
  desktopClassName: string;
  frameClassName: string;
  children: ReactNode;
}) {
  const [selected, setSelected] = useState(0);
  const mobile = useSyncExternalStore(subscribeToMobile, readMobile, readServerMobile);
  const visibleTabs = shots.flatMap((shot, index) => mobile && shot.desktopOnly ? [] : [index]);
  const active = visibleTabs.includes(selected) ? selected : visibleTabs[visibleTabs.length - 1];
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const list = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const panelId = `${app}-shot`;

  useLayoutEffect(() => {
    const tabList = list.current;
    const pill = indicator.current;
    const tab = tabs.current[active];
    if (!tabList || !pill || !tab) return;

    const place = () => {
      pill.style.transform = `translateX(${tab.offsetLeft}px)`;
      pill.style.width = `${tab.offsetWidth}px`;
    };
    place();
    if (!tabList.hasAttribute("data-ready")) {
      tabList.setAttribute("data-ready", "");
      requestAnimationFrame(() => tabList.setAttribute("data-animate", ""));
    }
    const observer = new ResizeObserver(place);
    observer.observe(tabList);
    observer.observe(tab);
    return () => observer.disconnect();
  }, [active]);

  function select(index: number) {
    if (index === active) return;
    setSelected(index);
    trackEvent("hero-interaction", { action: "select-screen", screen: shots[index].id, location: "hero" });
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = visibleTabs.indexOf(active);
    const next = { ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: visibleTabs.length - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const index = visibleTabs[(next + visibleTabs.length) % visibleTabs.length];
    select(index);
    tabs.current[index]?.focus();
  }

  return (
    <>
      <div className={desktopClassName}>
        {children}
        <div id={panelId} role="tabpanel" aria-labelledby={`${app}-tab-${shots[active].id}`} className={`${styles.frame} ${frameClassName}`}>
          {shots.map(({ id, src, alt, desktopOnly }, index) => (
            <div key={id} className={styles.shot} data-active={index === active} data-desktop-only={desktopOnly || undefined} aria-hidden={index !== active}>
              {(["light", "dark"] as const).map((theme) => (
                <Image
                  key={theme}
                  src={`${src}-${theme}.webp`}
                  alt={alt}
                  width={width}
                  height={height}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "low"}
                  decoding="async"
                  className={`${styles.screenshot} ${theme === "light" ? "[display:var(--icon-light-display)]" : "[display:var(--icon-dark-display)]"}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.shotTabs}>
        <span aria-hidden="true" className={styles.connector} />
        <div ref={list} role="tablist" aria-label={label} onKeyDown={onKeyDown} className={styles.tabList}>
          <span ref={indicator} aria-hidden="true" className={styles.tabIndicator} />
          {shots.map(({ id, label, icon, desktopOnly }, index) => {
            const isActive = index === active;
            return (
              <button
                key={id}
                ref={(node) => { tabs.current[index] = node; }}
                id={`${app}-tab-${id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                data-desktop-only={desktopOnly || undefined}
                tabIndex={isActive ? 0 : -1}
                onClick={() => select(index)}
                className={styles.tab}
              >
                <span aria-hidden="true" className={styles.tabIcon}>{icon}</span>
                <span className={styles.tabLabel}><span>{label}</span></span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
