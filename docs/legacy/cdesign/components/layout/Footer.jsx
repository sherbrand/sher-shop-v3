import React from "react";
import { Heading } from "../module/Heading.jsx";
import { Icon } from "../module/Icon.jsx";
import { Logo } from "../module/Logo.jsx";

/* C-Footer — Footer, on every screen.
   Three link columns (Shop & Learn, More Information, Connect with Us) plus a
   bottom bar with copyright, Privacy Policy, and Terms of Service. */


const SHOP = [
  { label: "Corset Tops", href: "/corset-tops" },
  { label: "Matching Sets", href: "/matching-sets" },
  { label: "Cocktail Dress", href: "/cocktail-dresses" },
  { label: "Shop All", href: "/shop" },
];
const INFO = [
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
];
const SOCIAL = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "TikTok", href: "#", icon: "tiktok" },
];

export function Footer({
  headingLevel = 2,
  shopLinks = SHOP,
  infoLinks = INFO,
  socialLinks = SOCIAL,
  year = new Date().getFullYear(),
  className = "",
  style = {},
}) {
  const colHead = {
    margin: "0 0 var(--space-4)", fontFamily: "var(--font-body)", fontWeight: 400,
    fontSize: "var(--text-xs)", letterSpacing: "var(--tracking-label)",
    textTransform: "uppercase", color: "var(--text-on-inverse)", opacity: 0.6,
  };
  const link = {
    display: "block", padding: "0.35rem 0", fontFamily: "var(--font-body)",
    fontSize: "var(--text-sm)", color: "var(--text-on-inverse)", textDecoration: "none",
    letterSpacing: "0.02em",
  };
  const Col = ({ title, links }) => (
    <div style={{ textAlign: "center" }}>
      <Heading level={headingLevel} style={colHead}>{title}</Heading>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {links.map((l) => <a key={l.label} href={l.href} style={link}>{l.label}</a>)}
      </div>
    </div>
  );

  return (
    <footer
      className={className}
      style={{
        background: "var(--surface-inverse)", color: "var(--text-on-inverse)",
        padding: "var(--space-9) var(--gutter) var(--space-6)", ...style,
      }}
    >
      <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
        <div className="sher-footer-grid">
          <div className="sher-footer-logo" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Logo variant="square" color="white" size={104} href="/" />
          </div>
          <Col title="Shop & Learn" links={shopLinks} />
          <Col title="More Info" links={infoLinks} />
          <div className="sher-footer-connect" style={{ textAlign: "center" }}>
            <Heading level={headingLevel} style={colHead}>Connect with Us</Heading>
            <div style={{ display: "flex", gap: "var(--space-4)", marginTop: "0.35rem", justifyContent: "center" }}>
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer"
                  style={{ color: "var(--text-on-inverse)", display: "inline-flex" }}>
                  <Icon name={s.icon} size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          display: "flex", flexWrap: "wrap", gap: "var(--space-4)", alignItems: "center",
          justifyContent: "space-between", marginTop: "var(--space-8)",
          paddingTop: "var(--space-5)", borderTop: "1px solid var(--border-inverse)",
          fontSize: "var(--text-xs)", letterSpacing: "0.04em", opacity: 0.7,
        }}>
          <span>© SHER {year}</span>
          <div style={{ display: "flex", gap: "var(--space-5)" }}>
            <a href="/privacy-policy" style={{ color: "var(--text-on-inverse)", textDecoration: "none" }}>Privacy Policy</a>
            <a href="/terms-of-service" style={{ color: "var(--text-on-inverse)", textDecoration: "none" }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
