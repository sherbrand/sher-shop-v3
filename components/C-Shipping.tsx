"use client";

import type { ReactElement, ReactNode } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";

/* C-Shipping — the shipping & returns drawer, opened from the product page. Shows
   the same content as the /shipping-returns page. Slides from the right. Pass your
   own content as children, or use the default sections. */

export interface ShippingSection {
  title: string;
  body: string;
}

export interface ShippingProps {
  open?: boolean;
  onClose?: () => void;
  /** HTML level (h1–h4) for the "Shipping & Returns" heading — tag only, not style. Default 2. */
  headingLevel?: HeadingLevel;
  /** Section blocks. Defaults to Shipping / Returns / Tailoring copy. */
  sections?: ShippingSection[];
  /** Custom content — overrides `sections`. */
  children?: ReactNode;
  className?: string;
}

const DEFAULT_SECTIONS: ShippingSection[] = [
  {
    title: "Shipping",
    body: "We deliver worldwide. Complimentary global shipping on orders over $250; a flat rate applies below that. Orders are dispatched within 2–3 business days.",
  },
  {
    title: "Returns",
    body: "Unworn pieces with tags may be returned within 14 days of delivery. Made-to-measure and altered pieces are final sale.",
  },
  {
    title: "Tailoring",
    body: "Every SHER piece can be tailored to you. Reach out and we'll guide you through measurements before you order.",
  },
];

// Stepped title size, resolved against the drawer's own width.
const STEP_TITLE =
  "text-[length:var(--size-title-sm)] @min-[640px]:text-[length:var(--size-title-md)] @min-[1024px]:text-[length:var(--size-title-lg)]";

export function Shipping({
  open = false,
  onClose,
  headingLevel = 2,
  sections = DEFAULT_SECTIONS,
  children,
  className = "",
}: ShippingProps): ReactElement {
  const itemLevel = Math.min(4, headingLevel + 1) as HeadingLevel;

  return (
    <div
      aria-hidden={!open}
      inert={!open}
      className={`fixed inset-0 z-[var(--z-drawer)] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-[var(--scrim)] transition-opacity duration-[var(--dur-med)] ease-[var(--ease-out)] ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        aria-label="Shipping and returns"
        className={[
          "@container absolute bottom-0 right-0 top-0 flex w-[min(94vw,460px)] flex-col",
          "bg-[var(--surface-page)] shadow-[var(--shadow-drawer)]",
          "transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)]",
          open ? "translate-x-0" : "translate-x-full",
          className,
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-[var(--border-default)] p-[var(--space-5)]">
          <Heading
            level={headingLevel}
            className={`m-0 font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)] ${STEP_TITLE}`}
          >
            Shipping &amp; Returns
          </Heading>
          <IconButton label="Close" onClick={onClose}>
            <Icon name="close" size={24} />
          </IconButton>
        </div>

        <div className="flex-1 overflow-y-auto p-[var(--space-5)]">
          {children ||
            sections.map((section) => (
              <section key={section.title} className="mb-[var(--space-6)]">
                <Heading
                  level={itemLevel}
                  className="m-0 mb-[var(--space-2)] font-[family-name:var(--font-nav)] text-[length:var(--size-sub)] font-normal uppercase tracking-[var(--tracking-display)] text-[var(--text-strong)]"
                >
                  {section.title}
                </Heading>
                <p className="m-0 text-[length:var(--size-sm)] leading-[var(--leading-normal)] text-[var(--text-default)]">
                  {section.body}
                </p>
              </section>
            ))}
        </div>
      </aside>
    </div>
  );
}
