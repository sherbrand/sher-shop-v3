"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactElement, ReactNode } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ViewToggle } from "@/components/ViewToggle";
import { Button } from "@/components/Button";

/* C-ProductGrid — the results band of a shop / category page: a toolbar (result
   count + grid ViewToggle) over a responsive grid of ProductCards.

   Column counts come from ONE prop: `columns`, a "mobile/tablet/desktop" string
   passed to CSS as --cols-sm/-md/-lg and resolved by container queries on the
   grid's OWN width (tablet ≥640, desktop ≥1024), so it matches wherever it sits.
   While the toolbar is scrolled out of view a floating copy of the ViewToggle
   sticks to the bottom-left of the scrollport. That uses position:sticky plus a
   capture-phase scroll listener, so it works in any scroll container without
   knowing about the page chrome. */

export interface GridProduct {
  id: string;
  title: string;
  price: number;
  compareAt?: number;
  soldOut?: boolean;
  href?: string;
  /** Media node layered into the card (e.g. a next/image). */
  media?: ReactNode;
  /** Category eyebrow shown above the title. */
  category?: string;
}

export interface ProductGridProps {
  products?: GridProduct[];
  /** Columns as "mobile/tablet/desktop" — e.g. "1/1/2", "1/2/2", "2/2/3". Default "1/1/2". */
  columns?: string;
  /** Unit label after the count. Default "pieces". */
  label?: string;
  /** Override the count (defaults to products.length). */
  count?: number;
  /** Fires with the toolbar toggle's new state — the page decides which `columns` to pass back. */
  onView?: (key: string) => void;
  /** Show the count + view-toggle toolbar. Default true. */
  showToolbar?: boolean;
  /** Stick a floating copy of the ViewToggle to the scrollport once the toolbar scrolls away. Default true. */
  floatingToggle?: boolean;
  /** Show this many products at first, revealing another `pageSize` per "Load More" click. */
  pageSize?: number;
  /** Label for the load-more button. Default "Load More". */
  loadMoreLabel?: string;
  /** Message when products is empty. */
  emptyMessage?: string;
  className?: string;
}

const STEP_BODY =
  "text-[length:var(--text-body-sm)] @min-[640px]:text-[length:var(--text-body-md)] @min-[1024px]:text-[length:var(--text-body-lg)]";

/** Parse "mobile/tablet/desktop" into three column counts, filling gaps with 1/1/2. */
function triple(value: string): [number, number, number] {
  const parts = String(value ?? "").split("/").map((s) => parseInt(s, 10));
  const fallback = [1, 1, 2];
  const [sm, md, lg] = [0, 1, 2].map((i) =>
    Number.isFinite(parts[i]) ? parts[i] : fallback[i],
  );
  return [sm, md, lg];
}

export function ProductGrid({
  products = [],
  columns = "1/1/2",
  label = "pieces",
  count,
  onView,
  showToolbar = true,
  floatingToggle = true,
  pageSize,
  loadMoreLabel = "Load More",
  emptyMessage = "No pieces match this filter yet.",
  className = "",
}: ProductGridProps): ReactElement {
  const [view, setView] = useState("comfortable");
  const rootRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [floatVisible, setFloatVisible] = useState(false);

  const selectView = (key: string): void => {
    setView(key);
    onView?.(key);
  };

  useEffect(() => {
    if (!floatingToggle || !showToolbar) return;

    // find the nearest scrolling ancestor so we can compare against ITS edges
    const scrollportRect = (): { top: number; bottom: number } => {
      let el = rootRef.current?.parentElement ?? null;
      while (el && el !== document.body) {
        const overflow = getComputedStyle(el).overflowY;
        if (overflow === "auto" || overflow === "scroll") return el.getBoundingClientRect();
        el = el.parentElement;
      }
      return { top: 0, bottom: window.innerHeight };
    };

    const check = (): void => {
      const toolbar = toolbarRef.current;
      const root = rootRef.current;
      if (!toolbar || !root) return;
      const port = scrollportRect();
      const scrolledPastToolbar = toolbar.getBoundingClientRect().bottom <= port.top;
      // hide before it can park on (and overlap) the grid's last row
      const gridStillInView = root.getBoundingClientRect().bottom > port.bottom + 72;
      setFloatVisible(scrolledPastToolbar && gridStillInView);
    };

    // capture phase catches scroll from ANY ancestor scroller (scroll doesn't bubble)
    document.addEventListener("scroll", check, true);
    window.addEventListener("resize", check);
    check();
    return () => {
      document.removeEventListener("scroll", check, true);
      window.removeEventListener("resize", check);
    };
  }, [floatingToggle, showToolbar]);

  const [colSm, colMd, colLg] = triple(columns);
  const total = count ?? products.length;

  // paged reveal: show `pageSize` at a time, growing by pageSize per click
  const step = pageSize ?? 0;
  const [shown, setShown] = useState(step);
  useEffect(() => {
    setShown(step);
  }, [step, products.length]);

  const paged = step > 0 ? products.slice(0, shown) : products;
  const remaining = step > 0 ? Math.max(0, products.length - shown) : 0;

  return (
    <div
      ref={rootRef}
      className={`@container ${className}`}
      style={
        { "--cols-sm": colSm, "--cols-md": colMd, "--cols-lg": colLg } as CSSProperties
      }
    >
      {showToolbar && (
        <div
          ref={toolbarRef}
          className="mb-[var(--space-5)] flex items-center justify-between gap-[var(--space-4)] border-b border-[var(--border-default)] pb-[var(--space-4)]"
        >
          <span className="font-[family-name:var(--font-body)] text-[length:var(--text-xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-meta)]">
            {total} {label}
          </span>
          <ViewToggle value={view} onChange={selectView} />
        </div>
      )}

      {products.length === 0 ? (
        <p className={`py-[var(--space-8)] text-center text-[var(--text-meta)] ${STEP_BODY}`}>
          {emptyMessage}
        </p>
      ) : (
        <div className="grid gap-[var(--space-4)] grid-cols-[repeat(var(--cols-sm,1),minmax(0,1fr))] @min-[640px]:grid-cols-[repeat(var(--cols-md,1),minmax(0,1fr))] @min-[1024px]:grid-cols-[repeat(var(--cols-lg,2),minmax(0,1fr))]">
          {paged.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              compareAt={product.compareAt}
              soldOut={product.soldOut}
              href={product.href}
              media={product.media}
              category={product.category}
            />
          ))}
        </div>
      )}

      {remaining > 0 && (
        <div className="mt-[var(--space-8)] flex justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShown((current) => current + step)}
          >
            {loadMoreLabel}
          </Button>
        </div>
      )}

      {floatingToggle && showToolbar && products.length > 0 && (
        <div className="sticky bottom-[var(--space-5)] z-[60] h-0">
          <div
            className={`absolute bottom-0 left-0 border border-[var(--border-default)] bg-[var(--surface-page)] p-[var(--space-2)] rounded-[var(--radius-sm)] shadow-[var(--shadow-raised)] transition-[opacity,transform] duration-[var(--dur-med)] ease-[var(--ease-out)] ${
              floatVisible
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none translate-y-[8px] opacity-0"
            }`}
          >
            <ViewToggle value={view} onChange={selectView} />
          </div>
        </div>
      )}
    </div>
  );
}
