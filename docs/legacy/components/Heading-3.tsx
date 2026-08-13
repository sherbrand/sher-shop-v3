import type { ElementType, ReactElement, ReactNode, HTMLAttributes } from "react";

/* Heading — the shared level-to-tag primitive. `level` (1–4) sets the HTML tag
   (h1–h4) for the document/SEO outline WITHOUT changing the visual style; styling
   comes from the passed className/style. Every layout band and overlay uses it so
   heading levels can be tuned per page without restyling. */

export type HeadingLevel = 1 | 2 | 3 | 4;

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** HTML heading level → tag h1–h4. Default 2. */
  level?: HeadingLevel;
  /** Force a specific tag, overriding `level`. */
  as?: ElementType;
  children?: ReactNode;
}

export function Heading({
  level = 2,
  as,
  children,
  className = "",
  ...rest
}: HeadingProps): ReactElement {
  const clamped = Math.min(4, Math.max(1, level));
  const Tag = (as ?? `h${clamped}`) as ElementType;
  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  );
}
