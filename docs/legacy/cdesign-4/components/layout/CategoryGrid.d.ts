import * as React from "react";

interface CategoryItem {
  /** Tile label (rendered as the heading). */
  label: string;
  /** Link target. */
  href: string;
  /** Stable key / slot id. */
  id?: string;
  /** Background image URL (cover). */
  image?: string;
  /** Solid tile tone when no image. */
  bg?: string;
  /** Media node layered behind the label (e.g. an <image-slot>). */
  media?: React.ReactNode;
}

/**
 * CategoryGrid (C-CategoryGrid) — a full-bleed grid of category tiles: one
 * column on mobile, two at/above 640px (CSS container query). Portrait 4:5 crops with a bottom
 * gradient label that alternates left / right per tile.
 */
export interface CategoryGridProps {
  items?: CategoryItem[];
  /** HTML level (h1–h4) for the tile labels — changes the tag only, not the style. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4;
  /** Alternate label alignment left/right per tile. Default true. */
  alternate?: boolean;
}

export function CategoryGrid(props: CategoryGridProps): JSX.Element;
