"use client";

/**
 * Stamps `data-theme` on <html> before first paint, so a stored theme choice
 * never flashes the wrong colours.
 *
 * Must be rendered inside <head> of every root document — both root layouts and
 * global-not-found.tsx — because this site has no shared app/layout.tsx.
 *
 * Absence of a stored value means "system", expressed as the ABSENCE of the
 * attribute. So this only ever acts on an explicit choice, and the exported
 * HTML stays theme-neutral for every visitor.
 *
 * A client component so it can tell the server render from a client mount.
 * Switching between two prefixed locales (/fr → /it) is a client navigation
 * that re-mounts this root layout; React never runs a script it creates on the
 * client and warns about it. <html> keeps its data-theme across that
 * navigation, so the client renders an inert data block instead, which React
 * accepts. suppressHydrationWarning covers the `type` difference on first load.
 */
const script = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}})()`;

export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? undefined : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
