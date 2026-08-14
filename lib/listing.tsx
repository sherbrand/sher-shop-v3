import Image from "next/image";
import type { Product } from "@/lib/shopify/types";
import type { GridProduct } from "@/components/C-ProductGrid";
import type { ListingItem } from "@/components/ShopListing";

/* Data mapping for the listing pages (B-004): Shopify Product -> the flat
   GridProduct / ListingItem shapes the grid and filter consume. Invisible
   plumbing — no markup beyond the product card image. */

export function toGridProduct(product: Product): GridProduct {
  return {
    id: product.id,
    title: product.title,
    price: Number(product.minPrice.amount),
    soldOut: !product.availableForSale,
    href: `/products/${product.handle}`,
    media: product.featuredImage ? (
      <Image
        src={product.featuredImage.url}
        alt={product.featuredImage.altText ?? product.title}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    ) : undefined,
  };
}

export function toListingItem(product: Product): ListingItem {
  return { product: toGridProduct(product), typeAttribute: product.typeAttribute };
}

// Unique type_attribute values present in a set of products — the filter pills.
export function uniqueTypeValues(products: Product[]): string[] {
  const values = new Set<string>();
  for (const product of products) {
    if (product.typeAttribute) values.add(product.typeAttribute);
  }
  return [...values];
}
