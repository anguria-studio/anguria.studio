import type { MoppoTerms } from "../moppo-terms";

/** Based on Moppo's MIT License and documented cleanup/recovery behavior. */
export const terms: MoppoTerms = {
  title: "Moppo Terms of Use",
  description: "Terms of use for Moppo, the free, open-source Mac cleaner. MIT License, cleanup and recovery, warranty, external services, and your data.",
  sections: {
    software: {
      heading: "The software",
      paragraph: ["Moppo is free, open-source software by Anguria Studio, released under the ", { kind: "license", text: "MIT License" }, ". The full license is in the GitHub repository and governs your use, copying, and modification of the code."],
    },
    cleanup: {
      heading: "Cleanup and recovery",
      paragraph: ["Review the items you select for removal and keep backups of important data. Ordinary file cleanup moves items to the Trash. Put Back requires a saved receipt and the item still being in the Trash; it cannot restore packages removed by Homebrew or Docker images. Emptying the Trash permanently erases its contents. Photo removals use Photos and can affect other devices through iCloud Photos; recovery is managed in Photos. Reported cleanup sizes are estimates and do not guarantee how much space will be recovered."],
    },
    warranty: {
      heading: "No warranty",
      paragraph: ["Moppo is provided “as is”, without warranty of any kind. The warranty exclusions and limitations of liability in the MIT License apply. Cleanup checks and recovery features do not guarantee that data loss cannot occur."],
    },
    "third-party": {
      heading: "External services",
      paragraph: ["Features that use Photos, iCloud, Homebrew, Docker, or the update service are subject to those services’ own terms and settings. Moppo is not affiliated with or endorsed by those providers."],
    },
    data: {
      heading: "Your data",
      paragraph: ["Moppo has no account service or app telemetry. Scan records, settings, and cleanup history stay on your Mac. Optional update checks and external services can make network requests. See our ", { kind: "privacy", text: "Privacy Policy" }, " for details."],
    },
    changes: {
      heading: "Changes",
      paragraph: ["We may update these terms; changes are posted on this page."],
    },
    contact: {
      heading: "Contact",
      paragraph: ["Questions: ", { kind: "email" }],
    },
  },
};
