// Ported from PaguroCore's NotificationIslandLayout and NotificationIslandSwipeRule.
// These are app-preview measurements, not additions to the site's design tokens.
export const islandLayout = {
  cardHeight: 68,
  gap: 8,
  pitch: 76,
  toolbarHeight: 38,
  top: 42,
  bottom: 8,
  clearance: 10,
};

export function islandHeight(count: number) {
  const rows = Math.min(Math.max(count, 1), 3);
  return 38 + 4 + rows * 68 + (rows - 1) * 8 + 8 + (count > 3 ? 38 : 0);
}

export function foldPlacement(bottom: number, viewport: number, count: number) {
  const stop = viewport - islandLayout.clearance;
  const depth = count > 3 ? Math.min(3, Math.max(0, (bottom - stop) / islandLayout.pitch)) : 0;
  return {
    depth,
    offset: depth > 0 ? stop + 8 * Math.min(1, Math.max(0, depth - 1)) - bottom : 0,
    scale: 1 - 0.06 * Math.min(depth, 2),
    opacity: depth > 2 ? 3 - depth : 1,
  };
}

export function shouldDismiss(dragX: number, velocityX: number, width: number) {
  return dragX > 0 && ((width > 0 && dragX >= width * 0.25) || (dragX > 8 && velocityX >= 400));
}

export function dragAppearance(x: number, width: number, reduceMotion = false) {
  const offset = x < 0 ? (reduceMotion ? 0 : x * 0.35) : x;
  return { offset, opacity: reduceMotion || width <= 0 ? 1 : 1 - 0.6 * Math.min(1, Math.abs(offset) / width) };
}

export type DemoService = "slack" | "whatsapp" | "gmail";
export type DemoNotification = { id: number; service: DemoService; title: string; message: string };
export const serviceNames: Record<DemoService, string> = { slack: "Slack", whatsapp: "WhatsApp", gmail: "Gmail" };

export type IslandPhase = "collapsed" | "preview" | "expanded";
export type IslandState = {
  notifications: DemoNotification[];
  phase: IslandPhase;
  hovered: boolean;
  keyboardFocused: boolean;
};
export type IslandAction =
  | { type: "receive"; notification: DemoNotification }
  | { type: "hover"; active: boolean }
  | { type: "keyboard-focus"; active: boolean }
  | { type: "expand" }
  | { type: "collapse"; latestID?: number }
  | { type: "expire"; id: number }
  | { type: "open"; id: number }
  | { type: "remove"; ids: number[] };

export const initialIslandState: IslandState = {
  notifications: [], phase: "collapsed", hovered: false, keyboardFocused: false,
};

export function islandReducer(state: IslandState, action: IslandAction): IslandState {
  switch (action.type) {
    case "receive":
      return {
        ...state,
        notifications: [action.notification, ...state.notifications],
        phase: state.hovered || state.keyboardFocused ? "expanded" : "preview",
      };
    case "hover":
      return { ...state, hovered: action.active, phase: action.active && state.notifications.length ? "expanded" : state.phase };
    case "keyboard-focus":
      return { ...state, keyboardFocused: action.active };
    case "expand":
      return state.notifications.length ? { ...state, phase: "expanded" } : state;
    case "collapse":
      // A delayed leave from an older alert must not close a new arrival.
      if (action.latestID !== undefined && action.latestID < (state.notifications[0]?.id ?? 0)) return state;
      return { ...state, phase: "collapsed" };
    case "expire":
      if (state.phase !== "preview" || state.keyboardFocused || action.id !== state.notifications[0]?.id) return state;
      return { ...state, phase: "collapsed" };
    case "open": {
      const opened = state.notifications.find(({ id }) => id === action.id);
      if (!opened) return state;
      return { ...state, notifications: state.notifications.filter(({ service }) => service !== opened.service), phase: "collapsed", keyboardFocused: false };
    }
    case "remove": {
      const notifications = state.notifications.filter(({ id }) => !action.ids.includes(id));
      return { ...state, notifications, phase: notifications.length ? state.phase : "collapsed" };
    }
  }
}
