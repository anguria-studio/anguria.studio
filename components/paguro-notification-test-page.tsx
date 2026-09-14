import { PaguroNotificationTest } from "@/components/apps/paguro-notification-test";
import { PaguroCapabilityTests } from "@/components/apps/paguro-capability-tests";
import { getDictionary, type Locale } from "@/lib/i18n";

export async function PaguroNotificationTestPage({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const copy = dict.paguroNotificationTest;
  return (
    <main className="mx-auto max-w-3xl px-6 pt-10 pb-20 sm:pt-14 sm:pb-32">
      <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{copy.title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-pretty">{copy.intro}</p>
      <PaguroNotificationTest copy={copy} />
      <section className="mt-12" aria-labelledby="try-heading">
        <h2 id="try-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">{copy.tryHeading}</h2>
        <dl className="mt-6 space-y-6">
          {copy.checks.map(({ title, body }) => <div key={title}><dt className="text-base font-semibold">{title}</dt><dd className="mt-2 text-base leading-relaxed text-muted">{body}</dd></div>)}
        </dl>
      </section>
      <PaguroCapabilityTests copy={copy} />
      <p className="mt-10 border-t border-hairline pt-6 text-sm leading-relaxed text-muted">{copy.scope}</p>
    </main>
  );
}
