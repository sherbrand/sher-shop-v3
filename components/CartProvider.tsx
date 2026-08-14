"use client";

import type { ReactElement, ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Cart } from "@/components/C-Cart";
import type { CartItem } from "@/components/C-Cart";
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

  // Hydrate the cart from the cart-id cookie on first mount.
  useEffect(() => {
    void getCart()
      .then(setCart)
      .catch(() => {});
  }, []);

  const addItem = useCallback(async (variantId: string, quantity = 1): Promise<void> => {
    const next = await addToCart(variantId, quantity);
    setCart(next);
    setOpen(true); // opening the drawer after an add (F-004)
  }, []);

  const buyNow = useCallback(async (variantId: string, quantity = 1): Promise<void> => {
    const next = await addToCart(variantId, quantity);
    setCart(next);
    if (next.checkoutUrl) window.location.href = next.checkoutUrl; // straight to checkout (F-006)
  }, []);

  const changeQty = useCallback(async (lineId: string, quantity: number): Promise<void> => {
    const next = quantity <= 0 ? await removeCartLine(lineId) : await updateCartLine(lineId, quantity);
    setCart(next);
  }, []);

  const remove = useCallback(async (lineId: string): Promise<void> => {
    setCart(await removeCartLine(lineId));
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
    </CartContext.Provider>
  );
}
