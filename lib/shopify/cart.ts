"use server";

// Cart Server Actions (D-003, F-004/F-005/F-006). The cart lives in Shopify;
// only its id is kept in an httpOnly cookie. The cart is created on the first
// add, not on page load. Every mutation revalidates the cart tag.

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { shopifyFetch } from "@/lib/shopify";
import {
  CART_QUERY,
  CART_CREATE,
  CART_LINES_ADD,
  CART_LINES_UPDATE,
  CART_LINES_REMOVE,
} from "@/lib/shopify/mutations/cart";
import type { Cart, CartLine, Image, Money, SelectedOption } from "@/lib/shopify/types";

const CART_COOKIE = "cartId";

// --- Raw cart shape from CartFields ---
type RawCartLine = {
  id: string;
  quantity: number;
  cost: { totalAmount: Money };
  merchandise: {
    id: string;
    title: string;
    price: Money;
    selectedOptions: SelectedOption[];
    product: { handle: string; title: string; featuredImage: Image | null };
  };
};
type RawCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: Money; totalAmount: Money };
  lines: { nodes: RawCartLine[] };
};

type MutationResult = { cart: RawCart | null; userErrors: Array<{ message: string }> };

function reshapeCart(c: RawCart): Cart {
  const lines: CartLine[] = c.lines.nodes.map((line) => ({
    id: line.id,
    quantity: line.quantity,
    lineTotal: line.cost.totalAmount,
    merchandise: {
      variantId: line.merchandise.id,
      variantTitle: line.merchandise.title,
      price: line.merchandise.price,
      selectedOptions: line.merchandise.selectedOptions,
      productHandle: line.merchandise.product.handle,
      productTitle: line.merchandise.product.title,
      image: line.merchandise.product.featuredImage,
    },
  }));
  return {
    id: c.id,
    checkoutUrl: c.checkoutUrl,
    totalQuantity: c.totalQuantity,
    subtotal: c.cost.subtotalAmount,
    total: c.cost.totalAmount,
    lines,
  };
}

function assertNoUserErrors(errors: Array<{ message: string }>): void {
  if (errors.length > 0) {
    throw new Error(`[cart] ${errors[0]?.message ?? "unknown error"}`);
  }
}

// Read the current cart from the cookie id. Null when there is no cart yet.
export async function getCart(): Promise<Cart | null> {
  const cartId = (await cookies()).get(CART_COOKIE)?.value;
  if (!cartId) return null;
  const data = await shopifyFetch<{ cart: RawCart | null }>({
    query: CART_QUERY,
    variables: { cartId },
    cache: "no-store",
  });
  return data.cart ? reshapeCart(data.cart) : null;
}

// Add a variant to the cart. Creates the cart (and sets the cookie) on the
// first add, or when the stored cart id has expired.
export async function addToCart(variantId: string, quantity = 1): Promise<Cart> {
  const store = await cookies();
  const cartId = store.get(CART_COOKIE)?.value;
  const lines = [{ merchandiseId: variantId, quantity }];
  let cart: RawCart | null = null;

  if (cartId) {
    const data = await shopifyFetch<{ cartLinesAdd: MutationResult }>({
      query: CART_LINES_ADD,
      variables: { cartId, lines },
      cache: "no-store",
    });
    assertNoUserErrors(data.cartLinesAdd.userErrors);
    cart = data.cartLinesAdd.cart;
  }

  if (!cart) {
    const data = await shopifyFetch<{ cartCreate: MutationResult }>({
      query: CART_CREATE,
      variables: { lines },
      cache: "no-store",
    });
    assertNoUserErrors(data.cartCreate.userErrors);
    cart = data.cartCreate.cart;
    if (cart) {
      store.set(CART_COOKIE, cart.id, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }
  }

  if (!cart) throw new Error("[cart] add failed: no cart returned");
  revalidateTag("cart");
  return reshapeCart(cart);
}

export async function updateCartLine(lineId: string, quantity: number): Promise<Cart> {
  const cartId = (await cookies()).get(CART_COOKIE)?.value;
  if (!cartId) throw new Error("[cart] no cart to update");
  const data = await shopifyFetch<{ cartLinesUpdate: MutationResult }>({
    query: CART_LINES_UPDATE,
    variables: { cartId, lines: [{ id: lineId, quantity }] },
    cache: "no-store",
  });
  assertNoUserErrors(data.cartLinesUpdate.userErrors);
  const cart = data.cartLinesUpdate.cart;
  if (!cart) throw new Error("[cart] update failed: no cart returned");
  revalidateTag("cart");
  return reshapeCart(cart);
}

export async function removeCartLine(lineId: string): Promise<Cart> {
  const cartId = (await cookies()).get(CART_COOKIE)?.value;
  if (!cartId) throw new Error("[cart] no cart to remove from");
  const data = await shopifyFetch<{ cartLinesRemove: MutationResult }>({
    query: CART_LINES_REMOVE,
    variables: { cartId, lineIds: [lineId] },
    cache: "no-store",
  });
  assertNoUserErrors(data.cartLinesRemove.userErrors);
  const cart = data.cartLinesRemove.cart;
  if (!cart) throw new Error("[cart] remove failed: no cart returned");
  revalidateTag("cart");
  return reshapeCart(cart);
}
