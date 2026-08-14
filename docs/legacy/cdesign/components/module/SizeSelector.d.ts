import * as React from "react";

interface SizeOption {
  /** Size label, e.g. "S". */
  label: string;
  /** Render disabled and struck through. */
  soldOut?: boolean;
}

/**
 * SizeSelector — the product page's size chips (F-004). Sold-out sizes are
 * disabled and struck; the selected chip inverts to the dark fill.
 */
export interface SizeSelectorProps {
  sizes?: SizeOption[];
  /** Controlled selected size label. */
  value?: string | null;
  /** Initial selection when uncontrolled. Defaults to the first in-stock size. */
  defaultValue?: string;
  onChange?: (label: string) => void;
  /** Group label above the chips. Default "Size". */
  label?: string;
}

export function SizeSelector(props: SizeSelectorProps): JSX.Element;
