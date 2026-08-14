One-line: SHER's button family — the CTA `Button`, the rounded `ButtonPill` (filters / category links), and the borderless `IconButton` for chrome.

```jsx
<Button variant="primary" size="md">Add to Cart</Button>
<Button variant="secondary">Buy Now</Button>
<Button variant="ghost" as="a" href="/shop">Shop All</Button>

<ButtonPill active>Lace Closure</ButtonPill>
<ButtonPill>Zip Closure</ButtonPill>

<IconButton label="Open menu"><Icon name="menu" size={24} /></IconButton>
```

- Button variants: primary (dark fill), accent (primary fill, dark text), secondary (outline), ghost (text). Sizes sm/md/lg; `fullWidth` for the cart checkout.
- ButtonPill toggles `active` to invert to dark — the selected filter.
- IconButton needs an `aria-label` via `label`; 44px hit area by default.
