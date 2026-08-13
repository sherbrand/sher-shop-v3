import React from "react";
import { AnnouncementBar } from "../module/AnnouncementBar.jsx";
import { IconButton } from "../module/IconButton.jsx";
import { Icon } from "../module/Icon.jsx";
import { Logo } from "../module/Logo.jsx";

/* C-Transparent — Transparent Header.
   Home only. Sits over the hero: transparent, non-sticky, scrolls away with the
   page. Oversized WHITE square logo, centered, overflowing below the header bar.
   Hamburger (opens C-Menu) left, cart (opens C-Cart) right. */

export function Transparent({
  announcement,
  announcementTone,
  onMenu,
  onCart,
  cartCount = 0,
  logoHref = "/",
  className = "",
  style = {},
}) {
  return (
    <header
      className={className}
      style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: "var(--z-header)",
        color: "var(--sher-white)", ...style,
      }}
    >
      <AnnouncementBar tone={announcementTone}>{announcement || undefined}</AnnouncementBar>
      {/* gutter sits OUTSIDE the container cap (same box model as .sec/.wrap and
          Footer) so chrome and page content align at every width */}
      <div style={{ position: "relative", padding: "0 var(--gutter)" }}>
        <div style={{
          height: "var(--header-h)", display: "flex", alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "var(--container)", margin: "0 auto",
        }}>
          <IconButton label="Open menu" onClick={onMenu} className="sher-hedge-start" style={{ color: "var(--sher-white)" }}>
            <Icon name="menu" size={26} />
          </IconButton>

          <IconButton label={`Open cart${cartCount ? `, ${cartCount} items` : ""}`}
            onClick={onCart} className="sher-hedge-end" style={{ color: "var(--sher-white)", position: "relative" }}>
            <Icon name="bag" size={24} />
            {cartCount > 0 && <CartCount count={cartCount} light />}
          </IconButton>
        </div>

        {/* oversized square logo, centered horizontally, anchored at the bar top so it overflows only downward */}
        <div style={{
          position: "absolute", top: "calc(var(--space-2) + 4px)", left: "50%",
          transform: "translateX(-50%)", pointerEvents: "none",
        }}>
          <Logo variant="square" color="white" size={128} href={logoHref}
            style={{ pointerEvents: "auto" }} />
        </div>
      </div>
    </header>
  );
}

function CartCount({ count, light }) {
  return (
    <span style={{
      position: "absolute", top: 4, right: 2, minWidth: 16, height: 16, padding: "0 4px",
      borderRadius: "var(--radius-pill)", background: light ? "var(--sher-white)" : "var(--surface-inverse)",
      color: light ? "var(--surface-inverse)" : "var(--text-on-inverse)",
      fontFamily: "var(--font-body)", fontSize: "var(--text-nano)", lineHeight: "16px",
      textAlign: "center", fontVariantNumeric: "tabular-nums",
    }}>{count}</span>
  );
}
