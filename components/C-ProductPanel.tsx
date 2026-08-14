"use client";

import type { ReactElement } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";
import { Breadcrumb } from "@/components/Breadcrumb";
import type { Crumb } from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { Price } from "@/components/Price";
import { QuantityStepper } from "@/components/QuantityStepper";
import { SizeSelector } from "@/components/SizeSelector";
import type { SizeOption } from "@/components/SizeSelector";
import { MediaGallery } from "@/components/MediaGallery";
import type { MediaItem } from "@/components/MediaGallery";

/* C-ProductPanel — the product page's main band: the media gallery beside the
   purchase column (breadcrumb, name, price, description, type attribute, size,
   quantity, buy buttons, and the size-chart / shipping drawer links). Stacks to one
   column below 768px of its OWN width. When every size is sold out the buy buttons
   swap to a Preorder link. Set `stacked` to keep the band one column at every width. */

export interface ProductPanelProps {
  breadcrumb?: Crumb[];
  /** Product name. */
  name?: string;
  /** HTML level (h1–h4) for the name — changes the tag only, not the style. Default 1. */
  headingLevel?: HeadingLevel;
  price?: number;
  compareAt?: number;
  currency?: string;
  description?: string;
  /** Type-attribute label, e.g. "Closure Type" / "Set Type" / "Length". */
  attributeLabel?: string;
  /** Type-attribute value, e.g. "Lace Closure". */
  attributeValue?: string;
  sizes?: SizeOption[];
  size?: string | null;
  onSize?: (label: string) => void;
  quantity?: number;
  onQuantity?: (n: number) => void;
  /** Gallery media — video first, then images. */
  media?: MediaItem[];
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  /** Opens C-Sizing. */
  onSizeChart?: () => void;
  /** Opens C-Shipping. */
  onShipping?: () => void;
  /** Where Preorder points when every size is sold out. Default "/contact". */
  preorderHref?: string;
  /** Keep the band one column at every width. Default false. */
  stacked?: boolean;
  className?: string;
}

// Stepped sizes, resolved against the band's own width.
const STEP_HERO =
  "text-[length:var(--size-hero-sm)] @min-[640px]:text-[length:var(--size-hero-md)] @min-[1024px]:text-[length:var(--size-hero-lg)]";
const STEP_BODY =
  "text-[length:var(--size-body-sm)] @min-[640px]:text-[length:var(--size-body-md)] @min-[1024px]:text-[length:var(--size-body-lg)]";

const DRAWER_LINK =
  "cursor-pointer border-none bg-none p-0 text-left font-[family-name:var(--font-body)] text-[length:var(--size-sm)] text-[var(--text-strong)] underline underline-offset-[0.25em]";

export function ProductPanel({
  breadcrumb = [],
  name,
  headingLevel = 1,
  price,
  compareAt,
  currency = "USD",
  description,
  attributeLabel,
  attributeValue,
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
}: ProductPanelProps): ReactElement {
  const allSoldOut = sizes.length > 0 && sizes.every((s) => s.soldOut);

  return (
    <div className={`@container ${className}`}>
      <div
        className={[
          "grid grid-cols-1 items-start gap-[var(--space-6)] @min-[1024px]:gap-[var(--space-8)]",
          stacked
            ? ""
            : "@min-[768px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] @min-[768px]:gap-[var(--space-7)]",
        ].join(" ")}
      >
        <MediaGallery media={media} />

        <div className="flex flex-col gap-[var(--space-4)]">
          {breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}

          <Heading
            level={headingLevel}
            className={`m-0 max-w-[24ch] font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)] ${STEP_HERO}`}
          >
            {name}
          </Heading>

          {price != null && (
            <Price amount={price} compareAt={compareAt} currency={currency} size="lg" />
          )}

          {sizes.length > 0 && <SizeSelector sizes={sizes} value={size} onChange={onSize} />}

          {!allSoldOut && (
            <div className="flex flex-wrap items-center gap-[var(--space-4)]">
              <QuantityStepper value={quantity} onChange={onQuantity} />
            </div>
          )}

          <div className="flex flex-col gap-[var(--space-3)]">
            {allSoldOut ? (
              <Button as="a" href={preorderHref} variant="primary" size="lg" fullWidth>
                Preorder
              </Button>
            ) : (
              <>
                <Button variant="surface" size="lg" fullWidth onClick={onAddToCart}>
                  Add to Cart
                </Button>
                <Button variant="accent" size="lg" fullWidth onClick={onBuyNow}>
                  Buy Now
                </Button>
              </>
            )}
          </div>

          {/* The paragraph and type attribute sit BELOW the buy buttons, per the outline. */}
          {(description || attributeValue) && (
            <div className="flex flex-col gap-[var(--space-3)] pt-[var(--space-2)]">
              {description && (
                <p
                  className={`m-0 max-w-[56ch] leading-[var(--leading-normal)] text-[var(--text-default)] ${STEP_BODY}`}
                >
                  {description}
                </p>
              )}
              {attributeValue && (
                <p className="m-0 font-[family-name:var(--font-body)] text-[length:var(--size-sm)] text-[var(--text-meta)]">
                  {attributeLabel ? `${attributeLabel}: ` : ""}
                  <span className="text-[var(--text-strong)]">{attributeValue}</span>
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-[var(--space-2)] pt-[var(--space-2)]">
            <button type="button" className={DRAWER_LINK} onClick={onSizeChart}>
              View Size Chart
            </button>
            <button type="button" className={DRAWER_LINK} onClick={onShipping}>
              Shipping &amp; Returns
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
