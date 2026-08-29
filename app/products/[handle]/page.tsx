import type { Metadata } from "next";
import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProduct, getProducts } from "@/lib/shopify/fetchers";
import type { Product } from "@/lib/shopify/types";
import { RelatedProducts } from "@/components/C-RelatedProducts";
import { Button } from "@/components/Button";
import type { GridProduct } from "@/components/C-ProductGrid";
import { toGridProduct } from "@/lib/listing";
import type { Crumb } from "@/components/Breadcrumb";
import type { SizeOption } from "@/components/SizeSelector";
import type { MediaItem } from "@/components/MediaGallery";
import { sized } from "@/lib/media";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata, productLd } from "@/lib/seo";
import { ProductDetail } from "./product-detail";
import { proseSections, slotText } from "@/lib/slots";
import { categoryFor } from "@/lib/categories";

// A size is sold out when every variant carrying it is unavailable (F-011).
// Colour and other options are ignored: the design panel selects size only.
function toSizes(product: Product): SizeOption[] {
  const sizeOption = product.options.find((o) => o.name.toLowerCase() === "size");
  if (!sizeOption) return [];
  return sizeOption.values.map((value): SizeOption => {
    const forSize = product.variants.filter((v) =>
      v.selectedOptions.some((o) => o.name.toLowerCase() === "size" && o.value === value),
    );
    const soldOut = forSize.length > 0 && forSize.every((v) => !v.availableForSale);
    return { label: value, soldOut };
  });
}

/* One shot's share of the viewport in C-ProductPanel's stacked layout: the media
   column is 1.55 of 1.55+1 from 768px, and the shot rail splits into two columns
   from 1024px. */
const SHOT_SIZES = "(min-width: 1024px) 31vw, (min-width: 768px) 61vw, 100vw";

/* Gallery order per F-010: the video(s) first, then the images.
   Each item carries both shapes the two panel layouts read. The beside layout
   (MediaGallery) renders `src` and `poster` itself. The stacked layout renders
   `node` in the stage and paints a string `thumb` in its thumb strip, so an item
   without those comes out empty there. */
function toMedia(product: Product): MediaItem[] {
  const posterUrl = product.featuredImage?.url;
  const videos: MediaItem[] = product.videos.map((v): MediaItem => ({
    type: "video",
    src: v.url,
    poster: posterUrl,
    alt: product.title,
    node: (
      <video
        src={v.url}
        poster={sized(posterUrl, 1200)}
        muted
        loop
        playsInline
        autoPlay
        // The poster paints the cell straight away and the file itself is never
        // preloaded, so the video does not compete for LCP (F-010, B-011).
        preload="none"
        aria-label={product.title}
      />
    ),
    thumb: sized(posterUrl, 200),
  }));
  const images: MediaItem[] = product.images.map((img, i): MediaItem => ({
    type: "image",
    src: img.url,
    alt: img.altText ?? product.title,
    node: (
      <Image
        src={img.url}
        alt={img.altText ?? product.title}
        fill
        sizes={SHOT_SIZES}
        // The first image is the largest thing above the fold (B-011).
        priority={i === 0}
        className="object-cover"
      />
    ),
    thumb: sized(img.url, 200),
  }));
  return [...videos, ...images];
}

// Product metadata is dynamic (F-009): title, description, canonical, and the
// featured image for Open Graph. A missing product returns a minimal title;
// the page itself renders the 404 (notFound below). getProduct is fetched here
// and in the page — Next dedupes the identical request within one render.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: "Product Not Found" };
  return pageMetadata({
    title: product.title,
    description: product.description,
    path: `/products/${handle}`,
    image: product.featuredImage?.url ?? null,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<ReactElement> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  /* S-006.1 — Shop › Category › product. A product carries the all-products
     collection as well as its category, so the category is picked out by handle.
     One with no category falls back to Shop › product. */
  const category = categoryFor(product.collectionHandles);
  const breadcrumb: Crumb[] = [
    { label: "Shop", href: "/shop" },
    ...(category ? [{ label: category.label, href: category.href }] : []),
    { label: product.title },
  ];
  const path = `/products/${handle}`;

  // "You May Also Like": up to 2 products that are not this one (F-001). Mapped
  // through toGridProduct so the cards get the same hover/touch image swap.
  const others = (await getProducts(12)).filter((p) => p.handle !== product.handle);
  const related: GridProduct[] = others.slice(0, 3).map(toGridProduct);

  return (
    /* C-ProductPanel carries its own gutters (its buy column pads to --gutter),
       so the band runs full-bleed and the gallery meets the screen edge. Only
       the related rail below takes the page container. */
    <main className="flex flex-col gap-[var(--space-9)] pb-[var(--space-7)]">
      <JsonLd
        data={productLd({
          name: product.title,
          description: product.description,
          image: product.featuredImage?.url ?? null,
          path,
          price: Number(product.minPrice.amount),
          currency: product.minPrice.currencyCode,
          available: product.availableForSale,
        })}
      />
      <JsonLd data={breadcrumbLd(breadcrumb, path)} />
      <ProductDetail
        shippingSections={proseSections("s-009").map((section) => ({
          title: section.heading,
          body: section.paragraph,
        }))}
        name={product.title}
        price={Number(product.minPrice.amount)}
        currency={product.minPrice.currencyCode}
        description={product.description}
        breadcrumb={breadcrumb}
        media={toMedia(product)}
        sizes={toSizes(product)}
        variants={product.variants.map((v) => ({
          id: v.id,
          size: v.selectedOptions.find((o) => o.name.toLowerCase() === "size")?.value ?? "",
          available: v.availableForSale,
        }))}
        attributeValue={product.typeAttribute ?? undefined}
        preorderHref="/contact"
      />
      {/* S-006.2 — a swipe rail of three, with the two back buttons in its last
          cell. The first points at the product's own category, the second at the
          whole shop; a product with no category shows only the second. */}
      <div className="mx-auto flex w-full max-w-[var(--container)] flex-col px-[var(--gutter)]">
      <RelatedProducts
        products={related}
        layout="stacked"
        backVariant="tint"
        subtitle={slotText("s-006.2.subtitle")}
        backLabel={category ? `Back to ${category.label}` : undefined}
        backHref={category?.href}
      >
        <Button as="a" href="/shop" variant="accent">
          Back to All Products
        </Button>
      </RelatedProducts>
      </div>
    </main>
  );
}
