import { Fragment } from "react";
import type { ReactElement, ReactNode } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";

/* C-ContentProse — the policy page band (shipping & returns, privacy, terms): a
   full-width section that centers a run of heading + paragraph blocks at a
   readable measure. Owns its band padding, content width, type sizes and block
   rhythm, all stepped off its OWN width. A page only places it.
   `paragraph` takes a string or an array of strings, since a section can run to
   several paragraphs. Email addresses render as mailto links. */

export interface ProseItem {
  /** Section heading. */
  heading: string;
  /** Section body copy — one paragraph, or an array to run several. */
  paragraph: string | string[];
}

export interface ContentProseProps {
  items?: ProseItem[];
  /** HTML level (h1–h4) for each section heading — tag only, not style. Default 2. */
  headingLevel?: HeadingLevel;
  /** Max line length for the paragraphs. Default "72ch". */
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

const STEP_SECTION =
  "text-[length:var(--text-section-sm)] @min-[640px]:text-[length:var(--text-section-md)] @min-[1024px]:text-[length:var(--text-section-lg)]";
const STEP_BODY =
  "text-[length:var(--text-body-sm)] @min-[640px]:text-[length:var(--text-body-md)] @min-[1024px]:text-[length:var(--text-body-lg)]";
// Display heading treatment — face, case, tracking, leading, color.
const HEADING_FACE =
  "font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)]";

const EMAIL = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;
const IS_EMAIL = /^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/;

/* split a paragraph so any email address becomes a mailto link. the domain group
   repeats \.[\w-]+ so it can't end on a dot — a trailing sentence period stays
   outside the address. */
function withLinks(text: string): ReactNode[] {
  return String(text)
    .split(EMAIL)
    .map((part, i) =>
      IS_EMAIL.test(part) ? (
        <a
          key={i}
          href={`mailto:${part}`}
          className="text-[var(--text-strong)] underline underline-offset-[0.2em]"
        >
          {part}
        </a>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
}

export function ContentProse({
  items = [],
  headingLevel = 2,
  measure = "72ch",
  contentWidth = "var(--container-prose)",
  background,
  paddingTop,
  children,
  className = "",
}: ContentProseProps): ReactElement {
  return (
    <section
      className={`@container px-[var(--gutter)] py-[var(--space-7)] ${className}`}
      style={{ background: background ?? "transparent", paddingTop }}
    >
      <div
        className="mx-auto flex flex-col gap-[var(--space-6)] @min-[640px]:gap-[var(--space-7)]"
        style={{ maxWidth: contentWidth }}
      >
        {items.map((item, i) => (
          <div key={item.heading || i} className="flex flex-col gap-[var(--space-3)]">
            <Heading level={headingLevel} className={`m-0 ${HEADING_FACE} ${STEP_SECTION}`}>
              {item.heading}
            </Heading>
            {(Array.isArray(item.paragraph) ? item.paragraph : [item.paragraph])
              .filter(Boolean)
              .map((para, k) => (
                <p
                  key={k}
                  className={`m-0 leading-[var(--leading-normal)] text-[var(--text-default)] ${STEP_BODY}`}
                  style={{ maxWidth: measure }}
                >
                  {withLinks(para)}
                </p>
              ))}
          </div>
        ))}
        {children && (
          <div className="mt-[var(--space-5)] flex flex-wrap gap-[var(--space-3)]">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
