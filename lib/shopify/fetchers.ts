// Typed read functions for products and collections. Each calls shopifyFetch
// with a query string, then unwraps Storefront's `{ nodes }` connections and
// the metafield wrapper into the flat app types.

import { shopifyFetch } from "@/lib/shopify";
import { PRODUCT_QUERY, PRODUCTS_QUERY } from "@/lib/shopify/queries/product";
import { COLLECTION_QUERY, COLLECTIONS_QUERY } from "@/lib/shopify/queries/collection";
import type {
  Collection,
  CollectionWithProducts,
  Image,
  Money,
  Product,
  ProductOption,
  ProductVariant,
  Video,
} from "@/lib/shopify/types";

// --- Raw shapes as they come back from the queries above ---
type RawMediaNode = {
  mediaContentType: string;
  sources?: Array<{ url: string; mimeType: string }>;
};

type RawProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  featuredImage: Image | null;
  images: { nodes: Image[] };
  media: { nodes: RawMediaNode[] };
  options: ProductOption[];
  variants: { nodes: ProductVariant[] };
  typeAttribute: { value: string } | null;
};

type RawCollection = {
  id: string;
  handle: string;
  title: string;
  description: string;
};

// --- Reshapers ---
function reshapeProduct(p: RawProduct): Product {
  const videos: Video[] = [];
  for (const m of p.media.nodes) {
    if (m.mediaContentType === "VIDEO" && m.sources && m.sources.length > 0) {
      const source = m.sources[0];
      if (source) videos.push({ url: source.url, mimeType: source.mimeType });
    }
  }
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    descriptionHtml: p.descriptionHtml,
    availableForSale: p.availableForSale,
    minPrice: p.priceRange.minVariantPrice,
    maxPrice: p.priceRange.maxVariantPrice,
    featuredImage: p.featuredImage,
    images: p.images.nodes,
    videos,
    options: p.options,
    variants: p.variants.nodes,
    typeAttribute: p.typeAttribute?.value ?? null,
  };
}

// --- Products ---
export async function getProduct(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{ product: RawProduct | null }>({
    query: PRODUCT_QUERY,
    variables: { handle },
    tags: ["products"],
  });
  return data.product ? reshapeProduct(data.product) : null;
}

export async function getProducts(first = 100): Promise<Product[]> {
  const data = await shopifyFetch<{ products: { nodes: RawProduct[] } }>({
    query: PRODUCTS_QUERY,
    variables: { first },
    tags: ["products"],
  });
  return data.products.nodes.map(reshapeProduct);
}

// --- Collections ---
export async function getCollection(
  handle: string,
  first = 100,
): Promise<CollectionWithProducts | null> {
  const data = await shopifyFetch<{
    collection: (RawCollection & { products: { nodes: RawProduct[] } }) | null;
  }>({
    query: COLLECTION_QUERY,
    variables: { handle, first },
    tags: ["collections", "products"],
  });
  const c = data.collection;
  if (!c) return null;
  return {
    id: c.id,
    handle: c.handle,
    title: c.title,
    description: c.description,
    products: c.products.nodes.map(reshapeProduct),
  };
}

export async function getCollections(first = 20): Promise<Collection[]> {
  const data = await shopifyFetch<{ collections: { nodes: RawCollection[] } }>({
    query: COLLECTIONS_QUERY,
    variables: { first },
    tags: ["collections"],
  });
  return data.collections.nodes;
}
