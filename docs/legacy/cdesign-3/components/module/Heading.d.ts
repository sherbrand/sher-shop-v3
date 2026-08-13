import * as React from "react";

/**
 * Heading — the shared level-to-tag primitive. `level` (1–4) picks the HTML tag
 * (h1–h4) for the document outline WITHOUT changing the visual style; style
 * comes from `style`/`className`. Every layout band and overlay uses it so a
 * page can set heading levels for SEO without restyling.
 */
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** HTML heading level → tag h1–h4. Default 2. */
  level?: 1 | 2 | 3 | 4;
  /** Force a specific tag, overriding `level`. */
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

export function Heading(props: HeadingProps): JSX.Element;
