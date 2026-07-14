import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop Modern Womenswear by SHER",
  description:
    "Shop modern womenswear by SHER: corset tops, matching sets, and cocktail dresses. Sensual, refined, and all made to be seen.",
};

const CATEGORY_PILLS = [
  { label: "Corset Tops", href: "/shop/corset-tops" },
  { label: "Matching Sets", href: "/shop/matching-sets" },
  { label: "Cocktail Dresses", href: "/shop/cocktail-dresses" },
] as const;

// Placeholder grid until Shopify product data is wired (needs the Storefront token).
const PLACEHOLDERS = Array.from({ length: 6 });

export default function ShopPage(): React.ReactElement {
  return (
    <main className="mx-auto max-w-[1600px] px-4 pb-24 pt-32 sm:px-6">
      {/* S-002.1 — breadcrumb + heading + category pills */}
      <nav className="font-ui text-[11px] uppercase tracking-[0.14em] text-ink/45">
        <Link href="/" className="transition-colors hover:text-primary">Home</Link>
        <span className="px-2">›</span>
        <span className="text-ink/70">Shop</span>
      </nav>

      <h1 className="font-display-h mt-5 text-[28px] text-ink">Shop Modern Womenswear by SHER</h1>
      <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink/70">
        Shop every SHER piece in one place: corset tops, matching sets, and cocktail dresses, all
        made to be seen.
      </p>

      <div className="mt-7 flex flex-wrap gap-2.5">
        {CATEGORY_PILLS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="font-ui rounded-card border border-ink/15 px-4 py-2 text-[13px] text-ink/80 transition-colors hover:border-primary hover:text-primary"
          >
            {c.label}
          </Link>
        ))}
      </div>

      {/* S-002.2 — product grid (2 col mobile, 3 col desktop) */}
      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-10">
        {PLACEHOLDERS.map((_, i) => (
          <div key={i}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(160deg, #f3efec 0%, #ded6ce 100%)" }}
              />
            </div>
            <p className="mt-3 text-[16px] leading-tight text-ink/85">SHER Piece</p>
            <p className="mt-1 font-ui text-[13px] text-ink/45">Coming soon</p>
          </div>
        ))}
      </div>

      <p className="mt-14 font-ui text-[12px] text-ink/40">
        Live products load from Shopify once the Storefront token is set.
      </p>
    </main>
  );
}
