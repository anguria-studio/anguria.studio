import { OboloPrivacyPage } from "@/components/obolo-privacy-page";
import type { Locale } from "@/lib/i18n";
import { oboloPrivacyMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  return oboloPrivacyMetadata((await params).locale);
}

export default async function Page({ params }: Props) {
  return <OboloPrivacyPage locale={(await params).locale} />;
}
