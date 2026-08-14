import React from "react";
import { AnnouncementBar } from "../module/AnnouncementBar.jsx";
import { IconButton } from "../module/IconButton.jsx";
import { Icon } from "../module/Icon.jsx";
import { Logo } from "../module/Logo.jsx";

/* C-Sticky — Sticky Header.
   Sticky on every screen. On Home it takes over after 60vh of scroll. Solid page
   background with a hairline base. Dark symbol (mark) logo centered; hamburger
   (opens C-Menu) left, cart (opens C-Cart) right. */

export function Sticky({
  announcement,
  announcementTone = "dark",
  onMenu,
  onCart,
  cartCount = 0,
  logoHref = "/",
  showAnnouncement = true,
  className = "",
  style = {},
}) {
  return (
    <header
      className={className}
      style={{
        position: "sticky", top: 0, zIndex: "var(--z-header)",
        background: "var(--surface-page)", color: "var(--text-strong)",
        borderBottom: "1px solid var(--border-default)", ...style,
      }}
    >
      {showAnnouncement && <AnnouncementBar tone={announcementTone}>{announcement || undefined}</AnnouncementBar>}
      {/* gutter sits OUTSIDE the container cap (same box model as .sec/.wrap and
          Footer) so chrome and page content align at every width */}
      <div style={{ padding: "0 var(--gutter)" }}>
      <div style={{
        position: "relative", height: "var(--header-h)", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        maxWidth: "var(--container)", margin: "0 auto",
      }}>
        <IconButton label="Open menu" onClick={onMenu} className="sher-hedge-start">
          <Icon name="menu" size={26} />
        </IconButton>

        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, calc(-50% + 4px))",
        }}>
          <Logo variant="mark" color="dark" size={52} href={logoHref} />
        </div>

        <IconButton label={`Open cart${cartCount ? `, ${cartCount} items` : ""}`}
          onClick={onCart} className="sher-hedge-end" style={{ position: "relative" }}>
          <Icon name="bag" size={24} />
          {cartCount > 0 && (
            <span style={{
              position: "absolute", top: 4, right: 2, minWidth: 16, height: 16, padding: "0 4px",
              borderRadius: "var(--radius-pill)", background: "var(--surface-inverse)",
              color: "var(--text-on-inverse)", fontFamily: "var(--font-body)",
              fontSize: "var(--text-nano)", lineHeight: "16px", textAlign: "center",
              fontVariantNumeric: "tabular-nums",
            }}>{cartCount}</span>
          )}
        </IconButton>
      </div>
      </div>
    </header>
  );
}
