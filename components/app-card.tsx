// Superseded by app-showcase-card.tsx. Kept so the old homepage is one import away.
import Link from "next/link";
import { AppIcon } from "./app-icon";
import type { AppMeta } from "@/lib/apps";
import type { AppCopy } from "@/lib/dictionaries/en";
import { localePath, type Locale } from "@/lib/i18n";

export function AppCard({
  locale,
  meta,
  copy,
}: {
  locale: Locale;
  meta: AppMeta;
  copy: AppCopy;
}) {
  return (
    <Link
      href={localePath(locale, meta.slug)}
      className="group flex flex-col rounded-card border border-hairline bg-surface p-6 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgb(0_0_0/0.18)]"
    >
      <AppIcon meta={meta} />
      <h2 className="mt-5 text-lg font-semibold tracking-tight">{copy.name}</h2>
      <p className="mt-1.5 text-[15px] text-muted text-pretty">
        {copy.tagline}
      </p>
      <span
        aria-hidden="true"
        className="mt-4 text-[13px] font-medium text-muted transition group-hover:text-melon-500"
      >
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
          &rarr;
        </span>
      </span>
    </Link>
  );
}
