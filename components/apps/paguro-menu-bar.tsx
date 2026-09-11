"use client";

import { useSyncExternalStore } from "react";
import { SystemIcon, SunIcon, MoonIcon, type ThemePref } from "@/components/layout/theme-toggle";
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

export function PaguroMenuBar({ copy, locale, theme, onThemeChange }: {
  copy: Dictionary["paguroHero"];
  locale: Locale;
  theme: ThemePref;
  onThemeChange: (theme: ThemePref) => void;
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

function PreviewThemeToggle({ theme, onChange, copy }: { theme: ThemePref; onChange: (theme: ThemePref) => void; copy: Dictionary["paguroHero"] }) {
  return (
    <div role="group" aria-label={copy.previewTheme} className={styles.themeToggle}>
      {([
        ["system", copy.previewSystem, SystemIcon],
        ["light", copy.previewLight, SunIcon],
        ["dark", copy.previewDark, MoonIcon],
      ] as const).map(([value, label, Icon]) => (
        <button key={value} type="button" aria-label={label} title={label} aria-pressed={theme === value} onClick={() => onChange(value)}>
          <Icon />
        </button>
      ))}
    </div>
  );
}
