import { PaguroNotificationTestPage } from "@/components/paguro-notification-test-page";
import { paguroNotificationTestMetadata } from "@/lib/metadata";

export const generateMetadata = () => paguroNotificationTestMetadata("en");

export default function Page() {
  return <PaguroNotificationTestPage locale="en" />;
}
