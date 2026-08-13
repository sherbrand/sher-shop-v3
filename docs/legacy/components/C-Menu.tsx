"use client";

import type { ReactElement, CSSProperties, MouseEvent } from "react";
import { Heading } from "@/components/Heading";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";

/* C-Menu — Menu Drawer.
   Opens from the hamburger, slides in from the left. Dark mark logo, a "Shop Now"
   group, then Our Story / Contact Us / Login. A link closes the drawer + navigates. */

interface NavLink {
  label: string;
  href: string;
}

export interface MenuProps {
  open?: boolean;
  onClose?: () => void;
  /** HTML level (h1–h4) for the "Shop Now" heading — tag only, not style. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4;
  shopLinks?: NavLink[];
  secondaryLinks?: NavLink[];
  /** Called with an href instead of default navigation. */
  onNavigate?: (href: string) => void;
  logoHref?: string;
  className?: string;
  style?: CSSProperties;
}

const SHOP: NavLink[] = [
  { label: "Corset Tops", href: "/corset-tops" },
  { label: "Matching Sets", href: "/matching-sets" },
  { label: "Cocktail Dress", href: "/cocktail-dresses" },
  { label: "Shop All", href: "/shop" },
];
const SECONDARY: NavLink[] = [
  { label: "Our Story", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Login / Account", href: "/account" },
];

export function Menu({
  open = false,
  onClose,
  headingLevel = 2,
  shopLinks = SHOP,
  secondaryLinks = SECONDARY,
  onNavigate,
  logoHref = "/",
  className = "",
  style,
}: MenuProps): ReactElement {
  const go = (href: string) => (e: MouseEvent<Element>): void => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
    onClose?.();
  };
  const linkCls =
    "block py-[0.5rem] font-[family-name:var(--font-nav)] text-[1.5rem] uppercase tracking-[var(--tracking-1)] text-[var(--text-strong)] no-underline";

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[var(--z-drawer)] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[var(--scrim)] transition-opacity duration-[var(--dur-med)] ease-[var(--ease-out)]"
        style={{ opacity: open ? 1 : 0 }}
      />
      <nav
        aria-label="Main menu"
        className={`absolute bottom-0 left-0 top-0 flex w-[min(88vw,380px)] flex-col bg-[var(--surface-page)] p-[var(--space-5)] shadow-[var(--shadow-drawer)] transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)] ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${className}`}
        style={style}
      >
        <div className="mb-[var(--space-6)] flex items-center justify-between">
          <Logo variant="mark" color="dark" size={36} href={logoHref} onClick={go(logoHref)} />
          <IconButton label="Close menu" onClick={onClose}>
            <Icon name="close" size={24} />
          </IconButton>
        </div>

        <Heading
          level={headingLevel}
          className="mb-[var(--space-3)] font-[family-name:var(--font-body)] text-[length:var(--text-xs)] font-normal uppercase tracking-[var(--tracking-label)] text-[var(--text-muted)]"
        >
          Shop Now
        </Heading>
        <div className="mb-[var(--space-6)] flex flex-col">
          {shopLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={go(l.href)} className={linkCls}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-[var(--space-1)] border-t border-[var(--border-default)] pt-[var(--space-5)]">
          {secondaryLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={go(l.href)}
              className="py-[0.4rem] font-[family-name:var(--font-body)] text-[length:var(--text-base)] tracking-[0.02em] text-[var(--text-body)] no-underline"
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
