One-line: C-Transparent — the transparent hero header for Home only; non-sticky, scrolls away, oversized white square logo overflowing below the bar.

```jsx
<Transparent onMenu={openMenu} onCart={openCart} cartCount={2} />
<Transparent onMenu={openMenu} onCart={openCart} announcementTone="accent" />
```

- Use only over the Home hero; swap to <Sticky> after 60vh of scroll.
- White logo + white icons assume a dark/photographic hero behind it.
- `announcementTone` ("dark" | "light" | "accent") retones the embedded announcement bar.
- `logoHref` sets the oversized square logo's link target (default `/`).
- `cartIcon` picks the cart glyph — `"tote"` (default), `"bag"`, or `"trolley"`.
