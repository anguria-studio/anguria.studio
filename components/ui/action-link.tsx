import type { MouseEventHandler, ReactNode } from "react";
import { ArrowRight } from "@/components/ui/arrow-right";
import type { AnalyticsEvent } from "@/lib/analytics";

const iconMotion = "motion-safe:transition motion-safe:duration-200 motion-safe:ease-out group-hover:-translate-x-6 group-focus-visible:-translate-x-6 group-hover:opacity-0 group-focus-visible:opacity-0";
const labelMotion = "motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out group-hover:-translate-x-6 group-focus-visible:-translate-x-6";
const arrowMotion = "absolute inset-y-0 right-5 my-auto size-4 translate-x-9 opacity-0 motion-safe:transition motion-safe:duration-200 motion-safe:ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100";

export function ActionLink({ href, label, mobileLabel, icon, event, analyticsLabel, compact = false, tone = "subtle", download = false, showDownloadOnMobile = false, onClick }: {
  href: string;
  label: string;
  mobileLabel?: string;
  icon: ReactNode;
  event: AnalyticsEvent;
  analyticsLabel: string;
  compact?: boolean;
  tone?: "solid" | "subtle";
  download?: boolean;
  showDownloadOnMobile?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const external = !download && href.startsWith("http");
  const display = download && !showDownloadOnMobile ? "hidden sm:inline-flex" : "inline-flex";
  const size = compact ? "h-8 text-xs" : "h-11 text-base";
  const colors = tone === "solid" ? "bg-foreground text-background active:bg-foreground/80" : "bg-foreground/5 text-foreground active:bg-foreground/12";

  return (
    <a
      href={href}
      onClick={onClick}
      data-analytics-event={event}
      data-analytics-label={analyticsLabel}
      download={download || undefined}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group relative items-center gap-2 overflow-hidden rounded-full px-5 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40 ${display} ${size} ${colors}`}
    >
      <span aria-hidden="true" className={`size-4 shrink-0 [&>svg]:size-full ${iconMotion}`}>{icon}</span>
      <span className={labelMotion}>
        {mobileLabel ? (
          <>
            <span className="md:hidden">{mobileLabel}</span>
            <span className="hidden md:inline">{label}</span>
          </>
        ) : label}
      </span>
      {/* Keep the arrow out of the layout so the button stays the same width. */}
      <ArrowRight className={arrowMotion} />
    </a>
  );
}
