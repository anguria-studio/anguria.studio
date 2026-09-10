import type { DemoService } from "./paguro-island";

/**
 * A shuffle bag, not `Math.random()` on every click.
 *
 * Plain random draws feel wrong in a demo: the same card comes back two or
 * three times in a row and half the copy is never seen. Dealing from a shuffled
 * bag instead gives every sample exactly one turn before any of them repeats,
 * and the boundary between two bags is patched so a message can never follow
 * itself. Full coverage, no doubles, still unpredictable.
 */
export type SampleDeck = {
  /** The shuffled indices for the current bag. Empty until the first draw. */
  order: number[];
  /** How far through `order` we have dealt. */
  position: number;
  /** The last index dealt, so a new bag never opens on a repeat. */
  last: number | null;
};

export function createSampleDecks(): Record<DemoService, SampleDeck> {
  return {
    slack: { order: [], position: 0, last: null },
    whatsapp: { order: [], position: 0, last: null },
    gmail: { order: [], position: 0, last: null },
  };
}

function shuffled(count: number, last: number | null, random: () => number): number[] {
  const order = Array.from({ length: count }, (_, index) => index);
  for (let i = count - 1; i > 0; i--) {
    const j = Math.min(i, Math.floor(random() * (i + 1)));
    [order[i], order[j]] = [order[j], order[i]];
  }
  // The bag itself never repeats, but its first card can match the last card of
  // the previous bag. Trade it with a later one so the seam reads as random too.
  if (count > 1 && order[0] === last) {
    const swap = Math.min(count - 1, 1 + Math.floor(random() * (count - 1)));
    [order[0], order[swap]] = [order[swap], order[0]];
  }
  return order;
}

/** Deals the next sample index. Pure: the input deck is never mutated. */
export function drawSample(
  deck: SampleDeck,
  count: number,
  random: () => number = Math.random,
): { deck: SampleDeck; index: number } {
  const exhausted = deck.position >= deck.order.length || deck.order.length !== count;
  const order = exhausted ? shuffled(count, deck.last, random) : deck.order;
  const position = exhausted ? 0 : deck.position;
  const index = order[position];
  return { deck: { order, position: position + 1, last: index }, index };
}
