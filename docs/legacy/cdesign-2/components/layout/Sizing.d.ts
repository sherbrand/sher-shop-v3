import * as React from "react";

interface SizeChart {
  measures: { key: string; label: string }[];
  rows: { size: string; cm: Record<string, number> }[];
}

/**
 * C-Sizing — the size-chart drawer (F-007). Renders only the measurements a
 * product defines; the inches table is derived from the cm values.
 *
 */
export interface SizingProps {
  open?: boolean;
  onClose?: () => void;
  /** HTML level (h1–h4) for the "Size Chart" heading — tag only, not style. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4;
  productName?: string;
  /** Measures + per-size cm rows (D-005). Omitted measures are dropped from the table. */
  chart?: SizeChart;
}

export function Sizing(props: SizingProps): JSX.Element;
