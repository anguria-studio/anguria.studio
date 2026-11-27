import type { OboloTerms } from "../obolo-terms";

export const terms: OboloTerms = {
  title: "Obolo Terms of Use",
  description: "Terms of use for Obolo, the macOS subscription tracker from Anguria Studio. MIT License, spending estimates, third-party services, and your data.",
  sections: {
    software: {
      heading: "Software license",
      paragraph: [
        "Obolo is free, open-source software from Anguria Studio. Its source code is available under the ",
        { kind: "license", text: "MIT License" },
        ". The license explains your rights to use, copy, modify, and distribute the software and sets out the warranty disclaimer and limits of liability.",
      ],
    },
    tracking: {
      heading: "Subscription tracking",
      paragraph: ["Obolo tracks the subscriptions you enter or import. It estimates spending and upcoming renewals using your records and exchange rates. Your subscription providers handle billing and cancellations. Check actual charges, renewal dates, and cancellation status with each provider."],
    },
    "third-party": {
      heading: "External services",
      paragraph: ["Features such as iCloud sync, calendar integration, logo lookup, and exchange-rate updates can use third-party services. Those services have their own terms and privacy policies."],
    },
    data: {
      heading: "Your data",
      paragraph: ["Your subscription library is stored on your Mac. See the ", { kind: "privacy", text: "privacy policy" }, " for details about optional sync, external requests, backups, and deletion."],
    },
    contact: {
      heading: "Changes and contact",
      paragraph: ["We post updates to these terms on this page. For questions, email ", { kind: "email" }, "."],
    },
  },
};
