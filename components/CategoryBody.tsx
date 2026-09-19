"use client";

import type { ReactElement, ReactNode } from "react";
import { useState } from "react";
import { ShopTitle } from "@/components/C-ShopTitle";
import { ProductGrid } from "@/components/C-ProductGrid";
import type { GridProduct } from "@/components/C-ProductGrid";
import { Button } from "@/components/Button";
import type { Crumb } from "@/components/Breadcrumb";

/* Client glue for a category page (build step B-004). Holds the active attribute
   filter and everything that answers to it (F-002): it narrows the products in
   place, feeds C-ShopTitle's pills and C-ProductGrid, and hides the editorial
   bands while a filter is on.

   The bands come in already rendered, as a prop. They are the category's own
   copy and read from the slot files on the server, so the page stays an async
   Server Component and only the filter lives on the client.

   It owns the listing's own wrapper, since the bands sit outside that wrapper
   and both have to answer to the same filter. The view toggle lives inside
   C-ProductGrid. */

export type ListingItem = { product: GridProduct; typeAttribute: string | null };

export type CategoryBodyProps = {
  breadcrumb: Crumb[];
  heading?: string;
  description?: string;
  items: ListingItem[];
  // Distinct type_attribute values present, used as the filter pills.
  filterValues: string[];
  /** Category name, for "Back to All {Category}". */
  category: string;
  /** What this category filters by, for "Try another {attribute}." */
  attribute: string;
  /** The editorial bands, rendered by the page. Hidden while a filter is on. */
  bands?: ReactNode;
};

const ALL = "all";

/* Close of a FILTERED list, in place of the end mark: two ways back out, one
   leaving the category and one staying in it. */
function FilterEnd({
  category,
  onClear,
}: {
  category: string;
  onClear: () => void;
}): ReactElement {
  return (
    <>
      <Button as="a" href="/shop" variant="surface" size="lg" className="min-w-[var(--cta-min-w)]">
        Back to All Products
      </Button>
      <Button variant="primary" size="lg" className="min-w-[var(--cta-min-w)]" onClick={onClear}>
        Back to All {category}
      </Button>
    </>
  );
}

export function CategoryBody({
  breadcrumb,
  heading,
  description,
  items,
  filterValues,
  category,
  attribute,
  bands,
}: CategoryBodyProps): ReactElement {
  const [active, setActive] = useState<string>(ALL);
  // F-003: the view toggle (inside C-ProductGrid) reports comfortable/compact;
  // map it to the grid's column string so the grid actually re-columns.
  const [view, setView] = useState<string>("comfortable");

  const filtered = active !== ALL;
  const shown = filtered ? items.filter((it) => it.typeAttribute === active) : items;

  /* Clearing puts the bands back above the fold, so the reader would otherwise
     land part-way down copy they had not asked for. Instant, not smooth: this is
     a layout reset, not a journey through the page. */
  function clearToTop(): void {
    setActive(ALL);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

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
            // Clicking the active pill clears back to All, the same way the
            // filter-end button does, so both paths land at the top.
            onClick: () => (active === value ? clearToTop() : setActive(value)),
          })),
        ]
      : undefined;

  return (
    <>
      <div className="mx-auto flex w-full max-w-[var(--container)] flex-col gap-[var(--space-6)] px-[var(--gutter)] py-[var(--space-7)]">
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
          endMark={filtered ? "none" : "mark"}
          endSlot={filtered ? <FilterEnd category={category} onClear={clearToTop} /> : undefined}
          emptyMessage={`No pieces match this filter yet. Try another ${attribute}.`}
          onView={setView}
        />
      </div>
      {/* The bands are the category's own copy, so they show on the unfiltered
          list only: someone who has picked a filter is shopping, not reading
          about the category. The FAQ below stays either way, since sizing, fit
          and care apply whatever is on screen. */}
      {!filtered && bands}
    </>
  );
}
