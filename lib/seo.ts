import type { Metadata } from "next";
import type { Crumb } from "@/components/Breadcrumb";

/* The SEO layer (B-010, F-009). One place for the canonical origin, per-page
   metadata (title / description / canonical / Open Graph), and the JSON-LD
   builders (Product, BreadcrumbList). Pages import from here so the rules stay
   in one file and the structured data matches what the page shows. */

// Canonical origin for every absolute URL we emit (metadataBase, canonical,
// Open Graph, JSON-LD, sitemap, robots). Override per environment with
// NEXT_PUBLIC_SITE_URL; the fallback is the store's production domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sherbrand.co"
).replace(/\/+$/, "");

export const SITE_NAME = "SHER";

// Absolute URL for a site-relative path (leaves already-absolute URLs alone).
export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

// Trim a description to a search-friendly length on a word boundary.
function clampDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, "")}…`;
}

// Per-page metadata with a self-referencing canonical and matching Open Graph.
// `title` flows through the root title template ("%s · SHER") unless a page
// passes an absolute title itself.
export function pageMetadata(input: {
  title: Metadata["title"];
  description?: string;
  path: string;
  image?: string | null;
}): Metadata {
  // A description the slot files do not carry is left out, so the tag is absent
  // rather than empty.
  const description = input.description
    ? clampDescription(input.description)
    : undefined;
  // Open Graph takes the plain text of the title in either form. An absolute
  // title is still a title, so it must not fall through to undefined here.
  const ogTitle =
    typeof input.title === "string"
      ? input.title
      : input.title && typeof input.title === "object" && "absolute" in input.title
        ? input.title.absolute
        : undefined;
  return {
    title: input.title,
    description,
    alternates: { canonical: input.path },
    openGraph: {
      title: ogTitle,
      description,
      url: absoluteUrl(input.path),
      siteName: SITE_NAME,
      type: "website",
      ...(input.image ? { images: [{ url: input.image }] } : {}),
    },
  };
}

export type JsonLdData = Record<string, unknown>;

// BreadcrumbList that matches the visible trail (F-009). Each crumb keeps its
// own link; the current (last, hrefless) crumb points at the page itself.
export function breadcrumbLd(items: Crumb[], currentPath: string): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.href ?? currentPath),
    })),
  };
}

// Product structured data (F-009). A missing description or image is skipped,
// and the page still renders.
export function productLd(input: {
  name: string;
  description: string;
  image?: string | null;
  path: string;
  price: number;
  currency: string;
  available: boolean;
}): JsonLdData {
  const data: JsonLdData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      price: input.price.toFixed(2),
      priceCurrency: input.currency,
      availability: input.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: absoluteUrl(input.path),
    },
  };
  const description = input.description.replace(/\s+/g, " ").trim();
  if (description) data.description = description;
  if (input.image) data.image = input.image;
  return data;
}
