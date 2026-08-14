import * as React from "react";

interface AccordionItem {
  /** The question / row label. */
  q: string;
  /** The answer body copy. */
  a: string;
}

/**
 * Accordion — stacked disclosure rows for FAQ blocks. Hairline-separated rows with
 * a rotating chevron; one item open at a time by default.
 */
export interface AccordionProps {
  items?: AccordionItem[];
  /** HTML level (h1–h4) for each row label — changes the tag only, not the style. Default 3. */
  headingLevel?: 1 | 2 | 3 | 4;
  /** Only one row open at a time. Default true. */
  single?: boolean;
  /** Index open on mount. Default null (all closed). */
  defaultOpen?: number | null;
}

export function Accordion(props: AccordionProps): JSX.Element;
