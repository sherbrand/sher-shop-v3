import type { CSSProperties, ReactElement, ReactNode } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";
import { Button } from "@/components/Button";
import type { ButtonProps } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";

/* C-ProductCarousel — a centred heading block above a horizontal rail of product cards.
   The generic shape behind S-006's "You May Also Like" and S-001's "Featured Products":
   nothing in it is specific to related products, which is why it is named for what it is
   rather than where it first appeared.

   PEEK — how many cards are in view, as "mobile/tablet/desktop". A fractional count clips
   the next card at the edge, which is the scroll cue: "1.5/2.5/3.5" shows half a card at
   every width, "4" shows four and nothing more. The value is handed to CSS as --peek-sm
   /md/lg and the cell width is computed from the rail's own width, so no JS measures
   anything.

   The rail is the browser's own scroller: scroll-snap-type x mandatory with
   scroll-snap-stop always on the cells, so one swipe moves one card however hard it is
   thrown, and momentum is the platform's rather than an approximation.

   `backLabel`/`backHref` and `children` add a card-shaped actions cell as the rail's LAST
   cell, so the row stays a row of equal cells instead of a grid with a stray button under
   it. Omit them and the rail is products alone.

   `cta` is the other kind of action: one centred button BELOW the rail, for sending the
   reader on from the band rather than back out of it. It sits inside the band, so the
   button picks up the stepped sizes and the stepped CTA measure without the page
   supplying a wrapper. */

export interface CarouselProduct {
  id?: string;
  title: string;
  price: number;
  compareAt?: number;
  soldOut?: boolean;
  href?: string;
  category?: string;
  /** Media node for the card — an <img>, an image slot, or any element. */
  media?: ReactNode;
}

export interface ProductCarouselProps {
  /** Band heading. Omit for a rail with no heading block. */
  heading?: string;
  /** HTML level (h1–h4) for the heading — tag only, not style. Default 2. */
  headingLevel?: HeadingLevel;
  /** Optional line under the heading. */
  subtitle?: string;
  products?: CarouselProduct[];
  /** How many cards are in view, as "mobile/tablet/desktop". A FRACTION clips the next
   *  card at the edge as the scroll cue ("1.5/2.5/3.5" shows half a card at every width);
   *  a whole number shows exactly that many ("1.5/2.5/4"). The cell width is computed from
   *  the rail's own width in CSS — nothing is measured in JS. Default "1.5/2.5/3.5". */
  peek?: string;
  /** Adds a card-shaped actions cell as the rail's LAST cell. Omit both for products
   *  alone. */
  backLabel?: string;
  backHref?: string;
  /** One centred button BELOW the rail, for sending the reader on from the band rather
   *  than back out of it (the actions cell does that). Rendered inside the band, so it
   *  picks up the stepped button sizes and the stepped CTA measure with no wrapper from
   *  the page. Omit for no button. */
  cta?: { label: string; href?: string };
  /** Fill for `cta`. Default "primary" — the band's send-onward button is the loudest
   *  thing in it. */
  ctaVariant?: ButtonProps["variant"];
  /** Fill of the back button. Default "tint". */
  backVariant?: ButtonProps["variant"];
  /** Extra actions beside the back button, in the same actions cell. */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const HEADING =
  "m-0 font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)]";

// Stepped sizes, resolved against the band's own width.
const STEP_SECTION =
  "text-[length:var(--size-section-sm)] @min-[640px]:text-[length:var(--size-section-md)] @min-[1024px]:text-[length:var(--size-section-lg)]";
const STEP_BODY =
  "text-[length:var(--size-body-sm)] @min-[640px]:text-[length:var(--size-body-md)] @min-[1024px]:text-[length:var(--size-body-lg)]";

/* The gap and the cell count both step with the band, and the cell width is derived from
   them, so the rail never needs measuring. */
const RAIL = [
  "grid grid-flow-col gap-[var(--pc-gap)] overflow-x-auto pb-[var(--space-2)]",
  "[--pc-gap:var(--space-4)] [--pc-peek:var(--peek-sm,1.5)]",
  "@min-[768px]:[--pc-gap:var(--space-5)] @min-[768px]:[--pc-peek:var(--peek-md,2.5)]",
  "@min-[1024px]:[--pc-peek:var(--peek-lg,3.5)]",
  "[grid-auto-columns:calc((100%_-_(var(--pc-peek)_-_1)_*_var(--pc-gap))_/_var(--pc-peek))]",
  "snap-x snap-mandatory overscroll-x-contain",
  /* pan-x pan-y, NOT pan-y: pan-y alone tells the browser this rail only pans vertically,
     so a horizontal swipe is never delivered to it and the carousel cannot be moved by
     finger at all. pan-y is only safe on a rail whose own JS handles horizontal touch, and
     this one has none — the swipe IS the browser's scroll. Naming both axes keeps vertical
     page panning working from a finger that starts on a card. */
  "[touch-action:pan-x_pan-y]",
  "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
  "[&>*]:snap-start [&>*]:snap-always [&>*]:min-w-0",
].join(" ");

/* One centred button below the rail. The measure STEPS with the band: a single
   --cta-min-w is the 22rem desktop value, which on a phone would pin the button to the
   full gutter-to-gutter width. */
function RailCta({
  cta,
  variant,
}: {
  cta?: { label: string; href?: string };
  variant: ButtonProps["variant"];
}): ReactElement | null {
  if (!cta?.label) return null;
  return (
    <div className="mt-[var(--space-8)] flex justify-center">
      <Button
        as="a"
        href={cta.href}
        variant={variant}
        size="xl"
        className="min-w-[var(--cta-min-w-sm)] @min-[640px]:min-w-[var(--cta-min-w-md)] @min-[1024px]:min-w-[var(--cta-min-w)]"
      >
        {cta.label}
      </Button>
    </div>
  );
}

export function ProductCarousel({
  heading,
  headingLevel = 2,
  subtitle,
  products = [],
  peek = "1.5/2.5/3.5",
  backLabel,
  backHref,
  backVariant = "tint",
  cta,
  ctaVariant = "primary",
  children,
  className = "",
  style = {},
}: ProductCarouselProps): ReactElement {
  const hasActions = Boolean((backLabel && backHref) || children);
  const [sm, md, lg] = String(peek).split("/");

  return (
    <div
      className={`@container ${className}`}
      style={
        {
          "--peek-sm": sm,
          "--peek-md": md || sm,
          "--peek-lg": lg || md || sm,
          ...style,
        } as CSSProperties
      }
    >
      {(heading || subtitle) && (
        <div className="mb-[var(--space-6)] flex flex-col items-center gap-[var(--space-3)] text-center">
          {heading && (
            <Heading level={headingLevel} className={`${HEADING} ${STEP_SECTION}`}>
              {heading}
            </Heading>
          )}
          {subtitle && (
            <p
              className={`m-0 leading-[var(--leading-normal)] text-[var(--text-default)] ${STEP_BODY}`}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className={RAIL}>
        {products.map((product, i) => (
          <ProductCard
            key={product.id ?? i}
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
      <RailCta cta={cta} variant={ctaVariant} />
    </div>
  );
}
