import { Fragment } from "react";
import Link from "next/link";
import { splitAccent } from "@/components/ui/accent";
import { site } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries/en";
import { localePath, type Locale } from "@/lib/i18n";
import {
  formatEffectiveDate,
  paguroPrivacyEffective,
  paguroPrivacySections,
  type PaguroPrivacyPolicy,
  type PolicyBlock,
  type PolicyRun,
} from "@/lib/privacy/paguro-policy";

/** One class string per element type. That is the whole reason this page needs
 *  no typography plugin: the renderer owns the four rules a legal document uses. */
const PARAGRAPH = "mt-4 text-base leading-relaxed text-pretty";
const LIST = "mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed";
const EMAIL_LINK =
  "font-medium text-foreground underline decoration-melon-500 underline-offset-4 transition hover:text-melon-500";

function Run({ run }: { run: PolicyRun }) {
  if (typeof run === "string") return <>{run}</>;
  // The address has one source; the policy text never spells it out.
  return (
    <a href={`mailto:${site.email}`} className={EMAIL_LINK}>
      {site.email}
    </a>
  );
}

function Block({ block }: { block: PolicyBlock }) {
  if (typeof block === "string") return <p className={PARAGRAPH}>{block}</p>;

  if (block.kind === "ul") {
    return (
      <ul className={LIST}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <p className={PARAGRAPH}>
      {block.runs.map((run, index) => (
        <Fragment key={index}>
          <Run run={run} />
        </Fragment>
      ))}
    </p>
  );
}

/**
 * The policy document itself. Body text is default foreground rather than
 * `text-muted`: unlike marketing prose this is read end to end, and the muted
 * token is there to rank a page's parts — a legal page has no secondary part.
 */
export function PolicyArticle({
  locale,
  dict,
  policy,
}: {
  locale: Locale;
  dict: Dictionary;
  policy: PaguroPrivacyPolicy;
}) {
  // Same `{placeholder}` split ContactLine uses for `{email}`: each locale puts
  // the date where its own grammar wants it.
  const effective = splitAccent(dict.paguroPrivacy.effective, "{date}");

  return (
    <article className="mx-auto max-w-2xl px-6 pt-10 pb-20 sm:pt-14 sm:pb-32">
      <Link
        href={localePath(locale, "paguro")}
        className="text-sm font-medium text-muted transition hover:text-foreground"
      >
        &larr; {dict.paguroPrivacy.back}
      </Link>

      <h1 className="mt-8 text-3xl font-semibold tracking-tight text-balance sm:mt-10 sm:text-5xl">
        {policy.title}
      </h1>

      <p className="mt-4 text-sm text-muted">
        {effective.before}
        <time dateTime={paguroPrivacyEffective}>
          {formatEffectiveDate(locale)}
        </time>
        {effective.after}
      </p>

      {/* The intro is the lead: one size up from the body. A block that is not a
          plain paragraph falls back to the body renderer rather than nesting a
          <p> inside a <p>. */}
      {policy.intro.map((block, index) =>
        typeof block === "string" ? (
          <p key={index} className="mt-8 text-lg leading-relaxed text-pretty">
            {block}
          </p>
        ) : (
          <Block key={index} block={block} />
        ),
      )}

      {/* Iterating the id list rather than Object.entries: the ids are the
          reading order, and they double as the <h2> anchors, so #contact is the
          same deep link in all four languages. */}
      {paguroPrivacySections.map((id) => {
        const section = policy.sections[id];
        return (
          <section key={id} className="mt-12 sm:mt-16">
            <h2
              id={id}
              className="scroll-mt-24 text-xl font-semibold tracking-tight sm:text-2xl"
            >
              {section.heading}
            </h2>
            {section.blocks.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </section>
        );
      })}
    </article>
  );
}
