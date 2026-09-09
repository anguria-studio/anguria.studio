"use client";

import { useSyncExternalStore } from "react";
import { AppleMark } from "@/components/ui/apple-mark";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import styles from "./paguro-desktop.module.css";

function subscribeToClock(update: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  function tick() {
    update();
    timer = setTimeout(tick, 60_000 - Date.now() % 60_000 + 20);
  }
  timer = setTimeout(tick, 60_000 - Date.now() % 60_000 + 20);
  document.addEventListener("visibilitychange", update);
  window.addEventListener("focus", update);
  return () => {
    clearTimeout(timer);
    document.removeEventListener("visibilitychange", update);
    window.removeEventListener("focus", update);
  };
}

const readMinute = () => Math.floor(Date.now() / 60_000) * 60_000;
const serverMinute = () => null;

function MenuClock({ locale }: { locale: Locale }) {
  // No build-time date or server timezone is sent in the static HTML.
  const minute = useSyncExternalStore(subscribeToClock, readMinute, serverMinute);
  const now = minute === null ? null : new Date(minute);
  const dateLocale = locale === "en" ? "en-GB" : locale;
  const date = now ? new Intl.DateTimeFormat(dateLocale, { weekday: "short", day: "numeric", month: "short" }).format(now) : "";
  const compactDate = now ? new Intl.DateTimeFormat(dateLocale, { day: "2-digit", month: "2-digit" }).format(now) : "";
  const time = now ? new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(now) : "";
  return <time className={styles.clock} dateTime={now?.toISOString()} aria-label={`${date} ${time}`}><span className={styles.date}>{date}</span><span className={styles.compactDate}>{compactDate}</span><span>{time || "\u00a0"}</span></time>;
}

const iconProps = { viewBox: "0 0 20 20", width: 16, height: 16, fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function PaguroMenuBar({ copy, locale, theme, onThemeChange }: {
  copy: Dictionary["paguroHero"];
  locale: Locale;
  theme: "light" | "dark";
  onThemeChange: (theme: "light" | "dark") => void;
}) {
  return (
    <div className={styles.menuBar}>
      <div className={styles.appMenus} aria-hidden="true">
        <AppleMark className="size-4" /><strong>Paguro</strong>
      </div>
      <div className={styles.statusItems}>
        <PreviewThemeToggle theme={theme} onChange={onThemeChange} copy={copy} />
        <MenuClock locale={locale} />
      </div>
    </div>
  );
}

function PreviewThemeToggle({ theme, onChange, copy }: { theme: "light" | "dark"; onChange: (theme: "light" | "dark") => void; copy: Dictionary["paguroHero"] }) {
  return (
    <div role="group" aria-label={copy.previewTheme} className={styles.themeToggle}>
      <button type="button" aria-label={copy.previewLight} title={copy.previewLight} aria-pressed={theme === "light"} onClick={() => onChange("light")}>
        <svg {...iconProps} viewBox="0 0 16 16"><circle cx="8" cy="8" r="3.25" /><path d="M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.95 3.05l-1.06 1.06M4.11 11.89l-1.06 1.06M12.95 12.95l-1.06-1.06M4.11 4.11L3.05 3.05" /></svg>
      </button>
      <button type="button" aria-label={copy.previewDark} title={copy.previewDark} aria-pressed={theme === "dark"} onClick={() => onChange("dark")}>
        <svg {...iconProps} viewBox="0 0 16 16"><path d="M13.5 9.4A5.75 5.75 0 0 1 6.6 2.5a5.75 5.75 0 1 0 6.9 6.9z" /></svg>
      </button>
    </div>
  );
}
