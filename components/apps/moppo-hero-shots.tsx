"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import type { Dictionary } from "@/lib/dictionaries/en";
import styles from "./moppo-detail.module.css";

type ShotId = keyof Dictionary["moppoPage"]["hero"]["shots"];

// Order matches Moppo's sidebar. Icons are the app's own SF Symbols (see docs/moppo-assets.md).
const shots: { id: ShotId; icon: string }[] = [
  { id: "cleanup", icon: "cleanup" },
  { id: "storage", icon: "externaldrive" },
  { id: "uninstaller", icon: "xmark.app" },
  { id: "duplicates", icon: "square.on.square" },
  { id: "dashboard", icon: "gauge.with.needle" },
];

/** The hero desktop with a tab bar below it that switches between app screenshots. */
export function MoppoHeroShots({ copy, children }: { copy: Dictionary["moppoPage"]["hero"]; children: ReactNode }) {
  const [active, setActive] = useState<ShotId>("cleanup");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const list = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);

  // Keep the sliding pill on the selected tab, including while tab widths change
  // (font load, resize, and the label opening on small screens).
  useLayoutEffect(() => {
    const tabList = list.current;
    const pill = indicator.current;
    const tab = tabs.current[shots.findIndex((shot) => shot.id === active)];
    if (!tabList || !pill || !tab) return;
    const place = () => {
      pill.style.transform = `translateX(${tab.offsetLeft}px)`;
      pill.style.width = `${tab.offsetWidth}px`;
    };
    place();
    if (!tabList.hasAttribute("data-ready")) {
      tabList.setAttribute("data-ready", "");
      // Animate only after the first placement, so the pill doesn't slide in on load.
      requestAnimationFrame(() => tabList.setAttribute("data-animate", ""));
    }
    const observer = new ResizeObserver(place);
    observer.observe(tabList);
    observer.observe(tab);
    return () => observer.disconnect();
  }, [active]);

  function select(id: ShotId) {
    if (id === active) return;
    setActive(id);
    trackEvent("hero-interaction", { action: "select-screen", screen: id, location: "hero" });
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = shots.findIndex((shot) => shot.id === active);
    const next = { ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: shots.length - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const index = (next + shots.length) % shots.length;
    select(shots[index].id);
    tabs.current[index]?.focus();
  }

  return <>
    <div className={styles.desktop}>
      {children}
      <div id="moppo-shot" role="tabpanel" aria-labelledby={`moppo-tab-${active}`} className={styles.appFrame}>
        {shots.map(({ id }, index) => {
          const isActive = id === active;
          return <div key={id} className={styles.shot} data-active={isActive} aria-hidden={!isActive}>
            {(["light", "dark"] as const).map((theme) => (
              // Both images follow the shared CSS theme tokens, including system mode.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={theme}
                src={`/moppo/${id}-${theme}.webp`}
                alt={isActive ? copy.shots[id].alt : ""}
                width={1800}
                height={1190}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "low"}
                decoding="async"
                className={`${styles.screenshot} ${theme === "light" ? "[display:var(--icon-light-display)]" : "[display:var(--icon-dark-display)]"}`}
              />
            ))}
          </div>;
        })}
      </div>
    </div>

    <div className={styles.shotTabs}>
      <span aria-hidden="true" className={styles.connector} />
      <div ref={list} role="tablist" aria-label={copy.shotsLabel} onKeyDown={onKeyDown} className={styles.tabList}>
        <span ref={indicator} aria-hidden="true" className={styles.tabIndicator} />
        {shots.map(({ id, icon }, index) => {
          const isActive = id === active;
          return <button
            key={id}
            ref={(node) => { tabs.current[index] = node; }}
            id={`moppo-tab-${id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls="moppo-shot"
            tabIndex={isActive ? 0 : -1}
            onClick={() => select(id)}
            className={styles.tab}
          >
            <span aria-hidden="true" className={styles.tabIcon} style={{ "--icon": `url("/moppo/tools/${icon}.png")` } as CSSProperties} />
            <span className={styles.tabLabel}><span>{copy.shots[id].label}</span></span>
          </button>;
        })}
      </div>
    </div>
  </>;
}
