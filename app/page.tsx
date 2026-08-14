import type { ReactElement } from "react";

/* Placeholder home. The real Home page (hero carousel, category tiles, and
   featured products) is build step B-008; this keeps the app shippable now. */
export default function HomePage(): ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-[var(--space-4)] px-[var(--gutter)] text-center">
      <h1 className="text-[length:var(--size-hero)]">SHER</h1>
      <p className="max-w-[46ch] text-[var(--text-meta)]">
        Modern womenswear. The store is on its way.
      </p>
    </main>
  );
}
