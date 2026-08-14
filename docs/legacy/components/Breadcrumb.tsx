import { Fragment } from "react";
import type { ReactElement, CSSProperties } from "react";

/* Breadcrumb — the page trail (e.g. Home > Shop). Links every crumb except the
   current (last) one. On narrow widths the current label can ellipsis-trim. */

interface Crumb {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items?: Crumb[];
  /** Separator glyph. Default ">". */
  separator?: string;
  className?: string;
  style?: CSSProperties;
}

export function Breadcrumb({
  items = [],
  separator = "›", // >
  className = "",
  style,
}: BreadcrumbProps): ReactElement {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-[var(--space-2)] font-[family-name:var(--font-body)] text-[length:var(--text-xs)] uppercase tracking-[var(--tracking-3)] ${className}`}
      style={style}
    >
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <Fragment key={i}>
            {last || !it.href ? (
              <span
                aria-current={last ? "page" : undefined}
                className={`max-w-[22ch] overflow-hidden text-ellipsis whitespace-nowrap ${
                  last ? "text-[var(--text-strong)]" : "text-[var(--text-muted)]"
                }`}
              >
                {it.label}
              </span>
            ) : (
              <a href={it.href} className="text-[var(--text-muted)] no-underline">
                {it.label}
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
