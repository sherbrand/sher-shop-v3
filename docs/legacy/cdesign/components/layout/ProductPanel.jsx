import React from "react";
import { Heading } from "../module/Heading.jsx";
import { Breadcrumb } from "../module/Breadcrumb.jsx";
import { Button } from "../module/Button.jsx";
import { Price } from "../module/Price.jsx";
import { QuantityStepper } from "../module/QuantityStepper.jsx";
import { SizeSelector } from "../module/SizeSelector.jsx";
import { MediaGallery } from "./MediaGallery.jsx";

/* ProductPanel — the product page's main band (S-006): the media gallery beside
   the purchase column (breadcrumb, name, price, description, type attribute, size,
   quantity, buy buttons, and the size-chart / shipping drawer links). Stacks to one
   column below 768px via a CSS container query on its OWN width. When every size
   is sold out the buy buttons swap to a Preorder link. Set `stacked` to keep the
   band one column at every width. */


export function ProductPanel({
  breadcrumb = [],
  name,
  headingLevel = 1,
  price,
  compareAt,
  currency = "USD",
  description,
  attributeLabel,        // e.g. "Closure Type"
  attributeValue,        // e.g. "Lace Closure"
  sizes = [],
  size,
  onSize,
  quantity,
  onQuantity,
  media = [],
  onAddToCart,
  onBuyNow,
  onSizeChart,
  onShipping,
  preorderHref = "/contact",
  stacked = false,
  className = "",
  style = {},
}) {
  const allSoldOut = sizes.length > 0 && sizes.every((s) => s.soldOut);

  const linkStyle = {
    background: "none", border: "none", padding: 0, cursor: "pointer",
    fontFamily: "var(--font-body)", fontSize: "var(--text-sm)",
    color: "var(--text-strong)", textDecoration: "underline",
    textUnderlineOffset: "0.25em", textAlign: "left",
  };

  return (
    <div className={"sher-band " + className} style={style}>
      <div className={"sher-productpanel" + (stacked ? " stacked" : "")}>
      <MediaGallery media={media} />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        {breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}

        <Heading level={headingLevel} className="t-hero" style={{ margin: 0, maxWidth: "24ch" }}>
          {name}
        </Heading>

        {price != null && <Price amount={price} compareAt={compareAt} currency={currency} size="lg" />}

        {sizes.length > 0 && <SizeSelector sizes={sizes} value={size} onChange={onSize} />}

        {!allSoldOut && (
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)",
            flexWrap: "wrap" }}>
            <QuantityStepper value={quantity} onChange={onQuantity} />
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          {allSoldOut ? (
            <Button as="a" href={preorderHref} variant="primary" size="lg" fullWidth>
              Preorder
            </Button>
          ) : (
            <>
              <Button variant="primary" size="lg" fullWidth onClick={onAddToCart}>Add to Cart</Button>
              <Button variant="accent" size="lg" fullWidth onClick={onBuyNow}>Buy Now</Button>
            </>
          )}
        </div>

        {/* PRD outline: the paragraph and type attribute sit BELOW the buy buttons */}
        {(description || attributeValue) && (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)",
            paddingTop: "var(--space-2)" }}>
            {description && (
              <p className="t-body" style={{ margin: 0, color: "var(--text-default)",
                lineHeight: "var(--leading-normal)", maxWidth: "56ch" }}>{description}</p>
            )}
            {attributeValue && (
              <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "var(--text-sm)",
                color: "var(--text-meta)" }}>
                {attributeLabel ? `${attributeLabel}: ` : ""}
                <span style={{ color: "var(--text-strong)" }}>{attributeValue}</span>
              </p>
            )}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)",
          paddingTop: "var(--space-2)" }}>
          <button type="button" style={linkStyle} onClick={onSizeChart}>View Size Chart</button>
          <button type="button" style={linkStyle} onClick={onShipping}>Shipping &amp; Returns</button>
        </div>
        </div>
      </div>
    </div>
  );
}
