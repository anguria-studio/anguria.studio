import { PaguroTermsPage } from "@/components/paguro-terms-page";
import type { Locale } from "@/lib/i18n";
import { paguroTermsMetadata } from "@/lib/metadata";

/** The parent layout supplies the three prefixed locales for static export. */
type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return paguroTermsMetadata(locale);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <PaguroTermsPage locale={locale} />;
}
