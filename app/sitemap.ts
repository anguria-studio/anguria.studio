import type { MetadataRoute } from "next";
import { pagePaths, paguroPrivacyPath, type PagePath } from "@/lib/apps";
import { locales, type Locale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/metadata";
import { paguroPrivacyEffective } from "@/lib/privacy/paguro-policy";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: (undefined | PagePath)[] = [undefined, ...pagePaths];

  return locales.flatMap((locale: Locale) =>
    pages.map((path) => ({
      url: absoluteUrl(locale, path),
      // The policy is the one page that changes on a legal cadence rather than a
      // product one, and it is the only page with a real date to declare.
      changeFrequency:
        path === paguroPrivacyPath ? ("yearly" as const) : ("monthly" as const),
      priority: path === undefined ? 1 : path === paguroPrivacyPath ? 0.3 : 0.8,
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
