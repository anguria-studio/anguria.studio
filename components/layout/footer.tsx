import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import type { AppSlug } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";

export function Footer({
  locale,
  dict,
  slug,
}: {
  locale: Locale;
  dict: Dictionary;
  slug?: AppSlug;
}) {
  return (
    <footer className="mt-8 border-t border-hairline">
      <div className="mx-auto flex max-w-page flex-col items-center gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:justify-between sm:gap-4">
        {/* Interactive first on mobile, last on desktop. */}
        <div className="flex items-center gap-3 sm:order-last">
          <LanguageSwitcher locale={locale} slug={slug} />
          <span aria-hidden="true" className="h-4 w-px bg-hairline" />
          <ThemeToggle labels={dict.themeToggle} />
        </div>

        <p className="text-center sm:text-left">{dict.footer.rights}</p>
      </div>
    </footer>
  );
}
