export type NotificationSample = { title: string; body: string };
export type NotificationTestMode = "single" | "sequence";
export type NotificationTestStatus =
  | "idle" | "requesting" | "scheduled" | "complete" | "cancelled"
  | "unsupported" | "denied" | "error";
export type NotificationTestState = {
  status: NotificationTestStatus;
  requested: NotificationSample[];
  total: number;
  unread: number;
};

export const initialNotificationTestState: NotificationTestState = {
  status: "idle", requested: [], total: 0, unread: 0,
};

export const notificationTestIconPath = "/paguro/app-icon-light.png";

/** Custom services expose their unread badge through the leading title count. */
export function notificationTestTitle(base: string, unread: number): string {
  return unread > 0 ? `(${Math.min(999, unread)}) ${base}` : base;
}

type NotificationAPI = {
  permission: () => NotificationPermission;
  requestPermission: () => Promise<NotificationPermission>;
  notify: (sample: NotificationSample, tag: string) => void;
};

/** The caller supplies the browser API so permission and timer failures can be tested. */
export function createNotificationTestRunner({
  api,
  onChange,
  schedule = (callback, delay) => setTimeout(callback, delay),
  unschedule = (timer) => clearTimeout(timer),
  runID = () => crypto.randomUUID(),
}: {
  api?: NotificationAPI;
  onChange: (state: NotificationTestState) => void;
  schedule?: (callback: () => void, delay: number) => ReturnType<typeof setTimeout>;
  unschedule?: (timer: ReturnType<typeof setTimeout>) => void;
  runID?: () => string;
}) {
  let state = initialNotificationTestState;
  let generation = 0;
  let disposed = false;
  let timers: ReturnType<typeof setTimeout>[] = [];
  const busy = () => state.status === "requesting" || state.status === "scheduled";
  const clearTimers = () => { timers.forEach(unschedule); timers = []; };
  const publish = (next: NotificationTestState) => { state = next; onChange(next); };

  return {
    async start(mode: NotificationTestMode, samples: readonly NotificationSample[]) {
      if (disposed || busy()) return;
      const token = ++generation;
      const total = mode === "single" ? 1 : 6;
      const fresh = { requested: [], total, unread: state.unread };
      if (!api) { publish({ ...fresh, status: "unsupported" }); return; }
      publish({ ...fresh, status: "requesting" });

      try {
        // Request permission within the button gesture, before scheduling anything.
        const permission = api.permission() === "default"
          ? await api.requestPermission() : api.permission();
        if (disposed || token !== generation) return;
        if (permission !== "granted") {
          publish({ ...fresh, unread: state.unread, status: "denied" });
          return;
        }
        if (!samples.length) throw new Error("No notification samples");
        const id = runID();
        publish({ ...fresh, unread: state.unread, status: "scheduled" });
        const send = (index: number) => {
          if (disposed || token !== generation) return;
          const sample = samples[index % samples.length];
          try {
            // Unique tags keep repeated runs distinct in Paguro's deduplication and the OS.
            api.notify(sample, `paguro-test-${id}-${index}`);
            const requested = [...state.requested, sample];
            publish({ status: requested.length === total ? "complete" : "scheduled", requested, total, unread: state.unread + 1 });
          } catch {
            ++generation;
            clearTimers();
            publish({ ...state, status: "error" });
          }
        };
        timers = Array.from({ length: total - 1 }, (_, offset) => {
          const index = offset + 1;
          return schedule(() => send(index), index * 3_000);
        });
        send(0);
      } catch {
        if (disposed || token !== generation) return;
        clearTimers();
        publish({ ...state, status: "error" });
      }
    },
    cancel() {
      ++generation;
      clearTimers();
      if (!disposed && busy()) publish({ ...state, status: "cancelled" });
    },
    markRead() {
      if (!disposed) publish({ ...state, unread: 0 });
    },
    dispose() {
      disposed = true;
      ++generation;
      clearTimers();
    },
  };
}
