import type { CSSProperties, ReactElement, ReactNode } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";

/* C-EditorialSplit — the two-up editorial band used on the About page: a media
   panel beside a text column (eyebrow, heading, paragraph, optional actions).
   `mirror` swaps the sides once two-up; stacked, `mobileFirst` chooses which leads.

   Everything responsive is driven by container queries on the band's OWN width — no
   JS measurement, no breakpoint props. Media keeps a fixed 4:5 crop; for the Shop
   pages' stepped crop use C-ShopEditorial.
   Column gap reads `--editorial-gap` below 1024px, then steps to `--space-8`. */

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
const STEP_LABEL =
  "text-[length:var(--size-label-sm)] @min-[640px]:text-[length:var(--size-label-md)] @min-[1024px]:text-[length:var(--size-label-lg)]";

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
  /* Column order is written as an explicit pair per breakpoint, so the stacked and
     two-up rules never fight over one base class. */
  const mediaOrder = [
    mobileFirst === "text" ? "@max-[767.98px]:order-2" : "@max-[767.98px]:order-1",
    mirror ? "@min-[768px]:order-2" : "@min-[768px]:order-1",
  ].join(" ");
  const textOrder = [
    mobileFirst === "text" ? "@max-[767.98px]:order-1" : "@max-[767.98px]:order-2",
    mirror ? "@min-[768px]:order-1" : "@min-[768px]:order-2",
  ].join(" ");

  return (
    <div className={`@container ${className}`} style={{ background } as CSSProperties}>
      <div className="grid grid-cols-1 items-center gap-[var(--editorial-gap,var(--space-5))] @min-[768px]:grid-cols-2 @min-[1024px]:gap-[var(--space-8)]">
        <div
          className={[
            "relative overflow-hidden bg-[var(--surface-raised)] aspect-[var(--ratio-4-5)]",
            mediaRounded ? "rounded-[var(--radius-sm)]" : "rounded-none",
            mediaOrder,
          ].join(" ")}
        >
          {media}
        </div>

        <div className={`flex flex-col justify-center gap-[var(--space-3)] ${textOrder}`}>
          {eyebrow && (
            <span className={`font-[family-name:var(--font-body)] ${STEP_LABEL} uppercase tracking-[var(--tracking-label)] text-[var(--text-meta)]`}>
              {eyebrow}
            </span>
          )}
          <Heading
            level={headingLevel}
            className={`m-0 max-w-[min(24ch,100%)] font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)] ${STEP_SECTION}`}
          >
            {heading}
          </Heading>
          {paragraph && (
            <p
              className={`m-0 max-w-[min(62ch,100%)] leading-[var(--leading-normal)] text-[var(--text-default)] ${STEP_BODY}`}
            >
              {paragraph}
            </p>
          )}
          {children && (
            <div className="mt-[var(--space-2)] flex flex-wrap gap-[var(--space-3)]">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
