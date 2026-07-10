"use client"; // error boundaries must be Client Components

import { useEffect } from "react";

// Catches render/data errors for this route segment and offers a retry.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.ReactElement {
  useEffect(() => {
    // Debug log so failures are visible in dev + Vercel logs.
    console.error("[route error]", error);
  }, [error]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-2xl font-bold">Something went wrong.</h1>
      <button
        onClick={reset}
        className="mt-4 rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </main>
  );
}
