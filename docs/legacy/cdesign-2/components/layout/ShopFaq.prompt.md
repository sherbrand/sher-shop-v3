One-line: C-ShopFaq — the FAQ band: a heading beside its accordion at two-up, stacking to one column on mobile.

```jsx
<ShopFaq items={FAQS} />
<ShopFaq heading="Common Questions" items={FAQS} align="start" defaultOpen={null} />
```

- Each item: `{ q, a }`. Wraps the Accordion primitive, so `single` and `defaultOpen` pass straight through.
- Heading size (24/29/34) and column gap (24 → 64px) step off the band's own measured width — no page CSS needed.
- `align="center"` (default) vertically centres the heading against the accordion at two-up; `"start"` pins it to the top. `headingLevel` sets the band heading's tag, `itemHeadingLevel` each question's.
