One-line: C-Sticky — the sticky header on every screen (and the Home takeover after 60vh); dark monogram mark centered.

```jsx
<Sticky onMenu={openMenu} onCart={openCart} cartCount={2} />
<Sticky showAnnouncement={false} onMenu={openMenu} onCart={openCart} />
```

- Solid page background with a hairline base; sticky to top.
- Set showAnnouncement={false} to drop the promo strip when it has scrolled past.
- `announcementTone` ("dark" | "light" | "accent") retones the embedded announcement bar, same as on C-Transparent.
- `logoHref` sets the centred mark's link target (default `/`).
- `cartIcon` picks the cart glyph — `"tote"` (default), `"bag"`, or `"trolley"`.
