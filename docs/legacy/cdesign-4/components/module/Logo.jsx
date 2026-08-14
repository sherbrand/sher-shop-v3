import React from "react";

/* SHER logo. Two variations from the brand: the monogram MARK alone, and the
   SQUARE lockup (mark + SHER wordmark beneath). Colors: black, white, dark.
   Only a black mark PNG and black/white square PNGs were provided — the white
   mark and dark mark are derived from the black mark via CSS filter. */

// Resolve /assets relative to the DS bundle so URLs work at any page depth.
let _base;
function dsBase() {
  if (_base != null) return _base;
  try {
    const s = Array.from(document.querySelectorAll("script[src]"))
      .find((x) => /_ds_bundle\.js(\?|$)/.test(x.src));
    _base = s ? s.src.replace(/_ds_bundle\.js.*$/, "") : "";
  } catch { _base = ""; }
  return _base;
}
const asset = (name) => dsBase() + "assets/" + name;


// tone the black mark PNG to white / dark-gray without extra assets
const FILTER = {
  black: "none",
  dark: "brightness(0) saturate(100%) invert(18%)", // ~#333231
  white: "brightness(0) invert(1)",
};

export function Logo({
  variant = "mark",       // "mark" | "square"
  color = "black",         // "black" | "white" | "dark"
  size = 40,                // px — mark height, or square width
  href,
  alt = "SHER",
  assetBase,                // optional override for the /assets base URL
  className = "",
  style = {},
  ...rest
}) {
  const A = assetBase != null
    ? { markBase: assetBase + "logo-icon-black.png", squareBlack: assetBase + "logo-square-black.png", squareWhite: assetBase + "logo-square-white.png" }
    : { markBase: asset("logo-icon-black.png"), squareBlack: asset("logo-square-black.png"), squareWhite: asset("logo-square-white.png") };
  let src, imgStyle;
  if (variant === "square") {
    src = color === "white" ? A.squareWhite : A.squareBlack;
    imgStyle = {
      width: size, height: "auto",
      filter: color === "dark" ? FILTER.dark : "none",
    };
  } else {
    src = A.markBase;
    imgStyle = { width: size, height: size, filter: FILTER[color] || "none" };
  }

  const img = (
    <img src={src} alt={alt} style={{ display: "block", ...imgStyle, ...style }} {...rest} />
  );

  if (href) {
    return (
      <a href={href} className={className} aria-label={alt}
         style={{ display: "inline-flex", lineHeight: 0 }}>
        {img}
      </a>
    );
  }
  return <span className={className} style={{ display: "inline-flex", lineHeight: 0 }}>{img}</span>;
}
