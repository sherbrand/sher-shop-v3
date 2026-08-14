import React from "react";
import { Price } from "./Price.jsx";

/* ProductCard — the unit of the product grid (F-001). Media over an optional
   `category` eyebrow + title on the left with the price right-aligned on the same
   row. Pass a `media` node (e.g. an <image-slot> or <img>) for the image, or a
   `src`; with neither it renders a tonal placeholder. Sold-out dims + badges it. */

export function ProductCard({
  title,
  price,
  currency = "USD",
  compareAt,
  category,
  href = "#",
  src,
  media,
  soldOut = false,
  className = "",
  style = {},
}) {
  const [hover, setHover] = React.useState(false);
  const titleStyle = {
    fontFamily: "var(--font-body)", fontSize: "var(--fs-item, var(--size-item-lg))",
    color: "var(--text-strong)",
    textDecoration: hover ? "underline" : "none", textUnderlineOffset: "0.25em",
  };
  const eyebrowStyle = {
    display: "block", fontFamily: "var(--font-body)", fontSize: "var(--size-xs)",
    letterSpacing: "var(--tracking-label)", textTransform: "uppercase",
    color: "var(--text-meta)", marginBottom: "var(--space-1)",
  };
  return (
    <a href={href} className={className}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "block", textDecoration: "none", color: "var(--text-strong)", ...style }}>
      <div style={{ position: "relative", aspectRatio: "var(--ratio-3-4)", overflow: "hidden",
        borderRadius: "var(--radius-sm)", background: "var(--surface-raised)",
        marginBottom: "var(--space-3)" }}>
        {media ? media : src ? (
          <img src={src} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover",
            transform: hover ? "scale(1.03)" : "scale(1)",
            transition: "transform var(--dur-slow) var(--ease-out)" }} />
        ) : (
          <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
            justifyContent: "center", color: "var(--text-muted)", fontFamily: "var(--font-body)",
            fontSize: "var(--size-xs)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase" }}>
            {title}</span>
        )}
        {soldOut && (
          <span style={{ position: "absolute", top: "var(--space-3)", left: "var(--space-3)",
            background: "var(--surface-page)", color: "var(--text-strong)",
            fontFamily: "var(--font-body)", fontSize: "var(--size-xs)", letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase", padding: "var(--space-1) var(--pad-pill-y)", borderRadius: "var(--radius-sm)" }}>
            Sold Out</span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "flex-start",
        justifyContent: "space-between", gap: "var(--space-4)" }}>
        <span style={{ minWidth: 0 }}>
          {category && <span style={eyebrowStyle}>{category}</span>}
          <span style={{ ...titleStyle, display: "block" }}>{title}</span>
        </span>
        {price != null && (
          <Price amount={price} currency={currency} compareAt={compareAt} size="md"
            style={{ flexShrink: 0, textAlign: "right" }} />
        )}
      </div>
    </a>
  );
}
