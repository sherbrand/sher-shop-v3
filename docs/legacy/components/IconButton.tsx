"use client";

import type { ReactElement, ReactNode, CSSProperties, ButtonHTMLAttributes } from "react";

/* SHER icon button — square, borderless tap target for chrome controls
   (hamburger, cart, close). 44px min hit area for accessibility. Color is
   inherited, so a header can tint it white. Pass an <Icon> as children. */

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required accessible label (icon-only). */
  label: string;
  /** Square size in px. Default 44. */
  size?: number;
  children?: ReactNode;
}

export function IconButton({
  children,
  label,
  size = 44,
  className = "",
  style,
  ...rest
}: IconButtonProps): ReactElement {
  return (
    <button
      type="button"
      aria-label={label}
      className={`inline-flex cursor-pointer items-center justify-center border-none bg-transparent p-0 text-inherit rounded-[var(--radius-sm)] transition-opacity duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:opacity-60 ${className}`}
      style={{ width: size, height: size, ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
