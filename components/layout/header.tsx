import Link from "next/link";
import { ActionLink } from "@/components/ui/action-link";
import { GitHubMark } from "@/components/ui/github-mark";
import { site } from "@/lib/apps";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/en";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <header className="header-divide sticky top-0 z-50 border-b bg-header backdrop-blur-xl backdrop-saturate-150">
      {/* The header's load animation sits here rather than on <header>:
          header-divide already owns that element's animation-name, and a second
          animation rule would replace it, silently killing the scroll-driven
          bottom rule. Visually identical — at scroll 0 the header's own paint is
          a tint of the page background and a transparent border.
          `fade-1`, not `enter-1`: the rise the other stages use reads as a
          glitch on a bar pinned to the top edge. Stage 1, not 0, so the row
          arrives on the hero title's beat instead of popping alone at first
          paint, and settles just before the title finishes. */}
      {/* Same row as PaguroHeader: h-16, a 30px mark beside a text-base wordmark,
          and compact h-8 pills, so the two headers read as one family. */}
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-6 motion-safe:fade-1">
        <Link
          href={localePath(locale)}
          data-analytics-label="home"
          className="inline-flex items-center gap-2 rounded-lg text-base font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500"
        >
          {/* Cropped tight to the fruit, so no tile and no background — it sits
              directly on the header and works on the dark theme. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mark.png"
            alt=""
            width={40}
            height={40}
            className="size-7.5 shrink-0 select-none"
          />
          {dict.nav.home}
        </Link>

        <ActionLink
          href={site.github}
          event="source-click"
          analyticsLabel="studio"
          label={dict.nav.github}
          icon={<GitHubMark />}
          compact
        />
      </div>
    </header>
  );
}
