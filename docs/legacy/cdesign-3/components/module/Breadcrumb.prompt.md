One-line: Breadcrumb — the page trail (Home › Shop); links every crumb but the current one.

```jsx
<Breadcrumb items={[{label:"Home",href:"/"},{label:"Shop"}]} />
```

- Last item is the current page (no link, ellipsis-trims when narrow). Pass `separator` to change the glyph.