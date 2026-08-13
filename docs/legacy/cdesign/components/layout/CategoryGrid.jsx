import React from "react";
import { Heading } from "../module/Heading.jsx";

/* CategoryGrid — a full-bleed grid of category tiles. One column on mobile, two
   at/above 640px (CSS container query). Each tile is a portrait crop (3:4) with a media layer
   (image or a passed node, e.g. an image slot) under a bottom gradient label.
   Labels alternate bottom-left / bottom-right per tile. Hairline gaps between. */


export function CategoryGrid({
  items = [],
  headingLevel = 2,
  alternate = true,       // alternate label align left / right per tile
  className = "",
  style = {},
}) {
  return (
    <div className={"sher-band " + className} style={{ background: "var(--border-default)", ...style }}>
      <div className="sher-categorygrid">
      {items.map((it, i) => {
        const right = alternate && i % 2 === 1;
        return (
          <a key={it.id || i} href={it.href} style={{
            position: "relative", aspectRatio: "var(--ratio-4-5)",
            textDecoration: "none", overflow: "hidden", display: "block",
          }}>
            <div style={{ position: "absolute", inset: 0,
              background: it.image ? `center/cover no-repeat url("${it.image}")` : (it.bg || "var(--surface-raised)") }}>
              {it.media}
            </div>
            <span style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "flex-end",
              justifyContent: right ? "flex-end" : "flex-start", padding: "var(--space-6)",
              background: "linear-gradient(180deg,transparent 55%,var(--scrim) 100%)",
              pointerEvents: "none",
            }}>
              <Heading level={headingLevel} className="t-section" style={{
                margin: 0, color: "var(--sher-white)", fontFamily: "var(--font-display)",
                textTransform: "uppercase", letterSpacing: "var(--tracking-display)", fontWeight: 400,
                textAlign: right ? "right" : "left",
              }}>{it.label}</Heading>
            </span>
          </a>
        );
      })}
      </div>
    </div>
  );
}
