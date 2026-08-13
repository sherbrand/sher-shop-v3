import type { ReactElement, ReactNode } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";

/* C-EditorialSplit — the two-up editorial band used on the About page: a media
   panel beside a text column (eyebrow, heading, paragraph, optional actions).
   `mirror` swaps the sides once two-up; stacked, `mobileFirst` chooses which
   leads. Everything responsive runs off container queries on the band's OWN
   width. Media keeps a fixed 4:5 crop; for the Shop pages' stepped crop use
   C-ShopEditorial. */

export interface EditorialSplitProps {
  /** Short kicker above the heading. */
  eyebrow?: string;
  heading?: string;
  /** HTML level (h1–h4) for the heading — tag only, not style. Default 2. */
  headingLevel?: HeadingLevel;
  paragraph?: string;
  /** Media node (e.g. a next/image) filling the 4:5 panel. */
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

const STEP_SECTION =
  "text-[length:var(--text-section-sm)] @min-[640px]:text-[length:var(--text-section-md)] @min-[1024px]:text-[length:var(--text-section-lg)]";
const STEP_BODY =
  "text-[length:var(--text-body-sm)] @min-[640px]:text-[length:var(--text-body-md)] @min-[1024px]:text-[length:var(--text-body-lg)]";
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
  // stacked order flips with mobileFirst; at two-up mirror decides the sides
  const mediaOrder = mobileFirst === "text" ? "order-2" : "order-1";
  const textOrder = mobileFirst === "text" ? "order-1" : "order-2";
  const mediaTwoUp = mirror ? "@min-[768px]:order-2" : "@min-[768px]:order-1";
  const textTwoUp = mirror ? "@min-[768px]:order-1" : "@min-[768px]:order-2";

  return (
    <div className={`@container ${className}`} style={{ background }}>
      <div className="grid grid-cols-1 items-center gap-[var(--editorial-gap,var(--space-5))] @min-[768px]:grid-cols-2 @min-[1024px]:gap-[var(--space-8)]">
        <div
          className={`relative aspect-[var(--ratio-4-5)] overflow-hidden bg-[var(--surface-raised)] ${
            mediaRounded ? "rounded-[var(--radius-sm)]" : "rounded-none"
          } ${mediaOrder} ${mediaTwoUp}`}
        >
          {media}
        </div>

        <div
          className={`flex flex-col justify-center gap-[var(--space-3)] ${textOrder} ${textTwoUp}`}
        >
          {eyebrow && (
            <span className="font-[family-name:var(--font-body)] text-[length:var(--text-xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-meta)]">
              {eyebrow}
            </span>
          )}
          <Heading
            level={headingLevel}
            className={`m-0 max-w-[24ch] ${HEADING_FACE} ${STEP_SECTION}`}
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
            <div className="mt-[var(--space-2)] flex flex-wrap gap-[var(--space-3)]">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
