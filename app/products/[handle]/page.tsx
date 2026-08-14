import type { Metadata } from "next";
import type { ReactElement } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/shopify/fetchers";
import type { Product } from "@/lib/shopify/types";
import { RelatedProducts } from "@/components/C-RelatedProducts";
import type { GridProduct } from "@/components/C-ProductGrid";
import type { Crumb } from "@/components/Breadcrumb";
import type { SizeOption } from "@/components/SizeSelector";
import type { MediaItem } from "@/components/MediaGallery";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata, productLd } from "@/lib/seo";
import { ProductDetail } from "./product-detail";

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

// Gallery order per F-010: the video(s) first, then the images.
function toMedia(product: Product): MediaItem[] {
  const videos: MediaItem[] = product.videos.map((v): MediaItem => ({
    type: "video",
    src: v.url,
    poster: product.featuredImage?.url,
    alt: product.title,
  }));
  const images: MediaItem[] = product.images.map((img): MediaItem => ({
    type: "image",
    src: img.url,
    alt: img.altText ?? product.title,
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

  const breadcrumb: Crumb[] = [{ label: "Shop", href: "/shop" }, { label: product.title }];
  const path = `/products/${handle}`;

  // "You May Also Like": up to 2 products that are not this one (F-001).
  const others = (await getProducts(12)).filter((p) => p.handle !== product.handle);
  const related: GridProduct[] = others.slice(0, 2).map((p): GridProduct => ({
    id: p.id,
    title: p.title,
    price: Number(p.minPrice.amount),
    href: `/products/${p.handle}`,
    soldOut: !p.availableForSale,
    media: p.featuredImage ? (
      <Image
        src={p.featuredImage.url}
        alt={p.featuredImage.altText ?? p.title}
        fill
        sizes="(min-width: 768px) 33vw, 50vw"
        className="object-cover"
      />
    ) : undefined,
  }));

  return (
    <main className="mx-auto flex max-w-[var(--container)] flex-col gap-[var(--space-9)] px-[var(--gutter)] py-[var(--space-7)]">
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
      <RelatedProducts
        products={related}
        columns="2/2/2"
        actionsLayout="stack"
        backVariant="surface"
        backLabel="View All Products"
        backHref="/shop"
      />
    </main>
  );
}
