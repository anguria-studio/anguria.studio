import { OboloTermsPage } from "@/components/obolo-legal-page";
import type { Locale } from "@/lib/i18n";
import { oboloTermsMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  return oboloTermsMetadata((await params).locale);
}

export default async function Page({ params }: Props) {
  return <OboloTermsPage locale={(await params).locale} />;
}
