"use client";

import { useEffect, useState, type RefObject } from "react";
import { dockHintDuration, dockHintPointer, hintIdleDelay, nextPreviewHint, type PreviewHint, type PreviewHintHistory } from "@/lib/paguro-preview-hints";
import { railServices, type PreviewLayout } from "@/lib/paguro-service-preview";

export function usePaguroPreviewHints({ captureRef, toggleRef, dockRef, history, layout }: {
  captureRef: RefObject<HTMLDivElement | null>;
  toggleRef: RefObject<HTMLButtonElement | null>;
  dockRef: RefObject<HTMLDivElement | null>;
  history: RefObject<PreviewHintHistory>;
  layout: PreviewLayout;
}) {
  const [hint, setHint] = useState<PreviewHint | null>(null);
  const [demoPointerY, setDemoPointerY] = useState<number | null>(null);

  useEffect(() => {
    const capture = captureRef.current;
    const toggle = toggleRef.current;
    const dock = dockRef.current;
    if (!capture || !toggle || !dock) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout> | undefined;
    let frame = 0;
    let animation: Animation | null = null;
    let running: PreviewHint | null = null;
    let toggleVisible = false;
    let dockVisible = false;

    function eligibleHint() {
      return nextPreviewHint({
        layout, history: history.current, toggleVisible, dockVisible,
        pageVisible: document.visibilityState === "visible",
        reducedMotion: motion.matches,
        keyboardActive: capture!.contains(document.activeElement) && !!document.activeElement?.matches(":focus-visible"),
      });
    }

    function stop() {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      if (animation) {
        animation.onfinish = null;
        animation.cancel();
      }
      animation = null;
      if (running) {
        running = null;
        setHint(null);
        setDemoPointerY(null);
      }
    }

    function finish() {
      stop();
      // Leave four quiet seconds between cues, then recheck visibility and use.
      arm();
    }

    function play() {
      const next = eligibleHint();
      if (!next) return;
      running = next;
      setHint(next);
      if (next === "toggle") {
        animation = toggle!.animate([
          { transform: "scale(1) rotate(0deg)", opacity: .8 },
          { transform: "scale(1.75) rotate(0deg)", opacity: 1, offset: .2 },
          { transform: "scale(1.75) rotate(0deg)", opacity: 1, offset: .32 },
          { transform: "scale(1.75) rotate(-12deg)", opacity: 1, offset: .4 },
          { transform: "scale(1.75) rotate(12deg)", opacity: 1, offset: .49 },
          { transform: "scale(1.75) rotate(-9deg)", opacity: 1, offset: .58 },
          { transform: "scale(1.75) rotate(7deg)", opacity: 1, offset: .67 },
          { transform: "scale(1.75) rotate(0deg)", opacity: 1, offset: .76 },
          { transform: "scale(1.75) rotate(0deg)", opacity: 1, offset: .82 },
          { transform: "scale(1) rotate(0deg)", opacity: .8 },
        ], { duration: 1700, easing: "ease-in-out" });
        animation.onfinish = finish;
      } else {
        const started = performance.now();
        function sweep(now: number) {
          const progress = (now - started) / dockHintDuration;
          if (progress >= 1) { finish(); return; }
          setDemoPointerY(dockHintPointer(progress, railServices[0].compactY, railServices[railServices.length - 1].compactY));
          frame = requestAnimationFrame(sweep);
        }
        frame = requestAnimationFrame(sweep);
      }
    }

    function arm() {
      clearTimeout(timer);
      if (eligibleHint()) timer = setTimeout(play, hintIdleDelay);
    }

    function activity(event: Event) {
      if (event.target instanceof Node && toggle!.contains(event.target)) history.current.toggleUsed = true;
      if (layout === "compact" && event.target instanceof Element && event.target.closest("[data-service]") && capture!.contains(event.target)) {
        history.current.dockUsed = true;
      }
      stop();
      arm();
    }

    function visibilityChanged() { stop(); arm(); }

    // Watch the controls themselves, excluding the sticky 80px page header.
    // A partial hero at the viewport edge must not spend its hint offscreen.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const visible = entry.isIntersecting && entry.intersectionRatio >= .99;
        if (entry.target === toggle) toggleVisible = visible;
        if (entry.target === dock) dockVisible = visible;
      }
      if (running && !(running === "toggle" ? toggleVisible : dockVisible)) stop();
      if (!running) arm();
    }, { rootMargin: "-80px 0px 0px", threshold: [0, .99, 1] });
    observer.observe(toggle);
    observer.observe(dock);

    const events = ["pointermove", "pointerdown", "keydown", "focusin", "focusout", "wheel", "scroll"];
    for (const event of events) window.addEventListener(event, activity, { passive: true, capture: true });
    document.addEventListener("visibilitychange", visibilityChanged);
    motion.addEventListener("change", visibilityChanged);

    return () => {
      observer.disconnect();
      for (const event of events) window.removeEventListener(event, activity, true);
      document.removeEventListener("visibilitychange", visibilityChanged);
      motion.removeEventListener("change", visibilityChanged);
      stop();
    };
  }, [captureRef, toggleRef, dockRef, history, layout]);

  return { hint, demoPointerY };
}
