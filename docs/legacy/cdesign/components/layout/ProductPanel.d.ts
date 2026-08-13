import * as React from "react";

interface Crumb { label: string; href?: string; }
interface SizeOption { label: string; soldOut?: boolean; }
interface MediaItem {
  type?: "video" | "image";
  src?: string;
  alt?: string;
  node?: React.ReactNode;
  thumb?: React.ReactNode;
}

/**
 * C-ProductPanel — the product page's main band (S-006): the media gallery beside
 * the purchase column (breadcrumb, name, price, description, type attribute, size,
 * quantity, buy buttons, and the size-chart / shipping drawer links). Stacks to one
 * column below 768px. When every size is sold out the buy buttons swap to a
 * single Preorder link.
 */
export interface ProductPanelProps {
  breadcrumb?: Crumb[];
  /** Product name. */
  name?: string;
  /** HTML level (h1–h4) for the name — changes the tag only, not the style. Default 1. */
  headingLevel?: 1 | 2 | 3 | 4;
  price?: number;
  compareAt?: number;
  currency?: string;
  description?: string;
  /** Type-attribute label, e.g. "Closure Type" / "Set Type" / "Length". */
  attributeLabel?: string;
  /** Type-attribute value, e.g. "Lace Closure". */
  attributeValue?: string;
  sizes?: SizeOption[];
  size?: string | null;
  onSize?: (label: string) => void;
  quantity?: number;
  onQuantity?: (n: number) => void;
  /** Gallery media — video first, then images (see C-MediaGallery). */
  media?: MediaItem[];
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  /** Opens C-Sizing. */
  onSizeChart?: () => void;
  /** Opens C-Shipping. */
  onShipping?: () => void;
  /** Where Preorder points when every size is sold out. Default "/contact". */
  preorderHref?: string;
  /** Keep the band one column at every width (the two-up layout is otherwise a
   *  CSS container query at 768px). Default false. */
  stacked?: boolean;
}

export function ProductPanel(props: ProductPanelProps): JSX.Element;
