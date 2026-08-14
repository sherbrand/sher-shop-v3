import type { ReactElement } from "react";
import Link from "next/link";

/* Shown when a product handle has no matching product (getProduct returned null). */
export default function NotFound(): ReactElement {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-[var(--container-prose)] flex-col items-center justify-center gap-[var(--space-4)] px-[var(--gutter)] text-center">
      <h1 className="text-[length:var(--size-section)]">Product not found</h1>
      <Link href="/shop" className="underline underline-offset-[0.3em]">
        Back to shop
      </Link>
    </main>
  );
}
