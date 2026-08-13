import type { ReactElement } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";
import { Accordion } from "@/components/Accordion";
import type { AccordionItem } from "@/components/Accordion";

/* C-ShopFaq — the FAQ band: a heading beside its accordion at two-up, stacking to
   one column below 768px. `align` places the heading vertically against the
   accordion once two-up. Layout and heading size come from container queries on the
   band's OWN width — no JS measurement. */

export interface ShopFaqProps {
  /** Band heading. Default "Frequently Asked Questions". */
  heading?: string;
  /** HTML level (h1–h4) for the band heading — changes the tag only, not the style. Default 2. */
  headingLevel?: HeadingLevel;
  /** Question/answer rows. */
  items?: AccordionItem[];
  /** HTML level for each question heading. Default 3. */
  itemHeadingLevel?: HeadingLevel;
  /** Index of the row open on first render; null for all closed. Default 0. */
  defaultOpen?: number | null;
  /** Only one row open at a time. Default true. */
  single?: boolean;
  /** Vertical placement of the heading at two-up. Default "center". */
  align?: "center" | "start";
  className?: string;
}

// Stepped section size, resolved against the band's own width.
const STEP_SECTION =
  "text-[length:var(--size-section-sm)] @min-[640px]:text-[length:var(--size-section-md)] @min-[1024px]:text-[length:var(--size-section-lg)]";

export function ShopFaq({
  heading = "Frequently Asked Questions",
  headingLevel = 2,
  items = [],
  itemHeadingLevel = 3,
  defaultOpen = 0,
  single = true,
  align = "center",
  className = "",
}: ShopFaqProps): ReactElement {
  return (
    <div className={`@container ${className}`}>
      <div className="grid grid-cols-1 items-start gap-[var(--space-5)] @min-[768px]:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] @min-[768px]:gap-[var(--space-8)]">
        <Heading
          level={headingLevel}
          className={[
            "m-0 self-start font-[family-name:var(--font-display)] font-normal uppercase",
            "leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)]",
            STEP_SECTION,
            align === "center" ? "@min-[768px]:self-center" : "@min-[768px]:self-start",
          ].join(" ")}
        >
          {heading}
        </Heading>
        <Accordion
          items={items}
          headingLevel={itemHeadingLevel}
          defaultOpen={defaultOpen}
          single={single}
        />
      </div>
    </div>
  );
}
