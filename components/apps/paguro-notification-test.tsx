"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries/en";
import { createNotificationTestRunner, initialNotificationTestState, notificationTestIconPath, notificationTestTitle } from "@/lib/paguro-notification-test";

const button = "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-base font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40 disabled:cursor-not-allowed disabled:opacity-50";

export function PaguroNotificationTest({ copy }: { copy: Dictionary["paguroNotificationTest"] }) {
  const [state, setState] = useState(initialNotificationTestState);
  const runner = useRef<ReturnType<typeof createNotificationTestRunner> | null>(null);

  useEffect(() => {
    const baseTitle = document.title;
    let lastTitle = baseTitle;
    const current = createNotificationTestRunner({
      api: "Notification" in window ? {
        permission: () => Notification.permission,
        requestPermission: () => Notification.requestPermission(),
        notify: (sample, tag) => {
          new Notification(sample.title, {
            body: sample.body,
            tag,
            icon: new URL(notificationTestIconPath, window.location.origin).href,
          });
        },
      } : undefined,
      onChange: (next) => {
        lastTitle = notificationTestTitle(baseTitle, next.unread);
        document.title = lastTitle;
        setState(next);
      },
    });
    runner.current = current;
    const cancel = () => current.cancel();
    window.addEventListener("pagehide", cancel);
    return () => {
      window.removeEventListener("pagehide", cancel);
      current.dispose();
      // Do not overwrite metadata already installed by the next route.
      if (document.title === lastTitle) document.title = baseTitle;
      runner.current = null;
    };
  }, []);

  const busy = state.status === "requesting" || state.status === "scheduled";
  return (
    <section aria-labelledby="send-heading" className="mt-10 rounded-card bg-surface p-6 sm:p-8">
      <h2 id="send-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">{copy.sendHeading}</h2>
      <p className="mt-3 text-base leading-relaxed text-muted">{copy.timing}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" disabled={busy} className={`${button} bg-foreground text-background`} onClick={() => void runner.current?.start("single", copy.samples)}>{copy.single}</button>
        <button type="button" disabled={busy} className={`${button} bg-foreground/5 text-foreground`} onClick={() => void runner.current?.start("sequence", copy.samples)}>{copy.sequence}</button>
        {busy && <button type="button" className={`${button} border border-hairline`} onClick={() => runner.current?.cancel()}>{copy.cancel}</button>}
      </div>
      <noscript><p className="mt-6 text-base">{copy.noJavaScript}</p></noscript>
      <div role="status" aria-live="polite" aria-atomic="true" className="mt-6 border-t border-hairline pt-6">
        <p className="text-base font-medium">{copy.status[state.status]}</p>
        {state.total > 0 && <p className="mt-2 text-sm text-muted">{copy.progress.replace("{count}", String(state.requested.length)).replace("{total}", String(state.total))}</p>}
      </div>
      {state.requested.length > 0 && (
        <ol aria-label={copy.history} className="mt-4 divide-y divide-hairline">
          {state.requested.map((sample, index) => (
            <li key={index} className="py-3 text-sm">
              <p className="font-semibold">{sample.title}</p>
              <p className="mt-1 text-muted">{sample.body}</p>
            </li>
          ))}
        </ol>
      )}
      <p className="mt-4 text-sm leading-relaxed text-muted">{copy.deliveryNote}</p>
      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-hairline pt-6">
        <p className="text-base font-semibold" aria-live="polite">{copy.unread.replace("{count}", String(state.unread))}</p>
        <button type="button" disabled={state.unread === 0} className={`${button} bg-foreground/5 text-foreground`} onClick={() => runner.current?.markRead()}>{copy.markRead}</button>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{copy.badgeNote}</p>
    </section>
  );
}
