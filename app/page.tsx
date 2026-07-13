import Link from "next/link";

// Home — built from the design source of truth (s-001_home.md + DESIGN.md).
// Image-led, restrained palette, three-typeface system. Category/product tiles
// use brand-tone placeholders until real photography is wired (Phase: product data).

// S-001.3 — 2×2 category grid.
const CATEGORIES = [
  { label: "View Corset Tops", href: "/corset-tops" },
  { label: "View Matching Sets", href: "/matching-sets" },
  { label: "View Cocktail Dresses", href: "/cocktail-dresses" },
  { label: "View All Products", href: "/shop" },
] as const;

// S-001.4 — featured products (names from spec; real products come from Shopify later).
const FEATURED = [
  { name: "Silk Lace Corset Top", href: "/shop" },
  { name: "Satin Trouser Set", href: "/shop" },
] as const;

export default function HomePage(): React.ReactElement {
  return (
    <>
      {/* S-001.1 / S-001.2 — Hero. Full-viewport, image-led (photography swaps in here).
          Warm-dark placeholder so the transparent white header reads over it. */}
      <section className="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 0%, #4a423b 0%, #322c27 45%, #241f1b 100%)",
          }}
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative z-10 px-6 text-center text-white">
          <p className="eyebrow text-white/75">Refined Sensuality</p>
          <h1 className="font-display-h mt-5 text-[32px] leading-[1.15] sm:text-[42px] lg:text-[52px]">
            Modern Womenswear
            <br className="hidden sm:block" /> by SHER
          </h1>
          <div className="mt-9">
            <Link href="/shop" className="btn-primary">
              Shop the Collection
            </Link>
          </div>
        </div>
      </section>

      {/* S-001.3 — Category grid (2×2). Image-led, display container. */}
      <section className="mx-auto max-w-[1600px] px-2 py-2">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.href + i}
              href={c.href}
              className="group relative block aspect-[16/10] overflow-hidden rounded-card"
            >
              <div
                className="absolute inset-0 transition-transform duration-500 [transition-timing-function:cubic-bezier(0,0,0.2,1)] group-hover:scale-[1.03]"
                style={{
                  background:
                    i % 2 === 0
                      ? "linear-gradient(135deg, #efeae6 0%, #d8d0c8 100%)"
                      : "linear-gradient(135deg, #e6e0da 0%, #c9c0b7 100%)",
                }}
              />
              <div className="absolute inset-0 bg-black/5 transition-colors duration-300 group-hover:bg-black/10" />
              <div className="absolute inset-0 flex items-end p-6">
                <span className="font-display-h text-[22px] text-ink">{c.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* S-001.4 — Featured products. */}
      <section className="mx-auto max-w-[1600px] px-4 py-20 sm:px-6 sm:py-24">
        <div className="mb-10 text-center">
          <p className="eyebrow text-primary">The Edit</p>
          <h2 className="font-display-h mt-3 text-[28px] text-ink">Featured Products</h2>
        </div>
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {FEATURED.map((p) => (
            <Link key={p.name} href={p.href} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <div
                  className="absolute inset-0 transition-transform duration-500 [transition-timing-function:cubic-bezier(0,0,0.2,1)] group-hover:scale-[1.03]"
                  style={{ background: "linear-gradient(160deg, #f3efec 0%, #ded6ce 100%)" }}
                />
              </div>
              <p className="mt-4 text-[20px] leading-tight text-ink">{p.name}</p>
              <p className="mt-1 text-[15px] text-ink/55">Coming soon</p>
            </Link>
          ))}
        </div>
      </section>

      {/* S-001.5 — Closing CTA. */}
      <section className="bg-surface">
        <div className="mx-auto max-w-[800px] px-6 py-24 text-center">
          <h2 className="font-display-h text-[28px] text-ink">Made to Be Seen</h2>
          <p className="mx-auto mt-4 max-w-xl text-[20px] leading-relaxed text-ink/80">
            The right piece turns heads before you say a word. Find yours and own the room.
          </p>
          <div className="mt-8">
            <Link href="/shop" className="btn-primary">
              Shop the Full Collection
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
