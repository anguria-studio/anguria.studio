import type { MetadataRoute } from "next";
import { paguroPrivacyPath, type PagePath } from "@/lib/apps";
import { locales, type Locale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/metadata";
import { paguroPrivacyEffective } from "@/lib/privacy/paguro-policy";

export const dynamic = "force-static";

/**
 * Only the pages that are actually served. Until Obolo and Scolo ship, the home
 * page and the two other app pages (in every locale) are host-level temporary
 * redirects to the Paguro page — see vercel.json — and a sitemap must not
 * advertise a URL that answers with a redirect. When the redirects go, this
 * returns to `[undefined, ...pagePaths]` with the home page at priority 1.
 */
const served: PagePath[] = ["paguro", paguroPrivacyPath];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale: Locale) =>
    served.map((path) => ({
      url: absoluteUrl(locale, path),
      // The policy is the one page that changes on a legal cadence rather than a
      // product one, and it is the only page with a real date to declare.
      changeFrequency:
        path === paguroPrivacyPath ? ("yearly" as const) : ("monthly" as const),
      // Paguro is the effective front door while `/` redirects to it.
      priority: path === paguroPrivacyPath ? 0.3 : 1,
      ...(path === paguroPrivacyPath
        ? { lastModified: paguroPrivacyEffective }
        : {}),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, absoluteUrl(l, path)]),
        ),
      },
    })),
  );
}
