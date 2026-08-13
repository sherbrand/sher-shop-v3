import type { ReactElement, ReactNode, HTMLAttributes } from "react";

/* Heading — the shared level-to-tag primitive. `level` (1–4) sets the HTML tag
   (h1–h4) for the document/SEO outline without changing the visual style; styling
   comes from the passed className. Used by every layout band and overlay so
   heading levels can be tuned per page without restyling. */

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Outline level 1–4. Sets the tag only. Default 2. */
  level?: 1 | 2 | 3 | 4;
  /** Force a specific tag, overriding `level`. */
  as?: "h1" | "h2" | "h3" | "h4";
  children?: ReactNode;
}

export function Heading({ level = 2, as, children, className = "", ...rest }: HeadingProps): ReactElement {
  const clamped = Math.min(4, Math.max(1, level));
  const Tag = as ?? (`h${clamped}` as "h1" | "h2" | "h3" | "h4");
  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  );
}
