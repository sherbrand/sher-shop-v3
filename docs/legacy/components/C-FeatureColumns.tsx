import type { CSSProperties, ReactElement, ReactNode } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";

/* C-FeatureColumns — an eyebrow + heading over a row of 2–3 columns, each a media
   panel with its own subheading and paragraph. Built for the "pick your closure /
   set type / length" comparison bands. Columns stack on mobile; the count comes
   from the items and caps the grid via --fc-count. */

export interface FeatureItem {
  /** Column subheading. */
  heading: string;
  /** Column body copy. */
  paragraph: string;
  /** Media node filling the column's 4:5 panel. */
  media?: ReactNode;
}

export interface FeatureColumnsProps {
  eyebrow?: string;
  heading?: string;
  /** HTML level (h1–h4) for the band heading — tag only, not style. Default 2. */
  headingLevel?: HeadingLevel;
  /** HTML level (h1–h4) for each column heading — tag only. Default 3. */
  itemHeadingLevel?: HeadingLevel;
  items?: FeatureItem[];
  className?: string;
}

const STEP_SECTION =
  "text-[length:var(--text-section-sm)] @min-[640px]:text-[length:var(--text-section-md)] @min-[1024px]:text-[length:var(--text-section-lg)]";
const STEP_BODY =
  "text-[length:var(--text-body-sm)] @min-[640px]:text-[length:var(--text-body-md)] @min-[1024px]:text-[length:var(--text-body-lg)]";
// Display heading treatment — face, case, tracking, leading, color.
const HEADING_FACE =
  "font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)]";

export function FeatureColumns({
  eyebrow,
  heading,
  headingLevel = 2,
  itemHeadingLevel = 3,
  items = [],
  className = "",
}: FeatureColumnsProps): ReactElement {
  return (
    <div
      className={`@container ${className}`}
      style={{ "--fc-count": items.length } as CSSProperties}
    >
      <div className="mb-[var(--space-7)] flex flex-col gap-[var(--space-3)]">
        {eyebrow && (
          <span className="font-[family-name:var(--font-body)] text-[length:var(--text-xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-meta)]">
            {eyebrow}
          </span>
        )}
        {heading && (
          <Heading
            level={headingLevel}
            className={`m-0 max-w-[34ch] ${HEADING_FACE} ${STEP_SECTION}`}
          >
            {heading}
          </Heading>
        )}
      </div>

      <div className="grid grid-cols-1 gap-[var(--space-6)] @min-[640px]:grid-cols-[repeat(min(2,var(--fc-count,3)),minmax(0,1fr))] @min-[1024px]:grid-cols-[repeat(min(3,var(--fc-count,3)),minmax(0,1fr))] @min-[1024px]:gap-[var(--space-7)]">
        {items.map((item, i) => (
          <div key={`${item.heading}-${i}`} className="flex flex-col gap-[var(--space-3)]">
            <div className="relative aspect-[var(--ratio-4-5)] overflow-hidden bg-[var(--surface-raised)]">
              {item.media}
            </div>
            <Heading
              level={itemHeadingLevel}
              className={`m-0 text-[length:var(--text-sub)] ${HEADING_FACE}`}
            >
              {item.heading}
            </Heading>
            <p
              className={`m-0 leading-[var(--leading-normal)] text-[var(--text-default)] ${STEP_BODY}`}
            >
              {item.paragraph}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
