"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import { ProductPanel } from "@/components/C-ProductPanel";
import type { Crumb } from "@/components/Breadcrumb";
import type { SizeOption } from "@/components/SizeSelector";
import type { MediaItem } from "@/components/MediaGallery";
import { Details } from "@/components/C-Details";
import { Sizing } from "@/components/C-Sizing";
import type { SizeChart } from "@/components/C-Sizing";
import { Shipping } from "@/components/C-Shipping";
import { useCart } from "@/components/CartProvider";

/* Route-private client glue for the product panel (B-005) + cart wiring (B-007)
   + the size-chart / shipping drawers (B-006). Holds the selected size and
   quantity, resolves the size to a variant id, and drives Add to Cart / Buy Now
   through the cart context. Also owns the two drawer open states. It renders
   only design components (C-ProductPanel, C-Sizing, C-Shipping). */

export type VariantOption = { id: string; size: string; available: boolean };

export type ProductDetailProps = {
  /** S-009 copy for the shipping drawer. The slot files are read on the server,
   *  so the page passes it in rather than this client island reading D-006. */
  shippingSections?: { title: string; body: string }[];
  /** D-005 size chart. Read on the server for the same reason as the shipping
   *  copy: the TSV files are read from disk, not from this client island. */
  sizeChart?: SizeChart;
  name: string;
  price: number;
  compareAt?: number;
  currency: string;
  description: string;
  breadcrumb: Crumb[];
  media: MediaItem[];
  sizes: SizeOption[];
  variants: VariantOption[];
  attributeValue?: string;
  preorderHref: string;
};

export function ProductDetail(props: ProductDetailProps): ReactElement {
  const { addItem, buyNow } = useCart();
  const firstInStock = props.sizes.find((size) => !size.soldOut)?.label ?? null;
  const [size, setSize] = useState<string | null>(firstInStock);
  const [quantity, setQuantity] = useState(1);
  const [pending, setPending] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);

  // The available variant that matches the chosen size, or null. Strict: never
  // fall back to a sold-out or different-size variant — that would add the wrong
  // item (SizeSelector already blocks picking a sold-out size).
  const resolveVariantId = (): string | null => {
    const match = props.variants.find((v) => v.size === size && v.available);
    return match?.id ?? null;
  };

  const run = (action: (variantId: string, quantity: number) => Promise<void>): void => {
    const id = resolveVariantId();
    if (!id || pending) return;
    setPending(true);
    void action(id, quantity).finally(() => setPending(false));
  };

  return (
    <>
      <ProductPanel
        layout="stacked"
        indicator="thumbs"
        transition="fade"
        showQuantity={false}
        breadcrumb={props.breadcrumb}
        name={props.name}
        price={props.price}
        compareAt={props.compareAt}
        currency={props.currency}
        description={props.description}
        media={props.media}
        sizes={props.sizes}
        size={size}
        onSize={setSize}
        quantity={quantity}
        onQuantity={setQuantity}
        onAddToCart={() => run(addItem)}
        onBuyNow={() => run(buyNow)}
        onDetails={() => setDetailsOpen(true)}
        onSizeChart={() => setSizeChartOpen(true)}
        onShipping={() => setShippingOpen(true)}
        preorderHref={props.preorderHref}
      />

      {/* The type attribute is a titled section in the drawer, not an eyebrow in
          the buy column, so the buy column stays price, size, then the buttons. */}
      <Details
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        productName={props.name}
        intro={props.description}
        sections={
          props.attributeValue ? [{ title: "Type", body: props.attributeValue }] : []
        }
      />

      {/* An empty chart rather than C-Sizing's own default, which is sample
          measurements. A product D-005 has no row for shows no table. */}
      <Sizing
        open={sizeChartOpen}
        onClose={() => setSizeChartOpen(false)}
        productName={props.name}
        chart={props.sizeChart ?? { measures: [], rows: [] }}
      />
      <Shipping
        open={shippingOpen}
        onClose={() => setShippingOpen(false)}
        sections={props.shippingSections}
      />
    </>
  );
}
