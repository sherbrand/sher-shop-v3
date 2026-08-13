One-line: C-ShopTitle — the Shop / category page header band: breadcrumb + heading + optional description + optional filter pills, left-aligned.

```jsx
// Link pills (category nav)
<ShopTitle
  breadcrumb={[{ label: "Home", href: "/" }, { label: "Shop" }]}
  heading="Shop Modern Womenswear by SHER"
  description="Every SHER piece in one place — corset tops, matching sets, cocktail dresses."
  filters={[{ label: "All Products", href: "/shop", active: true }, { label: "Corset Tops", href: "/corset-tops" }]} />

// Button pills (in-page filtering)
<ShopTitle breadcrumb={crumbs} heading="Shop Corset Tops"
  filters={FILTERS} activeFilter={filter} onFilter={setFilter} />
```

- `headingLevel` sets the tag (h1–h4) only, not the style; heading follows the page's stepped `--fs-hero`.
- `align` is "center" (default) or "start" (left-aligned) — Main pages center it, Staging/category pages may left-align.
- Pills are links by default; pass `onFilter` to make them buttons for in-page filtering. Active state via per-item `active` or the `activeFilter` key.
- Distinct from **HeroTitle** (centered, eyebrow + actions) — use ShopTitle for breadcrumb + filter pages.
