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
   tint      : surface inverted — tint at rest, raised on hover. The quieter half
               of a stacked CTA pair, so it recedes beside an accent button.
   tonal     : primary fill, dark text; inverts to accent on hover
   secondary : hairline outline, dark text (tints on hover — never fills dark, which
               would impersonate `primary` at rest)
   ghost     : text only, underline on hover */

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. Default "primary". */
  variant?: "primary" | "accent" | "surface" | "tint" | "tonal" | "secondary" | "ghost";
  /** Size. Default "md". */
  size?: "sm" | "md" | "lg" | "xl";
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

/* Each size STEPS with the band it sits in, so a button is smaller on a phone than on a
   desktop. The steps are container queries against the button's own query container, so
   they follow the band's width rather than the viewport's.
   Only md, lg and xl step. sm is already the smallest control in the system and shrinking
   it further would drop it under the comfortable tap target. */
const SIZES: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "text-[length:var(--size-xs)] px-[var(--space-4)] py-[var(--space-2)]",
  md: [
    "text-[length:var(--size-xs)] px-[var(--space-5)] py-[var(--space-2)]",
    "@min-[640px]:text-[length:var(--size-sm)] @min-[640px]:px-[var(--space-6)] @min-[640px]:py-[var(--space-3)]",
    "@min-[1024px]:px-[var(--pad-btn-md)]",
  ].join(" "),
  lg: [
    "text-[length:var(--size-sm)] px-[var(--pad-btn-md)] py-[var(--space-3)]",
    "@min-[640px]:text-[length:var(--size-base)] @min-[640px]:px-[var(--space-7)]",
    "@min-[1024px]:px-[var(--pad-btn-lg)] @min-[1024px]:py-[var(--space-4)]",
  ].join(" "),
  /* xl — the hero CTA size, a step above lg. Added because a page was setting a larger
     fontSize and padding inline, which bypassed the steps entirely and left the button the
     same size on a phone as on a desktop. */
  xl: [
    "text-[length:var(--size-sm)] px-[var(--space-7)] py-[var(--space-4)]",
    "@min-[640px]:text-[length:var(--size-base)] @min-[640px]:px-[var(--space-8)]",
    "@min-[1024px]:text-[length:var(--size-body-lg)] @min-[1024px]:py-[var(--space-5)]",
  ].join(" "),
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "border-transparent bg-[var(--surface-inverse)] text-[var(--text-on-inverse)] hover:bg-[var(--sher-text)]",
  accent:
    "border-transparent bg-[var(--accent)] text-[var(--sher-white)] hover:bg-[var(--accent-hover)]",
  surface:
    "border-[var(--border-strong)] bg-[var(--surface-raised)] text-[var(--text-strong)] hover:bg-[var(--surface-tint)]",
  tint: "border-[var(--border-strong)] bg-[var(--surface-tint)] text-[var(--text-strong)] hover:bg-[var(--surface-raised)]",
  tonal:
    "border-transparent bg-[var(--sher-primary)] text-[var(--text-on-primary)] hover:bg-[var(--accent-hover)] hover:text-[var(--sher-white)]",
  /* Hover tints rather than filling dark. --surface-inverse is the resting color of a
     `primary` button, so hovering the quieter half of a buy pair made it impersonate the
     committing action below it. The outline identifies this variant, so hover warms the
     fill instead of inverting. */
  secondary:
    "border-[var(--text-strong)] bg-transparent text-[var(--text-strong)] hover:bg-[var(--surface-tint)]",
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
    // min-h is the floor: the stepped sizes put lg at 11.4px type with --space-3 padding
    // on mobile, which came to a 32px button, under a comfortable tap target. It is the
    // same token the size chips and icon buttons use, so no future step can fall below it.
    "inline-flex items-center justify-center gap-[var(--space-2)] border leading-none no-underline",
    "min-h-[var(--control-hit)]",
    "font-[family-name:var(--font-button)] font-medium uppercase tracking-[var(--tracking-label)]",
    "rounded-[var(--radius-btn)] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]",
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
