"use client";

import type { ReactElement } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";
import { IconButton } from "@/components/IconButton";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { QuantityStepper } from "@/components/QuantityStepper";
import { Price } from "@/components/Price";

/* C-Cart — Cart Drawer.
   Slides from the right. Line items (image, name, options, stepper, price, remove),
   a subtotal, and a Checkout handoff. Shows an empty state when there are no items. */

export interface CartItem {
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
  headingLevel?: HeadingLevel;
  items?: CartItem[];
  currency?: string;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  onCheckout?: () => void;
  className?: string;
}

// Stepped title size, resolved against the drawer's own width.
const STEP_TITLE =
  "text-[length:var(--size-title-sm)] @min-[640px]:text-[length:var(--size-title-md)] @min-[1024px]:text-[length:var(--size-title-lg)]";
// Display heading treatment — face, case, tracking, leading, color.
const HEADING_FACE =
  "font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)]";

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
}: CartProps): ReactElement {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const empty = items.length === 0;

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[var(--z-drawer)] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-[var(--scrim)] transition-opacity duration-[var(--dur-med)] ease-[var(--ease-out)] ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        aria-label="Your cart"
        className={[
          "@container absolute bottom-0 right-0 top-0 flex w-[min(92vw,420px)] flex-col",
          "bg-[var(--surface-page)] shadow-[var(--shadow-drawer)]",
          "transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)]",
          open ? "translate-x-0" : "translate-x-full",
          className,
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-[var(--border-default)] p-[var(--space-5)]">
          <Heading level={headingLevel} className={`m-0 ${HEADING_FACE} ${STEP_TITLE}`}>
            Your Cart
          </Heading>
          <IconButton label="Close cart" onClick={onClose}>
            <Icon name="close" size={24} />
          </IconButton>
        </div>

        {empty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-[var(--space-4)] p-[var(--space-6)] text-center">
            <Icon name="bag" size={40} className="text-[var(--text-muted)]" />
            <p className="m-0 text-[var(--text-meta)]">Your cart is empty.</p>
            <Button variant="secondary" as="a" href="/shop" onClick={onClose}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-[var(--space-5)] overflow-y-auto p-[var(--space-5)]">
            {items.map((item) => (
              <div key={item.id} className="flex gap-[var(--space-4)]">
                <div className="h-[96px] w-[72px] shrink-0 overflow-hidden bg-[var(--surface-raised)] rounded-[var(--radius-sm)]">
                  {item.image && (
                    // eslint-disable-next-line @next/next/no-img-element -- cart thumb; the page may pass a CDN URL straight through
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex justify-between gap-[var(--space-3)]">
                    <span className="font-[family-name:var(--font-body)] text-[length:var(--size-base)] text-[var(--text-strong)]">
                      {item.name}
                    </span>
                    <IconButton
                      label={`Remove ${item.name}`}
                      size={28}
                      onClick={() => onRemove?.(item.id)}
                    >
                      <Icon name="trash" size={16} className="text-[var(--text-muted)]" />
                    </IconButton>
                  </div>
                  {item.options && (
                    <span className="mt-[2px] text-[length:var(--size-sm)] text-[var(--text-meta)]">
                      {item.options}
                    </span>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-[var(--space-3)]">
                    <QuantityStepper
                      size="sm"
                      value={item.quantity}
                      onChange={(quantity) => onQuantityChange?.(item.id, quantity)}
                    />
                    <Price amount={item.price * item.quantity} currency={currency} size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!empty && (
          <div className="border-t border-[var(--border-default)] p-[var(--space-5)]">
            <div className="mb-[var(--space-4)] flex items-baseline justify-between">
              <span className="font-[family-name:var(--font-nav)] uppercase tracking-[var(--tracking-display)] text-[var(--text-strong)]">
                Subtotal
              </span>
              <Price amount={subtotal} currency={currency} size="md" />
            </div>
            <Button variant="primary" fullWidth onClick={onCheckout}>
              Checkout
            </Button>
            <p className="m-0 mt-[var(--space-3)] text-center text-[length:var(--size-xs)] tracking-[var(--tracking-item)] text-[var(--text-meta)]">
              Checkout securely in USD, powered by Shopify
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
