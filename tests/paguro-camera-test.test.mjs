import test from "node:test";
import assert from "node:assert/strict";
import { createCameraTestRunner } from "../lib/paguro-camera-test.ts";

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function camera() {
  const track = Object.assign(new EventTarget(), {
    readyState: "live",
    stops: 0,
    stop() { this.stops++; this.readyState = "ended"; },
  });
  return { track, stream: { getTracks: () => [track], getVideoTracks: () => [track] } };
}

function fixture(t, overrides = {}) {
  const states = [], previews = [];
  const { track, stream } = camera();
  let requests = 0, clears = 0;
  const runner = createCameraTestRunner({
    requestStream: async () => { requests++; return stream; },
    showPreview: async (value) => { previews.push(value); },
    clearPreview: () => { clears++; },
    onChange: (state) => states.push(state),
    ...overrides,
  });
  t.after(() => runner.dispose());
  return { runner, states, previews, track, stream, requests: () => requests, clears: () => clears };
}

test("the camera is off on load; starting twice opens one stream; Stop releases it", async (t) => {
  const f = fixture(t);
  assert.equal(f.requests(), 0);
  await Promise.all([f.runner.start(), f.runner.start()]);
  assert.equal(f.requests(), 1);
  assert.deepEqual(f.states, ["requesting", "active"]);
  f.runner.stop();
  assert.equal(f.track.stops, 1);
  assert.equal(f.clears(), 1);
  assert.equal(f.states.at(-1), "stopped");
});

test("permission granted after cancellation stops the late camera without showing it", async (t) => {
  const pending = deferred();
  const f = fixture(t, { requestStream: () => pending.promise });
  const start = f.runner.start();
  f.runner.stop();
  pending.resolve(f.stream);
  await start;
  assert.equal(f.track.stops, 1);
  assert.equal(f.previews.length, 0);
  assert.deepEqual(f.states, ["requesting", "stopped"]);
});

test("a stale permission reply cannot replace or stop a newer preview", async (t) => {
  const pending = deferred(), fresh = camera();
  let calls = 0;
  const f = fixture(t, { requestStream: () => ++calls === 1 ? pending.promise : Promise.resolve(fresh.stream) });
  const first = f.runner.start();
  f.runner.stop();
  await f.runner.start();
  pending.resolve(f.stream);
  await first;
  assert.equal(f.track.stops, 1);
  assert.equal(fresh.track.stops, 0);
  assert.deepEqual(f.previews, [fresh.stream]);
  assert.equal(f.states.at(-1), "active");
});

test("stopping while video playback starts cannot report the camera as active later", async (t) => {
  const playback = deferred();
  const f = fixture(t, { showPreview: () => playback.promise });
  const start = f.runner.start();
  await Promise.resolve();
  f.runner.stop();
  playback.resolve();
  await start;
  assert.equal(f.track.stops, 1);
  assert.deepEqual(f.states, ["requesting", "stopped"]);
});

test("playback failure releases the camera and does not report success", async (t) => {
  const f = fixture(t, { showPreview: async () => { throw new Error("Playback failed"); } });
  await f.runner.start();
  assert.equal(f.track.stops, 1);
  assert.equal(f.clears(), 1);
  assert.deepEqual(f.states, ["requesting", "error"]);
});

test("revocation or disconnection ends the preview", async (t) => {
  const f = fixture(t);
  await f.runner.start();
  f.track.dispatchEvent(new Event("ended"));
  assert.equal(f.track.stops, 1);
  assert.equal(f.states.at(-1), "stopped");
  const updates = f.states.length;
  f.track.dispatchEvent(new Event("ended"));
  assert.equal(f.states.length, updates);
});

test("disposal releases active capture and ignores future starts", async (t) => {
  const f = fixture(t);
  await f.runner.start();
  f.runner.dispose();
  assert.equal(f.track.stops, 1);
  const updates = f.states.length;
  await f.runner.start();
  assert.equal(f.requests(), 1);
  assert.equal(f.states.length, updates);
});

test("permission granted after unmount is released without a state update", async (t) => {
  const pending = deferred();
  const f = fixture(t, { requestStream: () => pending.promise });
  const start = f.runner.start();
  f.runner.dispose();
  pending.resolve(f.stream);
  await start;
  assert.equal(f.track.stops, 1);
  assert.equal(f.previews.length, 0);
  assert.deepEqual(f.states, ["requesting"]);
});

test("missing camera support, denied permission, and unavailable hardware have distinct outcomes", async (t) => {
  const unsupported = fixture(t, { requestStream: undefined });
  await unsupported.runner.start();
  assert.deepEqual(unsupported.states, ["unsupported"]);
  for (const [name, expected] of [["NotAllowedError", "denied"], ["SecurityError", "denied"], ["NotFoundError", "unavailable"], ["NotReadableError", "unavailable"]]) {
    const f = fixture(t, { requestStream: async () => { throw new DOMException("Failed", name); } });
    await f.runner.start();
    assert.equal(f.states.at(-1), expected);
    assert.equal(f.previews.length, 0);
  }
});

test("a stream without a live video track is released", async (t) => {
  const f = fixture(t);
  f.track.readyState = "ended";
  await f.runner.start();
  assert.equal(f.track.stops, 1);
  assert.equal(f.previews.length, 0);
  assert.equal(f.states.at(-1), "unavailable");
});
