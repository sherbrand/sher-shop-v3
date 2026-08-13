import * as React from "react";

interface HeroSlide {
  /** Background image URL. Omit for a tonal (dark) panel. */
  image?: string;
  eyebrow?: string;
  heading?: string;
  /** Overlay call-to-action. */
  cta?: { label: string; href: string };
}

/**
 * HeroCarouselStg — the Home hero band (F-008). Auto-advancing banner carousel with
 * a text overlay, prev/next arrows, and dot indicators. Full-bleed.
 */
export interface HeroCarouselStgProps {
  slides?: HeroSlide[];
  /** Auto-advance interval in ms. Default 6000. */
  interval?: number;
  /** "fill" (100% of parent), a px number, or any CSS length. Default "fill". */
  height?: "fill" | number | string;
  /** Auto-advance. Default true. */
  autoPlay?: boolean;
}

export function HeroCarouselStg(props: HeroCarouselStgProps): JSX.Element;
