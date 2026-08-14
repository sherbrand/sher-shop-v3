import React from "react";
import { Heading } from "../module/Heading.jsx";

/* FeatureColumns — an eyebrow + heading over a row of 2–3 columns, each a media
   panel with its own subheading and paragraph. Used for the "pick your closure /
   set type / length" comparison bands. Columns stack on mobile. */


export function FeatureColumns({
  eyebrow,
  heading,
  headingLevel = 2,
  itemHeadingLevel = 3,
  items = [],
  className = "",
  style = {},
}) {
  return (
    <div className={"sher-band " + className}
      style={{ "--fc-count": items.length, ...style }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)",
        marginBottom: "var(--space-7)" }}>
        {eyebrow && <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-xs)",
          letterSpacing: "var(--tracking-label)", textTransform: "uppercase",
          color: "var(--text-meta)" }}>{eyebrow}</span>}
        {heading && <Heading level={headingLevel} className="t-section" style={{ margin: 0,
          maxWidth: "34ch",
          fontFamily: "var(--font-display)", textTransform: "uppercase",
            letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-snug)",
            color: "var(--text-strong)", fontWeight: 400, }}>{heading}</Heading>}
      </div>
      <div className="sher-featurecols">
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            <div style={{ position: "relative", aspectRatio: "var(--ratio-4-5)",
              background: "var(--surface-raised)", overflow: "hidden" }}>{it.media}</div>
            <Heading level={itemHeadingLevel} style={{ margin: 0,
              fontFamily: "var(--font-display)", textTransform: "uppercase",
              letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-snug)",
              color: "var(--text-strong)", fontWeight: 400,
              fontSize: "var(--size-sub)" }}>{it.heading}</Heading>
            <p className="t-body" style={{ margin: 0, color: "var(--text-default)",
              lineHeight: "var(--leading-normal)" }}>{it.paragraph}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
