import type { ReactElement, ReactNode } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";

/* C-EditorialSplit — the two-up editorial band used on the About page: a media panel
   beside a text column (eyebrow, heading, paragraph, optional actions). `mirror`
   swaps the sides once two-up; stacked, `mobileFirst` chooses which leads.

   Everything responsive comes from container queries on the band's OWN width — no
   JS measurement, no breakpoint props. Media keeps a fixed 4:5 crop; for the Shop
   pages' stepped crop use C-ShopEditorial. */

export interface EditorialSplitProps {
  /** Short kicker above the heading. */
  eyebrow?: string;
  heading?: string;
  /** HTML level (h1–h4) for the heading — changes the tag only, not the style. Default 2. */
  headingLevel?: HeadingLevel;
  paragraph?: string;
  /** Media node filling the 4:5 panel. */
  media?: ReactNode;
  /** Put the text on the LEFT and the media on the right at two-up. Default false. */
  mirror?: boolean;
  /** Which column leads when stacked (below 768px). Default "media". */
  mobileFirst?: "media" | "text";
  /** Round the media panel corners (`rounded.sm`). Default false. */
  mediaRounded?: boolean;
  /** Optional band background (token or color). */
  background?: string;
  /** Buttons / links rendered under the paragraph. */
  children?: ReactNode;
  className?: string;
}

// Stepped sizes, resolved against the band's own width.
const STEP_SECTION =
  "text-[length:var(--size-section-sm)] @min-[640px]:text-[length:var(--size-section-md)] @min-[1024px]:text-[length:var(--size-section-lg)]";
const STEP_BODY =
  "text-[length:var(--size-body-sm)] @min-[640px]:text-[length:var(--size-body-md)] @min-[1024px]:text-[length:var(--size-body-lg)]";
// Display heading treatment — face, case, tracking, leading, color.
const HEADING_FACE =
  "font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)]";

export function EditorialSplit({
  eyebrow,
  heading,
  headingLevel = 2,
  paragraph,
  media,
  mirror = false,
  mobileFirst = "media",
  mediaRounded = false,
  background,
  children,
  className = "",
}: EditorialSplitProps): ReactElement {
  const textLeads = mobileFirst === "text";
  const mediaOrder = [
    "order-1",
    textLeads ? "@max-[767.98px]:order-2" : "",
    mirror ? "@min-[768px]:order-2" : "",
  ].join(" ");
  const textOrder = [
    "order-2",
    textLeads ? "@max-[767.98px]:order-1" : "",
    mirror ? "@min-[768px]:order-1" : "",
  ].join(" ");

  return (
    <div className={`@container ${className}`} style={{ background }}>
      <div className="grid grid-cols-1 items-center gap-[var(--editorial-gap,var(--space-5))] @min-[768px]:grid-cols-2 @min-[1024px]:gap-[var(--space-8)]">
        <div
          className={`relative aspect-[4/5] overflow-hidden bg-[var(--surface-raised)] ${
            mediaRounded ? "rounded-[var(--radius-sm)]" : "rounded-none"
          } ${mediaOrder}`}
        >
          {media}
        </div>

        <div className={`flex flex-col justify-center gap-[var(--space-3)] ${textOrder}`}>
          {eyebrow && (
            <span className="font-[family-name:var(--font-body)] text-[length:var(--size-xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-meta)]">
              {eyebrow}
            </span>
          )}
          <Heading level={headingLevel} className={`m-0 max-w-[24ch] ${HEADING_FACE} ${STEP_SECTION}`}>
            {heading}
          </Heading>
          {paragraph && (
            <p
              className={`m-0 max-w-[62ch] leading-[var(--leading-normal)] text-[var(--text-default)] ${STEP_BODY}`}
            >
              {paragraph}
            </p>
          )}
          {children && (
            <div className="mt-[var(--space-2)] flex flex-wrap gap-[var(--space-3)]">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
}
