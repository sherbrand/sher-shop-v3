One-line: SizeSelector — the product page's size chips; sold-out sizes disabled and struck, selected chip inverted.

```jsx
<SizeSelector sizes={[{label:"XS"},{label:"S"},{label:"M",soldOut:true},{label:"L"}]}
  value={size} onChange={setSize} />
```

- Each size: `{ label, soldOut? }`. Sold-out chips are `disabled`, struck through, and dimmed; clicking them does nothing.
- Controlled with `value`/`onChange`, or uncontrolled — uncontrolled defaults to the first in-stock size.
- 44px minimum hit area per chip. `label` renames the group heading (default "Size").
- `defaultValue` seeds the selection when uncontrolled; omit it and the first in-stock size is chosen.
