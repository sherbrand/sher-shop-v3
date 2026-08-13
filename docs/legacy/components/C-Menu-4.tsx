"use client";

import type { MouseEvent, ReactElement } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";

/* C-Menu — the menu drawer. Opens from the hamburger, slides in from the left.
   Dark mark logo, a "Shop Now" group, then Our Story / Contact Us / Login.
   A link closes the drawer and navigates. */

export interface NavLink {
  label: string;
  href: string;
}

export interface MenuProps {
  open?: boolean;
  onClose?: () => void;
  /** HTML level (h1–h4) for the "Shop Now" heading — changes the tag only, not the style. Default 2. */
  headingLevel?: HeadingLevel;
  shopLinks?: NavLink[];
  secondaryLinks?: NavLink[];
  /** Called with an href instead of default navigation. */
  onNavigate?: (href: string) => void;
  logoHref?: string;
  className?: string;
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

// Stepped title size, resolved against the drawer's own width.
const STEP_TITLE =
  "text-[length:var(--size-title-sm)] @min-[640px]:text-[length:var(--size-title-md)] @min-[1024px]:text-[length:var(--size-title-lg)]";

export function Menu({
  open = false,
  onClose,
  headingLevel = 2,
  shopLinks = SHOP,
  secondaryLinks = SECONDARY,
  onNavigate,
  logoHref = "/",
  className = "",
}: MenuProps): ReactElement {
  const go =
    (href: string) =>
    (event: MouseEvent): void => {
      if (onNavigate) {
        event.preventDefault();
        onNavigate(href);
      }
      onClose?.();
    };

  const linkCls =
    "block px-0 py-[var(--space-2)] font-[family-name:var(--font-nav)] uppercase tracking-[var(--tracking-display)] text-[var(--text-strong)] no-underline";

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[var(--z-drawer)] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-[var(--scrim)] transition-opacity duration-[var(--dur-med)] ease-[var(--ease-out)] ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <nav
        aria-label="Main menu"
        className={[
          "@container absolute bottom-0 left-0 top-0 flex w-[min(88vw,380px)] flex-col",
          "bg-[var(--surface-page)] p-[var(--space-5)] shadow-[var(--shadow-drawer)]",
          "transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)]",
          open ? "translate-x-0" : "-translate-x-full",
          className,
        ].join(" ")}
      >
        <div className="mb-[var(--space-6)] flex items-center justify-between">
          <Logo variant="mark" color="dark" size={36} href={logoHref} onClick={go(logoHref)} />
          <IconButton label="Close menu" onClick={onClose}>
            <Icon name="close" size={24} />
          </IconButton>
        </div>

        <Heading
          level={headingLevel}
          className="m-0 mb-[var(--space-3)] font-[family-name:var(--font-body)] text-[length:var(--size-xs)] font-normal uppercase tracking-[var(--tracking-label)] text-[var(--text-meta)]"
        >
          Shop Now
        </Heading>
        <div className="mb-[var(--space-6)] flex flex-col">
          {shopLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={go(link.href)}
              className={`${linkCls} ${STEP_TITLE}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-[var(--space-1)] border-t border-[var(--border-default)] pt-[var(--space-5)]">
          {secondaryLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={go(link.href)}
              className="px-0 py-[var(--pad-row-md)] font-[family-name:var(--font-body)] text-[length:var(--size-base)] tracking-[var(--tracking-item)] text-[var(--text-default)] no-underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
