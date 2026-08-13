import * as React from "react";

/**
 * C-EditorialSplit — a two-up editorial band: a media panel beside a text column
 * (eyebrow, heading, paragraph, optional actions). `mirror` swaps the sides.
 * Stacks to one column below 768px (CSS container query) with the media first.
 */
export interface EditorialSplitProps {
  /** Short kicker above the heading. */
  eyebrow?: string;
  heading?: string;
  /** HTML level (h1–h4) for the heading — changes the tag only, not the style. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4;
  paragraph?: string;
  /** Media node (e.g. an <image-slot> or <img>) filling the 4:5 panel. */
  media?: React.ReactNode;
  /** Put the text on the LEFT and the media on the right at two-up. Default false. */
  mirror?: boolean;
  /** Which column leads when stacked (below 768px). Default "media". */
  mobileFirst?: "media" | "text";
  /** Round the media panel corners (`radius.sm`). Default false. */
  mediaRounded?: boolean;
  /** Column gap comes from the `--editorial-gap` custom property (default `--space-6`),
   *  so pages can step it per breakpoint in their container-query blocks. */
  /** Optional band background (token or color). */
  background?: string;
  /** Buttons / links rendered under the paragraph. */
  children?: React.ReactNode;
}

export function EditorialSplit(props: EditorialSplitProps): JSX.Element;
