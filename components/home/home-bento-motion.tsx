"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function HomeBentoMotion({ children, className, label }: { children: ReactNode; className: string; label: string }) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = section.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // App cards start in CSS at first paint, before this effect can run.
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-bento-animation]:not([data-bento-load])"));
    const price = root.querySelector<HTMLElement>("[data-bento-part='price']");
    let frame = 0;
    let disposed = false;

    const stop = () => {
      cancelAnimationFrame(frame);
      if (price) price.textContent = "0";
      cards.forEach(card => card.removeAttribute("data-bento-entering"));
    };
    const countdown = (card: HTMLElement) => {
      if (!price) return;
      price.textContent = "20";
      // Exponential decay, like a slot reel: early numbers blur past, then each
      // tick takes longer than the last until the final 1 → 0 lingers.
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 2000, 1);
        price.textContent = progress < 1 ? String(Math.round(20 * 60 ** -progress)) : "0";
        if (progress < 1) frame = requestAnimationFrame(tick);
        else card.removeAttribute("data-bento-entering");
      };
      frame = requestAnimationFrame(tick);
    };

    // CSS owns the keyframes and hover effects. This attribute only starts the
    // one entrance on a card's first visible pixel, with no pause, so it is
    // already moving as it scrolls in; removing the attribute prevents replays.
    const observer = new IntersectionObserver(entries => {
      if (disposed) return;
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (motion.matches || document.hidden) return;
        const card = entry.target as HTMLElement;
        card.setAttribute("data-bento-entering", "");
        if (card.dataset.bentoAnimation === "free") countdown(card);
      });
    }, { threshold: 0 });
    // Each marker sits on a card's last entrance animation to finish.
    const finished = (event: AnimationEvent) => {
      const target = event.target;
      if (target instanceof Element && target.hasAttribute("data-bento-end")) {
        target.closest("[data-bento-animation]")?.removeAttribute("data-bento-entering");
      }
    };
    const visibility = () => { if (document.hidden) stop(); };
    const preference = () => { if (motion.matches) stop(); };

    cards.forEach(card => observer.observe(card));
    root.addEventListener("animationend", finished);
    motion.addEventListener("change", preference);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed = true;
      observer.disconnect();
      stop();
      root.removeEventListener("animationend", finished);
      motion.removeEventListener("change", preference);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  return <section ref={section} className={className} aria-label={label} data-analytics-location="home-bento">{children}</section>;
}
