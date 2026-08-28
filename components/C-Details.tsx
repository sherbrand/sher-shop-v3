"use client";

import type { ReactElement, ReactNode } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";

/* C-Details — the product details drawer. The prose counterpart to C-Sizing: same
   right-hand drawer and header block (heading + product name + close), with an
   intro paragraph and titled prose sections instead of a measurements table.
   Slides from the right. */

export interface DetailSection {
  /** Small uppercase eyebrow above the paragraph. */
  title?: string;
  body?: ReactNode;
}

export interface DetailsProps {
  open?: boolean;
  onClose?: () => void;
  /** HTML level (h1–h4) for the drawer heading — tag only, not style. Default 2. */
  headingLevel?: HeadingLevel;
  /** Drawer heading. Default "Details". */
  heading?: string;
  /** Shown under the heading, same slot as C-Sizing's product name. */
  productName?: string;
  /** Lead paragraph, before the sections. */
  intro?: ReactNode;
  /** Titled prose sections, in order. */
  sections?: DetailSection[];
  className?: string;
}

// Stepped title size, resolved against the drawer's own width.
const STEP_TITLE =
  "text-[length:var(--size-title-sm)] @min-[640px]:text-[length:var(--size-title-md)] @min-[1024px]:text-[length:var(--size-title-lg)]";

const EYEBROW =
  "font-[family-name:var(--font-body)] text-[length:var(--size-xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-meta)]";

const PROSE =
  "text-[length:var(--size-sm)] leading-[var(--leading-normal)] text-[var(--text-default)]";

export function Details({
  open = false,
  onClose,
  headingLevel = 2,
  heading = "Details",
  productName = "",
  intro,
  sections = [],
  className = "",
}: DetailsProps): ReactElement {
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
        aria-label="Product details"
        className={[
          "@container absolute bottom-0 right-0 top-0 flex w-[min(94vw,460px)] flex-col",
          "bg-[var(--surface-page)] shadow-[var(--shadow-drawer)]",
          "transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)]",
          open ? "translate-x-0" : "translate-x-full",
          className,
        ].join(" ")}
      >
        <div className="flex items-start justify-between border-b border-[var(--border-default)] p-[var(--space-5)]">
          <div>
            <Heading
              level={headingLevel}
              className={`m-0 font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)] ${STEP_TITLE}`}
            >
              {heading}
            </Heading>
            {productName && (
              <p className="m-0 mt-[var(--space-1)] text-[length:var(--size-sm)] text-[var(--text-meta)]">
                {productName}
              </p>
            )}
          </div>
          <IconButton label="Close details" onClick={onClose}>
            <Icon name="close" size={24} />
          </IconButton>
        </div>

        <div className="flex-1 overflow-y-auto p-[var(--space-5)]">
          {intro && <p className={`mt-0 ${PROSE}`}>{intro}</p>}
          {sections.map((section, i) => (
            <div key={section.title || i}>
              {section.title && (
                /* The first eyebrow sits flush when nothing runs above it. */
                <p
                  className={`mb-[var(--space-2)] ${
                    i === 0 && !intro ? "mt-0" : "mt-[var(--space-5)]"
                  } ${EYEBROW}`}
                >
                  {section.title}
                </p>
              )}
              <p className={`m-0 ${PROSE}`}>{section.body}</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
