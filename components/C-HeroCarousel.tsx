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
// two slots: the two-up peek from 768px, one banner below it. Layout only.
const FADE_SLOTS = 2;
// used only if the blend layer's own duration is unreadable (mounted before the CSS)
const BLEND_FALLBACK = 360;

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
   *  sideways. "fade" crossfades in place and nothing translates, so there is no
   *  track position to reset and the wrap is the same operation as every other step.
   *  A drag follows the hand in both, on position in slide mode and on the crossfade
   *  in fade mode, where distance drives the blend and direction picks the banner. */
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
  /* FADE MODE IS ONE MECHANISM: a blend, and nothing else. `target` is the banner
     being faded TO (null when settled) and `blend` is how far that fade has got, 0
     to 1. Autoplay, an arrow, a dot and a drag all set a target and move the blend,
     and differ only in what moves it: a transition for the first three, the pointer
     for the fourth. Nothing translates, so there is no track position to re-base and
     no second mechanism to hand back to. Committing is invisible by construction: at
     blend 1 the incoming layer already covers the outgoing one, so adopting it
     changes no pixel. */
  const [target, setTarget] = useState<number | null>(null);
  const [blend, setBlend] = useState(0);
  /* Bumped by any DELIBERATE move: a dot, an arrow, a completed drag. It sits in the
     interval's deps, so the clock restarts and a pending tick never lands on top of
     the reader's own move, which reads as skipping two banners. */
  const [nudge, setNudge] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [dragging, setDragging] = useState(false);
  const count = slides.length || 1;
  const fade = transition === "fade";

  /* Preload the window plus one, so a crossfade never runs on a banner whose image
     has not arrived: the layer would fade in on its tone and the photograph would
     pop, which reads as a blink rather than a fade. Cost in requests is unchanged
     over a loop, since each banner is still fetched once and only as the carousel
     approaches it. Nothing extra is held in the DOM. */
  const readyRef = useRef<Set<number> | null>(null);
  if (readyRef.current === null) readyRef.current = new Set();
  const [, bumpReady] = useState(0);
  useEffect(() => {
    if (!fade) return;
    // starts at -1: a backward drag blends towards the banner behind
    for (let i = -1; i <= FADE_SLOTS; i++) {
      const k = mod(pos + i, count);
      const slide = slides[k];
      // a tone-only banner has nothing to wait for
      if (!slide || !slide.image) {
        readyRef.current?.add(k);
        continue;
      }
      if (readyRef.current?.has(k)) continue;
      const probe = new window.Image();
      probe.decoding = "async";
      const done = (): void => {
        readyRef.current?.add(k);
        bumpReady((v) => v + 1);
      };
      probe.onload = done;
      // a banner that will not load must not stall the carousel for ever
      probe.onerror = done;
      probe.src = slide.image;
    }
  }, [fade, pos, count, slides]);

  /* How many ticks in a row have been held waiting for an image. Capped, so a banner
     that never loads cannot freeze the carousel. */
  const held = useRef(0);
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

  /* Coalesce pointer moves into one update per frame. Slide mode writes a CSS
     variable and needs no render; the blend is React state, so without this a 60Hz
     drag re-renders sixty times a second. */
  const onDragMove = (e: PointerEvent<HTMLDivElement>): void => {
    const d = drag.current;
    if (!d) return;
    d.dx = e.clientX - d.x;
    if (!fade) {
      setOffset(d.dx);
      return;
    }
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const g = drag.current;
      if (!g) return;
      // direction decides WHICH banner is next; distance decides how far the blend got
      const dir = g.dx < 0 ? 1 : -1;
      setTarget(mod(posRef.current + dir, count));
      setBlend(Math.min(1, Math.abs(g.dx) / commitDistance()));
    });
  };

  const endDrag = (commit: boolean): void => {
    const d = drag.current;
    drag.current = null;
    if (raf.current) {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    }
    setDragging(false);
    if (!fade) {
      setOffset(0);
      if (!d) return;
      if (commit && Math.abs(d.dx) > commitDistance()) {
        setPos((p) => p + (d.dx < 0 ? 1 : -1));
        setNudge((v) => v + 1);
      }
      return;
    }
    if (!d) return;
    const through = commit && Math.abs(d.dx) > commitDistance();
    if (!through) {
      // reverse: back to the banner the reader started on
      if (bRef.current === 0) setTarget(null);
      else setBlend(0);
      return;
    }
    setNudge((v) => v + 1);
    /* A drag that already reached the far end has nothing left to animate, so no
       transitionend would ever arrive to finish it. */
    if (bRef.current >= 1) commitBlend();
    else setBlend(1);
  };

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
      if (fade) {
        const next = mod(posRef.current + 1, count);
        if (!readyRef.current?.has(next) && held.current < 2) {
          held.current += 1;
          return;
        }
        held.current = 0;
        // the same operation a drag performs, started by the clock instead of a finger
        setTarget(next);
        setBlend(1);
        return;
      }
      setPos((p) => p + 1);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, count, dragging, fade, nudge]);

  // Re-enable the transition on the frame after the silent wrap-around jump.
  useEffect(() => {
    if (!animate) requestAnimationFrame(() => setAnimate(true));
  }, [animate]);

  const extended = [...slides, ...slides.slice(0, 2)];
  const active = ((pos % count) + count) % count;
  /* A dot or an arrow is the same operation as a drag: name a target and run the
     blend. A distant dot therefore crossfades straight to that banner rather than
     travelling through the ones between. */
  const go = (k: number): void => {
    const t = mod(k, count);
    setNudge((v) => v + 1);
    if (!fade) {
      setPos(t);
      return;
    }
    if (t === posRef.current) return;
    setTarget(t);
    setBlend(1);
  };

  const posRef = useRef(0);
  useEffect(() => {
    posRef.current = pos;
  }, [pos]);
  const tRef = useRef<number | null>(null);
  useEffect(() => {
    tRef.current = target;
  }, [target]);
  const bRef = useRef(0);
  useEffect(() => {
    bRef.current = blend;
  }, [blend]);
  const blendRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  /* Adopt the target as the current banner. Invisible: at blend 1 the incoming layer
     already covers the outgoing one, so this changes no pixel. */
  const commitBlend = (): void => {
    if (tRef.current == null) return;
    setAnimate(false);
    setPos(tRef.current);
    setTarget(null);
    setBlend(0);
  };
  /* A floor under the transition: a blend set to a value it already holds fires no
     transitionend and would strand the fade. Read off the blend layer itself, so
     retuning the duration in the markup cannot leave a stale number here. */
  useEffect(() => {
    if (!fade || target == null || dragging || blend !== 1) return;
    const el = blendRef.current;
    const raw = el ? getComputedStyle(el).transitionDuration : "";
    const first = String(raw).split(",")[0].trim();
    const ms = /ms$/.test(first) ? parseFloat(first) : parseFloat(first) * 1000;
    const floor = (Number.isFinite(ms) && ms > 0 ? ms : BLEND_FALLBACK) + 60;
    const id = window.setTimeout(commitBlend, floor);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fade, target, blend, dragging]);

  const onEnd = (): void => {
    const p = posRef.current;
    if (p >= count) {
      setAnimate(false);
      setPos(p % count);
    }
  };

  /* The blend layer finished. Past the far end it becomes the current banner; short
     of it the fade simply reverses and there is nothing to adopt. */
  const onBlendEnd = (event: TransitionEvent<HTMLDivElement>): void => {
    if (event.propertyName !== "opacity") return;
    if (bRef.current >= 1) commitBlend();
    else setTarget(null);
  };


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
      {/* The two modes share nothing. "slide" moves the track by --pos times the
          cell width; "fade" never transforms at all, so its slots are layout only
          and every pixel of motion is the blend layer's opacity. */}
      <div
        ref={trackRef}
        onTransitionEnd={fade ? undefined : onEnd}
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={() => endDrag(true)}
        onPointerCancel={() => endDrag(false)}
        className={[
          "flex touch-pan-y",
          fade
            ? ""
            : "translate-x-[calc(var(--pos,0)*-100%+var(--drag,0px))] @min-[768px]:translate-x-[calc(var(--pos,0)*-50%+var(--drag,0px))]",
          fade
            ? ""
            : animate && !dragging
              ? "transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)]"
              : "transition-none",
        ].join(" ")}
        style={fade ? undefined : ({ "--pos": pos } as CSSProperties)}
      >
        {fade
          ? Array.from({ length: FADE_SLOTS }, (_, i) => {
              const current = slides[mod(pos + i, count)];
              const next = target == null ? null : slides[mod(target + i, count)];
              /* The second slot is off screen at 1-up and visible at 2-up. Only a
                 settled banner in an on-screen slot is announced, and the blend
                 layer is always a second copy of one named elsewhere. */
              const off = i > 0;
              return (
                <div key={i} className={cellClass}>
                  {current && (
                    <div className="absolute inset-0 overflow-hidden">
                      {banner(current, off, i === 0 ? "high" : true)}
                    </div>
                  )}
                  {next && (
                    <div
                      ref={i === 0 ? blendRef : undefined}
                      onTransitionEnd={i === 0 ? onBlendEnd : undefined}
                      aria-hidden
                      style={{ opacity: blend }}
                      className={[
                        "absolute inset-0 overflow-hidden",
                        /* The pointer drives the blend directly, so a drag must not
                           also be easing towards where the finger already is. */
                        dragging || !animate
                          ? "transition-none"
                          : "transition-opacity duration-[var(--dur-slow)] ease-[var(--ease-out)]",
                      ].join(" ")}
                    >
                      {banner(next, true, true)}
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-[image:var(--overlay-hero)]" />
                </div>
              );
            })
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
