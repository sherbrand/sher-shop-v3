import * as React from "react";

/**
 * SHER icon button — square, borderless tap target for chrome controls
 * (hamburger, cart, close). Minimum 44px hit area. Pass an <Icon> as children.
 */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required accessible label (icon-only). */
  label: string;
  /** Square size in px. Default 44. */
  size?: number;
  children?: React.ReactNode;
}

export function IconButton(props: IconButtonProps): JSX.Element;
