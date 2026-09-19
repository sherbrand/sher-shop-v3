import type { Metadata } from "next";
import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProduct, getProducts } from "@/lib/shopify/fetchers";
import type { Product } from "@/lib/shopify/types";
import { ProductCarousel } from "@/components/C-ProductCarousel";
import { Divider } from "@/components/Divider";
import type { GridProduct } from "@/components/C-ProductGrid";
import { toGridProduct } from "@/lib/listing";
import type { Crumb } from "@/components/Breadcrumb";
import type { SizeOption } from "@/components/SizeSelector";
import type { MediaItem } from "@/components/MediaGallery";
import { sized } from "@/lib/media";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata, productLd } from "@/lib/seo";
import { ProductDetail } from "./product-detail";
import { ProductVideo } from "./product-video";
import { proseSections, slotText } from "@/lib/slots";
import { sizeChart } from "@/lib/product-data";
import { categoryFor } from "@/lib/categories";
import { SECTION_Y } from "@/lib/rhythm";

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
  const videos: MediaItem[] = product.videos.map((v): MediaItem => {
    /* The clip's own still. It matches what plays, in scene and in shape. The
       featured image does not: it is a different photo, and it is already the
       first thumbnail, so using it here shows the same picture twice. */
    const still = v.previewImage?.url;
    return {
      type: "video",
      src: v.url,
      poster: still,
      alt: product.title,
      node: (
        <ProductVideo src={v.url} poster={sized(still, 1200)} label={product.title} />
      ),
      thumb: sized(still, 200),
    };
  });
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

  /* S-006.1 — Category › product. A product carries the all-products collection
     as well as its category, so the category is picked out by handle. One with
     no category falls back to Shop › product, so the trail always has the two
     crumbs a BreadcrumbList needs. */
  const category = categoryFor(product.collectionHandles);
  const breadcrumb: Crumb[] = [
    category
      ? { label: category.label, href: category.href }
      : { label: "Shop", href: "/shop" },
    { label: product.title },
  ];
  const path = `/products/${handle}`;

  // "You May Also Like": up to 4 products that are not this one (F-001). Mapped
  // through toGridProduct so the cards get the same hover/touch image swap.
  const others = (await getProducts(12)).filter((p) => p.handle !== product.handle);
  const related: GridProduct[] = others.slice(0, 4).map(toGridProduct);

  return (
    /* C-ProductPanel carries its own gutters (its buy column pads to --gutter),
       so the band runs full-bleed and the gallery meets the screen edge. Only
       the related rail below takes the page container.
       No gap here: each band owns the space around it, and the mark between the
       panel and the related band is deliberately uneven. */
    <main className="flex flex-col">
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
        sizeChart={sizeChart(handle)}
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
      {/* The mark sits in its OWN section on the page background, not inside the
          tint band below. Inside the band it lands on the tint, so the band reads
          as overlapping the mark rather than starting below it.
          It carries the space on both sides itself, rather than taking an even
          gap from <main>: the mark opens the band under it, so it sits closer to
          that band than to the panel above. The space above steps with the page;
          the space below holds at --space-7 so the tint always starts the same
          distance under the mark. */}
      <div className="mx-auto w-full max-w-[var(--container)] px-[var(--gutter)] pt-[var(--space-8)] pb-[var(--space-7)] @min-[1024px]:pt-[var(--space-9)]">
        <Divider variant="mark" />
      </div>
      {/* S-006.2 — a swipe rail of four, products alone: no actions cell, since
          the breadcrumb above already carries the way back to the category and
          the shop.
          The tint band is the page's, not the component's: C-ProductCarousel
          paints no background of its own. */}
      <div className="bg-[var(--surface-tint)]">
        {/* The top holds at --space-7 rather than stepping, so the band's first
            line sits the same distance under the mark at every width. Only the
            bottom steps with the page. */}
        <div className="mx-auto flex w-full max-w-[var(--container)] flex-col px-[var(--gutter)] pt-[var(--space-7)] pb-[var(--space-7)] @min-[640px]:pb-[var(--space-8)] @min-[1024px]:pb-[var(--space-9)]">
          <ProductCarousel
            products={related}
            heading="You May Also Like"
            subtitle={slotText("s-006.2.subtitle")}
            peek="1.5/2.5/4"
          />
        </div>
      </div>
    </main>
  );
}
