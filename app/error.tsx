"use client";

import type { ReactElement } from "react";

/* Root error boundary. Client Component by requirement. */
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-[var(--space-4)] px-[var(--gutter)] text-center">
      <h1 className="text-[length:var(--size-section)]">Something went wrong</h1>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--text-strong)] px-[var(--pad-btn-md)] py-[var(--space-3)] font-[family-name:var(--font-button)] text-[length:var(--size-sm)] uppercase tracking-[var(--tracking-label)] text-[var(--text-strong)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--surface-inverse)] hover:text-[var(--text-on-inverse)]"
      >
        Try again
      </button>
    </main>
  );
}
