> **This document defines version v3 of the product. Earlier versions hold what came before; the Active Items list shows everything in effect now. Page outline and structure live in the Planning TSV; styling lives in the design system file; brand voice lives in the brand doc. Do not add features, screens, or data the plan doesn't call for.**

---

# SHER — SherShop Requirements Document

**Platform:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Shopify headless (Storefront API, hosted checkout, hosted customer accounts), deployed on Vercel.
**Version:** v3

## 1. Main Goals
1. Launch a store people can shop: browse the range, open a product, pick a size, add to cart, and check out through Shopify.
2. Win the category head terms with information-first pillar pages for corset tops, matching sets, and cocktail dresses.
3. Ship the full site chrome, the commerce browse and product pages, and the required content and policy pages.

## 2. User Stories
| ID | Story |
|---|---|
| US-001 | As a customer, I want to land on a home page that shows featured pieces and categories so I can start where I like. |
| US-002 | As a customer, I want to browse every product in one place so I can see the whole range. |
| US-003 | As a customer, I want to browse one category on its own so I can focus on one type. |
| US-004 | As a customer, I want to filter a category by its key attribute so I can narrow to what fits me. |
| US-005 | As a customer, I want to see a product's photos, price, and sizes so I can decide to buy. |
| US-006 | As a customer, I want to add a product to my cart so I can keep shopping before I pay. |
| US-007 | As a customer, I want to review my cart and change amounts or remove items so I can confirm my order. |
| US-008 | As a customer, I want to check out securely so I can pay for my order. |
| US-009 | As a customer, when my cart is empty, I want a clear empty state so I know to keep shopping. |
| US-010 | As a customer, I want the size chart in cm or inches so I can measure before I buy. |

## 3. Features
### F-001 — Product Grid
- **What it does:** Shows a grid of products pulled from a Shopify collection. Reused on the All Products page, the three category pages, and the "You May Also Like" block. Each card uses the product's chosen grid thumbnail from D-005 Product Data, and falls back to the product's first image. Hovering a card on desktop, or holding a finger on it on tablet and mobile, swaps the thumbnail to the next image in the product's media order, skipping the video. It goes back when the pointer leaves or the finger lifts. Use mouseenter and mouseleave on desktop, and touchstart and touchend on tablet and mobile. A product with no next image does not swap. On the listing screens the grid renders every product in the collection in one server-side fetch, shows 12, and a Load More button reveals the next 12. Load More keeps any active filter and column choice. A divider sits under the grid when nothing is left.
- **When it appears:** On the product-listing screens (S-002, S-003, S-004, S-005) and the related block on S-006. Load More appears only on the listing screens, and only when the collection holds more than 12 products.
- **If something goes wrong:** If products fail to load, show a skeleton, then an error or retry state, not a blank grid. An empty collection shows a short "nothing here yet" note. A collection over 250 products exceeds one Storefront API fetch; cap the query at 250 and log it.

### F-002 — Attribute Filter
- **What it does:** Filters the category grid in place by one type attribute — closure type (corset tops), set type (matching sets), or length (cocktail dresses). No page reload.
- **When it appears:** On the three category pages (S-003, S-004, S-005), above the grid, as Button Pills.
- **If something goes wrong:** If a filter matches no products, show a short empty message and keep the pills so the customer can clear it.

### F-003 — Grid View Toggle
- **What it does:** Lets the customer switch grid columns: 1 or 2 on mobile, 2 or 3 on desktop.
- **When it appears:** On the All Products and category pages (S-002, S-003, S-004, S-005), next to the grid.
- **If something goes wrong:** If no choice is set, fall back to the default (1 on mobile, 2 on desktop).

### F-004 — Add to Cart
- **What it does:** Adds the chosen variant to the Shopify cart and opens the cart drawer. Creates the cart on the first add and stores the cart ID in a cookie.
- **When it appears:** On the Product Detail page (S-006), from the Add to Cart button.
- **If something goes wrong:** If the add fails, keep the customer on the page and show a short error. Block the add if the variant is sold out.

### F-005 — Cart Management
- **What it does:** Shows cart line items (image, name, options, quantity stepper, price, remove), updates the cart and subtotal when a quantity changes or an item is removed, and shows an empty state when the cart is empty.
- **When it appears:** In the cart drawer (C-Cart), opened from the header cart icon or after add to cart.
- **If something goes wrong:** If an update fails, keep the last good cart and show a short error.

### F-006 — Checkout
- **What it does:** Sends the customer to Shopify hosted checkout using the cart's checkout URL. Buy Now on the product page skips the cart and goes straight there. Checkout settles in USD.
- **When it appears:** From the Checkout button in the cart drawer (C-Cart) and the Buy Now button on the product page (S-006).
- **If something goes wrong:** If the checkout URL is missing, show an error and keep the cart.

### F-007 — Size Chart
- **What it does:** Renders a product's size chart from the D-005 Product Data TSV. Shows only the measurements the product defines and works out the inches table from the cm values.
- **When it appears:** In the size chart drawer (C-Sizing), opened from the product page.
- **If something goes wrong:** If a product has no chart data, hide the size-guide link.

### F-008 — Home Content
- **What it does:** Renders the Home hero carousel, the category tiles, and the featured products. Hero banners and category tiles come from D-004 Home content, each slot giving placement, image, alt text, overlay text, and link. Featured products are curated by handle: D-004 names the slot and the handle, and the name, price, and image come from D-001. The hero slides.
- **When it appears:** On the Home page (S-001).
- **If something goes wrong:** If content is missing, show the first hero banner only and leave any empty slot out.

### F-009 — Structured Data
- **What it does:** Adds JSON-LD in a script tag in the page's Server Component. Product data on each product page: name, description, image, price, currency, and availability. BreadcrumbList data matching the visible trail.
- **When it appears:** Product data on the product page (S-006). BreadcrumbList wherever a page's outline carries a Breadcrumb, in the server-rendered markup.
- **If something goes wrong:** If a field is missing, skip that field but still render the page.

## 4. Data
| ID | Data Item | Source | Details |
|---|---|---|---|
| D-001 | Product | Shopify Storefront API | Title, slug, description, price, images, size variants, availability, and the type attribute (closure, set type, or length), stored as a Shopify product metafield exposed to the Storefront API. |
| D-002 | Collection | Shopify Storefront API | The all-products and three category collections, plus which products belong to each. Powers the All Products and category grids. |
| D-003 | Cart | Shopify Storefront API + cart ID cookie | Line items, quantities, subtotal, and checkout URL. The cart ID lives in a cookie. |
| D-004 | Home Content | `/docs/content/home.tsv` in the repo | Hero banners and category tiles, each slot giving placement, image, alt text, overlay text, and link. Featured products as slot placement and product handle only; the name, price, and image come from D-001. |
| D-005 | Product Data | `/docs/content/products.tsv` in the repo | Per-product data not in Shopify. One row per product, keyed by slug. Columns: the grid thumbnail choice (which image to show), and the cm measurements as one column per size (`bust_S`, `bust_M`, …). A product fills only the measurements it uses; the rest stay blank. Inches are worked out from the cm values. |

## 5. Screens

### S-001 — Home
- **Outline:** Refer to /docs/content/s-001_home.md
- **Feature:** F-008 Home Content
- **Behavior:**
  - The hero carousel slides through its banners.
  - The hero banners, category tiles, and featured products (product name, URL, image) come from D-004 Home content.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-002 — All Products
- **Outline:** Refer to /docs/content/s-002_all-products.md
- **Feature:** F-001 Product Grid, F-003 Grid View Toggle, F-009 Structured Data
- **Behavior:**
  - The button pills link to the three category pages.
  - The view toggle sets 1 or 2 columns on mobile and 2 or 3 on desktop.
  - The view toggle sticks to the bottom-left once it scrolls out of view.
  - Load More reveals the next 12 products, keeping any active filter and column choice.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-003 — Corset Tops
- **Outline:** Refer to /docs/content/s-003_corset-tops.md
- **Feature:** F-001 Product Grid, F-002 Attribute Filter, F-003 Grid View Toggle, F-009 Structured Data
- **Behavior:**
  - The filter narrows the grid in place by closure type.
  - The view toggle sets 1 or 2 columns on mobile and 2 or 3 on desktop.
  - The view toggle sticks to the bottom-left once it scrolls out of view.
  - Load More reveals the next 12 products, keeping the active filter and column choice.
  - The FAQ accordion keeps one item open at a time.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-004 — Matching Sets
- **Outline:** Refer to /docs/content/s-004_matching-sets.md
- **Feature:** F-001 Product Grid, F-002 Attribute Filter, F-003 Grid View Toggle, F-009 Structured Data
- **Behavior:**
  - The filter narrows the grid in place by set type.
  - The view toggle sets 1 or 2 columns on mobile and 2 or 3 on desktop.
  - The view toggle sticks to the bottom-left once it scrolls out of view.
  - Load More reveals the next 12 products, keeping the active filter and column choice.
  - The FAQ accordion keeps one item open at a time.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-005 — Cocktail Dresses
- **Outline:** Refer to /docs/content/s-005_cocktail-dresses.md
- **Feature:** F-001 Product Grid, F-002 Attribute Filter, F-003 Grid View Toggle, F-009 Structured Data
- **Behavior:**
  - The filter narrows the grid in place by length.
  - The view toggle sets 1 or 2 columns on mobile and 2 or 3 on desktop.
  - The view toggle sticks to the bottom-left once it scrolls out of view.
  - Load More reveals the next 12 products, keeping the active filter and column choice.
  - The FAQ accordion keeps one item open at a time.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-006 — Product Detail
- **Outline:** Refer to /docs/content/s-006_product-detail.md
- **Feature:** F-004 Add to Cart, F-006 Checkout, F-001 Product Grid, F-009 Structured Data
- **Behavior:**
  - A thumbnail sets the main image. The video is the first thumbnail, shown with a play icon.
  - On load, the main image shows the first image while the video loads. Once loaded, it switches to the video and autoplays it muted, looped, and inline.
  - With reduced motion on, it does not auto-switch or autoplay.
  - The breadcrumb trims the product name with an ellipsis on small screens; the full name stays in the markup.
  - Add to Cart opens C-Cart. Buy Now goes straight to Shopify checkout.
  - Sold-out sizes are disabled. When every variant is sold out, the buy buttons swap to a Preorder link to /contact.
  - The sizing and shipping links open C-Sizing and C-Shipping.
  - "You May Also Like" shows 2 random products.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-007 — About Us
- **Outline:** Refer to /docs/content/s-007_about-us.md
- **Feature:** None
- **Behavior:**
  - None
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-008 — Contact
- **Outline:** Refer to /docs/content/s-008_contact.md
- **Feature:** None
- **Behavior:**
  - None
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-009 — Shipping & Returns
- **Outline:** Refer to /docs/content/s-009_shipping-returns.md
- **Feature:** None
- **Behavior:**
  - None
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-010 — Privacy Policy
- **Outline:** Refer to /docs/content/s-010_privacy-policy.md
- **Feature:** None
- **Behavior:**
  - None
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-011 — Terms of Service
- **Outline:** Refer to /docs/content/s-011_terms-of-service.md
- **Feature:** None
- **Behavior:**
  - None
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

## 6. Layout Components

### C-Transparent — Transparent Header
- **Outline:** `Announcement Bar ["Delivers Worldwide · Free Shipping over $250"] // Hamburger Icon <opens C-Menu> | White Square Logo <to /, oversized — overflows below the header> | Cart Icon <opens C-Cart>`
- **Feature:** None
- **Behavior:**
  - Home only. Transparent and non-sticky. Scrolls away with the page.

### C-Sticky — Sticky Header
- **Outline:** `Announcement Bar ["Delivers Worldwide · Free Shipping over $250"] // Hamburger Icon <opens C-Menu> | Dark Symbol Logo <to /> | Cart Icon <opens C-Cart>`
- **Feature:** None
- **Behavior:**
  - Sticky on every screen. On Home it takes over once the hero scrolls out of view.

### C-Menu — Menu Drawer
- **Outline:** `Dark Symbol Logo <to /> // "Shop Now" / "Link: Corset Tops" <to /corset-tops> / "Link: Matching Sets" <to /matching-sets> / "Link: Cocktail Dress" <to /cocktail-dresses> / "Link: Shop All" <to /shop> // "Link: Our Story" <to /about> / "Link: Contact Us" <to /contact> / Account "Link: Login/Account" <to Shopify account>`
- **Feature:** None
- **Behavior:**
  - Opens from the hamburger icon. A link closes the drawer and goes to the page.

### C-Cart — Cart Drawer
- **Outline:** `"Your Cart" // Line Items <image, name, options, qty stepper, price, remove> // Subtotal // "Btn: Checkout" / "Checkout securely in USD, powered by Shopify"`
- **Feature:** F-005 Cart Management, F-006 Checkout
- **Behavior:**
  - Changing an item's quantity or removing it updates the cart and subtotal.
  - Checkout opens Shopify's hosted checkout.
  - Shows an empty state when the cart is empty.

### C-Footer — Footer
- **Outline:** `Logo <to /> // (("Shop & Learn" / "Link: Corset Tops" <to /corset-tops> / "Link: Matching Sets" <to /matching-sets> / "Link: Cocktail Dress" <to /cocktail-dresses> / "Link: Shop All" <to /shop>) | ("More Info" / "Link: Our Story" <to /about> / "Link: Contact Us" <to /contact> / "Link: Shipping & Returns" <to /shipping-returns>) | ("Connect with Us" / (Instagram Icon <to Instagram> + Facebook Icon <to Facebook> + TikTok Icon <to TikTok>))) // ("© SHER {year}" | ("Link: Privacy Policy" <to /privacy-policy> + "Link: Terms of Service" <to /terms-of-service>))`
- **Feature:** None
- **Behavior:**
  - Social icons open the external profiles. Links mapped in Navigation.

### C-Sizing — Size Chart Drawer
- **Outline:** `"Size Chart" / Title <product name> / Paragraph <measurements-based; varies by style; each piece can be tailored; contact SHER if unsure> / Measurements <in cm> / Measurements <in inches>`
- **Feature:** F-007 Size Chart
- **Behavior:**
  - Renders only the measurements a product defines; one it omits (say, no Hip on a corset top) is left out of the table.
  - The inches table is worked out from the cm values. The cm values come from D-005 Product Data.

### C-Shipping — Shipping & Returns Drawer
- **Outline:** `(same as /shipping-returns)`
- **Feature:** None
- **Behavior:**
  - Opens from the product page. Shows the same content as the /shipping-returns page.

## 7. Navigation

```
Header — every screen (C-Transparent on the Home hero, then C-Sticky once the hero scrolls out of view; C-Sticky everywhere else)
 ├── Hamburger → opens C-Menu
 ├── Logo → S-001
 └── Cart → opens C-Cart

Menu Drawer (C-Menu)
 ├── Shop Now
 │    ├── Corset Tops → S-003 (/corset-tops)
 │    ├── Matching Sets → S-004 (/matching-sets)
 │    ├── Cocktail Dress → S-005 (/cocktail-dresses)
 │    └── Shop All → S-002 (/shop)
 ├── Our Story → S-007 (/about)
 ├── Contact Us → S-008 (/contact)
 └── Login/Account → Shopify hosted account

Shop button pills — S-002
 ├── Corset Tops → S-003 (/corset-tops)
 ├── Matching Sets → S-004 (/matching-sets)
 └── Cocktail Dresses → S-005 (/cocktail-dresses)

Product Detail — in page (S-006)
 ├── Sizing link → opens C-Sizing
 ├── Shipping link → opens C-Shipping
 ├── Add to Cart → opens C-Cart
 ├── Buy Now → Shopify hosted checkout
 └── Preorder (every size sold out) → S-008 (/contact)

Footer (C-Footer) — every screen
 ├── (logo) → Home (/)
 ├── Shop & Learn
 │    ├── Corset Tops → S-003 (/corset-tops)
 │    ├── Matching Sets → S-004 (/matching-sets)
 │    ├── Cocktail Dress → S-005 (/cocktail-dresses)
 │    └── Shop All → S-002 (/shop)
 ├── More Info
 │    ├── Our Story → S-007 (/about)
 │    ├── Contact Us → S-008 (/contact)
 │    └── Shipping & Returns → S-009 (/shipping-returns)
 ├── Connect with Us
 │    ├── Instagram → external URL
 │    ├── Facebook → external URL
 │    └── TikTok → external URL
 └── (bottom bar, no heading)
      ├── Privacy Policy → S-010 (/privacy-policy)
      └── Terms of Service → S-011 (/terms-of-service)
```

## 8. Build Steps
### Phase 1 — Foundation
| Step | What to Build | References |
|---|---|---|
| B-001 | Set up the project and deploy: Next.js 15 (TypeScript strict, Tailwind), env vars, design tokens and theme, and the Vercel pipeline. Keep it shippable from day one. | Platform, Extra Details |
| B-002 | Build the Shopify data layer: one `shopifyFetch()` wrapper, product and collection queries, and cart Server Actions. Front-load this risky integration. | D-001, D-002, D-003 |
| B-003 | Build the global chrome: C-Transparent, C-Sticky (with the hero takeover), C-Menu, C-Footer, the announcement bar, and the navigation. | C-Transparent, C-Sticky, C-Menu, C-Footer, /docs/knowledge-sher.md, Navigation |

### Phase 2 — Browse
| Step | What to Build | References |
|---|---|---|
| B-004 | Build the product grid, the All Products hub, and the three category pages, with the attribute filter, the view toggle, and the FAQ accordion. | S-002, S-003, S-004, S-005, F-001, F-002, F-003, D-002, D-005, /docs/content/ |
| B-005 | Build the Home page: hero carousel, category tiles, and featured products from Home content. | S-001, F-008, D-004 |

### Phase 3 — Product Detail
| Step | What to Build | References |
|---|---|---|
| B-006 | Build the Product Detail page: media gallery, variant selection, sold-out and preorder states, and the related grid. | S-006, F-001, D-001 |
| B-007 | Build the size chart drawer (from the D-005 Product Data TSV) and the shipping drawer. | C-Sizing, C-Shipping, F-007, D-005, /docs/content/s-009_shipping-returns.md |

### Phase 4 — Cart & Checkout
| Step | What to Build | References |
|---|---|---|
| B-008 | Build the cart drawer, add to cart, Buy Now, the empty state, and the checkout handoff to Shopify. | C-Cart, F-004, F-005, F-006, D-003 |

### Phase 5 — Content & Launch
| Step | What to Build | References |
|---|---|---|
| B-009 | Build the About, Contact, and policy pages as one static-content set. | S-007, S-008, S-009, S-010, S-011, /docs/content/, /docs/knowledge-sher.md |
| B-010 | Add SEO: per-page metadata, canonical URLs, Product and BreadcrumbList structured data, the sitemap, and robots. | F-009, all screens, Extra Details |
| B-011 | Run the launch gate: hit the performance target, meet accessibility, and run full QA. | Extra Details |

## 9. Extra Details
### Connectivity
The store needs the network to reach the Shopify Storefront API for products, collections, and the cart, and to open Shopify hosted checkout. Without it, product data, cart, and checkout do not work. Content and policy pages render from repo content and the Home layout from repo config, so they hold up better.

### Storage
- **Client:** the Shopify cart ID in a cookie, so the cart survives page moves and refreshes. The view-toggle and filter state sit in the URL or local UI state.
- **Server:** none of its own. The cart lives in Shopify; content lives in the repo.

### Accessibility
Every screen meets WCAG 2.2 AA: keyboard access, visible focus, alt text on images, heading order that follows the H1, H2, H3 outline, and focus handling in the drawers and the accordion. Reduced motion is respected by the hero carousel and the product video.

### Performance
Every screen meets a Lighthouse score of 90 or higher. Use `next/image` for all product and collection images, Suspense skeletons for async sections, Server Components, and minimal client JavaScript.

### Security & Privacy
- The Storefront access token is used server-side only and never ships in the client bundle.
- Shopify hosted checkout handles all payment and personal data, so the store never touches card data.
- The only cookie the store sets is the cart ID.
- The Privacy Policy page states what data is collected and how.

### Integrations / External Services
- Shopify Storefront API (products, collections, cart)
- Shopify hosted checkout (payment, tax, shipping, discounts)
- Shopify hosted customer accounts (the Login/Account link)
- Shopify CDN (product images)
- Vercel (hosting and deploy)
- Instagram, Facebook, and TikTok as outbound links only

### Environment / Config
- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` (server-side only)
- `SHOPIFY_API_VERSION`
- `NEXT_PUBLIC_SITE_URL`

### Active Items
| ID | Name | Status |
|---|---|---|
| US-001 | Home browse and discover | Active |
| US-002 | Browse all products | Active |
| US-003 | Browse a category | Active |
| US-004 | Filter by attribute | Active |
| US-005 | View product and pick variant | Active |
| US-006 | Add to cart | Active |
| US-007 | Review the cart | Active |
| US-008 | Checkout | Active |
| US-009 | Empty-cart state | Active |
| US-010 | Size chart in cm or inches | Active |
| F-001 | Product Grid | Active |
| F-002 | Attribute Filter | Active |
| F-003 | Grid View Toggle | Active |
| F-004 | Add to Cart | Active |
| F-005 | Cart Management | Active |
| F-006 | Checkout | Active |
| F-007 | Size Chart | Active |
| F-008 | Home Content | Active |
| F-009 | Structured Data | Active |
| D-001 | Product | Active |
| D-002 | Collection | Active |
| D-003 | Cart | Active |
| D-004 | Home Content | Active |
| D-005 | Product Data | Active |
| C-Transparent | Transparent Header | Active |
| C-Sticky | Sticky Header | Active |
| C-Menu | Menu Drawer | Active |
| C-Cart | Cart Drawer | Active |
| C-Footer | Footer | Active |
| C-Sizing | Size Chart Drawer | Active |
| C-Shipping | Shipping & Returns Drawer | Active |
