import React from "react";
import { Heading } from "../module/Heading.jsx";

/* ShopEditorial — the two-up editorial band used across the Shop and category
   pages: a media panel beside a text column (eyebrow, heading, paragraph, optional
   actions). `mirror` swaps the sides once the band is two-up; stacked, `mobileFirst`
   chooses whether the media or the text leads and `mobileAlign` can push the copy to
   the right edge.

   Everything responsive is driven by CSS container queries on the band's OWN width
   (tokens/components.css) — no JS measurement, no breakpoint props:
     mobile  (<640)   gap 24  crop 4:3
     tablet  (>=640)  gap 24  crop 1:1   two-up from 768
     desktop (>=1024) gap 64  crop 5:4
   Override a placement with the `gap` / `ratio` props, or set --editorial-gap. */

export function ShopEditorial({
  eyebrow,
  heading,
  headingLevel = 2,
  headingFont = "display",
  paragraph,
  media,
  mirror = false,
  mobileFirst = "media",
  mobileAlign = "left",
  gap,
  ratio,
  background,
  children,
  className = "",
  style = {},
}) {
  // self-contained heading treatment — never relies on a page loading base.css
  const headingStyle = { margin: 0, maxWidth: "24ch",
    fontFamily: "var(--font-display)", textTransform: "uppercase",
    letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-snug)",
    color: "var(--text-strong)", fontWeight: 400 };
  // "body" sets the heading in Cardo, title case, untracked — a softer editorial voice
  if (headingFont === "body") {
    headingStyle.fontFamily = "var(--font-body)";
    headingStyle.textTransform = "none";
    headingStyle.letterSpacing = "0";
  }

  const cls = ["sher-band", className].filter(Boolean).join(" ");
  const inner = ["sher-editorial",
    mirror ? "mirror" : "",
    mobileFirst === "text" ? "first-text" : "",
    mobileAlign === "right" ? "align-right" : ""].filter(Boolean).join(" ");

  return (
    <div className={cls} style={{ background, ...style }}>
      <div className={inner} style={gap ? { "--editorial-gap": gap } : undefined}>
        <div className={"media" + (ratio ? "" : " crop")}
          style={{ position: "relative", background: "var(--surface-raised)",
            overflow: "hidden", aspectRatio: ratio || undefined }}>{media}</div>

        <div className="txt" style={{ display: "flex", flexDirection: "column",
          justifyContent: "center", gap: "var(--space-3)" }}>
          {eyebrow && <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-xs)",
            letterSpacing: "var(--tracking-label)", textTransform: "uppercase",
            color: "var(--text-meta)" }}>{eyebrow}</span>}
          <Heading level={headingLevel} className="hd t-section" style={headingStyle}>{heading}</Heading>
          {paragraph && <p className="t-body" style={{ margin: 0, color: "var(--text-default)",
            lineHeight: "var(--leading-normal)", maxWidth: "62ch" }}>{paragraph}</p>}
          {children && <div className="actions" style={{ marginTop: "var(--space-2)",
            display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>{children}</div>}
        </div>
      </div>
    </div>
  );
}
