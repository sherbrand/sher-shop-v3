import type { ReactElement } from "react";

/* Route-level loading fallback. A quiet, centered brand mark with a pulse while
   the next route's data streams in — better than a blank frame during
   client-side navigation. */
export default function Loading(): ReactElement {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading"
      className="flex min-h-[60vh] items-center justify-center"
    >
      <span className="animate-pulse font-[family-name:var(--font-display)] text-[length:var(--size-title-md)] uppercase tracking-[var(--tracking-display)] text-[var(--text-muted)]">
        SHER
      </span>
    </div>
  );
}
