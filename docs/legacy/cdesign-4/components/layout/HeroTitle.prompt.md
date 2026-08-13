One-line: C-HeroTitle — an editorial title band (eyebrow + heading + lead + optional buttons), centered or left-aligned; opens a page beneath the hero.

```jsx
<HeroTitle eyebrow="Refined Sensuality" heading="Modern Womenswear by SHER"
  headingLevel={1}
  description="Structured corsetry, shaped by hand — sensual without looking cheap, magnetic without trying." />

<HeroTitle align="start" heading="Modern Womenswear by SHER" description="…" measure="34ch">
  <Button as="a" href="/shop" variant="primary" size="lg">Shop the Collection</Button>
  <Button as="a" href="/about" variant="accent" size="lg">Read our Story</Button>
</HeroTitle>
```

- `headingLevel` sets the tag (h1–h4) only, not the style.
- Heading/lead sizes follow the page's stepped `--fs-display` / `--fs-body` when set, else the system's stepped tokens.
- `headingFont="body"` sets the heading in Cardo, title case, untracked — a softer voice than the default `"display"` (Cormorant, uppercase, tracked). `headingMeasure` caps the heading's line length (default `34ch`); `measure` caps the description's.
- `breadcrumb` renders a trail above the eyebrow (same shape as the Breadcrumb primitive's `items`); omit it for no trail.
- Pass buttons as children for the actions row; `align="start"` left-aligns everything.
- `background` (token or color) tints the band — e.g. `var(--surface-raised)` for a closing CTA band; defaults transparent.
- `tone="inverse"` renders the eyebrow, heading and description in white — pair it with a dark or `accent` `background` for a closing CTA band.
