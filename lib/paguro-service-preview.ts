export type PreviewLayout = "sidebar" | "compact";
export type PreviewTheme = "dark" | "light";

// Coordinates use the capture script's 1440 × 900-point desktop, not pixels.
export const captureSize = { width: 1440, height: 900 };
export const railServices = [
  { id: "whatsapp", name: "WhatsApp", workspace: "personal", sidebarY: 212, compactY: 180 },
  { id: "gmail", name: "Gmail", workspace: "personal", sidebarY: 246, compactY: 224 },
  { id: "chatgpt", name: "ChatGPT", workspace: "personal", sidebarY: 280, compactY: 268 },
  { id: "google-calendar", name: "Google Calendar", workspace: "personal", sidebarY: 314, compactY: 312 },
  { id: "slack", name: "Slack", workspace: "work", sidebarY: 390, compactY: 372 },
  { id: "notion", name: "Notion", workspace: "work", sidebarY: 424, compactY: 416 },
  { id: "claude", name: "Claude", workspace: "work", sidebarY: 458, compactY: 460 },
] as const;
export const railDividerY = (railServices[3].compactY + railServices[4].compactY) / 2;

// PaguroCore/DockIconSizing: 22-point base, 35-point peak, 2.5-row cosine falloff.
// Read pointer distances against resting centers so growth cannot feed itself.
export function dockTransforms(pointerY: number | null) {
  const growth = railServices.map(({ compactY }) => {
    if (pointerY === null || !Number.isFinite(pointerY)) return 0;
    const distance = Math.min(Math.abs(pointerY - compactY) / (44 * 2.5), 1);
    return 13 * (Math.cos(distance * Math.PI) + 1) / 2;
  });
  let preceding = 0;
  return growth.map((value) => {
    // Grow down from the first icon's top edge, preserving the rail's top inset.
    const offset = preceding + value / 2;
    preceding += value;
    return { scale: (22 + value) / 22, offset };
  });
}
