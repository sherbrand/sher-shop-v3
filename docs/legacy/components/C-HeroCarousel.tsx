"use client";

import { useEffect, useState } from "react";
import type { ReactElement, CSSProperties } from "react";
import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";

/* C-HeroCarousel — the Home hero band. Slides through featured banners with a text
   overlay; auto-advances, with prev/next arrows and dot indicators. Full-bleed,
   edge-to-edge. Text sits over a tonal scrim for AA contrast. */

interface HeroSlide {
  /** Background image URL. Omit for a tonal (dark) panel. */
  image?: string;
  eyebrow?: string;
  heading?: string;
  /** Overlay call-to-action. */
  cta?: { label: string; href: string };
}

export interface HeroCarouselProps {
  slides?: HeroSlide[];
  /** Auto-advance interval in ms. Default 6000. */
  interval?: number;
  /** "fill" (100% of parent), a px number, or any CSS length. Default "fill". */
  height?: "fill" | number | string;
  /** Auto-advance. Default true. */
  autoPlay?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function HeroCarousel({
  slides = [],
  interval = 6000,
  height = "fill",
  autoPlay = true,
  className = "",
  style,
}: HeroCarouselProps): ReactElement {
  const [i, setI] = useState(0);
  const n = slides.length || 1;
  const go = (k: number): void => setI((k + n) % n);

  useEffect(() => {
    if (!autoPlay || n <= 1) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), interval);
    return () => clearInterval(t);
  }, [autoPlay, interval, n]);

  const h = height === "fill" ? "100%" : typeof height === "number" ? `${height}px` : height;

  return (
    <section
      aria-roledescription="carousel"
      className={`relative w-full overflow-hidden bg-[var(--surface-inverse)] ${className}`}
      style={{ height: h, ...style }}
    >
      {slides.map((s, k) => (
        <div
          key={k}
          aria-hidden={k !== i}
          className="absolute inset-0 transition-opacity duration-[var(--dur-slow)] ease-[var(--ease-out)]"
          style={{ opacity: k === i ? 1 : 0, pointerEvents: k === i ? "auto" : "none" }}
        >
          <div
            className="absolute inset-0 bg-[var(--surface-inverse)] bg-cover bg-center bg-no-repeat"
            style={s.image ? { backgroundImage: `url("${s.image}")` } : undefined}
          />
          <div className="absolute inset-0 bg-[image:var(--overlay-hero)]" />
          <div className="absolute inset-0 flex flex-col items-center justify-end gap-[var(--space-4)] px-[var(--gutter)] pb-[var(--space-9)] pt-[var(--space-8)] text-center text-[var(--sher-white)]">
            {s.eyebrow && (
              <span className="font-[family-name:var(--font-body)] text-[length:var(--text-xs)] uppercase tracking-[var(--tracking-label)] opacity-90">
                {s.eyebrow}
              </span>
            )}
            {s.heading && (
              <span className="max-w-[18ch] font-[family-name:var(--font-display)] text-[length:var(--text-hero)] uppercase leading-[1.1] tracking-[var(--tracking-display)]">
                {s.heading}
              </span>
            )}
            {s.cta && (
              <Button
                as="a"
                href={s.cta.href}
                variant="primary"
                className="mt-[var(--space-2)]"
                style={{ background: "var(--sher-white)", color: "var(--sher-dark)" }}
              >
                {s.cta.label}
              </Button>
            )}
          </div>
        </div>
      ))}

      {n > 1 && (
        <>
          <div className="absolute left-[var(--space-3)] top-1/2 -translate-y-1/2 text-[var(--sher-white)]">
            <IconButton label="Previous slide" onClick={() => go(i - 1)}>
              <Icon name="chevron-left" size={26} />
            </IconButton>
          </div>
          <div className="absolute right-[var(--space-3)] top-1/2 -translate-y-1/2 text-[var(--sher-white)]">
            <IconButton label="Next slide" onClick={() => go(i + 1)}>
              <Icon name="chevron-right" size={26} />
            </IconButton>
          </div>
          <div className="absolute inset-x-0 bottom-[var(--space-5)] flex justify-center gap-[var(--space-2)]">
            {slides.map((_, k) => (
              <button
                key={k}
                aria-label={`Go to slide ${k + 1}`}
                onClick={() => go(k)}
                className="h-[8px] cursor-pointer rounded-[var(--radius-pill)] border-none p-0 transition-all duration-[var(--dur-med)] ease-[var(--ease-out)]"
                style={{
                  width: k === i ? 22 : 8,
                  background: k === i ? "var(--sher-white)" : "var(--dot-idle)",
                }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
