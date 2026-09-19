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
import { SECTION_Y } from "@/lib/rhythm";

const CAT = category("corset-tops");

const BREADCRUMB: Crumb[] = [
  { label: "Shop", href: "/shop" },
  { label: CAT.label },
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
      <JsonLd data={breadcrumbLd(BREADCRUMB, "/corset-tops")} />
      <CategoryBody
        breadcrumb={BREADCRUMB}
        heading={slotText("s-003.1.heading")}
        description={slotText("s-003.1.subtitle")}
        items={collection.products.map(toListingItem)}
        filterValues={uniqueTypeValues(collection.products)}
        category={CAT.label}
        attribute={CAT.attribute}
        bands={
          <div className="bg-[var(--surface-tint)]">
            <ShopEditorial
              media={<SlotImage slot="s-003.3.image-1" />}
              fullBleed
              mobileFirst="media"
              mobileAlign="right"
              {...bandCopy("s-003.3")}
            />
            <ShopEditorial
              media={<SlotImage slot="s-003.4.image-1" />}
              mirror
              fullBleed
              mobileFirst="media"
              mobileAlign="left"
              {...bandCopy("s-003.4")}
            />
            <ShopEditorial
              media={<SlotImage slot="s-003.5.image-1" />}
              fullBleed
              mobileFirst="media"
              mobileAlign="right"
              {...bandCopy("s-003.5")}
            />
          </div>
        }
      />

      <div className={`mx-auto w-full max-w-[var(--container)] px-[var(--gutter)] ${SECTION_Y}`}>
        <ShopFaq
          items={faqItems("s-003.6")}
        />
      </div>
    </main>
  );
}
