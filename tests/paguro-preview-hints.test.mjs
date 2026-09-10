import assert from "node:assert/strict";
import test from "node:test";
import { createPreviewHintHistory, nextPreviewHint, dockHintPointer } from "../lib/paguro-preview-hints.ts";
import { dockTransforms, railServices } from "../lib/paguro-service-preview.ts";

function conditions(overrides = {}) {
  return { layout: "sidebar", history: createPreviewHintHistory(), toggleVisible: true, dockVisible: true, pageVisible: true, reducedMotion: false, keyboardActive: false, ...overrides };
}

test("hints need a visible page, their own visible controls, and permission to animate", () => {
  assert.equal(nextPreviewHint(conditions()), "toggle");
  assert.equal(nextPreviewHint(conditions({ layout: "compact" })), "dock");
  for (const layout of ["sidebar", "compact"]) {
    for (const override of [{ pageVisible: false }, { reducedMotion: true }, { keyboardActive: true }, { toggleVisible: false, dockVisible: false }]) {
      assert.equal(nextPreviewHint(conditions({ layout, ...override })), null);
    }
  }
  assert.equal(nextPreviewHint(conditions({ dockVisible: false })), "toggle");
  assert.equal(nextPreviewHint(conditions({ layout: "compact", dockVisible: false })), null);
});

test("exploring one control retires only its own hint", () => {
  const history = createPreviewHintHistory();
  history.toggleUsed = true;
  assert.equal(nextPreviewHint(conditions({ history })), null);
  assert.equal(nextPreviewHint(conditions({ history, layout: "compact" })), "dock");
  history.dockUsed = true;
  assert.equal(nextPreviewHint(conditions({ history, layout: "compact" })), null);

  const dockOnly = { toggleUsed: false, dockUsed: true };
  assert.equal(nextPreviewHint(conditions({ history: dockOnly })), "toggle");
  assert.equal(nextPreviewHint(conditions({ history: dockOnly, layout: "compact" })), null);
});

test("the dock demonstration visits every icon from top to bottom and settles at rest", () => {
  const first = railServices[0].compactY;
  const last = railServices.at(-1).compactY;
  const peakSizes = railServices.map(() => 0);
  let previous = -Infinity;
  for (let step = 0; step <= 1000; step++) {
    const y = dockHintPointer(step / 1000, first, last);
    assert.ok(y >= previous);
    previous = y;
    dockTransforms(y).forEach(({ scale }, index) => { peakSizes[index] = Math.max(peakSizes[index], scale * 22); });
  }
  assert.ok(peakSizes.every(size => size > 34.99));
  for (const progress of [0, 1]) {
    assert.ok(dockTransforms(dockHintPointer(progress, first, last)).every(({ scale, offset }) => scale === 1 && offset === 0));
  }
});
