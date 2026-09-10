import type { PaguroPrivacyPolicy } from "../paguro-policy";

/**
 * English is the source text of the policy: the other three locales are
 * transcriptions of it, typed against the same `PaguroPrivacyPolicy` so a
 * dropped section is a compile error and a dropped paragraph is a test
 * failure (tests/paguro-privacy.test.mjs).
 *
 * This is a legal statement, so the wording is deliberate: every hedge
 * ("is not a guarantee", "may be retried", "do not guarantee") is load-bearing
 * and must survive edits and translation.
 */
export const policy: PaguroPrivacyPolicy = {
  title: "Paguro privacy policy",
  description:
    "How Paguro handles your data. Workspaces, sessions and settings stay on your Mac; there is no Paguro account, cloud sync or app telemetry.",
  intro: [
    "Paguro is a free, open-source macOS app from Anguria Studio. It brings websites and web services together in workspaces on your Mac. This policy describes the Paguro app. The websites you open have their own privacy policies.",
  ],
  sections: {
    local: {
      heading: "Data on your Mac",
      blocks: [
        "Paguro stores workspace names, service addresses, account labels, preferences, and cached icons locally. Each service account has a separate WebKit data store for cookies, website storage, and session data. Paguro does not operate an account or cloud-sync service for this information, and it does not send app telemetry to Anguria Studio.",
        "You sign in directly to each website. Paguro does not maintain its own database of your account passwords. Website cookies and session tokens can keep you signed in, so local session data should still be treated as sensitive.",
      ],
    },
    network: {
      heading: "Websites and network requests",
      blocks: [
        "The websites you open connect to their providers. Those providers receive network information, such as your IP address, and information you submit or share through their services. They may use cookies, analytics, or other tracking under their own policies. Paguro’s content-blocking options do not guarantee that all tracking is blocked.",
        "Paguro fetches service icons from websites and caches them on your Mac. These requests can disclose your IP address and the requested address to the website or its icon host.",
        "The Mac App Store edition does not include the Google icon lookup.",
        "In the direct-download edition, an optional Google icon lookup is off by default. If you enable it and Paguro cannot find an icon directly, it can send the service hostname to Google’s favicon service. Google also receives the network request, including your IP address. Paguro filters likely-private hostnames before using this fallback; the filter is not a guarantee that every private address can be recognized. You can turn this option off in Settings → Privacy.",
      ],
    },
    permissions: {
      heading: "Notifications and permissions",
      blocks: [
        "Paguro can read notification signals from a service and display notification text in macOS notifications or the optional island. Paguro does not send this text to Anguria Studio. The island keeps its notification list in memory; macOS manages notifications delivered to Notification Center.",
        "Locking Paguro suppresses new notification presentation. It does not sign you out of websites or stop all background website activity. Quit Paguro to stop its web sessions and notification polling.",
        "Camera and microphone access is used when you allow a website to use those devices. The website handles any media you share. Paguro uses macOS authentication for its app lock; it does not receive your fingerprint or your Mac login password.",
        "Files you choose to upload are shared with the selected website. Downloads are saved to your Mac. These files remain subject to the website’s own data practices.",
      ],
    },
    export: {
      heading: "Configuration export and deletion",
      blocks: [
        "Configuration export saves workspaces, services, and portable preferences to a file you choose. It excludes login sessions. An export can still contain private service addresses and account labels; share it only with people you intend to receive that information. Paguro does not upload this file for you.",
        "Deleting a service account from Paguro schedules removal of its local WebKit session data. Removing only a workspace link does not delete an account that is still used elsewhere. Local cleanup may be retried if WebKit is busy. Deleting an account in Paguro does not delete your account or information held by the website provider. Use the provider’s controls for that.",
        "Exported configuration files, downloaded files, macOS notifications, and system backups are separate from the service data store. Manage those copies with the relevant app or macOS controls.",
      ],
    },
    updates: {
      heading: "App updates",
      blocks: [
        "The Mac App Store edition uses Apple’s update system and does not include Sparkle or contact Paguro’s direct-download update feed.",
        "The direct-download edition uses Sparkle to check for updates hosted on GitHub. Update checks and downloads make network requests to GitHub and its delivery infrastructure. Paguro disables Sparkle’s optional system-profile reporting. Automatic update checks can be controlled in the app’s About settings.",
      ],
    },
    contact: {
      heading: "Contact and changes",
      blocks: [
        {
          kind: "p",
          runs: [
            "For privacy questions, contact ",
            { kind: "email" },
            ". If you contact us, you choose what information to include. Do not send passwords, login tokens, or private notification content. Public issue reports on GitHub can be read by others.",
          ],
        },
        "We will update this page when the app’s data handling changes and show the current effective date here.",
      ],
    },
  },
};
