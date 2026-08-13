import React from "react";

/* SHER icon button — square, borderless tap target for header controls
   (hamburger, cart, close). 44px min hit area for accessibility. */

export function IconButton({
  children,
  label,           // required aria-label
  size = 44,
  className = "",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button"
      aria-label={label}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: size, height: size, padding: 0, border: "none", background: "transparent",
        color: "inherit", cursor: "pointer", borderRadius: "var(--radius-sm)",
        opacity: hover ? 0.6 : 1,
        transition: "opacity var(--dur-fast) var(--ease-out)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
