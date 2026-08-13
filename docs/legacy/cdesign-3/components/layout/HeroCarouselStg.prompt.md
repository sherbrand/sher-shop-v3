One-line: HeroCarouselStg — the Home hero band (F-008): an auto-advancing full-bleed banner carousel with a text overlay, arrows, and dots.

```jsx
<HeroCarouselStg
  slides={[
    { image: "/hero-1.jpg", eyebrow: "Refined Sensuality", heading: "Made to Be Seen", cta: { label: "Shop Now", href: "/shop" } },
    { heading: "The Corset Top, Rewritten", cta: { label: "Corset Tops", href: "/corset-tops" } },
  ]}
  interval={6000}
/>
```

- Wrap it in a sized element and leave `height="fill"` so container queries can drive the band height; or pass a px number / CSS length.
- Slides with no `image` render a tonal dark panel; overlay text always sits on a scrim for AA contrast.
- `autoPlay={false}` holds the first slide; `interval` sets the crossfade delay in ms.
