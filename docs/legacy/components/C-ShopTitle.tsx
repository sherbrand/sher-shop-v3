"use client";

import type { ReactElement } from "react";
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
}

export interface ShopTitleProps {
  breadcrumb?: Crumb[];
  /** Page heading (required). */
  heading: string;
  /** HTML level (h1–h4) for the heading — tag only, not style. Default 1. */
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

const STEP_HERO =
  "text-[length:var(--text-hero-sm)] @min-[640px]:text-[length:var(--text-hero-md)] @min-[1024px]:text-[length:var(--text-hero-lg)]";
const STEP_BODY =
  "text-[length:var(--text-body-sm)] @min-[640px]:text-[length:var(--text-body-md)] @min-[1024px]:text-[length:var(--text-body-lg)]";

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
          className={`m-0 leading-[var(--leading-normal)] text-[var(--text-default)] ${
            start ? "" : "mx-auto"
          } ${STEP_BODY}`}
          style={{ maxWidth: measure }}
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
            const key = filter.key ?? filter.href ?? filter.label ?? String(i);
            // a shared onFilter makes the pill a button; otherwise it's a link
            return onFilter ? (
              <ButtonPill
                key={key}
                active={active}
                onClick={() => onFilter(filter.key ?? filter.label)}
              >
                {filter.label}
              </ButtonPill>
            ) : (
              <ButtonPill key={key} as="a" href={filter.href} active={active}>
                {filter.label}
              </ButtonPill>
            );
          })}
        </div>
      )}
    </header>
  );
}
