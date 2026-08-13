"use client";

import type { ReactElement, ReactNode } from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";

/* C-Transparent — the transparent, non-sticky header used only over the Home
   hero. It scrolls away with the page. Oversized WHITE square logo, centered,
   overflowing below the header bar. Hamburger opens C-Menu, cart opens C-Cart. */

export interface TransparentProps {
  /** Announcement bar copy. Defaults to the shipping line. */
  announcement?: ReactNode;
  /** Announcement bar tone. */
  announcementTone?: "dark" | "light" | "accent";
  onMenu?: () => void;
  onCart?: () => void;
  cartCount?: number;
  logoHref?: string;
  className?: string;
}

export function Transparent({
  announcement,
  announcementTone,
  onMenu,
  onCart,
  cartCount = 0,
  logoHref = "/",
  className = "",
}: TransparentProps): ReactElement {
  return (
    <header
      className={`absolute inset-x-0 top-0 z-[var(--z-header)] text-[var(--sher-white)] ${className}`}
    >
      <AnnouncementBar tone={announcementTone}>{announcement ?? undefined}</AnnouncementBar>
      {/* the gutter sits OUTSIDE the container cap so chrome and page content
          align at every width */}
      <div className="relative px-[var(--gutter)]">
        <div className="mx-auto flex h-[var(--header-h)] max-w-[var(--container)] items-center justify-between">
          {/* optical hedge: pull the glyph, not the 44px button box, to the gutter */}
          <IconButton
            label="Open menu"
            onClick={onMenu}
            className="-ml-[9px] text-[var(--sher-white)]"
          >
            <Icon name="menu" size={26} />
          </IconButton>

          <IconButton
            label={`Open cart${cartCount ? `, ${cartCount} items` : ""}`}
            onClick={onCart}
            className="relative -mr-[9px] text-[var(--sher-white)]"
          >
            <Icon name="bag" size={24} />
            {cartCount > 0 && (
              <span className="absolute right-[2px] top-[4px] h-[16px] min-w-[16px] px-[4px] text-center font-[family-name:var(--font-body)] text-[length:var(--text-nano)] leading-[16px] tabular-nums rounded-[var(--radius-pill)] bg-[var(--sher-white)] text-[var(--surface-inverse)]">
                {cartCount}
              </span>
            )}
          </IconButton>
        </div>

        {/* oversized square logo, centered, anchored at the bar top so it overflows only downward */}
        <div className="pointer-events-none absolute left-1/2 top-[calc(var(--space-2)+4px)] -translate-x-1/2">
          <Logo
            variant="square"
            color="white"
            size={128}
            href={logoHref}
            className="pointer-events-auto"
          />
        </div>
      </div>
    </header>
  );
}
