"use client";

import { useState } from "react";
import type { ReactElement } from "react";
import { ProductGrid } from "@/components/C-ProductGrid";
import type { GridProduct } from "@/components/C-ProductGrid";

/* Client glue for the /shop grid (B-004, F-003). C-ProductGrid's view toggle
   reports "comfortable" | "compact" through onView; this maps that to the grid's
   column string so the toggle actually re-columns the grid. Kept in our own
   component so the design grid stays untouched. */

const COLUMNS: Record<string, string> = {
  comfortable: "1/1/2",
  compact: "2/2/3",
};

export function ShopGrid({ products }: { products: GridProduct[] }): ReactElement {
  const [view, setView] = useState("comfortable");
  return (
    <ProductGrid
      products={products}
      columns={COLUMNS[view] ?? COLUMNS.comfortable}
      pageSize={12}
      endMark="mark"
      onView={setView}
    />
  );
}
