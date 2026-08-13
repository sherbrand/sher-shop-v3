One-line: C-ProductPanel — the product page's main band: media gallery beside the purchase column (name, price, attribute, size, quantity, buy buttons, drawer links).

```jsx
<ProductPanel
  breadcrumb={[{label:"Shop",href:"/shop"},{label:"Corset Tops",href:"/corset-tops"},{label:"Silk Lace Corset Top"}]}
  name="Silk Lace Corset Top" price={240} description="…"
  attributeLabel="Closure Type" attributeValue="Lace Closure"
  sizes={[{label:"XS"},{label:"S"},{label:"M",soldOut:true}]}
  size={size} onSize={setSize} quantity={qty} onQuantity={setQty}
  media={MEDIA} onAddToCart={openCart} onBuyNow={checkout}
  onSizeChart={openSizing} onShipping={openShipping} />
```

- Composes MediaGallery, SizeSelector, QuantityStepper, Price, Breadcrumb and Button — pass data, not markup.
- When **every** size is `soldOut` the Add to Cart / Buy Now pair is replaced by one Preorder link to `preorderHref` (default `/contact`), and the quantity stepper is hidden.
- Stacks to one column below 768px; type sizes and gaps step off the band's own width via container queries. Pass `stacked` to keep one column at every width.
- `onSizeChart` / `onShipping` are for opening C-Sizing and C-Shipping.
- `headingLevel` sets the product name's tag (default 1, tag only); `compareAt` shows a struck-through original price; `currency` is the ISO code (default "USD").
