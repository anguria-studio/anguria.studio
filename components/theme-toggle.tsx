"use client";

import { useEffect, useSyncExternalStore } from "react";

export type ThemePref = "system" | "light" | "dark";

const KEY = "theme";

function readPref(): ThemePref {
  try {
    const t = localStorage.getItem(KEY);
    return t === "light" || t === "dark" ? t : "system";
  } catch {
    return "system";
  }
}

/**
 * `storage` only fires in *other* tabs, so same-tab changes need their own
 * notification for useSyncExternalStore to re-render.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function setTheme(pref: ThemePref) {
  // Suppress hover transitions for this frame, otherwise every card and link
  // cross-fades through grey on the way to the new palette.
  const el = document.documentElement;
  el.dataset.themeSwitching = "";
  // Written synchronously as well as in the effect below, so the colours change
  // in the same frame as the click rather than one paint later.
  applyToDocument(pref);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => delete el.dataset.themeSwitching);
  });
  try {
    if (pref === "system") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, pref);
  } catch {
    /* storage blocked; the attribute still applies for this page view */
  }
  listeners.forEach((l) => l());
}

function applyToDocument(pref: ThemePref) {
  const el = document.documentElement;
  if (pref === "system") delete el.dataset.theme;
  else el.dataset.theme = pref;
}

/**
 * Segmented control: system / light / dark, one tab each.
 *
 * The only client component on the site. Two things keep it honest:
 *
 * 1. The server snapshot is "system", so the first client render matches the
 *    server exactly; the stored value is only read on the client. `aria-pressed`
 *    is driven by that value and so is correct from hydration onwards.
 * 2. The *visible* selection is not driven by that value — the `theme-*`
 *    variants in globals.css pick the lit tab off `data-theme` on <html>, which
 *    the inline script set before paint. So the right tab is lit immediately
 *    despite (1), with no flash on the way through hydration.
 *
 * There is deliberately no matchMedia listener: in "system" state the attribute
 * is absent, so the prefers-color-scheme query in globals.css tracks OS changes
 * on its own. Adding a listener here would be dead code.
 */
export function ThemeToggle({
  labels,
}: {
  labels: { label: string; system: string; light: string; dark: string };
}) {
  const pref = useSyncExternalStore(subscribe, readPref, () => "system" as const);

  // Idempotent re-assert. Matters in dev, where Strict Mode's remount resets
  // <html> to React-managed attributes and wipes what the inline script set.
  useEffect(() => {
    applyToDocument(pref);
  }, [pref]);

  return (
    <div
      role="group"
      aria-label={labels.label}
      // The track. Same pill radius as the language switcher beside it.
      className="flex items-center gap-0.5 rounded-full bg-foreground/5 p-0.5"
    >
      <Tab
        pref="system"
        active={pref === "system"}
        label={labels.system}
        // Lit unless an explicit choice has overridden the OS.
        lit="theme-system:bg-foreground/10 theme-system:text-foreground"
      >
        <SystemIcon />
      </Tab>
      <Tab
        pref="light"
        active={pref === "light"}
        label={labels.light}
        lit="theme-light:bg-foreground/10 theme-light:text-foreground"
      >
        <SunIcon />
      </Tab>
      <Tab
        pref="dark"
        active={pref === "dark"}
        label={labels.dark}
        lit="theme-dark:bg-foreground/10 theme-dark:text-foreground"
      >
        <MoonIcon />
      </Tab>
    </div>
  );
}

function Tab({
  pref,
  active,
  label,
  lit,
  children,
}: {
  pref: ThemePref;
  active: boolean;
  label: string;
  lit: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => setTheme(pref)}
      aria-pressed={active}
      aria-label={label}
      title={label}
      suppressHydrationWarning
      className={`cursor-pointer rounded-full p-1.5 text-muted transition hover:text-foreground ${lit}`}
    >
      {children}
    </button>
  );
}

const SVG_PROPS = {
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Display: the conventional "match the OS" glyph. */
function SystemIcon() {
  return (
    <svg {...SVG_PROPS} className="size-4">
      <rect x="1.75" y="2.75" width="12.5" height="9" rx="1.5" />
      <path d="M5.5 14.25h5" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg {...SVG_PROPS} className="size-4">
      <circle cx="8" cy="8" r="3.25" />
      <path d="M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.95 3.05l-1.06 1.06M4.11 11.89l-1.06 1.06M12.95 12.95l-1.06-1.06M4.11 4.11L3.05 3.05" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg {...SVG_PROPS} className="size-4">
      <path d="M13.5 9.4A5.75 5.75 0 0 1 6.6 2.5a5.75 5.75 0 1 0 6.9 6.9z" />
    </svg>
  );
}
