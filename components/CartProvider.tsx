"use client";

import type { ReactElement, ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Cart } from "@/components/C-Cart";
import type { CartItem } from "@/components/C-Cart";
import { Icon } from "@/components/Icon";
import type { Cart as CartData } from "@/lib/shopify/types";
import { getCart, addToCart, updateCartLine, removeCartLine } from "@/lib/shopify/cart";

/* Global cart state (build step B-007). Holds the Shopify cart + the drawer's
   open state, calls the B-002 cart Server Actions, and renders C-Cart. It draws
   no markup of its own beyond that drawer. The header reads the count and opens
   the drawer through this context; the product page adds items through it. */

type CartContextValue = {
  count: number;
  openCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  buyNow: (variantId: string, quantity?: number) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

function toItems(cart: CartData | null): CartItem[] {
  if (!cart) return [];
  return cart.lines.map((line) => ({
    id: line.id,
    name: line.merchandise.productTitle,
    options: line.merchandise.selectedOptions.map((o) => o.value).join(" / ") || undefined,
    price: Number(line.merchandise.price.amount),
    quantity: line.quantity,
    image: line.merchandise.image?.url,
  }));
}

export function CartProvider({ children }: { children: ReactNode }): ReactElement {
  const [cart, setCart] = useState<CartData | null>(null);
  const [open, setOpen] = useState(false);
  // A short user-visible error when a cart action fails (F-004 / F-005), shown
  // as a dismissible toast below. Cart actions never reject to the caller.
  const [error, setError] = useState<string | null>(null);

  // Hydrate the cart from the cart-id cookie on first mount.
  useEffect(() => {
    void getCart()
      .then(setCart)
      .catch(() => {});
  }, []);

  const addItem = useCallback(async (variantId: string, quantity = 1): Promise<void> => {
    try {
      const next = await addToCart(variantId, quantity);
      setCart(next);
      setError(null);
      setOpen(true); // opening the drawer after an add (F-004)
    } catch {
      setError("Sorry — we couldn't add that to your cart. Please try again.");
    }
  }, []);

  const buyNow = useCallback(async (variantId: string, quantity = 1): Promise<void> => {
    try {
      const next = await addToCart(variantId, quantity);
      setCart(next);
      setError(null);
      if (next.checkoutUrl) window.location.href = next.checkoutUrl; // straight to checkout (F-006)
    } catch {
      setError("Sorry — we couldn't start checkout. Please try again.");
    }
  }, []);

  const changeQty = useCallback(async (lineId: string, quantity: number): Promise<void> => {
    try {
      const next = quantity <= 0 ? await removeCartLine(lineId) : await updateCartLine(lineId, quantity);
      setCart(next);
      setError(null);
    } catch {
      setError("Sorry — we couldn't update your cart. Please try again.");
    }
  }, []);

  const remove = useCallback(async (lineId: string): Promise<void> => {
    try {
      setCart(await removeCartLine(lineId));
      setError(null);
    } catch {
      setError("Sorry — we couldn't remove that item. Please try again.");
    }
  }, []);

  const checkout = useCallback((): void => {
    if (cart?.checkoutUrl) window.location.href = cart.checkoutUrl;
  }, [cart]);

  const value: CartContextValue = {
    count: cart?.totalQuantity ?? 0,
    openCart: () => setOpen(true),
    addItem,
    buyNow,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <Cart
        open={open}
        onClose={() => setOpen(false)}
        items={toItems(cart)}
        currency={cart?.total.currencyCode ?? "USD"}
        onQuantityChange={changeQty}
        onRemove={remove}
        onCheckout={checkout}
      />
      {error && (
        <div
          role="alert"
          className="fixed bottom-[var(--space-5)] left-1/2 z-[calc(var(--z-drawer)+1)] flex max-w-[min(92vw,420px)] -translate-x-1/2 items-start gap-[var(--space-3)] border border-[var(--border-strong)] bg-[var(--surface-page)] px-[var(--space-4)] py-[var(--space-3)] shadow-[var(--shadow-drawer)] rounded-[var(--radius-sm)]"
        >
          <span className="font-[family-name:var(--font-body)] text-[length:var(--size-sm)] text-[var(--text-strong)]">
            {error}
          </span>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setError(null)}
            className="shrink-0 cursor-pointer border-none bg-transparent p-0 text-[var(--text-meta)]"
          >
            <Icon name="close" size={16} />
          </button>
        </div>
      )}
    </CartContext.Provider>
  );
}
