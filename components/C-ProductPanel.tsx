"use client";

import { useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent, MouseEvent, ReactElement, RefObject } from "react";
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

/* C-ProductPanel — the product page's main band. Two layouts:

   layout="beside" (default) — the media gallery's thumb-strip stage beside a
   left-aligned purchase column. Stacks to one column below 768px.

   layout="stacked" — the gallery runs as a column of full-width shots beside a
   STICKY, centred purchase panel: the shots scroll past a panel that stays put, so
   the whole set is seen without leaving the buy controls. Below 768px the shots
   collapse into a full-bleed swipe carousel, one per view, with `indicator` dots or
   a thumb strip; from 1024px the shots sit 2-up. Drag-to-scroll is wired for the
   pointer; touch swipe is native.

   All of it resolves against the panel's OWN width. When every size is sold out the
   buy buttons swap to a Preorder link. `stacked` (boolean) still forces the beside
   layout to one column at every width. */

// px of pointer travel past which a drag suppresses the click it would otherwise fire
const DRAG_SLOP = 3;
// px/ms past which a short flick still advances a whole shot
const FLICK_V = 0.4;

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
  /** Opens C-Details. When set, the description is NOT printed inline — the drawer is
   *  where it lives — and a "Details" link leads the drawer row. */
  onDetails?: () => void;
  /** Opens C-Sizing. */
  onSizeChart?: () => void;
  /** Opens C-Shipping. */
  onShipping?: () => void;
  /** Label for the size-chart link. Default "Sizing". */
  sizeChartLabel?: string;
  /** Band layout. Default "beside". */
  layout?: "beside" | "stacked";
  /** Position indicator for the stacked layout's carousel, below 768px only: pill
   *  `dots` or a draggable thumbnail strip. Default "dots". Ignored when layout
   *  is "beside". */
  indicator?: "dots" | "thumbs";
  /** Show the quantity stepper. Default true. */
  showQuantity?: boolean;
  /** Where Preorder points when every size is sold out. Default "/contact". */
  preorderHref?: string;
  /** Keep the beside layout one column at every width. Default false. */
  stacked?: boolean;
  className?: string;
}

// Stepped sizes, resolved against the band's own width.
const STEP_HERO =
  "text-[length:var(--size-hero-sm)] @min-[640px]:text-[length:var(--size-hero-md)] @min-[1024px]:text-[length:var(--size-hero-lg)]";
const STEP_TITLE =
  "text-[length:var(--size-title-sm)] @min-[640px]:text-[length:var(--size-title-md)] @min-[1024px]:text-[length:var(--size-title-lg)]";
const STEP_BODY =
  "text-[length:var(--size-body-sm)] @min-[640px]:text-[length:var(--size-body-md)] @min-[1024px]:text-[length:var(--size-body-lg)]";
const STEP_LABEL =
  "text-[length:var(--size-label-sm)] @min-[640px]:text-[length:var(--size-label-md)] @min-[1024px]:text-[length:var(--size-label-lg)]";

const HEADING =
  "m-0 font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)]";

const DRAWER_LINK =
  "cursor-pointer border-none bg-none p-0 font-[family-name:var(--font-body)] text-[length:var(--size-sm)] text-[var(--text-strong)] underline underline-offset-[0.25em]";

/* The shot rail. A hairline 2px seam between stacked shots, and below 768px the
   column becomes a snapping, full-bleed swipe carousel one shot per view. */
const RAIL = [
  "grid grid-cols-1 gap-[2px]",
  "@max-[767.98px]:grid-flow-col @max-[767.98px]:grid-cols-none @max-[767.98px]:auto-cols-[100%]",
  "@max-[767.98px]:gap-0 @max-[767.98px]:overflow-x-auto @max-[767.98px]:snap-x @max-[767.98px]:snap-proximity",
  /* BOTH axes: the JS drag handles the POINTER only and declines touch, so native
     panning is what moves this rail on a phone. pan-y alone would freeze it. */
  "@max-[767.98px]:overscroll-x-contain @max-[767.98px]:[touch-action:pan-x_pan-y] @max-[767.98px]:cursor-grab",
  "@max-[767.98px]:[scrollbar-width:none] @max-[767.98px]:[&::-webkit-scrollbar]:hidden",
  "@max-[767.98px]:[&>*]:snap-start",
  "@max-[767.98px]:data-[drag=1]:cursor-grabbing @max-[767.98px]:data-[drag=1]:snap-none",
  "@min-[1024px]:grid-cols-2",
].join(" ");

const SHOT = [
  "relative overflow-hidden bg-[var(--surface-raised)] aspect-[var(--ratio-3-4)]",
  "[&>*]:absolute [&>*]:inset-0 [&>*]:block [&>*]:h-full [&>*]:w-full [&>*]:object-cover",
].join(" ");

/* Indicators belong to the carousel, so they are hidden above 768px. */
const DOTS = [
  "hidden @max-[767.98px]:flex justify-center gap-[var(--space-2)] pt-[var(--space-3)]",
  "[&>button]:h-[var(--dot-sm)] [&>button]:w-[var(--dot-sm)] [&>button]:cursor-pointer",
  "[&>button]:border-0 [&>button]:p-0 [&>button]:rounded-[var(--radius-pill)]",
  "[&>button]:bg-[var(--border-strong)]",
  "[&>button[aria-current='true']]:bg-[var(--surface-inverse)]",
].join(" ");

const THUMBS = [
  "hidden @max-[767.98px]:flex flex-nowrap gap-[var(--space-2)]",
  "pl-[var(--space-2)] pt-[var(--space-3)] overflow-x-auto overscroll-x-contain",
  "[touch-action:pan-x_pan-y] cursor-grab [-webkit-overflow-scrolling:touch]",
  "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden data-[drag=1]:cursor-grabbing",
  "[&>button]:relative [&>button]:shrink-0 [&>button]:grow-0 [&>button]:basis-auto",
  "[&>button]:h-[var(--thumb-h)] [&>button]:w-[var(--thumb-w)] [&>button]:cursor-pointer",
  "[&>button]:p-0 [&>button]:border [&>button]:border-transparent",
  "[&>button]:bg-[var(--surface-raised)] [&>button]:bg-cover [&>button]:bg-center [&>button]:bg-no-repeat",
  "[&>button[aria-current='true']]:border-[var(--surface-inverse)]",
].join(" ");

interface RailDragHandlers {
  onPointerDown: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerUp: () => void;
  onPointerLeave: () => void;
  onClickCapture: (e: MouseEvent<HTMLDivElement>) => void;
}

interface DragState {
  x: number;
  left: number;
  moved: boolean;
  lastX: number;
  lastT: number;
  prevX: number;
  prevT: number;
}

/* Pointer-drag to scroll a rail. `paged` rails settle onto the nearest cell with a
   flick bias, and CSS snap is suspended for the glide so the two never fight. */
function useRailDrag(
  ref: RefObject<HTMLDivElement | null>,
  paged: boolean,
): RailDragHandlers {
  const state = useRef<{ on: DragState | null }>({ on: null });

  return useMemo(() => {
    const release = (commit: boolean): void => {
      const el = ref.current;
      const d = state.current.on;
      state.current.on = null;
      if (!el) return;
      if (!d || !paged || !commit) {
        el.removeAttribute("data-drag");
        return;
      }
      const width = el.clientWidth || 1;
      const velocity = (d.lastX - d.prevX) / Math.max(1, d.lastT - d.prevT);
      let index = Math.round(el.scrollLeft / width);
      if (Math.abs(velocity) > FLICK_V) {
        index = velocity < 0 ? Math.ceil(el.scrollLeft / width) : Math.floor(el.scrollLeft / width);
      }
      const max = Math.round((el.scrollWidth - width) / width);
      el.scrollTo({ left: Math.max(0, Math.min(max, index)) * width, behavior: "smooth" });
      // Hold the snap-off state until the glide has settled.
      setTimeout(() => ref.current?.removeAttribute("data-drag"), 400);
    };

    return {
      onPointerDown: (e: PointerEvent<HTMLDivElement>): void => {
        const el = ref.current;
        if (!el || e.pointerType === "touch" || el.scrollWidth <= el.clientWidth) return;
        const now = performance.now();
        state.current.on = {
          x: e.clientX,
          left: el.scrollLeft,
          moved: false,
          lastX: e.clientX,
          lastT: now,
          prevX: e.clientX,
          prevT: now,
        };
        el.setAttribute("data-drag", "1");
      },
      onPointerMove: (e: PointerEvent<HTMLDivElement>): void => {
        const el = ref.current;
        const d = state.current.on;
        if (!el || !d) return;
        const dx = e.clientX - d.x;
        if (Math.abs(dx) > DRAG_SLOP) d.moved = true;
        d.prevX = d.lastX;
        d.prevT = d.lastT;
        d.lastX = e.clientX;
        d.lastT = performance.now();
        el.scrollLeft = d.left - dx;
      },
      onPointerUp: (): void => release(true),
      onPointerLeave: (): void => release(false),
      onClickCapture: (e: MouseEvent<HTMLDivElement>): void => {
        if (state.current.on?.moved) e.stopPropagation();
      },
    };
  }, [ref, paged]);
}

/* White triangle in a light disc, over the video cell of the thumb strip. The disc
   supplies its own contrast, so the thumbnail needs no scrim. */
function PlayBadge(): ReactElement {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <svg viewBox="0 0 24 24" className="h-[var(--badge-sm)] w-[var(--badge-sm)]">
        <circle cx="12" cy="12" r="10" fill="var(--veil-light)" />
        <path d="M10 8.5v7l6-3.5Z" fill="var(--sher-dark)" />
      </svg>
    </span>
  );
}

function StackedGallery({
  media,
  indicator,
}: {
  media: MediaItem[];
  indicator: "dots" | "thumbs";
}): ReactElement {
  const railRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const railDrag = useRailDrag(railRef, true);
  const thumbDrag = useRailDrag(thumbRef, false);
  const [shot, setShot] = useState(0);

  const onScroll = (): void => {
    const el = railRef.current;
    if (el) setShot(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (i: number): void => {
    const el = railRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  const shotLabel = (item: MediaItem, i: number): string =>
    item.type === "video" ? "Video" : `Shot ${i + 1}`;

  return (
    <div className="min-w-0">
      <div ref={railRef} onScroll={onScroll} className={RAIL} {...railDrag}>
        {media.map((item, i) => (
          <div key={i} className={SHOT}>
            {item.node}
          </div>
        ))}
      </div>

      {indicator === "dots" && (
        <div className={DOTS}>
          {media.map((item, i) => (
            <button
              key={i}
              type="button"
              aria-current={shot === i ? "true" : "false"}
              aria-label={shotLabel(item, i)}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}

      {indicator === "thumbs" && (
        <div ref={thumbRef} className={THUMBS} {...thumbDrag}>
          {media.map((item, i) => (
            <button
              key={i}
              type="button"
              aria-current={shot === i ? "true" : "false"}
              aria-label={shotLabel(item, i)}
              onClick={() => goTo(i)}
              /* A thumb given as a URL paints the cell; a node thumb belongs to
                 the beside layout's gallery, so it is not used here. */
              style={
                typeof item.thumb === "string"
                  ? ({ backgroundImage: `url(${item.thumb})` } as CSSProperties)
                  : undefined
              }
            >
              {item.type === "video" && <PlayBadge />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

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
  onDetails,
  onSizeChart,
  onShipping,
  sizeChartLabel = "Sizing",
  layout = "beside",
  indicator = "dots",
  showQuantity = true,
  preorderHref = "/contact",
  stacked = false,
  className = "",
}: ProductPanelProps): ReactElement {
  const allSoldOut = sizes.length > 0 && sizes.every((s) => s.soldOut);
  const isStacked = layout === "stacked";

  const buy = allSoldOut ? (
    <Button as="a" href={preorderHref} variant="primary" size="lg" fullWidth>
      Preorder
    </Button>
  ) : (
    <>
      <Button
        variant={isStacked ? "tint" : "surface"}
        size="lg"
        fullWidth
        onClick={onAddToCart}
      >
        Add to Cart
      </Button>
      <Button variant="accent" size="lg" fullWidth onClick={onBuyNow}>
        Buy Now
      </Button>
    </>
  );

  /* The drawer links. `onDetails` opens C-Details, which is where the description
     lives when it is set — so the panel does not also print it inline. */
  const links = (
    <div
      className={
        isStacked
          ? "flex flex-wrap justify-center gap-[var(--space-5)]"
          : "flex flex-col gap-[var(--space-2)] pt-[var(--space-2)]"
      }
    >
      {onDetails && (
        <button
          type="button"
          className={`${DRAWER_LINK} ${isStacked ? "text-center" : "text-left"}`}
          onClick={onDetails}
        >
          Details
        </button>
      )}
      {onSizeChart && (
        <button
          type="button"
          className={`${DRAWER_LINK} ${isStacked ? "text-center" : "text-left"}`}
          onClick={onSizeChart}
        >
          {sizeChartLabel}
        </button>
      )}
      {onShipping && (
        <button
          type="button"
          className={`${DRAWER_LINK} ${isStacked ? "text-center" : "text-left"}`}
          onClick={onShipping}
        >
          Shipping &amp; Returns
        </button>
      )}
    </div>
  );

  if (isStacked) {
    return (
      <div className={`@container ${className}`}>
        <div className="grid grid-cols-1 items-start gap-0 @min-[768px]:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          <StackedGallery media={media} indicator={indicator} />

          {/* cqh needs a size container above (the page frame). Without one the
              declaration is dropped and the panel simply sticks without vertical
              centring. */}
          <div className="bg-[var(--surface-page)] @min-[768px]:sticky @min-[768px]:top-0 @min-[768px]:flex @min-[768px]:max-h-[100cqh] @min-[768px]:min-h-[100cqh] @min-[768px]:overflow-y-auto @min-[768px]:[align-items:safe_center]">
            <div className="mx-auto flex max-w-[60ch] flex-col items-center gap-[var(--space-5)] px-[var(--gutter)] py-[var(--space-8)] text-center @min-[768px]:p-[var(--space-8)]">
              {/* The centered panel is narrow, so the current crumb wraps instead of
                  losing its tail — the product name is the longest and the most
                  important part of the trail. */}
              {breadcrumb.length > 0 && (
                <Breadcrumb items={breadcrumb} wrap className="justify-center" />
              )}

              <Heading level={headingLevel} className={`${HEADING} ${STEP_TITLE}`}>
                {name}
              </Heading>

              {price != null && (
                /* Name and price share the title rung in this layout. The rung sits
                   on the wrapper: a descendant rule outranks the size class Price
                   sets on itself, so the two never race. */
                <div
                  className={`[&>span]:text-[length:var(--size-title-sm)] @min-[640px]:[&>span]:text-[length:var(--size-title-md)] @min-[1024px]:[&>span]:text-[length:var(--size-title-lg)]`}
                >
                  <Price amount={price} compareAt={compareAt} currency={currency} size="lg" />
                </div>
              )}

              {sizes.length > 0 && (
                /* The chips get extra clearance below the panel's row gap. */
                <SizeSelector
                  sizes={sizes}
                  value={size}
                  onChange={onSize}
                  label=""
                  shape="circle"
                  align="center"
                  className="mb-[var(--space-2)]"
                />
              )}

              {showQuantity && !allSoldOut && (
                <QuantityStepper value={quantity} onChange={onQuantity} />
              )}

              {/* The two CTAs sit tighter than the panel's row gap — one rhythm. */}
              <div className="flex w-full flex-col gap-[var(--space-3)]">{buy}</div>

              {attributeValue && (
                <span
                  className={`font-[family-name:var(--font-body)] ${STEP_LABEL} uppercase tracking-[var(--tracking-label)] text-[var(--text-meta)]`}
                >
                  {attributeLabel ? `${attributeLabel}: ` : ""}
                  {attributeValue}
                </span>
              )}

              {!onDetails && description && (
                <p
                  className={`m-0 max-w-[46ch] leading-[var(--leading-normal)] text-[var(--text-default)] ${STEP_BODY}`}
                >
                  {description}
                </p>
              )}

              {links}
            </div>
          </div>
        </div>
      </div>
    );
  }

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

          <Heading level={headingLevel} className={`${HEADING} max-w-[24ch] ${STEP_HERO}`}>
            {name}
          </Heading>

          {price != null && (
            <Price amount={price} compareAt={compareAt} currency={currency} size="lg" />
          )}

          {sizes.length > 0 && <SizeSelector sizes={sizes} value={size} onChange={onSize} />}

          {showQuantity && !allSoldOut && (
            <div className="flex flex-wrap items-center gap-[var(--space-4)]">
              <QuantityStepper value={quantity} onChange={onQuantity} />
            </div>
          )}

          <div className="flex flex-col gap-[var(--space-3)]">{buy}</div>

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

          {links}
        </div>
      </div>
    </div>
  );
}
