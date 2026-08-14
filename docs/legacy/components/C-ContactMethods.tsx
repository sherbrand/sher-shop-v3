import type { ReactElement } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import type { BrandIconName } from "@/components/Icon";

/* C-ContactMethods — the stacked contact band: one row per method, each a heading
   over its content. Three kinds: "social" (brand-mark links), "email" (mailto
   link), "address" (plain address text). Rows are hairline-separated. */

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
  /** HTML level (h1–h4) for each row heading — tag only, not style. Default 2. */
  headingLevel?: HeadingLevel;
  className?: string;
}

const STEP_BODY =
  "text-[length:var(--text-body-sm)] @min-[640px]:text-[length:var(--text-body-md)] @min-[1024px]:text-[length:var(--text-body-lg)]";
// Display heading treatment — face, case, tracking, leading, color.
const HEADING_FACE =
  "font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)]";

export function ContactMethods({
  items = [],
  headingLevel = 2,
  className = "",
}: ContactMethodsProps): ReactElement {
  return (
    <div className={`@container flex flex-col ${className}`}>
      {items.map((item, i) => (
        <div
          key={`${item.heading}-${i}`}
          className={`flex flex-col gap-[var(--space-3)] border-b border-[var(--border-default)] py-[var(--space-6)] ${
            i === 0 ? "border-t" : ""
          }`}
        >
          <Heading
            level={headingLevel}
            className={`m-0 text-[length:var(--text-sub)] ${HEADING_FACE}`}
          >
            {item.heading}
          </Heading>

          {item.kind === "social" && (
            <div className="flex items-center gap-[var(--space-4)]">
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

          {item.kind === "email" && item.value && (
            <a
              href={`mailto:${item.value}`}
              className={`font-[family-name:var(--font-body)] text-[var(--text-strong)] underline underline-offset-[0.25em] ${STEP_BODY}`}
            >
              {item.value}
            </a>
          )}

          {item.kind === "address" && item.value && (
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
