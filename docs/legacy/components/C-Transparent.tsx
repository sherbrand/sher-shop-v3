"use client";

import type { ReactElement, ReactNode, CSSProperties } from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";

/* C-Transparent — Transparent Header.
   Home only. Sits over the hero: transparent, non-sticky, scrolls away with the
   page. Oversized WHITE square logo, centered, overflowing below the header bar.
   Hamburger (opens C-Menu) left, cart (opens C-Cart) right. */

export interface TransparentProps {
  /** Announcement bar copy. Defaults to the shipping line. */
  announcement?: ReactNode;
  /** Hamburger handler — open C-Menu. */
  onMenu?: () => void;
  /** Cart handler — open C-Cart. */
  onCart?: () => void;
  /** Item count badge on the cart icon. */
  cartCount?: number;
  /** Logo link target. Default "/". */
  logoHref?: string;
  className?: string;
  style?: CSSProperties;
}

export function Transparent({
  announcement,
  onMenu,
  onCart,
  cartCount = 0,
  logoHref = "/",
  className = "",
  style,
}: TransparentProps): ReactElement {
  return (
    <header
      className={`absolute inset-x-0 top-0 z-[var(--z-header)] text-[var(--sher-white)] ${className}`}
      style={style}
    >
      <AnnouncementBar>{announcement || undefined}</AnnouncementBar>
      <div className="relative">
        <div className="flex h-[var(--header-h)] items-center justify-between px-[var(--gutter)]">
          <IconButton label="Open menu" onClick={onMenu}>
            <Icon name="menu" size={26} />
          </IconButton>

          <IconButton
            label={`Open cart${cartCount ? `, ${cartCount} items` : ""}`}
            onClick={onCart}
            className="relative"
          >
            <Icon name="bag" size={24} />
            {cartCount > 0 && (
              <span className="absolute right-[2px] top-[4px] flex h-[16px] min-w-[16px] items-center justify-center rounded-[var(--radius-pill)] bg-[var(--sher-white)] px-[4px] font-[family-name:var(--font-body)] text-[length:var(--text-nano)] leading-none text-[var(--surface-inverse)] [font-variant-numeric:tabular-nums]">
                {cartCount}
              </span>
            )}
          </IconButton>
        </div>

        {/* oversized square logo, centered, overflowing below the bar */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[30%]">
          <Logo variant="square" color="white" size={128} href={logoHref} className="pointer-events-auto" />
        </div>
      </div>
    </header>
  );
}
