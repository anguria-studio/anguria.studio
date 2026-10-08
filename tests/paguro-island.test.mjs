import test from "node:test";
import assert from "node:assert/strict";
import { islandHeight, foldPlacement, shouldDismiss, dragAppearance, rubberband, releaseVelocity, exitDuration, initialIslandState, islandReducer } from "../lib/paguro-island.ts";

const receive = (state, id) => islandReducer(state, {
  type: "receive", notification: { id, service: "slack", title: `Message ${id}`, message: "Hello" },
});

test("arrivals preview the latest message without expanding the accumulated history", () => {
  let state = initialIslandState;
  for (let id = 1; id <= 8; id++) state = receive(state, id);
  assert.equal(state.phase, "preview");
  assert.deepEqual(state.notifications.map(({ id }) => id), [8, 7, 6, 5, 4, 3, 2, 1]);
  assert.equal(islandReducer(state, { type: "expire", id: 7 }).phase, "preview");
  state = islandReducer(state, { type: "expire", id: 8 });
  assert.equal(state.phase, "collapsed");
  assert.equal(state.notifications.length, 8);
});

test("hover reveals history and the preview timer cannot interrupt browsing", () => {
  let state = islandReducer(receive(initialIslandState, 1), { type: "hover", active: true });
  assert.equal(state.phase, "expanded");
  state = receive(state, 2);
  assert.equal(state.phase, "expanded");
  assert.equal(islandReducer(state, { type: "expire", id: 2 }).phase, "expanded");
  state = islandReducer(state, { type: "hover", active: false });
  state = islandReducer(state, { type: "collapse", latestID: 2 });
  assert.equal(state.phase, "collapsed");
  assert.equal(state.notifications.length, 2);
});

test("sending from outside the island replaces a pending leave with a fresh preview", () => {
  let state = islandReducer(receive(initialIslandState, 1), { type: "hover", active: true });
  state = islandReducer(state, { type: "hover", active: false });
  state = receive(state, 2);
  state = islandReducer(state, { type: "collapse", latestID: 1 });
  state = islandReducer(state, { type: "expire", id: 1 });
  assert.equal(state.phase, "preview");
  assert.equal(state.notifications[0].id, 2);
});

test("keyboard browsing survives arrivals and closes explicitly with history intact", () => {
  let state = islandReducer(receive(initialIslandState, 1), { type: "keyboard-focus", active: true });
  assert.equal(islandReducer(state, { type: "expire", id: 1 }).phase, "preview");
  state = islandReducer(state, { type: "expand" });
  state = receive(state, 2);
  assert.equal(state.phase, "expanded");
  state = islandReducer(state, { type: "collapse" });
  assert.equal(state.phase, "collapsed");
  assert.equal(state.notifications.length, 2);
});

test("dismissing the newest card during a leave does not cancel that collapse", () => {
  let state = receive(receive(initialIslandState, 1), 2);
  state = islandReducer(state, { type: "hover", active: true });
  state = islandReducer(state, { type: "hover", active: false });
  state = islandReducer(state, { type: "remove", ids: [2] });
  state = islandReducer(state, { type: "collapse", latestID: 2 });
  assert.equal(state.phase, "collapsed");
  assert.equal(state.notifications[0].id, 1);
});

test("an empty island stays collapsed and the first arrival after clearing previews normally", () => {
  let state = islandReducer(initialIslandState, { type: "expand" });
  assert.equal(state.phase, "collapsed");
  state = receive(state, 1);
  state = islandReducer(state, { type: "remove", ids: [1] });
  assert.equal(state.phase, "collapsed");
  assert.equal(state.notifications.length, 0);
  state = receive(state, 2);
  state = islandReducer(state, { type: "expire", id: 1 });
  assert.equal(state.phase, "preview");
});

test("panel fits three cards and adds a fixed peek for longer history", () => {
  assert.deepEqual([1, 2, 3, 4, 100].map(islandHeight), [118, 194, 270, 308, 308]);
});

test("fold holds the stop line, reveals two strips, then hides deeper cards", () => {
  const viewport = islandHeight(10) - 8;
  const stop = viewport - 10;
  for (const depth of [0, 0.5, 1, 1.5, 2, 2.5, 3]) {
    const bottom = stop + depth * 76;
    const placement = foldPlacement(bottom, viewport, 10);
    assert.equal(placement.depth, depth);
    assert.equal(bottom + placement.offset, stop + Math.min(1, Math.max(0, depth - 1)) * 8);
    assert.equal(placement.opacity, depth > 2 ? 3 - depth : 1);
  }
  assert.equal(foldPlacement(stop + 500, viewport, 3).depth, 0);
});

test("scroll clearance leaves the final card complete at the stop line", () => {
  const count = 12;
  const viewport = islandHeight(count) - 8;
  const lastBottom = 42 + count * 68 + (count - 1) * 8;
  const maxScroll = lastBottom + 10 - viewport;
  assert.equal(foldPlacement(lastBottom - maxScroll, viewport, count).depth, 0);
});

test("dismiss requires a long or fast rightward drag; clicks and left drags survive", () => {
  assert.equal(shouldDismiss(100, 0, 400), true);
  assert.equal(shouldDismiss(99, 0, 400), false);
  assert.equal(shouldDismiss(9, 400, 400), true);
  assert.equal(shouldDismiss(8, 900, 400), false);
  assert.equal(shouldDismiss(-200, 900, 400), false);
  assert.equal(shouldDismiss(0, 900, 400), false);
  const left = dragAppearance(-100, 400);
  assert.ok(Math.abs(left.offset - -22000 / 455) < 1e-9);
  assert.ok(Math.abs(left.opacity - (1 - 0.6 * 22000 / 455 / 400)) < 1e-9);
  assert.deepEqual(dragAppearance(-100, 400, true), { offset: 0, opacity: 1 });
});

test("the left edge resists progressively instead of following linearly", () => {
  const near = rubberband(-40, 400);
  const far = rubberband(-400, 400);
  assert.ok(near < 0 && far < near);
  // The second 360px of drag buys far less travel than the first 40px ratio.
  assert.ok((far - near) / -360 < near / -40);
  assert.ok(Math.abs(rubberband(-1e9, 400)) < 400);
  assert.equal(rubberband(-100, 0), 0);
});

test("release velocity spans the recent window and ignores stale samples", () => {
  assert.equal(releaseVelocity([]), 0);
  assert.equal(releaseVelocity([{ x: 0, t: 0 }]), 0);
  assert.equal(releaseVelocity([{ x: 0, t: 0 }, { x: 10, t: 10 }, { x: 50, t: 50 }]), 1000);
  // The sample at t=0 is outside the 100ms window before t=200.
  assert.equal(releaseVelocity([{ x: 0, t: 0 }, { x: 100, t: 150 }, { x: 150, t: 200 }]), 1000);
});

test("a thrown card exits at the speed it was thrown, within bounds", () => {
  assert.equal(exitDuration(400, 0), 180);
  assert.equal(exitDuration(300, 3000), 200);
  assert.equal(exitDuration(300, 100000), 120);
  assert.equal(exitDuration(300, 500), 280);
});

test("opening a notification clears its service, preserves other services, and collapses", () => {
  let state = receive(receive(initialIslandState, 1), 2);
  state = islandReducer(state, { type: "receive", notification: { id: 3, service: "gmail", title: "Mail", message: "Hello" } });
  state = islandReducer(state, { type: "hover", active: true });
  state = islandReducer(state, { type: "keyboard-focus", active: true });
  state = islandReducer(state, { type: "open", id: 2 });
  assert.equal(state.phase, "collapsed");
  assert.equal(state.keyboardFocused, false);
  assert.deepEqual(state.notifications.map(({ id }) => id), [3]);
  assert.equal(islandReducer(state, { type: "open", id: 2 }), state);
  state = islandReducer(state, { type: "open", id: 3 });
  assert.equal(state.phase, "collapsed");
  assert.deepEqual(state.notifications, []);
});
