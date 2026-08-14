import * as React from "react";

interface ViewOption { key: string; barsMobile: number; barsDesktop: number; label: string; }

/**
 * ViewToggle — F-003 Grid View Toggle. Segmented control that switches product
 * grid density (fewer vs more columns). Controlled (`value`) or uncontrolled.
 */
export interface ViewToggleProps {
  value?: string;
  defaultValue?: string;
  /** Options; each shows barsMobile bars, revealing up to barsDesktop at ≥1024px. Defaults to comfortable/compact. */
  options?: ViewOption[];
  onChange?: (key: string) => void;
}

export function ViewToggle(props: ViewToggleProps): JSX.Element;
