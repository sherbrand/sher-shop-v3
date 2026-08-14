One-line: ViewToggle — F-003 grid density control; switches the product grid between fewer and more columns.

```jsx
<ViewToggle value={view} onChange={setView} />   // "comfortable" | "compact"
```

- Controlled with `value`/`onChange` or uncontrolled with `defaultValue`. Each option's glyph shows `barsMobile` bars, revealing up to `barsDesktop` at ≥1024px so it mirrors the grid's column count at every breakpoint.
- Pair with container queries so "comfortable" = 1/2 cols and "compact" = 2/3 cols across mobile/desktop.
- `options` overrides the two default densities (each `{ key, barsMobile, barsDesktop, label }`).
