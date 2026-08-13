One-line: C-RelatedProducts — the "You May Also Like" band: heading, a subtitle pointing back to the category, a Back to Category button, and a small same-category grid.

```jsx
<RelatedProducts
  subtitle="More corset tops, all built on real corsetry."
  backLabel="Back to Corset Tops" backHref="/corset-tops"
  products={related} />
```

- Wraps C-ProductGrid with `showToolbar={false}`, so there's no count or density toggle — it's a related block, not a listing.
- The text column sits **beside** the grid at/above 768px per the PRD outline's `(text) | Product Grid`, and stacks above it when narrower. `columns` applies when stacked.
- The Back button renders only when both `backLabel` and `backHref` are set. Pass `children` to add more buttons to the same actions row. Heading defaults to "You May Also Like".
- `actionsLayout="stack"` gives each button its own row at matching full width (pass `fullWidth` on your own children too); `actionsMeasure` caps the row (default `34ch`) so the stacked buttons stay balanced and identical in width; `backVariant` sets the back button's fill — e.g. `backVariant="primary"` (dark) beside an `accent` second button.
