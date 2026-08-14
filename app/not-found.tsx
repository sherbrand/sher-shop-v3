import type { ReactElement } from "react";
import Link from "next/link";

/* Root 404. */
export default function NotFound(): ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-[var(--space-4)] px-[var(--gutter)] text-center">
      <h1 className="text-[length:var(--size-section)]">Page not found</h1>
      <Link href="/" className="underline underline-offset-[0.3em]">
        Back to home
      </Link>
    </main>
  );
}
