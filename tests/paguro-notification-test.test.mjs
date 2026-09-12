import test from "node:test";
import assert from "node:assert/strict";
import { createNotificationTestRunner, notificationTestTitle } from "../lib/paguro-notification-test.ts";
import { dictionary as enDictionary } from "../lib/dictionaries/en.ts";
import { dictionary as itDictionary } from "../lib/dictionaries/it.ts";
import { dictionary as frDictionary } from "../lib/dictionaries/fr.ts";
import { dictionary as esDictionary } from "../lib/dictionaries/es.ts";

const [en, it, fr, es] = [enDictionary, itDictionary, frDictionary, esDictionary].map((dict) => dict.paguroNotificationTest);

function fixture(t, overrides = {}) {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const requests = [];
  const states = [];
  let id = 0;
  const runner = createNotificationTestRunner({
    api: {
      permission: () => "granted",
      requestPermission: async () => "granted",
      notify: (sample, tag) => requests.push({ ...sample, tag }),
      ...overrides,
    },
    onChange: (state) => states.push(state),
    runID: () => String(++id),
  });
  t.after(() => runner.dispose());
  return { runner, requests, states, status: () => states.at(-1)?.status };
}

test("nothing starts on load; a sequence starts immediately and stays three seconds apart", async (t) => {
  const { runner, requests, status } = fixture(t);
  t.mock.timers.tick(30_000);
  assert.equal(requests.length, 0);
  await runner.start("sequence", en.samples);
  assert.equal(requests.length, 1);
  assert.equal(status(), "scheduled");
  for (let i = 2; i <= 6; i++) {
    t.mock.timers.tick(2_999);
    assert.equal(requests.length, i - 1);
    t.mock.timers.tick(1);
    assert.equal(requests.length, i);
  }
  assert.equal(status(), "complete");
  assert.equal(new Set(requests.map((r) => r.title)).size, 6);
  assert.equal(new Set(requests.map((r) => r.tag)).size, 6);
  t.mock.timers.tick(30_000);
  assert.equal(requests.length, 6);
});

test("a single notification is immediate and schedules no later notifications", async (t) => {
  const { runner, requests, states, status } = fixture(t);
  await runner.start("single", en.samples);
  assert.equal(requests.length, 1);
  assert.equal(states.at(-1).unread, 1);
  assert.equal(status(), "complete");
  t.mock.timers.tick(30_000);
  assert.equal(requests.length, 1);
});

test("granting permission starts delivery without an additional delay", async (t) => {
  let grant;
  const { runner, requests, status } = fixture(t, {
    permission: () => "default",
    requestPermission: () => new Promise((resolve) => { grant = resolve; }),
  });
  const start = runner.start("single", en.samples);
  t.mock.timers.tick(30_000);
  assert.equal(requests.length, 0);
  grant("granted");
  await start;
  assert.equal(requests.length, 1);
  assert.equal(status(), "complete");
});

test("cancel keeps requested history, cancels the rest, and permits a fresh run", async (t) => {
  const { runner, requests, states, status } = fixture(t);
  await runner.start("sequence", en.samples);
  runner.cancel();
  assert.equal(status(), "cancelled");
  assert.equal(states.at(-1).requested.length, 1);
  t.mock.timers.tick(30_000);
  assert.equal(requests.length, 1);
  await runner.start("single", en.samples);
  assert.equal(status(), "complete");
  assert.equal(requests.length, 2);
  assert.notEqual(requests[0].tag, requests[1].tag);
});

test("a late permission response cannot revive a cancelled test", async (t) => {
  let grant;
  const { runner, requests, status } = fixture(t, {
    permission: () => "default",
    requestPermission: () => new Promise((resolve) => { grant = resolve; }),
  });
  const start = runner.start("sequence", en.samples);
  assert.equal(status(), "requesting");
  runner.cancel();
  grant("granted");
  await start;
  t.mock.timers.tick(30_000);
  assert.equal(status(), "cancelled");
  assert.equal(requests.length, 0);
});

test("denied permission sends nothing", async (t) => {
  const { runner, requests, status } = fixture(t, { permission: () => "denied" });
  await runner.start("single", en.samples);
  t.mock.timers.tick(30_000);
  assert.equal(status(), "denied");
  assert.equal(requests.length, 0);
});

test("missing browser API is handled without a permission request", async () => {
  const states = [];
  const runner = createNotificationTestRunner({ onChange: (s) => states.push(s) });
  await runner.start("single", en.samples);
  assert.equal(states.at(-1).status, "unsupported");
  runner.dispose();
});

test("an API failure stops remaining requests and is not reported as success", async (t) => {
  let attempts = 0;
  const { runner, states, status } = fixture(t, {
    notify: () => { attempts++; throw new Error("Notification unavailable"); },
  });
  await runner.start("sequence", en.samples);
  t.mock.timers.tick(30_000);
  assert.equal(attempts, 1);
  assert.equal(status(), "error");
  assert.equal(states.at(-1).requested.length, 0);
});

test("repeat clicks cannot start overlapping runs; disposal stops pending work", async (t) => {
  const { runner, requests, states } = fixture(t);
  await runner.start("sequence", en.samples);
  await runner.start("sequence", en.samples);
  assert.equal(requests.length, 1);
  const updates = states.length;
  runner.dispose();
  t.mock.timers.tick(30_000);
  await runner.start("single", en.samples);
  assert.equal(requests.length, 1);
  assert.equal(states.length, updates);
});

test("all locales have six distinct, bounded notification samples and matching statuses", () => {
  for (const copy of [en, it, fr, es]) {
    assert.equal(copy.samples.length, 6);
    assert.equal(new Set(copy.samples.map((s) => s.title)).size, 6);
    assert.deepEqual(Object.keys(copy.status), Object.keys(en.status));
    assert.match(copy.progress, /\{count\}/);
    assert.match(copy.progress, /\{total\}/);
    for (const sample of copy.samples) {
      assert.ok(sample.title.length > 0 && sample.title.length < 512);
      assert.ok(sample.body.length > 0 && sample.body.length < 4096);
    }
  }
});

test("unread counts accumulate across runs; reading resets only the badge", async (t) => {
  const { runner, states, requests } = fixture(t);
  await runner.start("single", en.samples);
  assert.equal(states.at(-1).unread, 1);
  await runner.start("sequence", en.samples);
  assert.equal(states.at(-1).unread, 2);
  runner.markRead();
  assert.equal(states.at(-1).unread, 0);
  assert.equal(states.at(-1).requested.length, 1);
  t.mock.timers.tick(3_000);
  assert.equal(states.at(-1).unread, 1);
  runner.cancel();
  assert.equal(states.at(-1).unread, 1);
  assert.equal(requests.length, 3);
});

test("page titles use the leading parenthesized count Paguro reads, capped at its limit", () => {
  const base = "Try your notifications. — Paguro";
  assert.equal(notificationTestTitle(base, 0), base);
  assert.equal(notificationTestTitle(base, 6), `(6) ${base}`);
  assert.equal(notificationTestTitle(base, 1000), `(999) ${base}`);
});
