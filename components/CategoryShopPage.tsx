import Link from "next/link";

// Shared layout for the three Phase-2 shop category pages (S-003/004/005 = B-004).
// Breadcrumb + heading + filter pills + product grid + an "About" block.
// Filters/grid are structural; real products + working filters land with the
// Shopify Storefront token (B-002 data layer).
export function CategoryShopPage({
  category,
  title,
  subtitle,
  filterLabel,
  filters,
  about,
}: {
  category: string;
  title: string;
  subtitle: string;
  filterLabel: string;
  filters: string[];
  about: { h2: string; paragraph: string; btnLabel: string; btnHref: string };
}): React.ReactElement {
  const placeholders = Array.from({ length: 6 });
  return (
    <main className="pt-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
        {/* S-00x.1 — breadcrumb + heading + filter pills */}
        <nav className="font-ui text-[11px] uppercase tracking-[0.14em] text-ink/45">
          <Link href="/" className="transition-colors hover:text-primary">Home</Link>
          <span className="px-2">›</span>
          <Link href="/shop" className="transition-colors hover:text-primary">Shop</Link>
          <span className="px-2">›</span>
          <span className="text-ink/70">{category}</span>
        </nav>

        <h1 className="font-display-h mt-5 text-[28px] text-ink">{title}</h1>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink/70">{subtitle}</p>

        <div className="mt-7 flex flex-wrap items-center gap-2.5">
          <span className="font-ui mr-1 text-[11px] uppercase tracking-[0.14em] text-ink/40">
            {filterLabel}
          </span>
          {filters.map((f) => (
            <span
              key={f}
              className="font-ui rounded-card border border-ink/15 px-4 py-2 text-[13px] text-ink/80"
            >
              {f}
            </span>
          ))}
        </div>

        {/* S-00x.2 — product grid (2 col mobile, 3 col desktop) */}
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-10">
          {placeholders.map((_, i) => (
            <div key={i}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(160deg, #f3efec 0%, #ded6ce 100%)" }}
                />
              </div>
              <p className="mt-3 text-[16px] leading-tight text-ink/85">SHER {category}</p>
              <p className="mt-1 font-ui text-[13px] text-ink/45">Coming soon</p>
            </div>
          ))}
        </div>

        <p className="mt-14 font-ui text-[12px] text-ink/40">
          Live products and working filters load from Shopify once the Storefront token is set.
        </p>
      </div>

      {/* S-00x.3 — About block: Image | text */}
      <section className="mt-20 bg-surface">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(160deg, #efeae6 0%, #d8d0c8 100%)" }}
              />
            </div>
            <div>
              <h2 className="font-display-h text-[24px] text-ink">{about.h2}</h2>
              <p className="mt-4 text-[15px] leading-[1.7] text-ink/80">{about.paragraph}</p>
              <div className="mt-7">
                <Link href={about.btnHref} className="btn-primary">
                  {about.btnLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
