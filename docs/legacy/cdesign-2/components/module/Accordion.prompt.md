One-line: Accordion — stacked disclosure rows for FAQ blocks; hairline rows, rotating chevron, one open at a time by default.

```jsx
<Accordion items={[
  { q: "How do I measure for a corset top?", a: "Measure your bust, waist, hip, and length…" },
  { q: "How should a corset top fit?", a: "It should feel firm but never painful…" },
]} />

<Accordion items={faqs} single={false} defaultOpen={0} headingLevel={3} />
```

- Each item is `{ q, a }`. Row labels render in the display face at `--fs-sub`; answers follow `--fs-body`.
- `single` (default true) closes the others on open; `defaultOpen` opens one on mount; `headingLevel` sets the label tag (h1–h4) only, not the style.
