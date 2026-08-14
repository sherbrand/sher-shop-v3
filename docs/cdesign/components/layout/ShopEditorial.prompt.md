One-line: C-ShopEditorial — the Shop / category editorial band: a two-up editorial band (media beside eyebrow + heading + paragraph), mirrorable, stacking to one column on mobile.

```jsx
<ShopEditorial
  eyebrow="What is a Corset Top?"
  heading="Structured Boning That Commands the Silhouette"
  paragraph="A corset top is a fitted top built on corsetry…"
  media={<image-slot id="s7-what" placeholder="Corset top on a model" />} />

<ShopEditorial mirror eyebrow="How is SHER different?" heading="Each Bone Set by Hand" … >
  <Button as="a" href="/shop">Shop Corset Tops</Button>
</ShopEditorial>
```

- `mirror` puts the text left / media right at two-up; alternate it down a page for rhythm.
- `mobileFirst="text"` leads with the copy when stacked (media below); default `"media"`.
- For a full-bleed band with a body-face heading, use **C-EditorialStaging** instead.
- Media panel is a 4:5 portrait crop; pass `background` to tint the band. Children render as an actions row.
- Stacks to one column below 768px, media first. `headingLevel` sets the tag only.
- The band steps its own column gap and media crop by CSS container query on its own width — 24px gap + 4:3 crop on mobile, 24px + 1:1 at tablet, 64px + 5:4 at desktop. Pages need no CSS for this.
- Override a placement with the `gap` / `ratio` props, or set `--editorial-gap` in page CSS.
