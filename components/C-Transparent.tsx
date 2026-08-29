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
   model, so chrome and page content align at every width. */

export interface TransparentProps {
  /** Announcement bar copy. Defaults to the shipping line. */
  announcement?: ReactNode;
  /** Tone of the embedded announcement bar. Default "accent". */
  announcementTone?: "dark" | "light" | "accent";
  /** Hamburger handler — open C-Menu. */
  onMenu?: () => void;
  /** Cart handler — open C-Cart. */
  onCart?: () => void;
  /** Item count badge on the cart icon. */
  cartCount?: number;
  /** Cart glyph shown in the header. Default "tote". */
  cartIcon?: "bag" | "tote" | "trolley";
  /** Logo link target. Default "/". */
  logoHref?: string;
  className?: string;
}

export function Transparent({
  announcement,
  announcementTone = "accent",
  onMenu,
  onCart,
  cartCount = 0,
  cartIcon = "tote",
  logoHref = "/",
  className = "",
}: TransparentProps): ReactElement {
  return (
    <header
      className={`@container absolute left-0 right-0 top-0 z-[var(--z-header)] text-[var(--sher-white)] ${className}`}
    >
      <AnnouncementBar tone={announcementTone}>{announcement || undefined}</AnnouncementBar>

      <div className="relative px-[var(--gutter)]">
        <div className="mx-auto flex h-[var(--header-h)] max-w-[var(--container)] items-center justify-between">
          {/* Optical hedge: a 44px button centers a ~26px glyph, leaving ~9px of dead
              space inside the box. Pull the first and last buttons back by that much
              so the GLYPH lines up with the page gutter, not the button box. */}
          <IconButton
            label="Open menu"
            onClick={onMenu}
            className="ml-[calc(var(--glyph-hedge)*-1)] text-[var(--sher-white)]"
          >
            <Icon name="menu" size={26} />
          </IconButton>

          <IconButton
            label={`Open cart${cartCount ? `, ${cartCount} items` : ""}`}
            onClick={onCart}
            className="relative mr-[calc(var(--glyph-hedge)*-1)] text-[var(--sher-white)]"
          >
            <Icon name={cartIcon} size={24} />
            {cartCount > 0 && (
              <span className="absolute right-[2px] top-[4px] h-[16px] min-w-[16px] px-[4px] text-center font-[family-name:var(--font-body)] text-[length:var(--size-nano)] leading-[16px] tabular-nums bg-[var(--sher-white)] text-[var(--surface-inverse)] rounded-[var(--radius-pill)]">
                {cartCount}
              </span>
            )}
          </IconButton>
        </div>

        {/* Oversized square logo, centered, anchored at the bar top so it overflows only downward.
            --logo-w steps with the header's own width, so no page CSS has to override
            Logo's inline width. */}
        <div className="pointer-events-none absolute left-1/2 top-[calc(var(--space-2)+4px)] -translate-x-1/2 [--logo-w:96px] @min-[640px]:[--logo-w:112px] @min-[1024px]:[--logo-w:128px]">
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
