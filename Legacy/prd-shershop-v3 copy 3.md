> **This document defines version v3 of the product. Earlier versions hold what came before; the Active Items list shows everything in effect now. Page outline and structure live in the Planning TSV; styling lives in the design system file; brand voice lives in the brand doc. Do not add features, screens, or data the plan doesn't call for.**

---

# SHER — SHER Web Store Requirements Document

**Platform:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Shopify headless (Storefront API, hosted checkout, hosted customer accounts), deployed on Vercel
**Version:** v3

## 1. Main Goals
1. Launch the SHER store with a catalog people can browse: Home, Shop, and three category pages.
2. Let a shopper open a product, pick a size and color, and add it to the cart.
3. Let a shopper review the cart and check out through Shopify.
4. Publish the SEO info pages and the policy and contact pages the plan calls for.

## 2. User Stories
| ID | Story |
|---|---|
| US-001 | As a shopper, I want to enter the store from the home page so I can find what SHER sells. |
| US-002 | As a shopper, I want to see all products in one place so I can shop the full range. |
| US-003 | As a shopper, I want to filter a category by its attribute so I can narrow to what fits me. |
| US-004 | As a shopper, I want to view a product and pick my size and color so I can choose the right item. |
| US-005 | As a shopper, I want to add a product to my cart so I can buy it. |
| US-006 | As a shopper, I want to review my cart and change quantities so I can confirm my order. |
| US-007 | As a shopper, I want to check out securely so I can pay and complete my order. |
| US-008 | As a shopper, I want to see an empty-cart state so I know my cart is empty and how to start. |

## 3. Features
### F-001 — Product grid
- **What it does:** Shows products in a grid. 2 columns on mobile, 3 on desktop. A view toggle changes the count (1 or 2 on mobile, 2 or 3 on desktop).
- **When it appears:** Shop (/shop) and every category screen (/shop/corset-tops, /shop/matching-sets, /shop/cocktail-dresses).
- **If something goes wrong:** Show a skeleton while loading, then an error state with retry if products fail. Show an empty message if the collection has none.

### F-002 — Category attribute filter
- **What it does:** Filters the grid in place by the category's attribute. Corset tops by closure type. Matching sets by set type. Cocktail dresses by length. Button pills pick the value.
- **When it appears:** The three category screens (S-003, S-004, S-005).
- **If something goes wrong:** Show an empty state if a filter matches no products, and keep the pills so the shopper can clear it.

### F-003 — Product detail and variant selection
- **What it does:** Shows one product: media gallery, title, price, description, and type attribute. A thumbnail sets the main image. Picking a color jumps to that color's image. Size and color selectors pick the variant. Sold-out sizes and colors are disabled.
- **When it appears:** The product page (/products/[product-slug]).
- **If something goes wrong:** Show a not-found page if the product is missing. Show a placeholder for a missing image.

### F-004 — Add to cart
- **What it does:** Adds the chosen variant to the cart. Creates the cart on the first add and stores the cart ID in a cookie. Opens the cart drawer (C-Cart).
- **When it appears:** The "Add to Cart" button on the product page.
- **If something goes wrong:** Keep the cart unchanged and show an error if the add fails. Block the add if the variant is sold out.

### F-005 — Cart management
- **What it does:** Shows cart line items with image, name, options, a quantity stepper, price, and remove. Changing quantity or removing an item updates the cart and subtotal. Shows an empty state when the cart is empty.
- **When it appears:** The cart drawer (C-Cart), opened from the header cart icon or after add to cart.
- **If something goes wrong:** Keep the last good cart and show an error if an update fails.

### F-006 — Checkout
- **What it does:** Sends the shopper to Shopify's hosted checkout using the cart's checkoutUrl. "Buy Now" on the product page skips the cart and goes straight there. Checkout settles in USD.
- **When it appears:** The "Checkout" button in the cart drawer and the "Buy Now" button on the product page.
- **If something goes wrong:** Show an error and keep the cart if the checkout URL is missing.

### F-007 — Size chart drawer
- **What it does:** Shows the size chart for the product. Renders only the measurements that product defines. Reads cm measurements from a size-chart TSV and auto-calculates the inches table.
- **When it appears:** The "Size Chart" link on the product page opens C-Sizing.
- **If something goes wrong:** Hide the link if the product has no size-chart row.

### F-008 — Home content blocks
- **What it does:** Renders the Home hero carousel, category tiles, and featured products from Home content config. Each slot gives placement, image, overlay text, and link.
- **When it appears:** The Home screen (/).
- **If something goes wrong:** Skip a slot with no content. Show a placeholder for a missing image.

## 4. Data
| ID | Data Item | Source | Details |
|---|---|---|---|
| D-001 | Product | Shopify Storefront API | Title, description, price, images, color and size variants, availability, and type attribute (closure, set, or length). |
| D-002 | Collection | Shopify Storefront API | The shop and three category collections, plus which products belong to each. |
| D-003 | Cart | Shopify Storefront API + cart ID cookie | Line items, quantities, subtotal, and checkoutUrl. The cart ID lives in a cookie. |
| D-004 | Home content | Repo config file | Hero slides, category tiles, and featured product refs: slot, image, overlay text, and link. |
| D-005 | Size chart | Size-chart TSV in repo config | Per-style cm measurements used by the size chart. |
| D-006 | Page content | Content MD files in /docs/content/ | Copy for the info and policy pages and the category page intros. |
| D-007 | Site config | Repo config | Announcement bar text, social links, contact email, warehouse address, and footer links. |

## 5. Screens & Components

### S-001 — Home
- **What's on it:**
  - Refer to /docs/content/s-001_home.md
- **Feature:** F-008 Home content blocks
- **Behavior:**
  - The hero carousel slides.
  - Hero banners, category images, and featured products come from Home content config (D-004).
- **Components & Assets:**
  - (to be updated later)

### S-002 — Shop
- **What's on it:**
  - Refer to /docs/content/s-002_shop.md
- **Feature:** F-001 Product grid
- **Behavior:**
  - The view toggle sets the column count (1 or 2 on mobile, 2 or 3 on desktop).
- **Components & Assets:**
  - (to be updated later)

### S-003 — Shop Corset Tops
- **What's on it:**
  - Refer to /docs/content/s-003_shop-corset-tops.md
- **Feature:** F-001 Product grid, F-002 Category attribute filter
- **Behavior:**
  - In-place filter by closure type.
  - The view toggle sets the column count.
- **Components & Assets:**
  - (to be updated later)

### S-004 — Shop Matching Sets
- **What's on it:**
  - Refer to /docs/content/s-004_shop-matching-sets.md
- **Feature:** F-001 Product grid, F-002 Category attribute filter
- **Behavior:**
  - In-place filter by set type.
  - The view toggle sets the column count.
- **Components & Assets:**
  - (to be updated later)

### S-005 — Shop Cocktail Dresses
- **What's on it:**
  - Refer to /docs/content/s-005_shop-cocktail-dresses.md
- **Feature:** F-001 Product grid, F-002 Category attribute filter
- **Behavior:**
  - In-place filter by length.
  - The view toggle sets the column count.
- **Components & Assets:**
  - (to be updated later)

### S-006 — Product Detail
- **What's on it:**
  - Media gallery: thumbnail strip and main image.
  - Breadcrumb: Shop › Category › product.
  - Title, price, and description.
  - Color selector (image thumbnails per color) and size selector.
  - Quantity selector, "Add to Cart" button, and "Buy Now" button.
  - Type attribute: closure type for corsets, set type for matching sets, length for cocktail dresses.
  - A link that opens the Size Chart (C-Sizing) and a link that opens Shipping & Returns (C-Shipping).
  - "You May Also Like": a "Back to Category" button, a "More about Category" button, and a grid of 2 random products from the same category.
- **Feature:** F-003 Product detail and variant selection, F-004 Add to cart, F-006 Checkout
- **Behavior:**
  - A thumbnail sets the main image; a color jumps to its variant image.
  - The breadcrumb truncates the product name with an ellipsis on small screens; the full name stays in the markup.
  - "Add to Cart" opens C-Cart. "Buy Now" goes to Shopify checkout.
  - Sold-out sizes and colors are disabled. When every variant is sold out, the buy buttons swap to a Preorder link to /contact.
- **Components & Assets:**
  - (to be updated later)

### S-007 — Corset Tops
- **What's on it:**
  - Refer to /docs/content/s-007_corset-tops.md
- **Behavior:**
  - One FAQ item open at a time.
- **Components & Assets:**
  - (to be updated later)

### S-008 — Matching Sets
- **What's on it:**
  - Refer to /docs/content/s-008_matching-sets.md
- **Behavior:**
  - One FAQ item open at a time.
- **Components & Assets:**
  - (to be updated later)

### S-009 — Cocktail Dresses
- **What's on it:**
  - Refer to /docs/content/s-009_cocktail-dresses.md
- **Behavior:**
  - One FAQ item open at a time.
- **Components & Assets:**
  - (to be updated later)

### S-010 — About Us
- **What's on it:**
  - Refer to /docs/content/s-010_about-us.md
- **Behavior:**
  - Static content page. No interactive behavior.
- **Components & Assets:**
  - (to be updated later)

### S-011 — Contact
- **What's on it:**
  - Refer to /docs/content/s-011_contact.md
- **Behavior:**
  - The social messaging links, email, and address come from Site config (D-007).
- **Components & Assets:**
  - (to be updated later)

### S-012 — Shipping & Returns
- **What's on it:**
  - Refer to /docs/content/s-012_shipping-returns.md
- **Behavior:**
  - Static content page. No interactive behavior.
- **Components & Assets:**
  - (to be updated later)

### S-013 — Privacy Policy
- **What's on it:**
  - Refer to /docs/content/s-013_privacy-policy.md
- **Behavior:**
  - Static content page. No interactive behavior.
- **Components & Assets:**
  - (to be updated later)

### S-014 — Terms of Service
- **What's on it:**
  - Refer to /docs/content/s-014_terms-of-service.md
- **Behavior:**
  - Static content page. No interactive behavior.
- **Components & Assets:**
  - (to be updated later)

### C-Transparent — Transparent Header
- **What's on it:**
  - Announcement bar: "Delivers Worldwide. Free Global Shipping over $250".
  - Hamburger icon (opens C-Menu).
  - White square logo (to /, oversized, overflows below the header).
  - Cart icon (opens C-Cart).
- **Behavior:**
  - Home only. Transparent and non-sticky. Scrolls away with the page.

### C-Sticky — Sticky Header
- **What's on it:**
  - Announcement bar: "Delivers Worldwide. Free Global Shipping over $250".
  - Hamburger icon (opens C-Menu).
  - Dark symbol logo (to /).
  - Cart icon (opens C-Cart).
- **Behavior:**
  - Sticky on every screen. On Home it takes over after 60vh of scroll.

### C-Menu — Menu Drawer
- **What's on it:**
  - Dark symbol logo (to /).
  - "Shop Now" group: Corset Tops, Matching Sets, Cocktail Dress, Shop All.
  - Our Story, Contact Us, and Login/Account.
  - Links mapped in section 6.
- **Behavior:**
  - Opens from the hamburger icon.

### C-Cart — Cart Drawer
- **What's on it:**
  - "Your Cart".
  - Line items: image, name, options, quantity stepper, price, and remove.
  - Subtotal.
  - "Checkout" button and "Checkout securely in USD, powered by Shopify".
- **Feature:** F-005 Cart management, F-006 Checkout
- **Behavior:**
  - Changing quantity or removing an item updates the cart and subtotal.
  - Checkout opens Shopify's hosted checkout.
  - Shows an empty state when the cart is empty.

### C-Footer — Footer
- **What's on it:**
  - "Shop & Learn": Corset Tops, Matching Sets, Cocktail Dress, Shop All.
  - "More Information": Our Story, Contact, Shipping & Returns.
  - "Connect with Us": Instagram, Facebook, TikTok.
  - "© SHER {year}", Privacy Policy, and Terms of Service.
  - Links mapped in section 6.

### C-Sizing — Size Chart Drawer
- **What's on it:**
  - "Size Chart" and the product name.
  - A note: the guide is measurements-based and varies by style, each piece can be tailored, reach out if unsure.
  - Measurements in cm and measurements in inches.
- **Feature:** F-007 Size chart drawer
- **Behavior:**
  - Renders only the measurements a product defines; an omitted one (e.g., no Hip on a corset top) is left out of the table.
  - The inches table is auto-calculated from the cm measurements.
  - The cm measurements come from the size-chart TSV (D-005).

### C-Shipping — Shipping & Returns Drawer
- **What's on it:**
  - Refer to /docs/content/s-012_shipping-returns.md
- **Behavior:**
  - Opens from the product page. Shows the same content as /shipping-returns.

## 6. Navigation

```
Header — every screen
 ├── Hamburger → opens C-Menu
 ├── Logo → S-001 (/)
 └── Cart → opens C-Cart

Menu Drawer (C-Menu)
 ├── Logo → S-001 (/)
 ├── Shop Now
 │    ├── Corset Tops → S-007 (/corset-tops)
 │    ├── Matching Sets → S-008 (/matching-sets)
 │    ├── Cocktail Dress → S-009 (/cocktail-dresses)
 │    └── Shop All → S-002 (/shop)
 ├── Our Story → S-010 (/about)
 ├── Contact Us → S-011 (/contact)
 └── Login/Account → Shopify hosted account

Footer (C-Footer) — every screen
 ├── Shop & Learn
 │    ├── Corset Tops → S-007 (/corset-tops)
 │    ├── Matching Sets → S-008 (/matching-sets)
 │    ├── Cocktail Dress → S-009 (/cocktail-dresses)
 │    └── Shop All → S-002 (/shop)
 ├── More Information
 │    ├── Our Story → S-010 (/about)
 │    ├── Contact → S-011 (/contact)
 │    └── Shipping & Returns → S-012 (/shipping-returns)
 ├── Connect with Us
 │    ├── Instagram → external
 │    ├── Facebook → external
 │    └── TikTok → external
 └── Bottom bar
      ├── Privacy Policy → S-013 (/privacy-policy)
      └── Terms of Service → S-014 (/terms-of-service)
```

## 7. Build Steps
### Phase 1 — Foundation
| Step | What to Build | References |
|---|---|---|
| B-001 | Set up the Next.js 15 App Router project (TypeScript strict, Tailwind) and Vercel deploy so the build stays shippable. | Stack |
| B-002 | Build the Shopify data layer: the single shopifyFetch wrapper, plus product, collection, and cart queries and mutations. | D-001, D-002, D-003 |
| B-003 | Build the global chrome: C-Transparent, C-Sticky, C-Menu, C-Footer, and the navigation. | C-Transparent, C-Sticky, C-Menu, C-Footer, D-007, Section 6 |

### Phase 2 — Browse
| Step | What to Build | References |
|---|---|---|
| B-004 | Build the product grid and the listing screens (Shop and three categories). | F-001, D-001, D-002, S-002, S-003, S-004, S-005 |
| B-005 | Add the in-place category attribute filter. | F-002, S-003, S-004, S-005 |
| B-006 | Build the Home screen from Home content config. | F-008, D-004, S-001 |

### Phase 3 — Product and Cart
| Step | What to Build | References |
|---|---|---|
| B-007 | Build the product detail page with the media gallery and variant selection. | F-003, D-001, S-006 |
| B-008 | Build the size chart drawer from the size-chart TSV. | F-007, D-005, C-Sizing |
| B-009 | Build add to cart, the cart drawer, and the checkout handoff. | F-004, F-005, F-006, D-003, C-Cart |

### Phase 4 — Content
| Step | What to Build | References |
|---|---|---|
| B-010 | Build the info and policy pages and the shipping drawer. | D-006, S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-014, C-Shipping |

### Phase 5 — Launch Gate
| Step | What to Build | References |
|---|---|---|
| B-011 | Add SEO metadata and JSON-LD Product structured data across the store. | Section 8 |
| B-012 | Run the launch-readiness gate: performance, accessibility, and QA. | Section 8 |

## 8. Extra Details
### Connectivity
- The store needs the network to reach the Shopify Storefront API for products, collections, cart, and checkout. Without it, product data and the cart do not work. Static content pages can be pre-rendered and cached.

### Storage
- Client: the cart ID in a cookie; view-toggle and filter state in the URL or local UI state.
- Server / Shopify: products, collections, cart, and orders.

### Accessibility
- Every screen meets WCAG 2.1 AA.

### Performance
- Every screen meets a Lighthouse score of 90 or higher. Use next/image for all images and Suspense skeletons for async sections.

### Security & Privacy
- The Storefront access token stays server-side only. No secrets ship in client bundles.
- Payment, checkout, and customer accounts are delegated to Shopify; the store does not handle card data.

### Integrations / External Services
- Shopify Storefront API (products, collections, cart).
- Shopify hosted checkout.
- Shopify hosted customer accounts.
- Vercel (hosting and deploy).
- Instagram, Facebook, and TikTok as outbound links only.

### Environment / Config
- SHOPIFY_STORE_DOMAIN — the Storefront API endpoint host.
- SHOPIFY_STOREFRONT_ACCESS_TOKEN — the Storefront API token (server-side only).

### Active Items
| ID | Name | Status |
|---|---|---|
| US-001 | Enter store from home | Active |
| US-002 | Shop all products | Active |
| US-003 | Filter a category | Active |
| US-004 | View product and pick variant | Active |
| US-005 | Add to cart | Active |
| US-006 | Review cart | Active |
| US-007 | Check out | Active |
| US-008 | Empty-cart state | Active |
| F-001 | Product grid | Active |
| F-002 | Category attribute filter | Active |
| F-003 | Product detail and variant selection | Active |
| F-004 | Add to cart | Active |
| F-005 | Cart management | Active |
| F-006 | Checkout | Active |
| F-007 | Size chart drawer | Active |
| F-008 | Home content blocks | Active |
| D-001 | Product | Active |
| D-002 | Collection | Active |
| D-003 | Cart | Active |
| D-004 | Home content | Active |
| D-005 | Size chart | Active |
| D-006 | Page content | Active |
| D-007 | Site config | Active |
