"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries/en";
import styles from "./moppo-detail.module.css";

// Planned launch command. The Homebrew cask is a placeholder for now.
const command = "brew install --cask moppo";

export function MoppoInstallCommand({ copy }: { copy: Dictionary["moppoPage"]["install"] }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2500);
    return () => window.clearTimeout(timer);
  }, [status]);

  return (
    <div className={styles.install}>
      <button
        type="button"
        className={styles.command}
        aria-label={copy.copy}
        title={copy.copy}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(command);
            setStatus("copied");
          } catch {
            setStatus("failed");
          }
        }}
      >
        <code>{command}</code>
        <svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {status === "copied" ? <path d="m5 12 4 4L19 6" /> : <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>}
        </svg>
      </button>
      <span className={styles.copyStatus} role="status">{status === "copied" ? copy.copied : status === "failed" ? copy.failed : ""}</span>
    </div>
  );
}
