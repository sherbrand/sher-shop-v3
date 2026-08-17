import type { Metadata } from "next";
import type { ReactElement } from "react";
import { getProducts } from "@/lib/shopify/fetchers";
import { toGridProduct } from "@/lib/listing";
import { ShopTitle } from "@/components/C-ShopTitle";
import { ShopGrid } from "@/components/ShopGrid";
import { ShopEditorial } from "@/components/C-ShopEditorial";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import type { Crumb } from "@/components/Breadcrumb";

const BREADCRUMB: Crumb[] = [{ label: "Home", href: "/" }, { label: "Shop" }];

export const metadata: Metadata = pageMetadata({
  title: "All Products",
  description:
    "Every SHER piece in one place — corset tops, matching sets, and cocktail dresses. Three categories, one standard.",
  path: "/shop",
});

export default async function ShopPage(): Promise<ReactElement> {
  const products = await getProducts();

  return (
    <main className="mx-auto flex max-w-[var(--container)] flex-col gap-[var(--space-9)] px-[var(--gutter)] py-[var(--space-7)]">
      <JsonLd data={breadcrumbLd(BREADCRUMB, "/shop")} />
      {/* Pills link to the three categories; they do not filter this grid (S-002). */}
      <ShopTitle
        breadcrumb={BREADCRUMB}
        heading="Shop Modern Womenswear"
        description="Every SHER piece in one place. Corset tops with structure you can feel. Matching sets that land as one look. Cocktail dresses in satin that catches the light. Three categories, one standard."
        filters={[
          { label: "Corset Tops", href: "/corset-tops" },
          { label: "Matching Sets", href: "/matching-sets" },
          { label: "Cocktail Dresses", href: "/cocktail-dresses" },
        ]}
      />
      <ShopGrid products={products.map(toGridProduct)} />

      {/* Editorial images (s-002.3/4/5) still missing (MVP) — media left empty. */}
      <ShopEditorial
        media={
          // eslint-disable-next-line @next/next/no-img-element -- local optimized asset
          <img src="/assets/cocktail/hero.webp" alt="A SHER piece worn on a model" className="h-full w-full object-cover" />
        }
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
        media={
          // eslint-disable-next-line @next/next/no-img-element -- local optimized asset
          <img src="/assets/cocktail/tile-cocktail.webp" alt="A SHER piece worn on a model" className="h-full w-full object-cover" />
        }
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
        media={
          // eslint-disable-next-line @next/next/no-img-element -- local optimized asset
          <img src="/assets/cocktail/shop-cocktail.webp" alt="A SHER cocktail dress worn on a model" className="h-full w-full object-cover" />
        }
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
