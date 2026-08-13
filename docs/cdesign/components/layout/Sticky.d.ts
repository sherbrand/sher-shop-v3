import * as React from "react";

/**
 * C-Sticky — the sticky header shown on every screen (and taking over the Home
 * hero after 60vh). Dark monogram mark centered; hamburger opens the menu, cart
 * icon opens the cart drawer.
 *
 */
export interface StickyProps {
  announcement?: React.ReactNode;
  /** Tone of the embedded announcement bar. Default "dark". */
  announcementTone?: "dark" | "light" | "accent";
  onMenu?: () => void;
  onCart?: () => void;
  cartCount?: number;
  /** Cart glyph shown in the header. Default "tote". */
  cartIcon?: "bag" | "tote" | "trolley";
  logoHref?: string;
  /** Hide the announcement bar (e.g. once scrolled). Default true. */
  showAnnouncement?: boolean;
}

export function Sticky(props: StickyProps): JSX.Element;
