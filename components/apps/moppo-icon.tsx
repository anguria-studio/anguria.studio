/** Moppo always uses the native dark export, including its shaded edge. */
export function MoppoIcon({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`block shrink-0 ${className}`}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/moppo/app-icon-dark.png" alt="" width={256} height={256} className="size-full" />
  </span>;
}
