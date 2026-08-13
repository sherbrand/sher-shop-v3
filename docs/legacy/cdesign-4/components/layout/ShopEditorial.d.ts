import * as React from "react";

/**
 * C-ShopEditorial — the Shop / category editorial band. a two-up editorial band: a media panel beside a text column
 * (eyebrow, heading, paragraph, optional actions). `mirror` swaps the sides.
 * Stacks to one column below 768px (CSS container query) with the media first.
 */
export interface ShopEditorialProps {
  /** Short kicker above the heading. */
  eyebrow?: string;
  heading?: string;
  /** HTML level (h1–h4) for the heading — changes the tag only, not the style. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4;
  /** Heading typeface: "display" (Cormorant, uppercase, tracked) or "body" (Cardo,
   *  title case, untracked). Default "display". */
  headingFont?: "display" | "body";
  paragraph?: string;
  /** Media node (e.g. an <image-slot> or <img>) filling the 4:5 panel. */
  media?: React.ReactNode;
  /** Put the text on the LEFT and the media on the right at two-up. Default false. */
  mirror?: boolean;
  /** Which column leads when stacked (below 768px). Default "media". */
  mobileFirst?: "media" | "text";
  /** Stacked (below 768px) only: push the text column to the right edge.
   *  Default "left". Ignored at two-up. */
  mobileAlign?: "left" | "right";
  /** Column gap comes from the `--editorial-gap` custom property (default `--space-6`),
   *  so pages can step it per breakpoint in their container-query blocks. */
  /** Column gap override. Defaults to the band's own stepped rhythm — 24px below
   *  1024, 64px at/above — or set the `--editorial-gap` custom property. */
  gap?: string;
  /** Media aspect ratio. Defaults to the band's own stepped crop — 4:3 mobile,
   *  1:1 tablet, 5:4 desktop. */
  ratio?: string;
  /** Optional band background (token or color). */
  background?: string;
  /** Buttons / links rendered under the paragraph. */
  children?: React.ReactNode;
}

export function ShopEditorial(props: ShopEditorialProps): JSX.Element;
