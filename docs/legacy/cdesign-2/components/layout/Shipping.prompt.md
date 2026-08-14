One-line: C-Shipping — the right shipping & returns drawer opened from the product page; same content as the /shipping-returns page.

```jsx
<Shipping open={open} onClose={close} />
<Shipping open={open} onClose={close}>{customContent}</Shipping>
```

- Defaults to Shipping / Returns / Tailoring sections; pass sections=[{title,body}] or children to override.
- headingLevel sets the title tag; sub-section titles follow one level down.