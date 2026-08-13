import * as React from "react";

interface NavLink { label: string; href: string; }
interface SocialLink { label: string; href: string; icon: "instagram" | "facebook" | "tiktok"; }

/**
 * C-Footer — the site footer on every screen. Three link columns (Shop & Learn,
 * More Information, Connect with Us) and a bottom bar with copyright + policies.
 *
 */
export interface FooterProps {
  /** HTML level (h1–h4) for the column headings — tag only, not style. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4;
  shopLinks?: NavLink[];
  infoLinks?: NavLink[];
  socialLinks?: SocialLink[];
  year?: number;
}

export function Footer(props: FooterProps): JSX.Element;
