// App-facing Shopify types. These are the FLAT shapes the app consumes:
// the fetchers unwrap Storefront's `{ nodes: [...] }` connections into arrays
// so components never touch GraphQL connection wrappers.

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Image = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

// One video, already resolved to a single playable file. `url` is an mp4, not
// the HLS manifest Shopify lists first: a plain <video> cannot pick a rendition
// out of a manifest, and left to itself it settles on the smallest one.
// `previewImage` is a still from the clip, so the poster matches what plays.
export type Video = {
  url: string;
  mimeType: string;
  width: number | null;
  height: number | null;
  previewImage: Image | null;
  /** The HLS manifest. It plays in chunks, so a brief preview downloads only
   *  the seconds it shows. Null when Shopify lists no manifest. */
  streamUrl: string | null;
};

/* One entry of the product's media, in the order Shopify shows it in the admin.
   `images` and `videos` above are split by kind; this keeps them interleaved, so
   a position counted in the admin means the same thing here (D-005's `thumb`). */
export type MediaEntry = {
  kind: "image" | "video";
  /** The picture: the image itself, or a video's still frame. */
  image: Image | null;
  /** Set on a video entry only. */
  video: Video | null;
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: Money;
  selectedOptions: SelectedOption[];
};

export type Product = {
  id: string;
  handle: string;
  /** Handles of every collection the product is in — the all-products one and
   *  its category. Used to name its category in a breadcrumb (S-006). */
  collectionHandles: string[];
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  minPrice: Money;
  maxPrice: Money;
  featuredImage: Image | null;
  images: Image[];
  // The product's video(s), if any. F-010 shows the first one before the images.
  videos: Video[];
  // Every media item in admin order, video included (D-005 `thumb` counts these).
  media: MediaEntry[];
  options: ProductOption[];
  variants: ProductVariant[];
  // The filter attribute (closure type / set type / length), from the
  // `custom.type_attribute` metafield. Null until that metafield is set up.
  typeAttribute: string | null;
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
};

export type CollectionWithProducts = Collection & {
  products: Product[];
};

export type CartLine = {
  id: string;
  quantity: number;
  lineTotal: Money;
  merchandise: {
    variantId: string;
    variantTitle: string;
    price: Money;
    selectedOptions: SelectedOption[];
    productHandle: string;
    productTitle: string;
    image: Image | null;
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: Money;
  total: Money;
  lines: CartLine[];
};
