> **This document defines version v3 of the product. Earlier versions hold what came before; the Active Items list shows everything in effect now. Page outline and structure live in the Planning TSV; styling lives in the design system file; brand voice lives in the brand doc. Do not add features, screens, or data the plan doesn't call for.**

---

# SHER — SHER Web Store Requirements Document

**Platform:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Shopify Storefront API (headless), Shopify hosted checkout and accounts, Vercel.
**Version:** v3

## 1. Main Goals
1. Launch a store people can shop: browse products, open a product page, add to cart, and check out through Shopify.
2. Ship the SEO pillar and category pages that go after the head terms (corset tops, matching sets, cocktail dresses).
3. Ship the required content and policy pages: about, contact, shipping and returns, privacy, terms.
4. Stand up the shared chrome and design system so every screen looks the same and the store stays shippable.

## 2. User Stories
| ID | Story |
|---|---|
| US-001 | As a customer, I want to land on the home page and see featured products and category links so I can start shopping. |
| US-002 | As a customer, I want to browse all products in one place so I can see the full range. |
| US-003 | As a customer, I want to browse one product category so I can focus on one type. |
| US-004 | As a customer, I want to filter a category by its key attribute so I can narrow to what fits me. |
| US-005 | As a customer, I want to see a product's photos, price, and options so I can decide to buy. |
| US-006 | As a customer, I want to pick a color, size, and quantity and add the item to my cart so I can buy it. |
| US-007 | As a customer, I want a Buy Now option so I can check out fast. |
| US-008 | As a customer, I want to see the size chart so I can pick the right size. |
| US-009 | As a customer, I want to review my cart and change or remove items so I can confirm my order before I pay. |
| US-010 | As a customer, I want to check out securely so I can finish my purchase. |
| US-011 | As a customer, when a product is sold out, I want a way to ask for it so I don't miss out. |
| US-012 | As a customer, when my cart is empty, I want a clear empty message so I know to keep shopping. |

## 3. Features
### F-001 — Product Grid
- **What it does:** Lists the products in a collection as a grid of cards (image, name, price, link).
- **When it appears:** On the Shop hub (S-002) and each category page (S-003, S-004, S-005).
- **If something goes wrong:** If the collection fails to load, show an error state. If a collection has no products, show an empty message.

### F-002 — Attribute Filter
- **What it does:** Filters the grid in place by the category's one key attribute: closure type (corset tops), set type (matching sets), or length (cocktail dresses).
- **When it appears:** On each category page (S-003, S-004, S-005), above the grid as Button Pills.
- **If something goes wrong:** If a filter returns no products, keep the page and show an empty message.

### F-003 — Grid View Toggle
- **What it does:** Switches how many columns the grid shows: 1 or 2 on mobile, 2 or 3 on desktop.
- **When it appears:** On the Shop hub (S-002) and each category page (S-003, S-004, S-005).
- **If something goes wrong:** Falls back to the default column count.

### F-004 — Add to Cart
- **What it does:** Adds the chosen color, size, and quantity to the cart, then opens the cart drawer. Creates the cart on the first add.
- **When it appears:** On the product page (S-006), from the Add to Cart button.
- **If something goes wrong:** If the add fails, show an error and leave the cart unchanged.

### F-005 — Cart Drawer
- **What it does:** Shows the cart's line items, lets the customer change quantity or remove an item, and shows the subtotal. Opens Shopify checkout. Shows an empty state when the cart has nothing in it.
- **When it appears:** From the cart icon in the header, on every screen (C-Cart).
- **If something goes wrong:** If an update fails, keep the last good cart and show an error.

### F-006 — Buy Now
- **What it does:** Skips the cart and sends the customer straight to Shopify checkout for the chosen item.
- **When it appears:** On the product page (S-006), from the Buy Now button.
- **If something goes wrong:** If checkout can't start, show an error and keep the customer on the page.

### F-007 — Preorder Fallback
- **What it does:** When every size and color of a product is sold out, the Add to Cart and Buy Now buttons swap to a Preorder link to the contact page.
- **When it appears:** On the product page (S-006), when the product is fully sold out.
- **If something goes wrong:** If stock is unknown, keep the normal buy buttons.

### F-008 — Size Chart
- **What it does:** Shows the size chart for a product in a drawer. Renders only the measurements that product defines. Shows a cm table and an inches table, with inches worked out from the cm values.
- **When it appears:** On the product page (S-006), from the size guide link (C-Sizing).
- **If something goes wrong:** If a product has no size data, hide the size link.

### F-009 — Hero Carousel
- **What it does:** Shows a sliding hero of featured banners with text overlay on the home page.
- **When it appears:** At the top of the home page (S-001).
- **If something goes wrong:** If the carousel script fails, show the first banner as a static image.

### F-010 — Home Content Slots
- **What it does:** Fills the home page category cards and featured product cards from the Home content config: slot placement, image, overlay text, and link.
- **When it appears:** On the home page (S-001), below the hero.
- **If something goes wrong:** If a slot has no data, leave that slot out.

### F-011 — SEO and Structured Data
- **What it does:** Adds page title, description, Open Graph image, and canonical URL to every product and collection page, and adds JSON-LD Product data to each product page.
- **When it appears:** On every product, collection, and pillar page, in the server-rendered markup.
- **If something goes wrong:** If a field is missing, skip that field but still render the page.

## 4. Data
| ID | Data Item | Source | Details |
|---|---|---|---|
| D-001 | Product | Shopify Storefront API | Name, price, description, images, colors, sizes, variants, availability, and type attribute (closure, set type, or length). |
| D-002 | Collection | Shopify Storefront API | The shop-all set and the three category sets, each holding its products. |
| D-003 | Cart | Shopify Storefront API + browser cookie | Cart lines, quantities, subtotal, and checkout URL. The cart ID lives in a cookie. |
| D-004 | Home Content | App repo config file | Hero banners, category card images, and featured product refs, each with slot placement, image, overlay text, and link. |
| D-005 | Size Chart | Size-chart TSV in app repo config | The cm measurements per style. Inches are worked out from these. |
| D-006 | Page Content | Content MD files in `/docs/content/` | The copy for the pillar, about, contact, and policy pages. |
| D-007 | Site Config | App repo config | Header and footer links, announcement bar text, social URLs, contact email, and warehouse address. |

## 5. Screens & Components

### S-001 — Home
- **What's on it:**
  - Refer to /docs/content/s-001_home.md
- **Feature:** F-009 Hero Carousel, F-010 Home Content Slots
- **Behavior:**
  - The hero slides through its banners.
  - The hero banners, category cards, and featured product cards come from D-004 Home content (slot placement, image, overlay text, and link).
- **Components & Assets:**
  - (to be updated later)

### S-002 — Shop
- **What's on it:**
  - Refer to /docs/content/s-002_shop.md
- **Feature:** F-001 Product Grid, F-003 Grid View Toggle
- **Behavior:**
  - The view toggle sets 1 or 2 columns on mobile and 2 or 3 on desktop.
  - The button pills link to the three category pages.
- **Components & Assets:**
  - (to be updated later)

### S-003 — Shop Corset Tops
- **What's on it:**
  - Refer to /docs/content/s-003_shop-corset-tops.md
- **Feature:** F-001 Product Grid, F-002 Attribute Filter, F-003 Grid View Toggle
- **Behavior:**
  - The filter narrows the grid in place by closure type.
  - The view toggle sets 1 or 2 columns on mobile and 2 or 3 on desktop.
- **Components & Assets:**
  - (to be updated later)

### S-004 — Shop Matching Sets
- **What's on it:**
  - Refer to /docs/content/s-004_shop-matching-sets.md
- **Feature:** F-001 Product Grid, F-002 Attribute Filter, F-003 Grid View Toggle
- **Behavior:**
  - The filter narrows the grid in place by set type.
  - The view toggle sets 1 or 2 columns on mobile and 2 or 3 on desktop.
- **Components & Assets:**
  - (to be updated later)

### S-005 — Shop Cocktail Dresses
- **What's on it:**
  - Refer to /docs/content/s-005_shop-cocktail-dresses.md
- **Feature:** F-001 Product Grid, F-002 Attribute Filter, F-003 Grid View Toggle
- **Behavior:**
  - The filter narrows the grid in place by length.
  - The view toggle sets 1 or 2 columns on mobile and 2 or 3 on desktop.
- **Components & Assets:**
  - (to be updated later)

### S-006 — Product Detail
- **What's on it:**
  - Media Gallery (thumbnail strip and main image)
  - Breadcrumb (Shop › Category › product), product name, price
  - Color selector (image thumbnails per color), size selector, quantity selector
  - Add to Cart button, Buy Now button
  - Product description and type attribute (closure for corsets, set type for sets, length for dresses)
  - Link that opens the size chart (C-Sizing), link that opens shipping and returns (C-Shipping)
  - "You May Also Like" heading and subtitle, a Back to Category button, a More about Category button
  - A grid of 2 random products from the same category
- **Feature:** F-004 Add to Cart, F-006 Buy Now, F-007 Preorder Fallback, F-011 SEO and Structured Data
- **Behavior:**
  - A thumbnail sets the main image; picking a color jumps to that color's image.
  - The breadcrumb trims the product name with an ellipsis on small screens; the full name stays in the markup.
  - Add to Cart opens C-Cart. Buy Now goes to Shopify checkout.
  - Sold-out sizes and colors are disabled. When all are sold out, the buy buttons swap to a Preorder link to /contact.
- **Components & Assets:**
  - (to be updated later)

### S-007 — Corset Tops
- **What's on it:**
  - Refer to /docs/content/s-007_corset-tops.md
- **Feature:** F-011 SEO and Structured Data
- **Behavior:**
  - The FAQ accordion keeps one item open at a time.
- **Components & Assets:**
  - (to be updated later)

### S-008 — Matching Sets
- **What's on it:**
  - Refer to /docs/content/s-008_matching-sets.md
- **Feature:** F-011 SEO and Structured Data
- **Behavior:**
  - The FAQ accordion keeps one item open at a time.
- **Components & Assets:**
  - (to be updated later)

### S-009 — Cocktail Dresses
- **What's on it:**
  - Refer to /docs/content/s-009_cocktail-dresses.md
- **Feature:** F-011 SEO and Structured Data
- **Behavior:**
  - The FAQ accordion keeps one item open at a time.
- **Components & Assets:**
  - (to be updated later)

### S-010 — About Us
- **What's on it:**
  - Refer to /docs/content/s-010_about-us.md
- **Feature:** (none this version)
- **Behavior:**
  - Static content page.
- **Components & Assets:**
  - (to be updated later)

### S-011 — Contact
- **What's on it:**
  - Refer to /docs/content/s-011_contact.md
- **Feature:** (none this version)
- **Behavior:**
  - The social, email, and address values come from D-007 Site config.
- **Components & Assets:**
  - (to be updated later)

### S-012 — Shipping & Returns
- **What's on it:**
  - Refer to /docs/content/s-012_shipping-returns.md
- **Feature:** (none this version)
- **Behavior:**
  - Static content page.
- **Components & Assets:**
  - (to be updated later)

### S-013 — Privacy Policy
- **What's on it:**
  - Refer to /docs/content/s-013_privacy-policy.md
- **Feature:** (none this version)
- **Behavior:**
  - Static content page.
- **Components & Assets:**
  - (to be updated later)

### S-014 — Terms of Service
- **What's on it:**
  - Refer to /docs/content/s-014_terms-of-service.md
- **Feature:** (none this version)
- **Behavior:**
  - Static content page.
- **Components & Assets:**
  - (to be updated later)

### C-Transparent — Transparent Header
- **What's on it:**
  - Announcement bar ["Delivers Worldwide. Free Global Shipping over $250"]
  - Hamburger icon (opens C-Menu), oversized white square logo (to /, overflows below the header), cart icon (opens C-Cart)
- **Behavior:**
  - Home only. Transparent and non-sticky. Scrolls away with the page.

### C-Sticky — Sticky Header
- **What's on it:**
  - Announcement bar ["Delivers Worldwide. Free Global Shipping over $250"]
  - Hamburger icon (opens C-Menu), dark symbol logo (to /), cart icon (opens C-Cart)
- **Behavior:**
  - Sticky on every screen. On Home it takes over after 60vh of scroll.

### C-Menu — Menu Drawer
- **What's on it:**
  - Dark symbol logo (to /)
  - "Shop Now": links to Corset Tops, Matching Sets, Cocktail Dress, Shop All
  - Links to Our Story and Contact Us, and an account link to the Shopify account
- **Behavior:**
  - Opens from the hamburger icon.

### C-Cart — Cart Drawer
- **What's on it:**
  - "Your Cart"
  - Line items (image, name, options, quantity stepper, price, remove)
  - Subtotal
  - Checkout button, and "Checkout securely in USD, powered by Shopify"
- **Feature:** F-005 Cart Drawer
- **Behavior:**
  - Changing an item's quantity or removing it updates the cart and subtotal.
  - Checkout opens Shopify's hosted checkout.
  - Shows an empty state when the cart is empty.

### C-Sizing — Size Chart Drawer
- **What's on it:**
  - "Size Chart", product name, a short size guide note, a cm measurements table, and an inches measurements table
- **Feature:** F-008 Size Chart
- **Behavior:**
  - Renders only the measurements a product defines; one it omits is left out of the table.
  - The inches table is worked out from the cm values. The cm values come from D-005 Size Chart.

### C-Shipping — Shipping & Returns Drawer
- **What's on it:**
  - Refer to /docs/content/s-012_shipping-returns.md
- **Behavior:**
  - Shows the same content as the /shipping-returns page in a drawer.

### C-Footer — Footer
- **What's on it:**
  - "Shop & Learn": links to Corset Tops, Matching Sets, Cocktail Dress, Shop All
  - "More Information": links to Our Story, Contact, Shipping & Returns
  - "Connect with Us": Instagram, Facebook, TikTok icons
  - "© SHER {year}", plus Privacy Policy and Terms of Service links

### C-Breadcrumb — Breadcrumb
- **What's on it:**
  - The trail for the current page (e.g. Home › Shop › Category › product)
- **Behavior:**
  - Trims a long name with an ellipsis on small screens; the full name stays in the markup.

## 6. Navigation

```
Header — every screen (C-Transparent on Home hero, C-Sticky elsewhere)
 ├── Hamburger → opens C-Menu
 ├── Logo → S-001
 └── Cart → opens C-Cart

Menu Drawer (C-Menu)
 ├── Shop Now
 │    ├── Corset Tops → S-007
 │    ├── Matching Sets → S-008
 │    ├── Cocktail Dress → S-009
 │    └── Shop All → S-002
 ├── Our Story → S-010
 ├── Contact Us → S-011
 └── Login/Account → Shopify account

Footer (C-Footer) — every screen
 ├── Shop & Learn
 │    ├── Corset Tops → S-007
 │    ├── Matching Sets → S-008
 │    ├── Cocktail Dress → S-009
 │    └── Shop All → S-002
 ├── More Information
 │    ├── Our Story → S-010
 │    ├── Contact → S-011
 │    └── Shipping & Returns → S-012
 ├── Connect with Us
 │    ├── Instagram → external URL
 │    ├── Facebook → external URL
 │    └── TikTok → external URL
 ├── Privacy Policy → S-013
 └── Terms of Service → S-014
```

## 7. Build Steps
### Phase 1 — Foundation
| Step | What to Build | References |
|---|---|---|
| B-001 | Scaffold the Next.js 15 app (App Router, TypeScript strict, Tailwind) and set up Vercel deploy so the store is shippable from day one. | — |
| B-002 | Export the design tokens and theme, so every screen shares one look. | — |
| B-003 | Build the single `shopifyFetch()` wrapper for all Storefront API calls. | D-001, D-002, D-003 |
| B-004 | Build the shared chrome: C-Transparent, C-Sticky, C-Menu, C-Footer, C-Breadcrumb, and the header/menu/footer navigation. | C-Transparent, C-Sticky, C-Menu, C-Footer, C-Breadcrumb |

### Phase 2 — Product Detail (riskiest integration first)
| Step | What to Build | References |
|---|---|---|
| B-005 | Fetch product data and build the product page: media gallery, color/size/quantity selectors, description, and type attribute. | S-006, D-001 |
| B-006 | Build the size chart drawer and the shipping drawer. | C-Sizing, C-Shipping, F-008, D-005, D-006 |
| B-007 | Add JSON-LD Product data and page metadata to the product page. | F-011, S-006 |

### Phase 3 — Cart & Checkout
| Step | What to Build | References |
|---|---|---|
| B-008 | Build the cart with Server Actions: create on first add, store the cart ID in a cookie, and revalidate after each change. | D-003, F-004 |
| B-009 | Build the cart drawer: line items, quantity change, remove, subtotal, and empty state. | C-Cart, F-005, US-012 |
| B-010 | Wire Buy Now and the Checkout button to Shopify hosted checkout, and add the Preorder fallback for sold-out products. | F-006, F-007, US-011 |

### Phase 4 — Browse & Filter
| Step | What to Build | References |
|---|---|---|
| B-011 | Build the product grid, the Shop hub, and the three category pages from their collections. | S-002, S-003, S-004, S-005, F-001, D-002 |
| B-012 | Add the in-place attribute filter and the grid view toggle. | F-002, F-003 |
| B-013 | Add metadata and canonical URLs to the collection pages. | F-011 |

### Phase 5 — Home
| Step | What to Build | References |
|---|---|---|
| B-014 | Build the home page: hero carousel, category cards, and featured products from Home content. | S-001, F-009, F-010, D-004 |

### Phase 6 — Content Pages
| Step | What to Build | References |
|---|---|---|
| B-015 | Build all static content pages from their Content MD: the three pillars, about, contact, shipping, privacy, and terms. | S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-014, D-006, D-007 |
| B-016 | Add the FAQ accordion (one open at a time) to the three pillar pages, and add page metadata. | S-007, S-008, S-009, F-011 |

### Phase 7 — Launch Gate
| Step | What to Build | References |
|---|---|---|
| B-017 | Meet the performance bar (Lighthouse), the accessibility bar (WCAG 2.1 AA), and QA structured data and cross-browser behavior before launch. | — |

## 8. Extra Details
### Connectivity
The store needs the network to reach the Shopify Storefront API for products, collections, and the cart, and to open Shopify hosted checkout. Without it, product data, cart, and checkout fail. Static content pages can still render if cached.

### Storage
- **Client:** the Shopify cart ID in a cookie, so the cart survives page moves and refreshes.
- **Server:** none of its own. Products and the cart live in Shopify.

### Accessibility
Every screen meets WCAG 2.1 AA.

### Performance
Every screen meets a Lighthouse score of 90 or higher. Use `next/image` for all product and collection images, and Suspense skeletons for async sections.

### Security & Privacy
- The Storefront access token is used server-side only, never in a `'use client'` component or the client bundle.
- There is no custom checkout. Shopify handles payment, tax, and personal data.
- The cart cookie holds only the cart ID.

### Integrations / External Services
- Shopify Storefront API (products, collections, cart)
- Shopify hosted checkout
- Shopify hosted customer accounts
- Vercel (hosting and deploy)

### Environment / Config
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `SHOPIFY_STORE_DOMAIN`
- Storefront API version
- Home content config file (D-004) and the size-chart TSV (D-005) in the repo

### Active Items
| ID | Name | Status |
|---|---|---|
| US-001 | Home browse | Active |
| US-002 | Shop-all browse | Active |
| US-003 | Category browse | Active |
| US-004 | Attribute filter | Active |
| US-005 | View product | Active |
| US-006 | Add to cart | Active |
| US-007 | Buy Now | Active |
| US-008 | Size chart | Active |
| US-009 | Review cart | Active |
| US-010 | Secure checkout | Active |
| US-011 | Preorder sold-out | Active |
| US-012 | Empty cart message | Active |
| F-001 | Product Grid | Active |
| F-002 | Attribute Filter | Active |
| F-003 | Grid View Toggle | Active |
| F-004 | Add to Cart | Active |
| F-005 | Cart Drawer | Active |
| F-006 | Buy Now | Active |
| F-007 | Preorder Fallback | Active |
| F-008 | Size Chart | Active |
| F-009 | Hero Carousel | Active |
| F-010 | Home Content Slots | Active |
| F-011 | SEO and Structured Data | Active |
| D-001 | Product | Active |
| D-002 | Collection | Active |
| D-003 | Cart | Active |
| D-004 | Home Content | Active |
| D-005 | Size Chart | Active |
| D-006 | Page Content | Active |
| D-007 | Site Config | Active |
