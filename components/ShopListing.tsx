"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import { ShopTitle } from "@/components/C-ShopTitle";
import { ProductGrid } from "@/components/C-ProductGrid";
import type { GridProduct } from "@/components/C-ProductGrid";
import type { Crumb } from "@/components/Breadcrumb";

/* Client glue for a category listing (build step B-004). Holds the active
   attribute filter, narrows the products in place, and feeds C-ShopTitle's
   pills (F-002) and C-ProductGrid (F-001, F-003). It renders only those two
   design components and draws no markup of its own. The view toggle lives
   inside C-ProductGrid. */

export type ListingItem = { product: GridProduct; typeAttribute: string | null };

export type ShopListingProps = {
  breadcrumb: Crumb[];
  heading?: string;
  description?: string;
  items: ListingItem[];
  // Distinct type_attribute values present, used as the filter pills.
  filterValues: string[];
};

const ALL = "all";

export function ShopListing({
  breadcrumb,
  heading,
  description,
  items,
  filterValues,
}: ShopListingProps): ReactElement {
  const [active, setActive] = useState<string>(ALL);
  // F-003: the view toggle (inside C-ProductGrid) reports comfortable/compact;
  // map it to the grid's column string so the grid actually re-columns.
  const [view, setView] = useState<string>("comfortable");

  const shown = active === ALL ? items : items.filter((it) => it.typeAttribute === active);

  /* No pills when the collection has no attribute values yet (nothing to filter).
     The first pill leaves the category rather than filtering it, so it is a real link to
     the shop and carries no handler. The rest take a per-item onClick instead of a shared
     one, which is what keeps that first pill a link. */
  const filters =
    filterValues.length > 0
      ? [
          { label: "Back to all", href: "/shop" },
          ...filterValues.map((value) => ({
            label: value,
            active: active === value,
            // Clicking the active pill clears back to All, so a filter can be undone
            // without hunting for the Back-to-all pill.
            onClick: () => setActive((cur) => (cur === value ? ALL : value)),
          })),
        ]
      : undefined;

  return (
    <>
      <ShopTitle
        breadcrumb={breadcrumb}
        heading={heading}
        description={description}
        filters={filters}
      />
      <ProductGrid
        products={shown.map((it) => it.product)}
        columns={view === "compact" ? "2/2/3" : "1/1/2"}
        pageSize={12}
        endMark="mark"
        onView={setView}
      />
    </>
  );
}
