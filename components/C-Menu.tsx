"use client";

import type { MouseEvent, ReactElement } from "react";
import { useState } from "react";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { Logo } from "@/components/Logo";

/* C-Menu — the menu drawer. Opens from the hamburger, slides in from the left.
   Square logo centered at the top, then the link groups, then Login / Account and
   the social row. A link closes the drawer and navigates.

   `nav` picks how the groups are presented:
     "tabs"      two tabs (Shop Now / More Info), one panel visible at a time
     "accordion" two collapsible groups, Shop Now open by default */

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface MenuProps {
  open?: boolean;
  onClose?: () => void;
  /** How the groups are presented. Default "tabs". */
  nav?: "tabs" | "accordion";
  /** Content alignment. Default "center". */
  align?: "center" | "start";
  /** Size role for the menu links. Default "item". */
  linkSize?: "item" | "title";
  /** Size role for the Login / Account link. Default "body". */
  accountSize?: "body" | "item";
  /** Shop Now group links. */
  shopLinks?: NavLink[];
  /** More Info group links. */
  infoLinks?: NavLink[];
  /** Login / Account link at the drawer foot. */
  accountLink?: NavLink;
  /** Social marks below the account link. */
  socialLinks?: SocialLink[];
  /** Called with an href instead of default navigation. */
  onNavigate?: (href: string) => void;
  logoHref?: string;
  className?: string;
}

const SHOP: NavLink[] = [
  { label: "Corset Tops", href: "/corset-tops" },
  { label: "Matching Sets", href: "/matching-sets" },
  { label: "Cocktail Dresses", href: "/cocktail-dresses" },
  { label: "Beachwear", href: "/beachwear" },
  { label: "View all", href: "/shop" },
];

const INFO: NavLink[] = [
  { label: "Our Story", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
];

const ACCOUNT: NavLink = { label: "Login / Account", href: "/account" };

const SOCIAL: SocialLink[] = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "TikTok", href: "#", icon: "tiktok" },
];

// Stepped sizes, resolved against the drawer's own width.
const STEP_TITLE =
  "text-[length:var(--size-title-sm)] @min-[640px]:text-[length:var(--size-title-md)] @min-[1024px]:text-[length:var(--size-title-lg)]";
const STEP_ITEM =
  "text-[length:var(--size-item-sm)] @min-[640px]:text-[length:var(--size-item-md)] @min-[1024px]:text-[length:var(--size-item-lg)]";
const STEP_BODY =
  "text-[length:var(--size-body-sm)] @min-[640px]:text-[length:var(--size-body-md)] @min-[1024px]:text-[length:var(--size-body-lg)]";
const STEP_LABEL =
  "text-[length:var(--size-label-sm)] @min-[640px]:text-[length:var(--size-label-md)] @min-[1024px]:text-[length:var(--size-label-lg)]";

const GROUP_LABEL =
  "m-0 border-0 bg-transparent font-[family-name:var(--font-body)] font-normal uppercase tracking-[var(--tracking-label)]";

export function Menu({
  open = false,
  onClose,
  nav = "tabs",
  align = "center",
  linkSize = "item",
  accountSize = "body",
  shopLinks = SHOP,
  infoLinks = INFO,
  accountLink = ACCOUNT,
  socialLinks = SOCIAL,
  onNavigate,
  logoHref = "/",
  className = "",
}: MenuProps): ReactElement {
  const [tab, setTab] = useState<"shop" | "info">("shop");
  const [openGroups, setOpenGroups] = useState<{ shop: boolean; info: boolean }>({
    shop: true,
    info: false,
  });

  const go =
    (href: string) =>
    (event: MouseEvent): void => {
      if (onNavigate) {
        event.preventDefault();
        onNavigate(href);
      }
      onClose?.();
    };

  // Alignment the export keeps in CSS keyed to data-align, so a container query can
  // flip it. Here it is a class set, for the same reason: never an inline style.
  const mid = align === "center";
  const rowJustify = mid ? "justify-center" : "justify-start";
  const colItems = mid ? "items-center" : "items-start";
  const textAlign = mid ? "text-center" : "text-left";
  const linkPad = mid ? "pl-0" : "pl-[var(--space-3)]";
  const tabJustify = mid ? "justify-center" : "justify-between";

  const linkCls = [
    "block py-[var(--space-2)] font-[family-name:var(--font-nav)] uppercase",
    "tracking-[var(--tracking-display)] text-[var(--text-strong)] no-underline",
    linkSize === "title" ? STEP_TITLE : STEP_ITEM,
    linkPad,
    textAlign,
  ].join(" ");

  const links = (items: NavLink[]): ReactElement => (
    <div className="flex flex-col">
      {items.map((link) => (
        <a key={link.href} href={link.href} onClick={go(link.href)} className={linkCls}>
          {link.label}
        </a>
      ))}
    </div>
  );

  const GROUPS = [
    { key: "shop" as const, label: "Shop Now", items: shopLinks },
    { key: "info" as const, label: "More Info", items: infoLinks },
  ];

  const tabs = (
    <div className="mt-[var(--space-2)]">
      <div
        role="tablist"
        aria-label="Menu sections"
        className={`mb-[var(--space-6)] flex gap-[var(--space-5)] ${rowJustify}`}
      >
        {GROUPS.map((group) => {
          const on = tab === group.key;
          return (
            <button
              key={group.key}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setTab(group.key)}
              className={[
                GROUP_LABEL,
                STEP_LABEL,
                "-mb-px cursor-pointer px-0 pb-[var(--space-3)] pt-0 border-b",
                "transition-[color,border-color] duration-[var(--dur-fast)] ease-[var(--ease-out)]",
                on
                  ? "border-b-[var(--text-strong)] text-[var(--text-strong)]"
                  : "border-b-transparent text-[var(--text-meta)]",
              ].join(" ")}
            >
              {group.label}
            </button>
          );
        })}
      </div>
      {GROUPS.map((group) => (
        <div key={group.key} role="tabpanel" hidden={tab !== group.key}>
          {links(group.items)}
        </div>
      ))}
    </div>
  );

  const accordion = (
    <div className="mt-[calc(var(--space-2)-var(--space-4))] flex flex-col">
      {GROUPS.map((group) => {
        const on = openGroups[group.key];
        return (
          <div key={group.key} className="border-b border-[var(--border-default)]">
            <button
              type="button"
              aria-expanded={on}
              onClick={() =>
                setOpenGroups((state) => ({ ...state, [group.key]: !state[group.key] }))
              }
              className={[
                GROUP_LABEL,
                STEP_LABEL,
                "flex w-full cursor-pointer items-center gap-[var(--space-3)]",
                "px-0 py-[var(--space-4)] text-left leading-none",
                tabJustify,
                on ? "text-[var(--text-strong)]" : "text-[var(--text-meta)]",
              ].join(" ")}
            >
              {group.label}
              <Icon
                name="chevron-down"
                size={16}
                className={`transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] ${
                  on ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {on && <div className="pb-[var(--space-4)]">{links(group.items)}</div>}
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      aria-hidden={!open}
      inert={!open}
      className={`fixed inset-0 z-[var(--z-drawer)] ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
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
          "overflow-y-auto bg-[var(--surface-page)] p-[var(--space-5)] shadow-[var(--shadow-drawer)]",
          "transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)]",
          open ? "translate-x-0" : "-translate-x-full",
          className,
        ].join(" ")}
      >
        <div className="absolute right-[var(--space-3)] top-[var(--space-3)] z-[1]">
          <IconButton label="Close menu" onClick={onClose}>
            <Icon name="close" size={24} />
          </IconButton>
        </div>

        {/* Square logo, centered. --logo-w steps with the drawer's own width, so no
            page CSS has to override Logo's inline width. */}
        <div className="mb-[var(--space-8)] flex items-center justify-center pt-[calc(var(--announce-h)+var(--space-2)+4px-var(--space-5))] [--logo-w:96px] @min-[640px]:[--logo-w:112px] @min-[1024px]:[--logo-w:128px]">
          <Logo variant="square" color="text" size={128} href={logoHref} onClick={go(logoHref)} />
        </div>

        {nav === "accordion" ? accordion : tabs}

        <div
          className={`mt-auto flex flex-col gap-[var(--space-6)] border-t border-[var(--border-default)] py-[var(--space-5)] ${colItems} ${textAlign}`}
        >
          {accountLink && (
            <a
              href={accountLink.href}
              onClick={go(accountLink.href)}
              className={`m-0 font-[family-name:var(--font-body)] font-normal tracking-[var(--tracking-item)] text-[var(--text-default)] no-underline ${
                accountSize === "item" ? STEP_ITEM : STEP_BODY
              }`}
            >
              {accountLink.label}
            </a>
          )}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex gap-[var(--space-4)]">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex text-[var(--text-strong)]"
                >
                  <Icon name={social.icon} size={22} />
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
