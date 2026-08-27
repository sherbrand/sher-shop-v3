import type { ReactElement, ReactNode } from "react";

/* SHER announcement bar — the thin promo strip above both headers.
   Default copy: worldwide delivery / free shipping over $250. */

export interface AnnouncementBarProps {
  /** Message content. Defaults to the shipping line. */
  children?: ReactNode;
  /** "dark" (default) inverted strip, "light" on the surface tone, or "accent" (white on accent). */
  tone?: "dark" | "light" | "accent";
  className?: string;
}

const TONES: Record<NonNullable<AnnouncementBarProps["tone"]>, string> = {
  dark: "bg-[var(--surface-inverse)] text-[var(--text-on-inverse)]",
  light: "bg-[var(--surface-raised)] text-[var(--text-default)]",
  accent: "bg-[var(--accent)] text-[var(--sher-white)]",
};

export function AnnouncementBar({
  children = "Delivers Worldwide · Free Shipping over $250",
  tone = "dark",
  className = "",
}: AnnouncementBarProps): ReactElement {
  return (
    <div
      role="region"
      aria-label="Announcement"
      className={`flex h-[var(--announce-h)] w-full items-center justify-center px-[var(--gutter)] text-center font-[family-name:var(--font-body)] text-[length:var(--size-announce-sm)] @min-[640px]:text-[length:var(--size-announce-md)] @min-[1024px]:text-[length:var(--size-announce-lg)] uppercase tracking-[var(--tracking-label)] ${TONES[tone]} ${className}`}
    >
      {children}
    </div>
  );
}
