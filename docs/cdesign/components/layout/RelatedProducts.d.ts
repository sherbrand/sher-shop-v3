import * as React from "react";

interface GridProduct {
  id: string;
  title: string;
  price: number;
  compareAt?: number;
  soldOut?: boolean;
  href?: string;
  category?: string;
  media?: React.ReactNode;
}

/**
 * C-RelatedProducts — the "You May Also Like" band (S-006): heading, subtitle and
 * Back to Category button BESIDE a small grid of same-category products, per the
 * PRD outline. Stacks to one column below 768px (CSS container query).
 */
export interface RelatedProductsProps {
  /** Band heading. Default "You May Also Like". */
  heading?: string;
  /** HTML level (h1–h4) for the heading — tag only, not style. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4;
  /** Copy pointing back to the category. */
  subtitle?: string;
  /** Back-to-category button label and target (both required to render it). */
  backLabel?: string;
  backHref?: string;
  products?: GridProduct[];
  /** Columns as "mobile/tablet/desktop" when stacked. Default "1/2/2"; the grid
   *  renders 2-up whenever the band is side by side. */
  columns?: string;
  /** Fill for the Back to Category button. Default "secondary". */
  backVariant?: "primary" | "accent" | "surface" | "secondary" | "ghost";
  /** "row" (default) sits the buttons side by side and wraps; "stack" gives each its
   *  own row, every button filling the text column so they match width. */
  actionsLayout?: "row" | "stack";
  /** Max width of the stacked actions row — capping the row (not each button) keeps
   *  them identical in width. Default "34ch". Ignored when actionsLayout="row". */
  actionsMeasure?: string;
  /** Extra buttons rendered in the actions row beside the Back to Category button.
   *  Pass `fullWidth` on them when using actionsLayout="stack". */
  children?: React.ReactNode;
}

export function RelatedProducts(props: RelatedProductsProps): JSX.Element;
