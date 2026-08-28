import type { ReactNode } from "react";
import type { FeatureId } from "@/lib/features";
import { GITHUB_MARK_PATH } from "@/components/ui/github-mark";

/* Held as consts because each is drawn twice: once as the visible glyph and
   once more as a clip path or a ghost copy. */
const SWIFT_PATH =
  "M41.0648 0.00237602C41.0648 0.00237602 55.7187 8.44735 59.5536 21.8633C63.0091 33.9819 60.2419 39.7655 60.2419 39.7655C62.009 41.7066 63.4015 43.9629 64.3479 46.4188C65.2984 47.9968 65.8569 49.7828 65.976 51.625C66.095 53.4672 65.7709 55.3111 65.0314 57C65.0314 57 64.7957 52.0575 57.4888 51.0334C50.7924 50.0829 48.3575 56.6555 35.5681 56.337C28.4818 56.2009 21.5361 54.3194 15.3366 50.8565C9.137 47.3936 3.8718 42.4545 0 36.4697C6.24858 39.9057 14.4347 45.2402 24.629 44.4205C34.8233 43.6007 36.9517 40.4427 36.9517 40.4427C25.4928 31.3015 15.35 20.5989 6.81427 8.6422C14.8283 15.4025 34.6795 28.8564 34.2175 28.5143C26.9563 21.3616 20.3129 13.5982 14.3592 5.3084C14.3592 5.3084 44.1431 29.9946 46.5402 29.8378C47.5255 27.7919 52.6191 17.2012 41.0624 0L41.0648 0.00237602Z";

const BOLT_PATH =
  "M51.5811 30.3207L24.8163 65.0137C24.5602 65.3472 24.1945 65.5784 23.7847 65.6658C23.3748 65.7532 22.9474 65.6912 22.5787 65.4909C22.2101 65.2906 21.9242 64.965 21.7721 64.5722C21.62 64.1795 21.6116 63.7451 21.7484 63.3467L30.5285 37.6205H15.8209C15.4895 37.6203 15.1649 37.5264 14.884 37.3494C14.6032 37.1725 14.3774 36.9197 14.2326 36.6198C14.0877 36.32 14.0295 35.9853 14.0647 35.6538C14.0998 35.3223 14.2269 35.0074 14.4314 34.7451L40.4889 1.37871C40.746 1.04944 41.1103 0.822049 41.5178 0.736616C41.9252 0.651182 42.3495 0.713194 42.7159 0.911721C43.0824 1.11025 43.3674 1.43254 43.5207 1.82179C43.674 2.21104 43.6858 2.64225 43.5541 3.03941L35.4555 27.4529H50.184C50.5142 27.4534 50.8376 27.547 51.1177 27.7229C51.3978 27.8989 51.6232 28.1503 51.7685 28.4487C51.9138 28.747 51.9731 29.0803 51.9398 29.4108C51.9064 29.7413 51.7816 30.0558 51.5797 30.3186L51.5811 30.3207Z";

/**
 * The six feature glyphs, drawn at six different scales and normalised HERE
 * rather than with per-icon size classes.
 *
 * Every viewBox below is SQUARE and is the icon's real ink bounding box —
 * measured with the browser's own getBBox(), not the exported viewBox, because
 * several exports bear no relation to their content: Custom.svg ships 110x135
 * around 45x43 of ink, Lightning.svg 66x83 around 38x65. The square's side is
 * chosen so all six carry the same optical mass (equal geometric mean of the
 * rendered box, capped so nothing exceeds 48px in the 56px slot, nudged for ink
 * density — a solid disc reads larger than three thin bars at the same size).
 *
 * The upshot: the grid renders all six with the SAME class, and the optical
 * tuning is data sitting next to the artwork it describes.
 *
 * Colour is `fill-current` throughout except Liquid Glass, which is three
 * materials rather than three colours — see below.
 *
 * HOVER. Each icon carries its own gesture, on the elements inside it; the
 * shared lift/scale/accent lives on the <svg> in feature-grid.tsx. Two rules
 * hold throughout:
 *   - Every moving part is `motion-safe:`, and every rest state is what the
 *     icon looked like before any of this existed, so a reduced-motion reader
 *     sees the original six exactly.
 *   - CSS px inside an SVG are user units, so `translate-x-1` moves one icon by
 *     4 of ITS units, not 4 screen px — distances here are in viewBox space and
 *     scale with the glyph between size-14 and size-16.
 */
export const FEATURE_ICONS: Record<FeatureId, { viewBox: string; node: ReactNode }> = {
  // Ink fills its 66x57 export exactly. Renders 43.0 x 37.1.
  swift: {
    viewBox: "-10 -14.5 86 86",
    node: (
      <>
        <path d={SWIFT_PATH} />
        {/*
          The hero sweeps the word "Mac" with background-clip: text and a moving
          background-position. Neither applies to a path, so the same look is
          built the other way round here: the glyph becomes a clip, and a lit
          band travels through it. Off the ink the band simply is not drawn,
          which is what makes the rest state free — at 0% and at 100% the band
          sits outside the silhouette, so the icon is its plain self before the
          hover and after it.

          Unlike the hero's one-shot load animation this has to re-fire, which
          it does for free: the rule stops matching on hover-out and matches
          again on the next enter, restarting the animation.

          The ids are page-global, as all inline SVG ids are. Safe while the
          grid renders once per page; a second instance would need them suffixed.
        */}
        <defs>
          <clipPath id="swift-sweep-clip">
            <path d={SWIFT_PATH} />
          </clipPath>
          {/* Transparent -> melon-300 -> transparent. The hero runs
              melon-500/300/500 because its band rides on flat melon-500; here
              the band is a separate layer over a fill that is already melon-500
              on hover, so the same relationship is expressed with alpha. */}
          <linearGradient id="swift-sweep-band">
            <stop offset="0" stopColor="var(--color-melon-300)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--color-melon-300)" />
            <stop offset="1" stopColor="var(--color-melon-300)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g clipPath="url(#swift-sweep-clip)">
          {/* The slant is on this <g>, not on the rect: the animation sets the
              rect's CSS `transform`, which would override a transform
              presentation attribute on the same element and drop the skew
              silently. 100deg in the hero, -10 here — same slight lean. */}
          <g transform="skewX(-10)">
            <rect
              x="-50"
              y="-15"
              width="36"
              height="87"
              fill="url(#swift-sweep-band)"
              className="motion-safe:group-hover/feature:animate-icon-sweep"
            />
          </g>
        </g>
      </>
    ),
  },

  // Ink fills its 80x69 export. Renders 41.9 x 36.1.
  glass: {
    viewBox: "-13.5 -19 107 107",
    node: (
      <>
        {/*
          The two discs orbit their shared centre; the pane does not move. That
          is the right way round for this icon — the glass is the fixed thing you
          look THROUGH, and what changes is the material passing behind it.

          fill-origin gives the pivot for free: this group's bounding box is
          x 0..80, y 0..69 (back disc 0..53, front disc 27..80 / 16..69), whose
          centre is 40, 34.5 — exactly the midpoint between the two disc centres
          26.5,26.5 and 53.5,42.5. So "rotate about the box centre" and "rotate
          about the axis the two discs share" are the same instruction here, and
          no hand-placed transform-origin is needed.

          A half turn rather than a nudge: the two swap ends, which reads as an
          orbit. Anything less reads as the icon being knocked askew.
        */}
        <g className="fill-origin motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover/feature:rotate-180">
          {/* Back disc: ink. */}
          <rect width="53" height="53" rx="26.5" className="fill-current" />
          {/* Front disc: the site accent, replacing the export's near-miss
              #FF5272 so it stays in step if the accent is ever retuned. */}
          <rect x="27" y="16" width="53" height="53" rx="26.5" className="fill-melon-500" />
        </g>
        {/* Glass pane: drawn in the PAGE's own colour, so it reads where it
            crosses the discs and vanishes where it leaves them — which is what
            glass does, and works whatever the background is.
            strokeWidth 2, not the exported 1: this box is 107 units rendered at
            56px, so a 1-unit hairline would land at ~0.5px and grey out.

            Deliberately static on hover: it is the window, not the subject. */}
        <rect
          x="13.5"
          y="12.5"
          width="52"
          height="52"
          rx="19.5"
          strokeWidth={2}
          className="fill-background/20 stroke-background/90"
        />
      </>
    ),
  },

  // The export's <mask> plus its 6.5KB masked path are a Figma inside-stroke:
  // black drawn inside an already-black silhouette. Verified invisible via
  // getBBox and dropped, along with the hardcoded Figma mask id.
  // Ink x 8.37..43.53, y 0..49.17 (the shackle's 3-unit stroke reaches y=0).
  // Renders 34.3 x 48.0.
  privacy: {
    viewBox: "-2.75 -4.1 57.4 57.4",
    node: (
      <>
        <path d="M40.5405 43.7495C38.7422 46.4362 36.8355 49.0578 33.9322 49.1012C31.0288 49.1662 30.0972 47.3895 26.8038 47.3895C23.4888 47.3895 22.4705 49.0578 19.7188 49.1662C16.8804 49.2745 14.7354 46.3062 12.9154 43.6845C9.21044 38.3328 6.37211 28.4745 10.1854 21.8445C12.0704 18.5512 15.4504 16.4712 19.1121 16.4062C21.8855 16.3628 24.5288 18.2912 26.2405 18.2912C27.9305 18.2912 31.1372 15.9728 34.4955 16.3195C35.9038 16.3845 39.8472 16.8828 42.3822 20.6095C42.1872 20.7395 37.6805 23.3828 37.7238 28.8645C37.7888 35.4078 43.4655 37.5962 43.5305 37.6178C43.4655 37.7695 42.6205 40.7378 40.5405 43.7495Z" />
        {/* The shackle is its own path, so it can move against the body: 2 units
            DOWN, seating into it, so the gesture reads as the lock closing.
            Down rather than up on purpose — a shackle lifting away is a lock
            being opened, which is the opposite of what this icon claims.

            The two already sit 0.8 units apart (shackle ends at y 15.5, body
            starts at 16.3), so 2 units sinks the legs 1.2 into the body. Both
            are drawn in currentColor, so the overlap merges invisibly and the
            shackle simply reads as shorter — which is what a closed shackle is.
            --ease-bounce lands it with a click rather than a glide.

            A translation, so it needs no fill-origin: only scale and rotation
            care where the origin is. */}
        <path
          d="M19.0951 15.5C18.6749 10.8333 19.4313 1.5 25.8185 1.5C32.2057 1.5 33.2401 10.8333 32.9589 15.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          className="motion-safe:transition-transform motion-safe:duration-400 motion-safe:ease-bounce motion-safe:group-hover/feature:translate-y-0.5"
        />
      </>
    ),
  },

  // 45 x 43.45 of ink floating in a 110x135 export — very nearly square, so the
  // sliders read landscape exactly as designed once cropped. Given MORE padding
  // than equal-optical-mass would suggest: three thick bars spanning the full
  // width read as big, not sparse, so the density nudge has to go the other way
  // for this one. Renders 42.4 x 40.9, a shade under the rest.
  //
  // REDRAWN as primitives. The export unions each track with its own handle
  // into a single path, which makes the one animation this icon obviously wants
  // — moving the handles — impossible: translating a path takes its track along
  // with it. The geometry below is the export's, read back off the path data
  // (tracks x 32.5..77.5, height 5.04, corner 1.18, row tops 41.63/57.48/73.33;
  // handles 10.58 x 11.74 centred on the track, at x 43.27/66.71/43.28), just
  // drawn as separate rects. Same fill, overlapping — so the rendered result is
  // identical to the union it replaces.
  custom: {
    viewBox: "21 26 68 68",
    node: (
      <>
        <rect x="32.5" y="41.63" width="45" height="5.04" rx="1.18" />
        <rect x="32.5" y="57.48" width="45" height="5.04" rx="1.18" />
        <rect x="32.5" y="73.33" width="45" height="5.04" rx="1.18" />
        {/* Travel and its limits live in --slider-shift-a/b/c; the staggered
            delays are on the hover state only, so the handles leave in sequence
            and return together. */}
        <rect
          x="37.98"
          y="38.27"
          width="10.58"
          height="11.74"
          rx="5.29"
          className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/feature:translate-x-(--slider-shift-a)"
        />
        <rect
          x="61.42"
          y="54.12"
          width="10.58"
          height="11.74"
          rx="5.29"
          className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/feature:translate-x-(--slider-shift-b) motion-safe:group-hover/feature:delay-75"
        />
        <rect
          x="37.99"
          y="69.99"
          width="10.58"
          height="11.74"
          rx="5.29"
          className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/feature:translate-x-(--slider-shift-c) motion-safe:group-hover/feature:delay-150"
        />
      </>
    ),
  },

  // 37.9 x 65 of ink in a 66x83 export. Renders 28.0 x 48.0 — the tallest and
  // narrowest of the six, which is what equal optical mass asks for.
  speed: {
    viewBox: "-4.95 -4.75 75.9 75.9",
    node: (
      <>
        {/* A second bolt, same path at 0.55, drawn FIRST so it sits behind.
            opacity-0 at rest rather than merely hidden behind the main bolt:
            that way the rest state does not depend on one silhouette covering
            the other, and it is provably identical to the single-bolt original.
            The scale is ungated — a static rest state is not motion.
            On hover the two part by 20 units, against a combined half-width of
            about 29, so they still overlap and it reads as one bolt peeking out
            from behind another rather than as two separate marks. */}
        <path
          d={BOLT_PATH}
          className="fill-origin scale-55 opacity-0 motion-safe:transition motion-safe:duration-300 motion-safe:group-hover/feature:-translate-x-4 motion-safe:group-hover/feature:opacity-100"
        />
        <path
          d={BOLT_PATH}
          className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/feature:translate-x-1"
        />
      </>
    ),
  },

  // Renders 37.0 x 37.0, pulled slightly under the others because a filled disc
  // reads larger than an outline at the same box.
  source: {
    viewBox: "-4.1 -4.1 24.2 24.2",
    // The one icon with no internal structure to animate, so it takes the
    // gesture whole: a scale on --ease-bounce, over the grid's own 1.05, which
    // overshoots past ~1.16 and settles. 400ms rather than 300 because the
    // settle is the part you actually see.
    node: (
      <path
        d={GITHUB_MARK_PATH}
        className="fill-origin motion-safe:transition-transform motion-safe:duration-400 motion-safe:ease-bounce motion-safe:group-hover/feature:scale-110"
      />
    ),
  },
};
