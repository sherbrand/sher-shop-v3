import * as React from "react";

interface CartItem {
  id: string;
  name: string;
  options?: string;
  price: number;
  quantity: number;
  image?: string;
}

/**
 * C-Cart — the cart drawer (F-005, F-006). Line items with quantity steppers and
 * remove, a subtotal, the Shopify checkout handoff, and an empty state.
 *
 */
export interface CartProps {
  open?: boolean;
  onClose?: () => void;
  /** HTML level (h1–h4) for the "Your Cart" heading — tag only, not style. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4;
  items?: CartItem[];
  currency?: string;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  onCheckout?: () => void;
}

export function Cart(props: CartProps): JSX.Element;
