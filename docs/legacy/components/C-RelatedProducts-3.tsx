import type { CSSProperties, ReactElement, ReactNode } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";
import { Button } from "@/components/Button";
import { ProductGrid } from "@/components/C-ProductGrid";
import type { GridProduct } from "@/components/C-ProductGrid";

/* C-RelatedProducts — the "You May Also Like" band: a heading, subtitle and an
   actions row BESIDE a small grid of same-category products. The actions row holds
   the Back to Category button plus any `children` passed alongside it, side by side
   or one per row (`actionsLayout`), with the back button's fill set by
   `backVariant`. Stacked, one `actionsMeasure` cap on the ROW (not each button)
   keeps every button the same width. Stacks below 768px of the band's own width. */

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
  /** Columns as "mobile/tablet/desktop" when stacked. Default "1/2/2". */
  columns?: string;
  /** Fill for the Back to Category button. Default "secondary". */
  backVariant?: "primary" | "accent" | "secondary" | "ghost";
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
}: RelatedProductsProps): ReactElement {
  const stack = actionsLayout === "stack";
  const hasActions = Boolean((backLabel && backHref) || children);

  return (
    <div className={`@container ${className}`}>
      <div className="grid grid-cols-1 items-start gap-[var(--space-5)] @min-[768px]:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] @min-[768px]:gap-[var(--space-8)]">
        <div className="flex flex-col items-start gap-[var(--space-3)] @min-[768px]:self-center">
          <Heading
            level={headingLevel}
            className={`m-0 font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)] ${STEP_SECTION}`}
          >
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
