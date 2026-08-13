import type { CSSProperties, ReactElement, ReactNode } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";

/* C-FeatureColumns — an eyebrow + heading over a row of 2–3 columns, each a media
   panel with its own subheading and paragraph. Built for the "pick your closure /
   set type / length" comparison bands. Columns stack on mobile.
   The column count comes from the items themselves, passed to CSS as --fc-count so
   the breakpoint stays in the query and never becomes a prop. */

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

// Stepped sizes, resolved against the band's own width.
const STEP_SECTION =
  "text-[length:var(--size-section-sm)] @min-[640px]:text-[length:var(--size-section-md)] @min-[1024px]:text-[length:var(--size-section-lg)]";
const STEP_BODY =
  "text-[length:var(--size-body-sm)] @min-[640px]:text-[length:var(--size-body-md)] @min-[1024px]:text-[length:var(--size-body-lg)]";

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
          <span className="font-[family-name:var(--font-body)] text-[length:var(--size-xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-meta)]">
            {eyebrow}
          </span>
        )}
        {heading && (
          <Heading
            level={headingLevel}
            className={`m-0 max-w-[34ch] font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)] ${STEP_SECTION}`}
          >
            {heading}
          </Heading>
        )}
      </div>

      <div className="grid grid-cols-1 gap-[var(--space-6)] @min-[640px]:grid-cols-[repeat(min(2,var(--fc-count,3)),1fr)] @min-[1024px]:grid-cols-[repeat(min(3,var(--fc-count,3)),1fr)] @min-[1024px]:gap-[var(--space-7)]">
        {items.map((item, i) => (
          <div key={`${item.heading}-${i}`} className="flex flex-col gap-[var(--space-3)]">
            <div className="relative overflow-hidden bg-[var(--surface-raised)] aspect-[var(--ratio-4-5)]">
              {item.media}
            </div>
            <Heading
              level={itemHeadingLevel}
              className="m-0 font-[family-name:var(--font-display)] text-[length:var(--size-sub)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)]"
            >
              {item.heading}
            </Heading>
            <p className={`m-0 leading-[var(--leading-normal)] text-[var(--text-default)] ${STEP_BODY}`}>
              {item.paragraph}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
