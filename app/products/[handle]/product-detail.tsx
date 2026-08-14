"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import { ProductPanel } from "@/components/C-ProductPanel";
import type { Crumb } from "@/components/Breadcrumb";
import type { SizeOption } from "@/components/SizeSelector";
import type { MediaItem } from "@/components/MediaGallery";

/* Route-private client glue for the product panel (build step B-005). It holds
   the interactive state C-ProductPanel needs (selected size, quantity) and
   nothing else: it renders ONLY C-ProductPanel and draws no markup of its own.
   The Add to Cart / Buy Now actions (B-007) and the size-chart / shipping
   drawers (B-006) are intentionally left unwired here, so those controls render
   per the design but do nothing yet. */

export type ProductDetailProps = {
  name: string;
  price: number;
  compareAt?: number;
  currency: string;
  description: string;
  breadcrumb: Crumb[];
  media: MediaItem[];
  sizes: SizeOption[];
  attributeLabel?: string;
  attributeValue?: string;
  preorderHref: string;
};

export function ProductDetail(props: ProductDetailProps): ReactElement {
  const firstInStock = props.sizes.find((size) => !size.soldOut)?.label ?? null;
  const [size, setSize] = useState<string | null>(firstInStock);
  const [quantity, setQuantity] = useState(1);

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
      preorderHref={props.preorderHref}
    />
  );
}
