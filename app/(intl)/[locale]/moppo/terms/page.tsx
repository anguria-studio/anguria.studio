import { MoppoTermsPage } from "@/components/moppo-legal-page";
import type { Locale } from "@/lib/i18n";
import { moppoTermsMetadata } from "@/lib/metadata";

/** The parent layout supplies the three prefixed locales for static export. */
type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  return moppoTermsMetadata((await params).locale);
}

export default async function Page({ params }: Props) {
  return <MoppoTermsPage locale={(await params).locale} />;
}
