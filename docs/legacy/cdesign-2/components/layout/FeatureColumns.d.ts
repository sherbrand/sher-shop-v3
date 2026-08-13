import * as React from "react";

interface FeatureItem {
  /** Column subheading. */
  heading: string;
  /** Column body copy. */
  paragraph: string;
  /** Media node filling the column's 4:5 panel. */
  media?: React.ReactNode;
}

/**
 * C-FeatureColumns — an eyebrow + heading over a row of 2–3 columns, each a media
 * panel with its own subheading and paragraph. Built for the "pick your closure /
 * set type / length" comparison bands. Columns stack on mobile.
 */
export interface FeatureColumnsProps {
  eyebrow?: string;
  heading?: string;
  /** HTML level (h1–h4) for the band heading — tag only, not style. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4;
  /** HTML level (h1–h4) for each column heading — tag only. Default 3. */
  itemHeadingLevel?: 1 | 2 | 3 | 4;
  items?: FeatureItem[];
}

export function FeatureColumns(props: FeatureColumnsProps): JSX.Element;
