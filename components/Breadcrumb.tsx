import type { ReactElement } from "react";
import { Fragment } from "react";

/* Breadcrumb — the page trail (e.g. Home › Shop). Links every crumb except the
   current (last) one. On narrow widths the current label ellipsis-trims. */

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

export function Breadcrumb({
  items = [],
  separator = "›",
  className = "",
}: BreadcrumbProps): ReactElement {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-[var(--space-2)] font-[family-name:var(--font-body)] ${STEP_LABEL} uppercase tracking-[var(--tracking-label)] ${className}`}
    >
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <Fragment key={`${item.label}-${i}`}>
            {last || !item.href ? (
              <span
                aria-current={last ? "page" : undefined}
                className={`max-w-[22ch] truncate ${
                  last ? "text-[var(--text-strong)]" : "text-[var(--text-meta)]"
                }`}
              >
                {item.label}
              </span>
            ) : (
              <a href={item.href} className="text-[var(--text-meta)] no-underline">
                {item.label}
              </a>
            )}
            {!last && (
              <span aria-hidden="true" className="text-[var(--text-muted)] opacity-70">
                {separator}
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
