import type { ReactElement } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import type { BrandIconName } from "@/components/Icon";
import { Logo } from "@/components/Logo";

/* C-Footer — Footer, on every screen.
   Three link columns (Shop & Learn, More Information, Connect with Us) plus a
   bottom bar with copyright, Privacy Policy, and Terms of Service. */

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocialLink extends FooterLink {
  icon: BrandIconName;
}

export interface FooterProps {
  /** HTML level (h1–h4) for the column headings — tag only, not style. Default 2. */
  headingLevel?: HeadingLevel;
  shopLinks?: FooterLink[];
  infoLinks?: FooterLink[];
  socialLinks?: FooterSocialLink[];
  year?: number;
  className?: string;
}

const SHOP: FooterLink[] = [
  { label: "Corset Tops", href: "/corset-tops" },
  { label: "Matching Sets", href: "/matching-sets" },
  { label: "Cocktail Dress", href: "/cocktail-dresses" },
  { label: "Shop All", href: "/shop" },
];

const INFO: FooterLink[] = [
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
];

const SOCIAL: FooterSocialLink[] = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "TikTok", href: "#", icon: "tiktok" },
];

const COL_HEAD =
  "m-0 mb-[var(--space-4)] font-[family-name:var(--font-body)] text-[length:var(--size-xs)] font-normal uppercase tracking-[var(--tracking-label)] text-[var(--text-on-inverse)] opacity-60";
const LINK =
  "block py-[var(--pad-row-sm)] font-[family-name:var(--font-body)] text-[length:var(--size-sm)] tracking-[var(--tracking-item)] text-[var(--text-on-inverse)] no-underline";

export function Footer({
  headingLevel = 2,
  shopLinks = SHOP,
  infoLinks = INFO,
  socialLinks = SOCIAL,
  year = new Date().getFullYear(),
  className = "",
}: FooterProps): ReactElement {
  const column = (title: string, links: FooterLink[]): ReactElement => (
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

  return (
    <footer
      className={`@container bg-[var(--surface-inverse)] px-[var(--gutter)] pb-[var(--space-6)] pt-[var(--space-9)] text-[var(--text-on-inverse)] ${className}`}
    >
      <div className="mx-auto max-w-[var(--container)]">
        {/* Logo row + 2-across on mobile and tablet; equal 4-across on desktop. */}
        <div className="grid grid-cols-2 gap-[var(--space-7)] @min-[1024px]:grid-cols-4">
          <div className="col-span-full flex items-center justify-center pb-[var(--space-7)] @min-[1024px]:col-auto @min-[1024px]:pb-0">
            <Logo variant="square" color="white" size={104} href="/" />
          </div>
          {column("Shop & Learn", shopLinks)}
          {column("More Info", infoLinks)}
          <div className="col-span-full text-center @min-[1024px]:col-auto">
            <Heading level={headingLevel} className={COL_HEAD}>
              Connect with Us
            </Heading>
            <div className="mt-[var(--pad-row-sm)] flex justify-center gap-[var(--space-4)]">
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

        <div className="mt-[var(--space-8)] flex flex-wrap items-center justify-between gap-[var(--space-4)] border-t border-[var(--border-inverse)] pt-[var(--space-5)] text-[length:var(--size-xs)] tracking-[var(--tracking-item)] opacity-70">
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
