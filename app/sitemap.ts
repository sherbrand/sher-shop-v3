import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/shopify/fetchers";
import { absoluteUrl } from "@/lib/seo";

/* XML sitemap (B-010). Lists the routes that exist today: the static pages and
   every product. The three category routes are already static entries, so
   collections are not added again. If Shopify is unreachable the static pages
   still ship — the product list just comes back empty. */

const STATIC_PATHS = [
  "/",
  "/shop",
  "/corset-tops",
  "/matching-sets",
  "/cocktail-dresses",
  "/about",
  "/contact",
  "/shipping-returns",
  "/privacy-policy",
  "/terms-of-service",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));

  let productEntries: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts(100);
    productEntries = products.map((product) => ({
      url: absoluteUrl(`/products/${product.handle}`),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch {
    productEntries = [];
  }

  return [...staticEntries, ...productEntries];
}
