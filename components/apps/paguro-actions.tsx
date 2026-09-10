import { AppleMark } from "@/components/ui/apple-mark";
import { ArrowRight } from "@/components/ui/arrow-right";
import { GitHubMark } from "@/components/ui/github-mark";
import type { AppMeta } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries/en";

/**
 * The page's two calls to action, always rendered as a pair so they can never
 * drift apart. The sticky header shows them from `sm` up; the hero shows them
 * below `desk`, where it has no interactive demo to act as its call to action.
 * Phones therefore get exactly one copy, the hero's.
 *
 * The hover is the homepage GitHub pill's, reproduced exactly: the row slides
 * left by icon + gap (24px), landing the label's left edge on 20px — the same
 * as px-5 — so the hovered pill mirrors the resting one instead of looking
 * cramped. The icon fades as it goes, because overflow-hidden clips at the
 * border box and would otherwise leave part of it inside the padding. The arrow
 * is absolutely positioned so the pill's width never changes between states,
 * and starts at translate-x-9 (36px) so it begins fully OUTSIDE the border box
 * — at its 20px rest inset plus its own 16px width, anything less reads as a
 * fade rather than a slide.
 *
 * Only the TRANSITIONS are motion-safe, not the translate: without the shift
 * the absolutely-positioned arrow would sit on top of the label, so reduced
 * motion gets an instant swap rather than no swap at all.
 */
const PILL =
  "group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full px-5 text-base font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40";
const SWAP =
  "motion-safe:transition motion-safe:duration-200 motion-safe:ease-out group-hover:-translate-x-6 group-focus-visible:-translate-x-6 group-hover:opacity-0 group-focus-visible:opacity-0";
const LABEL =
  "motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out group-hover:-translate-x-6 group-focus-visible:-translate-x-6";
const ARROW =
  "absolute inset-y-0 right-5 my-auto size-4 translate-x-9 opacity-0 motion-safe:transition motion-safe:duration-200 motion-safe:ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100";

function Pill({
  href,
  tone,
  label,
  icon,
}: {
  href: string;
  tone: "solid" | "subtle";
  label: string;
  icon: React.ReactNode;
}) {
  // Until `apps.paguro.appStore` is set, the primary pill's href falls back to
  // the same GitHub release page as the secondary one — even though its label
  // already names the App Store. That mismatch is deliberate: the labels ship
  // first and the URL follows when the listing goes live. Setting meta.appStore
  // splits the two destinations again.
  // An in-page anchor must not open in a new tab; the rest are external.
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`${PILL} ${tone === "solid" ? "bg-foreground text-background" : "bg-foreground/5 text-foreground"}`}
    >
      {icon}
      <span className={LABEL}>{label}</span>
      <ArrowRight className={ARROW} />
    </a>
  );
}

export function PaguroActions({
  copy,
  meta,
  className = "",
}: {
  copy: Dictionary["paguroPage"];
  meta: AppMeta;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Pill
        href={meta.appStore ?? meta.download}
        tone="solid"
        label={copy.appStore}
        icon={<AppleMark className={`size-4 ${SWAP}`} />}
      />
      <Pill
        href={meta.download}
        tone="subtle"
        label={copy.github}
        icon={<GitHubMark className={`size-4 ${SWAP}`} />}
      />
    </div>
  );
}
