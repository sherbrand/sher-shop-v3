import type { ReactElement } from "react";
import { Fragment } from "react";

/* Breadcrumb — the page trail (e.g. Home › Shop). Links every crumb except the
   current (last) one.

   The trail is always one line. It never wraps. When it runs past its measure
   the current crumb ellipsis-trims; the parent crumbs and separators keep their
   full width. The parent is the only link in the trail and appears nowhere else
   on the page, while the current crumb is repeated by the heading below it, so
   the current crumb is the one that gives way.

   The measure caps the WHOLE trail, not each crumb, so a short parent leaves
   more room for the current label. The cap holds even where the placement has
   spare room: a long trail reads as clutter, so it is trimmed by design. The
   row also never outgrows a narrow placement. */

export interface Crumb {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items?: Crumb[];
  /** Separator glyph. Default "›". */
  separator?: string;
  className?: string;
}

// Stepped label size, resolved against the enclosing band's width.
const STEP_LABEL =
  "text-[length:var(--size-label-sm)] @min-[640px]:text-[length:var(--size-label-md)] @min-[1024px]:text-[length:var(--size-label-lg)]";

/* How wide the whole trail may run, in ch of its own label size, so the cap
   holds at every step of the type scale. The class is written out in full
   because the Tailwind scanner reads literal text, not built strings.

   The fallback is not optional. min() is thrown out whole if any argument fails
   to resolve, so a missing --crumb-trail would drop the max-width entirely and
   leave the trail uncapped, rather than falling back to 100%. */
const TRAIL_MEASURE = "max-w-[min(var(--crumb-trail,35ch),100%)]";

export function Breadcrumb({
  items = [],
  separator = "›",
  className = "",
}: BreadcrumbProps): ReactElement {
  return (
    <nav
      aria-label="Breadcrumb"
      /* The row stops at the trail measure, or at its placement when that is
         narrower — a centering parent otherwise sizes the row to its content
         and lets it spill. min-w-0 lets it shrink inside a flex or grid parent.
         Together these squeeze the current crumb, the one built to trim. */
      className={`flex min-w-0 ${TRAIL_MEASURE} flex-nowrap items-center gap-[var(--space-2)] font-[family-name:var(--font-body)] ${STEP_LABEL} uppercase tracking-[var(--tracking-label)] ${className}`}
    >
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <Fragment key={`${item.label}-${i}`}>
            {last || !item.href ? (
              <span
                aria-current={last ? "page" : undefined}
                className={`whitespace-nowrap ${
                  last
                    ? "min-w-0 shrink overflow-hidden text-ellipsis text-[var(--text-strong)]"
                    : "shrink-0 text-[var(--text-meta)]"
                }`}
              >
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="shrink-0 whitespace-nowrap text-[var(--text-meta)] no-underline"
              >
                {item.label}
              </a>
            )}
            {!last && (
              <span
                aria-hidden="true"
                className="shrink-0 text-[var(--text-muted)] opacity-70"
              >
                {separator}
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
