import type { Metadata } from "next";
import type { ReactElement } from "react";
import { getProducts } from "@/lib/shopify/fetchers";
import { toGridProduct } from "@/lib/listing";
import { ShopTitle } from "@/components/C-ShopTitle";
import { ShopGrid } from "@/components/ShopGrid";
import { ShopEditorial } from "@/components/C-ShopEditorial";
import { SlotImage } from "@/components/SlotImage";
import { bandCopy, metaCopy, slotText } from "@/lib/slots";
import { categoryLinks } from "@/lib/categories";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import type { Crumb } from "@/components/Breadcrumb";

const BREADCRUMB: Crumb[] = [{ label: "Home", href: "/" }, { label: "Shop" }];

const META = metaCopy("s-002");

export const metadata: Metadata = pageMetadata({
  title: META.title ? { absolute: META.title } : undefined,
  description: META.description,
  path: "/shop",
});

export default async function ShopPage(): Promise<ReactElement> {
  const products = await getProducts();

  return (
    <main className="flex flex-col">
      <div className="mx-auto flex w-full max-w-[var(--container)] flex-col gap-[var(--space-6)] px-[var(--gutter)] py-[var(--space-7)]">
        <JsonLd data={breadcrumbLd(BREADCRUMB, "/shop")} />
        {/* Pills link to the four categories; they do not filter this grid (S-002). */}
        <ShopTitle
          breadcrumb={BREADCRUMB}
          heading={slotText("s-002.1.heading")}
          description={slotText("s-002.1.subtitle")}
          filters={categoryLinks()}
        />
        <ShopGrid products={products.map(toGridProduct)} />
      </div>

      <div className="bg-[var(--surface-tint)]">
        <ShopEditorial
          media={<SlotImage slot="s-002.3.image-1" />}
          fullBleed
          mobileFirst="media"
          mobileAlign="right"
          {...bandCopy("s-002.3")}
        >
          <Button as="a" href="/corset-tops" variant="secondary">
            Explore Corset Tops
          </Button>
        </ShopEditorial>
        <ShopEditorial
          media={<SlotImage slot="s-002.4.image-1" />}
          mirror
          fullBleed
          mobileFirst="media"
          mobileAlign="left"
          {...bandCopy("s-002.4")}
        >
          <Button as="a" href="/matching-sets" variant="secondary">
            Explore Matching Sets
          </Button>
        </ShopEditorial>
        <ShopEditorial
          media={<SlotImage slot="s-002.5.image-1" />}
          fullBleed
          mobileFirst="media"
          mobileAlign="right"
          {...bandCopy("s-002.5")}
        >
          <Button as="a" href="/cocktail-dresses" variant="secondary">
            Explore Cocktail Dresses
          </Button>
        </ShopEditorial>
        <ShopEditorial
          media={<SlotImage slot="s-002.6.image-1" />}
          mirror
          fullBleed
          mobileFirst="media"
          mobileAlign="left"
          {...bandCopy("s-002.6")}
        >
          <Button as="a" href="/beachwear" variant="secondary">
            Explore Beachwear
          </Button>
        </ShopEditorial>
      </div>
    </main>
  );
}
