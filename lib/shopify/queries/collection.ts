// Collection query strings (D-002). Reuses the product fragment so a
// collection's products come back on the same field set as a single product.

import { PRODUCT_FRAGMENT } from "@/lib/shopify/queries/product";

export const COLLECTION_QUERY = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query Collection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(first: $first) {
        nodes { ...ProductFields }
      }
    }
  }
`;

export const COLLECTIONS_QUERY = /* GraphQL */ `
  query Collections($first: Int!) {
    collections(first: $first) {
      nodes {
        id
        handle
        title
        description
      }
    }
  }
`;
