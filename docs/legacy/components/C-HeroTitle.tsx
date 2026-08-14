import type { ReactElement, ReactNode } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";
import { Breadcrumb } from "@/components/Breadcrumb";
import type { Crumb } from "@/components/Breadcrumb";

/* C-HeroTitle — an editorial title band: an optional breadcrumb, optional eyebrow,
   a heading, an optional lead description, and optional actions (buttons) below.
   Centered or left-aligned. Type sizes step against the band's OWN width. */

export interface HeroTitleProps {
  /** Breadcrumb trail rendered above the eyebrow. */
  breadcrumb?: Crumb[];
  /** Small uppercase label above the heading. */
  eyebrow?: string;
  /** The main heading text. */
  heading: string;
  /** HTML level (h1–h4) for the heading — tag only, not style. Default 1. */
  headingLevel?: HeadingLevel;
  /** Lead paragraph below the heading. */
  description?: string;
  /** "center" (default) or "start" (left-aligned). */
  align?: "center" | "start";
  /** Max line length for the description. Default "68ch". */
  measure?: string;
  /** Heading typeface: "display" (Cormorant, uppercase, tracked) or "body" (Cardo,
   *  title case, untracked). Default "display". */
  headingFont?: "display" | "body";
  /** Max line length for the heading. Default "34ch". */
  headingMeasure?: string;
  /** Optional band background (token or color). */
  background?: string;
  /** Optional actions (e.g. buttons) rendered below the description. */
  children?: ReactNode;
  className?: string;
}

const STEP_DISPLAY =
  "text-[length:var(--text-display-sm)] @min-[640px]:text-[length:var(--text-display-md)] @min-[1024px]:text-[length:var(--text-display-lg)]";
const STEP_BODY =
  "text-[length:var(--text-body-sm)] @min-[640px]:text-[length:var(--text-body-md)] @min-[1024px]:text-[length:var(--text-body-lg)]";

export function HeroTitle({
  breadcrumb,
  eyebrow,
  heading,
  headingLevel = 1,
  description,
  align = "center",
  measure = "68ch",
  headingFont = "display",
  headingMeasure = "34ch",
  background,
  children,
  className = "",
}: HeroTitleProps): ReactElement {
  const start = align === "start";
  // "body" sets the heading in Cardo, title case, untracked — the display face is
  // uppercase + tracked, which Cardo's larger x-height doesn't need
  const headingFace =
    headingFont === "body"
      ? "font-[family-name:var(--font-body)] normal-case tracking-normal"
      : "font-[family-name:var(--font-display)] uppercase tracking-[var(--tracking-display)]";

  return (
    <section
      className={`@container px-[var(--gutter)] py-[var(--space-8)] ${className}`}
      style={{ background: background ?? "transparent" }}
    >
      <div
        className={`mx-auto flex max-w-[var(--container)] flex-col gap-[var(--space-3)] ${
          start ? "items-start text-left" : "items-center text-center"
        }`}
      >
        {breadcrumb && breadcrumb.length > 0 && (
          <Breadcrumb items={breadcrumb} className="mb-[var(--space-2)]" />
        )}
        {eyebrow && (
          <span className="font-[family-name:var(--font-body)] text-[length:var(--text-xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-meta)]">
            {eyebrow}
          </span>
        )}
        <Heading
          level={headingLevel}
          className={`m-0 font-normal leading-[var(--leading-tight)] text-[var(--text-strong)] ${headingFace} ${STEP_DISPLAY}`}
          style={{ maxWidth: headingMeasure }}
        >
          {heading}
        </Heading>
        {description && (
          <p
            className={`m-0 leading-[var(--leading-normal)] text-[var(--text-default)] ${STEP_BODY}`}
            style={{ maxWidth: measure }}
          >
            {description}
          </p>
        )}
        {children && (
          <div
            className={`mt-[var(--space-3)] flex flex-wrap gap-[var(--space-3)] ${
              start ? "justify-start" : "justify-center"
            }`}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
