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
  { label: category("corset-tops").label },
];

const META = metaCopy("s-003");

export const metadata: Metadata = pageMetadata({
  title: META.title ? { absolute: META.title } : undefined,
  description: META.description,
  path: "/corset-tops",
});

export default async function CorsetTopsPage(): Promise<ReactElement> {
  const collection = await getCollection("corset-tops");
  if (!collection) notFound();

  return (
    <main className="flex flex-col">
      <div className="mx-auto flex w-full max-w-[var(--container)] flex-col gap-[var(--space-6)] px-[var(--gutter)] py-[var(--space-7)]">
        <JsonLd data={breadcrumbLd(BREADCRUMB, "/corset-tops")} />
        <ShopListing
          breadcrumb={BREADCRUMB}
          heading={slotText("s-003.1.heading")}
          description={slotText("s-003.1.subtitle")}
          items={collection.products.map(toListingItem)}
          filterValues={uniqueTypeValues(collection.products)}
        />
      </div>

      {/* Editorial images (s-003.3/4/5) are still missing (MVP) — media left empty. */}
      <div className="bg-[var(--surface-tint)]">
        <ShopEditorial
          fullBleed
          mobileFirst="media"
          mobileAlign="right"
          {...bandCopy("s-003.3")}
        />
        <ShopEditorial
          mirror
          fullBleed
          mobileFirst="media"
          mobileAlign="left"
          {...bandCopy("s-003.4")}
        />
        <ShopEditorial
          fullBleed
          mobileFirst="media"
          mobileAlign="right"
          {...bandCopy("s-003.5")}
        />
      </div>

      <div className="mx-auto w-full max-w-[var(--container)] px-[var(--gutter)] py-[var(--space-7)]">
        <ShopFaq
          items={faqItems("s-003.6")}
        />
      </div>
    </main>
  );
}
