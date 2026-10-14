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
    let countdownDelay = 0;
    let disposed = false;

    const stop = () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(countdownDelay);
      if (price) price.textContent = "0";
      cards.forEach(card => card.removeAttribute("data-bento-entering"));
    };
    const countdown = (card: HTMLElement) => {
      if (!price) return;
      price.textContent = "100";
      countdownDelay = window.setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1400, 1);
          price.textContent = String(Math.ceil(100 * (1 - progress) ** 2));
          if (progress < 1) frame = requestAnimationFrame(tick);
          else card.removeAttribute("data-bento-entering");
        };
        frame = requestAnimationFrame(tick);
      }, 700);
    };

    // CSS owns the keyframes and hover effects. This attribute only starts the
    // one entrance when a card becomes visible; removing it prevents replays.
    const observer = new IntersectionObserver(entries => {
      if (disposed) return;
      entries.forEach(entry => {
        if (!entry.isIntersecting || entry.intersectionRatio < .15) return;
        observer.unobserve(entry.target);
        if (motion.matches || document.hidden) return;
        const card = entry.target as HTMLElement;
        card.setAttribute("data-bento-entering", "");
        if (card.dataset.bentoAnimation === "free") countdown(card);
      });
    }, { threshold: .15 });
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
