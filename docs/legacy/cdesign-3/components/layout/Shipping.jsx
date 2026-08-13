import React from "react";
import { Heading } from "../module/Heading.jsx";
import { IconButton } from "../module/IconButton.jsx";
import { Icon } from "../module/Icon.jsx";

/* C-Shipping — Shipping & Returns Drawer.
   Opens from the product page. Shows the same content as the /shipping-returns
   page. Slides from the right. Pass your own content as children, or use the
   default sections. */


const DEFAULT_SECTIONS = [
  { title: "Shipping", body: "We deliver worldwide. Complimentary global shipping on orders over $250; a flat rate applies below that. Orders are dispatched within 2–3 business days." },
  { title: "Returns", body: "Unworn pieces with tags may be returned within 14 days of delivery. Made-to-measure and altered pieces are final sale." },
  { title: "Tailoring", body: "Every SHER piece can be tailored to you. Reach out and we'll guide you through measurements before you order." },
];

export function Shipping({
  open = false,
  onClose,
  headingLevel = 2,
  sections = DEFAULT_SECTIONS,
  children,
  className = "",
  style = {},
}) {
  return (
    <div aria-hidden={!open} style={{ position: "fixed", inset: 0, zIndex: "var(--z-drawer)",
      pointerEvents: open ? "auto" : "none" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0,
        background: "var(--scrim)", opacity: open ? 1 : 0,
        transition: "opacity var(--dur-med) var(--ease-out)" }} />
      <aside
        className={"sher-band " + className}
        aria-label="Shipping and returns"
        style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: "min(94vw, 460px)",
          background: "var(--surface-page)", boxShadow: "var(--shadow-drawer)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform var(--dur-med) var(--ease-out)",
          display: "flex", flexDirection: "column", ...style,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "var(--space-5)", borderBottom: "1px solid var(--border-default)" }}>
          <Heading level={headingLevel} className="t-title" style={{
            margin: 0, fontFamily: "var(--font-display)", textTransform: "uppercase",
            letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-snug)",
            color: "var(--text-strong)", fontWeight: 400,
          }}>Shipping &amp; Returns</Heading>
          <IconButton label="Close" onClick={onClose}><Icon name="close" size={24} /></IconButton>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "var(--space-5)" }}>
          {children || sections.map((s) => (
            <section key={s.title} style={{ marginBottom: "var(--space-6)" }}>
              <Heading level={Math.min(4, headingLevel + 1)} style={{
                margin: "0 0 var(--space-2)", fontFamily: "var(--font-nav)",
                textTransform: "uppercase", letterSpacing: "var(--tracking-display)", fontSize: "var(--size-sub)",
                color: "var(--text-strong)", fontWeight: 400,
              }}>{s.title}</Heading>
              <p style={{ margin: 0, color: "var(--text-default)", fontSize: "var(--size-sm)",
                lineHeight: "var(--leading-normal)" }}>{s.body}</p>
            </section>
          ))}
        </div>
      </aside>
    </div>
  );
}
