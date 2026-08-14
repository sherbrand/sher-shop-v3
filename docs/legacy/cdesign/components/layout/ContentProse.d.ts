import * as React from "react";

interface ProseItem {
  /** Section heading. */
  heading: string;
  /** Section body copy — a single paragraph, or an array to run several.
   *  Email addresses become mailto links automatically. */
  paragraph: string | string[];
}

/**
 * C-ContentProse — the policy page band (shipping & returns, privacy policy,
 * terms of service): a full-width section that centres a run of heading +
 * paragraph blocks at a readable measure. Owns its own band padding, content
 * width, type sizes and block rhythm, stepped off its measured width.
 */
export interface ContentProseProps {
  items?: ProseItem[];
  /** HTML level (h1–h4) for each section heading — changes the tag only, not the style. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4;
  /** Max line length for the paragraphs. Default "72ch". */
  measure?: string;
  /** Width of the centred content column. Default var(--container-prose). */
  contentWidth?: string;
  /** Band background (token or color). Default transparent. */
  background?: string;
  /** Override the band's top padding (e.g. 0 when it follows a title band). */
  paddingTop?: string | number;
  /** Trailing actions row (e.g. a button) below the last section. */
  children?: React.ReactNode;
}

export function ContentProse(props: ContentProseProps): JSX.Element;
