import * as React from "react";

/**
 * SHER primary button — Cormorant Infant, uppercase, tracked. The main call to
 * action across the store (Add to Cart, Checkout, Buy Now).
 *
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. Default "primary". */
  variant?: "primary" | "accent" | "secondary" | "ghost";
  /** Size. Default "md". */
  size?: "sm" | "md" | "lg";
  /** Stretch to container width. */
  fullWidth?: boolean;
  /** Render as another element (e.g. "a" for links). Default "button". */
  as?: "button" | "a";
  disabled?: boolean;
  /** Link target when `as="a"`. */
  href?: string;
  target?: string;
  rel?: string;
}

export function Button(props: ButtonProps): JSX.Element;
