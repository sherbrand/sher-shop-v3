One-line: CategoryGrid (C-CategoryGrid) — a full-bleed grid of category tiles (1 col mobile, 2 tablet+desktop), portrait 4:5 crops with alternating bottom-left / bottom-right labels.

```jsx
<CategoryGrid items={[
  { label: "View Corset Tops", href: "/corset-tops", media: <image-slot id="cat-corsets" /> },
  { label: "View Matching Sets", href: "/matching-sets", bg: "var(--sher-dark)" },
]} />
```

- Each item: `{ label, href, id?, image? | bg? | media? }` — `media` layers a node (e.g. an `<image-slot>`) behind the label; `image`/`bg` are shorthands.
- 1 column below 640px, 2 at/above (CSS container query on the grid's own width); labels alternate left/right unless `alternate={false}`.
- `headingLevel` sets the label tag (h1–h4) only, not the style; tile labels use the `section` type role, stepped by container query.
