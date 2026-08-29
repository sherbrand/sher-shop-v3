import type { Metadata } from "next";
import type { ReactElement } from "react";
import { HeroCarousel } from "@/components/C-HeroCarousel";
import { HeroTitle } from "@/components/C-HeroTitle";
import { CategoryGrid } from "@/components/C-CategoryGrid";
import { ProductGrid } from "@/components/C-ProductGrid";
import type { GridProduct } from "@/components/C-ProductGrid";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { getProducts } from "@/lib/shopify/fetchers";
import type { Product } from "@/lib/shopify/types";
import { toGridProduct } from "@/lib/listing";
import { pageMetadata } from "@/lib/seo";
import { FEATURED_HANDLES, HERO_SLIDES, HOME_CATEGORIES } from "@/lib/home";
import { metaCopy, slotText } from "@/lib/slots";

// Home keeps the brand default title (no "%s · SHER" template) and a canonical
// at the site root (B-010, S-001 seo_role=Pillar).
const META = metaCopy("s-001");

export const metadata: Metadata = pageMetadata({
  title: META.title ? { absolute: META.title } : undefined,
  description: META.description,
  path: "/",
});

/* Home page (S-001, B-008): the hero band (S-001.1), the intro title (S-001.2),
   the category tiles (S-001.3), the Featured Products block (S-001.4), and the
   closing CTA (S-001.5). Sections set their own width, so <main> is full-bleed.

   Every slot on this page comes from the slot files via lib/slots: banners and
   tile pictures from D-004, and all copy plus the featured handles from D-006. */
export default async function HomePage(): Promise<ReactElement> {
  // F-012: Featured products are hand-picked by Shopify handle from D-006; an
  // unmatched handle is left out. FEATURED_HANDLES is empty until real handles
  // are supplied, so the block below is skipped entirely.
  let featured: GridProduct[] = [];
  if (FEATURED_HANDLES.length > 0) {
    const products = await getProducts(50);
    featured = FEATURED_HANDLES.map((handle) =>
      products.find((product) => product.handle === handle),
    )
      .filter((product): product is Product => product !== undefined)
      .map(toGridProduct);
  }

  return (
    <main>
      {/* Hero band — also the transparent header's backdrop (see SiteHeader).
          Shows the brand tone until D-004 delivers banner images (F-008).
          data-hero is the handoff mark SiteHeader measures. The negative top
          margin pulls the band back under the header, since the sticky slot
          always holds its place in the flow. */}
      {HERO_SLIDES.length > 0 && (
        <div
          data-hero
          className="mt-[calc(-1*(var(--header-h)+var(--announce-h)))]"
        >
          <HeroCarousel slides={HERO_SLIDES} indicator="bars" />
        </div>
      )}

      {/* S-001.2 — intro title. */}
      <HeroTitle
        eyebrow={slotText("s-001.2.eyebrow")}
        heading={slotText("s-001.2.heading")}
        headingLevel={1}
        description={slotText("s-001.2.subtitle")}
      />

      {/* No top margin: C-HeroTitle's own padding sets the gap above and below
          it, so one band owns that rhythm rather than two. */}
      <div className="mx-auto max-w-[var(--container-media)]">
        <CategoryGrid
          items={HOME_CATEGORIES}
          cta={{ label: "Shop all Products", href: "/shop" }}
        />
      </div>

      {featured.length > 0 && (
        <section className="mx-auto mt-[var(--space-9)] max-w-[var(--container)] px-[var(--gutter)]">
          <Divider variant="mark" className="mb-[var(--space-8)]" />
          <ProductGrid
            heading={slotText("s-001.4.heading")}
            headingLevel={2}
            showToolbar={false}
            floatingToggle={false}
            columns="1/2/2"
            products={featured}
          />
        </section>
      )}

      {/* S-001.5 — closing call to action. */}
      <HeroTitle
        className="mt-[var(--space-9)]"
        headingLevel={2}
        background="var(--surface-raised)"
        heading={slotText("s-001.5.heading")}
        description={slotText("s-001.5.subtitle")}
      >
        <Button as="a" href="/shop" variant="accent" size="lg">
          Shop the Full Collection
        </Button>
      </HeroTitle>
    </main>
  );
}
