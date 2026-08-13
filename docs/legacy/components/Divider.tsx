import type { ReactElement } from "react";
import { Logo } from "@/components/Logo";

/* Divider — the end/section mark that closes a band or separates one from the
   next. Three treatments, all built from border tokens:
     "rule"     a short centered hairline
     "mark"     a diamond knocked out of a tapered hairline
     "monogram" the SHER mark between two outward-fading rules
   C-ProductGrid uses it for its `endMark`; pages place it directly to open or
   close a section. */

export interface DividerProps {
  /** "rule", "mark" (default), or "monogram". */
  variant?: "rule" | "mark" | "monogram";
  /** Ring color knocked out behind the "mark" diamond — set it to the band's own
   *  background when the divider sits on a tinted section. Default surfacePage. */
  knockout?: string;
  className?: string;
}

export function Divider({
  variant = "mark",
  knockout = "var(--surface-page)",
  className = "",
}: DividerProps): ReactElement {
  if (variant === "rule") {
    return (
      <hr
        aria-hidden="true"
        className={`mx-auto my-0 w-[64px] border-0 border-t border-t-[var(--border-strong)] ${className}`}
      />
    );
  }

  if (variant === "monogram") {
    return (
      <div
        aria-hidden="true"
        className={`flex items-center justify-center gap-[var(--space-2)] ${className}`}
      >
        <span className="block h-px w-[140px] bg-[linear-gradient(90deg,transparent,var(--border-default))]" />
        <Logo variant="mark" size={13} alt="" className="shrink-0 opacity-45" />
        <span className="block h-px w-[140px] bg-[linear-gradient(90deg,var(--border-default),transparent)]" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={`relative flex items-center justify-center ${className}`}>
      <span className="block h-px w-[220px] bg-[linear-gradient(90deg,transparent,var(--border-strong)_22%,var(--border-strong)_78%,transparent)]" />
      <span
        className="absolute h-[6px] w-[6px] rotate-45 bg-[var(--text-strong)]"
        style={{ boxShadow: `0 0 0 4px ${knockout}` }}
      />
    </div>
  );
}
