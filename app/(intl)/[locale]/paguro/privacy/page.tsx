import { PaguroPrivacyPage } from "@/components/paguro-privacy-page";
import type { Locale } from "@/lib/i18n";
import { paguroPrivacyMetadata } from "@/lib/metadata";

/**
 * A literal `paguro/` folder beside `[app]/`, so only Paguro gets a policy —
 * `[locale]/[app]/privacy/` would invite `/it/obolo/privacy/`. `/it/paguro/`
 * itself still resolves to `[app]/page.tsx`, since this folder has no page of
 * its own. No generateStaticParams: `locale` comes from the parent layout,
 * which already enumerates the prefixed locales and sets `dynamicParams = false`.
 */
type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return paguroPrivacyMetadata(locale);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <PaguroPrivacyPage locale={locale} />;
}
