import * as React from "react";

/**
 * C-Shipping — the shipping & returns drawer opened from the product page. Shows
 * the same content as the /shipping-returns page.
 *
 */
export interface ShippingProps {
  open?: boolean;
  onClose?: () => void;
  /** HTML level (h1–h4) for the "Shipping & Returns" heading — tag only, not style. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4;
  /** Section blocks. Defaults to Shipping / Returns / Tailoring copy. */
  sections?: { title: string; body: string }[];
  /** Custom content — overrides `sections`. */
  children?: React.ReactNode;
}

export function Shipping(props: ShippingProps): JSX.Element;
