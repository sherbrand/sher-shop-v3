> **This document defines version v3 of the product. Earlier versions hold what came before; the Active Items list shows everything in effect now. Page outline and structure live in the Planning TSV; styling lives in the design system file; brand voice lives in the brand doc. Do not add features, screens, or data the plan doesn't call for.**

---

# SHER — SherShop Requirements Document

**Platform:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Shopify Storefront API (GraphQL), Shopify hosted checkout and accounts, Vercel
**Version:** v3

## 1. Main Goals
1. Launch a shoppable SHER storefront: browse, pick a size and colour, add to cart, and check out through Shopify.
2. Win category head terms with information-first pillar pages for corset tops, matching sets, and cocktail dresses.
3. Ship the full site chrome, category commerce pages, product detail, and the required content and policy pages.

## 2. User Stories
| ID | Story |
|---|---|
| US-001 | As a customer, I want to land on a home page that shows featured pieces and categories so I can start where I like. |
| US-002 | As a customer, I want to browse every product in one place so I can see the whole range. |
| US-003 | As a customer, I want to browse one category on its own so I can focus on one type. |
| US-004 | As a customer, I want to filter a category by its key attribute so I can narrow to what fits me. |
| US-005 | As a customer, I want to change how many products show per row so I can browse the way I like. |
| US-006 | As a customer, I want to see a product's photos, price, colours, and sizes so I can decide to buy. |
| US-007 | As a customer, I want to add a product to my cart so I can keep shopping before I pay. |
| US-008 | As a customer, I want to buy a product right away so I can check out fast. |
| US-009 | As a customer, I want to review my cart and change amounts or remove items so I can confirm my order. |
| US-010 | As a customer, I want to check out safely so I can pay for my order. |
| US-011 | As a customer, I want to check sizing and shipping details on a product page so I can buy with confidence. |
| US-012 | As a customer, I want a clear message when my cart is empty so I know to keep shopping. |

## 3. Features
### F-001 — Product Grid
- **What it does:** Shows a grid of products pulled from a Shopify collection. Reused on the Shop page, the three category pages, the "You May Also Like" block, and the Home featured block.
- **When it appears:** On any screen that lists products (S-001, S-002, S-003, S-004, S-005, S-006).
- **If something goes wrong:** If products fail to load, show a friendly empty or retry state, not a blank grid.

### F-002 — Attribute Filter
- **What it does:** Filters the category grid in place by one attribute: closure type (corset tops), set type (matching sets), or length (cocktail dresses). No page reload.
- **When it appears:** On the three category pages (S-003, S-004, S-005), above the grid.
- **If something goes wrong:** If a filter matches no products, show a short "nothing here yet" message and keep the filter controls in place.

### F-003 — Grid View Toggle
- **What it does:** Lets the customer switch grid columns: 1 or 2 on mobile, 2 or 3 on desktop.
- **When it appears:** On the Shop and category pages (S-002, S-003, S-004, S-005), next to the grid.
- **If something goes wrong:** If no choice is set, fall back to the default (2 mobile, 3 desktop).

### F-004 — Hero Carousel
- **What it does:** Slides through featured banners with text overlay and a link. Banners come from D-004 Home content.
- **When it appears:** At the top of the Home page (S-001).
- **If something goes wrong:** If content is missing, show the first banner only, or hide the carousel; never show a broken slot.

### F-005 — Home Curated Sections
- **What it does:** Fills the Home category tiles and featured-product tiles from D-004 Home content: slot placement, image, overlay text, and link.
- **When it appears:** On the Home page (S-001), below the hero.
- **If something goes wrong:** If a slot has no content, leave it out rather than show an empty tile.

### F-006 — Add to Cart
- **What it does:** Adds the chosen variant to the Shopify cart and opens the cart drawer. Creates the cart on the first add.
- **When it appears:** On the Product Detail page (S-006), from the Add to Cart button.
- **If something goes wrong:** If the add fails, keep the customer on the page and show a short error; do not open an empty drawer.

### F-007 — Cart Management
- **What it does:** Shows cart line items, updates the cart and subtotal when a quantity changes or an item is removed, and shows an empty state when the cart is empty.
- **When it appears:** In the cart drawer (C-Cart), opened from the header cart icon.
- **If something goes wrong:** If an update fails, keep the last known cart and show a short error.

### F-008 — Checkout Handoff
- **What it does:** Sends the customer to Shopify hosted checkout using the cart's checkout URL. Payment settles in USD.
- **When it appears:** From the Checkout button in the cart drawer (C-Cart).
- **If something goes wrong:** If the checkout URL is missing, show an error and keep the cart open.

### F-009 — Buy Now
- **What it does:** Skips the cart and sends the chosen variant straight to Shopify checkout.
- **When it appears:** On the Product Detail page (S-006), from the Buy Now button.
- **If something goes wrong:** If the variant is unavailable, disable the button; if the handoff fails, show a short error.

### F-010 — Size Chart
- **What it does:** Renders a product's size chart from the D-005 size-chart TSV. Shows only the measurements the product defines and auto-calculates the inches table from the cm values.
- **When it appears:** In the size chart drawer (C-Sizing), opened from the product page.
- **If something goes wrong:** If a product has no chart data, show the tailoring note only, without an empty table.

## 4. Data
| ID | What the Product Needs | Source | Details |
|---|---|---|---|
| D-001 | Product | Shopify Storefront API | Variants (colour, size), options, images, price, availability, type attribute (closure / set type / length), description. |
| D-002 | Collection | Shopify Storefront API | The category collections and their products; powers Shop and category grids. |
| D-003 | Cart | Shopify Storefront API (cart ID in a cookie) | Line items, quantities, subtotal, and checkout URL. |
| D-004 | Home Content | Repo config file | Hero banners, category tiles, and featured product handles: slot, image, overlay text, link. |
| D-005 | Size Chart | Size-chart TSV in repo config | Per-style cm measurements; drives F-010. |
| D-006 | Site Config | Repo config | Announcement bar text, nav and footer links, social URLs, contact email, warehouse address, free-shipping threshold. |
| D-007 | Page Content | Markdown content files in repo | Copy for the info pillars, About, Contact, policy pages, FAQs, and the sizing and shipping drawers. |

## 5. Screens & Components

### S-001 — Home
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** (Director will update this)
  - S-001.1 → 3-5x Hero banner image (with overlay text)
  - S-001.3 → 4x Category tile image
- **Feature:** F-004 Hero Carousel, F-005 Home Curated Sections, F-001 Product Grid
- **Behaviour:**
  - The hero carousel slides through banners; it auto-advances and takes manual controls.
  - Hero, category tiles, and featured products come from D-004 Home content: slot, image, overlay text, and link.
  - Category tiles link to their pages; featured product tiles link to product detail.
  - The header starts transparent (C-Transparent) and the sticky header (C-Sticky) takes over after 60vh of scroll.

### S-002 — Shop
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** None
- **Feature:** F-001 Product Grid, F-003 Grid View Toggle
- **Behaviour:**
  - Button pills link to the three category pages.
  - The grid shows all products, 2 columns on mobile and 3 on desktop by default.
  - The view toggle switches columns: 1 or 2 on mobile, 2 or 3 on desktop.

### S-003 — Shop Corset Tops
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** (Director will update this)
  - S-003.3 → 1x About Corset Tops image
- **Feature:** F-001 Product Grid, F-002 Attribute Filter, F-003 Grid View Toggle
- **Behaviour:**
  - The in-place filter narrows the grid by closure type without a page load.
  - The view toggle switches columns: 1 or 2 on mobile, 2 or 3 on desktop.
  - The About block links to the corset tops info pillar (S-007).

### S-004 — Shop Matching Sets
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** (Director will update this)
  - S-004.3 → 1x About Matching Sets image
- **Feature:** F-001 Product Grid, F-002 Attribute Filter, F-003 Grid View Toggle
- **Behaviour:**
  - The in-place filter narrows the grid by set type without a page load.
  - The view toggle switches columns: 1 or 2 on mobile, 2 or 3 on desktop.
  - The About block links to the matching sets info pillar (S-008).

### S-005 — Shop Cocktail Dresses
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** (Director will update this)
  - S-005.3 → 1x About Cocktail Dresses image
- **Feature:** F-001 Product Grid, F-002 Attribute Filter, F-003 Grid View Toggle
- **Behaviour:**
  - The in-place filter narrows the grid by length without a page load.
  - The view toggle switches columns: 1 or 2 on mobile, 2 or 3 on desktop.
  - The About block links to the cocktail dresses info pillar (S-009).

### S-006 — Product Detail
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** None
- **Feature:** F-006 Add to Cart, F-009 Buy Now, F-001 Product Grid
- **Behaviour:**
  - Media gallery: tapping a thumbnail sets the main image.
  - Colour selector: picking a colour jumps to that colour's variant image.
  - Size selector: shows the sizes; sold-out sizes and colours are disabled.
  - When every variant is sold out, Add to Cart and Buy Now swap to a Preorder link (to /contact).
  - Add to Cart adds the item and opens C-Cart. Buy Now goes straight to Shopify checkout.
  - The breadcrumb cuts the product name with an ellipsis on small screens; the full name stays in the markup.
  - The sizing and shipping links open C-Sizing and C-Shipping.
  - "You May Also Like" shows 2 random products from the same category.

### S-007 — Corset Tops
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** (Director will update this)
  - S-007.2 → 1x Editorial image (what defines a corset top)
  - S-007.3 → 1x Editorial image (hand-set boning)
  - S-007.4 → 2x Closure-type image (Lace, Zip)
  - S-007.5 → 1x Editorial image (fabrics and craft)
- **Feature:** None
- **Behaviour:**
  - The FAQ accordion keeps one item open at a time.

### S-008 — Matching Sets
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** (Director will update this)
  - S-008.2 → 1x Editorial image (what defines a matching set)
  - S-008.3 → 1x Editorial image (cut to sit together)
  - S-008.4 → 2x Set-type image (Skirt Set, Trouser Set)
  - S-008.5 → 1x Editorial image (fabrics and craft)
- **Feature:** None
- **Behaviour:**
  - The FAQ accordion keeps one item open at a time.

### S-009 — Cocktail Dresses
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** (Director will update this)
  - S-009.2 → 1x Editorial image (what defines a cocktail dress)
  - S-009.3 → 1x Editorial image (how SHER makes its dresses)
  - S-009.4 → 3x Length image (Mini, Midi, Maxi)
  - S-009.5 → 1x Editorial image (fabrics and craft)
- **Feature:** None
- **Behaviour:**
  - The FAQ accordion keeps one item open at a time.

### S-010 — About Us
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** (Director will update this)
  - S-010.2 → 1x Philosophy image
  - S-010.3 → 1x Founder portrait image
- **Feature:** None
- **Behaviour:**
  - Static content; no interactive behaviour.

### S-011 — Contact
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** None
- **Feature:** None
- **Behaviour:**
  - Messaging links open the social apps; the email link opens the mail client.

### S-012 — Shipping & Returns
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** None
- **Feature:** None
- **Behaviour:**
  - Static content; no interactive behaviour.

### S-013 — Privacy Policy
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** None
- **Feature:** None
- **Behaviour:**
  - Static content; no interactive behaviour.

### S-014 — Terms of Service
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** None
- **Feature:** None
- **Behaviour:**
  - Static content; no interactive behaviour.

### C-Transparent — Transparent Header
- **What's on it:**
  - Announcement bar: "Delivers Worldwide. Free Global Shipping over $180"
  - Hamburger icon, oversized white square logo, cart icon
- **Behaviour:**
  - Home only; transparent and non-sticky; scrolls away with the page.
  - The oversized logo overflows below the header.
  - The hamburger opens C-Menu; the cart icon opens C-Cart; the logo links to Home.

### C-Sticky — Sticky Header
- **What's on it:**
  - Announcement bar: "Delivers Worldwide. Free Global Shipping over $180"
  - Hamburger icon, dark symbol logo, cart icon
- **Behaviour:**
  - Solid and sticky on every screen; on Home it takes over after 60vh of scroll.
  - The hamburger opens C-Menu; the cart icon opens C-Cart; the logo links to Home.

### C-Menu — Menu Drawer
- **What's on it:**
  - Dark symbol logo (to Home)
  - Shop Now: Corset Tops, Matching Sets, Cocktail Dress, Shop All
  - Our Story, Contact Us, Login/Account
- **Behaviour:**
  - Opens from the hamburger; overlays the page.
  - A link navigates and closes the drawer; the backdrop or close control closes it.
  - The account link goes to the Shopify account.

### C-Cart — Cart Drawer
- **What's on it:**
  - "Your Cart" heading
  - Line items: image, name, options, quantity stepper, price, remove
  - Subtotal
  - Checkout button and the note "Checkout securely in USD, powered by Shopify"
- **Feature:** F-007 Cart Management, F-008 Checkout Handoff
- **Behaviour:**
  - Changing an item's quantity or removing it updates the cart and subtotal.
  - Checkout opens Shopify hosted checkout in USD.
  - Shows an empty state when the cart is empty.

### C-Footer — Footer
- **What's on it:**
  - Shop & Learn: Corset Tops, Matching Sets, Cocktail Dress, Shop All
  - More Information: Our Story, Contact, Shipping & Returns
  - Connect with Us: Instagram, Facebook, TikTok
  - "© SHER {year}", Privacy Policy, Terms of Service
  - Links mapped in section 6
- **Behaviour:**
  - Social icons open the external profiles.

### C-Sizing — Size Chart Drawer
- **What's on it:**
  - "Size Chart" heading and the product name
  - Tailoring note: the guide is measurement-based and varies by style; each piece can be tailored; reach out if unsure
  - Measurements table in cm and in inches
- **Feature:** F-010 Size Chart
- **Behaviour:**
  - Renders only the measurements a product defines; an omitted one is left out of the table.
  - The inches table is auto-calculated from the cm values.
  - cm measurements come from the D-005 size-chart TSV.

### C-Shipping — Shipping & Returns Drawer
- **What's on it:**
  - "Shipping & Returns" heading
  - Where Do You Ship? Ships worldwide from the Thailand warehouse
  - When Will I Receive My Order? 2-3 business days to process, then a shipping email; Standard 7-14 days, Express 3-5 days
  - About Customs & Duties: import duties may apply; refusing customs forfeits the refund
  - Returns & Exchanges: email the returns address with the order number, then mail the item back
- **Behaviour:**
  - Opens from the product page link; static content.

## 6. Navigation

```
Header — every screen
 ├── Hamburger → opens C-Menu
 ├── Logo → S-001
 └── Cart → opens C-Cart
 (Home uses C-Transparent, then C-Sticky after 60vh; every other screen uses C-Sticky)

C-Menu — from the hamburger
 ├── Shop Now
 │    ├── Corset Tops → S-007 (/corset-tops)
 │    ├── Matching Sets → S-008 (/matching-sets)
 │    ├── Cocktail Dress → S-009 (/cocktail-dresses)
 │    └── Shop All → S-002 (/shop)
 ├── Our Story → S-010 (/about)
 ├── Contact Us → S-011 (/contact)
 └── Login/Account → Shopify account

Shop button pills — S-002
 ├── Corset Tops → S-003 (/shop/corset-tops)
 ├── Matching Sets → S-004 (/shop/matching-sets)
 └── Cocktail Dresses → S-005 (/shop/cocktail-dresses)

Product Detail — in page (S-006)
 ├── Sizing link → opens C-Sizing
 └── Shipping link → opens C-Shipping

Footer — every screen
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
 │    ├── Instagram → external URL
 │    ├── Facebook → external URL
 │    └── TikTok → external URL
 └── Legal
      ├── Privacy Policy → S-013 (/privacy-policy)
      └── Terms of Service → S-014 (/terms-of-service)
```

## 7. Build Steps

### Phase 1 — Foundation
| Step | What to Build | References |
|---|---|---|
| B-001 | Set up the project and deployment: Next.js 15, TypeScript, Tailwind, Vercel, env vars, and the design tokens. Keep it shippable from day one. | Stack, section 8 |
| B-002 | Build the Shopify data layer: one shopifyFetch wrapper, product and collection queries, and cart Server Actions. Front-load this risky integration. | D-001, D-002, D-003 |

### Phase 2 — Global Chrome
| Step | What to Build | References |
|---|---|---|
| B-003 | Build the global chrome: transparent and sticky headers, menu drawer, footer, announcement bar, and nav wiring. | C-Transparent, C-Sticky, C-Menu, C-Footer, D-006 |

### Phase 3 — Commerce Browse
| Step | What to Build | References |
|---|---|---|
| B-004 | Build the product grid, the Shop hub, and the three category pages, with the attribute filter and view toggle. | S-002, S-003, S-004, S-005, F-001, F-002, F-003, D-002 |
| B-005 | Build the Product Detail page: media gallery, variant selection, sold-out and preorder states, and the sizing and shipping drawers. | S-006, C-Sizing, C-Shipping, F-010, D-001, D-005 |

### Phase 4 — Cart & Checkout
| Step | What to Build | References |
|---|---|---|
| B-006 | Build the cart drawer, add to cart, buy now, and the checkout handoff to Shopify. | C-Cart, F-006, F-007, F-008, F-009, D-003 |

### Phase 5 — Home & Content
| Step | What to Build | References |
|---|---|---|
| B-007 | Build the Home page: hero carousel, curated category tiles, and featured products. | S-001, F-004, F-005, F-001, D-004 |
| B-008 | Build the info pillars and the content and policy pages as one static-content set. | S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-014, D-007 |

### Phase 6 — Launch Readiness
| Step | What to Build | References |
|---|---|---|
| B-009 | Add SEO: per-page metadata, product JSON-LD, canonical URLs, and the sitemap. | All screens, section 8 |
| B-010 | Launch gate: hit the performance target, meet accessibility, and run full QA. | Section 8 |

## 8. Extra Details

### Connectivity
The store needs the network to reach the Shopify Storefront API for products, collections, cart, and checkout. Without it, product data, cart, and checkout do not work. Content and policy pages render from repo content and the Home layout from repo config, so they hold up better.

### Storage
- **Client:** the Shopify cart ID in a cookie; the cookie carries the cart across pages and refreshes. A view-toggle choice may sit in local storage.
- **Server:** none of our own. The cart lives in Shopify; content lives in the repo.

### Accessibility
Every screen meets WCAG 2.1 AA: keyboard access, visible focus, alt text on images, correct heading order, and focus handling in the drawers.

### Performance
Every screen meets a Lighthouse score of 90+ across Performance, SEO, Best Practices, and Accessibility. Use next/image, Suspense skeletons, and minimal client JavaScript.

### Security & Privacy
The Storefront access token stays server-side only and never ships in the client bundle. Shopify hosted checkout handles all payment and personal data, so the store never touches card data. The only cookie we set is the cart ID. The Privacy Policy page states what we collect and how.

### Integrations / External Services
- Shopify Storefront API — products, collections, and cart.
- Shopify hosted checkout — payment, tax, shipping, and discounts.
- Shopify hosted customer accounts — the Login/Account link.
- Vercel — hosting and deployment.
- Instagram, Facebook, TikTok — outbound social links only.

### Environment / Config
- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- Storefront API version
- Shopify account / login URL
- Site base URL
- Home content config path (D-004)
- Size-chart TSV path (D-005)

### Active Items
| ID | Name | Status |
|---|---|---|
| US-001 | Home browse and discover | Active |
| US-002 | Browse all products | Active |
| US-003 | Browse a category | Active |
| US-004 | Filter by attribute | Active |
| US-005 | Grid view toggle | Active |
| US-006 | View product detail | Active |
| US-007 | Add to cart | Active |
| US-008 | Buy now | Active |
| US-009 | Review the cart | Active |
| US-010 | Checkout | Active |
| US-011 | Sizing and shipping info | Active |
| US-012 | Empty cart state | Active |
| F-001 | Product Grid | Active |
| F-002 | Attribute Filter | Active |
| F-003 | Grid View Toggle | Active |
| F-004 | Hero Carousel | Active |
| F-005 | Home Curated Sections | Active |
| F-006 | Add to Cart | Active |
| F-007 | Cart Management | Active |
| F-008 | Checkout Handoff | Active |
| F-009 | Buy Now | Active |
| F-010 | Size Chart | Active |
| D-001 | Product | Active |
| D-002 | Collection | Active |
| D-003 | Cart | Active |
| D-004 | Home Content | Active |
| D-005 | Size Chart | Active |
| D-006 | Site Config | Active |
| D-007 | Page Content | Active |
