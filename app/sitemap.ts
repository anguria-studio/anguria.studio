import type { MetadataRoute } from "next";
import { moppoPrivacyPath, moppoTermsPath, paguroPrivacyPath, paguroTermsPath, type PagePath } from "@/lib/apps";
import { locales, type Locale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/metadata";
import { paguroPrivacyEffective } from "@/lib/privacy/paguro-policy";
import { paguroTermsUpdated } from "@/lib/terms/paguro-terms";
import { moppoPrivacyEffective } from "@/lib/privacy/moppo-policy";
import { moppoTermsUpdated } from "@/lib/terms/moppo-terms";

export const dynamic = "force-static";

/**
 * Only the pages that are actually served. The home page and Obolo (in every
 * locale) are host-level temporary
 * redirects to the Paguro page — see vercel.json — and a sitemap must not
 * advertise a URL that answers with a redirect. When the redirects go, this
 * returns to `[undefined, ...pagePaths]` with the home page at priority 1.
 */
const served: PagePath[] = ["paguro", "moppo", paguroPrivacyPath, paguroTermsPath, moppoPrivacyPath, moppoTermsPath];

const legalDates: Partial<Record<PagePath, string>> = {
  [paguroPrivacyPath]: paguroPrivacyEffective,
  [paguroTermsPath]: paguroTermsUpdated,
  [moppoPrivacyPath]: moppoPrivacyEffective,
  [moppoTermsPath]: moppoTermsUpdated,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale: Locale) =>
    served.map((path) => ({
      url: absoluteUrl(locale, path),
      // Legal documents have explicit dates and change less often than the app page.
      changeFrequency:
        legalDates[path] ? ("yearly" as const) : ("monthly" as const),
      // Paguro is the effective front door while `/` redirects to it.
      priority: legalDates[path] ? 0.3 : 1,
      ...(legalDates[path]
        ? { lastModified: legalDates[path] }
        : {}),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, absoluteUrl(l, path)]),
        ),
      },
    })),
  );
}
