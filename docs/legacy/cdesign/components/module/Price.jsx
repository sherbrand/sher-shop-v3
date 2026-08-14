import React from "react";

/* SHER price — formats a money amount in the brand's serif. Checkout settles in
   USD (F-006); currency defaults to USD. Optional strikethrough compare-at price. */

function fmt(amount, currency) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency", currency,
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount);
  } catch {
    return "$" + amount;
  }
}

export function Price({
  amount,
  currency = "USD",
  compareAt,
  size = "md",       // "sm" | "md" | "lg"
  className = "",
  style = {},
}) {
  const fs = { sm: "var(--text-sm)", md: "var(--fs-item, var(--text-item-lg))", lg: "var(--text-title-lg)" }[size];
  return (
    <span className={className} style={{
      fontFamily: "var(--font-body)", color: "var(--text-strong)", fontSize: fs,
      display: "inline-flex", alignItems: "baseline", gap: "var(--space-2)", ...style,
    }}>
      <span>{fmt(amount, currency)}</span>
      {compareAt != null && compareAt > amount && (
        <span style={{
          color: "var(--text-meta)", textDecoration: "line-through",
          fontSize: "0.85em", /* relative to the price it annotates — intentionally not a scale rung */
        }}>{fmt(compareAt, currency)}</span>
      )}
    </span>
  );
}
