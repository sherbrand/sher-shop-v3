One-line: C-EditorialSplit — a two-up editorial band (media beside eyebrow + heading + paragraph), mirrorable, stacking to one column on mobile.

```jsx
<EditorialSplit
  eyebrow="What is a Corset Top?"
  heading="Structured Boning That Commands the Silhouette"
  paragraph="A corset top is a fitted top built on corsetry…"
  media={<image-slot id="s7-what" placeholder="Corset top on a model" />} />

<EditorialSplit mirror eyebrow="How is SHER different?" heading="Each Bone Set by Hand" … >
  <Button as="a" href="/shop">Shop Corset Tops</Button>
</EditorialSplit>
```

- `mirror` puts the text left / media right at two-up; alternate it down a page for rhythm.
- `mobileFirst="text"` leads with the copy when stacked (media below); default `"media"`. `mediaRounded` adds `radius.sm` to the media panel.
- For a full-bleed band with a body-face heading, use **C-EditorialStaging** instead.
- Media panel is a 4:5 portrait crop; pass `background` to tint the band. Children render as an actions row.
- Stacks to one column below 768px, media first. `headingLevel` sets the tag only.
- Column gap reads `--editorial-gap`, stepped by the band's own container queries. Set that custom property to override a placement. Legacy note: inline style wins.
