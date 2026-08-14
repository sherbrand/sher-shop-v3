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
import {
  FEATURED_HANDLES,
  HERO_SLIDES,
  HOME_CATEGORIES,
  HOME_CTA,
  HOME_INTRO,
} from "@/lib/home";

// Home keeps the brand default title (no "%s · SHER" template) and a canonical
// at the site root (B-010, S-001 seo_role=Pillar).
export const metadata: Metadata = pageMetadata({
  title: { absolute: "Modern Womenswear by SHER" },
  description:
    "Modern womenswear by SHER: hand-built corset tops, matching sets, and cocktail dresses that shape the body and read elegant.",
  path: "/",
});

/* Home page (S-001, B-008). Composes the design components from the D-004 Home
   Content (lib/home): the hero band (S-001.1), the intro title (S-001.2), the
   category tiles (S-001.3), the Featured Products block (S-001.4), and the
   closing CTA (S-001.5). Sections set their own width, so <main> is full-bleed. */
export default async function HomePage(): Promise<ReactElement> {
  // F-012: Featured products are hand-picked by Shopify handle from D-004; an
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
          Shows the brand tone until D-004 delivers banner images (F-008). */}
      {HERO_SLIDES.length > 0 && <HeroCarousel slides={HERO_SLIDES} />}

      <HeroTitle
        eyebrow={HOME_INTRO.eyebrow}
        heading={HOME_INTRO.heading}
        headingLevel={1}
        description={HOME_INTRO.description}
      />

      <div className="mx-auto mt-[var(--space-5)] max-w-[var(--container-media)]">
        <CategoryGrid items={HOME_CATEGORIES} />
      </div>

      {featured.length > 0 && (
        <section className="mx-auto mt-[var(--space-9)] max-w-[var(--container)] px-[var(--gutter)]">
          <Divider variant="mark" className="mb-[var(--space-8)]" />
          <ProductGrid
            heading="Featured Products"
            headingLevel={2}
            showToolbar={false}
            floatingToggle={false}
            columns="1/2/2"
            products={featured}
          />
        </section>
      )}

      <HeroTitle
        className="mt-[var(--space-9)]"
        headingLevel={2}
        background="var(--surface-raised)"
        heading={HOME_CTA.heading}
        description={HOME_CTA.description}
      >
        <Button as="a" href={HOME_CTA.cta.href} variant="accent" size="lg">
          {HOME_CTA.cta.label}
        </Button>
      </HeroTitle>
    </main>
  );
}
