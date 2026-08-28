import type { ReactNode } from "react";

/**
 * Splits a line around its accent phrase. Each locale names its own accent, so
 * this stays a plain string match rather than an index into the sentence.
 */
export function splitAccent(text: string, accent: string) {
  const at = accent ? text.indexOf(accent) : -1;
  if (at === -1) return { before: text, match: "", after: "" };
  return {
    before: text.slice(0, at),
    match: accent,
    after: text.slice(at + accent.length),
  };
}

export function Accented({
  text,
  accent,
  className,
  glyph,
  accentClassName,
}: {
  text: string;
  accent: string;
  className: string;
  glyph?: ReactNode;
  /**
   * Applied to a span wrapping the accent TEXT alone, excluding the glyph.
   * Exists for `background-clip: text`, which needs an element whose only
   * content is text: an inline SVG is a replaced element, and clipping on the
   * outer span would force `color: transparent` onto the glyph's
   * `fill: currentColor` and erase it. Omitted, the markup is unchanged.
   */
  accentClassName?: string;
}) {
  const { before, match, after } = splitAccent(text, accent);
  if (!match) return <>{text}</>;
  return (
    <>
      {before}
      <span className={className}>
        {glyph}
        {accentClassName ? <span className={accentClassName}>{match}</span> : match}
      </span>
      {after}
    </>
  );
}
