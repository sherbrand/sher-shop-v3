import React from "react";
import { Logo } from "./Logo.jsx";

/* Divider — the end/section mark used to close a band or separate one from the
   next. Three treatments, all built from border tokens:
     "rule"     a short centred hairline
     "mark"     a diamond knocked out of a tapered hairline
     "monogram" the SHER mark between two outward-fading rules
   C-ProductGrid uses it for its `endMark`; pages place it directly to open or
   close a section. */

export function Divider({
  variant = "mark",
  knockout = "var(--surface-page)",   // ring colour behind the "mark" diamond
  className = "",
  style = {},
}) {
  if (variant === "rule") {
    return (
      <hr aria-hidden="true" className={className}
        style={{ marginLeft: "auto", marginRight: "auto", width: 64, marginTop: 0,
          marginBottom: 0, border: 0, borderTop: "1px solid var(--border-strong)", ...style }} />
    );
  }

  if (variant === "monogram") {
    return (
      <div aria-hidden="true" className={className}
        style={{ display: "flex", alignItems: "center", justifyContent: "center",
          gap: "var(--space-2)", ...style }}>
        <span style={{ display: "block", height: 1, width: 140,
          background: "linear-gradient(90deg,transparent,var(--border-default))" }} />
        <Logo variant="mark" size={13} alt="" style={{ opacity: 0.45, flexShrink: 0 }} />
        <span style={{ display: "block", height: 1, width: 140,
          background: "linear-gradient(90deg,var(--border-default),transparent)" }} />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={className}
      style={{ position: "relative", display: "flex", alignItems: "center",
        justifyContent: "center", ...style }}>
      <span style={{ display: "block", height: 1, width: 220,
        background: "linear-gradient(90deg,transparent,var(--border-strong) 22%,var(--border-strong) 78%,transparent)" }} />
      <span style={{ position: "absolute", width: 6, height: 6,
        background: "var(--text-strong)", transform: "rotate(45deg)",
        boxShadow: "0 0 0 4px " + knockout }} />
    </div>
  );
}
