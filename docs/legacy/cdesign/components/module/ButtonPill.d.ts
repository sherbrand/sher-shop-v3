import * as React from "react";

/**
 * SHER pill button — the rounded filter / category control. Used for the
 * attribute filter (closure / set type / length) and Shop category links.
 */
export interface ButtonPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Selected state — inverts the pill to the dark fill. */
  active?: boolean;
  /** Render as another element (e.g. "a"). Default "button". */
  as?: "button" | "a";
  /** Link target when `as="a"`. */
  href?: string;
  target?: string;
  rel?: string;
}

export function ButtonPill(props: ButtonPillProps): JSX.Element;
