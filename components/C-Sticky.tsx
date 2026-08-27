"use client";

import type { ReactElement, ReactNode } from "react";
import { useEffect, useState } from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";

/* C-Sticky — the sticky header shown on every screen (and taking over on Home
   once the hero has scrolled out of view). Solid page background with a
   hairline base. Dark mark logo centered; hamburger (opens C-Menu) left, cart
   (opens C-Cart) right.
   The gutter sits OUTSIDE the container cap, matching the band and footer box
   model, so chrome and page content align at every width. */

export interface StickyProps {
  announcement?: ReactNode;
  /** Tone of the embedded announcement bar. Default "light". */
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
  announcementTone = "light",
  onMenu,
  onCart,
  cartCount = 0,
  cartIcon = "tote",
  logoHref = "/",
  showAnnouncement = true,
  className = "",
}: StickyProps): ReactElement {
  // Hide on scroll down, reveal on scroll up. Direction is behavior, tracked here;
  // whether the hide APPLIES is a CSS decision, so the breakpoint stays out of the JS.
  const [away, setAway] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = (): void => {
      const y = window.scrollY;
      // Ignore jitter, and never hide the header before it has cleared its own height.
      if (Math.abs(y - last) < 6) return;
      setAway(y > last && y > 80);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "@container sticky top-0 z-[var(--z-header)] border-b border-[var(--border-default)]",
        "bg-[var(--surface-page)] text-[var(--text-strong)]",
        /* Tailwind v4 puts translate-y on the standalone `translate` property, so that
           is what transitions. Naming `transform` here animates nothing. */
        "motion-safe:transition-[translate] motion-safe:duration-[var(--dur-med)] motion-safe:ease-[var(--ease-out)]",
        /* Desktop only. The header sits outside every container, so this one reads the
           viewport: there is nothing above it to query. Same exemption as the drawer widths.
           `lg` is 64rem, and rem in a media query is always 16px-based, so it is 1024px
           here despite the 81.25% root — the same breakpoint the design system uses. */
        away ? "lg:-translate-y-full" : "",
        className,
      ].join(" ")}
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
