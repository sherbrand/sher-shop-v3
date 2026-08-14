import type { ReactElement } from "react";

/* Route-level loading fallback. Page-shaped skeletons replace this as the
   individual screens are built. */
export default function Loading(): ReactElement {
  return <div className="min-h-screen" aria-busy="true" aria-label="Loading" />;
}
