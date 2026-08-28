// Product query strings (D-001). One shared fragment keeps every product query
// on the same field set, which matches the raw shape the fetchers unwrap.
// `nodes` is used instead of `edges { node }` to keep the shape flat.

export const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    featuredImage { url altText width height }
    images(first: 20) {
      nodes { url altText width height }
    }
    media(first: 10) {
      nodes {
        mediaContentType
        ... on Video {
          sources { url mimeType }
        }
      }
    }
    collections(first: 10) {
      nodes { handle }
    }
    options { id name values }
    variants(first: 100) {
      nodes {
        id
        title
        availableForSale
        quantityAvailable
        price { amount currencyCode }
        selectedOptions { name value }
      }
    }
    typeAttribute: metafield(namespace: "custom", key: "type_attribute") {
      value
    }
  }
`;

export const PRODUCT_QUERY = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query Product($handle: String!) {
    product(handle: $handle) {
      ...ProductFields
    }
  }
`;

export const PRODUCTS_QUERY = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query Products($first: Int!) {
    products(first: $first) {
      nodes { ...ProductFields }
    }
  }
`;
