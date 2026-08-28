import { FEATURE_ICONS } from "@/components/home/feature-icons";
import { featureIds } from "@/lib/features";
import type { Dictionary } from "@/lib/dictionaries/en";

/**
 * Six icons with a label under each, on the page background — no card, no
 * border, no body text. Order comes from featureIds rather than the dictionary,
 * so the layout is identical in every language.
 *
 * Hover motion comes in two layers. This file owns the shared one — a lift, a
 * small scale and a shift to the accent — applied to the <svg> box itself. Each
 * icon's own gesture lives on the elements INSIDE it, in feature-icons.tsx.
 * The two never collide: Tailwind v4 compiles the translate and scale
 * utilities to the
 * individual `translate` and `scale` properties, so a parent's box transform and
 * a child's user-space transform are separate declarations, not one contested
 * `transform`.
 *
 * The cells are list items, not links — nothing here is focusable, so there is
 * deliberately no focus-visible counterpart to any of it.
 */
export function FeatureGrid({ dict }: { dict: Dictionary }) {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-16 sm:pb-24">
      <ul className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-16">
        {featureIds.map((id) => (
          <li
            key={id}
            className="group/feature flex flex-col items-center text-center"
          >
            {/* One size class for all six — the per-icon optical balancing is
                baked into each viewBox. See feature-icons.tsx.

                Liquid Glass is the one icon that does NOT take the accent
                shift: its front disc is already fill-melon-500, so turning the
                ink disc melon too collapses the pair into a single blob and
                destroys the overlap the icon is made of. It joins the lift and
                the scale like the rest. */}
            <svg
              viewBox={FEATURE_ICONS[id].viewBox}
              aria-hidden="true"
              className={`size-14 fill-current sm:size-16 motion-safe:transition motion-safe:duration-300 motion-safe:group-hover/feature:-translate-y-1 motion-safe:group-hover/feature:scale-105${
                id === "glass" ? "" : " transition-colors group-hover/feature:text-melon-500"
              }`}
            >
              {FEATURE_ICONS[id].node}
            </svg>
            <p className="mt-5 max-w-label text-xl font-semibold tracking-tight text-balance sm:text-2xl">
              {dict.home.features[id]}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
