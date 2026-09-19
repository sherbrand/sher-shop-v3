import type { ReactElement } from "react";
import { SECTION_Y } from "@/lib/rhythm";

/* Product route loading fallback. A page-shaped skeleton replaces this as the
   product page gains its own loading states. */
export default function Loading(): ReactElement {
  return (
    <main
      className={`mx-auto min-h-screen max-w-[var(--container)] px-[var(--gutter)] ${SECTION_Y}`}
      aria-busy="true"
      aria-label="Loading product"
    />
  );
}
