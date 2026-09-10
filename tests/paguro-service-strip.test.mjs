import assert from "node:assert/strict";
import test from "node:test";
import { familiarServices, shouldPlayWave, shouldRippleFrom, waveOffset, waveThreshold } from "../lib/paguro-service-strip.ts";

function sighting(overrides = {}) {
  return { played: false, reducedMotion: false, ratio: 1, threshold: waveThreshold, ...overrides };
}

test("the wave waits for most of the strip, then never runs again", () => {
  assert.equal(shouldPlayWave(sighting()), true);
  assert.equal(shouldPlayWave(sighting({ ratio: waveThreshold })), true);
  assert.equal(shouldPlayWave(sighting({ ratio: waveThreshold - 0.01 })), false);
  assert.equal(shouldPlayWave(sighting({ ratio: 0 })), false);
  assert.equal(shouldPlayWave(sighting({ played: true })), false);
  assert.equal(shouldPlayWave(sighting({ reducedMotion: true })), false);
  assert.equal(shouldPlayWave(sighting({ played: true, reducedMotion: true })), false);
});

test("only a resting row with motion allowed answers the pointer", () => {
  assert.equal(shouldRippleFrom({ inFlight: false, reducedMotion: false }), true);
  assert.equal(shouldRippleFrom({ inFlight: true, reducedMotion: false }), false);
  assert.equal(shouldRippleFrom({ inFlight: false, reducedMotion: true }), false);
  assert.equal(shouldRippleFrom({ inFlight: true, reducedMotion: true }), false);
});

test("the ripple counts from its origin and wraps around the row", () => {
  const count = familiarServices.length;
  for (let index = 0; index < count; index += 1) assert.equal(waveOffset(index, 0, count), index);

  assert.equal(waveOffset(3, 3, count), 0);
  assert.equal(waveOffset(7, 3, count), 4);
  assert.equal(waveOffset(0, 3, count), 5);
  assert.equal(waveOffset(2, 3, count), 7);
});

test("every tile plays exactly once whichever one starts the wave", () => {
  const count = familiarServices.length;
  for (let origin = 0; origin < count; origin += 1) {
    const offsets = familiarServices.map((_, index) => waveOffset(index, origin, count));
    assert.deepEqual([...offsets].sort((a, b) => a - b), [...Array(count).keys()]);
  }
});

test("every tile names a service and its artwork", () => {
  assert.equal(familiarServices.length, 8);
  for (const [slug, name] of familiarServices) {
    assert.match(slug, /^[a-z-]+$/);
    assert.ok(name.length > 0);
  }
});
