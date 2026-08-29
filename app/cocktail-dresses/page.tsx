import type { Metadata } from "next";
import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import { getCollection } from "@/lib/shopify/fetchers";
import { toListingItem, uniqueTypeValues } from "@/lib/listing";
import { ShopListing } from "@/components/ShopListing";
import { ShopEditorial } from "@/components/C-ShopEditorial";
import { bandCopy, faqItems, metaCopy, slotText } from "@/lib/slots";
import { category } from "@/lib/categories";
import { ShopFaq } from "@/components/C-ShopFaq";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import type { Crumb } from "@/components/Breadcrumb";

const BREADCRUMB: Crumb[] = [
  { label: "Shop", href: "/shop" },
  { label: category("cocktail-dresses").label },
];

const META = metaCopy("s-005");

export const metadata: Metadata = pageMetadata({
  title: META.title ? { absolute: META.title } : undefined,
  description: META.description,
  path: "/cocktail-dresses",
});

export default async function CocktailDressesPage(): Promise<ReactElement> {
  const collection = await getCollection("cocktail-dresses");
  if (!collection) notFound();

  return (
    <main className="flex flex-col">
      <div className="mx-auto flex w-full max-w-[var(--container)] flex-col gap-[var(--space-6)] px-[var(--gutter)] py-[var(--space-7)]">
        <JsonLd data={breadcrumbLd(BREADCRUMB, "/cocktail-dresses")} />
        <ShopListing
          breadcrumb={BREADCRUMB}
          heading={slotText("s-005.1.heading")}
          description={slotText("s-005.1.subtitle")}
          items={collection.products.map(toListingItem)}
          filterValues={uniqueTypeValues(collection.products)}
        />
      </div>

      {/* Editorial images (s-005.3/4/5) — curated cocktail-dress shots. */}
      <div className="bg-[var(--surface-tint)]">
        <ShopEditorial
          media={
            // eslint-disable-next-line @next/next/no-img-element -- local optimized asset
            <img src="/assets/cocktail/ck-onmodel.webp" alt="A SHER cocktail dress worn on a model" className="h-full w-full object-cover" />
          }
          fullBleed
          mobileFirst="media"
          mobileAlign="right"
          {...bandCopy("s-005.3")}
        />
        <ShopEditorial
          media={
            // eslint-disable-next-line @next/next/no-img-element -- local optimized asset
            <img src="/assets/cocktail/ck-lengths.webp" alt="A SHER cocktail dress showing its length on a model" className="h-full w-full object-cover" />
          }
          mirror
          fullBleed
          mobileFirst="media"
          mobileAlign="left"
          {...bandCopy("s-005.4")}
        />
        <ShopEditorial
          media={
            // eslint-disable-next-line @next/next/no-img-element -- local optimized asset
            <img src="/assets/cocktail/ck-satin.webp" alt="Close satin detail of a SHER cocktail dress" className="h-full w-full object-cover" />
          }
          fullBleed
          mobileFirst="media"
          mobileAlign="right"
          {...bandCopy("s-005.5")}
        />
      </div>

      <div className="mx-auto w-full max-w-[var(--container)] px-[var(--gutter)] py-[var(--space-7)]">
        <ShopFaq
          items={faqItems("s-005.6")}
        />
      </div>
    </main>
  );
}
