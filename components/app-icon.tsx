import type { ReactNode } from "react";
import type { AppMeta, AppSlug } from "@/lib/apps";

const SIZES = {
  sm: "size-10",
  md: "size-14",
  lg: "size-28",
} as const;

/**
 * Path geometry, shared between each icon's two themes.
 *
 * The light and dark exports of every app carry byte-identical path data and
 * differ only in fills, strokes and gradient stops — verified by comparing the
 * d attributes of all three pairs. So the outlines live here once and both
 * variants reference them, which halves the markup and makes the relationship
 * between the two explicit rather than something to notice by eye.
 */
const PATHS: Record<AppSlug, readonly string[]> = {
  obolo: [
    "M77.5 1.25H22.5C10.7639 1.25 1.25 10.7639 1.25 22.5V77.5C1.25 89.2361 10.7639 98.75 22.5 98.75H77.5C89.2361 98.75 98.75 89.2361 98.75 77.5V22.5C98.75 10.7639 89.2361 1.25 77.5 1.25Z",
    "M69.0015 24.0229L81.117 37.4968L83.75 55.1438L76.0645 71.3612L60.5004 81H41.9996L26.4355 71.3612L18.75 55.1438L21.3829 37.4968L25.9219 32.4487L38.0447 42.5091L41.2147 38.9616L29.1034 28.9107L33.4985 24.0229L51.25 19L69.0015 24.0229Z",
    "M69.0015 24.0229L81.117 37.4968L83.75 55.1438L76.0645 71.3612L60.5004 81H41.9996L26.4355 71.3612L18.75 55.1438L21.3829 37.4968L25.9219 32.4487L38.0447 42.5091L41.2147 38.9616L29.1034 28.9107L33.4985 24.0229L51.25 19L69.0015 24.0229Z",
  ],
  scolo: [
    "M75.1734 1.21289H21.8234C10.4395 1.21289 1.21094 10.4414 1.21094 21.8254V75.1754C1.21094 86.5594 10.4395 95.7879 21.8234 95.7879H75.1734C86.5574 95.7879 95.7859 86.5594 95.7859 75.1754V21.8254C95.7859 10.4414 86.5574 1.21289 75.1734 1.21289Z",
    "M63.1377 18.9658C71.3621 18.9662 78.0293 25.6339 78.0293 33.8584V63.1426C78.0289 71.3667 71.3619 78.0338 63.1377 78.0342H33.8535C25.6291 78.0342 18.9613 71.367 18.9609 63.1426V33.8584C18.9609 25.6337 25.6288 18.9658 33.8535 18.9658H63.1377ZM41.1797 50.5918C38.2916 50.5918 35.9502 52.9332 35.9502 55.8213C35.9504 58.7092 38.2918 61.0498 41.1797 61.0498C44.0674 61.0496 46.408 58.709 46.4082 55.8213C46.4082 52.9333 44.0676 50.592 41.1797 50.5918ZM55.8164 50.5918C52.9283 50.5918 50.5869 52.9332 50.5869 55.8213C50.5871 58.7092 52.9285 61.0498 55.8164 61.0498C58.7042 61.0496 61.0447 58.709 61.0449 55.8213C61.0449 52.9334 58.7043 50.592 55.8164 50.5918ZM41.1797 35.9502C38.2918 35.9502 35.9504 38.2908 35.9502 41.1787C35.9502 44.0668 38.2916 46.4082 41.1797 46.4082C44.0676 46.408 46.4082 44.0667 46.4082 41.1787C46.408 38.291 44.0674 35.9504 41.1797 35.9502ZM55.8164 35.9502C52.9285 35.9502 50.5871 38.2908 50.5869 41.1787C50.5869 44.0668 52.9283 46.4082 55.8164 46.4082C58.7043 46.408 61.0449 44.0666 61.0449 41.1787C61.0447 38.291 58.7042 35.9504 55.8164 35.9502Z",
    "M63.1377 18.9658C71.3621 18.9662 78.0293 25.6339 78.0293 33.8584V63.1426C78.0289 71.3667 71.3619 78.0338 63.1377 78.0342H33.8535C25.6291 78.0342 18.9613 71.367 18.9609 63.1426V33.8584C18.9609 25.6337 25.6288 18.9658 33.8535 18.9658H63.1377ZM41.1797 50.5918C38.2916 50.5918 35.9502 52.9332 35.9502 55.8213C35.9504 58.7092 38.2918 61.0498 41.1797 61.0498C44.0674 61.0496 46.408 58.709 46.4082 55.8213C46.4082 52.9333 44.0676 50.592 41.1797 50.5918ZM55.8164 50.5918C52.9283 50.5918 50.5869 52.9332 50.5869 55.8213C50.5871 58.7092 52.9285 61.0498 55.8164 61.0498C58.7042 61.0496 61.0447 58.709 61.0449 55.8213C61.0449 52.9334 58.7043 50.592 55.8164 50.5918ZM41.1797 35.9502C38.2918 35.9502 35.9504 38.2908 35.9502 41.1787C35.9502 44.0668 38.2916 46.4082 41.1797 46.4082C44.0676 46.408 46.4082 44.0667 46.4082 41.1787C46.408 38.291 44.0674 35.9504 41.1797 35.9502ZM55.8164 35.9502C52.9285 35.9502 50.5871 38.2908 50.5869 41.1787C50.5869 44.0668 52.9283 46.4082 55.8164 46.4082C58.7043 46.408 61.0449 44.0666 61.0449 41.1787C61.0447 38.291 58.7042 35.9504 55.8164 35.9502Z",
  ],
  blatta: [
    "M76.7219 1.2373H22.2719C10.6532 1.2373 1.23438 10.6561 1.23438 22.2748V76.7248C1.23438 88.3435 10.6532 97.7623 22.2719 97.7623H76.7219C88.3406 97.7623 97.7594 88.3435 97.7594 76.7248V22.2748C97.7594 10.6561 88.3406 1.2373 76.7219 1.2373Z",
    "M46.3633 44.3301V82.3271C29.3532 80.8759 16 66.6114 16 49.2256C16 42.1658 18.2026 35.6212 21.957 30.2393L46.3633 44.3301ZM76.4971 30.2461C80.2488 35.6269 82.4512 42.1686 82.4512 49.2256C82.4512 66.6054 69.1062 80.8656 52.1045 82.3252V44.3291L76.4971 30.2461ZM49.2256 16C58.4214 16.0001 66.744 19.7366 72.7598 25.7734L49.2324 39.3564L25.6953 25.7676C31.7108 19.7338 40.0323 16 49.2256 16Z",
    "M46.3633 44.3301V82.3271C29.3532 80.8759 16 66.6114 16 49.2256C16 42.1658 18.2026 35.6212 21.957 30.2393L46.3633 44.3301ZM76.4971 30.2461C80.2488 35.6269 82.4512 42.1686 82.4512 49.2256C82.4512 66.6054 69.1062 80.8656 52.1045 82.3252V44.3291L76.4971 30.2461ZM49.2256 16C58.4214 16.0001 66.744 19.7366 72.7598 25.7734L49.2324 39.3564L25.6953 25.7676C31.7108 19.7338 40.0323 16 49.2256 16Z",
  ],
};

/**
 * The full-colour app icons, artwork verbatim from the apps' own design files.
 * Each carries its own gradient tile, corners and edge stroke, so this component
 * only sizes them — no CSS tile, ring or radius.
 *
 * The viewBox travels with each icon rather than being fixed on the <svg>: the
 * three are not drawn on a common grid (100, 97 and 99 units).
 *
 * Both themes are rendered and CSS picks one, via --icon-light-display /
 * --icon-dark-display. That indirection is what lets the icons follow the
 * three-state toggle: a prefers-color-scheme media query alone cannot see the
 * data-theme attribute the switcher sets, and a <picture>/srcset swap could not
 * either — which is also why these stay inline SVG rather than becoming PNGs.
 *
 * Gradient ids are namespaced per app AND per theme, since six artworks share
 * one page and Figma exports them all as paint0_linear_*.
 */
const ICONS: Record<
  AppSlug,
  { viewBox: string; defs: ReactNode; light: ReactNode; dark: ReactNode }
> = {
  obolo: {
    viewBox: "0 0 100 100",
    defs: (
      <>
        <linearGradient id="obolo-light-g0" x1="14.6983" y1="4.73214" x2="88.4148" y2="96.2423" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F2A24F"/>
        <stop offset="1" stopColor="#DB665B"/>
        </linearGradient>
        <linearGradient id="obolo-dark-g0" x1="14.6983" y1="4.73214" x2="88.4148" y2="96.2423" gradientUnits="userSpaceOnUse">
        <stop stopColor="#313131"/>
        <stop offset="1" stopColor="#141415"/>
        </linearGradient>
        <linearGradient id="obolo-dark-g1" x1="6.5" y1="3.5" x2="89" y2="101.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#292929"/>
        <stop offset="1" stopColor="#101010"/>
        </linearGradient>
        <linearGradient id="obolo-dark-g2" x1="15.5" y1="11" x2="75.5" y2="95" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F2A24F"/>
        <stop offset="1" stopColor="#DD6B5B"/>
        </linearGradient>
        <clipPath id="obolo-dark-clip">
        <rect width="100" height="100" fill="white"/>
        </clipPath>
      </>
    ),
    light: (
      <>
        <path d={PATHS.obolo[0]} fill="url(#obolo-light-g0)" stroke="white" strokeOpacity="0.14" strokeWidth="0.5" strokeLinejoin="round"/>
        <path d={PATHS.obolo[1]} fill="white" stroke="white" strokeOpacity="0.14" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d={PATHS.obolo[1]} fill="white" fillOpacity="0.1" stroke="white" strokeOpacity="0.14" strokeWidth="1.5" strokeLinejoin="round"/>
      </>
    ),
    dark: (
      <>
        <g clipPath="url(#obolo-dark-clip)">
        <path d={PATHS.obolo[0]} fill="url(#obolo-dark-g0)" stroke="url(#obolo-dark-g1)" strokeOpacity="0.7" strokeLinejoin="round"/>
        <path d={PATHS.obolo[1]} fill="url(#obolo-dark-g2)" stroke="white" strokeOpacity="0.14" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d={PATHS.obolo[1]} fill="white" fillOpacity="0.1" stroke="white" strokeOpacity="0.14" strokeWidth="1.5" strokeLinejoin="round"/>
        </g>
      </>
    ),
  },
  scolo: {
    viewBox: "0 0 97 97",
    defs: (
      <>
        <linearGradient id="scolo-light-g0" x1="7.27344" y1="4.85039" x2="92.1484" y2="94.5754" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4B978F"/>
        <stop offset="1" stopColor="#317179"/>
        </linearGradient>
        <linearGradient id="scolo-light-g1" x1="1" y1="0.999999" x2="92.5" y2="102" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9ADED8"/>
        <stop offset="1" stopColor="#409BA4"/>
        </linearGradient>
        <clipPath id="scolo-light-clip">
        <rect width="97" height="97" fill="white"/>
        </clipPath>
        <linearGradient id="scolo-dark-g0" x1="14.2558" y1="4.59057" x2="85.7608" y2="93.3554" gradientUnits="userSpaceOnUse">
        <stop stopColor="#313131"/>
        <stop offset="1" stopColor="#141415"/>
        </linearGradient>
        <linearGradient id="scolo-dark-g1" x1="6.30344" y1="3.39539" x2="86.3284" y2="98.4554" gradientUnits="userSpaceOnUse">
        <stop stopColor="#292929"/>
        <stop offset="1" stopColor="#101010"/>
        </linearGradient>
        <linearGradient id="scolo-dark-g2" x1="25.4593" y1="21.2759" x2="71.5306" y2="77.818" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4D9990"/>
        <stop offset="1" stopColor="#2E6D76"/>
        </linearGradient>
        <linearGradient id="scolo-dark-g3" x1="25.4593" y1="21.2759" x2="71.5306" y2="77.818" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4D9990"/>
        <stop offset="1" stopColor="#2E6D76"/>
        </linearGradient>
        <clipPath id="scolo-dark-clip">
        <rect width="97" height="97" fill="white"/>
        </clipPath>
      </>
    ),
    light: (
      <>
        <g clipPath="url(#scolo-light-clip)">
        <path d={PATHS.scolo[0]} fill="url(#scolo-light-g0)" stroke="url(#scolo-light-g1)" strokeOpacity="0.72"/>
        <path d={PATHS.scolo[1]} fill="#F8FDFC"/>
        <path d={PATHS.scolo[1]} fill="#F8FDFC" fillOpacity="0.2"/>
        </g>
      </>
    ),
    dark: (
      <>
        <g clipPath="url(#scolo-dark-clip)">
        <path d={PATHS.scolo[0]} fill="url(#scolo-dark-g0)" stroke="url(#scolo-dark-g1)" strokeOpacity="0.7" strokeLinejoin="round"/>
        <path d={PATHS.scolo[1]} fill="url(#scolo-dark-g2)"/>
        <path d={PATHS.scolo[1]} fill="url(#scolo-dark-g3)" fillOpacity="0.2"/>
        </g>
      </>
    ),
  },
  blatta: {
    viewBox: "0 0 99 99",
    defs: (
      <>
        <linearGradient id="blatta-light-g0" x1="7.42187" y1="4.94981" x2="91.5719" y2="96.5248" gradientUnits="userSpaceOnUse">
        <stop stopColor="#B575F2"/>
        <stop offset="1" stopColor="#7742C4"/>
        </linearGradient>
        <linearGradient id="blatta-light-g1" x1="9" y1="2.5" x2="112.5" y2="131" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EDDAFF"/>
        <stop offset="1" stopColor="#7B59A5"/>
        </linearGradient>
        <clipPath id="blatta-light-clip">
        <rect width="99" height="99" fill="white"/>
        </clipPath>
        <linearGradient id="blatta-dark-g0" x1="14.5482" y1="4.68462" x2="87.5275" y2="95.2797" gradientUnits="userSpaceOnUse">
        <stop stopColor="#313131"/>
        <stop offset="1" stopColor="#141415"/>
        </linearGradient>
        <linearGradient id="blatta-dark-g1" x1="6.43187" y1="3.46481" x2="88.1069" y2="100.485" gradientUnits="userSpaceOnUse">
        <stop stopColor="#292929"/>
        <stop offset="1" stopColor="#101010"/>
        </linearGradient>
        <linearGradient id="blatta-dark-g2" x1="9" y1="7.5" x2="91" y2="104" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7F49CA"/>
        <stop offset="1" stopColor="#3F2464"/>
        </linearGradient>
        <clipPath id="blatta-dark-clip">
        <rect width="99" height="99" fill="white"/>
        </clipPath>
      </>
    ),
    light: (
      <>
        <g clipPath="url(#blatta-light-clip)">
        <path d={PATHS.blatta[0]} fill="url(#blatta-light-g0)" stroke="url(#blatta-light-g1)" strokeOpacity="0.7"/>
        <path d={PATHS.blatta[1]} fill="#D9D9D9"/>
        <path d={PATHS.blatta[1]} fill="#D9D9D9" fillOpacity="0.2"/>
        </g>
      </>
    ),
    dark: (
      <>
        <g clipPath="url(#blatta-dark-clip)">
        <path d={PATHS.blatta[0]} fill="url(#blatta-dark-g0)" stroke="url(#blatta-dark-g1)" strokeOpacity="0.7" strokeLinejoin="round"/>
        <path d={PATHS.blatta[1]} fill="url(#blatta-dark-g2)"/>
        <path d={PATHS.blatta[1]} fill="#D9D9D9" fillOpacity="0.2"/>
        </g>
      </>
    ),
  },
};

export function AppIcon({
  meta,
  size = "md",
}: {
  meta: AppMeta;
  size?: keyof typeof SIZES;
}) {
  const icon = ICONS[meta.slug];
  return (
    <svg
      viewBox={icon.viewBox}
      aria-hidden="true"
      className={`${SIZES[size]} shrink-0 drop-shadow-sm`}
    >
      {/* Defs sit outside the toggled groups: a gradient is never rendered
          directly, but keeping the definitions clear of a display:none subtree
          removes any question of whether the reference still resolves. */}
      <defs>{icon.defs}</defs>
      <g className="[display:var(--icon-light-display)]">{icon.light}</g>
      <g className="[display:var(--icon-dark-display)]">{icon.dark}</g>
    </svg>
  );
}
