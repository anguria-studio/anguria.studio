"use client";

import { useEffect, useRef, useState, type AnimationEvent, type CSSProperties } from "react";
import styles from "./paguro-service-strip.module.css";
import { familiarServices, shouldPlayWave, shouldRippleFrom, waveOffset, waveThreshold } from "@/lib/paguro-service-strip";

/**
 * The service tiles wave when they arrive, and again from under the pointer.
 *
 * Scroll-triggered rather than joining the page's load choreography: this strip
 * sits well below the fold, and a load-time entrance would be over before a
 * scroll ever reached it (see the note on --stagger-step in globals.css).
 */
export function PaguroServiceStrip() {
  const list = useRef<HTMLUListElement | null>(null);
  // The tile the ripple starts from, or null when the row is at rest.
  const [wave, setWave] = useState<{ origin: number } | null>(null);
  const ended = useRef(0);

  function start(origin: number) {
    ended.current = 0;
    setWave({ origin });
  }

  useEffect(() => {
    const strip = list.current;
    if (!strip || typeof IntersectionObserver === "undefined") return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    let played = false;
    // Excluding the sticky 80px header from the visible area, as the hero hints
    // do: a strip sliding under it is not a strip the reader is looking at.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!shouldPlayWave({ played, reducedMotion: motion.matches, ratio: entry.intersectionRatio, threshold: waveThreshold })) continue;
        // Once per load for this trigger. The arrival wave is an arrival, and
        // scrolling back up does not make the tiles arrive again, so the
        // observer retires here; the pointer can still ask for more.
        played = true;
        start(0);
        observer.disconnect();
      }
    }, { rootMargin: "-80px 0px 0px", threshold: waveThreshold });
    observer.observe(strip);

    return () => observer.disconnect();
  }, []);

  function ripple(origin: number) {
    // Read the preference here rather than trusting the mount-time match: it can
    // change under us, and see shouldRippleFrom for why that would jam the lock.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!shouldRippleFrom({ inFlight: wave !== null, reducedMotion })) return;
    start(origin);
  }

  function settle(event: AnimationEvent<HTMLUListElement>) {
    if (event.animationName !== styles.wave) return;
    // Counting real ends instead of running a timer: the duration is assembled
    // from tokens, and retiming the wave should not mean retiming this too.
    if (++ended.current < familiarServices.length) return;
    // Dropping the attribute rearms the animation as well as the pointer, so a
    // replay needs no new keys — re-keying would remount the lazy images.
    setWave(null);
  }

  return (
    <ul ref={list} data-wave={wave ? "" : undefined} onAnimationEnd={settle} className={`${styles.strip} mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-5 sm:gap-7`}>
      {familiarServices.map(([slug, name], index) => (
        <li key={slug} title={name} onPointerEnter={() => ripple(index)}
          style={{ "--i": wave ? waveOffset(index, wave.origin, familiarServices.length) : 0 } as CSSProperties}
          className="flex size-14 items-center justify-center rounded-2xl border border-hairline bg-white shadow-sm motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:-rotate-6 sm:size-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/paguro/services/${slug}.svg`} alt={name} width={40} height={40} loading="lazy" className={`size-8 sm:size-10 ${slug === "chatgpt" ? "invert" : ""}`} />
        </li>
      ))}
    </ul>
  );
}
