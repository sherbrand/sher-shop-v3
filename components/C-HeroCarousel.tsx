"use client";

import { useEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  MouseEvent,
  PointerEvent,
  ReactElement,
  TransitionEvent,
} from "react";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";

/* C-HeroCarousel — the Home hero band. A sliding "peek" carousel: one banner on
   mobile, two at 50% each from 768px. Banners are fixed portrait crops (2:3 on
   mobile and tablet, 4:5 from 1024px). Auto-advances by one banner with wrap;
   prev/next arrows and dots page by one. Each banner takes a solid tone (`bg`) or
   an image under a scrim, and an optional `href` that makes the whole banner a link.
   The CELL WIDTH is a container query on the band's own width; the track shifts by
   --pos and the query supplies the matching percentage, so JS never needs to know
   how many banners are on screen.

   DRAG GUARD: the anchor covers the whole banner, so a pointer gesture that the
   user means as a swipe would otherwise land as a click and navigate. Pointer-down
   records the start point; a click that moved more than DRAG_SLOP px in either axis
   is cancelled with preventDefault. Native image and link dragging is off
   (draggable={false}) so the anchor cannot start a ghost-drag either. */

// px of pointer travel past which a click counts as a drag, not a tap
const DRAG_SLOP = 10;
// slots rendered in fade mode: up to two are on screen, the last is the drag reveal
const FADE_SLOTS = 3;

const mod = (a: number, n: number): number => ((a % n) + n) % n;
// Used when --swipe-commit cannot be read. Matches the token's own value.
const COMMIT_FALLBACK = 56;

/* Arrow disc. Hidden below 1024px, and above it revealed by hover or focus-within
   on the band. Left/right insets are set per arrow at the call site. */
const ARROW = [
  "hidden absolute top-1/2 -translate-y-1/2",
  "@min-[1024px]:grid @min-[1024px]:place-items-center",
  "@min-[1024px]:h-[var(--hc-arrow-size)] @min-[1024px]:w-[var(--hc-arrow-size)]",
  "@min-[1024px]:rounded-[var(--radius-pill)] @min-[1024px]:bg-[var(--veil-light)]",
  "@min-[1024px]:text-[var(--sher-dark)] @min-[1024px]:opacity-0",
  "@min-[1024px]:hover:bg-[var(--sher-white)]",
  "motion-safe:transition-[opacity,background] motion-safe:duration-[var(--dur-med)] motion-safe:ease-[var(--ease-out)]",
  "@min-[1024px]:group-hover/hero:opacity-100 @min-[1024px]:group-focus-within/hero:opacity-100",
].join(" ");

/* Banners carry no overlay text — Home's headline lives in the C-HeroTitle band
   below the carousel. */
export interface HeroSlide {
  /** Solid banner tone (token or color) when no image. */
  bg?: string;
  /** Background image URL (cover). Overrides bg. */
  image?: string;
  /** Accessible name for the banner. On a plain slide it sets role="img" and
   *  aria-label on the media layer; on a linked slide it names the link, so a
   *  slide with `href` must carry it. Leave unset for a decorative banner. */
  alt?: string;
  /** Makes the whole banner a link to this target — the media layer is wrapped
   *  in an anchor, so the full area is clickable. A drag does not navigate. */
  href?: string;
}

export interface HeroCarouselProps {
  slides?: HeroSlide[];
  /** Auto-advance interval in ms. Default 6000. */
  interval?: number;
  /** Auto-advance on/off. Default true. */
  autoPlay?: boolean;
  /** Position indicator treatment: "dots" (pill dots, active stretches) or "bars"
   *  (equal hairline bars, active brightens). Both sit centred at the bottom of
   *  the band. Default "dots". */
  indicator?: "dots" | "bars";
  /** How one banner gives way to the next. "slide" (default) moves the whole track
   *  sideways. "fade" crossfades in place: the slots never move, so there is no track
   *  position to reset and the wrap is the same operation as every other step. A DRAG
   *  is always a slide in both modes, because direct manipulation has to move with
   *  the hand. */
  transition?: "slide" | "fade";
  /** Give each banner a full screen of height. DESKTOP ONLY, gated at 1024px, so it
   *  can never fire on mobile or tablet. It sets the height rather than capping it:
   *  a cap only bites where the banner is already taller than a screen. The image
   *  covers, so it crops top and bottom rather than letterboxing. Default false. */
  fillScreen?: boolean;
  className?: string;
}

export function HeroCarousel({
  slides = [],
  interval = 6000,
  autoPlay = true,
  indicator = "dots",
  transition = "slide",
  fillScreen = false,
  className = "",
}: HeroCarouselProps): ReactElement {
  const [pos, setPos] = useState(0);
  // in fade mode a drag settles by sliding one slot; step carries that, then re-bases
  const [step, setStep] = useState(0);
  const fade = transition === "fade";
  const [animate, setAnimate] = useState(true);
  const [dragging, setDragging] = useState(false);
  const count = slides.length || 1;
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; dx: number } | null>(null);
  const [down, setDown] = useState<{ x: number; y: number } | null>(null);

  // The live finger offset rides on the track as a custom property, so the
  // transform stays in CSS and React re-renders nothing while the finger moves.
  const setOffset = (px: number): void => {
    trackRef.current?.style.setProperty("--drag", `${px}px`);
  };

  // The commit distance is a TOKEN read, not a layout measurement.
  const commitDistance = (): number => {
    const el = trackRef.current;
    if (!el) return COMMIT_FALLBACK;
    const v = parseFloat(getComputedStyle(el).getPropertyValue("--swipe-commit"));
    return Number.isFinite(v) && v > 0 ? v : COMMIT_FALLBACK;
  };

  const onDragStart = (e: PointerEvent<HTMLDivElement>): void => {
    if (count <= 1 || !e.isPrimary) return;
    drag.current = { x: e.clientX, dx: 0 };
    setDragging(true);
    try {
      trackRef.current?.setPointerCapture(e.pointerId);
    } catch {
      // Capture is a nicety: without it the gesture still ends on pointerup.
    }
  };

  const onDragMove = (e: PointerEvent<HTMLDivElement>): void => {
    if (!drag.current) return;
    drag.current.dx = e.clientX - drag.current.x;
    setOffset(drag.current.dx);
  };

  const endDrag = (commit: boolean): void => {
    const d = drag.current;
    drag.current = null;
    setOffset(0);
    setDragging(false);
    if (!d) return;
    if (commit && Math.abs(d.dx) > commitDistance()) {
      const dir = d.dx < 0 ? 1 : -1;
      // fade settles the gesture by sliding one slot, then re-bases; slide just moves on
      if (fade) setStep(dir);
      else setPos((p) => p + dir);
    }
  };

  // A linked banner must not navigate when the gesture was a swipe.
  const onPointerDown = (e: PointerEvent<HTMLAnchorElement>): void =>
    setDown({ x: e.clientX, y: e.clientY });
  const onLinkClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    if (!down) return;
    if (Math.abs(e.clientX - down.x) > DRAG_SLOP || Math.abs(e.clientY - down.y) > DRAG_SLOP) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (!autoPlay || count <= 1 || dragging) return;
    const timer = setInterval(() => {
      // A hidden tab throttles timers and batches the catch-up ticks, which is how
      // pos used to climb past the slide count faster than transitionend could
      // reset it. Not advancing a carousel nobody can see is right anyway.
      if (document.hidden) return;
      setPos((p) => (fade ? mod(p + 1, count) : p + 1));
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, count, dragging, fade]);

  // Re-enable the transition on the frame after the silent wrap-around jump.
  useEffect(() => {
    if (!animate) requestAnimationFrame(() => setAnimate(true));
  }, [animate]);

  const extended = [...slides, ...slides.slice(0, 2)];
  const active = ((pos % count) + count) % count;
  const go = (k: number): void => setPos((((k % count) + count) % count));
  /* posRef mirrors pos so the wrap reset never reads a stale closure value: onEnd is
     a DOM handler, so the `pos` captured when it was created can be several ticks
     behind. The reset is a modulo, not a single subtraction, so an overshoot of any
     size lands back inside the real slide range instead of on the clone cells. */
  const posRef = useRef(0);
  useEffect(() => {
    posRef.current = pos;
  }, [pos]);
  const stepRef = useRef(0);
  useEffect(() => {
    stepRef.current = step;
  }, [step]);
  const onEnd = (event: TransitionEvent<HTMLDivElement>): void => {
    if (fade) {
      if (event.propertyName !== "transform") return;
      const k = stepRef.current;
      if (k !== 0) {
        setAnimate(false);
        setPos((p) => mod(p + k, count));
        setStep(0);
      }
      return;
    }
    const p = posRef.current;
    if (p >= count) {
      setAnimate(false);
      setPos(p % count);
    }
  };

  /* A drag, and the frame that re-bases the track after one, must not crossfade:
     the continuity there comes from the geometry, and a fade running at the same
     time would read as a second, unexplained change. */
  const holding = dragging || step !== 0 || !animate;

  const cellClass = [
    "relative shrink-0 grow-0 basis-full overflow-hidden",
    "aspect-[var(--ratio-2-3)] @min-[768px]:basis-1/2",
    /* The two arms are exclusive on purpose. Emitting both an aspect ratio and
       aspect-auto for the same query would leave the winner to whichever Tailwind
       happens to print last. 100cqh resolves against the nearest size container,
       the viewport here, since the band is inline-size only. */
    fillScreen
      ? "@min-[1024px]:aspect-auto @min-[1024px]:h-[100cqh]"
      : "@min-[1024px]:aspect-[var(--ratio-4-5)]",
  ].join(" ");

  /* One banner, shared by both modes. `muted` is a duplicate copy shown elsewhere,
     so it is kept out of the a11y tree and the tab order. `eager` is "high" for the
     LCP candidate, true for the one after it, false beyond. */
  const banner = (
    slide: HeroSlide,
    muted: boolean,
    eager: "high" | boolean,
  ): ReactElement => {
    /* A tone-only banner has no <img> to carry the alt, so the tone layer takes the
       name instead. A linked slide is named by its anchor, an imaged one by its <img>. */
    const named = !slide.image && !slide.href && !!slide.alt && !muted;
    /* Tone first, image over it, so a banner has its colour before its image lands. */
    const media = (
      <>
        <div
          className="absolute inset-0"
          role={named ? "img" : undefined}
          aria-label={named ? slide.alt : undefined}
          aria-hidden={named ? undefined : true}
          style={{ backgroundColor: slide.bg || "var(--surface-inverse)" }}
        />
        {slide.image && (
          <img
            src={slide.image}
            alt={muted ? "" : slide.alt || ""}
            draggable={false}
            decoding="async"
            /* The first two are eager: from 768px the band shows two banners at rest,
               so slide 2 is an LCP candidate there, and on mobile it is the very next
               banner. `loading` cannot vary by breakpoint, so this is one choice for
               every width. Only slide 1 takes priority, so slide 2 does not compete. */
            loading={eager ? "eager" : "lazy"}
            // camelCase here: React 19 types and accepts it. The export writes it
            // lowercase because its own preview runs React 18, which warns on the
            // camelCase spelling. Same attribute either way.
            fetchPriority={eager === "high" ? "high" : undefined}
            /* Below 640 the crop shifts down so the subject sits lower in the frame. */
            className="absolute inset-0 block h-full w-full object-cover object-[center_40%] @min-[640px]:object-center"
          />
        )}
      </>
    );
    return slide.href ? (
      <a
        href={slide.href}
        aria-label={muted ? undefined : slide.alt || undefined}
        aria-hidden={muted ? true : undefined}
        tabIndex={muted ? -1 : undefined}
        draggable={false}
        onPointerDown={onPointerDown}
        onClick={onLinkClick}
        className="absolute inset-0 block no-underline"
      >
        {media}
      </a>
    ) : (
      media
    );
  };

  const bars = indicator === "bars";

  return (
    <section
      className={`group/hero @container relative w-full overflow-hidden bg-[var(--surface-inverse)] ${className}`}
      aria-roledescription="carousel"
    >
      {/* Both modes drive the SAME transform, --pos times the cell width. "slide"
          grows --pos; "fade" leaves it at 0 and uses it only while settling a drag,
          so the cell width stays a container query and JS never counts banners. */}
      <div
        ref={trackRef}
        onTransitionEnd={onEnd}
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={() => endDrag(true)}
        onPointerCancel={() => endDrag(false)}
        className={[
          "flex touch-pan-y",
          "translate-x-[calc(var(--pos,0)*-100%+var(--drag,0px))] @min-[768px]:translate-x-[calc(var(--pos,0)*-50%+var(--drag,0px))]",
          fade
            ? step !== 0 && animate
              ? "transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)]"
              : "transition-none"
            : animate && !dragging
              ? "transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)]"
              : "transition-none",
        ].join(" ")}
        style={{ "--pos": fade ? step : pos } as CSSProperties}
      >
        {fade
          ? Array.from({ length: FADE_SLOTS }, (_, i) => (
              <div key={i} className={cellClass}>
                {[0, 1].map((j) => {
                  /* The layer whose parity matches this slot's step holds the
                     incoming banner; the other still holds the one it replaces. */
                  const on = mod(pos + i, 2) === j;
                  const slide = slides[mod(pos + i - (on ? 0 : 1), count)];
                  if (!slide) return null;
                  /* Slot 2 is off screen at every width, and an outgoing layer is a
                     second copy of a banner shown elsewhere. Neither is announced. */
                  const muted = !on || i >= FADE_SLOTS - 1;
                  return (
                    <div
                      key={j}
                      aria-hidden={muted ? true : undefined}
                      className={[
                        "absolute inset-0 overflow-hidden",
                        on ? "z-[2] opacity-100" : "z-[1] opacity-0",
                        holding
                          ? "transition-none"
                          : "transition-opacity duration-[var(--dur-med)] ease-[var(--ease-out)]",
                      ].join(" ")}
                    >
                      {banner(slide, muted, i === 0 ? "high" : i === 1)}
                    </div>
                  );
                })}
                <div className="pointer-events-none absolute inset-0 bg-[image:var(--overlay-hero)]" />
              </div>
            ))
          : extended.map((slide, k) => (
              <div key={k} className={cellClass}>
                {/* The trailing cells are wrap clones: out of the a11y tree and the
                    tab order, so a link is not announced or tabbed to twice. */}
                {banner(slide, k >= count, k === 0 ? "high" : k === 1)}
                <div className="pointer-events-none absolute inset-0 bg-[image:var(--overlay-hero)]" />
              </div>
            ))}
      </div>

      {count > 1 && (
        <>
          {/* Desktop only, and hidden until the reader reaches for them. Below
              1024px nothing is drawn over the photograph: the banner is swiped and
              the dots carry position. The arrow is a light disc with a dark glyph,
              the same shape as the play badge, so it supplies its own contrast
              against any part of the image. focus-within matters as much as hover:
              hiding an affordance must not hide it from the keyboard. */}
          <div className={ARROW + " @min-[1024px]:left-[var(--space-6)]"}>
            <IconButton label="Previous slide" onClick={() => go(active - 1)}>
              <Icon name="chevron-left" size={26} />
            </IconButton>
          </div>
          <div className={ARROW + " @min-[1024px]:right-[var(--space-6)]"}>
            <IconButton label="Next slide" onClick={() => go(active + 1)}>
              <Icon name="chevron-right" size={26} />
            </IconButton>
          </div>

          <div
            className={[
              "absolute left-0 right-0 flex justify-center gap-[var(--space-2)]",
              bars ? "bottom-[var(--space-4)]" : "bottom-[var(--space-5)]",
            ].join(" ")}
          >
            {slides.map((_, k) => (
              <button
                key={k}
                aria-label={`Go to slide ${k + 1}`}
                onClick={() => go(k)}
                className={[
                  "cursor-pointer border-none p-0",
                  bars
                    ? "h-[var(--dot-bar-h)] w-[var(--dot-wide)] rounded-[var(--radius-none)] transition-[background] duration-[var(--dur-med)] ease-[var(--ease-out)]"
                    : "h-[var(--dot-sm)] rounded-[var(--radius-pill)] transition-[width,background] duration-[var(--dur-med)] ease-[var(--ease-out)]",
                  !bars && (k === active ? "w-[var(--dot-wide)]" : "w-[var(--dot-sm)]"),
                  k === active ? "bg-[var(--sher-white)]" : "bg-[var(--dot-idle)]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
