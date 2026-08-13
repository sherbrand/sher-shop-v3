import type { CSSProperties, ReactElement, ReactNode } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";

/* C-ShopEditorial — the two-up editorial band used across the Shop and category
   pages: a media panel beside a text column (eyebrow, heading, paragraph, optional
   actions). `mirror` swaps the sides once the band is two-up; stacked, `mobileFirst`
   chooses whether the media or the text leads and `mobileAlign` can push the copy to
   the right edge.

   Everything responsive comes from container queries on the band's OWN width, with
   no JS measurement and no breakpoint props:
     mobile  (<640)   gap 24  crop 4:3
     tablet  (>=640)  gap 24  crop 1:1   two-up from 768
     desktop (>=1024) gap 64  crop 5:4
   Override a placement with the `gap` / `ratio` props, or set --editorial-gap. */

export interface ShopEditorialProps {
  /** Short kicker above the heading. */
  eyebrow?: string;
  heading?: string;
  /** HTML level (h1–h4) for the heading — changes the tag only, not the style. Default 2. */
  headingLevel?: HeadingLevel;
  /** Heading typeface: "display" (Cormorant, uppercase, tracked) or "body" (Cardo, title case, untracked). Default "display". */
  headingFont?: "display" | "body";
  paragraph?: string;
  /** Media node filling the panel. */
  media?: ReactNode;
  /** Put the text on the LEFT and the media on the right at two-up. Default false. */
  mirror?: boolean;
  /** Which column leads when stacked (below 768px). Default "media". */
  mobileFirst?: "media" | "text";
  /** Stacked (below 768px) only: push the text column to the right edge. Default "left". */
  mobileAlign?: "left" | "right";
  /** Column gap override. Defaults to the band's own stepped rhythm. */
  gap?: string;
  /** Media aspect ratio override. Defaults to the band's own stepped crop. */
  ratio?: string;
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
// Stepped crop, used when no `ratio` prop overrides it.
const STEP_CROP = "aspect-[4/3] @min-[640px]:aspect-[1/1] @min-[1024px]:aspect-[5/4]";

export function ShopEditorial({
  eyebrow,
  heading,
  headingLevel = 2,
  headingFont = "display",
  paragraph,
  media,
  mirror = false,
  mobileFirst = "media",
  mobileAlign = "left",
  gap,
  ratio,
  background,
  children,
  className = "",
}: ShopEditorialProps): ReactElement {
  const textLeads = mobileFirst === "text";
  const alignRight = mobileAlign === "right";

  /* "body" sets the heading in Cardo, title case, untracked — a softer editorial voice. */
  const headingFace =
    headingFont === "body"
      ? "font-[family-name:var(--font-body)] tracking-normal"
      : "font-[family-name:var(--font-display)] uppercase tracking-[var(--tracking-display)]";

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
      <div
        className="grid grid-cols-1 items-center gap-[var(--editorial-gap,var(--space-5))] @min-[768px]:grid-cols-2 @min-[1024px]:gap-[var(--space-8)]"
        style={gap ? ({ "--editorial-gap": gap } as CSSProperties) : undefined}
      >
        <div
          className={`relative overflow-hidden bg-[var(--surface-raised)] ${
            ratio ? "" : STEP_CROP
          } ${mediaOrder}`}
          style={ratio ? { aspectRatio: ratio } : undefined}
        >
          {media}
        </div>

        <div
          className={`flex flex-col justify-center gap-[var(--space-3)] ${textOrder} ${
            alignRight ? "@max-[767.98px]:items-end @max-[767.98px]:text-right" : ""
          }`}
        >
          {eyebrow && (
            <span className="font-[family-name:var(--font-body)] text-[length:var(--size-xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-meta)]">
              {eyebrow}
            </span>
          )}
          <Heading
            level={headingLevel}
            className={`m-0 max-w-[24ch] font-normal leading-[var(--leading-snug)] text-[var(--text-strong)] ${headingFace} ${STEP_SECTION} ${
              alignRight ? "@max-[767.98px]:ml-auto" : ""
            }`}
          >
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
            <div
              className={`mt-[var(--space-2)] flex flex-wrap gap-[var(--space-3)] ${
                alignRight ? "@max-[767.98px]:justify-end" : ""
              }`}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
