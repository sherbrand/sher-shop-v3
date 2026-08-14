import type { ReactElement } from "react";

/* Product route loading fallback. A page-shaped skeleton replaces this as the
   product page gains its own loading states. */
export default function Loading(): ReactElement {
  return (
    <main
      className="mx-auto min-h-screen max-w-[var(--container)] px-[var(--gutter)] py-[var(--space-7)]"
      aria-busy="true"
      aria-label="Loading product"
    />
  );
}
