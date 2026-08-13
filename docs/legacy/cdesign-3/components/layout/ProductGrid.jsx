import React from "react";
import { ProductCard } from "../module/ProductCard.jsx";
import { ViewToggle } from "../module/ViewToggle.jsx";
import { Button } from "../module/Button.jsx";
import { Divider } from "../module/Divider.jsx";

/* ProductGrid — the results band of a shop / category page: a toolbar (result
   count + grid ViewToggle) over a responsive grid of ProductCards.
   Column counts come from ONE prop: `columns`, a "mobile/tablet/desktop" string
   passed to CSS as --cols-sm/-md/-lg and resolved by container queries on the
   grid's OWN width (tablet ≥640, desktop ≥1024), so it matches wherever it's
   placed. The toolbar's toggle reports via `onView`; the page decides which
   `columns` string to pass back for each state.
   While the toolbar is scrolled out of view a floating copy of the ViewToggle
   sticks to the bottom-left of the scrollport (`floatingToggle`, on by default).
   It uses position:sticky + a capture-phase scroll listener, so it works in any
   scroll container without knowing about the page chrome. */

const triple = (v) => {
  const parts = String(v ?? "").split("/").map((s) => parseInt(s, 10));
  const f = [1, 1, 2];
  return [0, 1, 2].map((i) => (Number.isFinite(parts[i]) ? parts[i] : f[i]));
};

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
  endMark = "none",
  emptyMessage = "No pieces match this filter yet.",
  className = "",
  style = {},
}) {
  const [toggle, setToggle] = React.useState("comfortable");
  const setV = (k) => { setToggle(k); onView && onView(k); };

  const ref = React.useRef(null);
  const toolbarRef = React.useRef(null);
  const [floatVisible, setFloatVisible] = React.useState(false);

  // find the nearest scrolling ancestor so we can compare against ITS edges
  const scrollportRect = () => {
    let el = ref.current && ref.current.parentElement;
    while (el && el !== document.body) {
      const o = getComputedStyle(el).overflowY;
      if (o === "auto" || o === "scroll") return el.getBoundingClientRect();
      el = el.parentElement;
    }
    return { top: 0, bottom: window.innerHeight };
  };

  React.useEffect(() => {
    if (!floatingToggle || !showToolbar) return;
    const check = () => {
      const tb = toolbarRef.current, root = ref.current;
      if (!tb || !root) return;
      const sp = scrollportRect();
      const scrolledPastToolbar = tb.getBoundingClientRect().bottom <= sp.top;
      // hide before it can park on (and overlap) the grid's last row
      const gridStillInView = root.getBoundingClientRect().bottom > sp.bottom + 72;
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

  const [cSm, cMd, cLg] = triple(columns);
  const n = count != null ? count : products.length;

  // paged reveal: show `pageSize` at a time, growing by pageSize per click
  const [shown, setShown] = React.useState(pageSize || 0);
  React.useEffect(() => { setShown(pageSize || 0); }, [pageSize, products.length]);
  const paged = pageSize ? products.slice(0, shown) : products;
  const remaining = pageSize ? Math.max(0, products.length - shown) : 0;

  return (
    <div ref={ref} className={"sher-band " + className}
      style={{ "--cols-sm": cSm, "--cols-md": cMd, "--cols-lg": cLg, ...style }}>
      {showToolbar && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "var(--space-4)", marginBottom: "var(--space-5)",
          borderBottom: "1px solid var(--border-default)", paddingBottom: "var(--space-4)",
        }} ref={toolbarRef}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-xs)",
            letterSpacing: "var(--tracking-label)", textTransform: "uppercase",
            color: "var(--text-meta)" }}>{n} {label}</span>
          <ViewToggle value={toggle} onChange={setV} />
        </div>
      )}
      {products.length === 0 ? (
        <p className="t-body" style={{ padding: "var(--space-8) 0", textAlign: "center",
          color: "var(--text-meta)" }}>{emptyMessage}</p>
      ) : (
        <div className="sher-productgrid">
          {paged.map((p) => (
            <ProductCard key={p.id} title={p.title} price={p.price} compareAt={p.compareAt}
              soldOut={p.soldOut} href={p.href} media={p.media}
              category={p.category} />
          ))}
        </div>
      )}
      {pageSize && products.length > 0 && (
        remaining > 0 ? (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--space-8)" }}>
            <Button variant="primary" size="lg" onClick={() => setShown((s) => s + pageSize)}>
              {loadMoreLabel}
            </Button>
          </div>
        ) : endMark !== "none" ? (
          <Divider variant={endMark} className="sher-endmark" />
        ) : null
      )}
      {floatingToggle && showToolbar && products.length > 0 && (
        <div style={{ position: "sticky", bottom: "var(--space-5)", height: 0, zIndex: 60 }}>
          <div style={{ position: "absolute", bottom: 0, left: 0,
            opacity: floatVisible ? 1 : 0,
            transform: floatVisible ? "translateY(0)" : "translateY(8px)",
            pointerEvents: floatVisible ? "auto" : "none",
            transition: "opacity var(--dur-med) var(--ease-out), transform var(--dur-med) var(--ease-out)",
            background: "var(--surface-page)", padding: "var(--space-2)",
            border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-sm)", boxShadow: "var(--shadow-raised)" }}>
            <ViewToggle value={toggle} onChange={setV} />
          </div>
        </div>
      )}
    </div>
  );
}
