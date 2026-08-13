import React from "react";
import { Icon } from "./Icon.jsx";

/* SHER quantity stepper — the − N + control on cart line items and the product
   page. Controlled or uncontrolled; clamps to [min, max]. */

export function QuantityStepper({
  value,
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange,
  size = "md",       // "sm" | "md"
  disabled = false,
  className = "",
  style = {},
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const val = value != null ? value : internal;
  const set = (n) => {
    const clamped = Math.max(min, Math.min(max, n));
    if (value == null) setInternal(clamped);
    onChange && onChange(clamped);
  };
  const dim = size === "sm" ? 30 : 38;
  const btn = (dir, name, dis) => (
    <button
      type="button" aria-label={dir} disabled={dis || disabled}
      onClick={() => set(val + (dir === "increase" ? 1 : -1))}
      style={{
        width: dim, height: dim, display: "inline-flex", alignItems: "center",
        justifyContent: "center", border: "none", background: "transparent",
        color: "var(--text-strong)", cursor: dis || disabled ? "not-allowed" : "pointer",
        opacity: dis || disabled ? 0.3 : 1,
        transition: "opacity var(--dur-fast) var(--ease-out)",
      }}
    >
      <Icon name={name} size={size === "sm" ? 14 : 16} />
    </button>
  );
  return (
    <div
      className={className}
      style={{
        display: "inline-flex", alignItems: "center",
        border: "1px solid var(--border-strong)", borderRadius: "var(--radius-sm)",
        background: "var(--surface-page)", ...style,
      }}
    >
      {btn("decrease", "minus", val <= min)}
      <span style={{
        minWidth: dim, textAlign: "center", fontFamily: "var(--font-body)",
        fontSize: size === "sm" ? "var(--size-sm)" : "var(--size-base)", color: "var(--text-strong)",
        fontVariantNumeric: "tabular-nums",
      }}>{val}</span>
      {btn("increase", "plus", val >= max)}
    </div>
  );
}
