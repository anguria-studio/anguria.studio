import Image from "next/image";
import Link from "next/link";
import { AlsoFromStudio } from "@/components/apps/also-from-studio";
import { AppActions, MobileGitHubLink } from "@/components/apps/app-actions";
import { DesktopMenuBar } from "@/components/apps/desktop-menu-bar";
import { PaguroFaq } from "@/components/apps/paguro-faq";
import { ContactLine } from "@/components/layout/contact-line";
import { apps } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries/en";
import { localePath, type Locale } from "@/lib/i18n";
import styles from "./obolo-detail.module.css";

const featureIcons: Record<string, React.ReactNode> = {
  spending: <><path d="M3 4v16h18M8 15v-3m5 3V8m5 7V5" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18m-12 5 2 2 4-4" /></>,
  history: <><path d="M3 12a9 9 0 1 1 2.6 6.4M3 6v6h6m3-5v5l3 2" /></>,
  currencies: <path d="M4 8h16l-4-4M20 16H4l4 4" />,
};

export function OboloHeader({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const copy = dict.apps.obolo;

  return (
    <header className={`${styles.page} header-divide sticky top-0 z-50 border-b bg-header backdrop-blur-xl backdrop-saturate-150`}>
      <nav aria-label={copy.nav} className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-6 motion-safe:fade-1">
        <Link href="#obolo" className="inline-flex shrink-0 items-center gap-2 rounded-lg text-base font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500">
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
          <div className={styles.backdrop}>
            <DesktopMenuBar appName={copy.name} locale={locale} />
            <Image src="/obolo/dashboard-light.webp" width={1280} height={1280} alt={copy.shotAlt} className={`${styles.screenshot} [display:var(--icon-light-display)]`} />
            <Image src="/obolo/dashboard-dark.webp" width={1280} height={1280} alt={copy.shotAlt} className={`${styles.screenshot} [display:var(--icon-dark-display)]`} />
          </div>
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
