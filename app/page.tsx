// Home route placeholder — proves the foundation runs.
// The real home page (hero carousel, category cards, featured products) is Phase 4 / B-007.
// Server Component by default.
export default function HomePage(): React.ReactElement {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">
        SHER Web Store
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">
        Foundation is live.
      </h1>
      <p className="mt-4 text-neutral-600">
        Next.js 15 (App Router) · TypeScript strict · Tailwind v4 · Shopify Storefront API.
        Next up: B-002 queries and B-003 header / menu / footer.
      </p>
    </main>
  );
}
