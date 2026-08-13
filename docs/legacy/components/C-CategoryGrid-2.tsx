import type { ReactElement, ReactNode } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";

/* C-CategoryGrid — a full-bleed grid of category tiles. One column on mobile, two
   at/above 640px of the band's own width. Each tile is a portrait 4:5 crop with a
   media layer (image or a passed node) under a bottom gradient label. Labels
   alternate bottom-left / bottom-right per tile. Hairline gaps between. */

export interface CategoryItem {
  /** Tile label (rendered as the heading). */
  label: string;
  /** Link target. */
  href: string;
  /** Stable key / slot id. */
  id?: string;
  /** Background image URL (cover). */
  image?: string;
  /** Solid tile tone when no image. */
  bg?: string;
  /** Media node layered behind the label. */
  media?: ReactNode;
}

export interface CategoryGridProps {
  items?: CategoryItem[];
  /** HTML level (h1–h4) for the tile labels — changes the tag only, not the style. Default 2. */
  headingLevel?: HeadingLevel;
  /** Alternate label alignment left/right per tile. Default true. */
  alternate?: boolean;
  className?: string;
}

// Stepped title size, resolved against the band's own width.
const STEP_TITLE =
  "text-[length:var(--size-title-sm)] @min-[640px]:text-[length:var(--size-title-md)] @min-[1024px]:text-[length:var(--size-title-lg)]";

export function CategoryGrid({
  items = [],
  headingLevel = 2,
  alternate = true,
  className = "",
}: CategoryGridProps): ReactElement {
  return (
    <div className={`@container bg-[var(--border-default)] ${className}`}>
      {/* The 2px gap lets the band colour through as a hairline rule between tiles. */}
      <div className="grid grid-cols-1 gap-[2px] @min-[640px]:grid-cols-2">
        {items.map((item, i) => {
          const right = alternate && i % 2 === 1;
          return (
            <a
              key={item.id || item.href || i}
              href={item.href}
              className="relative block aspect-[4/5] overflow-hidden no-underline"
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: item.image ? `url("${item.image}")` : undefined,
                  background: item.image ? undefined : item.bg || "var(--surface-raised)",
                }}
              >
                {item.media}
              </div>
              <span
                className={`pointer-events-none absolute inset-0 flex items-end bg-[linear-gradient(180deg,transparent_55%,var(--scrim)_100%)] p-[var(--space-6)] ${
                  right ? "justify-end" : "justify-start"
                }`}
              >
                <Heading
                  level={headingLevel}
                  className={`m-0 font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--sher-white)] ${STEP_TITLE} ${
                    right ? "text-right" : "text-left"
                  }`}
                >
                  {item.label}
                </Heading>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
