import React from "react";
import { Heading } from "../module/Heading.jsx";
import { Breadcrumb } from "../module/Breadcrumb.jsx";
import { ButtonPill } from "../module/ButtonPill.jsx";

/* ShopTitle — the page header band for Shop and category pages: a breadcrumb,
   a heading, an optional description, and an optional row of filter pills. Left
   aligned. Heading and description sizes step against the band's OWN width via
   container queries (see tokens/components.css) — no page CSS, no JS measurement. */

export function ShopTitle({
  breadcrumb = [],
  heading,
  headingLevel = 1,
  description,
  filters,               // [{ label, href, key, active }]
  activeFilter,          // key of the active filter (alt to per-item active)
  onFilter,              // (key) => void; if set, pills are buttons
  align = "center",      // "center" | "start"
  measure = "78ch",
  className = "",
  style = {},
}) {
  const start = align === "start";
  return (
    <header
      className={"sher-band " + className}
      style={{
        display: "flex", flexDirection: "column", gap: "var(--space-3)",
        alignItems: "stretch",
        textAlign: start ? "left" : "center", ...style,
      }}
    >
      {breadcrumb.length > 0 && <Breadcrumb items={breadcrumb}
        style={{ justifyContent: start ? "flex-start" : "center" }} />}
      <Heading level={headingLevel} className="t-hero" style={{
        margin: 0, fontFamily: "var(--font-display)", textTransform: "uppercase",
        letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-tight)",
        color: "var(--text-strong)", fontWeight: 400,
      }}>{heading}</Heading>
      {description && (
        <p className="t-body" style={{
          margin: 0, color: "var(--text-default)",
          lineHeight: "var(--leading-normal)", maxWidth: measure,
          marginLeft: start ? 0 : "auto", marginRight: start ? 0 : "auto",
        }}>{description}</p>
      )}
      {filters && filters.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)",
          marginTop: "var(--space-2)", justifyContent: start ? "flex-start" : "center" }}>
          {filters.map((f, i) => {
            const active = f.active != null ? f.active : (activeFilter != null && f.key === activeFilter);
            const k = f.key || f.href || f.label || i;
            // a per-item onClick (or a shared onFilter) makes the pill a button; otherwise it's a link
            const handler = f.onClick || (onFilter ? () => onFilter(f.key) : null);
            return handler
              ? <ButtonPill key={k} active={active} onClick={handler}>{f.label}</ButtonPill>
              : <ButtonPill key={k} as="a" href={f.href} active={active}>{f.label}</ButtonPill>;
          })}
        </div>
      )}
    </header>
  );
}
