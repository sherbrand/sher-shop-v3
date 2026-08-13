import React from "react";

/* SizeSelector — the product page's size chips. Sold-out sizes render disabled
   with a struck label; the selected chip inverts to the dark fill. Controlled
   (`value`/`onChange`) or uncontrolled. */

export function SizeSelector({
  sizes = [],
  value,
  defaultValue,
  onChange,
  label = "Size",
  className = "",
  style = {},
}) {
  const first = sizes.find((s) => !s.soldOut);
  const [internal, setInternal] = React.useState(defaultValue ?? (first ? first.label : null));
  const val = value !== undefined ? value : internal;
  const set = (s) => {
    if (s.soldOut) return;
    if (value === undefined) setInternal(s.label);
    onChange && onChange(s.label);
  };
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column",
      gap: "var(--space-3)", ...style }}>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-xs)",
        letterSpacing: "var(--tracking-label)", textTransform: "uppercase",
        color: "var(--text-meta)" }}>{label}</span>
      <div role="group" aria-label={label}
        style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
        {sizes.map((s) => {
          const active = s.label === val;
          return (
            <button key={s.label} type="button" disabled={s.soldOut}
              aria-pressed={active} aria-label={s.soldOut ? `${s.label} — sold out` : s.label}
              onClick={() => set(s)}
              style={{
                minWidth: 48, minHeight: 44, padding: "0 var(--space-3)",
                fontFamily: "var(--font-button)", textTransform: "uppercase",
                fontSize: "var(--size-xs)", letterSpacing: "var(--tracking-label)",
                border: "1px solid " + (active ? "var(--surface-inverse)" : "var(--border-strong)"),
                borderRadius: "var(--radius-sm)",
                background: active ? "var(--surface-inverse)" : "transparent",
                color: active ? "var(--text-on-inverse)" : "var(--text-strong)",
                textDecoration: s.soldOut ? "line-through" : "none",
                opacity: s.soldOut ? 0.35 : 1,
                cursor: s.soldOut ? "not-allowed" : "pointer",
                transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
              }}>{s.label}</button>
          );
        })}
      </div>
    </div>
  );
}
