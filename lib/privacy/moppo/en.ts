import type { MoppoPrivacyPolicy } from "../moppo-policy";

/** Source: Moppo's App/Resources/Privacy.md and documented permission behavior. */
export const policy: MoppoPrivacyPolicy = {
  title: "Moppo privacy policy",
  description: "How Moppo handles files, photos, local cleanup history, permissions, optional update checks, and support requests.",
  intro: ["Moppo is a free, open-source macOS app from Anguria Studio. It helps you review disk usage, cleanup candidates, duplicates, and application removal. This policy describes the Moppo app."],
  sections: {
    files: {
      heading: "Files and photos",
      blocks: ["Moppo scans files on your Mac to find cleanup items and measure storage. It reads your photo library when you use photo duplicate detection. Scans run locally. Moppo does not upload scanned files, file paths, photos, or photo library contents to Anguria Studio."],
    },
    local: {
      heading: "Records on your Mac",
      blocks: [
        "Moppo stores settings, scan caches, storage measurements, and removal receipts on your Mac. Receipts can contain original file paths and Trash locations. Moppo uses these records for History and Put Back.",
        "Moppo has no account service or app telemetry. Local records can contain private information; treat them as sensitive if you choose to share them or include them in a backup.",
      ],
    },
    permissions: {
      heading: "File and Photos access",
      blocks: ["macOS controls access to files and your photo library. Full Disk Access lets Moppo scan protected folders; you can continue with limited access, which can leave some folders unreadable. Scheduled scans and automatic storage measurements require Full Disk Access. Opening photo duplicate detection requests Photos access. You can manage these permissions in macOS System Settings."],
    },
    updates: {
      heading: "Optional app updates",
      blocks: ["Automatic update checks are optional. When you check for updates, Moppo contacts the update website over HTTPS. The website receives your IP address and normal connection information. Sparkle compares your installed Moppo version with the update feed. Moppo disables Sparkle system-profile reporting and asks before installing an update."],
    },
    services: {
      heading: "External services",
      blocks: [
        "Photos and iCloud requests use Apple services and your existing Apple account. With photo downloads enabled, scans and the photo grid can download missing previews from iCloud; opening a photo preview can download its original. You can turn photo downloads off in Settings → Advanced. The setting applies to new requests; active requests can finish.",
        "Homebrew removal uses your installed Homebrew tools. Homebrew can contact its package sources under its own settings. If Homebrew needs your password, Moppo sends it directly to sudo and does not save it. These services handle their own network requests under their own policies.",
      ],
    },
    support: {
      heading: "Support requests",
      blocks: ["Moppo can prepare a support report containing Moppo and macOS versions. The generated report does not include file paths, photos, removal logs, or stored measurements. You can review the report before sending it. Your email provider and Anguria Studio receive the information you choose to send. Public GitHub issue reports can be read by others."],
    },
    contact: {
      heading: "Contact and changes",
      blocks: [
        { kind: "p", runs: ["For privacy questions, contact ", { kind: "email" }, "."] },
        "We will update this page when the app’s data handling changes and show the current effective date here.",
      ],
    },
  },
};
