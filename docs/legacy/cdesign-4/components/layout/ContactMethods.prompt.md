One-line: C-ContactMethods — the stacked contact band: one hairline row per method (social marks, mailto link, or address text), each under its own heading.

```jsx
<ContactMethods items={[
  { heading: "Direct Message - For the fastest response", kind: "social", links: [
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "TikTok", href: "#", icon: "tiktok" },
  ] },
  { heading: "Email - For business inquiries", kind: "email", value: "contact@sher.com" },
  { heading: "Warehouse Address - For product returns", kind: "address", value: "SHER Returns\n12 Example Road\nLondon" },
]} />
```

- `kind` picks the row's content: `social` (Icon brand marks), `email` (renders a mailto link), `address` (newlines preserved).
- `headingLevel` sets the row heading tag (h1–h4) only, not the style.
