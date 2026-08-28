import { HomePage } from "@/components/home-page";
import type { Locale } from "@/lib/i18n";
import { homeMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return homeMetadata(locale);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <HomePage locale={locale} />;
}
