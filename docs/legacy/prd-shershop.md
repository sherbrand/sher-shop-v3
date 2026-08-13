> **This document defines version v3 of the SherShop web store. Earlier versions hold what came before; the Active Items list shows everything in effect now. Page outline and structure live in `planning-shershop.tsv`; visual styling lives in `DESIGN.md`; brand voice lives in `brand-sher.md`. Do not add features, screens, or data the idea and plan don't call for.**

---

# SHER — Web Store Requirements Document

**Store Name:** SherShop  
**Platform:** Web — built with Next.js 15 (App Router), TypeScript, Tailwind CSS  
**Backend:** Shopify Headless (Storefront API), Shopify Hosted Checkout  
**Hosting:** Vercel  
**Domain:** sherbrand.co  
**Version:** v3

---

## 1. Overview

SHER is a premium women's fashion brand selling handcrafted corset tops and complementary womenswear. The store ships worldwide. Customers can browse the catalogue, filter by category and attribute, view product detail, add to cart, and check out securely via Shopify's hosted checkout — all from any device. All prices are shown in USD. Customer accounts are managed by Shopify's hosted account page — the storefront does not build its own login or profile pages.

---

## 2. Main Goals

1. Let customers browse and buy SHER products from any device.
2. Ship worldwide.
3. Keep the storefront fast — target 90+ Lighthouse performance score.
4. Match the SHER brand identity across web and iOS app.
5. Use Shopify hosted checkout so we never handle payment data.

---

## 3. User Stories

| ID | Story |
|---|---|
| US-001 | As a customer, I want to browse the full catalogue in one place so I can see everything SHER offers. |
| US-002 | As a customer, I want to view a product's details (photos, description, sizes, colours, price, attributes) so I can decide if I want to buy it. |
| US-003 | As a customer, I want to see a size chart so I can pick the right size. |
| US-004 | As a customer, I want to see a product's attributes (closure, boning, construction) so I can understand the quality. |
| US-005 | As a customer, I want to add items to my cart and choose a size and colour so I can prepare to buy. |
| US-006 | As a customer, I want to see my cart and adjust it (change quantities, remove items) before checking out. |
| US-007 | As a customer, I want to check out securely so I can complete my purchase. |
| US-008 | As a customer, I want to navigate to a corset-only or womenswear-only listing so I can narrow my browsing. |
| US-009 | As a customer, I want to filter a category by attribute (e.g., closure type) so I can find the style I want. |
| US-010 | As a customer, I want to toggle the product grid between 2-column and 3-column views so I can browse at my preferred density. |
| US-011 | As a customer, I want to buy a single product directly without using the cart so I can check out faster. |

---

## 4. Features

### F-001 — Product Detail
- **What it does:**
  - Lets the customer view a product's full details and add it to the cart.
  - The thumbnail strip switches the main image: desktop scrolls vertically, mobile swipes horizontally.
  - The colour picker uses product photos with colour names, not swatches. If multiple colours, the customer selects one; if only one, it is displayed but not selectable.
  - When the customer picks a colour, the gallery scrolls to that colour's photo.
  - Out-of-stock sizes are not selectable.
  - Add to Cart and Buy Now (F-011) are disabled until both a colour and a size are selected. Helper text: "Please select size and color to add to cart."
- **When it appears:** When a customer clicks any product card. Route: `/products/[product-slug]`.
- **If something goes wrong:** If the page can't load, show an error with a "Retry" link.

### F-002 — Size Chart
- **What it does:**
  - Shows size measurements for the product in a drawer (C-Sizing).
  - Values are stored in cm.
  - Both cm and inches are shown — no toggle.
- **When it appears:** A "Size Chart" link on every Product Detail page (S-005). Opens as a drawer.
- **If something goes wrong:** If the chart can't load, show a simple text fallback.

### F-003 — Shopping Cart
- **What it does:**
  - Stores the customer's selected items using the Shopify Cart API.
  - The store creates an anonymous cart and stores the `cartId` in a cookie.
  - The cart opens as a drawer (C-Cart) from any page via the header Cart icon.
  - Allows quantity changes and item removal.
  - Shows a running subtotal.
  - Compares the subtotal against the free shipping threshold to display a dynamic message (e.g., "Spend $55 more to get free shipping" or "You qualify for free shipping").
  - A "Checkout" button redirects to Shopify hosted checkout.
- **When it appears:** Accessible from the Cart icon in the header on any page.
- **If something goes wrong:** If an item goes out of stock while in the cart, flag it and say "This item is no longer available in this size."

### F-004 — Shopify Hosted Checkout
- **What it does:**
  - The store does not build a checkout page.
  - When the customer clicks "Checkout," they are redirected to Shopify's hosted checkout using the cart's `checkoutUrl`.
  - Shopify handles the entire checkout flow: address entry, shipping, payment, tax, discounts, and order creation.
  - Customers can create an account or check out as a guest at checkout.
- **When it appears:** After clicking "Checkout" from the Cart drawer (C-Cart), or after clicking "Buy Now" on the Product Detail page (S-005).
- **If something goes wrong:** If the redirect fails, show "Checkout couldn't load — please check your connection and try again."

### F-005 — Responsive Layout
- **What it does:**
  - The store works on mobile, tablet, and desktop.
  - Mobile-first design.
- **When it appears:** All pages.

### F-006 — SEO
- **What it does:**
  - Each page has a unique meta title and description via `generateMetadata`.
  - Product Detail pages include JSON-LD structured data.
  - Static pages are indexable.
  - Internal linking follows the topical structure defined in the plan (Pillar → Cluster).
- **When it appears:** All pages.

### F-007 — Rotating Announcement Bar
- **What it does:**
  - Rotates between hardcoded messages on a timer (e.g., "Ships Worldwide. Prices in USD", "Free Global Shipping Over $180").
  - Part of both headers; the headers' sticky and scroll behaviour is in C-Transparent and C-Sticky (Section 6).
- **When it appears:** All pages.
- **If something goes wrong:** If messages fail to render, show a single static fallback message.

### F-008 — Hero Carousel
- **What it does:**
  - An image carousel.
  - Auto-advances on a timer.
  - Swipeable; arrow controls advance to next or previous slide.
  - Shows a progress indicator with current slide and total.
- **When it appears:** On the Home page (S-001) only.
- **If something goes wrong:** If images fail to load, show a static fallback hero image.

### F-009 — Attribute Filter
- **What it does:**
  - Filter buttons that filter the product grid by a single attribute.
  - On `/shop/corset-tops` (S-003), filters by closure type (Lace-up, Zip Closure, Lace & Zip).
  - On `/shop/womenswear` (S-004), filters by womenswear type (Tops, Bottoms, Dresses, Sets).
  - The selected filter is reflected in the URL as a query parameter so filter state is shareable and persists on refresh.
- **When it appears:** Shop Corset Tops (S-003), Shop Womenswear (S-004).

### F-010 — View Toggle
- **What it does:**
  - A control that switches the product grid between 2-column and 3-column layouts.
  - The selected view persists per session.
- **When it appears:** Shop (S-002), Shop Corset Tops (S-003), Shop Womenswear (S-004).

### F-011 — Buy Now
- **What it does:**
  - A button that bypasses the cart and sends the customer directly to Shopify hosted checkout with the selected variant and quantity.
  - Disabled until a colour and size are selected.
- **When it appears:** Product Detail (S-005).

---

## 5. Data

| ID | What the Product Needs | Details |
|---|---|---|
| D-001 | Product Catalogue | Shopify Products via Storefront API. Each product has: a unique Shopify product ID, title, description, handle (for URL slug), list of images, priceRange, available variants (colour + size combinations), stock availability per variant, attributes, category tag (corset / womenswear), and attribute tags (closure type for corsets, type for womenswear). All prices in USD. |
| D-002 | Product Variants | Each product has variants by colour and size. Each variant has its own price (USD), inventory count, availability status, and a variant image. Available sizes per product are configured in Shopify; the storefront reads them from variant data rather than hardcoding a global size list. Even single-colour products have a named colour variant. |
| D-003 | Cart | Shopify Cart API. An anonymous cart is created on first "Add to Cart" and the `cartId` is stored in a cookie. Each cart line has: variant ID (which encodes product, colour, and size) and quantity. The cart persists server-side on Shopify. Cart provides a `checkoutUrl` for redirect to Shopify hosted checkout. |
| D-004 | Size Chart | Size chart values stored in cm. Inch values calculated and displayed alongside cm — both tables shown at once. |
| D-005 | Product Attributes | Each product has a structured list of attributes (closure system, silhouette, boning type, construction method, lacing style, etc.). Displayed inline as a list on the Product Detail page. Sourced from Shopify product data. |

---

## 6. Screens & Components

This section is the page-build source for SherShop. Each screen points to its outline in `planning-shershop.tsv`, names the features it uses, and lists its behaviour; the FE fills the section → component mapping and the Director produces the assets. Components (C-xxx) — drawers and global chrome — describe their content inline. Section 7 maps navigation links.

### S-001 — Home
- **What's on it:** (FE will update this)
  - Outline in `planning-shershop.tsv`
- **Required assets:** (Director will update this)
  - S-001.1 → 3-5x Hero Carousel image
  - S-001.4 → 1x Category image (Corset Tops)
  - S-001.5 → 1x Category image (Womenswear)
  - S-001.6 → 2x Featured Product image
  - S-001.7 → Influencer image strip
  - S-001.8 → 1x Brand image
- **Feature:** F-008 Hero Carousel
- **Behaviour:**
  - Sliding hero carousel.

### S-002 — Shop
- **What's on it:** (FE will update this)
  - Outline in `planning-shershop.tsv`
- **Required assets:** None
- **Feature:** F-010 View Toggle
- **Behaviour:**
  - Category pills navigate to category pages.
  - Product card navigates to the Product Detail page.
  - Grid view toggle.

### S-003 — Shop Corset Tops
- **What's on it:** (FE will update this)
  - Outline in `planning-shershop.tsv`
- **Required assets:** (Director will update this)
  - S-003.5 → 1x editorial image (About our Corset Tops)
- **Feature:** F-009 Attribute Filter, F-010 View Toggle
- **Behaviour:**
  - In-place attribute filter (closure type).
  - Grid view toggle.

### S-004 — Shop Womenswear
- **What's on it:** (FE will update this)
  - Outline in `planning-shershop.tsv`
- **Required assets:** (Director will update this)
  - S-004.5 → 1x editorial image (About our Womenswear)
- **Feature:** F-009 Attribute Filter, F-010 View Toggle
- **Behaviour:**
  - In-place attribute filter (womenswear type).
  - Grid view toggle.

### S-005 — Product Detail
- **What's on it:** (FE will update this)
  - Outline in `planning-shershop.tsv`
- **Required assets:** (Director will update this)
  - S-005.8 → 1x editorial image (The Corset Top, Rewritten — corsets only)
- **Feature:** F-001 Product Detail, F-002 Size Chart, F-011 Buy Now
- **Behaviour:**
  - Colour-linked media gallery.
  - Colour and size selection.
  - Add to cart / buy now.
  - Size-chart and shipping drawers.
  - Related products.

### S-006 — Corset Tops (Pillar)
- **What's on it:** (FE will update this)
  - Outline in `planning-shershop.tsv`
- **Required assets:** (Director will update this)
  - S-006.1 → 1x Hero image
  - S-006.2 → 1x editorial image (Structured Boning)
  - S-006.3 → 1x editorial image (Each Bone Set by Hand)
  - S-006.5 → 1x Closure image (Lace-Up)
  - S-006.6 → 1x Closure image (Zip)
  - S-006.7 → 1x Closure image (Lace & Zip)
  - S-006.8 → 1x editorial image (Built with High Quality)
- **Behaviour:**
  - FAQ accordion.

### S-007 — About Us
- **What's on it:** (FE will update this)
  - Outline in `planning-shershop.tsv`
- **Required assets:** (Director will update this)
  - S-007.1 → 1x Hero image
  - S-007.2 → 1x editorial image (Sensuality That Elevates)
  - S-007.3 → 1x editorial image (For the Woman who Notices)
  - S-007.4 → 1x editorial image (The Woman Behind It)
- **Behaviour:**
  - Static page.

### S-008 — Contact
- **What's on it:** (FE will update this)
  - Outline in `planning-shershop.tsv`
- **Required assets:** None
- **Behaviour:**
  - Static page; map and messaging links.

### S-009 — Shipping & Returns
- **What's on it:** (FE will update this)
  - Outline in `planning-shershop.tsv`
- **Required assets:** None
- **Behaviour:**
  - Static text page.

### S-010 — Privacy Policy
- **What's on it:** (FE will update this)
  - Outline in `planning-shershop.tsv`
- **Required assets:** None
- **Behaviour:**
  - Static text page.

### S-011 — Terms of Service
- **What's on it:** (FE will update this)
  - Outline in `planning-shershop.tsv`
- **Required assets:** None
- **Behaviour:**
  - Static text page.

### C-Sizing — Size Chart Drawer
- **What's on it:**
  - Product name at the top to confirm which product's sizes are shown.
  - Measurements in Centimeters table (Size, Bust, Waist, Length).
  - Measurements in Inches table (same columns), shown alongside cm — no toggle.
  - Disclaimer at the bottom: "All measurements are taken with the garment laying flat. For the best fit, we recommend comparing these measurements with a similar item you already own."

### C-Shipping — Shipping & Returns Drawer
- **What's on it:** Same content as the full Shipping & Returns page (S-009).

### C-Cart — Cart Drawer
- **What's on it:**
  - Free shipping threshold message at the top.
  - List of items, each showing: product image, name, colour, size, quantity stepper, price (USD), and a remove button.
  - Running subtotal at the bottom.
  - "Checkout" button.
  - Caption below the button: "Shipping and taxes calculated at checkout."
  - Empty state: "Your cart is empty" with a "Start Shopping" link.
- **Behaviour:**
  - Threshold message switches between "Spend $X more to get free shipping" and "You qualify for free shipping" based on the subtotal.
  - Quantity stepper and remove button update the cart; the subtotal recalculates.
  - "Checkout" redirects to Shopify hosted checkout (F-004).
  - Empty state shows when the cart is empty; "Start Shopping" navigates to S-002.

### C-Transparent — Transparent Header
- **What's on it:** See Section 7. Navigation
- **Required assets:**
  - logo-square-white.svg
- **Feature:** F-007 Rotating Announcement Bar
- **Behaviour:**
  - Home only (S-001): transparent and non-sticky; sits over the hero and scrolls away with the page.
  - Same nav as C-Sticky.

### C-Sticky — Sticky Header
- **What's on it:** See Section 7. Navigation
- **Required assets:**
  - logo-icon-dark.svg
- **Feature:** F-007 Rotating Announcement Bar
- **Behaviour:**
  - Solid, sticky header on every page; on Home it takes over after C-Transparent scrolls past 50vh.
  - On mobile, the nav collapses into C-Menu via a hamburger; Cart stays in the bar.

### C-Menu — Mobile Menu Drawer
- **What's on it:** See Section 7. Navigation
- **Behaviour:**
  - Opens from the header hamburger on mobile.
  - Holds the SHOP and LEARN nav and the account link; Cart stays in the bar.

### C-Footer — Footer
- **What's on it:** See Section 7. Navigation
- **Required assets:** None

---

## 7. Navigation

```
Header — every screen
 ├── SHOP
 │    ├── Shop Corset Tops → S-003
 │    ├── Shop Womenswear → S-004
 │    └── All Products → S-002
 ├── LEARN
 │    ├── Our Corset Tops → S-006
 │    └── About Us → S-007
 ├── Logo → S-001 Home
 ├── Account icon → account.sherbrand.co (external)
 └── Cart icon → opens C-Cart

Footer — every screen
 ├── SHOP
 │    ├── Shop Corset Tops → S-003
 │    ├── Shop Womenswear → S-004
 │    └── All Products → S-002
 ├── LEARN
 │    ├── Our Corset Tops → S-006
 │    └── About Us → S-007
 ├── CLIENT SERVICE
 │    ├── Shipping & Returns → S-009
 │    └── Contact Us → S-008
 ├── Brand → Instagram, Facebook, TikTok (external)
 └── Bottom row
      ├── Privacy Policy → S-010
      └── Terms of Service → S-011
```

---

## 8. Build Steps

These are in a suggested order. Each step builds on the one before it. Shared components (Section 6) are created the first time a screen needs them and reused after.

### Phase 1 — Foundation

| Step | What to Build | References |
|---|---|---|
| B-001 | Set up the Next.js project. Create a new Next.js 15 project with TypeScript and Tailwind CSS. Set up the basic folder structure. Apply tokens from DESIGN.md. | DESIGN.md |
| B-002 | Connect Shopify Storefront API. Set up a `shopifyFetch` GraphQL wrapper for all Storefront API calls. Configure environment variables. Fetch products and verify data loads correctly. Use real Shopify data from day one — no fake/sample data. | D-001, D-002 |

### Phase 2 — Storefront browse

| Step | What to Build | References |
|---|---|---|
| B-003 | Build the layout and navigation. Build the sticky header (announcement bar F-007, nav with Shop link, account icon, Cart icon), the footer (four-column layout with all links), and the C-Cart cart drawer shell. On the Home page (S-001), build the transparent header (non-sticky, with announcement bar) that transitions to the sticky header on scroll. | C-Transparent, C-Sticky, C-Footer, C-Cart, S-001, F-007 |
| B-004 | Build the Home page (S-001). Hero carousel (F-008), category cards, featured products, influencer strip, and brand section. | S-001, F-008 |
| B-005 | Build the Shop page (S-002). Hub layout with category filter pills, view toggle (F-010), and product grid showing all products. | S-002, F-010 |
| B-006 | Build the category pages (S-003, S-004). Hero, attribute filter pills (F-009), view toggle, product grid filtered by category, and "About our…" CTA section. | S-003, S-004, F-009, F-010 |

### Phase 3 — Product & cart

| Step | What to Build | References |
|---|---|---|
| B-007 | Build the Product Detail page (S-005). Media gallery, product info stack, colour and size selectors, quantity selector, Add to Cart and Buy Now (F-011), attributes list (D-005), drawer links, "The Corset Top, Rewritten" section (corsets only), and "You May Also Like". | S-005, D-005, F-011 |
| B-008 | Build the Size Chart drawer (C-Sizing) and Shipping & Returns drawer (C-Shipping). | C-Sizing, C-Shipping, F-002, D-004 |
| B-009 | Build the Cart logic (F-003) and wire up the C-Cart cart drawer content. Shopify cart creation, add/remove/update line items, cookie-based cart ID, header badge count, free shipping threshold message. | F-003, D-003, C-Cart |

### Phase 4 — Content, SEO & launch

| Step | What to Build | References |
|---|---|---|
| B-010 | Build all static pages (S-006 Corset Tops, S-007 About Us, S-008 Contact, S-009 Shipping & Returns, S-010 Privacy Policy, S-011 Terms of Service). For each, read the page outline in `planning-shershop.tsv` (linked from Section 6) + DESIGN.md + brand-sher.md, then build. Pages using the shared text-page layout plug in Markdown content; pages with custom layouts (S-006, S-007, S-008) follow their outlines in the plan. S-006 includes the FAQ accordion. | S-006, S-007, S-008, S-009, S-010, S-011 |
| B-011 | Add SEO (F-006). `generateMetadata` per page, JSON-LD on Product Detail. Internal linking follows the plan's pillar/cluster structure. | F-006 |
| B-012 | Responsive polish. Test and fix all pages and drawers across mobile, tablet, and desktop breakpoints. | F-005 |
| B-013 | Deploy to Vercel. Connect repo, set environment variables, configure sherbrand.co domain. | — |

---

## 9. Extra Details

### Connectivity
- Yes, the store needs the internet. Almost everything (products, prices, cart, checkout) is powered by Shopify's APIs.

### Storage
- Minimal. The store uses cookies and session storage for:
  - The Shopify `cartId` (cookie, so the cart persists between visits).
  - View Toggle preference (session storage).
  - Filter state is reflected in URL query parameters.

### Accessibility
- All images should have alt text.
- Buttons and text should be large enough to tap comfortably on mobile.
- Semantic HTML throughout.

### Security & Privacy
- Payment runs entirely through Shopify hosted checkout — the storefront never sees or stores card data.
- Customer accounts and personal data live with Shopify, not the storefront.
- Secrets (`SHOPIFY_STOREFRONT_ACCESS_TOKEN`, store domain) stay server-side; never exposed in client bundles.
- All Shopify API calls run server-side (Server Components, Server Actions).

### Integrations / External Services
- **Shopify Storefront API** — products, variants, inventory, and cart.
- **Shopify hosted checkout** — payment, shipping, tax, discounts, and order creation (via the cart's `checkoutUrl`).
- **Shopify hosted account** — customer accounts at `account.sherbrand.co`.
- **Vercel** — hosting and deployment for `sherbrand.co`.

### Environment / Config
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `SHOPIFY_STORE_DOMAIN`
- `NEXT_PUBLIC_SITE_URL` (sherbrand.co)

### Features Excluded — Do Not Build

| Feature | Target | Notes |
|---|---|---|
| Share Product | v4 | Share icon on Product Detail page. |
| Localization / Multi-language | v5 | English only in v3; build so more languages can be added later. |
| Native Customer Account Pages | v6 | Build `/account` on the storefront. In v3, the account icon links to Shopify's hosted account page at `account.sherbrand.co`. |
| Wishlist | Backlog | No heart icons, no saved items. |
| Search | Backlog | No search bar, no keyword search. |
| Dark Mode | Backlog | Light mode only. |
| Discount Code Input on the Storefront | No plan | Handled by Shopify at checkout. |
| Multiple Addresses on the Storefront | No plan | Managed at Shopify Hosted Checkout. |
| Product Reviews or Ratings | No plan | |
| Live Chat or Customer Support | No plan | |

### Active Items

Every US, F, and D in effect after this version. The next version reads this for its running ID maxes.

| ID | Name | Status |
|---|---|---|
| US-001 | Browse full catalogue | Active |
| US-002 | View product details | Active |
| US-003 | See size chart | Active |
| US-004 | See product attributes | Active |
| US-005 | Add to cart with size and colour | Active |
| US-006 | View and adjust cart | Active |
| US-007 | Secure checkout | Active |
| US-008 | Navigate to a category listing | Active |
| US-009 | Filter a category by attribute | Active |
| US-010 | Toggle grid 2-column / 3-column | Active |
| US-011 | Buy a single product directly | Active |
| F-001 | Product Detail | Active |
| F-002 | Size Chart | Active |
| F-003 | Shopping Cart | Active |
| F-004 | Shopify Hosted Checkout | Active |
| F-005 | Responsive Layout | Active |
| F-006 | SEO | Active |
| F-007 | Rotating Announcement Bar | Active |
| F-008 | Hero Carousel | Active |
| F-009 | Attribute Filter | Active |
| F-010 | View Toggle | Active |
| F-011 | Buy Now | Active |
| D-001 | Product Catalogue | Active |
| D-002 | Product Variants | Active |
| D-003 | Cart | Active |
| D-004 | Size Chart | Active |
| D-005 | Product Attributes | Active |
