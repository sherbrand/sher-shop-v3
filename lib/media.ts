/* Media URL helpers shared by the product page (a Server Component) and the
   gallery components. */

// Shopify's image CDN resizes via a `width` query param. Requesting a
// display-sized image instead of the full-resolution original is the single
// biggest win for the product page's LCP and total bytes (B-011). Non-Shopify
// or already-parameterised sizes are left as given.
export function sized(url: string | undefined, width: number): string | undefined {
  if (!url || !url.includes("cdn.shopify.com")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}width=${width}`;
}
