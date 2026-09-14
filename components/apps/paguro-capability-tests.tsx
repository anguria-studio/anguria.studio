"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries/en";
import { createCameraTestRunner, type CameraTestStatus } from "@/lib/paguro-camera-test";

const button = "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-base font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40 disabled:cursor-not-allowed disabled:opacity-50";

export function PaguroCapabilityTests({ copy }: { copy: Dictionary["paguroNotificationTest"] }) {
  const [status, setStatus] = useState<CameraTestStatus>("idle");
  const video = useRef<HTMLVideoElement>(null);
  const runner = useRef<ReturnType<typeof createCameraTestRunner> | null>(null);

  useEffect(() => {
    const preview = video.current;
    const current = createCameraTestRunner({
      requestStream: window.isSecureContext && navigator.mediaDevices?.getUserMedia
        ? () => navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        : undefined,
      showPreview: async (stream) => {
        if (!preview) throw new Error("Preview unavailable");
        preview.srcObject = stream;
        await preview.play();
      },
      clearPreview: () => {
        if (!preview) return;
        preview.pause();
        preview.srcObject = null;
      },
      onChange: setStatus,
    });
    runner.current = current;
    const stop = () => current.stop();
    const stopWhenHidden = () => { if (document.hidden) stop(); };
    window.addEventListener("pagehide", stop);
    document.addEventListener("visibilitychange", stopWhenHidden);
    return () => {
      window.removeEventListener("pagehide", stop);
      document.removeEventListener("visibilitychange", stopWhenHidden);
      current.dispose();
      runner.current = null;
    };
  }, []);

  const busy = status === "requesting" || status === "active";
  return (
    <>
      <section aria-labelledby="download-heading" className="mt-10 rounded-card bg-surface p-6 sm:p-8">
        <h2 id="download-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">{copy.download.heading}</h2>
        <p className="mt-3 text-base leading-relaxed text-muted">{copy.download.description}</p>
        <a className={`${button} mt-6 bg-foreground text-background`} href="/paguro/paguro-download-test.txt" download="paguro-download-test.txt">{copy.download.action}</a>
        <p className="mt-6 border-t border-hairline pt-6 text-sm leading-relaxed text-muted">{copy.download.check}</p>
      </section>
      <section aria-labelledby="camera-heading" className="mt-10 rounded-card bg-surface p-6 sm:p-8">
        <h2 id="camera-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">{copy.camera.heading}</h2>
        <p className="mt-3 text-base leading-relaxed text-muted">{copy.camera.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" disabled={busy} className={`${button} bg-foreground text-background`} onClick={() => void runner.current?.start()}>{copy.camera.start}</button>
          {busy && <button type="button" className={`${button} border border-hairline`} onClick={() => runner.current?.stop()}>{status === "requesting" ? copy.camera.cancel : copy.camera.stop}</button>}
        </div>
        <p role="status" aria-live="polite" aria-atomic="true" className="mt-6 text-base font-medium">{copy.camera.status[status]}</p>
        <video ref={video} muted playsInline autoPlay aria-label={copy.camera.previewLabel} hidden={status !== "active"} className="mt-6 aspect-video w-full rounded-card bg-background object-contain" />
        <noscript><p className="mt-6 text-base">{copy.camera.noJavaScript}</p></noscript>
        <p className="mt-6 border-t border-hairline pt-6 text-sm leading-relaxed text-muted">{copy.camera.privacy}</p>
      </section>
    </>
  );
}
