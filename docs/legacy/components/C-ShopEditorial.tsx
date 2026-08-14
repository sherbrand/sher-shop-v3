import type { CSSProperties, ReactElement, ReactNode } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";

/* C-ShopEditorial — the two-up editorial band used across the Shop and category
   pages: a media panel beside a text column (eyebrow, heading, paragraph,
   optional actions). `mirror` swaps the sides once two-up; stacked, `mobileFirst`
   chooses whether media or text leads and `mobileAlign` can push the copy to the
   right edge.

   Everything responsive runs off container queries on the band's OWN width:
     mobile  (<640)   gap 24  crop 4:3
     tablet  (>=640)  gap 24  crop 1:1   two-up from 768
     desktop (>=1024) gap 64  crop 5:4
   Override a placement with the `gap` / `ratio` props, or set --editorial-gap. */

export interface ShopEditorialProps {
  /** Short kicker above the heading. */
  eyebrow?: string;
  heading?: string;
  /** HTML level (h1–h4) for the heading — tag only, not style. Default 2. */
  headingLevel?: HeadingLevel;
  /** Heading typeface: "display" (Cormorant, uppercase, tracked) or "body" (Cardo,
   *  title case, untracked). Default "display". */
  headingFont?: "display" | "body";
  paragraph?: string;
  /** Media node (e.g. a next/image) filling the panel. */
  media?: ReactNode;
  /** Put the text on the LEFT and the media on the right at two-up. Default false. */
  mirror?: boolean;
  /** Which column leads when stacked (below 768px). Default "media". */
  mobileFirst?: "media" | "text";
  /** Stacked only: push the text column to the right edge. Default "left". */
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

const STEP_SECTION =
  "text-[length:var(--text-section-sm)] @min-[640px]:text-[length:var(--text-section-md)] @min-[1024px]:text-[length:var(--text-section-lg)]";
const STEP_BODY =
  "text-[length:var(--text-body-sm)] @min-[640px]:text-[length:var(--text-body-md)] @min-[1024px]:text-[length:var(--text-body-lg)]";
/* the band's own stepped crop, used when no `ratio` is passed */
const STEP_CROP =
  "aspect-[var(--ratio-4-3)] @min-[640px]:aspect-[var(--ratio-1-1)] @min-[1024px]:aspect-[var(--ratio-5-4)]";

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
  // stacked order flips with mobileFirst; at two-up mirror decides the sides
  const mediaOrder = mobileFirst === "text" ? "order-2" : "order-1";
  const textOrder = mobileFirst === "text" ? "order-1" : "order-2";
  const mediaTwoUp = mirror ? "@min-[768px]:order-2" : "@min-[768px]:order-1";
  const textTwoUp = mirror ? "@min-[768px]:order-1" : "@min-[768px]:order-2";

  // right alignment is a stacked-only treatment — it resets at two-up
  const alignRight =
    mobileAlign === "right"
      ? "items-end text-right @min-[768px]:items-stretch @min-[768px]:text-left"
      : "";

  // "body" sets the heading in Cardo, title case, untracked — a softer editorial voice
  const headingFace = `font-normal leading-[var(--leading-snug)] text-[var(--text-strong)] ${
    headingFont === "body"
      ? "font-[family-name:var(--font-body)] normal-case tracking-normal"
      : "font-[family-name:var(--font-display)] uppercase tracking-[var(--tracking-display)]"
  }`;

  return (
    <div className={`@container ${className}`} style={{ background }}>
      <div
        className="grid grid-cols-1 items-center gap-[var(--editorial-gap,var(--space-5))] @min-[768px]:grid-cols-2 @min-[1024px]:gap-[var(--space-8)]"
        style={gap ? ({ "--editorial-gap": gap } as CSSProperties) : undefined}
      >
        <div
          className={`relative overflow-hidden bg-[var(--surface-raised)] ${
            ratio ? "" : STEP_CROP
          } ${mediaOrder} ${mediaTwoUp}`}
          style={ratio ? { aspectRatio: ratio } : undefined}
        >
          {media}
        </div>

        <div
          className={`flex flex-col justify-center gap-[var(--space-3)] ${alignRight} ${textOrder} ${textTwoUp}`}
        >
          {eyebrow && (
            <span className="font-[family-name:var(--font-body)] text-[length:var(--text-xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-meta)]">
              {eyebrow}
            </span>
          )}
          <Heading
            level={headingLevel}
            className={`m-0 max-w-[24ch] ${headingFace} ${
              mobileAlign === "right" ? "ml-auto @min-[768px]:ml-0" : ""
            } ${STEP_SECTION}`}
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
                mobileAlign === "right"
                  ? "justify-end @min-[768px]:justify-start"
                  : ""
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
