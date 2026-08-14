import * as React from "react";

interface GridProduct {
  id: string;
  title: string;
  price: number;
  compareAt?: number;
  soldOut?: boolean;
  href?: string;
  /** Media node layered into the card (e.g. an <image-slot>). */
  media?: React.ReactNode;
  /** Category eyebrow shown above the title (rendered when set). */
  category?: string;
}

/**
 * C-ProductGrid — the results band of a shop / category page: a toolbar (result
 * count + grid ViewToggle) over a responsive grid of ProductCards. Column counts
 * come from the single `columns` prop, resolved against the grid's own width
 * (tablet ≥640px, desktop ≥1024px).
 */
export interface ProductGridProps {
  products?: GridProduct[];
  /** Columns as "mobile/tablet/desktop" — e.g. "1/1/2", "1/2/2", "2/2/3". Default "1/1/2". */
  columns?: string;
  /** Band heading above the grid (S-001.4's "Featured Products"). Omit for none. */
  heading?: string;
  /** HTML level (h1–h4) for the heading — changes the tag only, not the style. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4;
  /** Unit label after the count. Default "pieces". */
  label?: string;
  /** Override the count (defaults to products.length). */
  count?: number;
  /** Fires with the toolbar toggle's new state ("comfortable" | "compact") — the page
   *  decides which `columns` string to pass back. */
  onView?: (key: string) => void;
  /** Show the count + view-toggle toolbar. Default true. */
  showToolbar?: boolean;
  /** While the toolbar is scrolled out of view, stick a floating copy of the
   *  ViewToggle to the bottom-left of the scrollport. Default true. */
  floatingToggle?: boolean;
  /** Show only this many products at first, revealing another `pageSize` per
   *  "Load More" click. Omit to render every product with no button. */
  pageSize?: number;
  /** Label for the load-more button. Default "Load More". */
  loadMoreLabel?: string;
  /** What closes the grid once every product is shown, in place of the load-more
   *  button: "none" (default), "rule" (short centred hairline), "mark" (a diamond
   *  knocked out of a tapered hairline), or "monogram" (the SHER mark between two
   *  outward-fading rules). Only applies when `pageSize` is set. */
  endMark?: "none" | "rule" | "mark" | "monogram";
  /** Message when products is empty. */
  emptyMessage?: string;
}

export function ProductGrid(props: ProductGridProps): JSX.Element;
