import * as React from "react";

interface Crumb { label: string; href?: string; }
interface FilterPill { label: string; href?: string; key?: string; active?: boolean;   /** Per-item click handler — makes this pill a button instead of a link. */
  onClick?: () => void;
}

/**
 * C-ShopTitle — the page header band for Shop and category pages: a breadcrumb,
 * a heading, an optional description, and an optional row of filter pills. Left
 * aligned. Distinct from HeroTitle (which is centered, eyebrow + actions).
 */
export interface ShopTitleProps {
  /** Breadcrumb trail. */
  breadcrumb?: Crumb[];
  /** Page heading (required). */
  heading: string;
  /** HTML level (h1–h4) for the heading — changes the tag only, not the style. Default 1. */
  headingLevel?: 1 | 2 | 3 | 4;
  /** Lead description below the heading. */
  description?: string;
  /** Filter pills. Link pills by default; button pills when `onFilter` is set. */
  filters?: FilterPill[];
  /** Active filter key (alternative to per-item `active`). */
  activeFilter?: string;
  /** If set, pills become buttons calling this with the pill key. */
  onFilter?: (key: string) => void;
  /** "center" (default) or "start" (left-aligned). */
  align?: "center" | "start";
  /** Max line length for the description. Default "78ch". */
  measure?: string;
}

export function ShopTitle(props: ShopTitleProps): JSX.Element;
