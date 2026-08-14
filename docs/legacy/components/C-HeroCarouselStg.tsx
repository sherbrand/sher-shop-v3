"use client";

import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";

/* C-HeroCarouselStg — the full-bleed crossfade hero band. Slides through featured
   banners with a text overlay; auto-advances, with prev/next arrows and dot
   indicators. Text sits over a tonal scrim for AA contrast. */

export interface HeroStgSlide {
  /** Background image URL. Omit for a tonal (dark) panel. */
  image?: string;
  eyebrow?: string;
  heading?: string;
  cta?: { label: string; href: string };
}

export interface HeroCarouselStgProps {
  slides?: HeroStgSlide[];
  /** Auto-advance interval in ms. Default 6000. */
  interval?: number;
  /** "fill" (100% of parent), a px number, or any CSS length. Default "fill". */
  height?: "fill" | number | string;
  /** Auto-advance. Default true. */
  autoPlay?: boolean;
  className?: string;
}

const STEP_HERO =
  "text-[length:var(--text-hero-sm)] @min-[640px]:text-[length:var(--text-hero-md)] @min-[1024px]:text-[length:var(--text-hero-lg)]";

export function HeroCarouselStg({
  slides = [],
  interval = 6000,
  height = "fill",
  autoPlay = true,
  className = "",
}: HeroCarouselStgProps): ReactElement {
  const [index, setIndex] = useState(0);
  const count = slides.length || 1;
  const go = (k: number): void => setIndex((k + count) % count);

  useEffect(() => {
    if (!autoPlay || count <= 1) return;
    const timer = setInterval(() => setIndex((x) => (x + 1) % count), interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, count]);

  const resolved =
    height === "fill" ? "100%" : typeof height === "number" ? `${height}px` : height;

  return (
    <section
      aria-roledescription="carousel"
      className={`@container relative w-full overflow-hidden bg-[var(--surface-inverse)] ${className}`}
      style={{ height: resolved }}
    >
      {slides.map((slide, k) => (
        <div
          key={k}
          aria-hidden={k !== index}
          className={`absolute inset-0 transition-opacity duration-[var(--dur-slow)] ease-[var(--ease-out)] ${
            k === index ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-[var(--surface-inverse)] bg-cover bg-center bg-no-repeat"
            style={slide.image ? { backgroundImage: `url("${slide.image}")` } : undefined}
          />
          {/* tonal scrim for text legibility */}
          <div className="absolute inset-0 bg-[image:var(--overlay-hero)]" />
          <div className="absolute inset-0 flex flex-col items-center justify-end gap-[var(--space-4)] px-[var(--gutter)] pb-[var(--space-9)] pt-[var(--space-8)] text-center text-[var(--sher-white)]">
            {slide.eyebrow && (
              <span className="font-[family-name:var(--font-body)] text-[length:var(--text-xs)] uppercase tracking-[var(--tracking-label)] opacity-90">
                {slide.eyebrow}
              </span>
            )}
            {slide.heading && (
              <span
                className={`max-w-[18ch] font-[family-name:var(--font-display)] uppercase leading-[1.1] tracking-[var(--tracking-display)] ${STEP_HERO}`}
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
        </div>
      ))}

      {count > 1 && (
        <>
          <div className="absolute left-[var(--space-3)] top-1/2 -translate-y-1/2">
            <IconButton
              label="Previous slide"
              onClick={() => go(index - 1)}
              className="text-[var(--sher-white)]"
            >
              <Icon name="chevron-left" size={26} />
            </IconButton>
          </div>
          <div className="absolute right-[var(--space-3)] top-1/2 -translate-y-1/2">
            <IconButton
              label="Next slide"
              onClick={() => go(index + 1)}
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
                  k === index
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
