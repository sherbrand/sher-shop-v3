"use client";

import { useEffect, useState } from "react";
import type { CSSProperties, ReactElement } from "react";
import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";

/* C-HeroCarousel — the Home hero band. A sliding "peek" carousel: one banner
   below 768px, two at 50% each above. Banners are fixed portrait crops (2:3, 4:5
   from 1024px). Auto-advances by one banner with wrap; arrows and dots page by
   one. Each banner takes a solid tone (bg) or an image, plus an optional text
   overlay (eyebrow / heading / cta) over a scrim.

   The CELL WIDTH is a container query on the band's own width; the track shifts
   by --pos and the query supplies the matching percentage, so the component never
   needs to know how many banners are on screen. */

export interface HeroSlide {
  /** Solid banner tone (token or color) when no image. */
  bg?: string;
  /** Background image URL (cover). Overrides bg. */
  image?: string;
  eyebrow?: string;
  heading?: string;
  cta?: { label: string; href: string };
}

export interface HeroCarouselProps {
  slides?: HeroSlide[];
  /** Auto-advance interval in ms. Default 6000. */
  interval?: number;
  /** Auto-advance on/off. Default true. */
  autoPlay?: boolean;
  className?: string;
}

const STEP_HERO =
  "text-[length:var(--text-hero-sm)] @min-[640px]:text-[length:var(--text-hero-md)] @min-[1024px]:text-[length:var(--text-hero-lg)]";

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

  // re-enable the transition on the frame after a silent wrap-around jump
  useEffect(() => {
    if (!animate) requestAnimationFrame(() => setAnimate(true));
  }, [animate]);

  const extended = slides.concat(slides.slice(0, 2));
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
      aria-roledescription="carousel"
      className={`@container relative w-full overflow-hidden bg-[var(--surface-inverse)] ${className}`}
    >
      <div
        onTransitionEnd={onEnd}
        className={`flex translate-x-[calc(var(--pos)*-100%)] @min-[768px]:translate-x-[calc(var(--pos)*-50%)] ${
          animate
            ? "transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)]"
            : "transition-none"
        }`}
        style={{ "--pos": pos } as CSSProperties}
      >
        {extended.map((slide, k) => (
          <div
            key={k}
            className="relative aspect-[var(--ratio-2-3)] shrink-0 grow-0 basis-full overflow-hidden @min-[768px]:basis-1/2 @min-[1024px]:aspect-[var(--ratio-4-5)]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={
                slide.image
                  ? { backgroundImage: `url("${slide.image}")` }
                  : { background: slide.bg ?? "var(--surface-inverse)" }
              }
            />
            <div className="absolute inset-0 bg-[image:var(--overlay-hero)]" />
            {(slide.eyebrow || slide.heading || slide.cta) && (
              <div className="absolute inset-0 flex flex-col items-center justify-end gap-[var(--space-4)] px-[var(--gutter)] pb-[var(--space-9)] pt-[var(--space-8)] text-center text-[var(--sher-white)]">
                {slide.eyebrow && (
                  <span className="font-[family-name:var(--font-body)] text-[length:var(--text-xs)] uppercase tracking-[var(--tracking-label)] opacity-90">
                    {slide.eyebrow}
                  </span>
                )}
                {slide.heading && (
                  <span
                    className={`max-w-[18ch] font-[family-name:var(--font-display)] uppercase leading-[var(--leading-tight)] tracking-[var(--tracking-display)] ${STEP_HERO}`}
                  >
                    {slide.heading}
                  </span>
                )}
                {slide.cta && (
                  <Button
                    as="a"
                    href={slide.cta.href}
                    variant="primary"
                    className="mt-[var(--space-2)] bg-[var(--sher-white)] text-[var(--sher-dark)] hover:bg-[var(--surface-raised)]"
                  >
                    {slide.cta.label}
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <div className="absolute left-[var(--space-3)] top-1/2 -translate-y-1/2">
            <IconButton
              label="Previous slide"
              onClick={() => go(active - 1)}
              className="text-[var(--sher-white)]"
            >
              <Icon name="chevron-left" size={26} />
            </IconButton>
          </div>
          <div className="absolute right-[var(--space-3)] top-1/2 -translate-y-1/2">
            <IconButton
              label="Next slide"
              onClick={() => go(active + 1)}
              className="text-[var(--sher-white)]"
            >
              <Icon name="chevron-right" size={26} />
            </IconButton>
          </div>
          <div className="absolute inset-x-0 bottom-[var(--space-5)] flex justify-center gap-[var(--space-2)]">
            {slides.map((_, k) => (
              <button
                key={k}
                aria-label={`Go to slide ${k + 1}`}
                onClick={() => go(k)}
                className={`h-[8px] cursor-pointer border-none p-0 rounded-[var(--radius-pill)] transition-[width,background-color] duration-[var(--dur-med)] ease-[var(--ease-out)] ${
                  k === active
                    ? "w-[22px] bg-[var(--sher-white)]"
                    : "w-[8px] bg-[var(--dot-idle)]"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
