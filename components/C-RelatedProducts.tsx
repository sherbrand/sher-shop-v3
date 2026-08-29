import type { CSSProperties, ReactElement, ReactNode } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";
import { Button } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid } from "@/components/C-ProductGrid";
import type { GridProduct } from "@/components/C-ProductGrid";

/* C-RelatedProducts — the "You May Also Like" band. Two layouts:

   layout="beside" (default) — a heading, subtitle and actions row BESIDE a small
   grid of same-category products. The actions row holds the Back to Category button
   plus any `children`, side by side or one per row (`actionsLayout`); stacked, one
   `actionsMeasure` cap on the ROW keeps every button the same width.

   layout="stacked" — a centred heading block on its own row ABOVE the products,
   which run as a swipe carousel: ~2.2 cells below 1024px so the next card is clipped
   as a scroll cue, then a static 4-up grid from 1024px. The actions become the rail's
   LAST cell, a card-shaped panel, so the row reads as four equal cells rather than a
   grid with a stray button under it.

   Both resolve against the band's own width. */

export interface RelatedProductsProps {
  /** Band heading. Default "You May Also Like". */
  heading?: string;
  /** HTML level (h1–h4) for the heading — tag only, not style. Default 2. */
  headingLevel?: HeadingLevel;
  /** Copy pointing back to the category. */
  subtitle?: string;
  /** Back-to-category button label and target (both required to render it). */
  backLabel?: string;
  backHref?: string;
  products?: GridProduct[];
  /** Band layout. Default "beside". */
  layout?: "beside" | "stacked";
  /** Columns as "mobile/tablet/desktop" when stacked. Default "1/2/2". Ignored when
   *  layout="stacked", whose rail sets its own cell count. */
  columns?: string;
  /** Fill for the Back to Category button. Default "secondary". */
  backVariant?: "primary" | "accent" | "surface" | "tint" | "secondary" | "ghost";
  /** "row" (default) sits the buttons side by side and wraps; "stack" gives each its
   *  own row, every button filling the text column so they match width. */
  actionsLayout?: "row" | "stack";
  /** Max width of the stacked actions row. Default "34ch". Ignored when actionsLayout="row". */
  actionsMeasure?: string;
  /** Extra buttons rendered in the actions row beside the Back to Category button. */
  children?: ReactNode;
  className?: string;
}

// Stepped sizes, resolved against the band's own width.
const STEP_SECTION =
  "text-[length:var(--size-section-sm)] @min-[640px]:text-[length:var(--size-section-md)] @min-[1024px]:text-[length:var(--size-section-lg)]";
const STEP_BODY =
  "text-[length:var(--size-body-sm)] @min-[640px]:text-[length:var(--size-body-md)] @min-[1024px]:text-[length:var(--size-body-lg)]";

const HEADING =
  "m-0 font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)]";

/* ~2.2 cells so the next card is clipped as a scroll cue, then a static 4-up. */
const RAIL = [
  "grid grid-flow-col auto-cols-[calc((100%-1.2*var(--space-4))/2.2)] gap-[var(--space-4)]",
  /* No touch-action override: this rail has no pointer-drag fallback, so
     pan-y would leave a horizontal swipe with nothing to scroll it. */
  "overflow-x-auto snap-x snap-mandatory pb-[var(--space-2)] overscroll-x-contain",
  "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
  "[&>*]:snap-start [&>*]:min-w-0",
  "@min-[768px]:auto-cols-[calc((100%-1.2*var(--space-5))/2.2)] @min-[768px]:gap-[var(--space-5)]",
  "@min-[1024px]:grid-flow-row @min-[1024px]:auto-cols-auto @min-[1024px]:grid-cols-4",
  "@min-[1024px]:overflow-x-visible @min-[1024px]:snap-none @min-[1024px]:pb-0",
].join(" ");

export function RelatedProducts({
  heading = "You May Also Like",
  headingLevel = 2,
  subtitle,
  backLabel,
  backHref,
  products = [],
  layout = "beside",
  columns = "1/2/2",
  backVariant = "secondary",
  actionsLayout = "row",
  actionsMeasure = "34ch",
  children,
  className = "",
}: RelatedProductsProps): ReactElement {
  const isStacked = layout === "stacked";
  const stack = actionsLayout === "stack";
  const hasActions = Boolean((backLabel && backHref) || children);

  if (isStacked) {
    return (
      <div className={`@container ${className}`}>
        <div className="mb-[var(--space-6)] flex flex-col items-center gap-[var(--space-3)] text-center">
          <Heading level={headingLevel} className={`${HEADING} ${STEP_SECTION}`}>
            {heading}
          </Heading>
          {subtitle && (
            <p className={`m-0 leading-[var(--leading-normal)] text-[var(--text-default)] ${STEP_BODY}`}>
              {subtitle}
            </p>
          )}
        </div>

        <div className={RAIL}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              compareAt={product.compareAt}
              soldOut={product.soldOut}
              href={product.href}
              media={product.media}
              category={product.category}
            />
          ))}
          {hasActions && (
            /* The actions cell is card-shaped, so the row reads as equal cells. */
            <div className="flex flex-col justify-center gap-[var(--space-3)] p-[var(--space-5)] aspect-[var(--ratio-3-4)]">
              {backLabel && backHref && (
                <Button as="a" href={backHref} variant={backVariant} fullWidth>
                  {backLabel}
                </Button>
              )}
              {children}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`@container ${className}`}>
      <div className="grid grid-cols-1 items-start gap-[var(--space-5)] @min-[768px]:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] @min-[768px]:gap-[var(--space-8)]">
        <div className="flex flex-col items-start gap-[var(--space-3)] @min-[768px]:self-center">
          <Heading level={headingLevel} className={`${HEADING} ${STEP_SECTION}`}>
            {heading}
          </Heading>
          {subtitle && (
            <p
              className={`m-0 max-w-[40ch] leading-[var(--leading-normal)] text-[var(--text-default)] ${STEP_BODY}`}
            >
              {subtitle}
            </p>
          )}
          {hasActions && (
            <div
              className={[
                "mt-[var(--space-2)] flex gap-[var(--space-3)]",
                // "stack" puts one button per row, each filling the text column
                stack
                  ? "flex-col flex-nowrap items-stretch self-stretch"
                  : "flex-row flex-wrap items-center",
              ].join(" ")}
              // One cap on the row keeps every button exactly the same width.
              style={stack ? ({ maxWidth: actionsMeasure } as CSSProperties) : undefined}
            >
              {backLabel && backHref && (
                <Button as="a" href={backHref} variant={backVariant} fullWidth={stack}>
                  {backLabel}
                </Button>
              )}
              {children}
            </div>
          )}
        </div>

        <ProductGrid products={products} columns={columns} showToolbar={false} />
      </div>
    </div>
  );
}
