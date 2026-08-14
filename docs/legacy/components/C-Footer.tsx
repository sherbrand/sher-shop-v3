import type { ReactElement, CSSProperties } from "react";
import { Heading } from "@/components/Heading";
import { Icon, type IconName } from "@/components/Icon";
import { Logo } from "@/components/Logo";

/* C-Footer — Footer, on every screen.
   Three link columns (Shop & Learn, More Information, Connect with Us) plus a
   bottom bar with copyright, Privacy Policy, and Terms of Service. */

interface NavLink {
  label: string;
  href: string;
}
interface SocialLink {
  label: string;
  href: string;
  icon: Extract<IconName, "instagram" | "facebook" | "tiktok">;
}

export interface FooterProps {
  /** HTML level (h1–h4) for the column headings — tag only, not style. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4;
  shopLinks?: NavLink[];
  infoLinks?: NavLink[];
  socialLinks?: SocialLink[];
  year?: number;
  className?: string;
  style?: CSSProperties;
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
  "mb-[var(--space-4)] font-[family-name:var(--font-body)] text-[length:var(--text-xs)] font-normal uppercase tracking-[var(--tracking-label)] text-[var(--text-on-inverse)] opacity-60";
const LINK =
  "block py-[0.35rem] font-[family-name:var(--font-body)] text-[length:var(--text-sm)] tracking-[0.02em] text-[var(--text-on-inverse)] no-underline";

export function Footer({
  headingLevel = 2,
  shopLinks = SHOP,
  infoLinks = INFO,
  socialLinks = SOCIAL,
  year = new Date().getFullYear(),
  className = "",
  style,
}: FooterProps): ReactElement {
  const Col = ({ title, links }: { title: string; links: NavLink[] }): ReactElement => (
    <div>
      <Heading level={headingLevel} className={COL_HEAD}>
        {title}
      </Heading>
      <div className="flex flex-col">
        {links.map((l) => (
          <a key={l.label} href={l.href} className={LINK}>
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <footer
      className={`bg-[var(--surface-inverse)] px-[var(--gutter)] pb-[var(--space-6)] pt-[var(--space-9)] text-[var(--text-on-inverse)] ${className}`}
      style={style}
    >
      <div className="mx-auto max-w-[var(--container)]">
        <div className="mb-[var(--space-8)] flex justify-center">
          <Logo variant="square" color="white" size={104} href="/" />
        </div>

        <div className="grid gap-[var(--space-7)] border-t border-[var(--border-inverse)] pt-[var(--space-7)] [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
          <Col title="Shop & Learn" links={shopLinks} />
          <Col title="More Information" links={infoLinks} />
          <div>
            <Heading level={headingLevel} className={COL_HEAD}>
              Connect with Us
            </Heading>
            <div className="mt-[0.35rem] flex gap-[var(--space-4)]">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex text-[var(--text-on-inverse)]"
                >
                  <Icon name={s.icon} size={22} />
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
