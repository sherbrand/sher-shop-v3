import * as React from "react";

/**
 * SHER brand logo. Renders the monogram mark alone, or the square lockup
 * (mark + SHER wordmark). Use in headers, menu drawer, footer, and anywhere the
 * brand identity appears.
 *
 */
export interface LogoProps extends Omit<React.HTMLAttributes<HTMLImageElement>, "color"> {
  /** "mark" = monogram only; "square" = mark + wordmark beneath. Default "mark". */
  variant?: "mark" | "square";
  /** Rendering color. Default "black". (white mark/dark mark derived via filter.) */
  color?: "black" | "white" | "dark";
  /** Mark height in px (or square width in px). Default 40. */
  size?: number;
  /** Wrap in a link to this href (adds aria-label). */
  href?: string;
  /** Accessible label / alt text. Default "SHER". */
  alt?: string;
  /** Override the /assets base URL (must end with "/"). Defaults to resolving relative to the loaded _ds_bundle.js. */
  assetBase?: string;
}

export function Logo(props: LogoProps): JSX.Element;
