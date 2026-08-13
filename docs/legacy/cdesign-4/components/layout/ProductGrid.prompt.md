One-line: C-ProductGrid — the shop / category results band: a count + ViewToggle toolbar over a responsive grid of ProductCards, with columns set by one `mobile/tablet/desktop` string.

```jsx
// shop page — the toggle reports state, the page picks the triple
<ProductGrid products={items} columns={view === "compact" ? "2/2/3" : "1/1/2"} onView={setView} />

// featured band — one fixed triple, no toolbar
<ProductGrid products={FEATURED} showToolbar={false} columns="1/2/2" />

<ProductGrid products={[]} emptyMessage="Nothing here yet." />
```

- Each product: `{ id, title, price, compareAt?, soldOut?, href?, media? }` — `media` layers a node (e.g. an `<image-slot>`) into the card.
- `columns` is `mobile/tablet/desktop` counts (e.g. `"1/2/2"` = 1 col mobile, 2 tablet, 2 desktop), resolved against the grid's own width (tablet ≥640px, desktop ≥1024px).
- The toolbar toggle is self-contained; it calls `onView` so the page can swap `columns`. Set `showToolbar={false}` to render just the grid. Empty list shows `emptyMessage`.
- Give each product a `category` to fill the card's eyebrow above the title.
- Once the toolbar scrolls out of view a floating copy of the ViewToggle sticks to the bottom-left of the scrollport; set `floatingToggle={false}` to disable. Requires `showToolbar`.
- `pageSize` shows that many products at first with a centered large `primary` "Load More" button below, revealing another `pageSize` per click; the button disappears at the end. Omit it to render everything. `loadMoreLabel` overrides the button copy.
- `endMark` closes the grid once everything is shown, where the button was: `"mark"` (a diamond knocked out of a tapered hairline), `"rule"` (a short centred hairline), `"monogram"` (the SHER mark between two outward-fading rules), or `"none"` (default). Needs `pageSize`.
- `label` renames the unit after the count (default "pieces").
- `heading` renders a band heading above the grid (S-001.4's "Featured Products"); `headingLevel` sets its tag only.
