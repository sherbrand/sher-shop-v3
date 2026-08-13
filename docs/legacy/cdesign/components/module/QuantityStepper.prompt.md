One-line: SHER commerce primitives — `QuantityStepper` (the − N + control) and `Price` (USD-formatted money in the brand serif).

```jsx
<QuantityStepper defaultValue={1} min={1} max={10} onChange={setQty} />
<QuantityStepper value={qty} onChange={setQty} size="sm" />  {/* cart line item */}

<Price amount={240} />
<Price amount={190} compareAt={240} size="lg" />
```

- QuantityStepper is controlled with `value` or uncontrolled with `defaultValue`; clamps to [min,max]; `size="sm"` for cart rows.
- Price formats via Intl in USD by default; `compareAt` renders a struck-through original.
