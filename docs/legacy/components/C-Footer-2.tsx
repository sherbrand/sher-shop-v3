import type { ReactElement } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import type { BrandIconName } from "@/components/Icon";
import { Logo } from "@/components/Logo";

/* C-Footer — the site footer on every screen. Three link columns (Shop & Learn,
   More Info, Connect with Us) and a bottom bar with copyright and policies.
   Logo row + 2-across on mobile and tablet; equal 4 columns from 1024px, stepped
   off the footer's own width. */

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: BrandIconName;
}

export interface FooterProps {
  /** HTML level (h1–h4) for the column headings — tag only, not style. Default 2. */
  headingLevel?: HeadingLevel;
  shopLinks?: NavLink[];
  infoLinks?: NavLink[];
  socialLinks?: SocialLink[];
  year?: number;
  className?: string;
}

const SHOP: NavLink[] = [
  { label: "Corset Tops", href: "/corset-tops" },
  { label: "Matching Sets", href: "/matching-sets" },
  { label: "Cocktail Dress", href: "/cocktail-dresses" },
  { label: "Shop All", href: "/shop" },
];

const INFO: NavLink[] = [
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
];

const SOCIAL: SocialLink[] = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "TikTok", href: "#", icon: "tiktok" },
];

const COL_HEAD =
  "m-0 mb-[var(--space-4)] font-[family-name:var(--font-body)] text-[length:var(--text-xs)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-label)] text-[var(--text-on-inverse)] opacity-60";

const LINK =
  "block py-[0.35rem] font-[family-name:var(--font-body)] text-[length:var(--text-sm)] tracking-[0.02em] text-[var(--text-on-inverse)] no-underline";

function Column({
  title,
  links,
  headingLevel,
}: {
  title: string;
  links: NavLink[];
  headingLevel: HeadingLevel;
}): ReactElement {
  return (
    <div className="text-center">
      <Heading level={headingLevel} className={COL_HEAD}>
        {title}
      </Heading>
      <div className="flex flex-col items-center">
        {links.map((link) => (
          <a key={link.label} href={link.href} className={LINK}>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function Footer({
  headingLevel = 2,
  shopLinks = SHOP,
  infoLinks = INFO,
  socialLinks = SOCIAL,
  year = new Date().getFullYear(),
  className = "",
}: FooterProps): ReactElement {
  return (
    <footer
      className={`@container bg-[var(--surface-inverse)] px-[var(--gutter)] pb-[var(--space-6)] pt-[var(--space-9)] text-[var(--text-on-inverse)] ${className}`}
    >
      <div className="mx-auto max-w-[var(--container)]">
        <div className="grid grid-cols-2 gap-[var(--space-7)] @min-[1024px]:grid-cols-4">
          <div className="col-span-full flex items-center justify-center pb-[var(--space-7)] @min-[1024px]:col-span-1 @min-[1024px]:pb-0">
            <Logo variant="square" color="white" size={104} href="/" />
          </div>
          <Column title="Shop & Learn" links={shopLinks} headingLevel={headingLevel} />
          <Column title="More Info" links={infoLinks} headingLevel={headingLevel} />
          <div className="col-span-full text-center @min-[1024px]:col-span-1">
            <Heading level={headingLevel} className={COL_HEAD}>
              Connect with Us
            </Heading>
            <div className="mt-[0.35rem] flex justify-center gap-[var(--space-4)]">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex text-[var(--text-on-inverse)]"
                >
                  <Icon name={social.icon} size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-[var(--space-8)] flex flex-wrap items-center justify-between gap-[var(--space-4)] border-t border-[var(--border-inverse)] pt-[var(--space-5)] text-[length:var(--text-xs)] tracking-[0.04em] opacity-70">
          <span>© SHER {year}</span>
          <div className="flex gap-[var(--space-5)]">
            <a href="/privacy-policy" className="text-[var(--text-on-inverse)] no-underline">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-[var(--text-on-inverse)] no-underline">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
