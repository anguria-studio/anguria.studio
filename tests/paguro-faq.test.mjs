import assert from "node:assert/strict";
import test from "node:test";
import { arrivals, firstBatch } from "../lib/paguro-faq.ts";

/** The seven rows as the observer reports them when all of them are on screen. */
function allSeen(indices = [0, 1, 2, 3, 4, 5, 6]) {
  return indices.map((index) => ({ index, intersecting: true }));
}

test("a jump to the section cascades all seven rows in order", () => {
  assert.deepEqual(
    arrivals(allSeen(), new Set()),
    [0, 1, 2, 3, 4, 5, 6].map((index) => ({ index, position: index })),
  );
});

test("the cascade follows the list, not the order the observer reported", () => {
  assert.deepEqual(
    arrivals(allSeen([4, 0, 6, 2]), new Set()),
    [{ index: 0, position: 0 }, { index: 2, position: 1 }, { index: 4, position: 2 }, { index: 6, position: 3 }],
  );
});

test("a later batch skips played rows and restarts its positions at 0", () => {
  assert.deepEqual(
    arrivals(allSeen(), new Set([0, 1, 2])),
    [{ index: 3, position: 0 }, { index: 4, position: 1 }, { index: 5, position: 2 }, { index: 6, position: 3 }],
  );
});

test("a slow scroll delivers one row at a time, each with no delay", () => {
  const played = new Set();
  for (const index of [0, 1, 2, 3, 4, 5, 6]) {
    assert.deepEqual(arrivals([{ index, intersecting: true }], played), [{ index, position: 0 }]);
    played.add(index);
  }
});

test("rows leaving the viewport are ignored", () => {
  assert.deepEqual(arrivals([{ index: 0, intersecting: false }, { index: 1, intersecting: false }], new Set()), []);
  assert.deepEqual(
    arrivals([{ index: 0, intersecting: false }, { index: 1, intersecting: true }], new Set()),
    [{ index: 1, position: 0 }],
  );
});

test("a played row never arrives twice", () => {
  const played = new Set([3]);
  assert.deepEqual(arrivals([{ index: 3, intersecting: true }], played), []);
  assert.equal(arrivals(allSeen(), played).some(({ index }) => index === 3), false);
});

test("the opening report splits the rows on screen from the ones still below", () => {
  const { arriving, pending } = firstBatch([
    { index: 0, intersecting: true },
    { index: 1, intersecting: true },
    { index: 2, intersecting: false },
    { index: 3, intersecting: false },
    { index: 4, intersecting: false },
  ]);
  // Rows already in the band arrive in this very callback, so they never spend
  // a frame hidden — a reload part-way down the page must not blink.
  assert.deepEqual(arriving, [{ index: 0, position: 0 }, { index: 1, position: 1 }]);
  assert.deepEqual(pending, [2, 3, 4]);
});

test("the opening report holds every row when the list is entirely below the fold", () => {
  const { arriving, pending } = firstBatch([0, 1, 2, 3, 4, 5, 6].map((index) => ({ index, intersecting: false })));
  assert.deepEqual(arriving, []);
  assert.deepEqual(pending, [0, 1, 2, 3, 4, 5, 6]);
});

test("a pending row arrives alone at position 0, with no delay inherited", () => {
  const { pending } = firstBatch([0, 1].map((index) => ({ index, intersecting: false })));
  assert.deepEqual(pending, [0, 1]);
  // The rows above it already played; this one still starts immediately.
  assert.deepEqual(arrivals([{ index: 1, intersecting: true }], new Set([0])), [{ index: 1, position: 0 }]);
});
