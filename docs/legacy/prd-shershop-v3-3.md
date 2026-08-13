> **This document defines version v3 of the product. Earlier versions hold what came before; the Active Items list shows everything in effect now. Page outline and structure live in the Planning TSV; styling lives in the design system file; brand voice lives in the brand doc. Do not add features, screens, or data the plan doesn't call for.**

---

# SHER — Web Store Requirements Document

**Platform:** Web. Next.js 15 (App Router), TypeScript, Tailwind CSS, Shopify Storefront API, Shopify hosted checkout and accounts, deployed on Vercel.
**Version:** v3

## 1. Main Goals

1. Sell online end to end: a shopper can find a piece, pick a size, and pay.
2. Give each of the three categories its own pillar page, built to rank for its head term.
3. Show every product in full: video, photos, price, sizes, and measurements.
4. Answer the buying questions on the page, so fewer shoppers leave to ask.
5. Ship the whole site, including the brand story, contact, and the policy pages.

## 2. User Stories

| ID | Story |
|---|---|
| US-001 | As a customer, I want to see the whole range in one place so I can start without picking a category first. |
| US-002 | As a customer, I want to browse one category so I only see the pieces I came for. |
| US-003 | As a customer, I want to filter a category by its type so I find the closure, set, or length I want. |
| US-004 | As a customer, I want to change how many products sit in a row so I can scan fast or look close. |
| US-005 | As a customer, I want to load more products without leaving the page so I keep my place. |
| US-006 | As a customer, I want to watch the product video and see the photos so I know how a piece moves and fits. |
| US-007 | As a customer, I want to read the product details and pick my size so I order the right one. |
| US-008 | As a customer, I want the size chart in cm or inches so I can measure before I buy. |
| US-009 | As a customer, I want shipping and returns on the product page so I know the terms before I pay. |
| US-010 | As a customer, I want to add a piece to my cart and keep shopping. |
| US-011 | As a customer, I want to review my cart and change or remove a piece before I pay. |
| US-012 | As a customer, I want to pay securely so my order is placed. |
| US-013 | As a customer, I want to buy one piece straight away, skipping the cart. |
| US-014 | As a customer, I want a clear empty cart so I know nothing is in it and can get back to shopping. |
| US-015 | As a customer, I want a way to ask about a sold-out piece so I can still order it. |

## 3. Features

### F-001 — Product Grid & Load More
- **What it does:** Renders a collection as a grid of product cards (thumbnail, name, price), 12 at a time. Load More reveals the next 12 and keeps the active filter and column choice. The button hides once nothing is left.
- **When it appears:** On load of S-002, S-003, S-004, and S-005.
- **If something goes wrong:** If the collection fails to load, the grid shows an error state with a retry. If the collection is empty, it shows a short empty message instead of the grid.

### F-002 — Type Filter
- **What it does:** Filters a category grid in place by the product's Type Attribute: closure type on S-003, set type on S-004, length on S-005. Tapping the active pill again clears it.
- **When it appears:** The pills sit above the grid on S-003, S-004, and S-005.
- **If something goes wrong:** A product with no value for that attribute shows in the unfiltered grid only. If a filter matches nothing, the grid shows an empty message and the pills stay usable.

### F-003 — Grid View Toggle
- **What it does:** Switches grid columns: 1 or 2 on mobile, 2 or 3 on desktop. The toggle sticks to the bottom-left once it scrolls out of view. The choice holds while the shopper browses.
- **When it appears:** Above the grid on S-002, S-003, S-004, and S-005.
- **If something goes wrong:** With no stored choice, the grid falls back to 1 column on mobile and 2 on desktop.

### F-004 — Hero Carousel
- **What it does:** Slides through the featured banners at the top of Home. Each slide holds an image, its overlay text, and a link, read from D-004.
- **When it appears:** At the top of S-001, on load.
- **If something goes wrong:** A slide whose image is missing is skipped. If D-004 holds no banner rows, the carousel is left out and the page starts at the next section. With reduced motion on, the slides do not auto-advance.

### F-005 — Home Content Blocks
- **What it does:** Fills the Home category tiles and featured product tiles from D-004, by slot: image, alt text, overlay text, and link.
- **When it appears:** On load of S-001, below the hero.
- **If something goes wrong:** A slot with no row is left out and the rest of the block keeps its layout.

### F-006 — Cart
- **What it does:** Adds a chosen size to the cart, holds the line items, changes a line's quantity, removes a line, and shows the subtotal. The Shopify cart is created on the first add, and its ID sits in a cookie so the cart survives navigation and refresh.
- **When it appears:** Add to Cart on S-006 opens C-Cart. The header cart icon opens C-Cart on every screen.
- **If something goes wrong:** If a size sells out between load and add, the cart is left as it was and the drawer shows the reason. If the cart ID is stale or gone, the next add starts a fresh cart.

### F-007 — Checkout Handoff
- **What it does:** Sends the shopper to Shopify's hosted checkout using the cart's `checkoutUrl`. Checkout in C-Cart takes the whole cart. Buy Now on S-006 adds the chosen size, then goes straight there. The order settles in USD through the gateway set up in Shopify.
- **When it appears:** The Checkout button in C-Cart, and Buy Now on S-006.
- **If something goes wrong:** If no `checkoutUrl` comes back, the drawer stays open and shows a retry. The cart is not cleared.

### F-008 — Size Chart
- **What it does:** Shows the product's measurements in cm from D-005, and the same numbers converted to inches. Only the measurements that product defines are rendered; one it omits is left out of the table.
- **When it appears:** The size chart link on S-006 opens C-Sizing.
- **If something goes wrong:** If the product has no row in D-005, the link is hidden.

## 4. Data

| ID | Data Item | Source | Details |
|---|---|---|---|
| D-001 | Product | Shopify Storefront API | Name, handle, description, price, images, video, size variants with stock, and the Type Attribute metafield (closure type, set type, or length). |
| D-002 | Collection | Shopify Storefront API | The four collections behind S-002 to S-005, queried by handle, each with its products. Paging is cursor-based. |
| D-003 | Cart | Shopify Storefront API cart; the cart ID in a browser cookie | Line items (variant and quantity), subtotal, and `checkoutUrl`. |
| D-004 | Home content | `/docs/content/home.tsv` in the repo | One row per Home slot: slot name, image path, alt text, overlay text, and link. Covers the hero banners, the category tiles, and the featured products. |
| D-005 | Product repo data | `/docs/content/products.tsv` in the repo | One row per Shopify product handle: which image to use as the grid thumbnail, and the size chart measurements in cm, per size. |

## 5. Screens

### S-001 — Home
- **Outline:** Refer to /docs/content/s-001_home.md
- **Feature:** F-004 Hero Carousel, F-005 Home Content Blocks
- **Behavior:**
  - C-Transparent sits over the hero. C-Sticky takes over once the hero scrolls out of view.
  - The hero carousel slides through its banners.
  - Category tiles link to /corset-tops, /matching-sets, /cocktail-dresses, and /shop.
  - Featured product tiles link to their product page.
- **Components & Assets:**
  - (to be updated later)

### S-002 — All Products
- **Outline:** Refer to /docs/content/s-002_all-products.md
- **Feature:** F-001 Product Grid & Load More, F-003 Grid View Toggle
- **Behavior:**
  - The button pills link to S-003, S-004, and S-005. They do not filter.
  - The grid renders every product in the collection. Load More reveals the next 12 and keeps the column choice.
  - The view toggle sticks to the bottom-left once it scrolls out of view.
  - Each card uses the thumbnail named in D-005, falling back to the product's first image.
- **Components & Assets:**
  - (to be updated later)

### S-003 — Corset Tops
- **Outline:** Refer to /docs/content/s-003_corset-tops.md
- **Feature:** F-001 Product Grid & Load More, F-002 Type Filter, F-003 Grid View Toggle
- **Behavior:**
  - The button pills filter the grid in place by closure type.
  - The grid renders every product in the collection. Load More reveals the next 12 and keeps the active filter and column choice.
  - The view toggle sticks to the bottom-left once it scrolls out of view.
  - Each card uses the thumbnail named in D-005, falling back to the product's first image.
  - The FAQ accordion holds one item open at a time.
- **Components & Assets:**
  - (to be updated later)

### S-004 — Matching Sets
- **Outline:** Refer to /docs/content/s-004_matching-sets.md
- **Feature:** F-001 Product Grid & Load More, F-002 Type Filter, F-003 Grid View Toggle
- **Behavior:**
  - The button pills filter the grid in place by set type.
  - The grid renders every product in the collection. Load More reveals the next 12 and keeps the active filter and column choice.
  - The view toggle sticks to the bottom-left once it scrolls out of view.
  - Each card uses the thumbnail named in D-005, falling back to the product's first image.
  - The FAQ accordion holds one item open at a time.
- **Components & Assets:**
  - (to be updated later)

### S-005 — Cocktail Dresses
- **Outline:** Refer to /docs/content/s-005_cocktail-dresses.md
- **Feature:** F-001 Product Grid & Load More, F-002 Type Filter, F-003 Grid View Toggle
- **Behavior:**
  - The button pills filter the grid in place by length.
  - The grid renders every product in the collection. Load More reveals the next 12 and keeps the active filter and column choice.
  - The view toggle sticks to the bottom-left once it scrolls out of view.
  - Each card uses the thumbnail named in D-005, falling back to the product's first image.
  - The FAQ accordion holds one item open at a time.
- **Components & Assets:**
  - (to be updated later)

### S-006 — Product Detail
- **Outline:** `Media Gallery <thumbnail strip + main image; fixed order: video then images> | (Breadcrumb <Shop › {Category} (to /{category}) › product> / Title <product name> / Price <product price> / Size Selector <available sizes> / (Quantity Selector <qty> + Btn ["Add to Cart"] + Btn ["Buy Now"]) / (Paragraph <product description> + Type Attribute <closure type for corsets, set type for matching sets, length for cocktail dresses>) / (Link <opens C-Sizing> + Link <opens C-Shipping>)) // ("H2: You May Also Like" / Subtitle <see the full category> / Btn <to /{category}> ["Back to {Category}"]) | Product Grid <2 random products from the same category>`
- **Feature:** F-006 Cart, F-007 Checkout Handoff, F-008 Size Chart
- **Behavior:**
  - Media gallery: tapping a thumbnail sets the main image. The video is the first thumbnail, marked with a play icon.
  - On load the main viewer shows the first image while the video loads. Once loaded, it switches to the video and plays it muted, looped, and inline.
  - With reduced motion on, there is no auto-switch and no autoplay.
  - The breadcrumb truncates the product name with an ellipsis on small screens. The full name stays in the markup.
  - Sold-out sizes are disabled in the size selector.
  - When every size is sold out, the buy buttons swap to a Preorder link to /contact.
  - Add to Cart opens C-Cart. Buy Now goes to Shopify checkout.
  - The size chart link opens C-Sizing. The shipping link opens C-Shipping.
  - The Type Attribute is a Shopify product metafield exposed to the Storefront API.
  - "You May Also Like" shows 2 random products from the same category.
- **Components & Assets:**
  - (to be updated later)

### S-007 — About Us
- **Outline:** Refer to /docs/content/s-007_about-us.md
- **Feature:** None
- **Behavior:**
  - None
- **Components & Assets:**
  - (to be updated later)

### S-008 — Contact
- **Outline:** Refer to /docs/content/s-008_contact.md
- **Feature:** None
- **Behavior:**
  - None
- **Components & Assets:**
  - (to be updated later)

### S-009 — Shipping & Returns
- **Outline:** Refer to /docs/content/s-009_shipping-returns.md
- **Feature:** None
- **Behavior:**
  - None
- **Components & Assets:**
  - (to be updated later)

### S-010 — Privacy Policy
- **Outline:** Refer to /docs/content/s-010_privacy-policy.md
- **Feature:** None
- **Behavior:**
  - None
- **Components & Assets:**
  - (to be updated later)

### S-011 — Terms of Service
- **Outline:** Refer to /docs/content/s-011_terms-of-service.md
- **Feature:** None
- **Behavior:**
  - None
- **Components & Assets:**
  - (to be updated later)

## 6. Layout Components

### C-Transparent — Transparent Header
- **Outline:** `Announcement Bar ["Delivers Worldwide · Free Shipping over $250"] // Hamburger Icon <opens C-Menu> | White Square Logo <to /, oversized — overflows below the header> | Cart Icon <opens C-Cart>`
- **Feature:** None
- **Behavior:**
  - Home only. Transparent and non-sticky, so it scrolls away with the page.
  - The hamburger opens C-Menu. The cart icon opens C-Cart.

### C-Sticky — Sticky Header
- **Outline:** `Announcement Bar ["Delivers Worldwide · Free Shipping over $250"] // Hamburger Icon <opens C-Menu> | Dark Symbol Logo <to /> | Cart Icon <opens C-Cart>`
- **Feature:** None
- **Behavior:**
  - Sticky on every screen. On Home it takes over once the hero scrolls out of view.
  - The hamburger opens C-Menu. The cart icon opens C-Cart.

### C-Menu — Menu Drawer
- **Outline:** `Dark Symbol Logo <to /> // "Shop Now" / Link <to /corset-tops> ["Corset Tops"] / Link <to /matching-sets> ["Matching Sets"] / Link <to /cocktail-dresses> ["Cocktail Dress"] / Link <to /shop> ["Shop All"] // Link <to /about> ["Our Story"] / Link <to /contact> ["Contact Us"] / Account Link <to Shopify account> ["Login/Account"]`
- **Feature:** None
- **Behavior:**
  - Opens from the hamburger in either header, and closes when a link is picked.
  - The account link goes to Shopify's hosted customer account page.

### C-Cart — Cart Drawer
- **Outline:** `"Your Cart" // Line Items <image, name, options, qty stepper, price, remove> // Subtotal <cart total> // Btn ["Checkout"] / "Checkout securely in USD, powered by Shopify"`
- **Feature:** F-006 Cart, F-007 Checkout Handoff
- **Behavior:**
  - Changing an item's quantity or removing it updates the cart and the subtotal.
  - Checkout opens Shopify's hosted checkout, which settles through the third-party gateway set up in Shopify.
  - With no items, the drawer shows an empty state.

### C-Footer — Footer
- **Outline:** `Logo <to /> // (("Shop & Learn" / Link <to /corset-tops> ["Corset Tops"] / Link <to /matching-sets> ["Matching Sets"] / Link <to /cocktail-dresses> ["Cocktail Dress"] / Link <to /shop> ["Shop All"]) | ("More Info" / Link <to /about> ["Our Story"] / Link <to /contact> ["Contact Us"] / Link <to /shipping-returns> ["Shipping & Returns"]) | ("Connect with Us" / (Instagram Icon <to Instagram> + Facebook Icon <to Facebook> + TikTok Icon <to TikTok>))) // ("© SHER {year}" | (Link <to /privacy-policy> ["Privacy Policy"] + Link <to /terms-of-service> ["Terms of Service"]))`
- **Feature:** None
- **Behavior:**
  - `{year}` renders the current year.
  - The social icons open SHER's Instagram, Facebook, and TikTok in a new tab.

### C-Sizing — Size Chart Drawer
- **Outline:** `"Size Chart" / Title <product name> / Paragraph <measurements-based; varies by style; each piece can be tailored; contact SHER if unsure> / Measurements <in cm> / Measurements <in inches>`
- **Feature:** F-008 Size Chart
- **Behavior:**
  - Renders only the measurements a product defines. One it omits, such as Hip on a corset top, is left out of the table.
  - The cm table comes from D-005. The inches table is calculated from it.

### C-Shipping — Shipping & Returns Drawer
- **Outline:** `(same as /shipping-returns)`
- **Feature:** None
- **Behavior:**
  - Opens from the shipping link on S-006 and shows the same content as S-009.

## 7. Navigation

```
Header — every screen (C-Transparent on Home over the hero, C-Sticky elsewhere)
 ├── Hamburger → opens C-Menu
 ├── Logo → S-001
 └── Cart → opens C-Cart

Menu Drawer (C-Menu)
 ├── Logo → S-001
 ├── Shop Now
 │    ├── Corset Tops → S-003
 │    ├── Matching Sets → S-004
 │    ├── Cocktail Dress → S-005
 │    └── Shop All → S-002
 ├── Our Story → S-007
 ├── Contact Us → S-008
 └── Login/Account → Shopify hosted account

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
 │    ├── Instagram → Instagram profile
 │    ├── Facebook → Facebook page
 │    └── TikTok → TikTok profile
 ├── Privacy Policy → S-010
 └── Terms of Service → S-011

In-page
 ├── Breadcrumb → the parent screen in the trail
 ├── Product card → S-006
 ├── Home category tile → S-002, S-003, S-004, S-005
 ├── Size chart link (S-006) → opens C-Sizing
 ├── Shipping link (S-006) → opens C-Shipping
 ├── Add to Cart (S-006) → opens C-Cart
 ├── Buy Now (S-006) → Shopify hosted checkout
 ├── Checkout (C-Cart) → Shopify hosted checkout
 └── Preorder (S-006, all sizes sold out) → S-008
```

## 8. Build Steps

### Phase 1 — Foundation and data
| Step | What to Build | References |
|---|---|---|
| B-001 | Next.js 15 app with strict TypeScript and Tailwind. Set up the Vercel deploy and the env vars now, so every later step ships. Add `error.tsx`, `loading.tsx`, and `not-found.tsx` alongside each route. | Environment / Config |
| B-002 | Design tokens from DESIGN.md and the Module primitives every screen reuses (button, heading, price, product card, breadcrumb, icons). | — |
| B-003 | The single `shopifyFetch()` wrapper, plus typed queries for products and collections and typed mutations for the cart. | D-001, D-002, D-003 |
| B-004 | Readers for the two repo TSVs, typed and loaded at build time. | D-004, D-005 |

### Phase 2 — Global chrome
| Step | What to Build | References |
|---|---|---|
| B-005 | Both headers, the announcement bar, the menu drawer, and the footer, wired to their routes. Includes the swap from C-Transparent to C-Sticky on Home. | C-Transparent, C-Sticky, C-Menu, C-Footer |

### Phase 3 — The buy flow
| Step | What to Build | References |
|---|---|---|
| B-006 | Product Detail: media gallery, size selector, quantity, description, and the related grid. | S-006, D-001, D-005 |
| B-007 | Cart drawer and checkout handoff: create, add, update, remove, subtotal, empty state, and the jump to Shopify checkout. Buy Now uses the same handoff. | C-Cart, F-006, F-007, D-003 |
| B-008 | The two product-page drawers: size chart with the cm-to-inch table, and shipping and returns. | C-Sizing, C-Shipping, F-008, D-005 |

### Phase 4 — Browse and Home
| Step | What to Build | References |
|---|---|---|
| B-009 | One collection pattern for all four listing screens: grid, Load More, type filter, and view toggle. | S-002, S-003, S-004, S-005, F-001, F-002, F-003, D-002 |
| B-010 | Home: hero carousel, category tiles, and featured products, all fed by the Home TSV. | S-001, F-004, F-005, D-004 |

### Phase 5 — Content, SEO, and launch
| Step | What to Build | References |
|---|---|---|
| B-011 | The five static content pages, built from one pattern. | S-007, S-008, S-009, S-010, S-011 |
| B-012 | SEO: `generateMetadata` on every route, canonical URLs, Open Graph images, JSON-LD `Product` on S-006, sitemap, and robots. | S-001 to S-011 |
| B-013 | Launch gate: Lighthouse targets, accessibility pass, and QA of the full buy flow on mobile and desktop. | Accessibility, Performance |

## 9. Extra Details

### Connectivity
The site needs the internet on every screen. Product, collection, and cart data all come from Shopify at request time. With no connection a screen does not load, and a cart action fails and shows a retry.

### Storage
On the client: the Shopify cart ID in a cookie, so the cart survives navigation and refresh; the column choice and the active filter in the browser for the session. On the server: nothing of the customer's. Shopify holds the cart, the order, and the account.

### Accessibility
Every screen meets WCAG 2.2 AA. Drawers open and close from the keyboard, trap focus while open, and close on Escape. Every image carries alt text, and Home slot images take theirs from D-004. Reduced motion is respected by the hero carousel and the product video.

### Performance
Every screen targets a Lighthouse mobile score of 90 or better on performance, accessibility, best practices, and SEO. Images go through `next/image` with set sizes. Async sections load behind Suspense with skeletons. Only the interactive pieces ship client JavaScript.

### Security & Privacy
The site never touches card details. Payment, tax, and address collection all happen in Shopify's hosted checkout, and accounts are Shopify hosted too. The Storefront access token stays server-side and never enters a client component. No customer data is stored outside Shopify.

### Integrations / External Services
- Shopify Storefront API — products, collections, and cart.
- Shopify hosted checkout — payment, tax, shipping, and discounts.
- Shopify hosted customer accounts — login and order history.
- The third-party payment gateway set up in Shopify — settles in USD.
- Vercel — hosting and deploys.
- Instagram, Facebook, and TikTok — outbound links only.

### Environment / Config
- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` (server only)
- `SHOPIFY_API_VERSION`
- `NEXT_PUBLIC_SITE_URL`

### Active Items
| ID | Name | Status |
|---|---|---|
| US-001 | See the whole range in one place | Active |
| US-002 | Browse one category | Active |
| US-003 | Filter a category by type | Active |
| US-004 | Change grid columns | Active |
| US-005 | Load more products | Active |
| US-006 | Watch the video and see the photos | Active |
| US-007 | Read details and pick a size | Active |
| US-008 | Size chart in cm or inches | Active |
| US-009 | Shipping and returns on the product page | Active |
| US-010 | Add to cart and keep shopping | Active |
| US-011 | Review and edit the cart | Active |
| US-012 | Pay securely | Active |
| US-013 | Buy one piece straight away | Active |
| US-014 | Clear empty cart | Active |
| US-015 | Ask about a sold-out piece | Active |
| F-001 | Product Grid & Load More | Active |
| F-002 | Type Filter | Active |
| F-003 | Grid View Toggle | Active |
| F-004 | Hero Carousel | Active |
| F-005 | Home Content Blocks | Active |
| F-006 | Cart | Active |
| F-007 | Checkout Handoff | Active |
| F-008 | Size Chart | Active |
| D-001 | Product | Active |
| D-002 | Collection | Active |
| D-003 | Cart | Active |
| D-004 | Home content | Active |
| D-005 | Product repo data | Active |
| C-Transparent | Transparent Header | Active |
| C-Sticky | Sticky Header | Active |
| C-Menu | Menu Drawer | Active |
| C-Cart | Cart Drawer | Active |
| C-Footer | Footer | Active |
| C-Sizing | Size Chart Drawer | Active |
| C-Shipping | Shipping & Returns Drawer | Active |
