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
  MediaEntry,
  Money,
  Product,
  ProductOption,
  ProductVariant,
  Video,
} from "@/lib/shopify/types";

// --- Raw shapes as they come back from the queries above ---
type RawVideoSource = {
  url: string;
  mimeType: string;
  format: string;
  width: number | null;
  height: number | null;
};

type RawMediaNode = {
  mediaContentType: string;
  previewImage: Image | null;
  sources?: Array<RawVideoSource>;
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
  collections: { nodes: Array<{ handle: string }> };
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
  const media: MediaEntry[] = [];
  for (const m of p.media.nodes) {
    if (m.mediaContentType !== "VIDEO" || !m.sources) {
      // An image entry carries its own picture as the media preview.
      media.push({ kind: "image", image: m.previewImage, video: null });
      continue;
    }
    // Shopify lists the HLS manifest first, then the mp4 renditions. Take the
    // biggest mp4: a <video> given the manifest streams the smallest rendition
    // it can, which on a short muted loop is the only one it ever reaches.
    const mp4s = m.sources.filter((s) => s.mimeType === "video/mp4");
    const best = mp4s.reduce<RawVideoSource | null>(
      (a, b) => (a === null || (b.height ?? 0) > (a.height ?? 0) ? b : a),
      null,
    );
    if (!best) {
      console.warn(`[shopify] video on ${p.handle} has no mp4 source; skipped`);
      continue;
    }
    // The manifest sits alongside the mp4 renditions and is what a short hover
    // preview plays, since it arrives in chunks rather than as a whole file.
    const stream = m.sources.find((source) => source.format === "m3u8");
    const video: Video = {
      url: best.url,
      mimeType: best.mimeType,
      width: best.width,
      height: best.height,
      previewImage: m.previewImage,
      streamUrl: stream?.url ?? null,
    };
    videos.push(video);
    media.push({ kind: "video", image: m.previewImage, video });
  }
  return {
    id: p.id,
    handle: p.handle,
    collectionHandles: p.collections.nodes.map((c) => c.handle),
    title: p.title,
    description: p.description,
    descriptionHtml: p.descriptionHtml,
    availableForSale: p.availableForSale,
    minPrice: p.priceRange.minVariantPrice,
    maxPrice: p.priceRange.maxVariantPrice,
    featuredImage: p.featuredImage,
    images: p.images.nodes,
    videos,
    media,
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

// One Storefront fetch returns at most 250 nodes (F-001): cap the request there
// and log if a result comes back full, since it may be truncated.
const MAX_FETCH = 250;

export async function getProducts(first = MAX_FETCH): Promise<Product[]> {
  const capped = Math.min(first, MAX_FETCH);
  const data = await shopifyFetch<{ products: { nodes: RawProduct[] } }>({
    query: PRODUCTS_QUERY,
    variables: { first: capped },
    tags: ["products"],
  });
  if (data.products.nodes.length >= MAX_FETCH) {
    console.warn(`[shopify] getProducts hit the ${MAX_FETCH} cap — results may be truncated.`);
  }
  return data.products.nodes.map(reshapeProduct);
}

// --- Collections ---
export async function getCollection(
  handle: string,
  first = MAX_FETCH,
): Promise<CollectionWithProducts | null> {
  const capped = Math.min(first, MAX_FETCH);
  const data = await shopifyFetch<{
    collection: (RawCollection & { products: { nodes: RawProduct[] } }) | null;
  }>({
    query: COLLECTION_QUERY,
    variables: { handle, first: capped },
    tags: ["collections", "products"],
  });
  const c = data.collection;
  if (!c) return null;
  if (c.products.nodes.length >= MAX_FETCH) {
    console.warn(`[shopify] collection "${handle}" hit the ${MAX_FETCH} cap — results may be truncated.`);
  }
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
