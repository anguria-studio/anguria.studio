"use client";

import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";
import { AppIcon } from "@/components/apps/app-icon";
import { MenuClock } from "@/components/apps/paguro-menu-bar";
import { AppleMark } from "@/components/ui/apple-mark";
import { ArrowRight } from "@/components/ui/arrow-right";
import { dockAppList, type AppSlug } from "@/lib/apps";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/en";
import styles from "./desktop-showcase.module.css";

const resting = dockAppList.map(() => ({ scale: 1, offset: 0 }));

export function DesktopShowcase({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const dockRef = useRef<HTMLElement>(null);
  const pointerInDock = useRef(false);
  const [transforms, setTransforms] = useState(resting);
  const [selected, setSelected] = useState<AppSlug>("paguro");
  const copy = dict.apps[selected];

  function magnify(x: number) {
    const dock = dockRef.current;
    if (!dock || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const links = Array.from(dock.querySelectorAll<HTMLButtonElement>("button"));
    // Measure resting layout coordinates. Transformed bounds would feed the
    // magnification back into itself and make the icons wobble under the mouse.
    const growth = links.map((link) => {
      const distance = Math.min(Math.abs(x - (link.offsetLeft + link.offsetWidth / 2)) / 120, 1);
      return link.offsetWidth * .55 * (Math.cos(distance * Math.PI) + 1) / 2;
    });
    let preceding = -growth.reduce((sum, value) => sum + value, 0) / 2;
    setTransforms(growth.map((value, index) => {
      const offset = preceding + value / 2;
      preceding += value;
      return { scale: 1 + value / links[index].offsetWidth, offset };
    }));
  }

  const spread = transforms.reduce((sum, item) => sum + (item.scale - 1) * 48, 0) / 2;

  return (
    <section className="mx-auto max-w-cards px-4 sm:px-6 motion-safe:fade-1" aria-label={dict.home.dockLabel}>
      <div className={styles.desktop}>
        <div className={styles.scene}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/shots/desktop.jpg" alt="" width={2560} height={1200} className={styles.wallpaper} />
        {dockAppList.map((meta) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={meta.slug} src={`/shots/${meta.shot}.jpg`} alt={selected === meta.slug ? copy.shotAlt : ""}
            width={2560} height={1200} className={styles.preview} data-visible={selected === meta.slug} />
        ))}
        </div>
        <Link href={localePath(locale, selected)} className={styles.copy}>
          <h2>{copy.name}</h2>
          <p className={styles.tagline}>{copy.tagline}</p>
          <p className={styles.description}>{copy.description}</p>
          <span className={styles.explore}>
            {copy.name}
            <span className={styles.arrowViewport} aria-hidden="true">
              <span className={styles.arrowTrack}><span><ArrowRight /></span><span><ArrowRight /></span></span>
            </span>
          </span>
        </Link>
        <div className={styles.menuBar}>
          <div className={styles.brand} aria-hidden="true"><AppleMark className="size-5" /><strong>Anguria Studio</strong></div>
          <div className={styles.status}>
            <MenuClock locale={locale} />
          </div>
        </div>
        <div className={styles.notch} aria-hidden="true"><span /></div>
        <div className={styles.dockRegion} onPointerLeave={() => {
          pointerInDock.current = false;
          setTransforms(resting);
        }} onPointerMove={(event) => {
          if (event.pointerType !== "mouse" || !dockRef.current) return;
          pointerInDock.current = true;
          magnify(event.clientX - dockRef.current.getBoundingClientRect().left);
        }}>
          <nav ref={dockRef} aria-label={dict.home.dockLabel} className={styles.dock} style={{ "--dock-spread": `${spread}px` } as CSSProperties}>
            {dockAppList.map((meta, index) => (
              <button key={meta.slug} type="button" onClick={() => setSelected(meta.slug)} aria-pressed={selected === meta.slug} aria-label={dict.apps[meta.slug].name}
                className={styles.app} style={{ "--scale": transforms[index].scale, "--offset": `${transforms[index].offset}px` } as CSSProperties}
                onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) magnify(event.currentTarget.offsetLeft + event.currentTarget.offsetWidth / 2); }}
                onBlur={() => {
                  // Clicking another icon blurs the previous one, but the
                  // pointer still controls magnification until it leaves.
                  if (!pointerInDock.current) setTransforms(resting);
                }}>
                <span className={styles.label}>{dict.apps[meta.slug].name}</span>
                <span className={styles.icon}>
                  {meta.slug === "paguro" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src="/paguro/app-icon-light.png" alt="" width={256} height={256} />
                  ) : <AppIcon meta={meta} />}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
