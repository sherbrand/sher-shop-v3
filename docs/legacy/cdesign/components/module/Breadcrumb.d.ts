import * as React from "react";

interface Crumb { label: string; href?: string; }

/**
 * Breadcrumb — the page trail (e.g. Home › Shop). Every crumb links except the
 * current (last) one; the current label ellipsis-trims on narrow widths.
 */
export interface BreadcrumbProps {
  items?: Crumb[];
  /** Separator glyph. Default "›". */
  separator?: string;
}

export function Breadcrumb(props: BreadcrumbProps): JSX.Element;
