"use client";

import { useEffect, useState, type ReactNode } from "react";

export function ScrollHeader({ children, className }: { children: ReactNode; className?: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let previousY = Math.max(0, window.scrollY);
    function onScroll() {
      const y = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
      const delta = y - previousY;
      // Ignore tiny movements and keep navigation visible near the page top.
      if (y <= 64) {
        setHidden(false);
        previousY = y;
      } else if (Math.abs(delta) >= 8) {
        setHidden(delta > 0);
        previousY = y;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-hidden={hidden}
      className={`${className ?? ""} data-[hidden=true]:not-focus-within:-translate-y-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out`}
    >
      {children}
    </header>
  );
}
