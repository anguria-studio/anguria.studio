import type { MetadataRoute } from "next";
import { moppoPrivacyPath, moppoTermsPath, paguroPrivacyPath, paguroTermsPath, type PagePath } from "@/lib/apps";
import { locales, type Locale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/metadata";
import { paguroPrivacyEffective } from "@/lib/privacy/paguro-policy";
import { paguroTermsUpdated } from "@/lib/terms/paguro-terms";
import { moppoPrivacyEffective } from "@/lib/privacy/moppo-policy";
import { moppoTermsUpdated } from "@/lib/terms/moppo-terms";

export const dynamic = "force-static";

/** Public, indexable pages; the notification test page stays out of the sitemap. */
const served: (PagePath | undefined)[] = [undefined, "paguro", "moppo", paguroPrivacyPath, paguroTermsPath, moppoPrivacyPath, moppoTermsPath];

const legalDates: Partial<Record<PagePath, string>> = {
  [paguroPrivacyPath]: paguroPrivacyEffective,
  [paguroTermsPath]: paguroTermsUpdated,
  [moppoPrivacyPath]: moppoPrivacyEffective,
  [moppoTermsPath]: moppoTermsUpdated,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale: Locale) =>
    served.map((path) => {
      const legalDate = path ? legalDates[path] : undefined;
      return {
        url: absoluteUrl(locale, path),
        // Legal documents have explicit dates and change less often than the app page.
        changeFrequency: legalDate ? ("yearly" as const) : ("monthly" as const),
        priority: legalDate ? 0.3 : path ? 0.8 : 1,
        ...(legalDate ? { lastModified: legalDate } : {}),
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, absoluteUrl(l, path)]),
          ),
        },
      };
    }),
  );
}
