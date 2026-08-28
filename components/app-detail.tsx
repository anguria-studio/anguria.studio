import Link from "next/link";
import { AppIcon } from "./app-icon";
import type { AppMeta } from "@/lib/apps";
import type { AppCopy, Dictionary } from "@/lib/dictionaries/en";
import { localePath, type Locale } from "@/lib/i18n";

export function AppDetail({
  locale,
  meta,
  copy,
  dict,
}: {
  locale: Locale;
  meta: AppMeta;
  copy: AppCopy;
  dict: Dictionary;
}) {
  return (
    <>
      {/* Own container so the back link lines up with the feature grid below,
          not with the narrower prose column. */}
      <div className="mx-auto max-w-page px-6 pt-10 sm:pt-14">
        <Link
          href={localePath(locale)}
          className="text-[13px] font-medium text-muted transition hover:text-foreground"
        >
          &larr; {dict.appPage.back}
        </Link>
      </div>

      <section className="mx-auto max-w-3xl px-6 pb-14 sm:pb-20">
        <div className="mt-8 flex flex-col items-center text-center sm:mt-10">
          <AppIcon meta={meta} size="lg" />
          <h1 className="mt-7 text-4xl font-semibold tracking-tight sm:text-6xl">
            {copy.name}
          </h1>
          <p className="mt-3 text-lg text-muted text-pretty sm:text-xl">
            {copy.tagline}
          </p>
          <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-pretty">
            {copy.description}
          </p>

          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={meta.download}
              className="rounded-full bg-melon-500 px-6 py-2.5 text-[15px] font-medium text-white transition hover:bg-melon-600"
            >
              {dict.appPage.download}
            </a>
            <a
              href={meta.github}
              target="_blank"
              rel="noreferrer"
              className="text-[15px] font-medium text-muted transition hover:text-foreground"
            >
              {dict.appPage.viewSource}
            </a>
          </div>

          <p className="mt-4 text-[13px] text-muted">
            {dict.appPage.requirements.replace("{version}", meta.minMacOS)}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-page px-6">
        <h2 className="sr-only">{dict.appPage.featuresHeading}</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {copy.features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-card border border-hairline bg-surface p-6"
            >
              <h3 className="text-[15px] font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-[15px] text-muted text-pretty">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
