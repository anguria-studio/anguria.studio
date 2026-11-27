"use client";

import type { ComponentProps, MouseEvent } from "react";
import { ActionLink } from "@/components/ui/action-link";

type ReleaseAsset = {
  name?: string;
  state?: string;
  browser_download_url?: string;
};

const pendingDownloads = new Set<string>();

export function LatestReleaseDownload({ apiUrl, repositoryUrl, ...link }: Omit<ComponentProps<typeof ActionLink>, "onClick"> & {
  apiUrl: string;
  repositoryUrl: string;
}) {
  async function download(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (pendingDownloads.has(apiUrl)) return;
    pendingDownloads.add(apiUrl);

    let destination = link.href;
    try {
      const response = await fetch(apiUrl, { cache: "no-cache", signal: AbortSignal.timeout(5000) });
      if (response.ok) {
        const { assets } = await response.json() as { assets?: ReleaseAsset[] };
        const downloadPrefix = `${repositoryUrl}/releases/download/`;
        const dmg = assets?.find(asset =>
          asset.state === "uploaded" &&
          typeof asset.name === "string" && /\.dmg$/i.test(asset.name) &&
          asset.browser_download_url?.startsWith(downloadPrefix),
        );
        destination = dmg?.browser_download_url ?? destination;
      }
    } catch {
      // Fall back to the current release page if GitHub is unavailable.
    } finally {
      pendingDownloads.delete(apiUrl);
    }

    window.location.assign(destination);
  }

  return <ActionLink {...link} onClick={download} />;
}
