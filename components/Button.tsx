"use client";

import type {
  ReactElement,
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";

/* SHER button — Cormorant Infant, UPPERCASE, tracked.
   primary   : dark fill, light text (strong CTA — Add to Cart, Checkout)
   accent    : accent fill, white text (AA) — softer emphasis
   surface   : raised fill on a hairline, dark text
   tonal     : primary fill, dark text; inverts to accent on hover
   secondary : hairline outline, dark text (fills on hover)
   ghost     : text only, underline on hover */

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. Default "primary". */
  variant?: "primary" | "accent" | "surface" | "tonal" | "secondary" | "ghost";
  /** Size. Default "md". */
  size?: "sm" | "md" | "lg";
  /** Stretch to container width. */
  fullWidth?: boolean;
  /** Render as another element. Default "button". */
  as?: "button" | "a";
  /** Link target when as="a". */
  href?: string;
  target?: string;
  rel?: string;
  children?: ReactNode;
}

const SIZES: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "text-[length:var(--size-xs)] px-[var(--space-4)] py-[var(--space-2)]",
  md: "text-[length:var(--size-sm)] px-[var(--pad-btn-md)] py-[var(--space-3)]",
  lg: "text-[length:var(--size-base)] px-[var(--pad-btn-lg)] py-[var(--space-4)]",
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "border-transparent bg-[var(--surface-inverse)] text-[var(--text-on-inverse)] hover:bg-[var(--sher-text)]",
  accent:
    "border-transparent bg-[var(--accent)] text-[var(--sher-white)] hover:bg-[var(--accent-hover)]",
  surface:
    "border-[var(--border-strong)] bg-[var(--surface-raised)] text-[var(--text-strong)] hover:bg-[var(--surface-tint)]",
  tonal:
    "border-transparent bg-[var(--sher-primary)] text-[var(--text-on-primary)] hover:bg-[var(--accent-hover)] hover:text-[var(--sher-white)]",
  secondary:
    "border-[var(--text-strong)] bg-transparent text-[var(--text-strong)] hover:bg-[var(--surface-inverse)] hover:text-[var(--text-on-inverse)]",
  ghost:
    "border-transparent bg-transparent text-[var(--text-strong)] underline-offset-[0.3em] hover:underline",
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
  const cls = [
    "inline-flex items-center justify-center gap-[var(--space-2)] border leading-none no-underline",
    "font-[family-name:var(--font-button)] font-medium uppercase tracking-[var(--tracking-label)]",
    "rounded-[var(--radius-sm)] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]",
    SIZES[size],
    VARIANTS[variant],
    fullWidth ? "w-full" : "w-auto",
    disabled ? "pointer-events-none cursor-not-allowed opacity-40" : "cursor-pointer",
    className,
  ].join(" ");

  // Render the real element per `as`, so button-only props never land on an anchor.
  if (as === "a") {
    return (
      <a
        className={cls}
        href={href}
        aria-disabled={disabled || undefined}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={cls}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {children}
    </button>
  );
}
