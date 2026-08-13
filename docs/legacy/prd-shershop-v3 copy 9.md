> **This document defines version v3 of the product. Earlier versions hold what came before; the Active Items list shows everything in effect now. Page outline and structure live in the Planning TSV; styling lives in the design system file; brand voice lives in the brand doc. Do not add features, screens, or data the plan doesn't call for.**

---

# SHER — Web Store Requirements Document

**Platform:** Web. Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Shopify Storefront API, Shopify hosted checkout and accounts, deployed on Vercel.
**Version:** v3

## 1. Main Goals
1. Put the whole SHER range online, so a shopper can browse every product in one place.
2. Give each of the three categories its own page, so shoppers and search engines land on the right one.
3. Let a shopper pick a size and buy, through Shopify's hosted checkout.
4. Answer the questions that stop a sale: fit, sizing, shipping, and returns.

## 2. User Stories
| ID | Story |
|---|---|
| US-001 | As a shopper, I want to see the whole range on one page so I can get a feel for what SHER makes. |
| US-002 | As a shopper, I want a page per category so I can go straight to corset tops, matching sets, or cocktail dresses. |
| US-003 | As a shopper, I want to filter a category by type so I only see the closure, set type, or length I want. |
| US-004 | As a shopper, I want to change how many products fit across the grid so I can scan fast or look closely. |
| US-005 | As a shopper, I want to load more products so I can keep browsing without a page reload. |
| US-006 | As a shopper, I want a product page with photos, a video, and a description so I know what I am buying. |
| US-007 | As a shopper, I want a size chart on the product page so I can pick the right size. |
| US-008 | As a shopper, I want shipping and returns terms on the product page so I know the cost and the risk before I buy. |
| US-009 | As a shopper, I want to pick a size and add the item to my cart so I can keep shopping. |
| US-010 | As a shopper, I want a buy-now button so I can skip the cart and check out at once. |
| US-011 | As a shopper, I want to change quantity or remove an item in the cart so my order is right before I pay. |
| US-012 | As a shopper with an empty cart, I want to be told it is empty so I know nothing is waiting for me. |
| US-013 | As a shopper, I want to check out on a secure hosted page so I can pay with confidence. |
| US-014 | As a shopper, I want a way to ask for a sold-out item so I can still order it. |

## 3. Features

### F-001 — Hero Carousel
- **What it does:** Slides through the featured banners on Home. Each banner has an image, alt text, overlay text, and a link, all from D-005.
- **When it appears:** At the top of S-001, on load.
- **If something goes wrong:** With no banners in D-005, the carousel is not rendered and the page starts at the section below it.

### F-002 — Home Category Cards
- **What it does:** Shows the four image links on Home that lead to the three categories and to Shop All. Image, alt text, overlay heading, link, and slot placement come from D-005.
- **When it appears:** On S-001, below the intro.
- **If something goes wrong:** A card missing an image or a link is left out. The rest still render.

### F-003 — Featured Products
- **What it does:** Shows two hand-picked products on Home as image links, each with the product name. The pick, image, and link come from D-005.
- **When it appears:** In the "Featured Products" section of S-001.
- **If something goes wrong:** A pick that no longer resolves to a live product is left out.

### F-004 — Product Grid
- **What it does:** Lists every product in the collection as a card with image, name, and price. The card image is the one named for that product in D-006, or the product's first image when D-006 names none. On desktop, hovering a card swaps the image to the product's next image; on tablet and mobile, holding a finger down does the same. It goes back on release. A product with no next image does not swap.
- **When it appears:** On S-002, S-003, S-004, and S-005.
- **If something goes wrong:** A collection with no products shows an empty grid message. A card whose image fails to load shows the image placeholder and stays clickable.

### F-005 — Load More
- **What it does:** Reveals the next 12 products in the grid. It keeps the active filter and the chosen column count. A divider sits under the grid once nothing is left.
- **When it appears:** Under the grid on S-002, S-003, S-004, and S-005, while unshown products remain.
- **If something goes wrong:** A failed fetch leaves the shown products in place and lets the shopper press again.

### F-006 — View Toggle
- **What it does:** Switches how many products fit across the grid: 1 or 2 columns on mobile, 2 or 3 on desktop. Once it scrolls out of view, it sticks to the bottom left of the screen.
- **When it appears:** Above the grid on S-002, S-003, S-004, and S-005.
- **If something goes wrong:** None. The choice is page state only and resets on reload.

### F-007 — Type Filter
- **What it does:** Filters the grid in place by the category's type attribute: closure type on corset tops, set type on matching sets, length on cocktail dresses. The values come from the product's type metafield in D-001. Picking a pill filters without a page load; picking it again clears it.
- **When it appears:** As Button Pills above the grid on S-003, S-004, and S-005.
- **If something goes wrong:** A filter with no matches shows an empty grid message and keeps the pills active, so the shopper can clear it.

### F-008 — Media Gallery
- **What it does:** Shows one main viewer with a thumbnail strip. The order is fixed: video first, then images. The video thumbnail carries a play icon. Pressing a thumbnail sets the main viewer. On load the viewer shows the first image while the video loads, then switches to the video and plays it muted, looped, and inline.
- **When it appears:** On S-006, on load.
- **If something goes wrong:** With no video, the gallery is images only. When the shopper's system asks for reduced motion, there is no auto-switch and no autoplay; the video plays only when pressed.

### F-009 — Size Selector
- **What it does:** Lists the product's sizes and marks the one picked. Sold-out sizes are shown but cannot be picked.
- **When it appears:** On S-006, above the buy buttons.
- **If something goes wrong:** Adding to cart with no size picked is blocked, and the selector is flagged.

### F-010 — Add to Cart
- **What it does:** Adds the picked size to the Shopify cart and opens C-Cart. The first add creates the cart and stores its ID in the cookie (D-004).
- **When it appears:** From the Add to Cart button on S-006.
- **If something goes wrong:** A failed add leaves the cart as it was and shows an error in place. An item that sold out between page load and add is refused with a message.

### F-011 — Buy Now
- **What it does:** Adds the picked size and sends the shopper straight to Shopify's hosted checkout.
- **When it appears:** From the Buy Now button on S-006.
- **If something goes wrong:** If the checkout URL cannot be fetched, the shopper stays on the page and sees an error.

### F-012 — Preorder Swap
- **What it does:** When every size of a product is sold out, the Add to Cart and Buy Now buttons are replaced by a Preorder link to S-008.
- **When it appears:** On S-006, on load.
- **If something goes wrong:** None. Stock is read at render.

### F-013 — Cart Update and Remove
- **What it does:** Changes an item's quantity or removes it, then refreshes the line and the subtotal.
- **When it appears:** In C-Cart, from the quantity stepper and the remove control.
- **If something goes wrong:** A failed change puts the old quantity back and shows an error in the drawer. A cart ID Shopify no longer knows is dropped and the drawer shows the empty state.

### F-014 — Hosted Checkout
- **What it does:** Sends the shopper to the cart's Shopify checkout URL. Payment, tax, shipping, and discounts are Shopify's. The charge settles in USD through the third-party gateway set up in Shopify.
- **When it appears:** From the Checkout button in C-Cart.
- **If something goes wrong:** With no checkout URL, the button shows an error and the cart stays open.

### F-015 — Size Chart
- **What it does:** Shows the product's measurements in a drawer, in cm and in inches. The cm numbers come from D-006. The inch numbers are worked out from them. Only the measurements a product defines are shown; one it leaves out is left out of the table.
- **When it appears:** In C-Sizing, from the View Size Chart link on S-006.
- **If something goes wrong:** A product with no measurements in D-006 shows the drawer text without a table.

### F-016 — Shipping and Returns Drawer
- **What it does:** Shows the same shipping and returns content as S-009, in a drawer, so the shopper does not leave the product page.
- **When it appears:** In C-Shipping, from the Shipping & Returns link on S-006.
- **If something goes wrong:** None. The content is in the repo (D-007).

### F-017 — Related Products
- **What it does:** Shows two random products from the same category, with a link back to that category page.
- **When it appears:** At the bottom of S-006.
- **If something goes wrong:** A category with fewer than three products shows what is left; with none, the grid is left out and the text and button stay.

### F-018 — SEO Metadata and Structured Data
- **What it does:** Gives every screen a title, description, Open Graph image, and canonical URL, built on the server. Product pages also carry JSON-LD Product data: name, description, image, price, currency, and availability.
- **When it appears:** On every screen, at render.
- **If something goes wrong:** A missing field falls back to the site default title and description.

## 4. Data
| ID | Data Item | Source | Details |
|---|---|---|---|
| D-001 | Product | Shopify Storefront API | Name, handle, description, price, images, video, sizes and their stock, and the type metafield (closure type, set type, or length). |
| D-002 | Collection | Shopify Storefront API | The three category collections plus all products. Holds the product list and its order, paged by cursor. |
| D-003 | Cart | Shopify Storefront API | Line items, quantities, subtotal, and the checkout URL. |
| D-004 | Cart ID | Browser cookie | The Shopify cart ID, written on the first add to cart, so the cart survives navigation and reload. |
| D-005 | Home Content | Repo file | Hand-entered Home content: hero banners, category cards, and featured product picks. Each holds slot placement, image, alt text, overlay text, and link. |
| D-006 | Product Display Data | Repo file | One entry per product handle: which image the grid card shows, and the size measurements in cm. |
| D-007 | Page Content | Repo Content MD files in `/docs/content/` | The copy and outline for each screen, in frontmatter and notation lines. |

## 5. Screens

### S-001 — Home
- **Outline:** Refer to /docs/content/s-001_home.md
- **Feature:** F-001 Hero Carousel, F-002 Home Category Cards, F-003 Featured Products, F-018 SEO Metadata and Structured Data
- **Behavior:**
  - The hero carousel slides through its banners.
  - Hero banners, category images, and featured product images all come from D-005.
  - C-Transparent sits over the hero. C-Sticky takes over once the hero scrolls out of view.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-002 — All Products
- **Outline:** Refer to /docs/content/s-002_all-products.md
- **Feature:** F-004 Product Grid, F-005 Load More, F-006 View Toggle, F-018 SEO Metadata and Structured Data
- **Behavior:**
  - The grid holds every product in the shop.
  - The Button Pills are links to the three category pages, not filters.
  - The view toggle sets 1 or 2 columns on mobile and 2 or 3 on desktop, and sticks to the bottom left once it scrolls out of view.
  - Load More reveals the next 12 and keeps the chosen column count. A divider sits under the grid when nothing is left.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-003 — Corset Tops
- **Outline:** Refer to /docs/content/s-003_corset-tops.md
- **Feature:** F-004 Product Grid, F-005 Load More, F-006 View Toggle, F-007 Type Filter, F-018 SEO Metadata and Structured Data
- **Behavior:**
  - The pills filter the grid in place by closure type.
  - The view toggle, grid, and Load More work as on S-002. Load More keeps the active filter.
  - The FAQ accordion opens one item at a time.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-004 — Matching Sets
- **Outline:** Refer to /docs/content/s-004_matching-sets.md
- **Feature:** F-004 Product Grid, F-005 Load More, F-006 View Toggle, F-007 Type Filter, F-018 SEO Metadata and Structured Data
- **Behavior:**
  - The pills filter the grid in place by set type.
  - The view toggle, grid, and Load More work as on S-002. Load More keeps the active filter.
  - The FAQ accordion opens one item at a time.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-005 — Cocktail Dresses
- **Outline:** Refer to /docs/content/s-005_cocktail-dresses.md
- **Feature:** F-004 Product Grid, F-005 Load More, F-006 View Toggle, F-007 Type Filter, F-018 SEO Metadata and Structured Data
- **Behavior:**
  - The pills filter the grid in place by length.
  - The view toggle, grid, and Load More work as on S-002. Load More keeps the active filter.
  - The FAQ accordion opens one item at a time.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-006 — Product Detail
- **Outline:** Refer to /docs/content/s-006_product-detail.md
- **Feature:** F-008 Media Gallery, F-009 Size Selector, F-010 Add to Cart, F-011 Buy Now, F-012 Preorder Swap, F-015 Size Chart, F-016 Shipping and Returns Drawer, F-017 Related Products, F-018 SEO Metadata and Structured Data
- **Behavior:**
  - The breadcrumb reads Shop › {Category} › product, and the category step links to that category page.
  - On small screens the breadcrumb cuts the product name with an ellipsis. The full name stays in the markup.
  - Add to Cart opens C-Cart. Buy Now goes to Shopify checkout.
  - Sold-out sizes cannot be picked. When every size is sold out, the buy buttons become a Preorder link to S-008.
  - The type attribute beside the description is the product's Shopify metafield: closure type for corset tops, set type for matching sets, length for cocktail dresses.
  - View Size Chart opens C-Sizing. Shipping & Returns opens C-Shipping.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-007 — About Us
- **Outline:** Refer to /docs/content/s-007_about-us.md
- **Feature:** F-018 SEO Metadata and Structured Data
- **Behavior:**
  - None
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-008 — Contact
- **Outline:** Refer to /docs/content/s-008_contact.md
- **Feature:** F-018 SEO Metadata and Structured Data
- **Behavior:**
  - The social messaging links and the email link open in a new tab.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-009 — Shipping & Returns
- **Outline:** Refer to /docs/content/s-009_shipping-returns.md
- **Feature:** F-018 SEO Metadata and Structured Data
- **Behavior:**
  - This page and C-Shipping share one content source, so they never drift.
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-010 — Privacy Policy
- **Outline:** Refer to /docs/content/s-010_privacy-policy.md
- **Feature:** F-018 SEO Metadata and Structured Data
- **Behavior:**
  - None
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-011 — Terms of Service
- **Outline:** Refer to /docs/content/s-011_terms-of-service.md
- **Feature:** F-018 SEO Metadata and Structured Data
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
  - Home only. It sits over the hero, has no background, and scrolls away with the page.
  - The hamburger opens C-Menu. The cart icon opens C-Cart.

### C-Sticky — Sticky Header
- **Outline:** `Announcement Bar ["Delivers Worldwide · Free Shipping over $250"] // Hamburger Icon <opens C-Menu> | Dark Symbol Logo <to /> | Cart Icon <opens C-Cart>`
- **Feature:** None
- **Behavior:**
  - Solid and stuck to the top of every screen.
  - On Home it takes over once the hero scrolls out of view.
  - The hamburger opens C-Menu. The cart icon opens C-Cart.

### C-Menu — Menu Drawer
- **Outline:** `Dark Symbol Logo <to /> // "Shop Now" / "Link: Corset Tops" <to /corset-tops> / "Link: Matching Sets" <to /matching-sets> / "Link: Cocktail Dress" <to /cocktail-dresses> / "Link: Shop All" <to /shop> // "Link: Our Story" <to /about> / "Link: Contact Us" <to /contact> / Account "Link: Login/Account" <to Shopify account>`
- **Feature:** None
- **Behavior:**
  - Opens from the hamburger in either header, and closes on a link press, on the close control, or on a press outside it.
  - The account link goes to Shopify's hosted customer accounts.

### C-Cart — Cart Drawer
- **Outline:** `"Your Cart" // Line Items <image, name, options, qty stepper, price, remove> // Subtotal // "Btn: Checkout" / "Checkout securely in USD, powered by Shopify"`
- **Feature:** F-013 Cart Update and Remove, F-014 Hosted Checkout
- **Behavior:**
  - Opens from the cart icon in either header, and on add to cart.
  - Changing an item's quantity or removing it updates the cart and the subtotal.
  - Checkout opens Shopify's hosted checkout, which settles through the third-party gateway set up in Shopify.
  - An empty cart shows the empty state in place of the line items, subtotal, and checkout button.

### C-Footer — Footer
- **Outline:** `Logo <to /> // (("Shop & Learn" / "Link: Corset Tops" <to /corset-tops> / "Link: Matching Sets" <to /matching-sets> / "Link: Cocktail Dress" <to /cocktail-dresses> / "Link: Shop All" <to /shop>) | ("More Info" / "Link: Our Story" <to /about> / "Link: Contact Us" <to /contact> / "Link: Shipping & Returns" <to /shipping-returns>) | ("Connect with Us" / (Instagram Icon <to Instagram> + Facebook Icon <to Facebook> + TikTok Icon <to TikTok>))) // ("© SHER {year}" | ("Link: Privacy Policy" <to /privacy-policy> + "Link: Terms of Service" <to /terms-of-service>))`
- **Feature:** None
- **Behavior:**
  - The year in the copyright line is the current year.
  - Social icons open in a new tab.

### C-Sizing — Size Chart Drawer
- **Outline:** `"Size Chart" / Title <product name> / Paragraph <measurements-based; varies by style; each piece can be tailored; contact SHER if unsure> / Measurements <in cm> / Measurements <in inches>`
- **Feature:** F-015 Size Chart
- **Behavior:**
  - Opens from the View Size Chart link on S-006.
  - Shows only the measurements the product defines. One it leaves out, such as Hip on a corset top, is left out of the table.
  - The cm numbers come from D-006. The inch numbers are worked out from them.

### C-Shipping — Shipping & Returns Drawer
- **Outline:** `(same as /shipping-returns)`
- **Feature:** F-016 Shipping and Returns Drawer
- **Behavior:**
  - Opens from the Shipping & Returns link on S-006.
  - Reads the same content source as S-009.

## 7. Navigation

```
Header (C-Transparent on Home hero, C-Sticky elsewhere) — every screen
 ├── Hamburger → opens C-Menu
 ├── Logo → S-001
 └── Cart → opens C-Cart

C-Menu — from either header
 ├── Logo → S-001
 ├── Shop Now
 │    ├── Corset Tops → S-003
 │    ├── Matching Sets → S-004
 │    ├── Cocktail Dress → S-005
 │    └── Shop All → S-002
 ├── Our Story → S-007
 ├── Contact Us → S-008
 └── Login/Account → Shopify hosted account

C-Footer — every screen
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
 │    ├── Instagram → external
 │    ├── Facebook → external
 │    └── TikTok → external
 ├── Privacy Policy → S-010
 └── Terms of Service → S-011

In-page
 ├── S-001 category cards → S-003, S-004, S-005, S-002
 ├── S-001 featured products → S-006
 ├── S-002 Button Pills → S-003, S-004, S-005
 ├── Product cards on S-002, S-003, S-004, S-005 → S-006
 ├── S-006 breadcrumb → S-002 and the product's category page
 ├── S-006 View Size Chart → opens C-Sizing
 ├── S-006 Shipping & Returns → opens C-Shipping
 ├── S-006 Preorder (all sizes sold out) → S-008
 └── S-006 related products → S-006 and the product's category page
```

## 8. Build Steps

### Phase 1 — Foundation and data
| Step | What to Build | References |
|---|---|---|
| B-001 | Next.js 15 app with TypeScript strict, Tailwind v4, the `@/` alias, and a working Vercel deploy, so every later step ships. | — |
| B-002 | The single `shopifyFetch()` wrapper, the env config, and the product and collection queries. Prove it against the live store. | D-001, D-002 |
| B-003 | The repo data files and their types: Home content and product display data. | D-005, D-006 |

### Phase 2 — Global chrome
| Step | What to Build | References |
|---|---|---|
| B-004 | Both headers with the announcement bar, and the swap from transparent to sticky on Home. | C-Transparent, C-Sticky |
| B-005 | The menu drawer and the footer, with every link wired. | C-Menu, C-Footer |

### Phase 3 — Browse
| Step | What to Build | References |
|---|---|---|
| B-006 | The product grid: card, thumbnail choice with fallback, and the hover or hold image swap. | F-004, D-001, D-006 |
| B-007 | The view toggle and Load More, shared by all four listing screens. | F-005, F-006 |
| B-008 | The four listing screens, plus the in-place type filter on the three category pages. | S-002, S-003, S-004, S-005, F-007 |

### Phase 4 — Product page
| Step | What to Build | References |
|---|---|---|
| B-009 | The product page shell, the media gallery with video, and the reduced-motion path. | S-006, F-008 |
| B-010 | The size selector, stock states, and the preorder swap. | F-009, F-012 |
| B-011 | The size chart and shipping drawers, and the related products block. | C-Sizing, C-Shipping, F-015, F-016, F-017 |

### Phase 5 — Cart and checkout
| Step | What to Build | References |
|---|---|---|
| B-012 | Cart create, add, update, and remove as Server Actions, with the cart ID cookie and revalidation. | F-010, F-013, D-003, D-004 |
| B-013 | The cart drawer, its empty state, and the buy-now path. | C-Cart, F-011 |
| B-014 | The handoff to Shopify hosted checkout. | F-014 |

### Phase 6 — Home and content pages
| Step | What to Build | References |
|---|---|---|
| B-015 | Home: hero carousel, category cards, and featured products. | S-001, F-001, F-002, F-003 |
| B-016 | All five static content pages from their Content MDs, in one pass. | S-007, S-008, S-009, S-010, S-011, D-007 |

### Phase 7 — Search visibility
| Step | What to Build | References |
|---|---|---|
| B-017 | Metadata on every screen, and JSON-LD Product data on the product page. | F-018 |

### Phase 8 — Launch gate
| Step | What to Build | References |
|---|---|---|
| B-018 | Performance, accessibility, and QA pass across every screen, against the bars below. | All |

## 9. Extra Details

### Connectivity
The store needs the network for everything but the static content pages. Product, collection, and cart data all come from the Shopify Storefront API at render or on action. With the API down, listing and product pages cannot render and the cart cannot change. Checkout is on Shopify's own domain, so it needs the network too.

### Storage
The client keeps one cookie: the Shopify cart ID (D-004). Nothing else is stored on the client. The chosen column count and the active filter live in page state for the visit and reset on reload. Everything else, including the whole cart, lives with Shopify.

### Accessibility
Every screen meets WCAG 2.1 AA. Every control reachable by keyboard with a visible focus state. Drawers trap focus while open and return it on close. Every image carries alt text. The video is muted and has no sound to miss. When the shopper's system asks for reduced motion, the carousel does not auto-slide and the product video does not autoplay.

### Performance
Every screen scores 90 or better on mobile Lighthouse for Performance, Accessibility, Best Practices, and SEO. Images go through `next/image` on the Shopify CDN. Only the small interactive pieces ship JavaScript.

### Security & Privacy
The store never touches card details. Shopify's hosted checkout takes payment, and Shopify's hosted accounts take passwords. The Storefront access token is server-side only and never reaches a client component. The only shopper data the store holds is the cart ID cookie. Order and customer data all sit with Shopify.

### Integrations / External Services
- Shopify Storefront API — products, collections, and cart.
- Shopify hosted checkout — payment, tax, shipping, and discounts.
- Shopify hosted customer accounts — login and order history.
- The third-party payment gateway set up in Shopify, settling in USD.
- Vercel — hosting and deployment.
- Instagram, Facebook, and TikTok — outbound links only.

### Environment / Config
- `SHOPIFY_STORE_DOMAIN` — the store's `.myshopify.com` domain.
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` — the Storefront API token. Server-side only.
- `SHOPIFY_API_VERSION` — the Storefront API version the queries target.
- `NEXT_PUBLIC_SITE_URL` — the live site URL, for canonical and Open Graph tags.

### Active Items
| ID | Name | Status |
|---|---|---|
| US-001 | Browse the whole range | Active |
| US-002 | Browse by category | Active |
| US-003 | Filter a category by type | Active |
| US-004 | Change grid columns | Active |
| US-005 | Load more products | Active |
| US-006 | View a product page | Active |
| US-007 | Check the size chart | Active |
| US-008 | Check shipping and returns | Active |
| US-009 | Pick a size and add to cart | Active |
| US-010 | Buy now | Active |
| US-011 | Change or remove a cart item | Active |
| US-012 | See the empty cart state | Active |
| US-013 | Check out securely | Active |
| US-014 | Ask for a sold-out item | Active |
| F-001 | Hero Carousel | Active |
| F-002 | Home Category Cards | Active |
| F-003 | Featured Products | Active |
| F-004 | Product Grid | Active |
| F-005 | Load More | Active |
| F-006 | View Toggle | Active |
| F-007 | Type Filter | Active |
| F-008 | Media Gallery | Active |
| F-009 | Size Selector | Active |
| F-010 | Add to Cart | Active |
| F-011 | Buy Now | Active |
| F-012 | Preorder Swap | Active |
| F-013 | Cart Update and Remove | Active |
| F-014 | Hosted Checkout | Active |
| F-015 | Size Chart | Active |
| F-016 | Shipping and Returns Drawer | Active |
| F-017 | Related Products | Active |
| F-018 | SEO Metadata and Structured Data | Active |
| D-001 | Product | Active |
| D-002 | Collection | Active |
| D-003 | Cart | Active |
| D-004 | Cart ID | Active |
| D-005 | Home Content | Active |
| D-006 | Product Display Data | Active |
| D-007 | Page Content | Active |
| C-Transparent | Transparent Header | Active |
| C-Sticky | Sticky Header | Active |
| C-Menu | Menu Drawer | Active |
| C-Cart | Cart Drawer | Active |
| C-Footer | Footer | Active |
| C-Sizing | Size Chart Drawer | Active |
| C-Shipping | Shipping & Returns Drawer | Active |
