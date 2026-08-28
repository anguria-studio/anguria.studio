import Link from "next/link";
import { ArrowRight } from "./arrow-right";
import { GitHubMark } from "./github-mark";
import { site } from "@/lib/apps";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/en";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <header className="header-divide sticky top-0 z-50 border-b bg-header backdrop-blur-xl backdrop-saturate-150">
      {/* Stage 0 of the load cascade sits here rather than on <header>:
          header-divide already owns that element's animation-name, and a second
          animation rule would replace it, silently killing the scroll-driven
          bottom rule. Visually identical — at scroll 0 the header's own paint is
          a tint of the page background and a transparent border.
          `fade-0`, not `enter-0`: the rise the other stages use reads as a
          glitch on a bar pinned to the top edge. */}
      <div className="mx-auto flex h-20 max-w-page items-center justify-between px-6 motion-safe:fade-0">
        <Link
          href={localePath(locale)}
          className="flex items-center gap-3 text-2xl font-bold tracking-tight"
        >
          {/* Cropped tight to the fruit, so no tile and no background — it sits
              directly on the header and works on the dark theme. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mark.png"
            alt=""
            width={40}
            height={40}
            className="size-8 shrink-0 select-none"
          />
          {dict.nav.home}
        </Link>

        {/* Foreground at 5% alpha rather than a fixed grey, so the same class
            reads correctly on both the white and the black theme. */}
        {/* Hover swaps the contents instead of tinting the pill: the row slides
            left by exactly icon + gap (24px), which lands the label's left edge
            on 20px — the same as px-5 — so the hovered pill mirrors the resting
            one rather than looking cramped. The icon fades as it goes, because
            overflow-hidden clips at the border box and would otherwise leave
            ~12px of it showing inside the padding.

            Only the TRANSITIONS are motion-safe, not the translate itself:
            without the shift the absolutely-positioned arrow would overlap the
            label, so reduced motion gets an instant swap rather than none. */}
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-foreground/5 px-5 text-base font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40"
        >
          <GitHubMark className="size-4 motion-safe:transition motion-safe:duration-200 motion-safe:ease-out group-hover:-translate-x-6 group-focus-visible:-translate-x-6 group-hover:opacity-0 group-focus-visible:opacity-0" />
          <span className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out group-hover:-translate-x-6 group-focus-visible:-translate-x-6">
            {dict.nav.github}
          </span>
          {/* Absolute, so the pill's width never changes between states — it
              would otherwise twitch, and by a different amount per language.

              Starts at translate-x-9 (36px), not less: the arrow's right edge
              rests 20px in from the pill's edge, so anything under 36px leaves
              part of it sitting inside the pill and the entrance reads as a
              fade rather than a slide. At 36px it begins fully outside the
              border box, clipped by overflow-hidden, and genuinely slides in. */}
          <ArrowRight className="absolute inset-y-0 right-5 my-auto size-4 translate-x-9 opacity-0 motion-safe:transition motion-safe:duration-200 motion-safe:ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
        </a>
      </div>
    </header>
  );
}
