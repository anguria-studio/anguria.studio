import type { PaguroTerms } from "../paguro-terms";

/** English is the source text; the other locales preserve its six sections. */
export const terms: PaguroTerms = {
  title: "Paguro Terms of Use",
  description: "Terms of use for Paguro, the free, open-source macOS app by Anguria Studio. MIT License, warranty, third-party services and your data.",
  sections: {
    software: {
      heading: "The software",
      paragraph: [
        "Paguro is free, open-source software by Anguria Studio, released under the ",
        { kind: "license", text: "MIT License" },
        ". The full license is in the GitHub repository and governs your use, copying, and modification of the code.",
      ],
    },
    warranty: {
      heading: "No warranty",
      paragraph: ["Paguro is provided “as is”, without warranty of any kind. We’re not liable for any damage, data loss, or account issues arising from its use."],
    },
    "third-party": {
      heading: "Third-party services",
      paragraph: ["Paguro displays websites such as WhatsApp, Gmail, and Slack. Your use of those services is governed by their own terms and privacy policies, not ours. Paguro isn’t affiliated with or endorsed by them."],
    },
    data: {
      heading: "Your data",
      paragraph: [
        "Paguro has no accounts of its own and no app telemetry. Sessions and settings stay on your Mac. See our ",
        { kind: "privacy", text: "Privacy Policy" },
        " for details.",
      ],
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
