import * as React from "react";

interface SocialLink {
  label: string;
  href: string;
  icon: "instagram" | "facebook" | "tiktok";
}

interface ContactItem {
  /** Row heading, e.g. "Email - For business inquiries". */
  heading: string;
  /** Which content the row renders. */
  kind: "social" | "email" | "address";
  /** Email address (kind "email") or address text (kind "address"; newlines kept). */
  value?: string;
  /** Brand-mark links (kind "social"). */
  links?: SocialLink[];
}

/**
 * C-ContactMethods — the stacked contact band: one hairline-separated row per
 * method, each a heading over its content (social marks, a mailto link, or an
 * address block).
 */
export interface ContactMethodsProps {
  items?: ContactItem[];
  /** HTML level (h1–h4) for each row heading — changes the tag only, not the style. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4;
}

export function ContactMethods(props: ContactMethodsProps): JSX.Element;
