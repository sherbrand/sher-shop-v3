import React from "react";

/* SHER announcement bar — the thin promo strip above both headers.
   Default copy from the PRD: worldwide delivery / free shipping over $250. */

export function AnnouncementBar({
  children = "Delivers Worldwide · Free Shipping over $250",
  tone = "dark",     // "dark" | "light" | "accent"
  className = "",
  style = {},
}) {
  const bg = { dark: "var(--surface-inverse)", light: "var(--surface-raised)", accent: "var(--accent)" }[tone];
  const fg = { dark: "var(--text-on-inverse)", light: "var(--text-default)", accent: "var(--sher-white)" }[tone];
  return (
    <div
      className={className}
      role="region" aria-label="Announcement"
      style={{
        height: "var(--announce-h)", display: "flex", alignItems: "center",
        justifyContent: "center", width: "100%",
        background: bg,
        color: fg,
        fontFamily: "var(--font-body)", fontSize: "var(--fs-announce, var(--size-announce-lg))", letterSpacing: "var(--tracking-label)",
        textTransform: "uppercase", padding: "0 var(--gutter)", textAlign: "center",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
