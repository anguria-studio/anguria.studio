import type { ReactNode } from "react";
import type { AppSlug } from "@/lib/apps";

/**
 * The flat, two-tone app marks used in the Dock. Colour comes from --dock-tile
 * and --dock-mark, which swap between the light and dark themes, so the tile is
 * light with a dark mark on the light page and the reverse on the dark one.
 * That also retires an old fix: Obolo's source tile is #0F0F0F at 20% opacity,
 * which composites to ~#CCC over white but to near-black over a dark page,
 * where it vanished. It takes the token like its siblings now.
 *
 * The three marks are normalised to a common size. Measured ink was 29 units
 * across for Obolo, 30 for Scolo and 26.85 for Paguro — so the first two are
 * scaled about their own centres to meet Paguro rather than the other way
 * round, which keeps the smallest mark unscaled and its 40/99 factor exact.
 *
 * Deliberately NOT the full-colour icons that
 * AppIcon renders on the showcase cards and app pages — the Dock wants flat
 * marks, not gradient tiles.
 */
const DOCK_MARKS: Record<AppSlug, ReactNode> = {
  obolo: (
    <>
        <rect width="40" height="40" rx="8" fill="var(--dock-tile)"/>
        {/* 26.85/29 = 0.926, about the mark's own centre 20.5, 20 — the
            translate/scale/translate pair is what keeps it centred rather than
            drifting toward the origin. */}
        <g transform="translate(20.5 20) scale(0.926) translate(-20.5 -20)">
        <path d="M28.4199 8.26839L33.8253 14.3534L35 22.323L31.5711 29.647L24.6271 34H16.3729L9.42893 29.647L6 22.323L7.17468 14.3534L9.19975 12.0736L14.6084 16.617L16.0227 15.0149L10.6192 10.4758L12.5801 8.26839L20.5 6L28.4199 8.26839Z" fill="var(--dock-mark)"/>
        </g>
    </>
  ),
  scolo: (
    <>
        <rect width="40" height="40" rx="8" fill="var(--dock-tile)"/>
        {/* 26.85/30 = 0.895, about 20, 20. The 4-unit stroke scales with the
            group, which is what keeps the rounded square's weight in proportion
            — scaling only the geometry would leave it looking heavier. The dots
            are holes, so they take the tile colour and travel with it. */}
        <g transform="translate(20 20) scale(0.895) translate(-20 -20)">
        <rect x="7" y="7" width="26" height="26" rx="6" fill="var(--dock-mark)" stroke="var(--dock-mark)" strokeWidth="4"/>
        <circle cx="16.5" cy="16.5" r="2.5" fill="var(--dock-tile)"/>
        <circle cx="16.5" cy="23.5" r="2.5" fill="var(--dock-tile)"/>
        <circle cx="23.5" cy="16.5" r="2.5" fill="var(--dock-tile)"/>
        <circle cx="23.5" cy="23.5" r="2.5" fill="var(--dock-tile)"/>
        </g>
    </>
  ),
  paguro: (
    <>
        <rect width="40" height="40" rx="8" fill="var(--dock-tile)"/>
        {/* Paguro's source is drawn in a 99-unit box, not the 40 the other two
            share, so the mark is scaled by 40/99. Measured after the fact, that
            puts its ink at x 6.46..33.31, y 6.46..33.26 — against Obolo's
            6..35 / 6..34 and Scolo's 5..35. It reads a touch smaller than
            those, matching the mark it replaces, and needs no hand-fitting.
            Centre lands at 19.89, 19.86 rather than 20, 20; a tenth of a unit
            is a quarter-pixel at the rendered 40px, so it is left uncorrected. */}
        <g transform="scale(0.404040)">
        <path d="M46.3633 44.3301V82.3271C29.3532 80.8759 16 66.6114 16 49.2256C16 42.1658 18.2026 35.6212 21.957 30.2393L46.3633 44.3301ZM76.4971 30.2461C80.2488 35.6269 82.4512 42.1686 82.4512 49.2256C82.4512 66.6054 69.1062 80.8656 52.1045 82.3252V44.3291L76.4971 30.2461ZM49.2256 16C58.4214 16.0001 66.744 19.7366 72.7598 25.7734L49.2324 39.3564L25.6953 25.7676C31.7108 19.7338 40.0323 16 49.2256 16Z" fill="var(--dock-mark)"/>
        </g>
    </>
  ),
};

/** 40px, rendered 1:1 against the artwork's own 40-unit box. The rx="8" in the
 *  source does the rounding, so no wrapper or overflow clipping is needed.
 *
 *  Opacity comes from --dock-icon-opacity rather than a theme: variant, because
 *  the theme-dark variant only matches an explicit data-theme="dark" and would
 *  leave everyone on system dark — most of them — with the undimmed tiles. The
 *  token is defined in all three theme blocks in globals.css. */
export function DockIcon({ slug }: { slug: AppSlug }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className="size-10 shrink-0 opacity-(--dock-icon-opacity)"
    >
      {DOCK_MARKS[slug]}
    </svg>
  );
}
