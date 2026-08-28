import type { MetadataRoute } from "next";
import { appSlugs } from "@/lib/apps";
import { locales, type Locale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: (undefined | (typeof appSlugs)[number])[] = [undefined, ...appSlugs];

  return locales.flatMap((locale: Locale) =>
    pages.map((slug) => ({
      url: absoluteUrl(locale, slug),
      changeFrequency: "monthly" as const,
      priority: slug ? 0.8 : 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, absoluteUrl(l, slug)]),
        ),
      },
    })),
  );
}
