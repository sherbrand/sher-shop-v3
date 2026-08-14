One-line: C-Sizing — the right size-chart drawer (F-007): a cm table and a derived inches table, showing only the measurements a product defines.

```jsx
<Sizing open={open} onClose={close} productName="Odile Lace Corset" chart={chart} />
```

- chart = { measures:[{key,label}], rows:[{size, cm:{key:val}}] }. Omit a measure on all rows and it drops from the table.
- Inches are derived from cm automatically. headingLevel sets the "Size Chart" tag only.