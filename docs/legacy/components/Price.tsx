import type { ReactElement, CSSProperties } from "react";

/* SHER price — formats a money amount in the brand serif. Checkout settles in
   USD; currency defaults to USD. Optional strikethrough compare-at price. */

export interface PriceProps {
  /** Amount in major units (e.g. 240 = $240). */
  amount: number;
  /** ISO currency code. Default "USD". */
  currency?: string;
  /** Original price to show struck-through (only shown if greater than amount). */
  compareAt?: number;
  /** Size. Default "md". */
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
}

function fmt(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency", currency,
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount);
  } catch {
    return "$" + amount;
  }
}

const SIZE: Record<string, string> = {
  sm: "text-[0.875rem]",
  md: "text-[length:var(--text-md)]",
  lg: "text-[1.5rem]",
};

export function Price({
  amount,
  currency = "USD",
  compareAt,
  size = "md",
  className = "",
  style,
}: PriceProps): ReactElement {
  return (
    <span
      className={`inline-flex items-baseline gap-[var(--space-2)] font-[family-name:var(--font-body)] text-[var(--text-strong)] ${SIZE[size]} ${className}`}
      style={style}
    >
      <span>{fmt(amount, currency)}</span>
      {compareAt != null && compareAt > amount && (
        <span className="text-[0.85em] text-[var(--text-muted)] line-through">{fmt(compareAt, currency)}</span>
      )}
    </span>
  );
}
