"use client";

import { useSyncExternalStore } from "react";
import { AppleMark } from "@/components/ui/apple-mark";
import type { Locale } from "@/lib/i18n";
import styles from "./desktop-menu-bar.module.css";

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
  return (
    <time className={styles.clock} dateTime={now?.toISOString()} aria-label={now ? `${date} ${time}` : undefined}>
      <span className={styles.date}>{date}</span>
      <span className={styles.compactDate}>{compactDate}</span>
      <span>{time || "\u00a0"}</span>
    </time>
  );
}

export function DesktopMenuBar({ appName, locale, reserveCenter = false }: {
  appName: string;
  locale: Locale;
  reserveCenter?: boolean;
}) {
  return (
    <div className={styles.menuBar} data-reserve-center={reserveCenter || undefined}>
      <div className={styles.appMenus} aria-hidden="true">
        <AppleMark />
        <strong>{appName}</strong>
      </div>
      <MenuClock locale={locale} />
    </div>
  );
}
