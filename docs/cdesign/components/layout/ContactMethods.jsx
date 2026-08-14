import React from "react";
import { Heading } from "../module/Heading.jsx";
import { Icon } from "../module/Icon.jsx";

/* ContactMethods — the stacked contact band: one row per method, each a heading
   over its content. Three kinds: "social" (brand-mark links), "email" (mailto
   link), "address" (plain address text). Rows are hairline-separated. */

export function ContactMethods({
  items = [],
  headingLevel = 2,
  className = "",
  style = {},
}) {
  const linkStyle = {
    fontFamily: "var(--font-body)",
    color: "var(--text-strong)", textDecoration: "underline",
    textUnderlineOffset: "0.25em",
  };
  return (
    <div className={"sher-band sher-contactmethods " + className} style={{ display: "flex", flexDirection: "column", ...style }}>
      {items.map((it, i) => (
        <div key={i} style={{
          display: "flex", flexDirection: "column", gap: "var(--space-3)",
          padding: "var(--space-6) 0",
          borderTop: i === 0 ? "1px solid var(--border-default)" : "none",
          borderBottom: "1px solid var(--border-default)",
        }}>
          <Heading level={headingLevel} style={{ margin: 0,
            fontFamily: "var(--font-display)", textTransform: "uppercase",
            letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-snug)",
            color: "var(--text-strong)", fontWeight: 400,
            fontSize: "var(--size-sub)" }}>{it.heading}</Heading>

          {it.kind === "social" && (
            <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "center" }}>
              {(it.links || []).map((l) => (
                <a key={l.label} href={l.href} aria-label={l.label} target="_blank" rel="noreferrer"
                  style={{ color: "var(--text-strong)", display: "inline-flex" }}>
                  <Icon name={l.icon} size={24} />
                </a>
              ))}
            </div>
          )}

          {it.kind === "email" && (
            <a href={`mailto:${it.value}`} className="t-body" style={linkStyle}>{it.value}</a>
          )}

          {it.kind === "address" && (
            <address className="t-body" style={{ margin: 0, fontStyle: "normal", color: "var(--text-default)",
              lineHeight: "var(--leading-normal)", whiteSpace: "pre-line" }}>{it.value}</address>
          )}
        </div>
      ))}
    </div>
  );
}
