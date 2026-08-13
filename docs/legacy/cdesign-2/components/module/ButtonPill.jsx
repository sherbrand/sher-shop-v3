import React from "react";

/* SHER pill button — the rounded filter / category control used by the attribute
   filter (F-002) and the Shop category links. Active pills invert to dark. */

export function ButtonPill({
  children,
  active = false,
  as = "button",
  className = "",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = as;

  const bg = active
    ? "var(--surface-inverse)"
    : hover ? "var(--surface-raised)" : "transparent";
  const color = active ? "var(--text-on-inverse)" : "var(--text-strong)";
  const borderColor = active ? "var(--surface-inverse)" : "var(--border-strong)";

  return (
    <Tag
      className={className}
      aria-pressed={as === "button" ? active : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-button)", textTransform: "uppercase", fontWeight: 500,
        fontSize: "var(--size-xs)", letterSpacing: "var(--tracking-label)", lineHeight: 1,
        padding: "var(--pad-pill-y) var(--pad-pill-x)", borderRadius: "var(--radius-pill)",
        border: "1px solid " + borderColor, background: bg, color,
        cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap",
        transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
