import type { ReactElement } from "react";
import { getProducts } from "@/lib/shopify/fetchers";
import { toGridProduct } from "@/lib/listing";
import { ShopTitle } from "@/components/C-ShopTitle";
import { ProductGrid } from "@/components/C-ProductGrid";
import { ShopEditorial } from "@/components/C-ShopEditorial";
import { Button } from "@/components/Button";

// Per-page SEO metadata (title/description/canonical) is build step B-010.

export default async function ShopPage(): Promise<ReactElement> {
  const products = await getProducts(50);

  return (
    <main className="mx-auto flex max-w-[var(--container)] flex-col gap-[var(--space-9)] px-[var(--gutter)] py-[var(--space-7)]">
      {/* Pills link to the three categories; they do not filter this grid (S-002). */}
      <ShopTitle
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Shop" }]}
        heading="Shop Modern Womenswear"
        description="Every SHER piece in one place. Corset tops with structure you can feel. Matching sets that land as one look. Cocktail dresses in satin that catches the light. Three categories, one standard."
        filters={[
          { label: "Corset Tops", href: "/corset-tops" },
          { label: "Matching Sets", href: "/matching-sets" },
          { label: "Cocktail Dresses", href: "/cocktail-dresses" },
        ]}
      />
      <ProductGrid products={products.map(toGridProduct)} columns="1/1/2" pageSize={12} endMark="mark" />

      {/* Editorial images (s-002.3/4/5) still missing (MVP) — media left empty. */}
      <ShopEditorial
        mobileFirst="text"
        mobileAlign="right"
        eyebrow="About our Product"
        heading="More about our Corset Tops"
        paragraph="We build every corset top by hand. Each bone is set one at a time on a mannequin, not laid flat by a machine, so the shape holds to the body. Inside, a satin lining and structured bust cups keep the fit clean and comfortable. The result is a top that reads elegant, never cheap."
      >
        <Button as="a" href="/corset-tops" variant="secondary">
          Explore Corset Tops
        </Button>
      </ShopEditorial>
      <ShopEditorial
        mirror
        mobileFirst="text"
        mobileAlign="left"
        eyebrow="About our Product"
        heading="More about our Matching Sets"
        paragraph="A matching set does the styling for you. We pair a hand-built corset top with a skirt or trousers cut to match, so the whole look lands as one. The Skirt Set softens the line; the Trouser Set sharpens it. Either way, you walk in ready to be seen."
      >
        <Button as="a" href="/matching-sets" variant="secondary">
          Explore Matching Sets
        </Button>
      </ShopEditorial>
      <ShopEditorial
        mobileFirst="text"
        mobileAlign="right"
        eyebrow="About our Product"
        heading="More about our Cocktail Dresses"
        paragraph="Our cocktail dresses are made for the moments people look. We cut them in satin and soft slip shapes that skim the body and catch the light. Choose the length that fits the night: Mini, Midi, or Maxi. Each one is built to hold a room."
      >
        <Button as="a" href="/cocktail-dresses" variant="secondary">
          Explore Cocktail Dresses
        </Button>
      </ShopEditorial>
    </main>
  );
}
