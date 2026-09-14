import Link from "next/link";
import { ScrollHeader } from "@/components/layout/scroll-header";
import { PaguroHero } from "@/components/apps/paguro-hero";
import { ContactLine } from "@/components/layout/contact-line";
import { localePath, type Locale } from "@/lib/i18n";
import { FEATURE_ICONS } from "@/components/home/feature-icons";
import { PaguroActions } from "@/components/apps/paguro-actions";
import { PaguroFaq } from "@/components/apps/paguro-faq";
import { PaguroServiceStrip } from "@/components/apps/paguro-service-strip";
import { apps, paguroPrivacyPath } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { FeatureId } from "@/lib/features";

const featureIcons: FeatureId[] = ["custom", "privacy", "source"];
const linkStyle = "rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500";

export function PaguroHeader({
  locale,
  dict,
  subpage = false,
}: {
  locale: Locale;
  dict: Dictionary;
  /** True on a page below /paguro (the privacy policy). The wordmark then
   *  links up to the app page instead of to a hero that is not there. Nothing
   *  else changes: the pills stay, so the header reads the same on every
   *  Paguro page. */
  subpage?: boolean;
}) {
  const wordmark = `inline-flex items-center gap-2 rounded-lg text-base font-semibold tracking-tight ${linkStyle}`;
  const icon = (
    <span aria-hidden="true" className="size-[30px] shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/paguro/app-icon-light.png" alt="" width={256} height={256} className="size-full [display:var(--icon-light-display)]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/paguro/app-icon-dark.png" alt="" width={256} height={256} className="size-full [display:var(--icon-dark-display)]" />
    </span>
  );
  return (
    <ScrollHeader className="header-divide sticky top-0 z-50 border-b bg-header backdrop-blur-xl backdrop-saturate-150">
      {/* The header's load animation sits on this inner row, not on <header>,
          because header-divide owns that element's animation — and it is an even
          fade on the hero title's beat rather than a rise of its own, for the
          reasons spelled out in components/layout/header.tsx. */}
      <nav aria-label={dict.paguroPage.nav} className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-6 motion-safe:fade-1">
        {subpage ? (
          <Link href={localePath(locale, "paguro")} className={wordmark}>
            {icon}
            {dict.apps.paguro.name}
          </Link>
        ) : (
          <a href="#paguro" className={wordmark}>
            {icon}
            {dict.apps.paguro.name}
          </a>
        )}
        {/* No "All apps" link while `/` redirects to this page (see
            vercel.json): it would only bounce the visitor straight back here.
            It returns with the redirects' removal. No pills on a phone: compact
            pills beside the wordmark do not fit that header. On the app page
            the hero carries them below the subtitle; on the privacy subpage the
            wordmark leads to that hero. The wrapper owns the display so it
            cannot race the hardcoded `flex` inside PaguroActions. */}
        <div className="hidden sm:block">
          <PaguroActions copy={dict.paguroPage} meta={apps.paguro} className="[&>a]:h-8 [&>a]:text-xs [&>a:first-child]:order-2" />
        </div>
      </nav>
    </ScrollHeader>
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
        <PaguroFaq faq={faq} />
      </section>

      <ContactLine dict={dict} issuesUrl={`${apps.paguro.github}/issues`} />
    </>
  );
}

/** Paguro is a fork, and says so; its copyright and its privacy policy share the
 *  second row because the footer is generic and this is the only app that has
 *  either. The policy page itself passes `privacyLink={false}`: a footer link to
 *  the page it is on would go nowhere, so there the second row is the copyright
 *  alone. Two rows on both pages: the footer is where the fine print lives. */
export function PaguroFooterNote({
  dict,
  locale,
  privacyLink = true,
}: {
  dict: Dictionary;
  locale: Locale;
  privacyLink?: boolean;
}) {
  const link = "underline decoration-hairline underline-offset-4 transition hover:text-foreground";
  return (
    <>
      <p>
        <a href="https://github.com/nicojan/Chorus" target="_blank" rel="noreferrer" className={link}>{dict.paguroPage.credits}</a>
      </p>
      <p>
        {dict.footer.copyright}
        {privacyLink ? (
          <>
            <span aria-hidden="true"> · </span>
            <Link href={localePath(locale, paguroPrivacyPath)} className={link}>{dict.paguroPrivacy.link}</Link>
          </>
        ) : null}
      </p>
    </>
  );
}
