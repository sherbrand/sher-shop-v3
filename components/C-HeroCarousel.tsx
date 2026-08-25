"use client";

import { useEffect, useState } from "react";
import type { CSSProperties, ReactElement } from "react";
import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";

/* C-HeroCarousel — the Home hero band. A sliding "peek" carousel: one banner on
   mobile, two at 50% each from 768px. Banners are fixed portrait crops (2:3 on
   mobile and tablet, 4:5 from 1024px). Auto-advances by one banner with wrap;
   prev/next arrows and dots page by one. Each banner takes a solid tone (`bg`) or
   an image, plus an optional text overlay (eyebrow / heading / cta) over a scrim.
   The CELL WIDTH is a container query on the band's own width; the track shifts by
   --pos and the query supplies the matching percentage, so JS never needs to know
   how many banners are on screen. */

export interface HeroSlide {
  /** Solid banner tone (token or color) when no image. */
  bg?: string;
  /** Background image URL (cover). Overrides bg. */
  image?: string;
  /** What the banner image shows. The banner is a background, so this becomes
   *  the layer's accessible name. Leave unset to treat the image as decorative. */
  alt?: string;
  /** Optional overlay eyebrow. */
  eyebrow?: string;
  /** Optional overlay heading. */
  heading?: string;
  /** Optional overlay call-to-action. */
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

// Stepped hero size, resolved against the band's own width.
const STEP_HERO =
  "text-[length:var(--size-hero-sm)] @min-[640px]:text-[length:var(--size-hero-md)] @min-[1024px]:text-[length:var(--size-hero-lg)]";

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
        {extended.map((slide, k) => (
          <div
            key={k}
            className="relative shrink-0 grow-0 basis-full overflow-hidden aspect-[var(--ratio-2-3)] @min-[768px]:basis-1/2 @min-[1024px]:aspect-[var(--ratio-4-5)]"
          >
            <div
              /* Below 640 the crop shifts down so the subject sits lower in the narrow frame. */
              className="absolute inset-0 bg-cover bg-no-repeat bg-[position:center_40%] @min-[640px]:bg-center"
              /* A background image carries no alt, so the layer takes the role and
                 the name instead. Only when there is a name to give: role="img"
                 with nothing to announce is worse than leaving it decorative. */
              role={slide.image && slide.alt ? "img" : undefined}
              aria-label={slide.image && slide.alt ? slide.alt : undefined}
              style={{
                backgroundImage: slide.image ? `url("${slide.image}")` : undefined,
                background: slide.image ? undefined : slide.bg || "var(--surface-inverse)",
              }}
            />
            <div className="absolute inset-0 bg-[image:var(--overlay-hero)]" />
            {(slide.eyebrow || slide.heading || slide.cta) && (
              <div className="absolute inset-0 flex flex-col items-center justify-end gap-[var(--space-4)] px-[var(--gutter)] pb-[var(--space-9)] pt-[var(--space-8)] text-center text-[var(--sher-white)]">
                {slide.eyebrow && (
                  <span className="font-[family-name:var(--font-body)] text-[length:var(--size-xs)] uppercase tracking-[var(--tracking-label)] opacity-90">
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
                    className="mt-[var(--space-2)] bg-[var(--sher-white)] text-[var(--sher-dark)] hover:bg-[var(--sher-white)]"
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
