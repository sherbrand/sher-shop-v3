import * as React from "react";

/**
 * SHER announcement bar — the thin promo strip that sits above the header.
 * Carries the worldwide-shipping message by default.
 */
export interface AnnouncementBarProps {
  /** Message content. Defaults to the PRD shipping line. */
  children?: React.ReactNode;
  /** "dark" (default) inverted strip, "light" on the surface tone, or "accent" (white on accent). */
  tone?: "dark" | "light" | "accent";
}

export function AnnouncementBar(props: AnnouncementBarProps): JSX.Element;
