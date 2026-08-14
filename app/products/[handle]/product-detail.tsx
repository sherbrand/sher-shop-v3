"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import { ProductPanel } from "@/components/C-ProductPanel";
import type { Crumb } from "@/components/Breadcrumb";
import type { SizeOption } from "@/components/SizeSelector";
import type { MediaItem } from "@/components/MediaGallery";
import { useCart } from "@/components/CartProvider";

/* Route-private client glue for the product panel (B-005) + cart wiring (B-007).
   Holds the selected size and quantity, resolves the chosen size to a variant
   id, and drives Add to Cart / Buy Now through the cart context. It renders only
   C-ProductPanel. The size-chart / shipping drawers (B-006) stay unwired. */

export type VariantOption = { id: string; size: string; available: boolean };

export type ProductDetailProps = {
  name: string;
  price: number;
  compareAt?: number;
  currency: string;
  description: string;
  breadcrumb: Crumb[];
  media: MediaItem[];
  sizes: SizeOption[];
  variants: VariantOption[];
  attributeLabel?: string;
  attributeValue?: string;
  preorderHref: string;
};

export function ProductDetail(props: ProductDetailProps): ReactElement {
  const { addItem, buyNow } = useCart();
  const firstInStock = props.sizes.find((size) => !size.soldOut)?.label ?? null;
  const [size, setSize] = useState<string | null>(firstInStock);
  const [quantity, setQuantity] = useState(1);
  const [pending, setPending] = useState(false);

  // The variant for the chosen size (prefer an available one), else any variant.
  const resolveVariantId = (): string | null => {
    const forSize = props.variants.filter((v) => v.size === size);
    const pick =
      forSize.find((v) => v.available) ??
      forSize[0] ??
      props.variants.find((v) => v.available) ??
      props.variants[0];
    return pick?.id ?? null;
  };

  const run = (action: (variantId: string, quantity: number) => Promise<void>): void => {
    const id = resolveVariantId();
    if (!id || pending) return;
    setPending(true);
    void action(id, quantity).finally(() => setPending(false));
  };

  return (
    <ProductPanel
      breadcrumb={props.breadcrumb}
      name={props.name}
      price={props.price}
      compareAt={props.compareAt}
      currency={props.currency}
      description={props.description}
      attributeLabel={props.attributeLabel}
      attributeValue={props.attributeValue}
      media={props.media}
      sizes={props.sizes}
      size={size}
      onSize={setSize}
      quantity={quantity}
      onQuantity={setQuantity}
      onAddToCart={() => run(addItem)}
      onBuyNow={() => run(buyNow)}
      preorderHref={props.preorderHref}
    />
  );
}
