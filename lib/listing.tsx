import { HoverMedia } from "@/components/HoverMedia";
import type { Product } from "@/lib/shopify/types";
import type { GridProduct } from "@/components/C-ProductGrid";
import type { ListingItem } from "@/components/ShopListing";

/* Data mapping for the listing pages (B-004): Shopify Product -> the flat
   GridProduct / ListingItem shapes the grid and filter consume. The card media
   is a HoverMedia so the thumbnail swaps to the product's next image on
   hover/touch (F-001); a product with only one image simply never swaps. */

export function toGridProduct(product: Product): GridProduct {
  const first = product.featuredImage?.url ?? product.images[0]?.url;
  // The next image after the primary one (images carry no video), for the swap.
  const second = first ? product.images.find((image) => image.url !== first)?.url : undefined;
  return {
    id: product.id,
    title: product.title,
    price: Number(product.minPrice.amount),
    soldOut: !product.availableForSale,
    href: `/products/${product.handle}`,
    media: first ? (
      <HoverMedia
        first={first}
        second={second}
        alt={product.featuredImage?.altText ?? product.title}
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
