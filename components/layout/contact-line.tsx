import { splitAccent } from "@/components/ui/accent";
import { site } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionaries/en";

/**
 * Two sentences, one link each — deliberately not one sentence with two links.
 * Word order differs across the three languages, so a single string split twice
 * would read wrong in at least one of them; two independent sentences let each
 * locale place its own link wherever its grammar wants it.
 */
export function ContactLine({ dict, issuesUrl = site.github }: { dict: Dictionary; issuesUrl?: string }) {
  const issues = splitAccent(dict.contact.issues, dict.contact.issuesLink);
  const email = splitAccent(dict.contact.email, "{email}");
  // A drawn bar rather than text-decoration: CSS underlines have square ends and
  // no way to round them. `inline-block` keeps the link from wrapping, which
  // would otherwise split the bar across two lines.
  const link =
    "relative inline-block text-foreground transition hover:text-melon-500 " +
    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-1 after:rounded-full " +
    "after:bg-melon-500";

  return (
    <section className="mx-auto max-w-page px-6 pb-0 text-center text-sm text-muted">
      <p>
        {issues.before}
        <a href={issuesUrl} target="_blank" rel="noreferrer" className={link}>
          {issues.match}
        </a>
        {issues.after} {email.before}
        <a href={`mailto:${site.email}`} className={link}>
          {site.email}
        </a>
        {email.after}
      </p>
    </section>
  );
}
