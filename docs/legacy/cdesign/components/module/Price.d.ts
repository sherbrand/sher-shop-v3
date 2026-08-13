import * as React from "react";

/**
 * SHER price display — formats a money amount in the brand serif. Checkout
 * settles in USD (F-006). Optional strikethrough compare-at price.
 */
export interface PriceProps {
  /** Amount in major units (e.g. 240 = $240). */
  amount: number;
  /** ISO currency code. Default "USD". */
  currency?: string;
  /** Original price to show struck-through (only shown if greater than amount). */
  compareAt?: number;
  /** Size. Default "md". */
  size?: "sm" | "md" | "lg";
}

export function Price(props: PriceProps): JSX.Element;
