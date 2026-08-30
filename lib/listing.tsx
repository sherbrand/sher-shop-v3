import { HoverMedia } from "@/components/HoverMedia";
import type { Product } from "@/lib/shopify/types";
import type { GridProduct } from "@/components/C-ProductGrid";
import type { ListingItem } from "@/components/ShopListing";
import { categoryFor } from "@/lib/categories";
import { thumbIndex } from "@/lib/product-data";

/* Data mapping for the listing pages (B-004): Shopify Product -> the flat
   GridProduct / ListingItem shapes the grid and filter consume.

   The card shows the media D-005 picks, counted the way Shopify's admin counts
   it. A product with no row, or a number past the end, falls back to the
   featured image (F-001).

   On hover, or a touch-hold, a product with a video plays it. One without swaps
   to its first picture instead, or to the second when the first is already the
   card's own. A product with nothing else to show simply never swaps.

   The card's category eyebrow comes from the product's own collections. A
   product in no category simply has no eyebrow, and the card closes up. */

export function toGridProduct(product: Product): GridProduct {
  const featured = product.featuredImage?.url ?? product.images[0]?.url;

  // D-005 counts from 1 and counts the video, so it indexes `media` directly.
  const index = thumbIndex(product.handle);
  const picked = index > 0 ? product.media[index - 1] : undefined;
  if (index > 0 && !picked) {
    console.warn(
      `[D-005] "${product.handle}" thumb=${index} is past its ${product.media.length} media — using the featured image.`,
    );
  }
  if (picked && picked.kind === "video") {
    console.warn(
      `[D-005] "${product.handle}" thumb=${index} is the video — using the featured image.`,
    );
  }
  const thumb = (picked?.kind === "image" ? picked.image?.url : undefined) ?? featured;

  /* A video plays on hover, and the picture is what a browser that cannot play
     the stream falls back to. Both are worked out, since which one a visitor
     gets is only known in the browser. */
  const video = product.videos[0];
  const swap = product.media.find(
    (entry) => entry.kind === "image" && entry.image?.url !== thumb,
  )?.image?.url;

  return {
    id: product.id,
    title: product.title,
    price: Number(product.minPrice.amount),
    soldOut: !product.availableForSale,
    href: `/products/${product.handle}`,
    category: categoryFor(product.collectionHandles)?.label,
    media: thumb ? (
      <HoverMedia
        first={thumb}
        second={swap}
        stream={video?.streamUrl ?? undefined}
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
