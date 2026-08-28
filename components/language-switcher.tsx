import Link from "next/link";
import type { AppSlug } from "@/lib/apps";
import { locales, localePath, type Locale } from "@/lib/i18n";

/**
 * Never parses the current URL: each page already knows its own (locale, slug)
 * and localePath() knows that the default locale is unprefixed.
 *
 * Switching to or from `en` crosses root layouts, so it is a full page load
 * rather than a client navigation. That is intentional — it is how the browser
 * gets a document with the right `<html lang>`.
 */
export function LanguageSwitcher({
  locale,
  slug,
}: {
  locale: Locale;
  slug?: AppSlug;
}) {
  return (
    <nav aria-label="Language" className="flex items-center gap-0.5">
      {locales.map((l) => {
        const current = l === locale;
        return (
          <Link
            key={l}
            href={localePath(l, slug)}
            hrefLang={l}
            aria-current={current ? "true" : undefined}
            className={`rounded-full px-2 py-1 text-xs font-medium tracking-wide transition ${
              current
                ? "bg-foreground/8 text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            {l.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
