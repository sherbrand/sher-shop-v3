"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactElement, ReactNode } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ViewToggle } from "@/components/ViewToggle";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";

/* C-ProductGrid — the results band of a shop / category page: a toolbar (result
   count + grid ViewToggle) over a responsive grid of ProductCards.
   Column counts come from ONE prop: `columns`, a "mobile/tablet/desktop" string
   passed to CSS as --cols-sm/-md/-lg and resolved by container queries on the
   grid's OWN width (tablet ≥640, desktop ≥1024), so it matches wherever it's
   placed. The toolbar's toggle reports via `onView`; the page decides which
   `columns` string to pass back for each state.
   While the toolbar is scrolled out of view a floating copy of the ViewToggle
   sticks to the bottom-left of the scrollport (`floatingToggle`, on by default).
   It uses position:sticky plus a capture-phase scroll listener, so it works in any
   scroll container without knowing about the page chrome. */

export interface GridProduct {
  id: string;
  title: string;
  price: number;
  compareAt?: number;
  soldOut?: boolean;
  href?: string;
  /** Media node layered into the card. */
  media?: ReactNode;
  /** Category eyebrow shown above the title (rendered when set). */
  category?: string;
}

export interface ProductGridProps {
  products?: GridProduct[];
  /** Columns as "mobile/tablet/desktop" — e.g. "1/1/2", "1/2/2", "2/2/3". Default "1/1/2". */
  columns?: string;
  /** Band heading above the grid. Omit for none. */
  heading?: string;
  /** HTML level (h1–h4) for the heading — changes the tag only, not the style. Default 2. */
  headingLevel?: HeadingLevel;
  /** Unit label after the count. Default "pieces". */
  label?: string;
  /** Override the count (defaults to products.length). */
  count?: number;
  /** Fires with the toolbar toggle's new state ("comfortable" | "compact"). */
  onView?: (key: string) => void;
  /** Show the count + view-toggle toolbar. Default true. */
  showToolbar?: boolean;
  /** Stick a floating copy of the ViewToggle to the scrollport bottom-left. Default true. */
  floatingToggle?: boolean;
  /** Show only this many products at first, revealing another `pageSize` per click. */
  pageSize?: number;
  /** Label for the load-more button. Default "Load More". */
  loadMoreLabel?: string;
  /** What closes the grid once every product is shown. Only applies when `pageSize` is set. */
  endMark?: "none" | "rule" | "mark" | "monogram";
  /** Message when products is empty. */
  emptyMessage?: string;
  className?: string;
}

// Stepped sizes, resolved against the band's own width.
const STEP_SECTION =
  "text-[length:var(--size-section-sm)] @min-[640px]:text-[length:var(--size-section-md)] @min-[1024px]:text-[length:var(--size-section-lg)]";
const STEP_BODY =
  "text-[length:var(--size-body-sm)] @min-[640px]:text-[length:var(--size-body-md)] @min-[1024px]:text-[length:var(--size-body-lg)]";
/* End-mark clearance steps at 820px, not 1024: the band caps at --container, so on
   the tablet frame it measures ~786 and on desktop ~836. It never reaches 1024. */
const END_MARK = "mt-[var(--space-8)] @min-[820px]:mt-[var(--space-9)]";

const triple = (value: string): [number, number, number] => {
  const parts = String(value ?? "")
    .split("/")
    .map((part) => parseInt(part, 10));
  const fallback = [1, 1, 2];
  return [0, 1, 2].map((i) =>
    Number.isFinite(parts[i]) ? parts[i] : fallback[i],
  ) as [number, number, number];
};

export function ProductGrid({
  products = [],
  columns = "1/1/2",
  heading,
  headingLevel = 2,
  label = "pieces",
  count,
  onView,
  showToolbar = true,
  floatingToggle = true,
  pageSize,
  loadMoreLabel = "Load More",
  endMark = "none",
  emptyMessage = "No pieces match this filter yet.",
  className = "",
}: ProductGridProps): ReactElement {
  const [toggle, setToggle] = useState("comfortable");
  const setView = (key: string): void => {
    setToggle(key);
    onView?.(key);
  };

  const rootRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [floatVisible, setFloatVisible] = useState(false);

  // Find the nearest scrolling ancestor so we can compare against ITS edges.
  const scrollportRect = useCallback((): { top: number; bottom: number } => {
    let el = rootRef.current?.parentElement ?? null;
    while (el && el !== document.body) {
      const overflow = getComputedStyle(el).overflowY;
      if (overflow === "auto" || overflow === "scroll") return el.getBoundingClientRect();
      el = el.parentElement;
    }
    return { top: 0, bottom: window.innerHeight };
  }, []);

  useEffect(() => {
    if (!floatingToggle || !showToolbar) return;

    const check = (): void => {
      const toolbar = toolbarRef.current;
      const root = rootRef.current;
      if (!toolbar || !root) return;
      const scrollport = scrollportRect();
      const scrolledPastToolbar = toolbar.getBoundingClientRect().bottom <= scrollport.top;
      // Hide it before it can park on (and overlap) the grid's last row.
      const gridStillInView = root.getBoundingClientRect().bottom > scrollport.bottom + 72;
      setFloatVisible(scrolledPastToolbar && gridStillInView);
    };

    // Capture phase catches scroll from ANY ancestor scroller (scroll doesn't bubble).
    document.addEventListener("scroll", check, true);
    window.addEventListener("resize", check);
    check();
    return () => {
      document.removeEventListener("scroll", check, true);
      window.removeEventListener("resize", check);
    };
  }, [floatingToggle, showToolbar, scrollportRect]);

  const [colSm, colMd, colLg] = triple(columns);
  const total = count ?? products.length;

  // Paged reveal: show `pageSize` at a time, growing by pageSize per click.
  const step = pageSize ?? 0;
  const [shown, setShown] = useState(step);
  useEffect(() => {
    setShown(step);
  }, [step, products.length]);
  const paged = pageSize ? products.slice(0, shown) : products;
  const remaining = pageSize ? Math.max(0, products.length - shown) : 0;

  return (
    <div
      ref={rootRef}
      className={`@container ${className}`}
      style={{ "--cols-sm": colSm, "--cols-md": colMd, "--cols-lg": colLg } as CSSProperties}
    >
      {heading && (
        <Heading
          level={headingLevel}
          className={`mx-0 mt-0 mb-[var(--space-6)] font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)] ${STEP_SECTION}`}
        >
          {heading}
        </Heading>
      )}

      {showToolbar && (
        <div
          ref={toolbarRef}
          className="mb-[var(--space-5)] flex items-center justify-between gap-[var(--space-4)] border-b border-[var(--border-default)] pb-[var(--space-4)]"
        >
          <span className="font-[family-name:var(--font-body)] text-[length:var(--size-xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-meta)]">
            {total} {label}
          </span>
          <ViewToggle value={toggle} onChange={setView} />
        </div>
      )}

      {products.length === 0 ? (
        <p className={`py-[var(--space-8)] text-center text-[var(--text-meta)] ${STEP_BODY}`}>
          {emptyMessage}
        </p>
      ) : (
        /* The row gap runs wider than the column gap so a card's name reads as
           belonging to the image above it, not the one below. */
        <div className="grid gap-x-[var(--space-4)] gap-y-[var(--space-7)] grid-cols-[repeat(var(--cols-sm,1),1fr)] @min-[640px]:grid-cols-[repeat(var(--cols-md,1),1fr)] @min-[1024px]:grid-cols-[repeat(var(--cols-lg,2),1fr)]">
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

      {pageSize && products.length > 0 ? (
        remaining > 0 ? (
          <div className="mt-[var(--space-8)] flex justify-center">
            <Button variant="primary" size="lg" onClick={() => setShown((s) => s + step)}>
              {loadMoreLabel}
            </Button>
          </div>
        ) : endMark !== "none" ? (
          <Divider variant={endMark} className={END_MARK} />
        ) : null
      ) : null}

      {floatingToggle && showToolbar && products.length > 0 && (
        <div className="sticky bottom-[var(--space-5)] z-[60] h-0">
          <div
            className={[
              "absolute bottom-0 left-0 border border-[var(--border-default)] bg-[var(--surface-page)]",
              "p-[var(--space-2)] rounded-[var(--radius-sm)] shadow-[var(--shadow-raised)]",
              "transition-[opacity,transform] duration-[var(--dur-med)] ease-[var(--ease-out)]",
              floatVisible
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none translate-y-[8px] opacity-0",
            ].join(" ")}
          >
            <ViewToggle value={toggle} onChange={setView} />
          </div>
        </div>
      )}
    </div>
  );
}
