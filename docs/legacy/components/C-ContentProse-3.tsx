import type { CSSProperties, ReactElement, ReactNode } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";

/* C-ContentProse — the policy page band (shipping & returns, privacy, terms): a
   full-width section that centers a run of heading + paragraph blocks at a readable
   measure. Owns its own band padding, content width, heading/body sizes and block
   rhythm, all stepped against its OWN width — a page only places it.
   `paragraph` takes a string or an array of strings, so a section can run to
   several paragraphs. Email addresses render as mailto links. */

export interface ProseItem {
  /** Section heading. */
  heading: string;
  /** Section body copy — a single paragraph, or an array to run several. */
  paragraph: string | string[];
}

export interface ContentProseProps {
  items?: ProseItem[];
  /** HTML level (h1–h4) for each section heading — changes the tag only, not the style. Default 2. */
  headingLevel?: HeadingLevel;
  /** Max line length for the paragraphs. Default "none" — they fill `contentWidth`. */
  measure?: string;
  /** Width of the centered content column. Default var(--container-prose). */
  contentWidth?: string;
  /** Band background (token or color). Default transparent. */
  background?: string;
  /** Override the band's top padding (e.g. 0 when it follows a title band). */
  paddingTop?: string | number;
  /** Trailing actions row (e.g. a button) below the last section. */
  children?: ReactNode;
  className?: string;
}

// Stepped sizes, resolved against the band's own width.
const STEP_SECTION =
  "text-[length:var(--size-section-sm)] @min-[640px]:text-[length:var(--size-section-md)] @min-[1024px]:text-[length:var(--size-section-lg)]";
const STEP_BODY =
  "text-[length:var(--size-body-sm)] @min-[640px]:text-[length:var(--size-body-md)] @min-[1024px]:text-[length:var(--size-body-lg)]";

const EMAIL = /^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/;
/* The domain group repeats \.[\w-]+ so an address can't end on a dot — a trailing
   sentence period stays outside the link. */
const EMAIL_SPLIT = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

function withLinks(text: string): ReactNode[] {
  return String(text)
    .split(EMAIL_SPLIT)
    .map((part, i) =>
      EMAIL.test(part) ? (
        <a
          key={i}
          href={`mailto:${part}`}
          className="text-[var(--text-strong)] underline underline-offset-[0.2em]"
        >
          {part}
        </a>
      ) : (
        part
      ),
    );
}

export function ContentProse({
  items = [],
  headingLevel = 2,
  measure = "none",
  contentWidth = "var(--container-prose)",
  background,
  paddingTop,
  children,
  className = "",
}: ContentProseProps): ReactElement {
  return (
    <section
      className={`@container px-[var(--gutter)] py-[var(--space-7)] ${className}`}
      style={{
        paddingTop: paddingTop != null ? paddingTop : undefined,
        background: background || "transparent",
      }}
    >
      <div
        className="mx-auto flex flex-col gap-[var(--space-6)] @min-[640px]:gap-[var(--space-7)]"
        style={{ maxWidth: contentWidth } as CSSProperties}
      >
        {items.map((item, i) => (
          <div key={item.heading || i} className="flex flex-col gap-[var(--space-3)]">
            <Heading
              level={headingLevel}
              className={`m-0 font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)] ${STEP_SECTION}`}
            >
              {item.heading}
            </Heading>
            {(Array.isArray(item.paragraph) ? item.paragraph : [item.paragraph])
              .filter(Boolean)
              .map((para, k) => (
                <p
                  key={k}
                  className={`m-0 leading-[var(--leading-normal)] text-[var(--text-default)] ${STEP_BODY}`}
                  style={{ maxWidth: measure } as CSSProperties}
                >
                  {withLinks(para)}
                </p>
              ))}
          </div>
        ))}
        {children && (
          <div className="mt-[var(--space-5)] flex flex-wrap gap-[var(--space-3)]">{children}</div>
        )}
      </div>
    </section>
  );
}
