One-line: HeroCarousel (C-HeroCarousel) — the Home hero band (F-008): a sliding peek carousel, one banner on mobile and two at 50% on tablet/desktop, in fixed portrait crops.

```jsx
<HeroCarousel slides={[
  { bg: "var(--sher-dark)" },
  { bg: "var(--sher-text)" },
  { image: "/hero-3.jpg", eyebrow: "Refined Sensuality", heading: "Made to Be Seen", cta: { label: "Shop", href: "/shop" } },
]} />
```

- 1-up below 768px, 2-up at/above; crops are 2:3 below 1024px and 4:5 at/above. All of it is CSS container queries on the band's own width — no props, no JS measurement.
- Each slide takes a solid `bg` token or an `image`; the text overlay (eyebrow/heading/cta) is optional and centers within its own banner.
- Auto-advances by one with wrap; arrows and dots page by one. For a single full-bleed crossfade hero, use **HeroStaging** instead.
