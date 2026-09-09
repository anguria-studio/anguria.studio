import Link from "next/link";
import { PaguroHero } from "@/components/apps/paguro-hero";
import { ContactLine } from "@/components/layout/contact-line";
import { localePath, type Locale } from "@/lib/i18n";
import { FEATURE_ICONS } from "@/components/home/feature-icons";
import { PaguroActions } from "@/components/apps/paguro-actions";
import { ArrowRight } from "@/components/ui/arrow-right";
import { apps } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { FeatureId } from "@/lib/features";

const featureIcons: FeatureId[] = ["custom", "privacy", "source"];
const familiarServices = [
  ["gmail", "Gmail"], ["chatgpt", "ChatGPT"], ["slack", "Slack"],
  ["notion", "Notion"], ["whatsapp", "WhatsApp"], ["claude", "Claude"],
  ["google-calendar", "Google Calendar"], ["discord", "Discord"],
];
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
          {/* Secondary pill hides below sm: two h-11 pills plus the wordmark
              and the back link do not fit a phone header, and the primary
              action is the one that must survive. */}
          <PaguroActions copy={dict.paguroPage} meta={apps.paguro} secondaryClassName="hidden sm:inline-flex" />
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

      <section id="features" className="mx-auto max-w-cards scroll-mt-24 px-6 pt-6 pb-20 sm:pt-10 sm:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-4xl">{copy.story.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted text-pretty">{copy.story.body}</p>
        </div>

        <ul className="mt-14 grid gap-10 md:grid-cols-3">
          {copy.story.features.map((feature, index) => {
            const icon = FEATURE_ICONS[featureIcons[index]];
            return (
              <li key={feature.title} className="border-t border-hairline pt-8">
                {index === 2 ? <ArrowRight className="mb-6 size-8" /> : <svg viewBox={icon.viewBox} aria-hidden="true" className="mb-6 size-8 fill-current">{icon.node}</svg>}
                <h3 className="text-2xl font-semibold tracking-tight text-balance">{feature.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted text-pretty">{feature.body}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-20 text-center sm:mt-28">
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-4xl">{copy.story.services}</h2>
          <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-5 sm:gap-7">
            {familiarServices.map(([slug, name]) => (
              <li key={slug} title={name} className="flex size-14 items-center justify-center rounded-2xl border border-hairline bg-white sm:size-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/paguro/services/${slug}.svg`} alt={name} width={40} height={40} loading="lazy" className={`size-8 sm:size-10 ${slug === "chatgpt" ? "invert" : ""}`} />
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base text-muted">{copy.story.serviceNote}</p>
          <p className="mt-3 text-sm text-muted">{copy.story.trademarks}</p>
        </div>
      </section>

      <section id="questions" className="mx-auto max-w-3xl scroll-mt-24 px-6 pb-20 sm:pb-28">
        <h2 className="mb-10 text-center text-2xl font-semibold tracking-tight sm:text-4xl">{copy.faqTitle}</h2>
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
