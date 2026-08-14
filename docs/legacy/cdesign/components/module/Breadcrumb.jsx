import React from "react";

/* Breadcrumb — the page trail (e.g. Home › Shop). Links every crumb except the
   current (last) one. On narrow widths the current label can ellipsis-trim. */

export function Breadcrumb({
  items = [],
  separator = "\u203A",   // ›
  className = "",
  style = {},
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}
      style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "var(--space-2)",
        fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "var(--tracking-control)",
        textTransform: "uppercase", ...style }}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {last || !it.href ? (
              <span aria-current={last ? "page" : undefined}
                style={{ color: last ? "var(--text-strong)" : "var(--text-meta)",
                  maxWidth: "22ch", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {it.label}</span>
            ) : (
              <a href={it.href} style={{ color: "var(--text-meta)", textDecoration: "none" }}>{it.label}</a>
            )}
            {!last && <span aria-hidden="true" style={{ color: "var(--text-muted)", opacity: 0.7 }}>{separator}</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
