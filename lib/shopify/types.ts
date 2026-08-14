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

export type Video = {
  url: string;
  mimeType: string;
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
