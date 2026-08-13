"use client";

import type { ReactElement, ReactNode, ButtonHTMLAttributes } from "react";

/* SHER pill button — the rounded filter / category control used by the attribute
   filter and the Shop category links. Active pills invert to the dark fill. */

export interface ButtonPillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Selected state — inverts the pill to the dark fill. */
  active?: boolean;
  /** Render as another element. Default "button". */
  as?: "button" | "a";
  /** Link target when as="a". */
  href?: string;
  children?: ReactNode;
}

export function ButtonPill({
  children,
  active = false,
  as = "button",
  href,
  className = "",
  ...rest
}: ButtonPillProps): ReactElement {
  const Tag = as;
  const tone = active
    ? "border-[var(--surface-inverse)] bg-[var(--surface-inverse)] text-[var(--text-on-inverse)]"
    : "border-[var(--border-strong)] bg-transparent text-[var(--text-strong)] hover:bg-[var(--surface-raised)]";

  const cls = [
    "inline-flex cursor-pointer items-center justify-center whitespace-nowrap border no-underline",
    "font-[family-name:var(--font-button)] text-[length:var(--text-xs)] font-medium uppercase leading-none",
    "tracking-[var(--tracking-control)] px-[var(--pad-pill-x)] py-[var(--pad-pill-y)]",
    "rounded-[var(--radius-pill)] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]",
    tone,
    className,
  ].join(" ");

  return (
    <Tag
      className={cls}
      href={as === "a" ? href : undefined}
      aria-pressed={as === "button" ? active : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
