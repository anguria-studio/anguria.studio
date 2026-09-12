import { PaguroNotificationTestPage } from "@/components/paguro-notification-test-page";
import type { Locale } from "@/lib/i18n";
import { paguroNotificationTestMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  return paguroNotificationTestMetadata((await params).locale);
}

export default async function Page({ params }: Props) {
  return <PaguroNotificationTestPage locale={(await params).locale} />;
}
