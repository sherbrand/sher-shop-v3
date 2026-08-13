"use client";

import type { ReactElement, ReactNode, CSSProperties } from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";

/* C-Sticky — Sticky Header.
   Sticky on every screen. On Home it takes over after the hero. Solid page
   background with a hairline base. Dark mark logo centered; hamburger (opens
   C-Menu) left, cart (opens C-Cart) right. */

export interface StickyProps {
  announcement?: ReactNode;
  onMenu?: () => void;
  onCart?: () => void;
  cartCount?: number;
  logoHref?: string;
  /** Hide the announcement bar (e.g. once scrolled). Default true. */
  showAnnouncement?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Sticky({
  announcement,
  onMenu,
  onCart,
  cartCount = 0,
  logoHref = "/",
  showAnnouncement = true,
  className = "",
  style,
}: StickyProps): ReactElement {
  return (
    <header
      className={`sticky top-0 z-[var(--z-header)] border-b border-[var(--border-default)] bg-[var(--surface-page)] text-[var(--text-strong)] ${className}`}
      style={style}
    >
      {showAnnouncement && <AnnouncementBar>{announcement || undefined}</AnnouncementBar>}
      <div className="relative flex h-[var(--header-h)] items-center justify-between px-[var(--gutter)]">
        <IconButton label="Open menu" onClick={onMenu}>
          <Icon name="menu" size={26} />
        </IconButton>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Logo variant="mark" color="dark" size={40} href={logoHref} />
        </div>

        <IconButton
          label={`Open cart${cartCount ? `, ${cartCount} items` : ""}`}
          onClick={onCart}
          className="relative"
        >
          <Icon name="bag" size={24} />
          {cartCount > 0 && (
            <span className="absolute right-[2px] top-[4px] flex h-[16px] min-w-[16px] items-center justify-center rounded-[var(--radius-pill)] bg-[var(--surface-inverse)] px-[4px] font-[family-name:var(--font-body)] text-[length:var(--text-nano)] leading-none text-[var(--text-on-inverse)] [font-variant-numeric:tabular-nums]">
              {cartCount}
            </span>
          )}
        </IconButton>
      </div>
    </header>
  );
}
