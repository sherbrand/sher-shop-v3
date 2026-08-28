import type { ReactElement } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import type { BrandIconName } from "@/components/Icon";

/* C-ContactMethods — the stacked contact band: one row per method, each a heading
   over its content. Three kinds: "social" (brand-mark links), "email" (mailto
   link), "address" (plain address text, newlines kept). Rows are hairline-separated.

   Rows are centered. The band centers its text and lets each row keep the flex
   default of stretching full width, so the hairlines still span the column. */

export interface ContactSocialLink {
  label: string;
  href: string;
  icon: BrandIconName;
}

export interface ContactItem {
  /** Row heading, e.g. "Email - For business inquiries". */
  heading: string;
  /** Which content the row renders. */
  kind: "social" | "email" | "address";
  /** Email address (kind "email") or address text (kind "address"; newlines kept). */
  value?: string;
  /** Brand-mark links (kind "social"). */
  links?: ContactSocialLink[];
}

export interface ContactMethodsProps {
  items?: ContactItem[];
  /** HTML level (h1–h4) for each row heading — changes the tag only, not the style. Default 2. */
  headingLevel?: HeadingLevel;
  className?: string;
}

// Stepped body size, resolved against the band's own width.
const STEP_BODY =
  "text-[length:var(--size-body-sm)] @min-[640px]:text-[length:var(--size-body-md)] @min-[1024px]:text-[length:var(--size-body-lg)]";

export function ContactMethods({
  items = [],
  headingLevel = 2,
  className = "",
}: ContactMethodsProps): ReactElement {
  return (
    <div className={`@container flex flex-col text-center ${className}`}>
      {items.map((item, i) => (
        <div
          key={`${item.heading}-${i}`}
          className={[
            "flex flex-col gap-[var(--space-3)] py-[var(--space-6)]",
            "border-b border-b-[var(--border-default)]",
            i === 0 ? "border-t border-t-[var(--border-default)]" : "",
          ].join(" ")}
        >
          <Heading
            level={headingLevel}
            className="m-0 font-[family-name:var(--font-display)] text-[length:var(--size-sub)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)]"
          >
            {item.heading}
          </Heading>

          {/* Flex items ignore text-align, so the marks take their own centering
              from justify-content. */}
          {item.kind === "social" && (
            <div className="flex items-center justify-center gap-[var(--space-4)]">
              {(item.links ?? []).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex text-[var(--text-strong)]"
                >
                  <Icon name={link.icon} size={24} />
                </a>
              ))}
            </div>
          )}

          {item.kind === "email" && (
            <a
              href={`mailto:${item.value}`}
              className={`font-[family-name:var(--font-body)] text-[var(--text-strong)] underline underline-offset-[0.25em] ${STEP_BODY}`}
            >
              {item.value}
            </a>
          )}

          {item.kind === "address" && (
            <address
              className={`m-0 whitespace-pre-line not-italic leading-[var(--leading-normal)] text-[var(--text-default)] ${STEP_BODY}`}
            >
              {item.value}
            </address>
          )}
        </div>
      ))}
    </div>
  );
}
