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
 */
const script = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
