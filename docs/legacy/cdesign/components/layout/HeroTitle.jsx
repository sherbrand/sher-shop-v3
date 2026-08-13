import React from "react";
import { Heading } from "../module/Heading.jsx";
import { Breadcrumb } from "../module/Breadcrumb.jsx";

/* HeroTitle — an editorial title band: an optional breadcrumb, optional eyebrow, a
   heading, an optional lead description, and optional actions (buttons) below.
   Centered or left-aligned. Font sizes step against the band's OWN width via
   container queries (tokens/components.css) — no page CSS, no JS measurement. */

export function HeroTitle({
  breadcrumb,
  eyebrow,
  heading,
  headingLevel = 1,
  description,
  align = "center",      // "center" | "start"
  measure = "68ch",       // description max line length
  headingFont = "display",
  headingMeasure = "34ch",
  background,
  children,               // actions (e.g. buttons)
  className = "",
  style = {},
}) {
  const start = align === "start";
  // "body" sets the heading in Cardo, title case, untracked (the display face is
  // uppercase + tracked, which Cardo's larger x-height doesn't need)
  const headingStyle = {
    margin: 0, fontFamily: "var(--font-display)", textTransform: "uppercase",
    letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-tight)",
    color: "var(--text-strong)", fontWeight: 400,
    maxWidth: headingMeasure,
  };
  if (headingFont === "body") {
    headingStyle.fontFamily = "var(--font-body)";
    headingStyle.textTransform = "none";
    headingStyle.letterSpacing = "0";
  }
  return (
    <section
      className={"sher-band " + className}
      style={{
        padding: "var(--space-8) var(--gutter)",
        background: background || "transparent",
        ...style,
      }}
    >
      <div style={{
        maxWidth: "var(--container)", margin: "0 auto", display: "flex",
        flexDirection: "column", gap: "var(--space-3)",
        alignItems: start ? "flex-start" : "center",
        textAlign: start ? "left" : "center",
      }}>
        {breadcrumb && breadcrumb.length > 0 && (
          <Breadcrumb items={breadcrumb} style={{ marginBottom: "var(--space-2)" }} />
        )}
        {eyebrow && (
          <span style={{
            fontFamily: "var(--font-body)", fontSize: "var(--text-xs)",
            letterSpacing: "var(--tracking-label)", textTransform: "uppercase",
            color: "var(--text-meta)",
          }}>{eyebrow}</span>
        )}
        <Heading level={headingLevel} className="t-display" style={headingStyle}>{heading}</Heading>
        {description && (
          <p className="t-body" style={{
            margin: 0, color: "var(--text-default)",
            lineHeight: "var(--leading-normal)", maxWidth: measure,
          }}>{description}</p>
        )}
        {children && (
          <div style={{
            display: "flex", gap: "var(--space-3)", flexWrap: "wrap",
            marginTop: "var(--space-3)",
            justifyContent: start ? "flex-start" : "center",
          }}>{children}</div>
        )}
      </div>
    </section>
  );
}
