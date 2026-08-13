"use client";

import type { ReactElement, CSSProperties } from "react";
import { Heading } from "@/components/Heading";
import { IconButton } from "@/components/IconButton";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { QuantityStepper } from "@/components/QuantityStepper";
import { Price } from "@/components/Price";

/* C-Cart — Cart Drawer.
   Slides from the right. Line items (image, name, options, stepper, price, remove),
   a subtotal, and a Checkout handoff. Shows an empty state when there are no items. */

interface CartItem {
  id: string;
  name: string;
  options?: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartProps {
  open?: boolean;
  onClose?: () => void;
  /** HTML level (h1–h4) for the "Your Cart" heading — tag only, not style. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4;
  items?: CartItem[];
  currency?: string;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  onCheckout?: () => void;
  className?: string;
  style?: CSSProperties;
}

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
  style,
}: CartProps): ReactElement {
  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
  const empty = items.length === 0;

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[var(--z-drawer)] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[var(--scrim)] transition-opacity duration-[var(--dur-med)] ease-[var(--ease-out)]"
        style={{ opacity: open ? 1 : 0 }}
      />
      <aside
        aria-label="Your cart"
        className={`absolute bottom-0 right-0 top-0 flex w-[min(92vw,420px)] flex-col bg-[var(--surface-page)] shadow-[var(--shadow-drawer)] transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)] ${
          open ? "translate-x-0" : "translate-x-full"
        } ${className}`}
        style={style}
      >
        <div className="flex items-center justify-between border-b border-[var(--border-default)] p-[var(--space-5)]">
          <Heading
            level={headingLevel}
            className="m-0 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] font-normal uppercase tracking-[var(--tracking-display)] text-[var(--text-strong)]"
          >
            Your Cart
          </Heading>
          <IconButton label="Close cart" onClick={onClose}>
            <Icon name="close" size={24} />
          </IconButton>
        </div>

        {empty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-[var(--space-4)] p-[var(--space-6)] text-center">
            <Icon name="bag" size={40} className="text-[var(--text-muted)]" />
            <p className="m-0 text-[var(--text-muted)]">Your cart is empty.</p>
            <Button variant="secondary" as="a" href="/shop" onClick={onClose}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-[var(--space-5)] overflow-y-auto p-[var(--space-5)]">
            {items.map((it) => (
              <div key={it.id} className="flex gap-[var(--space-4)]">
                <div className="h-[96px] w-[72px] shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-[var(--surface-raised)]">
                  {it.image && (
                    // eslint-disable-next-line @next/next/no-img-element -- pass a next/image via item mapping at the page level
                    <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex justify-between gap-[var(--space-3)]">
                    <span className="font-[family-name:var(--font-body)] text-[length:var(--text-base)] text-[var(--text-strong)]">
                      {it.name}
                    </span>
                    <IconButton label={`Remove ${it.name}`} size={28} onClick={() => onRemove?.(it.id)}>
                      <Icon name="trash" size={16} className="text-[var(--text-muted)]" />
                    </IconButton>
                  </div>
                  {it.options && (
                    <span className="mt-[2px] text-[length:var(--text-sm)] text-[var(--text-muted)]">{it.options}</span>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-[var(--space-3)]">
                    <QuantityStepper
                      size="sm"
                      value={it.quantity}
                      onChange={(q) => onQuantityChange?.(it.id, q)}
                    />
                    <Price amount={it.price * it.quantity} currency={currency} size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!empty && (
          <div className="border-t border-[var(--border-default)] p-[var(--space-5)]">
            <div className="mb-[var(--space-4)] flex items-baseline justify-between">
              <span className="font-[family-name:var(--font-nav)] uppercase tracking-[var(--tracking-2)] text-[var(--text-strong)]">
                Subtotal
              </span>
              <Price amount={subtotal} currency={currency} size="md" />
            </div>
            <Button variant="primary" fullWidth onClick={onCheckout}>
              Checkout
            </Button>
            <p className="mt-[var(--space-3)] text-center text-[length:var(--text-xs)] tracking-[0.02em] text-[var(--text-muted)]">
              Checkout securely in USD, powered by Shopify
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
