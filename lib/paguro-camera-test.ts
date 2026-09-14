export type CameraTestStatus =
  | "idle" | "requesting" | "active" | "stopped"
  | "unsupported" | "denied" | "unavailable" | "error";

/** Owns the preview stream, including permission replies that arrive after Stop. */
export function createCameraTestRunner({
  requestStream,
  showPreview,
  clearPreview,
  onChange,
}: {
  requestStream?: () => Promise<MediaStream>;
  showPreview: (stream: MediaStream) => Promise<void>;
  clearPreview: () => void;
  onChange: (status: CameraTestStatus) => void;
}) {
  let status: CameraTestStatus = "idle";
  let stream: MediaStream | null = null;
  let removeTrackListeners = () => {};
  let generation = 0;
  let disposed = false;
  const publish = (next: CameraTestStatus) => { status = next; onChange(next); };
  const release = () => {
    removeTrackListeners();
    removeTrackListeners = () => {};
    stream?.getTracks().forEach((track) => track.stop());
    stream = null;
    clearPreview();
  };
  const stop = () => {
    if (disposed) return;
    ++generation;
    release();
    if (status === "requesting" || status === "active") publish("stopped");
  };

  return {
    async start() {
      if (disposed || status === "requesting" || status === "active") return;
      if (!requestStream) { publish("unsupported"); return; }
      const token = ++generation;
      publish("requesting");
      try {
        const received = await requestStream();
        // The permission prompt cannot be cancelled. Release any late result.
        if (disposed || token !== generation) {
          received.getTracks().forEach((track) => track.stop());
          return;
        }
        stream = received;
        const tracks = received.getVideoTracks();
        if (!tracks.length || tracks.every((track) => track.readyState === "ended")) {
          release();
          publish("unavailable");
          return;
        }
        tracks.forEach((track) => track.addEventListener("ended", stop));
        removeTrackListeners = () => tracks.forEach((track) => track.removeEventListener("ended", stop));
        await showPreview(received);
        if (!disposed && token === generation) publish("active");
      } catch (error) {
        if (disposed || token !== generation) return;
        release();
        const name = error instanceof Error ? error.name : "";
        if (name === "NotAllowedError" || name === "SecurityError") publish("denied");
        else if (["NotFoundError", "NotReadableError", "OverconstrainedError", "AbortError"].includes(name)) publish("unavailable");
        else publish("error");
      }
    },
    stop,
    dispose() {
      disposed = true;
      ++generation;
      release();
    },
  };
}
