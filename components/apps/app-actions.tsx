import type { ComponentProps } from "react";
import { LatestReleaseDownload } from "@/components/apps/latest-release-download";
import { ActionLink } from "@/components/ui/action-link";
import { AppleMark } from "@/components/ui/apple-mark";
import { GitHubMark } from "@/components/ui/github-mark";
import type { AppMeta } from "@/lib/apps";

type ActionMeta = Pick<AppMeta, "slug" | "download" | "github" | "appStore" | "latestReleaseApi">;

export function AppActions({
  copy,
  meta,
  mobileAppStoreLabel,
  className = "",
  location,
  showGithub = true,
  showDownloadOnMobile = false,
}: {
  copy: { download: string; github: string; appStore?: string };
  meta: ActionMeta;
  mobileAppStoreLabel?: string;
  className?: string;
  location: "header" | "hero";
  showGithub?: boolean;
  showDownloadOnMobile?: boolean;
}) {
  const compact = location === "header";
  const primaryAction: Omit<ComponentProps<typeof ActionLink>, "onClick"> = {
    href: meta.appStore || meta.download,
    event: meta.appStore ? "app-store-click" : "download-click",
    analyticsLabel: meta.slug,
    tone: "solid",
    label: meta.appStore ? (copy.appStore ?? copy.download) : copy.download,
    mobileLabel: meta.appStore ? mobileAppStoreLabel : undefined,
    icon: <AppleMark viewBox="2 2 20 20" />,
    compact,
    download: !meta.appStore,
    showDownloadOnMobile,
  };

  return (
    <div data-analytics-location={location} className={`flex flex-wrap items-center gap-3 ${className}`}>
      {!meta.appStore && meta.latestReleaseApi ? (
        <LatestReleaseDownload {...primaryAction} apiUrl={meta.latestReleaseApi} repositoryUrl={meta.github} />
      ) : <ActionLink {...primaryAction} />}
      {showGithub && <ActionLink
        href={meta.github}
        event="source-click"
        analyticsLabel={meta.slug}
        label={copy.github}
        icon={<GitHubMark />}
        compact={compact}
      />}
    </div>
  );
}

export function MobileGitHubLink({ meta, label }: { meta: Pick<ActionMeta, "github" | "slug">; label: string }) {
  return (
    <a href={meta.github} aria-label={label} data-analytics-event="source-click" data-analytics-label={meta.slug} data-analytics-location="header" target="_blank" rel="noreferrer" className="rounded-full bg-foreground/5 p-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500 sm:hidden">
      <GitHubMark className="size-4" />
    </a>
  );
}
