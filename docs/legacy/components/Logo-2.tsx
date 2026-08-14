import type { ReactElement, CSSProperties, HTMLAttributes } from "react";

/* SHER logo. Monogram MARK alone, or the SQUARE lockup (mark + wordmark).
   Colors: black, white, dark. Only a black mark and black/white square PNGs
   ship; the white mark and the dark tones are toned from black via CSS filter. */

export interface LogoProps extends Omit<HTMLAttributes<HTMLImageElement>, "color"> {
  /** "mark" = monogram only; "square" = mark + wordmark beneath. Default "mark". */
  variant?: "mark" | "square";
  /** Rendering color. Default "black". White mark and dark tones derive via filter. */
  color?: "black" | "white" | "dark";
  /** Mark height in px (or square width in px). Default 40. */
  size?: number;
  /** Wrap in a link to this href (adds aria-label). */
  href?: string;
  /** Accessible label / alt text. Default "SHER". */
  alt?: string;
  /** Override the /assets base URL (must end with "/"). Default "/assets/". */
  assetBase?: string;
}

// Repo assets are served from /public/assets, referenced as /assets/<name>.
const ASSET_BASE = "/assets/";

// Tone the black mark PNG to white / dark-gray without extra assets.
const FILTER: Record<string, string> = {
  black: "none",
  dark: "brightness(0) saturate(100%) invert(18%)", // ~#333231
  white: "brightness(0) invert(1)",
};

export function Logo({
  variant = "mark",
  color = "black",
  size = 40,
  href,
  alt = "SHER",
  assetBase = ASSET_BASE,
  className = "",
  style,
  ...rest
}: LogoProps): ReactElement {
  const asset = (name: string): string => assetBase + name;
  const marks = {
    mark: asset("logo-icon-black.png"),
    squareBlack: asset("logo-square-black.png"),
    squareWhite: asset("logo-square-white.png"),
  };

  let src: string;
  let imgStyle: CSSProperties;
  if (variant === "square") {
    src = color === "white" ? marks.squareWhite : marks.squareBlack;
    imgStyle = { width: size, height: "auto", filter: color === "dark" ? FILTER.dark : "none" };
  } else {
    src = marks.mark;
    imgStyle = { width: size, height: size, filter: FILTER[color] ?? "none" };
  }

  // eslint-disable-next-line @next/next/no-img-element -- brand mark, not product imagery; toned via CSS filter
  const img = <img src={src} alt={alt} className="block" style={{ ...imgStyle, ...style }} {...rest} />;

  if (href) {
    return (
      <a href={href} aria-label={alt} className={`inline-flex leading-[0] ${className}`}>
        {img}
      </a>
    );
  }
  return <span className={`inline-flex leading-[0] ${className}`}>{img}</span>;
}
