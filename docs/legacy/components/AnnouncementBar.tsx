import type { ReactElement, ReactNode, CSSProperties } from "react";

/* SHER announcement bar — the thin promo strip above both headers.
   Default copy: worldwide delivery / free shipping over $250. */

export interface AnnouncementBarProps {
  /** Message content. Defaults to the shipping line. */
  children?: ReactNode;
  /** "dark" (default) inverted strip, or "light" on the surface tone. */
  tone?: "dark" | "light";
  className?: string;
  style?: CSSProperties;
}

export function AnnouncementBar({
  children = "Delivers Worldwide · Free Global Shipping over $250",
  tone = "dark",
  className = "",
  style,
}: AnnouncementBarProps): ReactElement {
  const dark = tone === "dark";
  return (
    <div
      role="region"
      aria-label="Announcement"
      className={[
        "flex h-[var(--announce-h)] w-full items-center justify-center px-[var(--gutter)] text-center",
        "font-[family-name:var(--font-body)] text-[length:var(--text-micro)] uppercase tracking-[var(--tracking-5)]",
        dark
          ? "bg-[var(--surface-inverse)] text-[var(--text-on-inverse)]"
          : "bg-[var(--surface-raised)] text-[var(--text-body)]",
        className,
      ].join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}
