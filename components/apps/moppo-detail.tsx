import Link from "next/link";
import { PaguroActions } from "@/components/apps/paguro-actions";
import { PaguroFaq } from "@/components/apps/paguro-faq";
import { MenuClock } from "@/components/apps/paguro-menu-bar";
import desktopStyles from "@/components/apps/paguro-desktop.module.css";
import { MoppoMascot } from "@/components/apps/moppo-mascot";
import { ContactLine } from "@/components/layout/contact-line";
import { ArrowRight } from "@/components/ui/arrow-right";
import { AppleMark } from "@/components/ui/apple-mark";
import { GitHubMark } from "@/components/ui/github-mark";
import { apps, moppoPrivacyPath, moppoTermsPath } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries/en";
import { localePath, type Locale } from "@/lib/i18n";
import styles from "./moppo-detail.module.css";

type Glyph = "shield" | "trash" | "duplicates" | "privacy" | "git" | "lock" | "history";

function Glyph({ name, className = "" }: { name: Glyph; className?: string }) {
  const paths: Record<Glyph, React.ReactNode> = {
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></>,
    trash: <><path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7" /></>,
    duplicates: <><rect x="8" y="8" width="13" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
    privacy: <><circle cx="12" cy="12" r="9" /><path d="m6 6 12 12" /></>,
    git: <><circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M6 7v10M18 7a7 7 0 0 1-7 7H6" /></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    history: <><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 2" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>{paths[name]}</svg>;
}

export function MoppoIcon({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`block shrink-0 ${className}`}>
    {/* Native artwork from Moppo's AppIcon.icon. The rendered dark export
        includes Icon Composer's lighting and beveled edge. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/moppo/app-icon-light.svg" alt="" width={256} height={256} className="size-full [display:var(--icon-light-display)]" />
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/moppo/app-icon-dark.png" alt="" width={256} height={256} className="size-full [display:var(--icon-dark-display)]" />
  </span>;
}

export function MoppoHeader({ dict, locale, subpage = false }: { dict: Dictionary; locale: Locale; subpage?: boolean }) {
  const copy = dict.moppoPage;
  return <header className="header-divide sticky top-0 z-50 border-b bg-header backdrop-blur-xl backdrop-saturate-150">
    <nav aria-label={copy.nav} className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-6 motion-safe:fade-1">
      <Link href={subpage ? localePath(locale, "moppo") : "#moppo"} className="inline-flex items-center gap-2 rounded-lg text-base font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D99A00]">
        <MoppoIcon className="size-[30px]" />{dict.apps.moppo.name}
      </Link>
      <div className="hidden sm:block">
        <PaguroActions copy={{ ...copy, appStore: "" }} meta={apps.moppo} location="header" className="[&>a]:h-8 [&>a]:text-xs [&>a:first-child]:order-2" />
      </div>
      <a href={apps.moppo.github} aria-label={copy.github} data-analytics-event="source-click" data-analytics-label="moppo" data-analytics-location="header" target="_blank" rel="noreferrer" className="rounded-full bg-foreground/5 p-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D99A00] sm:hidden">
        <GitHubMark className="size-4" />
      </a>
    </nav>
  </header>;
}

function ThemeScreenshot({ name, alt, priority = false, className = "" }: { name: "cleanup" | "worktree"; alt: string; priority?: boolean; className?: string }) {
  const dimensions = name === "cleanup" ? { width: 2156, height: 1436 } : { width: 1024, height: 1280 };
  return <div className={className}>
    {(["light", "dark"] as const).map((theme) => {
      const themeDisplay = theme === "light" ? "[display:var(--icon-light-display)]" : "[display:var(--icon-dark-display)]";
      // Both images follow the shared CSS theme tokens, including system mode.
      // eslint-disable-next-line @next/next/no-img-element
      const screenshot = <img src={`/moppo/${name}-${theme}.webp`} alt={alt} {...dimensions} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" className={styles.screenshot} />;
      return name === "worktree" ? <div key={theme} className={`${styles.dialogFrame} ${themeDisplay}`}>
        {/* Crop the transparent export margins so the frame has even padding. */}
        <div className={`${styles.dialogCrop} ${theme === "light" ? styles.dialogLight : styles.dialogDark}`}>{screenshot}</div>
      </div> : <div key={theme} className={themeDisplay}>{screenshot}</div>;
    })}
  </div>;
}

const featureGlyphs: Glyph[] = ["shield", "trash", "duplicates", "privacy"];
const reviewGlyphs: Glyph[] = ["git", "lock", "history"];

export function MoppoDetail({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const copy = dict.moppoPage;
  return <div className={styles.page}>
    <section id="moppo" data-analytics-location="hero" className={`${styles.hero} scroll-mt-24`}>
      <div className={styles.heading}>
        <h1 className="text-display-sm font-semibold md:text-display motion-safe:enter-1">{copy.hero.title}<br /><span className={styles.accent}>{copy.hero.accent}</span></h1>
        <p className={`${styles.subtitle} motion-safe:enter-2`}>{copy.hero.body}</p>
        <PaguroActions copy={{ ...copy, download: copy.hero.download, appStore: "" }} meta={apps.moppo} location="hero" showGithub={false} showDownloadOnMobile className="mt-8 justify-center motion-safe:enter-2" />
        <p className="mt-3 text-sm text-muted motion-safe:enter-2">{copy.requirements.replace("{version}", apps.moppo.minMacOS.replace(/\.0$/, ""))}</p>
      </div>
      <div className={`${styles.demo} motion-safe:enter-3`}>
        <div className={styles.desktop}>
          <div className={`${desktopStyles.menuBar} ${styles.menuBar}`}>
            <div className={desktopStyles.appMenus} aria-hidden="true"><AppleMark className="size-4" /><strong>{dict.apps.moppo.name}</strong></div>
            <div className={desktopStyles.statusItems}><MenuClock locale={locale} /></div>
          </div>
          <ThemeScreenshot name="cleanup" alt={copy.hero.shotAlt} priority className={styles.appFrame} />
        </div>
      </div>
    </section>

    <section id="features" className="mx-auto max-w-cards scroll-mt-24 px-6 pt-16 pb-20 sm:pt-24 sm:pb-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className={styles.sectionTitle}>{copy.story.title}</h2>
        <p className={styles.sectionBody}>{copy.story.body}</p>
      </div>
      <ul className="mx-auto mt-12 grid max-w-4xl gap-x-12 gap-y-2 sm:mt-14 md:grid-cols-2">
        {copy.story.features.map((feature, index) => <li key={feature.title} className="group/feature row-span-2 grid grid-cols-[2rem_minmax(0,1fr)] grid-rows-subgrid gap-x-3 border-t border-hairline py-6">
          <Glyph name={featureGlyphs[index]} className="size-7 self-start motion-safe:transition motion-safe:duration-300 motion-safe:group-hover/feature:-translate-y-1 group-hover/feature:text-[#D99A00]" />
          <h3 className="self-start text-xl leading-snug font-semibold tracking-tight text-balance">{feature.title}</h3>
          <p className="col-start-2 text-base leading-relaxed text-muted text-pretty">{feature.body}</p>
        </li>)}
      </ul>
    </section>

    <section id="careful" className="mx-auto max-w-cards scroll-mt-24 px-6 pb-20 sm:pb-32">
      <div className="mx-auto max-w-3xl text-center">
        <MoppoMascot className={styles.mascot} />
        <h2 className={styles.sectionTitle}>{copy.review.title}</h2>
        <p className={styles.sectionBody}>{copy.review.body}</p>
      </div>
      <div className={styles.reviewGrid}>
        <ThemeScreenshot name="worktree" alt={copy.review.shotAlt} className={styles.dialog} />
        <ul className={styles.reviewPoints}>
          {copy.review.points.map((point, index) => <li key={point.title} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3 border-t border-hairline py-7 first:border-t-0">
            <Glyph name={reviewGlyphs[index]} className="mt-0.5 size-6" />
            <div><h3 className="text-lg font-semibold tracking-tight">{point.title}</h3><p className="mt-2 text-base leading-relaxed text-muted text-pretty">{point.body}</p></div>
          </li>)}
        </ul>
      </div>
    </section>

    <section id="questions" className="mx-auto max-w-3xl scroll-mt-24 px-6 pb-20 sm:pb-32">
      <h2 className="mb-10 text-center text-xl font-semibold tracking-tight sm:text-3xl">{copy.faqTitle}</h2>
      <PaguroFaq faq={copy.faq} />
    </section>

    <aside data-analytics-location="also-from-studio" className="mx-auto max-w-3xl px-6 pb-16 sm:pb-20">
      <Link href={localePath(locale, "paguro")} className={`${styles.also} group`}>
        <span aria-hidden="true" className="size-12 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/paguro/app-icon-light.png" alt="" width={256} height={256} className="size-full [display:var(--icon-light-display)]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/paguro/app-icon-dark.png" alt="" width={256} height={256} className="size-full [display:var(--icon-dark-display)]" />
        </span>
        <div className="min-w-0 flex-1"><p className="text-xs text-muted">{copy.also.label}</p><p className="mt-1 text-sm leading-relaxed text-muted"><strong className="font-semibold text-foreground">Paguro</strong><span aria-hidden="true"> · </span>{copy.also.body}</p></div>
        <ArrowRight className="size-4 shrink-0 text-muted motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
      </Link>
    </aside>
    <ContactLine dict={dict} issuesUrl={`${apps.moppo.github}/issues`} />
  </div>;
}

export function MoppoFooterNote({ dict, locale, privacyLink = true, termsLink = true }: { dict: Dictionary; locale: Locale; privacyLink?: boolean; termsLink?: boolean }) {
  const link = "underline decoration-hairline underline-offset-4 transition hover:text-foreground";
  return <><p>{dict.moppoPage.footerNote}</p><p>{dict.footer.copyright}
    {privacyLink && <><span aria-hidden="true"> · </span><Link href={localePath(locale, moppoPrivacyPath)} className={link}>{dict.moppoPrivacy.link}</Link></>}
    {termsLink && <><span aria-hidden="true"> · </span><Link href={localePath(locale, moppoTermsPath)} className={link}>{dict.moppoTerms.link}</Link></>}
  </p></>;
}
