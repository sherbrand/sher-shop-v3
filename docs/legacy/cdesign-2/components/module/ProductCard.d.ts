import * as React from "react";

/**
 * ProductCard — the unit of the product grid (F-001): media over an optional
 * category eyebrow + title on the left with the price right-aligned on the same
 * row. Reused on Shop, category pages, and the "You May Also Like" block.
 */
export interface ProductCardProps {
  title: string;
  /** Price in major units (e.g. 240). Omit to hide. */
  price?: number;
  currency?: string;
  /** Strikethrough original price. */
  compareAt?: number;
  href?: string;
  /** Image URL. */
  src?: string;
  /** Custom media node (e.g. an <image-slot> or <img>) — overrides `src`. */
  media?: React.ReactNode;
  /** Dim + badge as sold out. */
  soldOut?: boolean;
  /** Category eyebrow above the title. Rendered when set. */
  category?: string;
}

export function ProductCard(props: ProductCardProps): JSX.Element;
