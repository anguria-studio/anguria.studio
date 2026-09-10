import Link from "next/link";
import { PaguroHero } from "@/components/apps/paguro-hero";
import { ContactLine } from "@/components/layout/contact-line";
import { localePath, type Locale } from "@/lib/i18n";
import { FEATURE_ICONS } from "@/components/home/feature-icons";
import { PaguroActions } from "@/components/apps/paguro-actions";
import { PaguroServiceStrip } from "@/components/apps/paguro-service-strip";
import { apps } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { FeatureId } from "@/lib/features";

const featureIcons: FeatureId[] = ["custom", "privacy", "source"];
const linkStyle = "rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500";

export function PaguroHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <header className="header-divide sticky top-0 z-50 border-b bg-header backdrop-blur-xl backdrop-saturate-150">
      <nav aria-label={dict.paguroPage.nav} className="mx-auto flex h-20 max-w-page items-center justify-between gap-4 px-6">
        <a href="#paguro" className={`inline-flex items-center gap-2 rounded-lg text-2xl font-bold tracking-tight ${linkStyle}`}>
          <span aria-hidden="true" className="size-9 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/paguro/app-icon-light.png" alt="" width={256} height={256} className="size-full [display:var(--icon-light-display)]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/paguro/app-icon-dark.png" alt="" width={256} height={256} className="size-full [display:var(--icon-dark-display)]" />
          </span>
          {dict.apps.paguro.name}
        </a>
        <div className="flex items-center gap-4 text-sm font-medium sm:gap-6">
          <Link href={localePath(locale)} className={`inline-flex items-center gap-2 text-muted transition hover:text-foreground ${linkStyle}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mark.png" alt="" width={24} height={24} className="size-6" />
            <span className="hidden sm:inline">{dict.paguroHero.back}</span>
            <span className="sr-only sm:hidden">{dict.paguroHero.back}</span>
          </Link>
          {/* No pills on a phone: two h-11 pills plus the wordmark and the back
              link do not fit that header, and below desk the hero carries the
              pair anyway. The wrapper owns the display so it cannot race the
              hardcoded `flex` inside PaguroActions. */}
          <div className="hidden sm:block">
            <PaguroActions copy={dict.paguroPage} meta={apps.paguro} />
          </div>
        </div>
      </nav>
    </header>
  );
}

export function PaguroDetail({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const copy = dict.paguroPage;
  // The system requirements read as one more question, so they join the
  // translated list instead of sitting under it as a stray line.
  const faq = [
    ...copy.faq,
    { question: copy.requirementsQuestion, answer: copy.requirements },
  ];

  return (
    <>
      <PaguroHero copy={dict.paguroHero} page={copy} locale={locale} />

      <section id="features" className="mx-auto max-w-cards scroll-mt-24 px-6 pt-16 pb-20 sm:pt-24 sm:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-4xl">{copy.story.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted text-pretty">{copy.story.body}</p>
        </div>

        <ul className="mt-16 grid gap-10 sm:mt-20 md:grid-cols-3">
          {copy.story.features.map((feature, index) => {
            const icon = FEATURE_ICONS[featureIcons[index]];
            // Same two-layer hover as the homepage grid: this file owns the
            // shared lift/scale/accent on the svg box, each icon's own gesture
            // keys off group/feature from inside. None of these three is
            // `glass`, so all take the accent shift.
            return (
              <li key={feature.title} className="group/feature border-t border-hairline pt-8">
                <svg viewBox={icon.viewBox} aria-hidden="true" className="mb-6 size-8 fill-current motion-safe:transition motion-safe:duration-300 motion-safe:group-hover/feature:-translate-y-1 motion-safe:group-hover/feature:scale-105 transition-colors group-hover/feature:text-melon-500">{icon.node}</svg>
                <h3 className="text-2xl font-semibold tracking-tight text-balance">{feature.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted text-pretty">{feature.body}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-24 text-center sm:mt-40">
          <h2 className="text-xl font-semibold tracking-tight text-balance sm:text-3xl">{copy.story.services}</h2>
          <PaguroServiceStrip />
          <p className="mt-6 text-base text-muted">{copy.story.serviceNote}</p>
        </div>
      </section>

      <section id="questions" className="mx-auto max-w-3xl scroll-mt-24 px-6 pb-20 sm:pb-32">
        <h2 className="mb-10 text-center text-xl font-semibold tracking-tight sm:text-3xl">{copy.faqTitle}</h2>
        <div className="border-t border-hairline">
          {faq.map((item) => <details key={item.question} className="faq-item group border-b border-hairline">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500">
              {item.question}<span aria-hidden="true" className="shrink-0 text-2xl font-normal text-muted group-open:rotate-45 motion-safe:transition-transform">+</span>
            </summary>
            <p className="pb-6 pr-6 text-base leading-relaxed text-muted">{item.answer}</p>
          </details>)}
        </div>
      </section>

      <ContactLine dict={dict} />
    </>
  );
}

/** Paguro is a fork, and says so. Lives here rather than in the footer because
 *  the footer is generic; app-page.tsx passes this in for this one slug. */
export function PaguroCredit({ dict }: { dict: Dictionary }) {
  return (
    <a
      href="https://github.com/nicojan/Chorus"
      target="_blank"
      rel="noreferrer"
      className="underline decoration-hairline underline-offset-4 transition hover:text-foreground"
    >
      {dict.paguroPage.credits}
    </a>
  );
}
