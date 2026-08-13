One-line: Heading — the shared level-to-tag primitive; `level` sets h1–h4 for the outline without changing the visual style.

```jsx
<Heading level={2} style={titleStyle}>Your Cart</Heading>
<Heading level={headingLevel} className="col-head">Shop &amp; Learn</Heading>
```

- Only the tag changes with `level` (1–4); styling comes from `style`/`className`.
- Every layout band/overlay uses it so pages can tune heading levels for SEO without restyling. Use `as` to force a specific tag.
