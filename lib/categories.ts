/* The four product categories, in the order they are shown.

   One list, because the same label and link were being written out in the shop
   filter pills, each category page's breadcrumb, the menu drawer and the footer.
   Four copies is how "Cocktail Dresses" quietly became "Cocktail Dress" in two
   of them.

   `handle` is the Shopify collection handle, which is also the route, so it ties
   a product to its category: a product's collections carry these handles, and
   that is what puts the category in a product breadcrumb (S-006). */

export type CategoryHandle =
  | "corset-tops"
  | "matching-sets"
  | "cocktail-dresses"
  | "beachwear";

export interface Category {
  /** Shopify collection handle, and the route slug. */
  handle: CategoryHandle;
  /** How the category is named in navigation and breadcrumbs. */
  label: string;
  /** Route for the category page. */
  href: string;
}

export const CATEGORIES: Category[] = [
  { handle: "corset-tops", label: "Corset Tops", href: "/corset-tops" },
  { handle: "matching-sets", label: "Matching Sets", href: "/matching-sets" },
  {
    handle: "cocktail-dresses",
    label: "Cocktail Dresses",
    href: "/cocktail-dresses",
  },
  { handle: "beachwear", label: "Beachwear", href: "/beachwear" },
];

/* The category one of a product's collections belongs to, or undefined when none
   of them is a category. A product sits in the all-products collection as well,
   and could sit in more than one category; the first match in display order
   wins, so the answer is stable. */
export function categoryFor(handles: string[]): Category | undefined {
  return CATEGORIES.find((category) => handles.includes(category.handle));
}

/* The category a screen names itself after. The handle is one of the four by
   type, so this always finds one and callers need no fallback. */
export function category(handle: CategoryHandle): Category {
  const found = CATEGORIES.find((entry) => entry.handle === handle);
  if (!found) throw new Error(`[categories] no category "${handle}"`);
  return found;
}

/* The four as navigation links, in display order. */
export function categoryLinks(): { label: string; href: string }[] {
  return CATEGORIES.map(({ label, href }) => ({ label, href }));
}
