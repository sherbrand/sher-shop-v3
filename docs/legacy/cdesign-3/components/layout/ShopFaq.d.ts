import * as React from "react";

interface FaqItem {
  /** Question text. */
  q: string;
  /** Answer text. */
  a: string;
}

/**
 * C-ShopFaq — the FAQ band: a heading beside its accordion at two-up, stacking to
 * one column on mobile. Heading size and column gap step off the band's own
 * measured width; the heading is vertically centred against the accordion.
 */
export interface ShopFaqProps {
  /** Band heading. Default "Frequently Asked Questions". */
  heading?: string;
  /** HTML level (h1–h4) for the band heading — changes the tag only, not the style. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4;
  /** Question/answer rows. */
  items?: FaqItem[];
  /** HTML level for each question heading. Default 3. */
  itemHeadingLevel?: 1 | 2 | 3 | 4;
  /** Index of the row open on first render; null for all closed. Default 0. */
  defaultOpen?: number | null;
  /** Only one row open at a time. Default true. */
  single?: boolean;
  /** Vertical placement of the heading at two-up. Default "center". */
  align?: "center" | "start";
}

export function ShopFaq(props: ShopFaqProps): JSX.Element;
