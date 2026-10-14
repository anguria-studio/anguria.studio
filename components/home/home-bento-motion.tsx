"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Playback = { finished: Promise<void>; cancel: () => void };

/** Animate only the artwork; the server-rendered links and copy stay intact. */
function playCard(card: HTMLElement, trigger: "entrance" | "hover"): Playback {
  const animations: Animation[] = [];
  const tasks: Promise<unknown>[] = [];
  const resets: (() => void)[] = [];
  const part = (name: string) => card.querySelector<HTMLElement>(`[data-bento-part="${name}"]`);
  const animate = (element: Element | null, frames: Keyframe[], options: KeyframeAnimationOptions) => {
    if (!element) return;
    const animation = element.animate(frames, { fill: "backwards", ...options });
    animations.push(animation);
    // Cancellation is expected when leaving the page or enabling Reduce Motion.
    tasks.push(animation.finished.catch(() => {}));
  };

  if (trigger === "hover") {
    animate(part("arrow"), [
      { transform: "translate(0, 0)", opacity: 1, offset: 0 },
      { transform: "translate(9px, -9px)", opacity: 0, offset: .4 },
      { transform: "translate(-9px, 9px)", opacity: 0, offset: .41 },
      { transform: "translate(0, 0)", opacity: 1, offset: 1 },
    ], { duration: 400, easing: "ease-out" });
  }

  switch (card.dataset.bentoAnimation) {
    case "paguro": {
      const menu = part("services");
      const loop = part("service-loop");
      const row = loop?.firstElementChild;
      if (!loop || !row) break;
      const cycleHeight = loop.getBoundingClientRect().height;
      const rowHeight = row.getBoundingClientRect().height;
      const finish = -2 * cycleHeight;
      // A quick flick with momentum and a small snap back onto Claude. The
      // selection band stays fixed while the repeated services roll through it.
      const start = trigger === "entrance" ? -(cycleHeight - 2 * rowHeight) : 0;
      if (trigger === "entrance") animate(menu, [
        { opacity: 0, transform: "translateY(-6px) scale(.86)", offset: 0 },
        { opacity: 1, transform: "translateY(1px) scale(1.025)", offset: .7 },
        { opacity: 1, transform: "translateY(0) scale(1)", offset: 1 },
      ], { duration: 280, delay: 100, easing: "ease-out" });
      animate(part("service-track"), [
        { transform: `translateY(${start}px)`, offset: 0, easing: "cubic-bezier(.12,.7,.2,1)" },
        { transform: `translateY(${finish - 3}px)`, offset: .86, easing: "ease-out" },
        { transform: `translateY(${finish}px)`, offset: 1 },
      ], { duration: trigger === "entrance" ? 660 : 620, delay: trigger === "entrance" ? 180 : 0 });
      break;
    }
    case "free": {
      const number = part("price");
      if (!number) break;
      let frame = 0;
      let complete = () => {};
      tasks.push(new Promise<void>(resolve => { complete = resolve; }));
      const start = performance.now();
      number.textContent = "100";
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1400, 1);
        number.textContent = String(Math.ceil(100 * (1 - progress) ** 2));
        if (progress < 1) frame = requestAnimationFrame(tick);
        else complete();
      };
      frame = requestAnimationFrame(tick);
      resets.push(() => { cancelAnimationFrame(frame); number.textContent = "0"; complete(); });
      break;
    }
    case "private": {
      const toggle = part("switch");
      const thumb = part("switch-thumb");
      if (!toggle || !thumb) break;
      const style = getComputedStyle(toggle);
      const travel = toggle.clientWidth - thumb.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      animate(toggle, [{ backgroundColor: "#007aff" }, { backgroundColor: style.backgroundColor }],
        { duration: 360, delay: 1000, easing: "ease-in-out" });
      animate(thumb, [{ transform: `translateX(${travel}px)` }, { transform: "translateX(0)" }],
        { duration: 360, delay: 1000, easing: "cubic-bezier(.25,.8,.25,1)" });
      break;
    }
    case "moppo": {
      const map = part("storage-map");
      const large = part("storage-large");
      if (!map || !large) break;
      if (trigger === "hover") {
        animate(map, [
          { gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.4fr) minmax(0, 1fr)", offset: 0 },
          { gridTemplateColumns: "minmax(0, 1.85fr) minmax(0, 1.58fr) minmax(0, .97fr)", offset: .35 },
          { gridTemplateColumns: "minmax(0, 2.08fr) minmax(0, 1.30fr) minmax(0, 1.02fr)", offset: .7 },
          { gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.4fr) minmax(0, 1fr)", offset: 1 },
        ], { duration: 1100, easing: "ease-in-out" });
        break;
      }
      const fullWidth = map.getBoundingClientRect().width;
      const finalWidth = large.getBoundingClientRect().width;
      animate(large, [
        { width: `${fullWidth}px`, offset: 0 },
        { width: `${fullWidth}px`, offset: .15 },
        { width: `${finalWidth * .88}px`, offset: .58 },
        { width: `${finalWidth * 1.045}px`, offset: .80 },
        { width: `${finalWidth}px`, offset: 1 },
      ], { duration: 1400, easing: "cubic-bezier(.22,.8,.3,1)" });
      card.querySelectorAll("[data-bento-part='storage-small']").forEach((tile, index) => {
        animate(tile, [
          { opacity: 0, transform: "translateX(8px) scale(.82)", offset: 0 },
          { opacity: 1, transform: "translateX(0) scale(1.045)", offset: .75 },
          { opacity: 1, transform: "translateX(0) scale(1)", offset: 1 },
        ], { duration: 760, delay: 350 + index * 80, easing: "ease-out" });
      });
      break;
    }
    case "native": {
      animate(part("native-title"), [{ backgroundPosition: "100% 0" }, { backgroundPosition: "0% 0" }],
        { duration: 1250, delay: 100, easing: "linear" });
      animate(card.querySelector("svg rect"), [{ transform: "translateX(0)" }, { transform: "translateX(130px)" }],
        { duration: 1250, delay: 100, easing: "linear" });
      break;
    }
    case "source": {
      const graph = part("contributions");
      if (!graph) break;
      const style = getComputedStyle(graph);
      const greens = Array.from({ length: 5 }, (_, index) => style.getPropertyValue(`--contribution-${index}`).trim());
      graph.querySelectorAll<HTMLElement>("[data-contribution-level]").forEach((square, index) => {
        const resting = getComputedStyle(square).backgroundColor;
        animate(square, [resting, greens[(index * 3 + 1) % 5], greens[(index + 2) % 5],
          greens[(index * 7 + 3) % 5], greens[(index + 4) % 5], resting].map(backgroundColor => ({ backgroundColor })),
        { duration: trigger === "hover" ? 950 : 2600, delay: (index % 12) * (trigger === "hover" ? 16 : 45), easing: "ease-in-out" });
      });
      break;
    }
  }

  let cancelled = false;
  const cancel = () => {
    if (cancelled) return;
    cancelled = true;
    animations.forEach(animation => animation.cancel());
    resets.forEach(reset => reset());
  };
  // Clear animated styles at the finish, so theme changes keep using CSS colours.
  return { finished: Promise.all(tasks).then(cancel), cancel };
}

export function HomeBentoMotion({ children, className, label }: { children: ReactNode; className: string; label: string }) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = section.current;
    if (!root || !Element.prototype.animate) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-bento-animation]"));
    const playing = new Map<HTMLElement, Playback>();
    const cleanup: (() => void)[] = [];
    let disposed = false;

    const play = (card: HTMLElement, trigger: "entrance" | "hover") => {
      if (disposed || motion.matches || document.hidden || playing.has(card)) return;
      const playback = playCard(card, trigger);
      playing.set(card, playback);
      void playback.finished.then(() => {
        if (playing.get(card) === playback) playing.delete(card);
      });
    };
    const stop = () => { playing.forEach(playback => playback.cancel()); playing.clear(); };
    const visibility = () => { if (document.hidden) stop(); };
    const preference = () => { if (motion.matches) stop(); };

    // On narrow screens, lower cards get their one entrance when first visible.
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || entry.intersectionRatio < .15) return;
        play(entry.target as HTMLElement, "entrance");
        observer.unobserve(entry.target);
      });
    }, { threshold: .15 });
    cards.forEach(card => {
      observer.observe(card);
      if (!["paguro", "moppo", "source"].includes(card.dataset.bentoAnimation ?? "")) return;
      const enter = (event: PointerEvent) => { if (event.pointerType === "mouse") play(card, "hover"); };
      const focus = () => { if (card.matches(":focus-visible")) play(card, "hover"); };
      card.addEventListener("pointerenter", enter);
      card.addEventListener("focus", focus);
      cleanup.push(() => { card.removeEventListener("pointerenter", enter); card.removeEventListener("focus", focus); });
    });
    motion.addEventListener("change", preference);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed = true;
      observer.disconnect();
      stop();
      cleanup.forEach(remove => remove());
      motion.removeEventListener("change", preference);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  return <section ref={section} className={className} aria-label={label} data-analytics-location="home-bento">{children}</section>;
}
