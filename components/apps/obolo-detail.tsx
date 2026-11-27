import Image from "next/image";
import Link from "next/link";
import { AlsoFromStudio } from "@/components/apps/also-from-studio";
import { AppActions, MobileGitHubLink } from "@/components/apps/app-actions";
import { DesktopMenuBar } from "@/components/apps/desktop-menu-bar";
import { HeroShots } from "@/components/apps/hero-shots";
import { PaguroFaq } from "@/components/apps/paguro-faq";
import { ContactLine } from "@/components/layout/contact-line";
import { apps, oboloPrivacyPath, oboloTermsPath } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries/en";
import { localePath, type Locale } from "@/lib/i18n";
import styles from "./obolo-detail.module.css";

const featureIcons: Record<string, React.ReactNode> = {
  spending: <><path d="M3 4v16h18M8 15v-3m5 3V8m5 7V5" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18m-12 5 2 2 4-4" /></>,
  history: <><path d="M3 12a9 9 0 1 1 2.6 6.4M3 6v6h6m3-5v5l3 2" /></>,
  currencies: <path d="M4 8h16l-4-4M20 16H4l4 4" />,
};

type OboloShotId = keyof Dictionary["apps"]["obolo"]["hero"]["shots"];
const heroShots: readonly { id: OboloShotId; icon: React.ReactNode; desktopOnly?: boolean }[] = [
  { id: "dashboard", icon: <path d="m12 2 10 6-10 6L2 8l10-6ZM2 12l10 6 10-6M2 16l10 6 10-6" /> },
  { id: "months", icon: featureIcons.spending },
  { id: "subscriptions", icon: <path d="M12 2v10h10a10 10 0 1 1-10-10Zm4 1a10 10 0 0 1 5 5h-5V3Z" /> },
  { id: "calendar", icon: featureIcons.calendar },
  { id: "detail", icon: <path d="M6 3h9l3 3v15H6zM9 10h6m-6 4h6m-6 4h3" /> },
  { id: "list", icon: <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />, desktopOnly: true },
];

export function OboloHeader({ dict, locale, subpage = false }: { dict: Dictionary; locale: Locale; subpage?: boolean }) {
  const copy = dict.apps.obolo;

  return (
    <header className={`${styles.page} header-divide sticky top-0 z-50 border-b bg-header backdrop-blur-xl backdrop-saturate-150`}>
      <nav aria-label={copy.nav} className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-6 motion-safe:fade-1">
        <Link href={subpage ? localePath(locale, "obolo") : "#obolo"} className="inline-flex shrink-0 items-center gap-2 rounded-lg text-base font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500">
          <Image src="/obolo/app-icon.svg" width={30} height={30} alt="" />
          {copy.name}
        </Link>
        <div className="flex items-center gap-4">
          <Link href={localePath(locale)} data-analytics-label="home" className="shrink-0 rounded-full text-xs font-medium text-muted transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500">
            {dict.nav.allApps}
          </Link>
          <div className="hidden sm:block">
            <AppActions copy={{ download: copy.download, github: dict.nav.github }} meta={apps.obolo} location="header" className="[&>a:first-child]:order-2" />
          </div>
          <MobileGitHubLink meta={apps.obolo} label={dict.nav.github} />
        </div>
      </nav>
    </header>
  );
}

export function OboloFooterNote({ dict, locale, privacyLink = true, termsLink = true }: {
  dict: Dictionary;
  locale: Locale;
  privacyLink?: boolean;
  termsLink?: boolean;
}) {
  const link = "underline decoration-hairline underline-offset-4 transition hover:text-foreground";
  return (
    <p>
      {dict.footer.copyright}
      {privacyLink && (
        <>
          <span aria-hidden="true"> · </span>
          <Link href={localePath(locale, oboloPrivacyPath)} className={link}>{dict.apps.obolo.privacy.link}</Link>
        </>
      )}
      {termsLink && (
        <>
          <span aria-hidden="true"> · </span>
          <Link href={localePath(locale, oboloTermsPath)} className={link}>{dict.apps.obolo.terms.link}</Link>
        </>
      )}
    </p>
  );
}

export function OboloDetail({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const copy = dict.apps.obolo;

  return (
    <div className={styles.page}>
      <section id="obolo" aria-labelledby="obolo-title" data-analytics-location="hero" className="scroll-mt-24">
        <div className={styles.heading}>
          <h1 id="obolo-title" className="text-display-sm font-semibold md:text-display motion-safe:enter-1">
            {copy.hero.title}<br /><span className={styles.accent}>{copy.hero.accent}</span>
          </h1>
          <p className={`${styles.subtitle} motion-safe:enter-2`}>{copy.hero.body}</p>
          <div className="mt-8 motion-safe:enter-2">
            <AppActions copy={{ download: copy.hero.download, github: dict.nav.github }} meta={apps.obolo} location="hero" showGithub={false} showDownloadOnMobile className="justify-center" />
            <p className="mt-3 text-sm text-muted">{copy.requirements.replace("{version}", apps.obolo.minMacOS)}</p>
          </div>
        </div>
        <div className={`${styles.demo} showcase-width motion-safe:enter-3`}>
          <HeroShots
            app="obolo"
            label={copy.hero.shotsLabel}
            shots={heroShots.map(({ id, icon, desktopOnly }) => ({
              id,
              src: `/obolo/${id}`,
              desktopOnly,
              ...copy.hero.shots[id],
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {icon}
                </svg>
              ),
            }))}
            width={1280}
            height={1280}
            desktopClassName={styles.backdrop}
            frameClassName={styles.appFrame}
          >
            <DesktopMenuBar appName={copy.name} locale={locale} />
          </HeroShots>
        </div>
      </section>

      <section aria-labelledby="obolo-features" className="mx-auto max-w-cards px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="obolo-features" className={styles.sectionTitle}>{copy.story.title}</h2>
          <p className={styles.sectionBody}>{copy.story.body}</p>
        </div>
        <ul className="mx-auto mt-10 grid max-w-4xl gap-x-12 md:grid-cols-2">
          {copy.features.map(({ id, title, body }) => (
            <li key={id} className="grid grid-cols-[2rem_minmax(0,1fr)] content-start gap-x-3 gap-y-1 border-t border-hairline py-6">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 size-6 text-foreground">
                {featureIcons[id]}
              </svg>
              <h3 className="text-xl leading-snug font-semibold tracking-tight">{title}</h3>
              <p className="col-start-2 text-base leading-relaxed text-muted text-pretty">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="obolo-faq" className="mx-auto max-w-3xl px-6 pb-20 sm:pb-28">
        <h2 id="obolo-faq" className="mb-10 text-center text-xl font-semibold tracking-tight sm:text-3xl">{copy.faqTitle}</h2>
        <PaguroFaq faq={copy.faq} />
      </section>

      <AlsoFromStudio locale={locale} cards={[
        { app: "paguro", name: dict.apps.paguro.name, copy: { label: copy.related.label, body: copy.related.paguro } },
        { app: "moppo", name: dict.apps.moppo.name, copy: { label: copy.related.label, body: copy.related.moppo } },
      ]} />
      <ContactLine dict={dict} issuesUrl={`${apps.obolo.github}/issues`} />
    </div>
  );
}
