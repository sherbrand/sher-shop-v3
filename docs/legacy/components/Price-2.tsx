import type { ReactElement } from "react";

/* SHER price — formats a money amount in the brand serif. Checkout settles in
   USD; currency defaults to USD. Optional strikethrough compare-at price. */

export interface PriceProps {
  /** Amount in major units (e.g. 240 = $240). */
  amount: number;
  /** ISO currency code. Default "USD". */
  currency?: string;
  /** Original price, struck through (shown only when greater than amount). */
  compareAt?: number;
  /** Size. Default "md". */
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES: Record<NonNullable<PriceProps["size"]>, string> = {
  sm: "text-[length:var(--text-sm)]",
  md: "text-[length:var(--fs-item,var(--text-item-lg))]",
  lg: "text-[length:var(--text-title-lg)]",
};

function format(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount);
  } catch {
    return `$${amount}`;
  }
}

export function Price({
  amount,
  currency = "USD",
  compareAt,
  size = "md",
  className = "",
}: PriceProps): ReactElement {
  return (
    <span
      className={`inline-flex items-baseline gap-[var(--space-2)] font-[family-name:var(--font-body)] text-[var(--text-strong)] ${SIZES[size]} ${className}`}
    >
      <span>{format(amount, currency)}</span>
      {compareAt != null && compareAt > amount && (
        /* 0.85em is relative to the price it annotates — deliberately not a scale rung */
        <span className="text-[0.85em] text-[var(--text-meta)] line-through">
          {format(compareAt, currency)}
        </span>
      )}
    </span>
  );
}
