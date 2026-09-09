import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import type { ReactNode } from "react";
import type { AppSlug } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";

export function Footer({
  locale,
  dict,
  slug,
  note,
}: {
  locale: Locale;
  dict: Dictionary;
  slug?: AppSlug;
  /** An extra line above the footer row, for a page that has something to
   *  credit. Passed in rather than derived from `slug`, so this stays a
   *  generic footer that knows nothing about any particular app. */
  note?: ReactNode;
}) {
  return (
    <footer className="mt-8 border-t border-hairline">
      {/* One row: whatever the page has to credit on the left, the controls on
          the right. The note shares the row rather than sitting above it, so a
          page without one simply has a shorter row. */}
      <div className="mx-auto flex max-w-page flex-col items-center gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:justify-between sm:gap-4">
        {/* Interactive first on mobile, last on desktop. */}
        <div className="flex items-center gap-3 sm:order-last">
          <LanguageSwitcher locale={locale} slug={slug} />
          <span aria-hidden="true" className="h-4 w-px bg-hairline" />
          <ThemeToggle labels={dict.themeToggle} />
        </div>

        {note ? <p className="text-center sm:text-left">{note}</p> : null}
      </div>
    </footer>
  );
}
