import assert from "node:assert/strict";
import test from "node:test";
import { existsSync } from "node:fs";
import { dockTransforms, hasServicePreview, previewServices, serviceCapture, railDividerY, railServices } from "../lib/paguro-service-preview.ts";

test("every selectable service has both themes and layouts on disk", () => {
  for (const service of previewServices) {
    assert.ok(railServices.some(({ id }) => id === service));
    for (const theme of ["dark", "light"]) for (const layout of ["sidebar", "compact"]) {
      assert.ok(existsSync(new URL(`../public${serviceCapture(service, layout, theme)}`, import.meta.url)));
    }
  }
  assert.equal(hasServicePreview("slack"), true);
  assert.equal(hasServicePreview("notion"), true);
  assert.equal(hasServicePreview("unknown"), false);
});

test("leaving the dock restores the photographed rail's resting geometry", () => {
  for (const pointer of [null, NaN, Infinity, -Infinity]) {
    for (const transform of dockTransforms(pointer)) {
      assert.equal(transform.scale, 1);
      assert.equal(transform.offset, 0);
    }
  }
});

test("magnification stays within native sizes and keeps every neighbor clear", () => {
  for (let pointer = railServices[0].compactY - 60; pointer <= railServices.at(-1).compactY + 60; pointer += 0.5) {
    const transforms = dockTransforms(pointer);
    transforms.forEach(({ scale, offset }, index) => {
      assert.ok(scale >= 1 && scale <= 35 / 22);
      if (index === 0) return;
      const previous = transforms[index - 1];
      const previousBottom = railServices[index - 1].compactY + previous.offset + 11 * previous.scale;
      const top = railServices[index].compactY + offset - 11 * scale;
      assert.ok(top - previousBottom >= 22 - 1e-10);
    });
  }
});

test("top alignment stays fixed during magnification and the workspace divider follows its group", () => {
  const restingTop = railServices[0].compactY - 11;
  for (let pointer = 150; pointer <= 520; pointer += 0.5) {
    const transforms = dockTransforms(pointer);
    const top = railServices[0].compactY + transforms[0].offset - 11 * transforms[0].scale;
    assert.ok(Math.abs(top - restingTop) < 1e-10);
    assert.ok(transforms.every(({ offset }) => offset >= 0));

    const personal = transforms[3];
    const work = transforms[4];
    const divider = railDividerY + personal.offset + 11 * (personal.scale - 1);
    const personalBottom = railServices[3].compactY + personal.offset + 11 * personal.scale;
    const workTop = railServices[4].compactY + work.offset - 11 * work.scale;
    assert.ok(Math.abs(divider - personalBottom - (workTop - divider)) < 1e-10);
  }
});

test("crossing an icon center does not step the magnification", () => {
  for (const service of railServices) {
    const before = dockTransforms(service.compactY - 0.01);
    const after = dockTransforms(service.compactY + 0.01);
    before.forEach((value, index) => {
      assert.ok(Math.abs(value.scale - after[index].scale) < 0.001);
      assert.ok(Math.abs(value.offset - after[index].offset) < 0.01);
    });
  }
});
