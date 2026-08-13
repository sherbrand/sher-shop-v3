import React from "react";

/* SHER button — Cormorant Infant, UPPERCASE, tracked.
   primary   : dark fill, light text (strong CTA — Add to Cart, Checkout)
   secondary : hairline outline, dark text (fills on hover)
   ghost     : text only, underline on hover
   accent    : primary fill, dark text (AA) — softer emphasis */

const SIZES = {
  sm: { fontSize: "var(--text-xs)", padding: "var(--space-2) var(--space-4)", letterSpacing: "var(--tracking-control)" },
  md: { fontSize: "var(--text-sm)", padding: "var(--space-3) var(--pad-btn-md)", letterSpacing: "var(--tracking-control)" },
  lg: { fontSize: "var(--text-base)", padding: "var(--space-4) var(--pad-btn-lg)", letterSpacing: "var(--tracking-control)" },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  as = "button",
  className = "",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = as;

  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "var(--space-2)",
    fontFamily: "var(--font-button)", textTransform: "uppercase", fontWeight: 500,
    lineHeight: 1, borderRadius: "var(--radius-sm)", cursor: disabled ? "not-allowed" : "pointer",
    border: "1px solid transparent", width: fullWidth ? "100%" : "auto",
    transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), opacity var(--dur-fast) var(--ease-out)",
    opacity: disabled ? 0.4 : 1, textDecoration: "none", ...SIZES[size],
  };

  const variants = {
    primary: {
      background: hover && !disabled ? "var(--sher-text)" : "var(--surface-inverse)",
      color: "var(--text-on-inverse)", borderColor: "transparent",
    },
    accent: {
      background: hover && !disabled ? "var(--accent-hover)" : "var(--accent)",
      color: "var(--sher-white)", borderColor: "transparent",
    },
    secondary: {
      background: hover && !disabled ? "var(--surface-inverse)" : "transparent",
      color: hover && !disabled ? "var(--text-on-inverse)" : "var(--text-strong)",
      borderColor: "var(--text-strong)",
    },
    ghost: {
      background: "transparent", color: "var(--text-strong)",
      textDecoration: hover && !disabled ? "underline" : "none",
      textUnderlineOffset: "0.3em", padding: SIZES[size].padding, borderColor: "transparent",
    },
  };

  return (
    <Tag
      className={className}
      style={{ ...base, ...variants[variant], ...style }}
      disabled={as === "button" ? disabled : undefined}
      aria-disabled={disabled || undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
