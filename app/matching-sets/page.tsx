import type { Metadata } from "next";
import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import { getCollection } from "@/lib/shopify/fetchers";
import { toListingItem, uniqueTypeValues } from "@/lib/listing";
import { ShopListing } from "@/components/ShopListing";
import { ShopEditorial } from "@/components/C-ShopEditorial";
import { SlotImage } from "@/components/SlotImage";
import { bandCopy, faqItems, metaCopy, slotText } from "@/lib/slots";
import { category } from "@/lib/categories";
import { ShopFaq } from "@/components/C-ShopFaq";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import type { Crumb } from "@/components/Breadcrumb";

const BREADCRUMB: Crumb[] = [
  { label: "Shop", href: "/shop" },
  { label: category("matching-sets").label },
];

const META = metaCopy("s-004");

export const metadata: Metadata = pageMetadata({
  title: META.title ? { absolute: META.title } : undefined,
  description: META.description,
  path: "/matching-sets",
});

export default async function MatchingSetsPage(): Promise<ReactElement> {
  const collection = await getCollection("matching-sets");
  if (!collection) notFound();

  return (
    <main className="flex flex-col">
      <div className="mx-auto flex w-full max-w-[var(--container)] flex-col gap-[var(--space-6)] px-[var(--gutter)] py-[var(--space-7)]">
        <JsonLd data={breadcrumbLd(BREADCRUMB, "/matching-sets")} />
        <ShopListing
          breadcrumb={BREADCRUMB}
          heading={slotText("s-004.1.heading")}
          description={slotText("s-004.1.subtitle")}
          items={collection.products.map(toListingItem)}
          filterValues={uniqueTypeValues(collection.products)}
        />
      </div>

      <div className="bg-[var(--surface-tint)]">
        <ShopEditorial
          media={<SlotImage slot="s-004.3.image-1" />}
          fullBleed
          mobileFirst="media"
          mobileAlign="right"
          {...bandCopy("s-004.3")}
        />
        <ShopEditorial
          media={<SlotImage slot="s-004.4.image-1" />}
          mirror
          fullBleed
          mobileFirst="media"
          mobileAlign="left"
          {...bandCopy("s-004.4")}
        />
        <ShopEditorial
          media={<SlotImage slot="s-004.5.image-1" />}
          fullBleed
          mobileFirst="media"
          mobileAlign="right"
          {...bandCopy("s-004.5")}
        />
      </div>

      <div className="mx-auto w-full max-w-[var(--container)] px-[var(--gutter)] py-[var(--space-7)]">
        <ShopFaq
          items={faqItems("s-004.6")}
        />
      </div>
    </main>
  );
}
