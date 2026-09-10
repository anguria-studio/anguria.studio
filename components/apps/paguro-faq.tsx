"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./paguro-faq.module.css";
import { arrivals, firstBatch } from "@/lib/paguro-faq";

/**
 * The FAQ rows, arriving in a cascade as they scroll into view.
 *
 * Observed PER ROW rather than as one list, because the list is taller than the
 * viewport: a container-level trigger either fires while most rows are still
 * below the fold — so a slow scroll only ever sees the top two animate — or has
 * to hide the whole block up front, which flashes it visible and then blanks it.
 * Watching each row means each one animates when it is actually about to be
 * looked at, and the delays are batch-relative (see lib/paguro-faq.ts) so a
 * cascade only happens when several rows really do appear together.
 *
 * A row that has not arrived yet is marked "pending" and blanked by the module
 * CSS, which is what lets the trigger sit INSIDE the viewport: the row is
 * already held back, so it can wait until its top edge is a good way past the
 * fold and still start from nothing. Pending is set only here, only after the
 * reduced-motion and IntersectionObserver checks pass, so no JS, no observer or
 * a reduced-motion reader leaves every row at rest and visible.
 */
export function PaguroFaq({ faq }: { faq: readonly { question: string; answer: string }[] }) {
  const rows = useRef<(HTMLDetailsElement | null)[]>([]);
  // index -> "pending" while the row waits its turn, then its place in the batch
  // it arrived with. Empty on the server and on the first client render, so
  // hydration matches and every row paints at rest; the observer fills it after.
  const [played, setPlayed] = useState<ReadonlyMap<number, "pending" | number>>(() => new Map());

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    // Read once at mount: with motion suppressed nothing is observed at all and
    // the rows keep their resting style, which is the whole fail-closed story.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const indexOf = new Map<Element, number>();
    for (const [index, row] of rows.current.entries()) if (row) indexOf.set(row, index);

    // The latch lives in the closure, not in state: a second callback can land
    // before the re-render does, and a state read there would still be empty.
    const seen = new Set<number>();
    // Only the opening callback reports every observed row, so it is the only
    // one that can tell "not arrived yet" from "not mentioned this time".
    let opening = true;

    function retire(index: number) {
      seen.add(index);
      // Once per load per row; nothing left to watch for.
      const row = rows.current[index];
      if (row) observer.unobserve(row);
    }

    const observer = new IntersectionObserver((entries) => {
      const sightings = entries.flatMap((entry) => {
        const index = indexOf.get(entry.target);
        return index === undefined ? [] : [{ index, intersecting: entry.isIntersecting }];
      });

      if (opening) {
        opening = false;
        const { arriving, pending } = firstBatch(sightings);
        for (const { index } of arriving) retire(index);
        setPlayed((current) => new Map<number, "pending" | number>([
          ...current,
          ...pending.map((index): [number, "pending"] => [index, "pending"]),
          ...arriving.map(({ index, position }): [number, number] => [index, position]),
        ]));
        return;
      }

      const batch = arrivals(sightings, seen);
      if (batch.length === 0) return;

      for (const { index } of batch) retire(index);
      setPlayed((current) => new Map<number, "pending" | number>([...current, ...batch.map(({ index, position }): [number, number] => [index, position])]));
    }, {
      // Bottom edge pulled IN by 12% of the viewport, so a row arrives once its
      // top edge is well clear of the fold and the reader's eye is on it — the
      // animation runs where it can be watched instead of finishing at the very
      // bottom edge. Safe against a row that never reaches the band: the contact
      // line and footer sit below the list, so at maximum scroll even the last
      // row's top is far above 12% of the viewport. The top is trimmed by the
      // 80px sticky header, as the service strip does: a row sliding under it is
      // not a row anyone is reading.
      rootMargin: "-80px 0px -12%",
      threshold: 0,
    });
    for (const row of rows.current) if (row) observer.observe(row);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="border-t border-hairline">
      {faq.map((item, index) => {
        const state = played.get(index);
        return <details
          key={item.question}
          ref={(node) => { rows.current[index] = node; }}
          // Two named states rather than one flag: "pending" is held blank,
          // "arrived" runs the cascade, and absent — server, first render, no
          // observer — is the resting row, so the markup never hides anything.
          data-arrive={state === undefined ? undefined : state === "pending" ? "pending" : "arrived"}
          style={{ "--i": typeof state === "number" ? state : 0 } as CSSProperties}
          className={`${styles.row} faq-item group border-b border-hairline`}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500">
            {item.question}<span aria-hidden="true" className="shrink-0 text-2xl font-normal text-muted group-open:rotate-45 motion-safe:transition-transform">+</span>
          </summary>
          <p className="pb-6 pr-6 text-base leading-relaxed text-muted">{item.answer}</p>
        </details>;
      })}
    </div>
  );
}
