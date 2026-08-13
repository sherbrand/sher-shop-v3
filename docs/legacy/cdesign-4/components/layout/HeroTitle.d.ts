import * as React from "react";

/**
 * C-HeroTitle — an editorial title band: optional eyebrow, a heading, an optional
 * lead description, and optional actions below. Centered or left-aligned. Used to
 * open a page beneath the hero (e.g. S-001 "Modern Womenswear by SHER").
 */
export interface HeroTitleProps {
  /** Breadcrumb trail rendered above the eyebrow. Omit for no breadcrumb. */
  breadcrumb?: { label: string; href?: string }[];
  /** Small uppercase label above the heading. */
  eyebrow?: string;
  /** The main heading text. */
  heading: string;
  /** HTML level (h1–h4) for the heading — changes the tag only, not the style. Default 1. */
  headingLevel?: 1 | 2 | 3 | 4;
  /** Lead paragraph below the heading. */
  description?: string;
  /** "center" (default) or "start" (left-aligned). */
  align?: "center" | "start";
  /** Max line length for the description. Default "68ch". */
  measure?: string;
  /** Heading typeface: "display" (Cormorant, uppercase, tracked) or "body" (Cardo,
   *  title case, untracked). Default "display". */
  headingFont?: "display" | "body";
  /** Max line length for the heading. Default "34ch". */
  headingMeasure?: string;
  /** Optional band background (token or color). */
  background?: string;
  /** "inverse" renders the eyebrow, heading and description in white — pair it with a
   *  dark or accent `background`. Default "light". */
  tone?: "light" | "inverse";
  /** Optional actions (e.g. buttons) rendered below the description. */
  children?: React.ReactNode;
}

export function HeroTitle(props: HeroTitleProps): JSX.Element;
