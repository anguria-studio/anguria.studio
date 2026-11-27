import type { CSSProperties, ReactNode } from "react";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { HeroShots } from "./hero-shots";
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

const screenshotSets: Record<Locale, { directory: string; height: number }> = {
  en: { directory: "/moppo", height: 1190 },
  it: { directory: "/moppo/it", height: 1216 },
  fr: { directory: "/moppo/fr", height: 1216 },
  es: { directory: "/moppo/es", height: 1216 },
};

export function MoppoHeroShots({ copy, locale, children }: { copy: Dictionary["moppoPage"]["hero"]; locale: Locale; children: ReactNode }) {
  const { directory, height } = screenshotSets[locale];

  return (
    <HeroShots
      app="moppo"
      label={copy.shotsLabel}
      shots={shots.map(({ id, icon }) => ({
        id,
        ...copy.shots[id],
        src: `${directory}/${id}`,
        icon: <span style={{ "--icon": `url("/moppo/tools/${icon}.png")` } as CSSProperties} />,
      }))}
      width={1800}
      height={height}
      desktopClassName={styles.desktop}
      frameClassName={styles.appFrame}
    >
      {children}
    </HeroShots>
  );
}
