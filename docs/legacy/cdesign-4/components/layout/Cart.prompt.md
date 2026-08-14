One-line: C-Cart — the right cart drawer (F-005/F-006): line items with steppers + remove, subtotal, Shopify checkout handoff, and an empty state.

```jsx
<Cart open={cartOpen} onClose={closeCart} items={items}
  onQuantityChange={setQty} onRemove={remove} onCheckout={checkout} />
```

- Pass [] (or nothing) for items to render the empty state.
- Each item: { id, name, options?, price, quantity, image? }. Subtotal is computed. headingLevel sets the "Your Cart" tag only.