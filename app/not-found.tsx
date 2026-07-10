import Link from "next/link";

// Shown for unmatched routes and when notFound() is called.
export default function NotFound(): React.ReactElement {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-2xl font-bold">Page not found.</h1>
      <Link href="/" className="mt-4 inline-block text-sm font-semibold underline">
        Back home
      </Link>
    </main>
  );
}
