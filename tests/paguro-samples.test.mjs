import test from "node:test";
import assert from "node:assert/strict";
import { createSampleDecks, drawSample } from "../lib/paguro-samples.ts";
import { dictionary as en } from "../lib/dictionaries/en.ts";
import { dictionary as it } from "../lib/dictionaries/it.ts";
import { dictionary as es } from "../lib/dictionaries/es.ts";
import { dictionary as fr } from "../lib/dictionaries/fr.ts";

/** A small deterministic generator, so a failing shuffle is reproducible. */
function seeded(seed) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function deal(times, count, random, start = createSampleDecks().slack) {
  let deck = start;
  const drawn = [];
  for (let i = 0; i < times; i++) {
    const result = drawSample(deck, count, random);
    deck = result.deck;
    drawn.push(result.index);
  }
  return { deck, drawn };
}

test("a full bag deals every sample exactly once", () => {
  const { drawn } = deal(12, 12, seeded(7));
  assert.deepEqual([...drawn].sort((a, b) => a - b), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
});

test("two bags are two whole permutations with no repeat across the seam", () => {
  const { drawn } = deal(24, 12, seeded(1234));
  const each = (slice) => assert.deepEqual([...slice].sort((a, b) => a - b), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  each(drawn.slice(0, 12));
  each(drawn.slice(12));
  for (let i = 1; i < drawn.length; i++) assert.notEqual(drawn[i], drawn[i - 1], `repeat at draw ${i}`);
});

test("a degenerate random still cannot open a bag on the previous card", () => {
  const zero = () => 0;
  // With `zero` the shuffle is fixed, so we know which index a fresh bag would
  // open on — seed `last` with it to force the seam case the swap exists for.
  const opener = drawSample({ order: [], position: 0, last: null }, 12, zero).index;
  const { drawn } = deal(24, 12, zero, { order: [], position: 0, last: opener });
  assert.notEqual(drawn[0], opener);
  assert.deepEqual([...drawn.slice(0, 12)].sort((a, b) => a - b), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  for (let i = 1; i < drawn.length; i++) assert.notEqual(drawn[i], drawn[i - 1], `repeat at draw ${i}`);
});

test("drawing never mutates the deck it was handed", () => {
  const deck = { order: [], position: 0, last: null };
  const first = drawSample(deck, 12, seeded(42));
  assert.deepEqual(deck, { order: [], position: 0, last: null });
  const snapshot = { order: [...first.deck.order], position: first.deck.position, last: first.deck.last };
  drawSample(first.deck, 12, seeded(99));
  assert.deepEqual(first.deck, snapshot);
});

test("every locale carries twelve usable samples per service", () => {
  for (const [locale, dictionary] of Object.entries({ en, it, es, fr })) {
    const { samples } = dictionary.paguroHero;
    assert.deepEqual(Object.keys(samples), ["slack", "whatsapp", "gmail"], locale);
    for (const [service, entries] of Object.entries(samples)) {
      assert.equal(entries.length, 12, `${locale}.${service}`);
      for (const [index, { title, message }] of entries.entries()) {
        assert.equal(typeof title, "string", `${locale}.${service}[${index}].title`);
        assert.equal(typeof message, "string", `${locale}.${service}[${index}].message`);
        assert.ok(title.trim().length > 0, `${locale}.${service}[${index}].title is empty`);
        assert.ok(message.trim().length > 0, `${locale}.${service}[${index}].message is empty`);
      }
    }
  }
});
