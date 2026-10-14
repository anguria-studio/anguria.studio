import { Accented } from "@/components/ui/accent";
import { AppleMark } from "@/components/ui/apple-mark";
import type { Dictionary } from "@/lib/dictionaries/en";

export function ShowcaseHero({ dict }: { dict: Dictionary }) {
  const { title, titleAccent } = dict.home.hero;

  return (
    <section className="mx-auto max-w-[1000px] px-6 pt-8 pb-8 text-center md:pt-10 md:pb-12">
      <h1 className="mx-auto max-w-[36rem] text-[clamp(2rem,9vw,3rem)] leading-[1.1] font-semibold text-balance md:tracking-[-0.025em]">
        <Accented
          text={title}
          accent={titleAccent}
          className="whitespace-nowrap text-melon-500"
          glyph={<AppleMark className="mr-[-0.06em] inline-block h-[0.94em] w-auto align-[-0.1em]" />}
        />
      </h1>
    </section>
  );
}
