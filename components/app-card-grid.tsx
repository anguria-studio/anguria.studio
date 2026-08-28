// Superseded by app-showcase.tsx. Kept so the old homepage is one import away.
import { AppCard } from "./app-card";
import { appList } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";

export function AppCardGrid({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-8">
      <div className="grid gap-5 sm:grid-cols-3">
        {appList.map((meta) => (
          <AppCard
            key={meta.slug}
            locale={locale}
            meta={meta}
            copy={dict.apps[meta.slug]}
          />
        ))}
      </div>
    </section>
  );
}
