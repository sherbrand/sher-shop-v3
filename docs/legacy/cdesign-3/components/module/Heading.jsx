import React from "react";

/* Heading — the shared level-to-tag primitive. `level` (1–4) sets the HTML tag
   (h1–h4) for document/SEO outline WITHOUT changing the visual style; styling
   comes from the passed style/className. Used by every layout band and overlay
   so heading levels can be tuned per page without restyling. */

export function Heading({
  level = 2,
  as,
  children,
  className = "",
  style = {},
  ...rest
}) {
  const L = Math.min(4, Math.max(1, level));
  const Tag = as || ("h" + L);
  return <Tag className={className} style={style} {...rest}>{children}</Tag>;
}
