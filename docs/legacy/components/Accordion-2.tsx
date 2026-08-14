"use client";

import { useState } from "react";
import type { ReactElement } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";
import { Icon } from "@/components/Icon";

/* Accordion — stacked disclosure rows for FAQ blocks. One item open at a time by
   default (`single`), or allow many. Rows are hairline-separated; the trigger is
   a full-width button with a rotating chevron. */

export interface AccordionItem {
  /** The question / row label. */
  q: string;
  /** The answer body copy. */
  a: string;
}

export interface AccordionProps {
  items?: AccordionItem[];
  /** HTML level (h1–h4) for each row label — changes the tag only, not the style. Default 3. */
  headingLevel?: HeadingLevel;
  /** Only one row open at a time. Default true. */
  single?: boolean;
  /** Index open on mount. Default null (all closed). */
  defaultOpen?: number | null;
  className?: string;
}

export function Accordion({
  items = [],
  headingLevel = 3,
  single = true,
  defaultOpen = null,
  className = "",
}: AccordionProps): ReactElement {
  const [open, setOpen] = useState<number[]>(defaultOpen == null ? [] : [defaultOpen]);
  const isOpen = (i: number): boolean => open.includes(i);
  const toggle = (i: number): void =>
    setOpen((prev) => {
      if (prev.includes(i)) return prev.filter((x) => x !== i);
      return single ? [i] : [...prev, i];
    });

  return (
    <div className={`border-t border-[var(--border-default)] ${className}`}>
      {items.map((item, i) => {
        const expanded = isOpen(i);
        return (
          <div key={`${item.q}-${i}`} className="border-b border-[var(--border-default)]">
            <Heading level={headingLevel} className="m-0">
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={expanded}
                className="flex w-full cursor-pointer items-center justify-between gap-[var(--space-4)] border-none bg-none py-[var(--space-5)] text-left font-[family-name:var(--font-display)] text-[length:var(--fs-sub,var(--size-sub))] uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)]"
              >
                <span>{item.q}</span>
                <span
                  className={`inline-flex shrink-0 transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)] ${
                    expanded ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <Icon name="chevron-down" size={20} />
                </span>
              </button>
            </Heading>
            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-[var(--dur-slow)] ease-[var(--ease-out)] ${
                expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="m-0 max-w-[72ch] pb-[var(--space-5)] text-[length:var(--fs-body,var(--size-body-lg))] leading-[var(--leading-normal)] text-[var(--text-default)]">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
