import Link from "next/link";
import { MoppoIcon } from "@/components/apps/moppo-icon";
import { ArrowRight } from "@/components/ui/arrow-right";
import type { AppSlug } from "@/lib/apps";
import { localePath, type Locale } from "@/lib/i18n";
import styles from "./also-from-studio.module.css";

export function AlsoFromStudio({ app, locale, name, copy }: {
  app: AppSlug;
  locale: Locale;
  name: string;
  copy: { label: string; body: string };
}) {
  return (
    <aside data-analytics-location="also-from-studio" className="mx-auto max-w-3xl px-6 pb-16 sm:pb-20">
      <Link href={localePath(locale, app)} className={`${styles.card} group`}>
        {app === "moppo" ? <MoppoIcon className="size-12" /> : (
          <span aria-hidden="true" className="size-12 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/paguro/app-icon-light.png" alt="" width={256} height={256} className="size-full [display:var(--icon-light-display)]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/paguro/app-icon-dark.png" alt="" width={256} height={256} className="size-full [display:var(--icon-dark-display)]" />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted">{copy.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted"><strong className="font-semibold text-foreground">{name}</strong><span aria-hidden="true"> · </span>{copy.body}</p>
        </div>
        <ArrowRight className="size-4 shrink-0 text-muted motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
      </Link>
    </aside>
  );
}
