/**
 * Non-translatable data about each app: URLs and versions. Native icon artwork
 * lives in public/paguro/ and public/moppo/.
 * All user-facing copy (name, tagline, description, features) lives in the
 * dictionaries so it can be translated — see lib/dictionaries/en.ts.
 */
export const appSlugs = ["moppo", "paguro"] as const;
export type AppSlug = (typeof appSlugs)[number];

export type AppMeta = {
  slug: AppSlug;
  github: string;
  download: string;
  /** Minimum macOS version, shown on the app page. */
  minMacOS: string;
  /** App Store product page. Optional: an app that has not shipped yet has no
   *  listing. Setting this field replaces Paguro’s direct download action. */
  appStore?: string;
};

export const apps: Record<AppSlug, AppMeta> = {
  moppo: {
    slug: "moppo",
    github: "https://github.com/anguria-studio/Moppo",
    // Stable asset name: this address always downloads the latest release.
    download: "https://github.com/anguria-studio/Moppo/releases/latest/download/Moppo.dmg",
    minMacOS: "15.0",
  },
  paguro: {
    slug: "paguro",
    github: "https://github.com/anguria-studio/Paguro",
    // Each Paguro release carries a copy of its disk image under this fixed
    // name, so this address always returns the newest version.
    download: "https://github.com/anguria-studio/Paguro/releases/latest/download/Paguro.dmg",
    minMacOS: "15.0",
    // Storefront-neutral: without a country segment Apple opens the visitor's own store.
    appStore: "https://apps.apple.com/app/paguro/id6805463271?mt=12",
  },
};

/** Locale-relative path of Paguro's privacy policy; nested under the app page it describes. */
export const paguroPrivacyPath = "paguro/privacy" as const;
export const paguroTermsPath = "paguro/terms" as const;
export const moppoPrivacyPath = "moppo/privacy" as const;
export const moppoTermsPath = "moppo/terms" as const;
export const paguroNotificationTestPath = "paguro/test-notifications" as const;

/**
 * Every page below the home page, as a locale-relative path with no leading
 * slash. Hrefs, canonical, hreflang and the sitemap are all typed against this,
 * so a page cannot be linked to without also being exported.
 */
export const pagePaths = [...appSlugs, paguroPrivacyPath, paguroTermsPath, moppoPrivacyPath, moppoTermsPath, paguroNotificationTestPath] as const;
export type PagePath = (typeof pagePaths)[number];

export const site = {
  name: "Anguria Studio",
  domain: "anguria.studio",
  url: "https://anguria.studio",
  github: "https://github.com/anguria-studio",
  email: "hello@anguria.studio",
};
