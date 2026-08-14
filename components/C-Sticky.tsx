"use client";

import type { ReactElement, ReactNode } from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";

/* C-Sticky — the sticky header shown on every screen (and taking over the Home
   hero after 60vh of scroll). Solid page background with a hairline base. Dark
   mark logo centered; hamburger (opens C-Menu) left, cart (opens C-Cart) right.
   The gutter sits OUTSIDE the container cap, matching the band and footer box
   model, so chrome and page content align at every width. */

export interface StickyProps {
  announcement?: ReactNode;
  /** Tone of the embedded announcement bar. Default "dark". */
  announcementTone?: "dark" | "light" | "accent";
  onMenu?: () => void;
  onCart?: () => void;
  cartCount?: number;
  /** Cart glyph shown in the header. Default "tote". */
  cartIcon?: "bag" | "tote" | "trolley";
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
  cartIcon = "tote",
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

      <div className="px-[var(--gutter)]">
        <div className="relative mx-auto flex h-[var(--header-h)] max-w-[var(--container)] items-center justify-between">
          <IconButton label="Open menu" onClick={onMenu} className="-ml-[9px]">
            <Icon name="menu" size={26} />
          </IconButton>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[calc(-50%+4px)]">
            <Logo variant="mark" color="dark" size={44} href={logoHref} />
          </div>

          <IconButton
            label={`Open cart${cartCount ? `, ${cartCount} items` : ""}`}
            onClick={onCart}
            className="relative -mr-[9px]"
          >
            <Icon name={cartIcon} size={24} />
            {cartCount > 0 && (
              <span className="absolute right-[2px] top-[4px] h-[16px] min-w-[16px] px-[4px] text-center font-[family-name:var(--font-body)] text-[length:var(--size-nano)] leading-[16px] tabular-nums bg-[var(--surface-inverse)] text-[var(--text-on-inverse)] rounded-[var(--radius-pill)]">
                {cartCount}
              </span>
            )}
          </IconButton>
        </div>
      </div>
    </header>
  );
}
