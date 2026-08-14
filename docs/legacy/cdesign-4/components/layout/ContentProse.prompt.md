One-line: C-ContentProse — the stacked prose band for policy pages: a run of heading + paragraph blocks at a readable measure.

```jsx
<ContentProse items={[
  { heading: "Where Do You Ship?", paragraph: "We ship worldwide. Every order goes out from SHER's warehouse in Thailand." },
  { heading: "Returns & Exchanges", paragraph: "To start one, email us at hello@sherbrand.co with your order number." },
]} />
```

- Each item: `{ heading, paragraph }`. `paragraph` takes a string, or an array of strings to run several paragraphs under one heading (the outline notation allows this). Any email address in the copy is turned into a `mailto:` link automatically.
- Heading size (24/29/34), body size (14/16/18), and the gap between blocks all step off the band's own measured width — no page CSS needed.
- `measure` caps the paragraph line length (default `none`, so paragraphs fill `contentWidth`); `headingLevel` sets the heading tag only.
- `contentWidth` sets the centred column width (default `--container-prose`); `background` tints the band; `paddingTop` overrides the band's own top padding.
