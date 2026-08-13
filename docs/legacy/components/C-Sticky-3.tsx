"use client";

import type { ReactElement, ReactNode } from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";

/* C-Sticky — Sticky Header.
   Sticky on every screen. On Home it takes over after 60vh of scroll. Solid page
   background with a hairline base. Dark symbol (mark) logo centered; hamburger
   (opens C-Menu) left, cart (opens C-Cart) right. */

export interface StickyProps {
  announcement?: ReactNode;
  /** Tone of the embedded announcement bar. Default "dark". */
  announcementTone?: "dark" | "light" | "accent";
  onMenu?: () => void;
  onCart?: () => void;
  cartCount?: number;
  logoHref?: string;
  /** Hide the announcement bar (e.g. once scrolled). Default true. */
  showAnnouncement?: boolean;
  className?: string;
}

export function Sticky({
  announcement,
  announcementTone = "dark",
  onMenu,
  onCart,
  cartCount = 0,
  logoHref = "/",
  showAnnouncement = true,
  className = "",
}: StickyProps): ReactElement {
  return (
    <header
      className={`sticky top-0 z-[var(--z-header)] border-b border-[var(--border-default)] bg-[var(--surface-page)] text-[var(--text-strong)] ${className}`}
    >
      {showAnnouncement && (
        <AnnouncementBar tone={announcementTone}>{announcement || undefined}</AnnouncementBar>
      )}

      {/* The gutter sits OUTSIDE the container cap, the same box model as the page
          bands and C-Footer, so chrome and content align at every width. */}
      <div className="px-[var(--gutter)]">
        <div className="relative mx-auto flex h-[var(--header-h)] max-w-[var(--container)] items-center justify-between">
          {/* -9px pulls the GLYPH to the gutter: the 44px button leaves ~9px of dead space. */}
          <IconButton label="Open menu" onClick={onMenu} className="-ml-[9px]">
            <Icon name="menu" size={26} />
          </IconButton>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[calc(-50%+4px)]">
            <Logo variant="mark" color="dark" size={52} href={logoHref} />
          </div>

          <IconButton
            label={`Open cart${cartCount ? `, ${cartCount} items` : ""}`}
            onClick={onCart}
            className="relative -mr-[9px]"
          >
            <Icon name="bag" size={24} />
            {cartCount > 0 && (
              <span className="absolute right-[2px] top-[4px] h-[16px] min-w-[16px] bg-[var(--surface-inverse)] px-[4px] text-center font-[family-name:var(--font-body)] text-[length:var(--size-nano)] leading-[16px] tabular-nums text-[var(--text-on-inverse)] rounded-[var(--radius-pill)]">
                {cartCount}
              </span>
            )}
          </IconButton>
        </div>
      </div>
    </header>
  );
}
