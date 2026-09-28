import Link from "next/link";
import { PaguroHero } from "@/components/apps/paguro-hero";
import { ContactLine } from "@/components/layout/contact-line";
import { localePath, type Locale } from "@/lib/i18n";
import { FEATURE_ICONS } from "@/components/home/feature-icons";
import { PaguroActions } from "@/components/apps/paguro-actions";
import { PaguroFaq } from "@/components/apps/paguro-faq";
import { PaguroServiceStrip } from "@/components/apps/paguro-service-strip";
import { apps, paguroPrivacyPath } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries/en";

// Balance the visible artwork inside the shared 32px slot. These viewBoxes
// are specific to this grid; the larger homepage glyphs keep their own sizing.
const featureIcons = [
  {
    viewBox: "-2 -2 28 28",
    node: (
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 4.8A6 6 0 0 1 18 10v3l2 3M6 6.5A6 6 0 0 0 6 10v4l-2 3h13M10 21h4M3 3l18 18" />
      </g>
    ),
  },
  { ...FEATURE_ICONS.custom, viewBox: "23 28 64 64" },
  FEATURE_ICONS.privacy,
  { ...FEATURE_ICONS.source, viewBox: "-3 -3.2 22 22" },
];
// Workspaces, quiet hours, app lock, privacy. Copy and icons share dictionary
// indices so the reading order stays consistent across locales and screen sizes.
const featureOrder = [1, 0, 2, 3] as const;
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
    <header className="header-divide sticky top-0 z-50 border-b bg-header backdrop-blur-xl backdrop-saturate-150">
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
    </header>
  );
}

export function PaguroDetail({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const copy = dict.paguroPage;
  // Keep the full system requirements in the FAQ as well as the short hero note.
  const faq = [
    ...copy.faq,
    { question: copy.requirementsQuestion, answer: copy.requirements },
  ];

  return (
    <>
      <PaguroHero copy={dict.paguroHero} page={copy} locale={locale} />

      <section id="features" className="relative z-10 mx-auto max-w-cards scroll-mt-24 px-6 pt-16 pb-20 sm:pt-24 sm:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-4xl">{copy.story.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted text-pretty">{copy.story.body}</p>
        </div>

        {/* Shared title/body rows keep descriptions aligned when translations wrap. */}
        <ul className="mx-auto mt-12 grid max-w-4xl gap-x-12 gap-y-2 sm:mt-14 md:grid-cols-2">
          {featureOrder.map((index) => {
            const feature = copy.story.features[index];
            const icon = featureIcons[index];
            // Same two-layer hover as the homepage grid: this file owns the
            // shared lift/scale/accent on the svg box, each icon's own gesture
            // keys off group/feature from inside. None of these icons is
            // `glass`, so all take the accent shift.
            return (
              <li key={feature.title} className="group/feature row-span-2 grid grid-cols-[2rem_minmax(0,1fr)] grid-rows-subgrid gap-x-3 border-t border-hairline py-6">
                <svg viewBox={icon.viewBox} aria-hidden="true" className="size-8 self-start fill-current motion-safe:transition motion-safe:duration-300 motion-safe:group-hover/feature:-translate-y-1 motion-safe:group-hover/feature:scale-105 transition-colors group-hover/feature:text-melon-500">{icon.node}</svg>
                <h3 className="self-start pt-0.5 text-xl leading-snug font-semibold tracking-tight text-balance">{feature.title}</h3>
                <p className="col-start-2 text-base leading-relaxed text-muted text-pretty">{feature.body}</p>
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
