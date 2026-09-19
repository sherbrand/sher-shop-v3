"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent, MouseEvent, ReactElement, RefObject } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";
import { Breadcrumb } from "@/components/Breadcrumb";
import type { Crumb } from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import type { ButtonProps } from "@/components/Button";
import { Price } from "@/components/Price";
import { QuantityStepper } from "@/components/QuantityStepper";
import { SizeSelector } from "@/components/SizeSelector";
import type { SizeOption } from "@/components/SizeSelector";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";
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
  /** How a tapped dot or thumbnail reaches its shot. "slide" (default) scrolls the
   *  rail there. "fade" crossfades straight to it, so shot 1 to shot 7 does not
   *  drag the reader through five images. The swipe is native scroll either way. */
  transition?: "slide" | "fade";
  /** What the shots do above 768px, in the stacked layout. "column" (default) stacks them
   *  beside the sticky panel, so the whole set scrolls past it. "carousel" keeps the
   *  MOBILE treatment at every width: one shot in view, swipeable, with the `indicator`
   *  below it, so the gallery behaves the same on a phone and a desktop. Below 768px both
   *  values look the same, since the shots are a carousel there either way.
   *  "carousel" also makes the buy column static: the sticky floor exists so a column of
   *  shots can scroll past the panel, and a one-shot carousel would only gain empty space
   *  beneath the gallery from it. */
  gallery?: "column" | "carousel";
  /** Fill of the Add to Cart button, the quieter half of the buy pair. Defaults to "tint"
   *  in the stacked layout and "surface" beside, both chosen to recede next to Buy Now's
   *  "primary" dark fill. Set it to try a different companion: "secondary" gives an
   *  outlined button that matches the dark fill's weight without competing. */
  addToCartVariant?: ButtonProps["variant"];
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
/* The product name takes the SECTION rung, not TITLE: it is the page's H1, and on title it
   rendered a rung below the "You May Also Like" heading further down the page. The price
   stays on title, a rung under the name. */
const STEP_SECTION =
  "text-[length:var(--size-section-sm)] @min-[640px]:text-[length:var(--size-section-md)] @min-[1024px]:text-[length:var(--size-section-lg)]";
const STEP_BODY =
  "text-[length:var(--size-body-sm)] @min-[640px]:text-[length:var(--size-body-md)] @min-[1024px]:text-[length:var(--size-body-lg)]";
const STEP_LABEL =
  "text-[length:var(--size-label-sm)] @min-[640px]:text-[length:var(--size-label-md)] @min-[1024px]:text-[length:var(--size-label-lg)]";

const HEADING =
  "m-0 font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)]";

/* The drawer links STEP with the band's width, so the size is a stepped class rather than
   one fixed --size-sm. */
const DRAWER_LINK =
  "cursor-pointer border-none bg-none p-0 font-[family-name:var(--font-body)] text-[length:var(--size-sm)] @min-[640px]:text-[length:var(--size-body-md)] @min-[1024px]:text-[length:var(--size-body-lg)] text-[var(--text-strong)] underline underline-offset-[0.25em]";

/* The shot rail. A hairline 2px seam between stacked shots, and below 768px the
   column becomes a snapping, full-bleed swipe carousel one shot per view. */
const RAIL_COLUMN = [
  "grid grid-cols-1 gap-[2px]",
  "@max-[767.98px]:grid-flow-col @max-[767.98px]:grid-cols-none @max-[767.98px]:auto-cols-[100%]",
  "@max-[767.98px]:gap-0 @max-[767.98px]:overflow-x-auto @max-[767.98px]:snap-x @max-[767.98px]:snap-mandatory",
  /* BOTH axes: the JS drag handles the POINTER only and declines touch, so native
     panning is what moves this rail on a phone. pan-y alone would freeze it. */
  "@max-[767.98px]:overscroll-x-contain @max-[767.98px]:[touch-action:pan-x_pan-y] @max-[767.98px]:cursor-grab",
  "@max-[767.98px]:[scrollbar-width:none] @max-[767.98px]:[&::-webkit-scrollbar]:hidden",
  /* mandatory, not proximity: a drag that stops between two shots must settle
     on one. snap-always then caps a hard throw at ONE shot however much
     momentum it carries. */
  "@max-[767.98px]:[&>*]:snap-start @max-[767.98px]:[&>*]:snap-always",
  "@max-[767.98px]:data-[drag=1]:cursor-grabbing @max-[767.98px]:data-[drag=1]:snap-none",
  "@min-[1024px]:grid-cols-2",
].join(" ");

/* gallery="carousel" keeps the mobile treatment at EVERY width. The classes are written
   out again unprefixed rather than widening the block above, which is a container query
   that cannot be widened without changing mobile too. */
const RAIL_CAROUSEL = [
  "grid grid-flow-col auto-cols-[100%] gap-0",
  "overflow-x-auto snap-x snap-mandatory overscroll-x-contain",
  "[touch-action:pan-x_pan-y] cursor-grab [-webkit-overflow-scrolling:touch]",
  "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
  "[&>*]:snap-start [&>*]:snap-always",
  "data-[drag=1]:cursor-grabbing data-[drag=1]:snap-none",
].join(" ");

const RAIL = { column: RAIL_COLUMN, carousel: RAIL_CAROUSEL } as const;

/* The media column. DESKTOP ONLY: from 1024px a carousel gallery stands the thumb strip
   UP beside the shot, taking column 1 with the shot in column 2. Below that the strip
   stays horizontal under the shot, since a tablet has no spare width to give it.
   The column is exactly the thumb plus the strip's own inline padding twice, and the grid
   gap is 0 — a column gap would be added to that padding on the shot side only, making
   the right side twice the left. */
const MEDIACOL = {
  column: "min-w-0 group/shots",
  carousel: [
    "min-w-0 group/shots",
    "@min-[1024px]:relative @min-[1024px]:grid @min-[1024px]:gap-0 @min-[1024px]:items-start",
    "@min-[1024px]:[grid-template-columns:calc(var(--thumb-w-lg)_+_2_*_var(--space-3))_minmax(0,1fr)]",
  ].join(" "),
} as const;

/* ABSOLUTE, not a stretched grid item: as an item the strip is the taller column, so it
   sizes the row and its own max-height resolves against itself — it never clamps and never
   scrolls. Out of flow, the shot alone sets the row height and the strip is bounded by it.
   The track above reserves the width it no longer claims.
   The thumbs then SHARE the shot's height (flex-1, height and aspect-ratio released), so
   the last one ends exactly where the shot does instead of stopping short. The crop still
   holds, since each thumb paints its image with background cover. */
const THUMBS_UPRIGHT = [
  "@min-[1024px]:absolute @min-[1024px]:inset-y-0 @min-[1024px]:left-0",
  "@min-[1024px]:w-[calc(var(--thumb-w-lg)_+_2_*_var(--space-3))]",
  "@min-[1024px]:flex-col @min-[1024px]:flex-nowrap @min-[1024px]:items-center",
  "@min-[1024px]:overflow-x-hidden @min-[1024px]:overflow-y-auto @min-[1024px]:[touch-action:pan-y]",
  "@min-[1024px]:p-[var(--pp-strip-pad)_var(--space-3)]",
  "@min-[1024px]:[&>button]:w-[var(--thumb-w-lg)] @min-[1024px]:[&>button]:flex-1 @min-[1024px]:[&>button]:min-h-0",
  "@min-[1024px]:[&>button]:h-auto @min-[1024px]:[&>button]:aspect-auto",
].join(" ");

/* The SAME affordance as C-HeroCarousel's: a light disc with a dark glyph. The LOOK is
   declared once, unconditionally, so the hover reveal and the touch reveal share it
   rather than restating it. Only `display` and `opacity` are conditional. Clamped at the
   ends, where the hero wraps — a product's shots are a finite set, not a loop.
   The mouse gate is POINTER CAPABILITY, not a width, with a 768px container floor.
   On touch there is no hover to reveal on, so the arrows appear while a finger is on the
   gallery and fade out when it lifts: asked for, not permanent furniture over the
   photograph. Keyed on (hover: none) for the same reason, so a touch tablet gets them at
   any width and a mouse never sees the rule. The touch insets are tighter, since a phone
   has no room to spare. */
const ARROW = [
  "hidden absolute top-1/2 -translate-y-1/2 z-[2] place-items-center",
  "h-[var(--hc-arrow-size)] w-[var(--hc-arrow-size)]",
  "rounded-[var(--radius-pill)] bg-[var(--veil-light)] text-[var(--sher-dark)] opacity-0",
  "motion-safe:transition-[opacity,background] motion-safe:duration-[var(--dur-med)] motion-safe:ease-[var(--ease-out)]",
  "[@media(hover:hover)_and_(pointer:fine)]:@min-[768px]:grid",
  "[@media(hover:hover)_and_(pointer:fine)]:@min-[768px]:hover:bg-[var(--sher-white)]",
  "[@media(hover:hover)_and_(pointer:fine)]:@min-[768px]:group-hover/shots:opacity-100",
  "[@media(hover:hover)_and_(pointer:fine)]:@min-[768px]:group-has-[:focus-visible]/shots:opacity-100",
  /* --dur-slow on touch, where the desktop hover uses --dur-med: a cue tied to a gesture
     wants a softer arrival than a pointer's hover. */
  "[@media(hover:none)]:motion-safe:duration-[var(--dur-slow)]",
  "[@media(hover:none)]:grid",
  "[@media(hover:none)]:group-data-[touched]/shots:opacity-100",
].join(" ");

const SHOT = [
  "relative overflow-hidden bg-[var(--surface-raised)] aspect-[var(--ratio-3-4)]",
  "[&>*]:absolute [&>*]:inset-0 [&>*]:block [&>*]:h-full [&>*]:w-full [&>*]:object-cover",
].join(" ");

/* Indicators belong to the carousel, so they are hidden above 768px in "column", where the
   shots become a column, and shown in "carousel" until 1024px, where the upright strip
   takes over the job. */
const DOTS_BODY = [
  "justify-center gap-[var(--space-2)] pt-[var(--space-3)]",
  "[&>button]:h-[var(--dot-sm)] [&>button]:w-[var(--dot-sm)] [&>button]:cursor-pointer",
  "[&>button]:border-0 [&>button]:p-0 [&>button]:rounded-[var(--radius-pill)]",
  "[&>button]:bg-[var(--border-strong)]",
  "[&>button[aria-current='true']]:bg-[var(--surface-inverse)]",
].join(" ");

const DOTS = {
  column: `hidden @max-[767.98px]:flex ${DOTS_BODY}`,
  /* dots belong to the swipe affordance, which the upright strip replaces from 1024px */
  carousel: `flex @min-[1024px]:hidden ${DOTS_BODY}`,
} as const;

// Used only if the overlay's own duration is unreadable (mounted before the CSS).
const FADE_FALLBACK = 360;

/* The crossfade overlay. */
const XFADE_BODY = [
  "pointer-events-none absolute inset-0 z-[2] overflow-hidden",
  "transition-opacity duration-[var(--dur-slow)] ease-[var(--ease-out)]",
  "motion-reduce:duration-[1ms]",
  "[&>*]:absolute [&>*]:inset-0 [&>*]:block [&>*]:h-full [&>*]:w-full [&>*]:object-cover",
].join(" ");

/* In "column" the overlay is hidden from 768px, where the shots are a column rather than a
   carousel and there is nothing to jump between. A carousel gallery keeps it at every
   width. */
const XFADE = {
  column: `${XFADE_BODY} @min-[768px]:hidden`,
  carousel: XFADE_BODY,
} as const;

const THUMBS_BODY = [
  "flex-nowrap gap-[var(--space-2)]",
  "pl-[var(--space-2)] pt-[var(--space-3)] overflow-x-auto overscroll-x-contain",
  "[touch-action:pan-x_pan-y] cursor-grab [-webkit-overflow-scrolling:touch]",
  "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden data-[drag=1]:cursor-grabbing",
  "[&>button]:relative [&>button]:shrink-0 [&>button]:grow-0 [&>button]:basis-auto",
  "[&>button]:h-[var(--thumb-h)] [&>button]:w-[var(--thumb-w)] [&>button]:cursor-pointer",
  "[&>button]:p-0 [&>button]:border [&>button]:border-transparent",
  "[&>button]:bg-[var(--surface-raised)] [&>button]:bg-cover [&>button]:bg-center [&>button]:bg-no-repeat",
  "[&>button[aria-current='true']]:border-[var(--surface-inverse)]",
].join(" ");

/* From 1024px a carousel gallery gives the thumbs a whole column of height to sit in, so
   the cell widens to --thumb-w-lg and the strip's inline padding narrows to
   --pp-strip-pad, both tokens rather than values invented here. */
const THUMBS = {
  column: `hidden @max-[767.98px]:flex ${THUMBS_BODY}`,
  carousel: `flex ${THUMBS_BODY} ${THUMBS_UPRIGHT}`,
} as const;

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
  transition,
  gallery,
}: {
  media: MediaItem[];
  indicator: "dots" | "thumbs";
  transition: "slide" | "fade";
  gallery: "column" | "carousel";
}): ReactElement {
  const railRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const railDrag = useRailDrag(railRef, true);
  const thumbDrag = useRailDrag(thumbRef, false);
  const [shot, setShot] = useState(0);
  /* On touch the arrows are a SWIPE CUE, not a control to aim at: the finger is already
     doing the work, so they live exactly as long as it is down. No timer, and nothing to
     cancel or re-arm — touchstart shows, touchend hides. */
  const [touched, setTouched] = useState(false);
  // the shot being crossfaded to, or null when the overlay is not in play
  const [xfade, setXfade] = useState<number | null>(null);
  const [lit, setLit] = useState(false);
  const xfadeRef = useRef<HTMLDivElement>(null);
  const fade = transition === "fade";

  const onScroll = (): void => {
    const el = railRef.current;
    if (el) setShot(Math.round(el.scrollLeft / el.clientWidth));
  };

  /* The overlay is torn down by transitionend normally. A transition with no
     duration never fires one, which would strand a full-size duplicate over the
     rail, so a timer is the floor. It reads the token rather than hardcoding, and
     sits just past the fade: when the fade IS skipped the timer becomes the whole
     delay, and a generous floor would mean staring at the old shot. */
  const finish = useCallback((): void => {
    setXfade((cur) => {
      if (cur == null) return null;
      const el = railRef.current;
      if (el) el.scrollTo({ left: cur * el.clientWidth, behavior: "auto" });
      return null;
    });
    setLit(false);
  }, []);

  useEffect(() => {
    if (xfade == null) return;
    /* The overlay's OWN duration, read off the element rather than from a token
       name: the stylesheet owns the value, so retuning it there cannot leave a
       stale number here, and naming a token in JS would go wrong silently the
       moment the CSS used a different one. */
    const el = xfadeRef.current ?? railRef.current;
    const raw = el ? getComputedStyle(el).transitionDuration : "";
    const ms = /ms/.test(raw) ? parseFloat(raw) : parseFloat(raw) * 1000;
    const floor = (Number.isFinite(ms) && ms > 0 ? ms : FADE_FALLBACK) + 60;
    const timer = window.setTimeout(finish, floor);
    return () => window.clearTimeout(timer);
  }, [xfade, finish]);

  const goTo = (i: number): void => {
    const el = railRef.current;
    if (!el) return;
    if (!fade || i === shot) {
      el.scrollTo({ left: i * el.clientWidth, behavior: fade ? "auto" : "smooth" });
      return;
    }
    setXfade(i);
    setShot(i);
    /* Mount at opacity 0, then flip to 1 only once the browser has PAINTED the 0.
       One rAF is not a paint boundary: the flip can land in the same frame as the
       mount, leaving no start value, and the transition is skipped entirely. */
    requestAnimationFrame(() => requestAnimationFrame(() => setLit(true)));
  };

  const shotLabel = (item: MediaItem, i: number): string =>
    item.type === "video" ? "Video" : `Shot ${i + 1}`;

  return (
    <div
      className={MEDIACOL[gallery]}
      data-touched={touched && media.length > 1 ? "" : undefined}
      onTouchStart={() => setTouched(true)}
      onTouchEnd={() => setTouched(false)}
      onTouchCancel={() => setTouched(false)}
    >
      <div
        className={
          gallery === "carousel"
            ? "relative @min-[1024px]:col-start-2 @min-[1024px]:row-start-1"
            : "relative"
        }
      >
        <div ref={railRef} onScroll={onScroll} className={RAIL[gallery]} {...railDrag}>
          {media.map((item, i) => (
            <div key={i} className={SHOT}>
              {item.node}
            </div>
          ))}
        </div>
        {xfade != null && (
          /* Sits over the rail while the rail jumps underneath with no animation,
             so a tap moves shot 1 to shot 7 without scrolling through five. */
          <div
            ref={xfadeRef}
            aria-hidden
            onTransitionEnd={finish}
            style={{ opacity: lit ? 1 : 0 }}
            className={XFADE[gallery]}
          >
            {media[xfade]?.node}
          </div>
        )}

        {media.length > 1 && (
          <>
            <div className={`${ARROW} left-[var(--space-3)] @min-[1024px]:left-[var(--space-6)]`}>
              <IconButton label="Previous shot" onClick={() => goTo(Math.max(0, shot - 1))}>
                <Icon name="chevron-left" size={26} />
              </IconButton>
            </div>
            <div className={`${ARROW} right-[var(--space-3)] @min-[1024px]:right-[var(--space-6)]`}>
              <IconButton
                label="Next shot"
                onClick={() => goTo(Math.min(media.length - 1, shot + 1))}
              >
                <Icon name="chevron-right" size={26} />
              </IconButton>
            </div>
          </>
        )}
      </div>

      {indicator === "dots" && (
        <div className={DOTS[gallery]}>
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
        <div ref={thumbRef} className={THUMBS[gallery]} {...thumbDrag}>
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
  transition = "slide",
  gallery = "column",
  addToCartVariant,
  showQuantity = true,
  preorderHref = "/contact",
  stacked = false,
  className = "",
}: ProductPanelProps): ReactElement {
  const allSoldOut = sizes.length > 0 && sizes.every((s) => s.soldOut);
  const isStacked = layout === "stacked";
  // the quieter half of the buy pair; Buy Now is always the primary dark fill
  const cartVariant = addToCartVariant ?? (isStacked ? "tint" : "surface");

  const buy = allSoldOut ? (
    <Button as="a" href={preorderHref} variant="primary" size="lg" fullWidth>
      Preorder
    </Button>
  ) : (
    <>
      <Button variant={cartVariant} size="lg" fullWidth onClick={onAddToCart}>
        Add to Cart
      </Button>
      <Button variant="primary" size="lg" fullWidth onClick={onBuyNow}>
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
          <StackedGallery
            media={media}
            indicator={indicator}
            transition={transition}
            gallery={gallery}
          />

          {/* cqh needs a size container above (the page frame). Without one the
              declaration is dropped and the panel simply sticks without vertical
              centring. */}
          {/* The sticky 100cqh floor exists so a COLUMN of shots can scroll past the
              panel. A carousel gallery is one shot tall and never scrolls, so that floor
              would only add empty space under it: the row takes its height from its
              content instead, and the column stretches to the row so centring puts the
              purchase controls level with the middle of the shot. */}
          <div
            className={
              gallery === "carousel"
                ? "bg-[var(--surface-page)] @min-[768px]:flex @min-[768px]:self-stretch @min-[768px]:items-center"
                : "bg-[var(--surface-page)] @min-[768px]:sticky @min-[768px]:top-0 @min-[768px]:flex @min-[768px]:max-h-[100cqh] @min-[768px]:min-h-[100cqh] @min-[768px]:overflow-y-auto @min-[768px]:[align-items:safe_center]"
            }
          >
            {/* min-w-0 and the 100% arm are both load-bearing: this is a flex item of
                the buy column, so min-width:auto would refuse to shrink below the
                60ch measure and spill past the grid track, which is narrower than
                60ch at mid band widths. Cap against the track and the measure. */}
            <div className="mx-auto flex min-w-0 max-w-[min(60ch,100%)] flex-col items-center gap-[var(--space-5)] px-[var(--gutter)] py-[var(--space-8)] text-center @min-[768px]:p-[var(--space-8)]">
              {breadcrumb.length > 0 && (
                <Breadcrumb items={breadcrumb} className="mx-auto justify-center" />
              )}

              <Heading level={headingLevel} className={`${HEADING} ${STEP_SECTION}`}>
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
                  className={`m-0 min-w-0 max-w-[min(46ch,100%)] leading-[var(--leading-normal)] text-[var(--text-default)] ${STEP_BODY}`}
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

          <Heading level={headingLevel} className={`${HEADING} max-w-[min(24ch,100%)] ${STEP_HERO}`}>
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
                  className={`m-0 max-w-[min(56ch,100%)] leading-[var(--leading-normal)] text-[var(--text-default)] ${STEP_BODY}`}
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
