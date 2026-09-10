/** The services the app ships with, in the order they line up on the page. */
export const familiarServices: readonly (readonly [string, string])[] = [
  ["gmail", "Gmail"], ["chatgpt", "ChatGPT"], ["slack", "Slack"],
  ["notion", "Notion"], ["whatsapp", "WhatsApp"], ["claude", "Claude"],
  ["google-calendar", "Google Calendar"], ["discord", "Discord"],
];

/** At least this much of the strip has to be on screen before the wave runs:
 *  a ripple that starts while half the row is still below the fold is a ripple
 *  nobody sees. */
export const waveThreshold = 0.6;

/**
 * Whether the strip should start its wave. `played` is the once-per-load latch —
 * the wave is an arrival, and a thing cannot arrive twice.
 */
export function shouldPlayWave({ played, reducedMotion, ratio, threshold }: {
  played: boolean;
  reducedMotion: boolean;
  ratio: number;
  threshold: number;
}): boolean {
  if (played || reducedMotion) return false;
  return ratio >= threshold;
}

/**
 * Whether a pointer landing on a tile should launch a wave from it.
 *
 * `inFlight` is the lock that makes a sweep across the row one ripple instead of
 * eight. `reducedMotion` has to be read live at the pointer, not latched at
 * mount: with the animation silenced no `animationend` ever arrives to release
 * the lock, so a wave started under reduced motion would never end.
 */
export function shouldRippleFrom({ inFlight, reducedMotion }: {
  inFlight: boolean;
  reducedMotion: boolean;
}): boolean {
  return !inFlight && !reducedMotion;
}

/**
 * A tile's place in the ripple, counted from whichever tile started it: the
 * origin leads at 0 and the order wraps past the end of the row, so every tile
 * plays exactly once no matter where the wave was launched.
 */
export function waveOffset(index: number, origin: number, count: number): number {
  return (index - origin + count) % count;
}
