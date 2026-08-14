"use client";

import type { CSSProperties, ReactElement } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";
import { Breadcrumb } from "@/components/Breadcrumb";
import type { Crumb } from "@/components/Breadcrumb";
import { ButtonPill } from "@/components/ButtonPill";

/* C-ShopTitle — the page header band for Shop and category pages: a breadcrumb, a
   heading, an optional description, and an optional row of filter pills. Heading
   and description sizes step against the band's OWN width. */

export interface FilterPill {
  label: string;
  href?: string;
  key?: string;
  active?: boolean;
  /** Per-item click handler — makes this pill a button instead of a link. */
  onClick?: () => void;
}

export interface ShopTitleProps {
  /** Breadcrumb trail. */
  breadcrumb?: Crumb[];
  /** Page heading (required). */
  heading: string;
  /** HTML level (h1–h4) for the heading — changes the tag only, not the style. Default 1. */
  headingLevel?: HeadingLevel;
  /** Lead description below the heading. */
  description?: string;
  /** Filter pills. Link pills by default; button pills when `onFilter` is set. */
  filters?: FilterPill[];
  /** Active filter key (alternative to per-item `active`). */
  activeFilter?: string;
  /** If set, pills become buttons calling this with the pill key. */
  onFilter?: (key: string) => void;
  /** "center" (default) or "start" (left-aligned). */
  align?: "center" | "start";
  /** Max line length for the description. Default "78ch". */
  measure?: string;
  className?: string;
}

// Stepped sizes, resolved against the band's own width.
const STEP_HERO =
  "text-[length:var(--size-hero-sm)] @min-[640px]:text-[length:var(--size-hero-md)] @min-[1024px]:text-[length:var(--size-hero-lg)]";
const STEP_BODY =
  "text-[length:var(--size-body-sm)] @min-[640px]:text-[length:var(--size-body-md)] @min-[1024px]:text-[length:var(--size-body-lg)]";

export function ShopTitle({
  breadcrumb = [],
  heading,
  headingLevel = 1,
  description,
  filters,
  activeFilter,
  onFilter,
  align = "center",
  measure = "78ch",
  className = "",
}: ShopTitleProps): ReactElement {
  const start = align === "start";

  return (
    <header
      className={`@container flex flex-col items-stretch gap-[var(--space-3)] ${
        start ? "text-left" : "text-center"
      } ${className}`}
    >
      {breadcrumb.length > 0 && (
        <Breadcrumb items={breadcrumb} className={start ? "justify-start" : "justify-center"} />
      )}

      <Heading
        level={headingLevel}
        className={`m-0 font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-tight)] tracking-[var(--tracking-display)] text-[var(--text-strong)] ${STEP_HERO}`}
      >
        {heading}
      </Heading>

      {description && (
        <p
          className={`m-0 leading-[var(--leading-normal)] text-[var(--text-default)] ${STEP_BODY} ${
            start ? "" : "mx-auto"
          }`}
          style={{ maxWidth: measure } as CSSProperties}
        >
          {description}
        </p>
      )}

      {filters && filters.length > 0 && (
        <div
          className={`mt-[var(--space-2)] flex flex-wrap gap-[var(--space-3)] ${
            start ? "justify-start" : "justify-center"
          }`}
        >
          {filters.map((filter, i) => {
            const active =
              filter.active != null
                ? filter.active
                : activeFilter != null && filter.key === activeFilter;
            const itemKey = filter.key || filter.href || filter.label || String(i);
            // A per-item onClick, or a shared onFilter, makes the pill a button;
            // otherwise it stays a link.
            const handler =
              filter.onClick ?? (onFilter ? () => onFilter(filter.key ?? filter.label) : null);
            return handler ? (
              <ButtonPill key={itemKey} active={active} onClick={handler}>
                {filter.label}
              </ButtonPill>
            ) : (
              <ButtonPill key={itemKey} as="a" href={filter.href} active={active}>
                {filter.label}
              </ButtonPill>
            );
          })}
        </div>
      )}
    </header>
  );
}
