import * as React from "react";

interface NavLink { label: string; href: string; }

/**
 * C-Menu — the slide-in menu drawer opened from the hamburger. A "Shop Now"
 * group over the categories, then Our Story / Contact / Login. A link closes the
 * drawer and navigates.
 *
 */
export interface MenuProps {
  open?: boolean;
  onClose?: () => void;
  /** HTML level (h1–h4) for the "Shop Now" heading — changes the tag only, not the style. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4;
  shopLinks?: NavLink[];
  secondaryLinks?: NavLink[];
  /** Called with an href instead of default navigation. */
  onNavigate?: (href: string) => void;
  logoHref?: string;
}

export function Menu(props: MenuProps): JSX.Element;
