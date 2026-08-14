> **This document defines version v3 of the product. Earlier versions hold what came before; the Active Items list shows everything in effect now. Page outline and structure live in the Planning TSV; styling lives in the design system file; brand voice lives in the brand doc. Do not add features, screens, or data the plan doesn't call for.**

---

# SHER — Web Store Requirements Document

**Platform:** Web. Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Shopify Storefront API, Shopify hosted checkout, deployed on Vercel.
**Version:** v3

## 1. Main Goals
1. Sell all three SHER categories from one store, with Shopify handling payment.
2. Give each category its own page that can rank on its head term.
3. Keep the path from landing to cart short.
4. Build for the phone first, then the larger screen.

## 2. User Stories
| ID | Story |
|---|---|
| US-001 | As a customer, I want to see the whole range in one place so I can start anywhere. |
| US-002 | As a customer, I want to browse one category at a time so I only see what I came for. |
| US-003 | As a customer, I want to filter a category by its type so I can narrow it down fast. |
| US-004 | As a customer, I want to change how many products fit across the screen so I can scan or look closer. |
| US-005 | As a customer, I want the rest of the products to load when I ask so the first view stays quick. |
| US-006 | As a customer, I want to see a product's photos and video so I know what I am buying. |
| US-007 | As a customer, I want to check the size chart so I pick the right size. |
| US-008 | As a customer, I want to pick a size and a quantity so I order the right piece. |
| US-009 | As a customer, I want to add a piece to my cart so I can keep shopping. |
| US-010 | As a customer, I want to see my cart and change it before I pay. |
| US-011 | As a customer, I want an empty cart to say so and point me back to the shop. |
| US-012 | As a customer, I want to pay securely so my order goes through. |
| US-013 | As a customer, I want a way to ask about a piece that is sold out so I can still order it. |

## 3. Features

### F-001 — Product Grid
- **What it does:** Shows every product in a collection as a grid of cards, one column on mobile and two on desktop. Each card shows the image named in the repo product data, or the product's first image when none is named. On desktop the card swaps to the next image while the pointer is over it; on tablet and phone it swaps while a finger is held down, and goes back on release. A card with no second image does not swap. "Load More" reveals the next 12 and keeps any active filter and column choice. A divider sits under the grid once nothing is left.
- **When it appears:** On S-002, S-003, S-004, and S-005, and as the related block on S-006.
- **If something goes wrong:** If the product list fails to load, the page shows a short message and a retry. If one image fails, the card shows the placeholder and the rest of the grid still works.

### F-002 — Column View Toggle
- **What it does:** Switches how many products fit across the grid: 1 or 2 on mobile, 2 or 3 on desktop. The toggle sticks to the bottom left once it scrolls out of view.
- **When it appears:** Above the grid on S-002, S-003, S-004, and S-005.
- **If something goes wrong:** If the choice cannot be kept, the grid falls back to the default column count.

### F-003 — Category Filter
- **What it does:** Filters the grid in place by the category's type attribute: closure type on corset tops, set type on matching sets, length on cocktail dresses. The filter is a row of pills, and picking one narrows the grid without a page load.
- **When it appears:** Above the grid on S-003, S-004, and S-005.
- **If something goes wrong:** If a filter returns nothing, the page says so and offers a way back to the full category.

### F-004 — Product Media Gallery
- **What it does:** Shows a main viewer with a thumbnail strip. The order is fixed: video first, then images. The video thumbnail carries a play icon. On load the main viewer shows the first image while the video loads, then switches to the video and plays it muted, looped, and inline. Tapping a thumbnail sets the main image. If the browser asks for reduced motion, nothing auto-switches and nothing autoplays.
- **When it appears:** At the top of S-006.
- **If something goes wrong:** If the video fails to load, the viewer stays on the first image. If an image fails, its thumbnail is skipped.

### F-005 — Size and Stock Selection
- **What it does:** Lists the product's sizes and lets the customer pick one. Sizes that are out of stock are shown but cannot be picked. When every size is sold out, the Add to Cart and Buy Now buttons are replaced by a Preorder link to S-008.
- **When it appears:** In the buy panel on S-006.
- **If something goes wrong:** If stock cannot be read, no size is pickable and the page shows the Preorder link instead.

### F-006 — Add to Cart
- **What it does:** Takes the chosen size and quantity, adds the item to the cart, and opens C-Cart. The cart is created on the first add, not on page load.
- **When it appears:** From the Add to Cart button on S-006.
- **If something goes wrong:** If the add fails, the item is not added and the button shows a short error so the customer can try again.

### F-007 — Cart
- **What it does:** Holds the chosen items and shows each one with its image, name, options, quantity stepper, price, and a remove control, plus a running subtotal. Changing a quantity or removing an item updates the cart and the subtotal. When the cart has nothing in it, it shows an empty state. The header shows the item count, hidden when the cart is empty.
- **When it appears:** In C-Cart, opened from the cart icon in the header or after an add to cart.
- **If something goes wrong:** If an update fails, the cart keeps its last known state and shows a short error.

### F-008 — Checkout Handoff
- **What it does:** Sends the customer to Shopify's hosted checkout using the cart's checkout URL. Payment settles in USD through the gateway set up in Shopify.
- **When it appears:** From the Checkout button in C-Cart, and from Buy Now on S-006.
- **If something goes wrong:** If the checkout URL is missing, the button shows a short error and the cart stays open.

### F-009 — Size Chart
- **What it does:** Shows the product's measurements in a drawer, in cm and in inches. The cm figures come from the repo product data, and the inch figures are worked out from them. Only the measurements a product defines are shown; one it leaves out is left out of the table.
- **When it appears:** In C-Sizing, opened from the View Size Chart link on S-006.
- **If something goes wrong:** If a product has no measurements, the drawer shows the general sizing note and points to S-008.

### F-010 — Hero Carousel
- **What it does:** Slides through featured banners at the top of the home page. Each banner carries its image, alt text, overlay text, and link, all from the repo home content.
- **When it appears:** At the top of S-001.
- **If something goes wrong:** If a banner image fails, that slide is skipped. With only one banner it does not slide.

### F-011 — Featured Products
- **What it does:** Shows two hand-picked products on the home page. The repo home content names the slot and the product handle, and the product name, image, and link come from the Storefront API.
- **When it appears:** In the Featured Products block on S-001.
- **If something goes wrong:** If a handle no longer matches a live product, that slot is left out.

### F-012 — Category Cards
- **What it does:** Shows the four image links into the three categories and the full shop. Each card's image, alt text, overlay text, and link come from the repo home content.
- **When it appears:** In the category block on S-001.
- **If something goes wrong:** If a card's image fails, the card still links, with its overlay text on the fallback background.

## 4. Data
| ID | Data Item | Source | Details |
|---|---|---|---|
| D-001 | Product | Shopify Storefront API | Name, handle, description, price, images, video, sizes and their stock, and the type attribute metafield (closure type, set type, or length). |
| D-002 | Collection | Shopify Storefront API | The three category collections and the full product list, each holding its products in order, read by handle. |
| D-003 | Cart | Shopify Storefront API | The cart and its line items, quantities, subtotal, and checkout URL. The cart ID is kept in a cookie. |
| D-004 | Home Content | A file in the repo | Drives the home page blocks: each hero banner and category card with its image, alt text, overlay text, and link, plus the two featured product slots and their product handles. |
| D-005 | Product Content | A file in the repo | Per product: which image the grid shows, and the size chart measurements in cm. |

## 5. Screens

### S-001 — Home
- **Outline:** Refer to /docs/content/s-001_home.md
- **Feature:** F-010 Hero Carousel, F-011 Featured Products, F-012 Category Cards
- **Behavior:**
  - C-Transparent sits over the hero, then gives way to C-Sticky once the hero scrolls out of view.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-002 — All Products
- **Outline:** Refer to /docs/content/s-002_all-products.md
- **Feature:** F-001 Product Grid, F-002 Column View Toggle
- **Behavior:**
  - The pills link to the three category pages. They do not filter this grid.
  - The grid holds every product in the store.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-003 — Corset Tops
- **Outline:** Refer to /docs/content/s-003_corset-tops.md
- **Feature:** F-001 Product Grid, F-002 Column View Toggle, F-003 Category Filter
- **Behavior:**
  - The pills filter the grid by closure type.
  - The FAQ accordion opens one item at a time.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-004 — Matching Sets
- **Outline:** Refer to /docs/content/s-004_matching-sets.md
- **Feature:** F-001 Product Grid, F-002 Column View Toggle, F-003 Category Filter
- **Behavior:**
  - The pills filter the grid by set type.
  - The FAQ accordion opens one item at a time.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-005 — Cocktail Dresses
- **Outline:** Refer to /docs/content/s-005_cocktail-dresses.md
- **Feature:** F-001 Product Grid, F-002 Column View Toggle, F-003 Category Filter
- **Behavior:**
  - The pills filter the grid by length.
  - The FAQ accordion opens one item at a time.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-006 — Product Detail
- **Outline:** Refer to /docs/content/s-006_product-detail.md
- **Feature:** F-001 Product Grid, F-004 Product Media Gallery, F-005 Size and Stock Selection, F-006 Add to Cart, F-008 Checkout Handoff, F-009 Size Chart
- **Behavior:**
  - The breadcrumb cuts the product name with an ellipsis on small screens. The full name stays in the markup.
  - View Size Chart opens C-Sizing. Shipping & Returns opens C-Shipping.
  - The type attribute sits beside the description, and reads closure type on corset tops, set type on matching sets, and length on cocktail dresses.
  - The related block shows two random products from the same category.
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
  - The social links open each app's message thread. The email address opens the mail app.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-009 — Shipping & Returns
- **Outline:** Refer to /docs/content/s-009_shipping-returns.md
- **Feature:** None
- **Behavior:**
  - This page and C-Shipping hold the same copy.
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
- **Outline:** `Announcement Bar ["Delivers Worldwide · Free Shipping over $250"] // Hamburger Icon <opens C-Menu> | White Square Logo <to /, oversized — overflows below the header> | Cart Icon <opens C-Cart> [Item Count]`
- **Feature:** F-007 Cart
- **Behavior:**
  - Home only. It is see-through, does not stick, and scrolls away with the page.
  - The item count shows how many items are in the cart, and is hidden when the cart is empty.
  - The hamburger opens C-Menu. The cart icon opens C-Cart.

### C-Sticky — Sticky Header
- **Outline:** `Announcement Bar ["Delivers Worldwide · Free Shipping over $250"] // Hamburger Icon <opens C-Menu> | Dark Symbol Logo <to /> | Cart Icon <opens C-Cart> [Item Count]`
- **Feature:** F-007 Cart
- **Behavior:**
  - Sticks to the top of every screen. On Home it takes over once the hero scrolls out of view.
  - The item count shows how many items are in the cart, and is hidden when the cart is empty.
  - The hamburger opens C-Menu. The cart icon opens C-Cart.

### C-Menu — Menu Drawer
- **Outline:** `Dark Symbol Logo <to /> // "Shop Now" / "Link: Corset Tops" <to /corset-tops> / "Link: Matching Sets" <to /matching-sets> / "Link: Cocktail Dress" <to /cocktail-dresses> / "Link: Shop All" <to /shop> // "Link: Our Story" <to /about> / "Link: Contact Us" <to /contact> / Account "Link: Login/Account" <to Shopify account>`
- **Feature:** None
- **Behavior:**
  - Opens from the hamburger on any screen, and closes on the close control, a tap outside, or a link tap.
  - The account link goes to Shopify's hosted customer accounts.

### C-Cart — Cart Drawer
- **Outline:** `"Your Cart" // Line Items <image, name, options, qty stepper, price, remove> // Subtotal // "Btn: Checkout" / "Checkout securely in USD, powered by Shopify"`
- **Feature:** F-007 Cart, F-008 Checkout Handoff
- **Behavior:**
  - Opens from the cart icon on any screen, and after an add to cart. Closes on the close control or a tap outside.
  - Changing an item's quantity or removing it updates the cart and the subtotal.
  - Checkout opens Shopify's hosted checkout, which settles through the gateway set up in Shopify.
  - Shows an empty state when the cart is empty.

### C-Footer — Footer
- **Outline:** `Logo <to /> // (("Shop & Learn" / "Link: Corset Tops" <to /corset-tops> / "Link: Matching Sets" <to /matching-sets> / "Link: Cocktail Dress" <to /cocktail-dresses> / "Link: Shop All" <to /shop>) | ("More Info" / "Link: Our Story" <to /about> / "Link: Contact Us" <to /contact> / "Link: Shipping & Returns" <to /shipping-returns>) | ("Connect with Us" / (Instagram Icon <to Instagram> + Facebook Icon <to Facebook> + TikTok Icon <to TikTok>))) // ("© SHER {year}" | ("Link: Privacy Policy" <to /privacy-policy> + "Link: Terms of Service" <to /terms-of-service>))`
- **Feature:** None
- **Behavior:**
  - Sits at the foot of every screen. The year in the copyright line is the current year.
  - The social icons open each account in a new tab.

### C-Sizing — Size Chart Drawer
- **Outline:** `"Size Chart" / Title <product name> / Paragraph <measurements-based; varies by style; each piece can be tailored; contact SHER if unsure> / Measurements <in cm> / Measurements <in inches>`
- **Feature:** F-009 Size Chart
- **Behavior:**
  - Opens from the View Size Chart link on the product page, and closes on the close control or a tap outside.
  - Shows only the measurements the product defines. One it leaves out, such as no hip on a corset top, is left out of the table.

### C-Shipping — Shipping & Returns Drawer
- **Outline:** `(same as /shipping-returns)`
- **Feature:** None
- **Behavior:**
  - Opens from the Shipping & Returns link on the product page, and closes on the close control or a tap outside.
  - Holds the same copy as S-009.

## 7. Navigation

```
Header — every screen (C-Transparent on Home over the hero, C-Sticky elsewhere and after scroll)
 ├── Hamburger → opens C-Menu
 ├── Logo → S-001
 └── Cart → opens C-Cart

Menu Drawer (C-Menu)
 ├── Shop Now
 │    ├── Corset Tops → S-003
 │    ├── Matching Sets → S-004
 │    ├── Cocktail Dress → S-005
 │    └── Shop All → S-002
 ├── Our Story → S-007
 ├── Contact Us → S-008
 └── Login/Account → Shopify hosted customer accounts

Footer — every screen (C-Footer)
 ├── Logo → S-001
 ├── Shop & Learn
 │    ├── Corset Tops → S-003
 │    ├── Matching Sets → S-004
 │    ├── Cocktail Dress → S-005
 │    └── Shop All → S-002
 ├── More Info
 │    ├── Our Story → S-007
 │    ├── Contact Us → S-008
 │    └── Shipping & Returns → S-009
 ├── Connect with Us
 │    └── Instagram, Facebook, TikTok → external
 ├── Privacy Policy → S-010
 └── Terms of Service → S-011

In-page
 ├── S-002 pills → S-003, S-004, S-005
 ├── S-001 category cards → S-003, S-004, S-005, S-002
 ├── Product card or featured product → S-006
 ├── S-006 breadcrumb and "Back to {Category}" → S-003, S-004, S-005
 ├── S-006 View Size Chart → opens C-Sizing
 ├── S-006 Shipping & Returns → opens C-Shipping
 ├── S-006 Preorder (all sizes sold out) → S-008
 └── Checkout and Buy Now → Shopify hosted checkout
```

## 8. Build Steps

### Phase 1 — Foundation
| Step | What to Build | References |
|---|---|---|
| B-001 | Set up the Next.js app, TypeScript, Tailwind, and the design tokens, and put it on Vercel so every later step ships. | |
| B-002 | Build the single Shopify fetch wrapper and the product and collection queries, with types. Prove it against the live store. | D-001, D-002 |
| B-003 | Build the global chrome and wire the navigation: both headers, the menu drawer, and the footer. | C-Transparent, C-Sticky, C-Menu, C-Footer |

### Phase 2 — Browse
| Step | What to Build | References |
|---|---|---|
| B-004 | Build the grid, the column toggle, and the category filter, then use them for the shop page and the three category pages. | F-001, F-002, F-003, S-002, S-003, S-004, S-005, D-005 |
| B-005 | Build the product page: media gallery, buy panel, size and stock states, related products, and the size chart drawer. | F-004, F-005, F-009, S-006, C-Sizing, D-005 |

### Phase 3 — Buy
| Step | What to Build | References |
|---|---|---|
| B-006 | Build the cart: add to cart, the cart drawer, quantity and remove, the empty state, the cookie, and the handoff to Shopify checkout. | F-006, F-007, F-008, C-Cart, D-003 |

### Phase 4 — Content
| Step | What to Build | References |
|---|---|---|
| B-007 | Build the home page blocks from the repo home content: hero carousel, category cards, and featured products. | F-010, F-011, F-012, S-001, D-004 |
| B-008 | Build the static pages from their content files, and the shipping drawer that shares the shipping copy. | S-007, S-008, S-009, S-010, S-011, C-Shipping |

### Phase 5 — Launch
| Step | What to Build | References |
|---|---|---|
| B-009 | Add metadata, canonical URLs, Open Graph images, sitemap, and product JSON-LD across every screen. | S-001 to S-011 |
| B-010 | Run the launch gate: performance, accessibility, and a full pass on the buy flow on a real phone. | |

## 9. Extra Details

### Connectivity
The store needs the internet. Products, prices, stock, the cart, and checkout all come from Shopify, so without a connection a page cannot load or update. Page copy, the home content, and the product content ship with the site, so they render as soon as the page does.

### Storage
The client keeps the Shopify cart ID in a cookie, so the cart survives navigation and refresh. The filter and column choice last only while the page is open. Everything else, including orders and customer accounts, is held by Shopify.

### Accessibility
Every screen meets WCAG 2.1 AA. That means keyboard access for the drawers, filters, and gallery, a visible focus state, alt text on every image, headings that follow their level, and no autoplay or auto-switch when the browser asks for reduced motion.

### Performance
Every screen scores 90 or better on Lighthouse for performance, accessibility, best practices, and SEO on mobile. Images go through the Shopify CDN and are sized for their slot, and data-fetching sections load behind skeletons that match the final shape.

### Security & Privacy
The store never handles a card number, an address, or a password. Shopify's hosted checkout takes payment, and Shopify's hosted accounts handle login. The Storefront API token stays server-side and never ships in the browser bundle.

### Integrations / External Services
- Shopify Storefront API: products, collections, and the cart.
- Shopify hosted checkout: payment, tax, shipping, and discounts.
- Shopify hosted customer accounts: login and order history.
- Shopify CDN: product images and video.
- The payment gateway set up in Shopify: settles in USD.
- Vercel: hosting and deployment.
- Instagram, Facebook, and TikTok: outbound links from the footer and the contact page.

### Environment / Config
- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `SHOPIFY_API_VERSION`
- `NEXT_PUBLIC_SITE_URL`

### Active Items
None
