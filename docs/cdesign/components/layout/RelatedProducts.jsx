import React from "react";
import { Heading } from "../module/Heading.jsx";
import { Button } from "../module/Button.jsx";
import { ProductGrid } from "./ProductGrid.jsx";

/* RelatedProducts — the "You May Also Like" band (S-006): a heading, subtitle and
   an actions row BESIDE a small grid of same-category products, per the PRD
   outline's `(text) | Product Grid`. The actions row holds the Back to Category
   button plus any `children` passed alongside it, side by side or one per row
   (`actionsLayout`), with the back button's fill set by `backVariant`. Stacked, one
   `actionsMeasure` cap on the row keeps every button the same width. Stacks below 768px via a CSS
   container query on the band's own width — no JS measurement. */


export function RelatedProducts({
  heading = "You May Also Like",
  headingLevel = 2,
  subtitle,
  backLabel,
  backHref,
  products = [],
  columns = "1/2/2",
  backVariant = "secondary",
  actionsLayout = "row",
  actionsMeasure = "34ch",
  children,
  className = "",
  style = {},
}) {
  return (
    <div className={"sher-band " + className} style={style}>
      <div className="sher-related">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)",
          alignItems: "flex-start" }}>
          <Heading level={headingLevel} className="t-section" style={{ margin: 0,
            fontFamily: "var(--font-display)", textTransform: "uppercase",
            letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-snug)",
            color: "var(--text-strong)", fontWeight: 400, }}>{heading}</Heading>
          {subtitle && <p className="t-body" style={{ margin: 0, color: "var(--text-default)",
            lineHeight: "var(--leading-normal)", maxWidth: "40ch" }}>{subtitle}</p>}
          {(backLabel && backHref) || children ? (
            <div style={{ display: "flex", gap: "var(--space-3)",
              marginTop: "var(--space-2)",
              // "stack" puts one button per row, each filling the text column
              flexDirection: actionsLayout === "stack" ? "column" : "row",
              alignItems: actionsLayout === "stack" ? "stretch" : "center",
              alignSelf: actionsLayout === "stack" ? "stretch" : "auto",
              // one cap on the row keeps both buttons exactly the same width
              maxWidth: actionsLayout === "stack" ? actionsMeasure : undefined,
              flexWrap: actionsLayout === "stack" ? "nowrap" : "wrap" }}>
              {backLabel && backHref && (
                <Button as="a" href={backHref} variant={backVariant}
                  fullWidth={actionsLayout === "stack"}>{backLabel}</Button>
              )}
              {children}
            </div>
          ) : null}
        </div>
        <ProductGrid products={products} columns={columns} showToolbar={false} />
      </div>
    </div>
  );
}
