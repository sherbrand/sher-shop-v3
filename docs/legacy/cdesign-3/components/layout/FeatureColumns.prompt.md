One-line: C-FeatureColumns — an eyebrow + heading over 2–3 media columns, each with its own subheading and paragraph; for the "pick your closure / set type / length" bands.

```jsx
<FeatureColumns
  eyebrow="Pick your Corset Closure Type"
  heading="Each Corset Closure Designed for a Different Priority"
  items={[
    { heading: "Lace Closure: Adjustable Fit", paragraph: "The Lace Closure laces up the back…", media: <image-slot id="s7-lace" /> },
    { heading: "Zip Closure: Effortless to Wear", paragraph: "The Zip Closure uses a separating zip…", media: <image-slot id="s7-zip" /> },
  ]} />
```

- 2 items → 1 col mobile, 2 from 640px. 3 items → 1 / 2 / 3 across mobile / 640 / 1024.
- Each item is `{ heading, paragraph, media }`; media fills a 4:5 portrait panel.
- `headingLevel` / `itemHeadingLevel` set tags only, not styles.
