// Home route. The real home (hero carousel, category cards, featured products)
// is Phase 4 / B-007. This placeholder is dark + tall so the B-003 chrome is
// demoable: the transparent header shows over it, and scrolling past 60vh
// swaps in the solid sticky header.
export default function HomePage(): React.ReactElement {
  return (
    <>
      <section className="flex min-h-screen items-center justify-center bg-neutral-900 text-white">
        <div className="px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">SHER</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight">Foundation is live.</h1>
          <p className="mt-5 text-white/70">
            Scroll to see the header swap · tap the menu icon to open the drawer.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24">
        <h2 className="text-2xl font-semibold tracking-tight">Next up</h2>
        <p className="mt-3 text-neutral-600">
          Global chrome (B-003) is in place. Phase 2 is product browse and the product detail page.
        </p>
      </section>
    </>
  );
}
