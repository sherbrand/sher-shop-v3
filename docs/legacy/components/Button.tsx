"use client";

import type { ReactElement, ReactNode, ButtonHTMLAttributes } from "react";

/* SHER button — Cormorant Infant, UPPERCASE, tracked.
   primary   : dark fill, light text (strong CTA — Add to Cart, Checkout)
   accent    : primary fill, dark text (AA) — softer emphasis
   secondary : hairline outline, dark text (fills on hover)
   ghost     : text only, underline on hover */

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. Default "primary". */
  variant?: "primary" | "accent" | "secondary" | "ghost";
  /** Size. Default "md". */
  size?: "sm" | "md" | "lg";
  /** Stretch to container width. */
  fullWidth?: boolean;
  /** Render as another element. Default "button". */
  as?: "button" | "a";
  /** Link target when as="a". */
  href?: string;
  children?: ReactNode;
}

const SIZES: Record<string, string> = {
  sm: "text-[0.75rem] px-[var(--space-4)] py-[var(--space-2)] tracking-[var(--tracking-5)]",
  md: "text-[0.875rem] px-[var(--pad-btn-md)] py-[var(--space-3)] tracking-[var(--tracking-6)]",
  lg: "text-[1rem] px-[var(--pad-btn-lg)] py-[var(--space-4)] tracking-[var(--tracking-label)]",
};

const VARIANTS: Record<string, string> = {
  primary: "border-transparent bg-[var(--surface-inverse)] text-[var(--text-on-inverse)] hover:bg-[var(--sher-text)]",
  accent: "border-transparent bg-[var(--accent)] text-[var(--text-on-primary)] hover:bg-[var(--accent-hover)]",
  secondary:
    "border-[var(--text-strong)] bg-transparent text-[var(--text-strong)] hover:bg-[var(--surface-inverse)] hover:text-[var(--text-on-inverse)]",
  ghost: "border-transparent bg-transparent text-[var(--text-strong)] underline-offset-[0.3em] hover:underline",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  as = "button",
  href,
  className = "",
  ...rest
}: ButtonProps): ReactElement {
  const Tag = as;
  const cls = [
    "inline-flex items-center justify-center gap-[var(--space-2)] border leading-none no-underline",
    "font-[family-name:var(--font-button)] font-medium uppercase",
    "rounded-[var(--radius-sm)] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]",
    SIZES[size],
    VARIANTS[variant],
    fullWidth ? "w-full" : "w-auto",
    disabled ? "pointer-events-none cursor-not-allowed opacity-40" : "cursor-pointer",
    className,
  ].join(" ");
  return (
    <Tag
      className={cls}
      href={as === "a" ? href : undefined}
      disabled={as === "button" ? disabled : undefined}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
