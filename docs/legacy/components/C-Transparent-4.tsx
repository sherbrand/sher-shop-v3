"use client";

import type { ReactElement, ReactNode } from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";

/* C-Transparent — the transparent header, Home only. Sits over the hero:
   transparent, non-sticky, scrolls away with the page. Oversized WHITE square logo
   centered and overflowing below the bar. Hamburger (opens C-Menu) left, cart
   (opens C-Cart) right.
   The gutter sits OUTSIDE the container cap, matching the band and footer box
   model, so chrome and page content align at every width.
   The -9px icon hedge pulls the 44px button back so the GLYPH lines up with the
   page gutter, not the button box. */

export interface TransparentProps {
  /** Announcement bar copy. Defaults to the shipping line. */
  announcement?: ReactNode;
  /** Announcement bar tone. */
  announcementTone?: "dark" | "light" | "accent";
  /** Hamburger handler — open C-Menu. */
  onMenu?: () => void;
  /** Cart handler — open C-Cart. */
  onCart?: () => void;
  /** Item count badge on the cart icon. */
  cartCount?: number;
  /** Logo link target. Default "/". */
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
      className={`absolute left-0 right-0 top-0 z-[var(--z-header)] text-[var(--sher-white)] ${className}`}
    >
      <AnnouncementBar tone={announcementTone}>{announcement || undefined}</AnnouncementBar>

      <div className="relative px-[var(--gutter)]">
        <div className="mx-auto flex h-[var(--header-h)] max-w-[var(--container)] items-center justify-between">
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
              <span className="absolute right-[2px] top-[4px] h-[16px] min-w-[16px] px-[4px] text-center font-[family-name:var(--font-body)] text-[length:var(--size-nano)] leading-[16px] tabular-nums bg-[var(--sher-white)] text-[var(--surface-inverse)] rounded-[var(--radius-pill)]">
                {cartCount}
              </span>
            )}
          </IconButton>
        </div>

        {/* Oversized square logo, centered, anchored at the bar top so it overflows only downward. */}
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
