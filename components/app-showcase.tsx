import { AppShowcaseCard } from "./app-showcase-card";
import { appList } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";

/**
 * Three panes onto one continuous desktop. Hovering one expands it and collapses
 * the others — pure flex-grow, no JS, no container-level selector.
 *
 * The row height is free — the tiling geometry lives on the image wrapper
 * inside each card, not on the row, so the cards can be any height without
 * breaking the continuity of the shared wallpaper.
 */
export function AppShowcase({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  // Stage 2 of the load cascade sits on the section rather than the row, so the
  // glow arrives with the cards it haloes — fading the row alone would leave a
  // bare blurred blob sitting on the dark theme for the duration.
  return (
    <section className="relative mx-auto max-w-cards px-6 motion-safe:enter-2">
      {/* Sibling of the row, not a child: the row's `desk:relative` is the
          wallpaper's anchor, and -z-10 keeps this behind the cards without
          touching their clip-path stacking contexts. Negative insets on all
          four sides make it oversize the row, so the blur spills out as a halo
          rather than sitting hidden behind the opaque cards. */}
      <div
        aria-hidden="true"
        className="showcase-glow pointer-events-none absolute -inset-x-16 -inset-y-24 -z-10"
      />
      <div className="group/row flex touch:flex-col touch:gap-4 desk:relative desk:h-[480px] desk:flex-row desk:gap-3">
        {appList.map((meta) => (
          <AppShowcaseCard
            key={meta.slug}
            locale={locale}
            meta={meta}
            copy={dict.apps[meta.slug]}
          />
        ))}
      </div>
    </section>
  );
}
