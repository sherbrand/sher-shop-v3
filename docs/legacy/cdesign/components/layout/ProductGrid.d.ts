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
  /** Message when products is empty. */
  emptyMessage?: string;
}

export function ProductGrid(props: ProductGridProps): JSX.Element;
