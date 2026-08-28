// Superseded by showcase-hero.tsx. Kept so the old homepage is one import away.
import type { Dictionary } from "@/lib/dictionaries/en";

/**
 * Highlights the dictionary's `titleAccent` word inside the title. Each locale
 * picks its own accent word, so this stays a plain string match.
 */
function accentuate(title: string, accent: string) {
  const at = accent ? title.indexOf(accent) : -1;
  if (at === -1) return title;
  return (
    <>
      {title.slice(0, at)}
      <span className="text-melon-500">{accent}</span>
      {title.slice(at + accent.length)}
    </>
  );
}

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-20 pb-14 text-center sm:pt-32 sm:pb-20">
      <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
        {accentuate(dict.hero.title, dict.hero.titleAccent)}
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-muted text-pretty sm:mt-7 sm:text-xl">
        {dict.hero.subtitle}
      </p>
    </section>
  );
}
