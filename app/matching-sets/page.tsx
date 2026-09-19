import type { Metadata } from "next";
import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import { getCollection } from "@/lib/shopify/fetchers";
import { toListingItem, uniqueTypeValues } from "@/lib/listing";
import { CategoryBody } from "@/components/CategoryBody";
import { ShopEditorial } from "@/components/C-ShopEditorial";
import { SlotImage } from "@/components/SlotImage";
import { bandCopy, faqItems, metaCopy, slotText } from "@/lib/slots";
import { category } from "@/lib/categories";
import { ShopFaq } from "@/components/C-ShopFaq";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import type { Crumb } from "@/components/Breadcrumb";

const CAT = category("matching-sets");

const BREADCRUMB: Crumb[] = [
  { label: "Shop", href: "/shop" },
  { label: CAT.label },
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
      <JsonLd data={breadcrumbLd(BREADCRUMB, "/matching-sets")} />
      <CategoryBody
        breadcrumb={BREADCRUMB}
        heading={slotText("s-004.1.heading")}
        description={slotText("s-004.1.subtitle")}
        items={collection.products.map(toListingItem)}
        filterValues={uniqueTypeValues(collection.products)}
        category={CAT.label}
        attribute={CAT.attribute}
        bands={
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
        }
      />

      <div className="mx-auto w-full max-w-[var(--container)] px-[var(--gutter)] py-[var(--space-7)]">
        <ShopFaq
          items={faqItems("s-004.6")}
        />
      </div>
    </main>
  );
}
