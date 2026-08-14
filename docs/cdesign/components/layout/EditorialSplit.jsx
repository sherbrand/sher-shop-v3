import React from "react";
import { Heading } from "../module/Heading.jsx";

/* EditorialSplit — the two-up editorial band used on the About page: a media panel
   beside a text column (eyebrow, heading, paragraph, optional actions). `mirror`
   swaps the sides once two-up; stacked, `mobileFirst` chooses which leads.

   Everything responsive is driven by CSS container queries on the band's OWN width
   (tokens/components.css) — no JS measurement, no breakpoint props. Media keeps a
   fixed 4:5 crop; for the Shop pages' stepped crop use C-ShopEditorial. */

export function EditorialSplit({
  eyebrow,
  heading,
  headingLevel = 2,
  paragraph,
  media,
  mirror = false,
  mobileFirst = "media",
  mediaRounded = false,
  background,
  children,
  className = "",
  style = {},
}) {
  const cls = ["sher-band", className].filter(Boolean).join(" ");
  const inner = ["sher-editorial",
    mirror ? "mirror" : "",
    mobileFirst === "text" ? "first-text" : ""].filter(Boolean).join(" ");

  return (
    <div className={cls} style={{ background, ...style }}>
      <div className={inner}>
        <div className="media" style={{ position: "relative", aspectRatio: "var(--ratio-4-5)",
          background: "var(--surface-raised)", overflow: "hidden",
          borderRadius: mediaRounded ? "var(--radius-sm)" : 0 }}>{media}</div>

        <div className="txt" style={{ display: "flex", flexDirection: "column",
          justifyContent: "center", gap: "var(--space-3)" }}>
          {eyebrow && <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-xs)",
            letterSpacing: "var(--tracking-label)", textTransform: "uppercase",
            color: "var(--text-meta)" }}>{eyebrow}</span>}
          <Heading level={headingLevel} className="hd t-section"
            style={{ margin: 0, maxWidth: "24ch",
              fontFamily: "var(--font-display)", textTransform: "uppercase",
            letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-snug)",
            color: "var(--text-strong)", fontWeight: 400, }}>{heading}</Heading>
          {paragraph && <p className="t-body" style={{ margin: 0, color: "var(--text-default)",
            lineHeight: "var(--leading-normal)", maxWidth: "62ch" }}>{paragraph}</p>}
          {children && <div className="actions" style={{ marginTop: "var(--space-2)",
            display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>{children}</div>}
        </div>
      </div>
    </div>
  );
}
