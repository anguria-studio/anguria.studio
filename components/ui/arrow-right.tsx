/**
 * Right arrow on the same native 16-unit box as the GitHub mark. Stroked rather
 * than filled: at 16px a 2-unit round-capped stroke matches the weight of the
 * semibold label beside it, where a filled arrowhead reads as a glyph borrowed
 * from another family. `stroke-current` so it inherits the pill's text colour.
 */
export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`stroke-current ${className}`}
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
