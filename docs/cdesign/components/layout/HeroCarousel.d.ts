import * as React from "react";

interface HeroSlide {
  /** Solid banner tone (token or color) when no image. */
  bg?: string;
  /** Background image URL (cover). Overrides bg. */
  image?: string;
  /** Optional overlay eyebrow. */
  eyebrow?: string;
  /** Optional overlay heading. */
  heading?: string;
  /** Optional overlay call-to-action. */
  cta?: { label: string; href: string };
}

/**
 * HeroCarousel (C-HeroCarousel) — the Home hero band (F-008). A sliding "peek"
 * carousel: one banner below 768px, two at 50% above. Portrait crops (2:3, 4:5 from
 * 1024px) — all via CSS container queries on the band's own width. Auto-advances by one with wrap;
 * arrows and dots page by one. For a full-bleed crossfade hero use HeroCarouselStg.
 */
export interface HeroCarouselProps {
  slides?: HeroSlide[];
  /** Auto-advance interval in ms. Default 6000. */
  interval?: number;
  /** Auto-advance on/off. Default true. */
  autoPlay?: boolean;
}

export function HeroCarousel(props: HeroCarouselProps): JSX.Element;
