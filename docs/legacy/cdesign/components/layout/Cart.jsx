import React from "react";
import { Heading } from "../module/Heading.jsx";
import { IconButton } from "../module/IconButton.jsx";
import { Button } from "../module/Button.jsx";
import { Icon } from "../module/Icon.jsx";
import { QuantityStepper } from "../module/QuantityStepper.jsx";
import { Price } from "../module/Price.jsx";

/* C-Cart — Cart Drawer (F-005 Cart Management, F-006 Checkout).
   Slides from the right. Line items (image, name, options, stepper, price, remove),
   a subtotal, and a Checkout handoff. Shows an empty state when there are no items. */


export function Cart({
  open = false,
  onClose,
  headingLevel = 2,
  items = [],
  currency = "USD",
  onQuantityChange,
  onRemove,
  onCheckout,
  className = "",
  style = {},
}) {
  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
  const empty = items.length === 0;

  return (
    <div aria-hidden={!open} style={{ position: "fixed", inset: 0, zIndex: "var(--z-drawer)",
      pointerEvents: open ? "auto" : "none" }}>
      <div onClick={onClose} style={{
        position: "absolute", inset: 0, background: "var(--scrim)",
        opacity: open ? 1 : 0, transition: "opacity var(--dur-med) var(--ease-out)",
      }} />
      <aside
        className={"sher-band " + className}
        aria-label="Your cart"
        style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: "min(92vw, 420px)",
          background: "var(--surface-page)", boxShadow: "var(--shadow-drawer)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform var(--dur-med) var(--ease-out)",
          display: "flex", flexDirection: "column", ...style,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "var(--space-5)", borderBottom: "1px solid var(--border-default)" }}>
          <Heading level={headingLevel} className="t-title" style={{
            margin: 0, fontFamily: "var(--font-display)", textTransform: "uppercase",
            letterSpacing: "var(--tracking-display)", 
            color: "var(--text-strong)", fontWeight: 400,
          }}>Your Cart</Heading>
          <IconButton label="Close cart" onClick={onClose}><Icon name="close" size={24} /></IconButton>
        </div>

        {empty ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: "var(--space-4)", padding: "var(--space-6)",
            textAlign: "center" }}>
            <Icon name="bag" size={40} style={{ color: "var(--text-muted)" }} />
            <p style={{ margin: 0, color: "var(--text-meta)" }}>Your cart is empty.</p>
            <Button variant="secondary" as="a" href="/shop" onClick={onClose}>Continue Shopping</Button>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: "auto", padding: "var(--space-5)",
            display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
            {items.map((it) => (
              <div key={it.id} style={{ display: "flex", gap: "var(--space-4)" }}>
                <div style={{ width: 72, height: 96, background: "var(--surface-raised)",
                  borderRadius: "var(--radius-sm)", overflow: "hidden", flexShrink: 0 }}>
                  {it.image && <img src={it.image} alt={it.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-3)" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)",
                      color: "var(--text-strong)" }}>{it.name}</span>
                    <IconButton label={`Remove ${it.name}`} size={28}
                      onClick={() => onRemove && onRemove(it.id)}>
                      <Icon name="trash" size={16} style={{ color: "var(--text-muted)" }} />
                    </IconButton>
                  </div>
                  {it.options && <span style={{ fontSize: "var(--text-sm)",
                    color: "var(--text-meta)", marginTop: 2 }}>{it.options}</span>}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                    marginTop: "auto", paddingTop: "var(--space-3)" }}>
                    <QuantityStepper size="sm" value={it.quantity}
                      onChange={(q) => onQuantityChange && onQuantityChange(it.id, q)} />
                    <Price amount={it.price * it.quantity} currency={currency} size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!empty && (
          <div style={{ borderTop: "1px solid var(--border-default)", padding: "var(--space-5)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline",
              marginBottom: "var(--space-4)" }}>
              <span style={{ fontFamily: "var(--font-nav)", textTransform: "uppercase",
                letterSpacing: "var(--tracking-display)", color: "var(--text-strong)" }}>Subtotal</span>
              <Price amount={subtotal} currency={currency} size="md" />
            </div>
            <Button variant="primary" fullWidth onClick={onCheckout}>Checkout</Button>
            <p style={{ margin: "var(--space-3) 0 0", textAlign: "center",
              fontSize: "var(--text-xs)", color: "var(--text-meta)", letterSpacing: "0.02em" }}>
              Checkout securely in USD, powered by Shopify
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
