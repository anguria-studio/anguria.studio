import { Accented } from "@/components/ui/accent";
import type { Dictionary } from "@/lib/dictionaries/en";

export function Statement({ dict }: { dict: Dictionary }) {
  const { line1, line2, accent } = dict.home.statement;

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
      <p className="text-2xl font-semibold tracking-tight text-balance sm:text-4xl">
        {line1}
        <br />
        <Accented text={line2} accent={accent} className="text-melon-500" />
      </p>
    </section>
  );
}
