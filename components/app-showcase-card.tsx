import Link from "next/link";
import { AppIcon } from "./app-icon";
import type { AppMeta } from "@/lib/apps";
import type { AppCopy } from "@/lib/dictionaries/en";
import { localePath, type Locale } from "@/lib/i18n";

/**
 * The fade-in delay is keyed to the ROW being hovered, not the card. The 12px
 * gap between cards belongs to the row, so crossing it leaves no card hovered
 * for a frame — long enough for the browser to commit an opacity transition
 * carrying the slow 500ms resting delay. Changing `transition-delay` afterwards
 * does not re-time a transition already in flight (only a change to the
 * property's own value does), so the text would then sit there for half a
 * second. Keying it to the row means gaps count as "still inside", and the
 * 500ms only applies when the pointer actually leaves.
 *
 * Everything visible is also held back by a 150ms hover-intent delay, so
 * sweeping the pointer across the row on the way somewhere else triggers
 * nothing. A transition scheduled behind a delay is simply cancelled if the
 * pointer leaves before it elapses — no JS timers, and no late catch-up.
 * EVERY hover-driven transition is gated at that same 150ms, including the
 * sibling text fading out. Anything that fires earlier commits during a sweep
 * and then visibly reverses when the pointer leaves.
 * The same delay applies to a card that is collapsing while the pointer is
 * still inside the row, so a card-to-card move hands off in step. Without it
 * the outgoing card starts shrinking 150ms before the incoming one grows, and
 * the row visibly relaxes toward equal thirds in between. Leaving the row
 * drops both hover states at once, so the collapse there is immediate.
 */

/** SF Pro Display settings from the design: 0.22% letter spacing. */
const DISPLAY = "tracking-display";

const LAYER =
  "absolute inset-0 size-full object-cover touch:object-[100%_50%] " +
  "motion-safe:transition-opacity motion-safe:duration-500 motion-safe:ease-out";

export function AppShowcaseCard({
  locale,
  meta,
  copy,
}: {
  locale: Locale;
  meta: AppMeta;
  copy: AppCopy;
}) {
  return (
    <Link
      href={localePath(locale, meta.slug)}
      className={
        "group relative desk:static block rounded-showcase ring-1 ring-black/10 " +
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500 " +
        "touch:aspect-[16/10] " +
        "desk:h-full desk:basis-0 desk:grow desk:hover:grow-[7] desk:hover:delay-150 desk:group-hover/row:delay-150 desk:focus-visible:grow-[7] " +
        "motion-safe:transition-[flex-grow] motion-safe:duration-500 motion-safe:ease-out"
      }
    >
      {/*
        clip-path, not overflow-hidden. The wallpaper below is positioned against
        the ROW, not this card, so it is outside this element's containing-block
        chain and `overflow: hidden` would not clip it at all. clip-path clips the
        whole subtree including escaping absolute descendants — and unlike
        `filter` it does not itself become a containing block.
      */}
      <div className="size-full overflow-hidden rounded-showcase desk:overflow-visible desk:[clip-path:inset(0_round_1.75rem)]">
        {/*
          One continuous desktop behind the whole row.

          On desk this is anchored to the ROW (the card is `static`, the row is
          `relative`), spans the full row width, and NEVER MOVES. Each card simply
          clips the slice of it that happens to fall behind it, so the wallpaper is
          aligned at every frame of the expand animation for free — there is no
          object-position to animate and therefore nothing that can drift out of
          sync with the width. That drift is exactly what a per-card wallpaper
          suffered from: width is non-linear in flex-grow, object-position
          interpolates linearly, and no timing function can reconcile them in both
          directions.
        */}
        <div className="absolute inset-0 desk:inset-auto desk:top-1/2 desk:left-0 desk:h-[var(--wallpaper-h)] desk:w-full desk:-translate-y-1/2">
          {/* Layer A — the bare desktop, always visible. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/shots/desktop.jpg"
            alt=""
            width={2560}
            height={1200}
            decoding="async"
            fetchPriority="high"
            className={LAYER}
          />

          {/* Layer B — the app itself, faded in on hover. Same geometry as layer A,
              so the wallpapers stay pixel-aligned through the cross-fade. Held
              back past the card's own 150ms gate so the window arrives while the
              card is already opening, rather than at the same instant. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/shots/${meta.shot}.jpg`}
            alt={copy.shotAlt}
            width={2560}
            height={1200}
            decoding="async"
            fetchPriority="low"
            className={`${LAYER} touch:opacity-100 desk:opacity-0 desk:group-hover:opacity-100 desk:group-hover:delay-300 desk:group-focus-visible:opacity-100`}
          />
        </div>

        {/* Card-sized, and the container for the label's width query. Kept off the
            wallpaper's ancestor chain: `@container` implies layout containment,
            which would capture the absolute wallpaper as a containing block. */}
        <div className="relative size-full">
          {/* Not themed on purpose: the card is a photograph, identical in light
              and dark. Dual-ended for the text at top and bottom. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.6),transparent_32%,transparent_60%,rgb(0_0_0/0.7))]"
          />

          {/* Title + subtitle, top-aligned. */}
          <div className="absolute inset-x-0 top-0 flex items-start gap-3 p-5">
            <AppIcon meta={meta} size="md" />
            <div className="min-w-0 desk:w-84 desk:sibling-active:-translate-y-1 motion-safe:transition motion-safe:duration-200 desk:motion-safe:delay-500 desk:sibling-active:opacity-0 desk:sibling-active:duration-75 desk:sibling-active:delay-150 desk:group-hover/row:delay-200 desk:group-focus-within/row:delay-100">
              <p
                className={`${DISPLAY} text-xl leading-7 font-bold text-white`}
              >
                {copy.name}
              </p>
              <p
                className={`${DISPLAY} mt-0 text-md leading-6 font-bold text-white/65 text-pretty`}
              >
                {copy.tagline}
              </p>
            </div>
          </div>

          {/* Description, bottom-aligned. */}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p
              className={`${DISPLAY} max-w-80 desk:w-96 text-xl leading-7 font-semibold text-white text-pretty desk:sibling-active:translate-y-1 motion-safe:transition motion-safe:duration-200 desk:motion-safe:delay-500 desk:sibling-active:opacity-0 desk:sibling-active:duration-75 desk:sibling-active:delay-150 desk:group-hover/row:delay-200 desk:group-focus-within/row:delay-100`}
            >
              {copy.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
