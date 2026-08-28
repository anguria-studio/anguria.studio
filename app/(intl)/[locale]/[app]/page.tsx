import { notFound } from "next/navigation";
import { AppPage } from "@/components/app-page";
import { appSlugs, type AppSlug } from "@/lib/apps";
import type { Locale } from "@/lib/i18n";
import { appMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale; app: string }> };

/** `locale` is supplied by the parent layout's generateStaticParams. */
export function generateStaticParams() {
  return appSlugs.map((app) => ({ app }));
}

function assertSlug(app: string): AppSlug {
  if (!(appSlugs as readonly string[]).includes(app)) notFound();
  return app as AppSlug;
}

export async function generateMetadata({ params }: Props) {
  const { locale, app } = await params;
  return appMetadata(locale, assertSlug(app));
}

export default async function Page({ params }: Props) {
  const { locale, app } = await params;
  return <AppPage locale={locale} slug={assertSlug(app)} />;
}
