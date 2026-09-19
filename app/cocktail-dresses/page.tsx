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

const CAT = category("cocktail-dresses");

const BREADCRUMB: Crumb[] = [
  { label: "Shop", href: "/shop" },
  { label: CAT.label },
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
      <JsonLd data={breadcrumbLd(BREADCRUMB, "/cocktail-dresses")} />
      <CategoryBody
        breadcrumb={BREADCRUMB}
        heading={slotText("s-005.1.heading")}
        description={slotText("s-005.1.subtitle")}
        items={collection.products.map(toListingItem)}
        filterValues={uniqueTypeValues(collection.products)}
        category={CAT.label}
        attribute={CAT.attribute}
        /* Editorial images (s-005.3/4/5) — curated cocktail-dress shots. */
        bands={
          <div className="bg-[var(--surface-tint)]">
            <ShopEditorial
              media={<SlotImage slot="s-005.3.image-1" />}
              fullBleed
              mobileFirst="media"
              mobileAlign="right"
              {...bandCopy("s-005.3")}
            />
            <ShopEditorial
              media={<SlotImage slot="s-005.4.image-1" />}
              mirror
              fullBleed
              mobileFirst="media"
              mobileAlign="left"
              {...bandCopy("s-005.4")}
            />
            <ShopEditorial
              media={<SlotImage slot="s-005.5.image-1" />}
              fullBleed
              mobileFirst="media"
              mobileAlign="right"
              {...bandCopy("s-005.5")}
            />
          </div>
        }
      />

      <div className={`mx-auto w-full max-w-[var(--container)] px-[var(--gutter)] ${SECTION_Y}`}>
        <ShopFaq
          items={faqItems("s-005.6")}
        />
      </div>
    </main>
  );
}
