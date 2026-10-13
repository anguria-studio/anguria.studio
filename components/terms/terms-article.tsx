import { Fragment } from "react";
import Link from "next/link";
import { splitAccent } from "@/components/ui/accent";
import { apps, moppoPrivacyPath, paguroPrivacyPath, site } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries/en";
import { localePath, type Locale } from "@/lib/i18n";
import {
  formatTermsUpdated,
  paguroTermsSections,
  paguroTermsUpdated,
  type TermsDocument,
  type TermsRun,
} from "@/lib/terms/paguro-terms";

const LINK = "font-medium text-foreground underline decoration-melon-500 underline-offset-4 transition hover:text-melon-500";

function Run({ run, locale, app }: { run: TermsRun; locale: Locale; app: "paguro" | "moppo" }) {
  if (typeof run === "string") return <>{run}</>;
  if (run.kind === "privacy") {
    return <Link href={localePath(locale, app === "moppo" ? moppoPrivacyPath : paguroPrivacyPath)} className={LINK}>{run.text}</Link>;
  }
  if (run.kind === "license") {
    return <a href={`${apps[app].github}/blob/main/LICENSE`} className={LINK}>{run.text}</a>;
  }
  return <a href={`mailto:${site.email}`} className={LINK}>{site.email}</a>;
}

/** Match the privacy document's width, spacing and typography. */
export function TermsArticle({
  locale,
  dict,
  terms,
  app = "paguro",
  updatedDate = paguroTermsUpdated,
  sectionIds = paguroTermsSections,
}: {
  locale: Locale;
  dict: Dictionary;
  terms: TermsDocument;
  app?: "paguro" | "moppo";
  updatedDate?: string;
  sectionIds?: readonly string[];
}) {
  const copy = app === "moppo" ? dict.moppoTerms : dict.paguroTerms;
  const back = app === "moppo" ? dict.moppoPrivacy.back : dict.paguroPrivacy.back;
  const updated = splitAccent(copy.updated, "{date}");

  return (
    <article className="mx-auto max-w-2xl px-6 pt-10 pb-20 sm:pt-14 sm:pb-32">
      <Link
        href={localePath(locale, app)}
        className="text-sm font-medium text-muted transition hover:text-foreground"
      >
        &larr; {back}
      </Link>

      <h1 className="mt-8 text-3xl font-semibold tracking-tight text-balance sm:mt-10 sm:text-5xl">
        {terms.title}
      </h1>

      <p className="mt-4 text-sm text-muted">
        {updated.before}
        <time dateTime={updatedDate}>{formatTermsUpdated(locale, updatedDate)}</time>
        {updated.after}
      </p>

      {sectionIds.map((id) => {
        const section = terms.sections[id];
        return (
          <section key={id} className="mt-12 sm:mt-16">
            <h2 id={id} className="scroll-mt-24 text-xl font-semibold tracking-tight sm:text-2xl">
              {section.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty">
              {section.paragraph.map((run, index) => (
                <Fragment key={index}><Run run={run} locale={locale} app={app} /></Fragment>
              ))}
            </p>
          </section>
        );
      })}
    </article>
  );
}
