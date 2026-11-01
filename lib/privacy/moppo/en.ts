import type { MoppoPrivacyPolicy } from "../moppo-policy";

/** Source: Moppo's App/Resources/Privacy.md and documented permission behavior. */
export const policy: MoppoPrivacyPolicy = {
  title: "Moppo privacy policy",
  description: "How Moppo handles files, photos, local cleanup history, command-line and AI agent use, permissions, optional update checks, and support requests.",
  intro: ["Moppo is a free, open-source macOS app from Anguria Studio. It helps you review disk usage, cleanup candidates, duplicates, and application removal. This policy describes the Moppo app and its moppo command-line tool."],
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
    cli: {
      heading: "Command line and AI agents",
      blocks: [
        "You or an AI agent can use the moppo command-line tool to scan storage, prepare cleanup plans, and remove planned items. The tool saves three types of records in private folders under ~/Library/Application Support/Moppo. The permissions of these folders and files limit access to your macOS user account.",
        {
          kind: "ul",
          items: [
            "Scan reports contain file names, paths, measurements, scan explanations, and file identity checks for plan validation. Reports stay in ~/Library/Application Support/Moppo/cli-scans and expire after seven days. Moppo keeps the ten newest reports and the reports that saved plans use.",
            "Saved cleanup plans contain identifiers. A plan expires after one day, or earlier when its scan report expires. At most twenty plans remain.",
            "Removal outcome records contain identifiers, status codes, and counts without file names or paths. They expire after seven days. At most 100 records remain.",
          ],
        },
        "Moppo does not use expired records. Their files can remain until a later cleanup of the folder. Invalid files and backups can remain beyond these limits.",
        { kind: "p", runs: ["Normal command output omits file names, paths, and detailed explanations. The ", { kind: "nowrap", text: "--include-paths" }, " option adds them to the output of one command only. Reduced output still contains storage metadata, such as categories, sizes, and storage classifications. The supported command-line interface never returns file contents."] },
        { kind: "p", runs: ["An AI agent that runs the tool can send its output to an external model provider. The provider’s own settings and policies apply to that output. Moppo does not control provider retention, backups, or further disclosure. Moppo cannot make sure that the agent processes output only on your Mac. Use ", { kind: "nowrap", text: "--include-paths" }, " with an agent only if you accept that its provider can receive those names and paths."] },
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
