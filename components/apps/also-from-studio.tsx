import Image from "next/image";
import Link from "next/link";
import { MoppoIcon } from "@/components/apps/moppo-icon";
import { ArrowRight } from "@/components/ui/arrow-right";
import type { AppSlug } from "@/lib/apps";
import { localePath, type Locale } from "@/lib/i18n";
import styles from "./also-from-studio.module.css";

type RelatedAppCard = {
  app: AppSlug;
  name: string;
  copy: { label: string; body: string };
};

function RelatedAppIcon({ app }: { app: RelatedAppCard["app"] }) {
  switch (app) {
    case "moppo":
      return <MoppoIcon className="size-12" />;
    case "obolo":
      return <Image src="/obolo/app-icon.svg" width={48} height={48} alt="" className="size-12 shrink-0" />;
    case "paguro":
      return (
        <span aria-hidden="true" className="size-12 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/paguro/app-icon-light.png" alt="" width={256} height={256} className="size-full [display:var(--icon-light-display)]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/paguro/app-icon-dark.png" alt="" width={256} height={256} className="size-full [display:var(--icon-dark-display)]" />
        </span>
      );
  }
}

export function AlsoFromStudio({ locale, cards }: { locale: Locale; cards: readonly RelatedAppCard[] }) {
  return (
    <aside data-analytics-location="also-from-studio" className="mx-auto grid max-w-3xl gap-3 px-6 pb-16 sm:pb-20">
      {cards.map(({ app, name, copy }) => (
        <Link key={app} href={localePath(locale, app)} className={`${styles.card} group`}>
          <RelatedAppIcon app={app} />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted">{copy.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted"><strong className="font-semibold text-foreground">{name}</strong><span aria-hidden="true"> · </span>{copy.body}</p>
          </div>
          <ArrowRight className="size-4 shrink-0 text-muted motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
        </Link>
      ))}
    </aside>
  );
}
