One-line: ProductCard — the product-grid unit (F-001): media over title + price; reused on Shop, category pages, and related blocks.

```jsx
<ProductCard title="Silk Lace Corset Top" price={240} href="/shop" src="/p1.jpg" />
<ProductCard title="Odile Corset" price={240} soldOut media={<image-slot id="p1" />} />
```

- Pass `media` (an <image-slot> or <img>) or `src`; with neither it shows a tonal placeholder labelled with the title.
- `soldOut` dims and badges the card. `compareAt` shows a struck-through original price.
- The card lays out as: media, then an optional `category` eyebrow + title on the left with the price right-aligned on the same row. This is the only arrangement.
