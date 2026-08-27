"use client";

import { useEffect, useState } from "react";
import type { CSSProperties, MouseEvent, PointerEvent, ReactElement } from "react";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";

/* C-HeroCarousel — the Home hero band. A sliding "peek" carousel: one banner on
   mobile, two at 50% each from 768px. Banners are fixed portrait crops (2:3 on
   mobile and tablet, 4:5 from 1024px). Auto-advances by one banner with wrap;
   prev/next arrows and dots page by one. Each banner takes a solid tone (`bg`) or
   an image under a scrim, and an optional `href` that makes the whole banner a link.
   The CELL WIDTH is a container query on the band's own width; the track shifts by
   --pos and the query supplies the matching percentage, so JS never needs to know
   how many banners are on screen. */

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
  className?: string;
}

export function HeroCarousel({
  slides = [],
  interval = 6000,
  autoPlay = true,
  className = "",
}: HeroCarouselProps): ReactElement {
  const [pos, setPos] = useState(0);
  const [animate, setAnimate] = useState(true);
  const count = slides.length || 1;

  useEffect(() => {
    if (!autoPlay || count <= 1) return;
    const timer = setInterval(() => setPos((p) => p + 1), interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, count]);

  // Re-enable the transition on the frame after the silent wrap-around jump.
  useEffect(() => {
    if (!animate) requestAnimationFrame(() => setAnimate(true));
  }, [animate]);

  // A drag past this many pixels is a swipe, not a click, so it must not navigate.
  const DRAG_SLOP = 6;
  const [down, setDown] = useState<{ x: number; y: number } | null>(null);
  const onPointerDown = (e: PointerEvent<HTMLAnchorElement>): void =>
    setDown({ x: e.clientX, y: e.clientY });
  const onLinkClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    if (!down) return;
    if (Math.abs(e.clientX - down.x) > DRAG_SLOP || Math.abs(e.clientY - down.y) > DRAG_SLOP) {
      e.preventDefault();
    }
  };

  const extended = [...slides, ...slides.slice(0, 2)];
  const active = ((pos % count) + count) % count;
  const go = (k: number): void => setPos((((k % count) + count) % count));
  const onEnd = (): void => {
    if (pos >= count) {
      setAnimate(false);
      setPos(pos - count);
    }
  };

  return (
    <section
      className={`@container relative w-full overflow-hidden bg-[var(--surface-inverse)] ${className}`}
      aria-roledescription="carousel"
    >
      <div
        onTransitionEnd={onEnd}
        className={[
          "flex translate-x-[calc(var(--pos,0)*-100%)] @min-[768px]:translate-x-[calc(var(--pos,0)*-50%)]",
          animate
            ? "transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)]"
            : "transition-none",
        ].join(" ")}
        style={{ "--pos": pos } as CSSProperties}
      >
        {extended.map((slide, k) => {
          // The trailing cells are wrap-around clones: keep them out of the a11y
          // tree and the tab order so a link is not announced or tabbed to twice.
          const clone = k >= count;
          const media = (
            <div
              /* Below 640 the crop shifts down so the subject sits lower in the narrow frame. */
              className="absolute inset-0 bg-cover bg-no-repeat bg-[position:center_40%] @min-[640px]:bg-center"
              /* A background image carries no alt, so the layer takes the role and
                 the name instead. Only when there is a name to give: role="img"
                 with nothing to announce is worse than leaving it decorative, so
                 a nameless layer is hidden from assistive tech instead. On a
                 linked slide the anchor carries the name, so the layer is hidden
                 either way and the name is not announced twice. */
              role={!slide.href && slide.image && slide.alt ? "img" : undefined}
              aria-label={!slide.href && slide.image && slide.alt ? slide.alt : undefined}
              aria-hidden={!slide.href && slide.image && slide.alt ? undefined : true}
              /* backgroundColor, not the `background` shorthand. React writes an
                 empty string for an undefined style value, and an empty
                 `background` clears background-image with it. The server keeps the
                 image because it skips undefined values, so the banner only goes
                 blank once this client component hydrates. */
              style={{
                backgroundImage: slide.image ? `url("${slide.image}")` : undefined,
                // Always painted, so a banner shows its tone while the image loads.
                backgroundColor: slide.bg || "var(--surface-inverse)",
              }}
            />
          );

          return (
            <div
              key={k}
              className="relative shrink-0 grow-0 basis-full overflow-hidden aspect-[var(--ratio-2-3)] @min-[768px]:basis-1/2 @min-[1024px]:aspect-[var(--ratio-4-5)]"
            >
              {slide.href ? (
                <a
                  href={slide.href}
                  aria-label={slide.alt || undefined}
                  aria-hidden={clone ? true : undefined}
                  tabIndex={clone ? -1 : undefined}
                  draggable={false}
                  onPointerDown={onPointerDown}
                  onClick={onLinkClick}
                  className="absolute inset-0 block no-underline"
                >
                  {media}
                </a>
              ) : (
                media
              )}
              {/* The scrim must not swallow a click meant for the banner link. */}
              <div className="pointer-events-none absolute inset-0 bg-[image:var(--overlay-hero)]" />
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <>
          {/* Arrows are inset from the edge, but pull flush on mobile where the
              banner is narrow and the 44px hit area already eats most of the inset. */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 @min-[640px]:left-[var(--space-3)]">
            <IconButton
              label="Previous slide"
              onClick={() => go(active - 1)}
              className="text-[var(--sher-white)]"
            >
              <Icon name="chevron-left" size={26} />
            </IconButton>
          </div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 @min-[640px]:right-[var(--space-3)]">
            <IconButton
              label="Next slide"
              onClick={() => go(active + 1)}
              className="text-[var(--sher-white)]"
            >
              <Icon name="chevron-right" size={26} />
            </IconButton>
          </div>

          <div className="absolute bottom-[var(--space-5)] left-0 right-0 flex justify-center gap-[var(--space-2)]">
            {slides.map((_, k) => (
              <button
                key={k}
                aria-label={`Go to slide ${k + 1}`}
                onClick={() => go(k)}
                className={[
                  "h-[8px] cursor-pointer border-none p-0 rounded-[var(--radius-pill)]",
                  "transition-[width,background] duration-[var(--dur-med)] ease-[var(--ease-out)]",
                  k === active
                    ? "w-[22px] bg-[var(--sher-white)]"
                    : "w-[8px] bg-[var(--dot-idle)]",
                ].join(" ")}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
