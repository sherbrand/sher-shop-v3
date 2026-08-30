"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent, ReactElement } from "react";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";

/* C-HeroCarousel — the Home hero band (F-008), on a NATIVE SCROLL-SNAP RAIL.

   BANNERS COME IN PAIRS, and the PAIR is the page at every width: ten banners are
   five pages on desktop (five pages of two) and five on mobile (five pages of one,
   showing the LEFT of each pair). The right-hand banner is not rendered below
   768px. That keeps the page count and the dot count the same everywhere, and the
   last page is 9+10 rather than 10+1, so a page never pairs the end with the start.

   Both halves are CSS, set per cell where Tailwind can see them: only an element
   with scroll-snap-align creates a snap position, so the left of each pair carries
   it and the right rides along, and below 768px the right is display:none. The
   browser does the paging.

   PAIRING IS A CONTENT RULE the component cannot enforce. With an odd number of
   banners the last page is a lone banner beside empty band. Give a hero an even
   number.

   NEVER SMOOTH-SCROLL MORE THAN ONE PAGE. scroll-snap-stop: always makes the
   browser halt at every snap point it crosses, so a multi-page programmatic scroll
   cannot complete: it is pinned at the adjacent snap point and gives up. The
   property that makes one swipe move exactly one page is the same property that
   forbids a scripted multi-page scroll. So every move past a neighbour, both wraps
   and every dot tap, goes through the overlay instead: fade a copy in, jump with
   behavior "auto" underneath, fade out.

   BOTH WRAPS crossfade, and the condition is page arithmetic, forward when
   active === pages - 1 and backward when active === 0. Never an intersection
   ratio: after a smooth scroll or a momentum flick a ratio has often not settled
   when a tick lands, and the wrap would be skipped for a rail-long scroll. */

// px of pointer travel past which a mouse gesture counts as a drag, not a click
const DRAG_SLOP = 4;
// px/ms past which a short flick still advances a whole page
const FLICK_V = 0.4;
// used only if the overlay's own duration is unreadable (mounted before the CSS)
const FADE_FALLBACK = 360;
// ms of quiet after the last scroll event before the rail counts as settled
const SCROLL_IDLE = 140;
// used only if --swipe-commit is unreadable; the same token every rail commits at
const COMMIT_FALLBACK = 56;

const mod = (a: number, n: number): number => ((a % n) + n) % n;

const lessMotion = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* The rail. The snap points and the hidden half of each pair are set per cell, not
   here. A lazy image inside display:none is never fetched, so the banners a phone
   does not show cost it nothing. touch-action keeps vertical panning with the page. */
const RAIL = [
  "flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory overscroll-x-contain",
  "[touch-action:pan-x_pan-y] [-webkit-overflow-scrolling:touch]",
  "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
  "[&>*]:snap-always",
  // snap off while a mouse drag writes scrollLeft, so the two do not fight
  "data-[drag]:snap-none data-[drag]:[scroll-behavior:auto]",
  "@min-[1024px]:cursor-grab @min-[1024px]:data-[drag]:cursor-grabbing",
  "motion-reduce:[scroll-behavior:auto]",
].join(" ");

/* The crossfade overlay, for a dot tap and for either wrap. It covers the band
   exactly, so the rail's instant jump underneath is invisible, and it never takes
   pointer events so a swipe begun during the fade still reaches the rail. ONLY this
   layer fades: the rail beneath stays opaque, because two half-transparent layers
   composite to about 75% and the band would show through at the midpoint. */
const XFADE = [
  "pointer-events-none absolute inset-0 z-[2] flex overflow-hidden",
  "transition-opacity duration-[var(--dur-slow)] ease-[var(--ease-out)]",
  "motion-reduce:duration-[1ms]",
].join(" ");

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
  /** Solid tone, painted behind the image so a banner has colour before it lands. */
  bg?: string;
  /** Banner image. */
  image?: string;
  /** Names the banner wherever it can be held: the img, the anchor, or the tone. */
  alt?: string;
  /** Makes the whole banner a link. A linked slide must carry `alt`. */
  href?: string;
}

export interface HeroCarouselProps {
  slides?: HeroSlide[];
  /** Auto-advance delay in ms. Default 6000. */
  interval?: number;
  autoPlay?: boolean;
  /** Position indicator. Default "dots". */
  indicator?: "dots" | "bars";
  /** One screen tall, desktop only. */
  fillScreen?: boolean;
  className?: string;
}

export function HeroCarousel({
  slides = [],
  interval = 6000,
  autoPlay = true,
  indicator = "dots",
  fillScreen = false,
  className = "",
}: HeroCarouselProps): ReactElement {
  const count = slides.length || 1;
  // the pair is the page at both widths, so the dot count never changes with width
  const pages = Math.ceil(count / 2);

  const railRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0); // active PAGE, not banner
  const [xfade, setXfade] = useState<number | null>(null);
  const [lit, setLit] = useState(false);
  // a deliberate move restarts the clock, so a pending tick never lands on top of it
  const [nudge, setNudge] = useState(0);

  const activeRef = useRef(0);
  const xfadeRef = useRef<number | null>(null);
  const busyRef = useRef(false); // pointer down or scroll in flight
  useEffect(() => {
    activeRef.current = active;
  }, [active]);
  useEffect(() => {
    xfadeRef.current = xfade;
  }, [xfade]);

  const commitDistance = (): number => {
    const rail = railRef.current;
    if (!rail) return COMMIT_FALLBACK;
    const v = parseFloat(getComputedStyle(rail).getPropertyValue("--swipe-commit"));
    return Number.isFinite(v) && v > 0 ? v : COMMIT_FALLBACK;
  };

  /* Which PAGE is showing, without measuring anything: the observer watches only the
     snap cells, the left of each pair, so a page is what it reports at both widths.
     It reports POSITION only. The wrap is page arithmetic in stepPage. */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const leads: HTMLDivElement[] = [];
    for (let p = 0; p < pages; p++) {
      const el = cellRefs.current[p * 2];
      if (el) leads.push(el);
    }
    if (!leads.length) return;
    const seen = new Map<Element, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target, e.intersectionRatio);
        let best = -1;
        let bestRatio = 0;
        leads.forEach((c, i) => {
          const r = seen.get(c) || 0;
          if (r > bestRatio + 0.01) {
            bestRatio = r;
            best = i;
          }
        });
        if (best >= 0) setActive(best);
      },
      { root: rail, threshold: [0, 0.25, 0.5, 0.75, 0.99, 1] },
    );
    leads.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [pages]);

  // pointer down and scroll-in-flight both make the rail busy, so autoplay yields
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let idle = 0;
    const settle = (): void => {
      window.clearTimeout(idle);
      idle = window.setTimeout(() => {
        busyRef.current = false;
      }, SCROLL_IDLE);
    };
    const onScroll = (): void => {
      busyRef.current = true;
      settle();
    };
    const down = (): void => {
      busyRef.current = true;
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    rail.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", settle);
    window.addEventListener("pointercancel", settle);
    return () => {
      window.clearTimeout(idle);
      rail.removeEventListener("scroll", onScroll);
      rail.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", settle);
      window.removeEventListener("pointercancel", settle);
    };
  }, []);

  /* Preload the banners a reader is about to reach, so a crossfade always has a
     loaded image. It asks the DOM whether the passenger cell is DISPLAYED rather
     than measuring a width, so the container query stays the single source of the
     breakpoint: below 768px only the odd banners are ever shown, and preloading the
     hidden half would undo the saving that hiding them buys. The second banner
     takes high priority at 2-up, where it is an LCP candidate and no longer eager. */
  const readyRef = useRef<Set<number> | null>(null);
  if (readyRef.current === null) readyRef.current = new Set();
  useEffect(() => {
    const passenger = cellRefs.current[1];
    const twoUp = Boolean(passenger && passenger.offsetParent !== null);
    const want: number[] = [];
    for (let p = -1; p <= 2; p++) {
      const page = mod(active + p, pages);
      want.push(page * 2);
      if (twoUp) want.push(page * 2 + 1);
    }
    for (const k of want) {
      if (k >= count) continue;
      const slide = slides[k];
      if (!slide || !slide.image) {
        readyRef.current?.add(k);
        continue;
      }
      if (readyRef.current?.has(k)) continue;
      const probe = new window.Image();
      probe.decoding = "async";
      if (twoUp && k === 1) probe.fetchPriority = "high";
      // a banner that will not load must not hold the carousel up for ever
      const done = (): void => {
        readyRef.current?.add(k);
      };
      probe.onload = done;
      probe.onerror = done;
      probe.src = slide.image;
    }
  }, [active, pages, count, slides]);

  /* Scroll to a PAGE by its lead cell's own offsetLeft: a position, not a width, so
     this is right at 1-up and 2-up without the JS knowing which. */
  const railTo = (p: number, behavior: ScrollBehavior): void => {
    const rail = railRef.current;
    const cell = cellRefs.current[mod(p, pages) * 2];
    if (!rail || !cell) return;
    rail.scrollTo({ left: cell.offsetLeft, behavior });
  };

  /* MOUSE DRAG. Touch is native scrolling and needs nothing, but a mouse cannot
     scroll a scroller at all, so without this the band swipes on a phone and is
     inert under a cursor. It only ever writes scrollLeft, so the real scroller
     moves and snap, the observer and the wrap logic all carry on working. */
  const mdrag = useRef<{
    x: number;
    left: number;
    moved: boolean;
    lastX: number;
    lastT: number;
    prevX: number;
    prevT: number;
  } | null>(null);

  const releaseDrag = (settle: boolean): void => {
    const rail = railRef.current;
    const d = mdrag.current;
    mdrag.current = null;
    if (!rail) return;
    rail.removeAttribute("data-drag");
    if (!d || !settle) return;
    // nearest PAGE by its lead cell's position, with a flick bias. No width arithmetic.
    const v = (d.lastX - d.prevX) / Math.max(1, d.lastT - d.prevT);
    let p = 0;
    let best = Infinity;
    for (let i = 0; i < pages; i++) {
      const c = cellRefs.current[i * 2];
      if (!c) continue;
      const gap = Math.abs(c.offsetLeft - rail.scrollLeft);
      if (gap < best) {
        best = gap;
        p = i;
      }
    }
    // a fast flick that has not yet travelled half a page should still advance
    if (Math.abs(v) > FLICK_V) p = Math.max(0, Math.min(pages - 1, p + (v < 0 ? 1 : -1)));
    railTo(p, lessMotion() ? "auto" : "smooth");
    setNudge((x) => x + 1);
  };

  const railDrag = {
    onPointerDown: (e: PointerEvent<HTMLDivElement>): void => {
      const rail = railRef.current;
      if (!rail || e.pointerType === "touch" || rail.scrollWidth <= rail.clientWidth) return;
      const t = performance.now();
      mdrag.current = {
        x: e.clientX,
        left: rail.scrollLeft,
        moved: false,
        lastX: e.clientX,
        lastT: t,
        prevX: e.clientX,
        prevT: t,
      };
      // suspending snap for the drag stops CSS fighting the scrollLeft writes
      rail.setAttribute("data-drag", "");
    },
    onPointerMove: (e: PointerEvent<HTMLDivElement>): void => {
      const rail = railRef.current;
      const d = mdrag.current;
      if (!rail || !d) return;
      const dx = e.clientX - d.x;
      if (Math.abs(dx) > DRAG_SLOP) d.moved = true;
      d.prevX = d.lastX;
      d.prevT = d.lastT;
      d.lastX = e.clientX;
      d.lastT = performance.now();
      rail.scrollLeft = d.left - dx;
    },
    onPointerUp: (): void => releaseDrag(true),
    onPointerLeave: (): void => releaseDrag(false),
    // a drag that ends on a linked banner must not navigate
    onClickCapture: (e: React.MouseEvent): void => {
      if (mdrag.current && mdrag.current.moved) e.stopPropagation();
    },
  };

  /* Crossfade to a PAGE: overlay it, fade it in, then move the rail underneath with
     no animation while the overlay still covers it. */
  const fadeTo = (p: number): void => {
    const k = mod(p, pages);
    if (k === activeRef.current) return;
    setNudge((v) => v + 1);
    setXfade(k);
    /* Two nested rAFs: the first schedules a frame, the second runs AFTER the
       browser has painted the mount at opacity 0, which is what gives the
       transition a start value. One rAF is not a paint boundary. */
    requestAnimationFrame(() => requestAnimationFrame(() => setLit(true)));
  };

  /* Move one page, or WRAP by crossfade. A wrap is a multi-page move, and a
     multi-page programmatic scroll cannot complete on this rail, so both ends route
     through the overlay instead. */
  const stepPage = (dir: number): void => {
    const p = activeRef.current;
    if (dir > 0 && p >= pages - 1) {
      fadeTo(0);
      return;
    }
    if (dir < 0 && p <= 0) {
      fadeTo(pages - 1);
      return;
    }
    // never more than one page: see the scroll-snap-stop note at the top of the file
    railTo(p + dir, lessMotion() ? "auto" : "smooth");
    setNudge((v) => v + 1);
  };

  const finish = useCallback((): void => {
    const k = xfadeRef.current;
    if (k == null) return;
    const rail = railRef.current;
    const cell = cellRefs.current[k * 2];
    if (rail && cell) rail.scrollTo({ left: cell.offsetLeft, behavior: "auto" });
    setLit(false);
    setXfade(null);
  }, []);

  /* transitionend is the normal path; the timer is the floor for a transition with
     no duration, which fires no event and would strand the overlay. */
  useEffect(() => {
    if (xfade == null) return;
    const el = overlayRef.current;
    const raw = el ? getComputedStyle(el).transitionDuration : "";
    const first = String(raw).split(",")[0].trim();
    const ms = /ms$/.test(first) ? parseFloat(first) : parseFloat(first) * 1000;
    const floor = (Number.isFinite(ms) && ms > 0 ? ms : FADE_FALLBACK) + 60;
    const id = window.setTimeout(finish, floor);
    return () => window.clearTimeout(id);
  }, [xfade, finish]);

  /* EDGE SWIPE — the wrap by finger. At either end the rail has nowhere left to
     scroll, so a swipe outward produces no scroll event and the gesture would die.
     Touch only, and only while the rail is already parked at that end. It is not a
     drag: nothing follows the finger, it is one threshold firing one crossfade. */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || pages <= 1) return;
    let g: { x: number; atStart: boolean; atEnd: boolean; done: boolean } | null = null;
    const start = (e: TouchEvent): void => {
      if (e.touches.length !== 1) {
        g = null;
        return;
      }
      const atStart = rail.scrollLeft <= 1;
      const atEnd = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 1;
      g =
        atStart || atEnd
          ? { x: e.touches[0]?.clientX ?? 0, atStart, atEnd, done: false }
          : null;
    };
    const move = (e: TouchEvent): void => {
      if (!g || g.done || xfadeRef.current != null) return;
      const dx = (e.touches[0]?.clientX ?? 0) - g.x;
      const commit = commitDistance();
      // pulling right at the start reaches the last page; left at the end reaches the first
      if (g.atStart && dx > commit) {
        g.done = true;
        fadeTo(pages - 1);
      } else if (g.atEnd && dx < -commit) {
        g.done = true;
        fadeTo(0);
      }
    };
    const end = (): void => {
      g = null;
    };
    rail.addEventListener("touchstart", start, { passive: true });
    rail.addEventListener("touchmove", move, { passive: true });
    rail.addEventListener("touchend", end, { passive: true });
    rail.addEventListener("touchcancel", end, { passive: true });
    return () => {
      rail.removeEventListener("touchstart", start);
      rail.removeEventListener("touchmove", move);
      rail.removeEventListener("touchend", end);
      rail.removeEventListener("touchcancel", end);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages]);

  useEffect(() => {
    if (!autoPlay || pages <= 1) return;
    const t = window.setInterval(() => {
      // never fight the reader, and never advance a tab nobody is looking at
      if (document.hidden || busyRef.current || xfadeRef.current != null) return;
      // one page, or a crossfade at the wrap. stepPage owns that decision, so the
      // tick and the arrows cannot diverge.
      stepPage(1);
    }, interval);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, interval, pages, nudge]);

  /* The pairing, per cell rather than as an nth-child selector: Tailwind reads the
     source as text, and a container-query variant stacked on an arbitrary variant
     is not generated. The LEFT of each pair carries the snap point, so a page is a
     pair at 2-up; the RIGHT is not rendered below 768px, so a page is one banner
     there and the dot count never changes with the viewport. */
  const cellClass = [
    "relative shrink-0 grow-0 basis-full overflow-hidden",
    "aspect-[var(--ratio-2-3)] @min-[768px]:basis-1/2",
    fillScreen
      ? "@min-[1024px]:aspect-auto @min-[1024px]:h-[100cqh]"
      : "@min-[1024px]:aspect-[var(--ratio-4-5)]",
  ].join(" ");

  /* One banner. `muted` is a copy shown elsewhere, kept out of the a11y tree and
     the tab order. Only the very first banner is eager: every other is lazy, and a
     lazy image inside display:none is not fetched at all, so the hidden half of
     each pair costs a phone nothing. */
  const banner = (slide: HeroSlide, muted: boolean, eager: "high" | boolean): ReactElement => {
    const named = !slide.image && !slide.href && !!slide.alt && !muted;
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
            loading={eager ? "eager" : "lazy"}
            // camelCase here: React 19 types and accepts it. The export writes it
            // lowercase because its own preview runs React 18, which warns.
            fetchPriority={eager === "high" ? "high" : undefined}
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
        className="absolute inset-0 block no-underline"
      >
        {media}
      </a>
    ) : (
      media
    );
  };

  const scrim = (
    <div className="pointer-events-none absolute inset-0 bg-[image:var(--overlay-hero)]" />
  );

  const bars = indicator === "bars";

  return (
    <section
      className={`group/hero @container relative w-full overflow-hidden bg-[var(--surface-inverse)] ${className}`}
      aria-roledescription="carousel"
    >
      <div ref={railRef} className={RAIL} {...railDrag}>
        {slides.map((slide, k) => (
          <div
            key={k}
            ref={(el) => {
              cellRefs.current[k] = el;
            }}
            className={`${cellClass} ${
              k % 2 === 0 ? "snap-start" : "@max-[767.98px]:hidden"
            }`}
          >
            {banner(slide, false, k === 0 ? "high" : false)}
            {scrim}
          </div>
        ))}
      </div>

      {/* The overlay mirrors a PAGE, the pair, so the two-up peek is covered too and
          not just the leading cell. Its even child hides below 768px by the same rule
          as the rail's, so it always covers exactly what the rail shows. */}
      {xfade != null && (
        <div
          ref={overlayRef}
          aria-hidden
          onTransitionEnd={(e) => {
            if (e.propertyName === "opacity") finish();
          }}
          style={{ opacity: lit ? 1 : 0 } as CSSProperties}
          className={XFADE}
        >
          {[0, 1].map((i) => {
            const slide = slides[xfade * 2 + i];
            if (!slide) return null;
            return (
              <div
                key={i}
                className={`${cellClass} ${i === 1 ? "@max-[767.98px]:hidden" : ""}`}
              >
                {banner(slide, true, true)}
                {scrim}
              </div>
            );
          })}
        </div>
      )}

      {pages > 1 && (
        <>
          <div className={`${ARROW} left-[var(--space-6)]`}>
            <IconButton label="Previous banners" onClick={() => stepPage(-1)}>
              <Icon name="chevron-left" size={26} />
            </IconButton>
          </div>
          <div className={`${ARROW} right-[var(--space-6)]`}>
            <IconButton label="Next banners" onClick={() => stepPage(1)}>
              <Icon name="chevron-right" size={26} />
            </IconButton>
          </div>

          <div
            className={[
              "absolute left-0 right-0 z-[3] flex justify-center gap-[var(--space-2)]",
              bars ? "bottom-[var(--space-4)]" : "bottom-[var(--space-5)]",
            ].join(" ")}
          >
            {Array.from({ length: pages }, (_, k) => (
              <button
                key={k}
                aria-label={`Go to page ${k + 1} of ${pages}`}
                onClick={() => fadeTo(k)}
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
