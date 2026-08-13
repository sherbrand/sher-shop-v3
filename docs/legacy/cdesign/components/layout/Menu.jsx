import React from "react";
import { Heading } from "../module/Heading.jsx";
import { IconButton } from "../module/IconButton.jsx";
import { Icon } from "../module/Icon.jsx";
import { Logo } from "../module/Logo.jsx";

/* C-Menu — Menu Drawer.
   Opens from the hamburger, slides in from the left. Dark mark logo, a "Shop Now"
   group, then Our Story / Contact Us / Login. A link closes the drawer + navigates. */

const SHOP = [
  { label: "Corset Tops", href: "/corset-tops" },
  { label: "Matching Sets", href: "/matching-sets" },
  { label: "Cocktail Dress", href: "/cocktail-dresses" },
  { label: "Shop All", href: "/shop" },
];
const SECONDARY = [
  { label: "Our Story", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Login / Account", href: "/account" },
];


export function Menu({
  open = false,
  onClose,
  headingLevel = 2,
  shopLinks = SHOP,
  secondaryLinks = SECONDARY,
  onNavigate,
  logoHref = "/",
  className = "",
  style = {},
}) {
  const go = (href) => (e) => {
    if (onNavigate) { e.preventDefault(); onNavigate(href); }
    onClose && onClose();
  };
  const linkStyle = {
    display: "block", fontFamily: "var(--font-nav)", textTransform: "uppercase",
    letterSpacing: "var(--tracking-display)",  color: "var(--text-strong)",
    padding: "var(--space-2) 0", textDecoration: "none",
  };
  return (
    <div aria-hidden={!open} style={{ position: "fixed", inset: 0, zIndex: "var(--z-drawer)",
      pointerEvents: open ? "auto" : "none" }}>
      <div onClick={onClose} style={{
        position: "absolute", inset: 0, background: "var(--scrim)",
        opacity: open ? 1 : 0, transition: "opacity var(--dur-med) var(--ease-out)",
      }} />
      <nav
        className={"sher-band " + className}
        aria-label="Main menu"
        style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: "min(88vw, 380px)",
          background: "var(--surface-page)", boxShadow: "var(--shadow-drawer)",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform var(--dur-med) var(--ease-out)",
          display: "flex", flexDirection: "column", padding: "var(--space-5)", ...style,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "var(--space-6)" }}>
          <Logo variant="mark" color="dark" size={36} href={logoHref} onClick={go(logoHref)} />
          <IconButton label="Close menu" onClick={onClose}><Icon name="close" size={24} /></IconButton>
        </div>

        <Heading level={headingLevel} style={{
          fontSize: "var(--text-xs)", letterSpacing: "var(--tracking-label)",
          color: "var(--text-meta)", fontFamily: "var(--font-body)", fontWeight: 400,
          textTransform: "uppercase", margin: "0 0 var(--space-3)",
        }}>Shop Now</Heading>
        <div style={{ display: "flex", flexDirection: "column", marginBottom: "var(--space-6)" }}>
          {shopLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={go(l.href)} className="t-title" style={linkStyle}>{l.label}</a>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)",
          marginTop: "auto", borderTop: "1px solid var(--border-default)", paddingTop: "var(--space-5)" }}>
          {secondaryLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={go(l.href)} style={{
              fontFamily: "var(--font-body)", fontSize: "var(--text-base)",
              letterSpacing: "0.02em", color: "var(--text-default)", padding: "0.4rem 0",
              textDecoration: "none",
            }}>{l.label}</a>
          ))}
        </div>
      </nav>
    </div>
  );
}
