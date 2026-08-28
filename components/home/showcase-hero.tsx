import { Accented } from "@/components/ui/accent";
import { AppleMark } from "@/components/ui/apple-mark";
import type { Dictionary } from "@/lib/dictionaries/en";

export function ShowcaseHero({ dict }: { dict: Dictionary }) {
  const { title, titleAccent } = dict.home.hero;

  return (
    <section className="mx-auto max-w-4xl px-6 pt-16 pb-14 text-center sm:pt-24 sm:pb-20">
      <h1 className="text-4xl leading-none font-bold tracking-tight text-balance sm:text-7xl motion-safe:enter-1">
        <Accented
          text={title}
          accent={titleAccent}
          className="text-melon-500"
          accentClassName="accent-sweep"
          glyph={
            // The glyph's ink is ~83% of its 24-unit box, with padding baked in
            // on the right and bottom — hence the oversized height and the
            // negative right margin, so it optically matches the cap height.
            <AppleMark className="accent-sweep-glyph mr-[-0.06em] inline-block h-[0.94em] w-auto align-[-0.1em]" />
          }
        />
      </h1>
    </section>
  );
}
