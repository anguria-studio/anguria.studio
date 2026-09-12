import Link from "next/link";
import { DockIcon } from "@/components/apps/dock-icon";
import { dockAppList } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries/en";
import { localePath, type Locale } from "@/lib/i18n";

/**
 * A macOS Dock, near enough, with no JavaScript.
 *
 * The real Dock scales each icon by a continuous function of the pointer's
 * x-distance. With three icons there are only three reachable states — hovered,
 * adjacent, neither — so `:hover`, `+` and `:has(+ …)` cover the whole falloff;
 * see the dock-before / dock-after variants in app/globals.css.
 *
 * Two details carry the effect: `origin-bottom`, so an icon grows UP out of the
 * row instead of both ways, and the neighbour sliding away from the pointer,
 * which is what the Dock actually does and what stops the magnified icon
 * colliding with it.
 *
 * Kept deliberately small — at 40px a 1.25x lift reads as a nudge where the
 * same gesture at 80px read as a pounce. The neighbour's shove is an accent,
 * not the event.
 *
 * The transforms sit behind `motion-safe`, not merely their transitions: with
 * reduced motion a snap is worse than no magnification at all, so there is
 * none and the label alone carries the affordance.
 */
export function AppDock({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="px-6 pb-20 sm:pb-28">
      {/* The top padding is the headroom the magnified icon and its tooltip
          grow into, so nothing is clipped and nothing above is overlapped. */}
      {/* nav > a, not ul > li > a: the magnification selectors need the links
          to be siblings. With an <li> between them the only way to express
          "my NEXT sibling is hovered" is a nested :has(), which is invalid CSS
          and gets the whole rule discarded. */}
      <nav
        aria-label={dict.home.dockLabel}
        className="group/dock flex items-end justify-center gap-4 pt-8 desk:pt-20"
      >
        {dockAppList.map((meta) => (
            <Link
              key={meta.slug}
              href={localePath(locale, meta.slug)}
              className="group relative flex flex-col items-center rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500"
            >
              {/* Only this wrapper scales, so the label above stays crisp. */}
              <span className="block origin-bottom motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:group-hover:scale-125 motion-safe:group-hover:-translate-y-1 motion-safe:group-focus-visible:scale-125 motion-safe:group-focus-visible:-translate-y-1 motion-safe:dock-after:translate-x-1 motion-safe:dock-after:scale-110 motion-safe:dock-before:-translate-x-1 motion-safe:dock-before:scale-110">
                <DockIcon slug={meta.slug} />
              </span>

              {/* One node, two layouts: a tooltip where there's a pointer, a
                  caption where there isn't. Same DOM either way, so the link's
                  accessible name is never hover-dependent (AppIcon is
                  aria-hidden). The desk margin clears the magnified icon, which
                  overflows its resting box upward by half its height.

                  The tooltip is the same vibrancy material as the header —
                  translucent --glass, backdrop blur, and the saturate boost
                  macOS applies behind its own glass. Worth knowing what is
                  actually doing the work here: the tooltip floats over flat
                  page background, so the blur has almost nothing to refract.
                  The tint, the hairline and the shadow are what make it read as
                  a pane of glass; the blur only pays off if content ever passes
                  behind it. Theme-matched rather than inverted, which is how
                  macOS draws menus and Dock labels. */}
              <span
                className={
                  "text-sm font-medium whitespace-nowrap " +
                  "touch:mt-3 touch:text-muted " +
                  "desk:pointer-events-none desk:absolute desk:bottom-full desk:left-1/2 desk:mb-6 desk:-translate-x-1/2 " +
                  "desk:rounded-full desk:border desk:border-hairline desk:bg-glass desk:px-3 desk:py-1 desk:text-foreground desk:opacity-0 desk:shadow-lg " +
                  "desk:backdrop-blur-xl desk:backdrop-saturate-150 " +
                  "desk:motion-safe:transition-opacity desk:motion-safe:duration-150 " +
                  "desk:group-hover:opacity-100 desk:group-focus-visible:opacity-100"
                }
              >
                {dict.apps[meta.slug].name}
              </span>
            </Link>
        ))}
      </nav>
    </section>
  );
}
