import type { PreviewLayout } from "./paguro-service-preview";

export type PreviewHint = "toggle" | "dock";
export type PreviewHintHistory = {
  toggleUsed: boolean;
  dockUsed: boolean;
};

export const hintIdleDelay = 4000;
export const dockHintDuration = 3000;

export function createPreviewHintHistory(): PreviewHintHistory {
  return { toggleUsed: false, dockUsed: false };
}

export function nextPreviewHint({ layout, history, toggleVisible, dockVisible, pageVisible, reducedMotion, keyboardActive }: {
  layout: PreviewLayout;
  history: PreviewHintHistory;
  toggleVisible: boolean;
  dockVisible: boolean;
  pageVisible: boolean;
  reducedMotion: boolean;
  keyboardActive: boolean;
}): PreviewHint | null {
  if (!pageVisible || reducedMotion || keyboardActive) return null;
  if (layout === "sidebar" && toggleVisible && !history.toggleUsed) return "toggle";
  if (layout === "compact" && dockVisible && !history.dockUsed) return "dock";
  return null;
}

export function dockHintPointer(progress: number, firstY: number, lastY: number): number {
  // Begin and end beyond the cosine's influence so the sweep settles at rest.
  const start = firstY - 110;
  const end = lastY + 110;
  const t = Math.min(1, Math.max(0, progress));
  const eased = t * t * (3 - 2 * t);
  return start + (end - start) * eased;
}
