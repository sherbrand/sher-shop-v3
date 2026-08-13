import * as React from "react";

/**
 * C-Transparent — the transparent, non-sticky header used only over the Home
 * hero. Oversized white square logo centered and overflowing below the bar;
 * hamburger opens the menu, cart icon opens the cart drawer.
 *
 */
export interface TransparentProps {
  /** Announcement bar copy. Defaults to the PRD shipping line. */
  announcement?: React.ReactNode;
  /** Announcement bar tone. */
  announcementTone?: "dark" | "light" | "accent";
  /** Hamburger handler — open C-Menu. */
  onMenu?: () => void;
  /** Cart handler — open C-Cart. */
  onCart?: () => void;
  /** Item count badge on the cart icon. */
  cartCount?: number;
  /** Logo link target. Default "/". */
  /** Cart glyph shown in the header. Default "tote". */
  cartIcon?: "bag" | "tote" | "trolley";
  logoHref?: string;
}

export function Transparent(props: TransparentProps): JSX.Element;
