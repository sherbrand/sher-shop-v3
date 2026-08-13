> **This document defines version v3 of the product. Earlier versions hold what came before; the Active Items list shows everything in effect now. Page outline and structure live in the Planning TSV; styling lives in the design system file; brand voice lives in the brand doc. Do not add features, screens, or data the plan doesn't call for.**

---

# SHER — Web Store Requirements Document

**Platform:** Next.js 15 (App Router) with Shopify headless — Storefront API (GraphQL) for data, Shopify hosted checkout and customer accounts, TypeScript, Tailwind CSS, deployed on Vercel.
**Version:** v3

## 1. Main Goals
1. Ship a full shoppable storefront: a shopper can browse, open a product, add to cart, and check out.
2. Give each product page the detail a shopper needs to buy — images, price, colour and size choices, size chart, and shipping facts.
3. Stand up the SEO pillar and category pages so the store can rank for corset tops and matching sets.
4. Publish the required info and policy pages, plus the global header, menu, cart, and footer that tie the site together.

## 2. User Stories
| ID | Story |
|---|---|
| US-001 | As a shopper, I want a home page that shows featured products and categories, so I can start browsing right away. |
| US-002 | As a shopper, I want to see all products in one place and change how many fit per row, so I can scan them my way. |
| US-003 | As a shopper, I want to filter a category by type, so I only see the pieces I care about. |
| US-004 | As a shopper, I want a product page with photos, price, and details, so I can decide if it is right for me. |
| US-005 | As a shopper, I want to pick a colour, size, and quantity and add the item to my cart, so I can buy what I chose. |
| US-006 | As a shopper, I want a Buy Now button, so I can go straight to checkout for one item. |
| US-007 | As a shopper, I want to see a size chart, so I can pick the right size before I buy. |
| US-008 | As a shopper, I want to read shipping and returns facts on the product page, so I know what to expect before I buy. |
| US-009 | As a shopper, I want to review my cart, change quantities, or remove items, then check out, so I control my order. |
| US-010 | As a shopper, I want a clear message when my cart is empty, so I know what to do next. |
| US-011 | As a shopper, I want a way to ask for an item that is sold out, so I can still get it. |

## 3. Features
### F-001 — Home Hero & Featured Content
- **What it does:** Fills the Home page from a content source — the sliding hero carousel, the two category cards, and the featured product slots, each with its image, overlay text, and link.
- **When it appears:** On load of Home (`/`), S-001.
- **If something goes wrong:** If the content source fails to load, show the static page copy and category cards without the carousel; never a blank hero.

### F-002 — Product Catalogue & Grid
- **What it does:** Reads products from a collection and lays them out in a responsive grid (2 columns mobile, 3 desktop). Each card links to its product page. Used on Shop, both category pages, and the "You May Also Like" strip.
- **When it appears:** On Shop (`/shop`), Shop Corset Tops (`/shop/corset-tops`), Shop Matching Sets (`/shop/matching-sets`), and inside Product Detail (S-005).
- **If something goes wrong:** If a collection is empty or fails, show a short "No products to show" message in the grid area.

### F-003 — Grid View Toggle
- **What it does:** Lets the shopper switch grid density — 1 or 2 columns on mobile, 2 or 3 on desktop.
- **When it appears:** Above the grid on Shop and both category pages.
- **If something goes wrong:** If no choice is saved, fall back to the default (2 columns mobile, 3 desktop).

### F-004 — Attribute Filter
- **What it does:** Filters the grid in place by one attribute — closure type on corset tops, set type on matching sets — using the pills at the top. No page reload.
- **When it appears:** On Shop Corset Tops and Shop Matching Sets.
- **If something goes wrong:** If a filter returns nothing, keep the pills visible and show "No products match" so the shopper can clear it.

### F-005 — Cart
- **What it does:** Holds the shopper's items. Adds an item from the product page, changes quantity, removes an item, and shows the subtotal. Opens in the cart drawer. Keeps the cart across pages and refreshes.
- **When it appears:** The drawer opens from the header cart icon and after Add to Cart; the cart persists site-wide.
- **If something goes wrong:** If a cart action fails, keep the last good state and show a short retry message. When the cart is empty, show the empty state, not a blank drawer.

### F-006 — Checkout
- **What it does:** Sends the shopper to Shopify's hosted checkout. From the cart drawer's Checkout button (full cart) or from Buy Now on a product (that one item). Checkout settles in USD.
- **When it appears:** Checkout button in C-Cart; Buy Now on Product Detail (S-005).
- **If something goes wrong:** If the checkout URL is missing, keep the shopper on the site and show a retry message.

### F-007 — Size Chart
- **What it does:** Shows a per-product size guide in a drawer. Reads centimetre measurements from a size-chart source and auto-calculates the inches table from them.
- **When it appears:** From the "Size Guide" link on Product Detail (S-005), opening C-Sizing.
- **If something goes wrong:** If a product has no size-chart entry, hide the link rather than open an empty drawer.

### F-008 — Shipping & Returns Info
- **What it does:** Presents the shipping, customs, and returns facts — in a drawer on the product page and as the full Shipping & Returns page.
- **When it appears:** From the "Shipping & Returns" link on Product Detail (opens C-Shipping), and at `/shipping-returns` (S-010).
- **If something goes wrong:** Static content; if the page copy is missing, show the section headings with a "Coming soon" note.

### F-009 — Sold-Out Preorder Fallback
- **What it does:** Disables sold-out sizes and colours. When every variant of a product is sold out, swaps the Add to Cart and Buy Now buttons for a Preorder link to Contact.
- **When it appears:** On Product Detail (S-005).
- **If something goes wrong:** If stock data is missing, treat the variant as unavailable rather than sell something out of stock.

## 4. Data
| ID | What the Product Needs | Source | Details |
|---|---|---|---|
| D-001 | Product | Shopify Storefront API | One product with its variants, colour and size options, images, price, description, and type attribute (closure type for corsets, set type for sets), plus per-variant stock. |
| D-002 | Collection | Shopify Storefront API | The corset-tops and matching-sets collections that feed the Shop and category grids and the related-products strip. Cursor-based pagination. |
| D-003 | Cart | Shopify Storefront API (cart) | Line items, quantities, subtotal, and the hosted `checkoutUrl`. Cart ID stored in a cookie; cart created on first Add to Cart. |
| D-004 | Home content | Repo config file | Hero banners, category card images and links, and featured product slots — each with slot placement, image, overlay text, and link. |
| D-005 | Size chart | Size-chart TSV in repo config | Centimetre measurements per product or style; the inches table is calculated from these. |
| D-006 | Site config | App config in repo | Announcement bar text, free-shipping threshold, footer links, social URLs, contact email, and warehouse address. |
| D-007 | Page content | Markdown in `/docs/content/` | Copy for the SEO pillar pages and the info and policy pages (About, Contact, Shipping & Returns, Privacy, Terms). |

## 5. Screens & Components

### S-001 — Home
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** (Director will update this)
  - S-001.1 → 3-5x Hero Carousel banner
  - S-001.3 → 2x Category card image (Corset Tops, Matching Sets)
- **Feature:** F-001 Home Hero & Featured Content
- **Behaviour:**
  - The hero carousel slides through its banners.
  - Hero banners, category images, and featured product images come from D-004 Home content — each slot's placement, image, overlay text, and link.
  - Category cards link to `/corset-tops` and `/shop/matching-sets`; featured product cards link to their product pages.

### S-002 — Shop
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** None
- **Feature:** F-002 Product Catalogue & Grid, F-003 Grid View Toggle
- **Behaviour:**
  - Button pills link to `/shop/corset-tops` and `/shop/matching-sets`.
  - View toggle switches grid density — 1 or 2 columns on mobile, 2 or 3 on desktop.
  - Grid shows 2 columns on mobile, 3 on desktop by default.

### S-003 — Shop Corset Tops
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** (Director will update this)
  - S-003.5 → 1x "About our Corset Tops" band image
- **Feature:** F-002 Product Catalogue & Grid, F-003 Grid View Toggle, F-004 Attribute Filter
- **Behaviour:**
  - Button pills filter the grid in place by closure type.
  - View toggle switches grid density — 1 or 2 columns on mobile, 2 or 3 on desktop.
  - The "About our Corset Tops" band links to `/corset-tops`.

### S-004 — Shop Matching Sets
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** (Director will update this)
  - S-004.5 → 1x "About our Matching Sets" band image
- **Feature:** F-002 Product Catalogue & Grid, F-003 Grid View Toggle, F-004 Attribute Filter
- **Behaviour:**
  - Button pills filter the grid in place by set type.
  - View toggle switches grid density — 1 or 2 columns on mobile, 2 or 3 on desktop.
  - The "About our Matching Sets" band links to `/matching-sets`.

### S-005 — Product Detail
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** None
- **Feature:** F-005 Cart, F-006 Checkout, F-007 Size Chart, F-008 Shipping & Returns Info, F-009 Sold-Out Preorder Fallback
- **Behaviour:**
  - Media gallery: a thumbnail sets the main image; picking a colour jumps to that colour's variant image.
  - The breadcrumb truncates the product name with an ellipsis on small screens; the full name stays in the markup.
  - Add to Cart opens C-Cart; Buy Now goes to Shopify checkout.
  - Sold-out sizes and colours are disabled; when all are sold out, the buy buttons swap to a Preorder link to `/contact`.
  - Size Guide link opens C-Sizing; Shipping & Returns link opens C-Shipping.
  - The related strip shows 2 random products from the same category.

### S-006 — Corset Tops
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** (Director will update this)
  - S-006.2 → 1x "What is a Corset Top?" band image
  - S-006.3 → 1x "How is SHER different?" band image
  - S-006.4 → 2x Closure type images (Lace, Zip)
  - S-006.5 → 1x "Quality from Inside Out" band image
- **Feature:** None
- **Behaviour:**
  - The FAQ accordion keeps one item open at a time.
  - The intro and closing buttons link to `/shop/corset-tops`.

### S-007 — Matching Sets
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** (Director will update this)
  - S-007.2 → 1x "What is a Matching Set?" band image
  - S-007.3 → 1x "How is SHER different?" band image
  - S-007.4 → 2x Set type images (Skirt, Trouser)
  - S-007.5 → 1x "Quality from Inside Out" band image
- **Feature:** None
- **Behaviour:**
  - The FAQ accordion keeps one item open at a time.
  - The intro and closing buttons link to `/shop/matching-sets`.

### S-008 — About Us
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** (Director will update this)
  - S-008.2 → 1x "Our Philosophy" image
  - S-008.3 → 1x "Meet the Founder" image
- **Feature:** None
- **Behaviour:**
  - Static content page.

### S-009 — Contact
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** None
- **Feature:** None
- **Behaviour:**
  - Social messaging links open Instagram, Facebook, and TikTok.
  - The email and warehouse address come from D-006 Site config.

### S-010 — Shipping & Returns
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** None
- **Feature:** F-008 Shipping & Returns Info
- **Behaviour:**
  - Static content page; same facts as the C-Shipping drawer.

### S-011 — Privacy Policy
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** None
- **Feature:** None
- **Behaviour:**
  - Static content page.

### S-012 — Terms of Service
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** None
- **Feature:** None
- **Behaviour:**
  - Static content page.

### C-Transparent — Transparent Header
- **What's on it:**
  - Announcement bar: "Delivers Worldwide. Free Global Shipping over $180".
  - Hamburger icon (opens C-Menu), oversized white square logo (to `/`), cart icon (opens C-Cart).
- **Behaviour:**
  - Home only; transparent and non-sticky, sitting over the hero.
  - Scrolls away with the page; the oversized logo overflows below the header.

### C-Sticky — Sticky Header
- **What's on it:**
  - Announcement bar: "Delivers Worldwide. Free Global Shipping over $180".
  - Hamburger icon (opens C-Menu), dark symbol logo (to `/`), cart icon (opens C-Cart).
- **Behaviour:**
  - Solid and sticky on every screen.
  - On Home, takes over from C-Transparent after 60vh of scroll.

### C-Menu — Menu Drawer
- **What's on it:**
  - Dark symbol logo (to `/`).
  - "Shop Now" group: Corset Tops (`/corset-tops`), Matching Sets (`/matching-sets`), Shop All (`/shop`).
  - Our Story (`/about`), Contact Us (`/contact`), Login/Account (Shopify account).
- **Behaviour:**
  - Opens from the hamburger icon in either header.

### C-Cart — Cart Drawer
- **What's on it:**
  - "Your Cart" heading.
  - Line items: image, name, options, quantity stepper, price, remove.
  - Subtotal, Checkout button, and "Checkout securely in USD, powered by Shopify".
- **Feature:** F-005 Cart, F-006 Checkout
- **Behaviour:**
  - Changing an item's quantity or removing it updates the cart and subtotal.
  - Checkout opens Shopify's hosted checkout.
  - Shows an empty state when the cart is empty.

### C-Sizing — Size Chart Drawer
- **What's on it:**
  - "Size Chart" heading and product name.
  - Guidance paragraph on measurements-based sizing and tailoring.
  - Measurements table in cm and a matching table in inches.
- **Feature:** F-007 Size Chart
- **Behaviour:**
  - Opens from the Size Guide link on Product Detail.
  - The inches table is auto-calculated from each product's cm measurements; cm values come from D-005 Size chart.

### C-Shipping — Shipping & Returns Drawer
- **What's on it:**
  - "Shipping & Returns" heading.
  - Sections: Where Do You Ship?, When Will I Receive My Order?, About Customs & Duties, Returns & Exchanges.
- **Feature:** F-008 Shipping & Returns Info
- **Behaviour:**
  - Opens from the Shipping & Returns link on Product Detail.

### C-Footer — Footer
- **What's on it:**
  - "Shop & Learn": Corset Tops (`/corset-tops`), Matching Sets (`/matching-sets`), Shop All (`/shop`).
  - "More Information": Our Story (`/about`), Contact (`/contact`), Shipping & Returns (`/shipping-returns`).
  - "Connect with Us": Instagram, Facebook, TikTok icons.
  - "© SHER {year}", Privacy Policy (`/privacy-policy`), Terms of Service (`/terms-of-service`).
- **Behaviour:**
  - Links mapped in section 6; the year fills automatically.

## 6. Navigation

```
Header — every screen (C-Transparent on Home hero, C-Sticky elsewhere and after 60vh on Home)
 ├── Logo → S-001 (/)
 ├── Hamburger → opens C-Menu
 └── Cart → opens C-Cart

Menu Drawer (C-Menu)
 ├── Logo → S-001 (/)
 ├── Shop Now
 │    ├── Corset Tops → S-006 (/corset-tops)
 │    ├── Matching Sets → S-007 (/matching-sets)
 │    └── Shop All → S-002 (/shop)
 ├── Our Story → S-008 (/about)
 ├── Contact Us → S-009 (/contact)
 └── Login/Account → Shopify hosted account

Cart Drawer (C-Cart)
 └── Checkout → Shopify hosted checkout

Footer — every screen (C-Footer)
 ├── Shop & Learn
 │    ├── Corset Tops → S-006 (/corset-tops)
 │    ├── Matching Sets → S-007 (/matching-sets)
 │    └── Shop All → S-002 (/shop)
 ├── More Information
 │    ├── Our Story → S-008 (/about)
 │    ├── Contact → S-009 (/contact)
 │    └── Shipping & Returns → S-010 (/shipping-returns)
 ├── Connect with Us
 │    ├── Instagram → external URL
 │    ├── Facebook → external URL
 │    └── TikTok → external URL
 ├── Privacy Policy → S-011 (/privacy-policy)
 └── Terms of Service → S-012 (/terms-of-service)
```

## 7. Build Steps
### Phase 1 — Foundation
| Step | What to Build | References |
|---|---|---|
| B-001 | Next.js App Router project, TypeScript strict, Tailwind, and Vercel deployment set up so the site is shippable from day one. | claude-repo.md |
| B-002 | The single `shopifyFetch()` Storefront API wrapper, typed responses, and the query/mutation folders. | D-001, D-002, D-003 |
| B-003 | Global chrome: both headers with the transparent→sticky swap, the menu drawer, and the footer. | C-Transparent, C-Sticky, C-Menu, C-Footer |

### Phase 2 — Browse
| Step | What to Build | References |
|---|---|---|
| B-004 | Product catalogue grid with the view toggle, used on Shop and both category pages; add the in-place attribute filter for the category pages. | F-002, F-003, F-004, S-002, S-003, S-004, D-002 |
| B-005 | Product Detail page: media gallery, variant selection, size chart and shipping drawers, and the sold-out preorder fallback. | S-005, F-007, F-008, F-009, C-Sizing, C-Shipping, D-001, D-005 |

### Phase 3 — Cart & Checkout
| Step | What to Build | References |
|---|---|---|
| B-006 | Cart with Server Actions — add, update, remove, subtotal, cookie-stored cart ID, and the cart drawer with its empty state; hand off to Shopify hosted checkout from the drawer and from Buy Now. | F-005, F-006, C-Cart, D-003 |

### Phase 4 — Content
| Step | What to Build | References |
|---|---|---|
| B-007 | Home page fed by the Home content config — hero carousel, category cards, and featured product slots. | S-001, F-001, D-004 |
| B-008 | SEO pillar pages (Corset Tops, Matching Sets) with their FAQ accordions. | S-006, S-007, D-007 |
| B-009 | Info and policy pages (About, Contact, Shipping & Returns, Privacy, Terms). | S-008, S-009, S-010, S-011, S-012, D-006, D-007 |

### Phase 5 — Launch Gate
| Step | What to Build | References |
|---|---|---|
| B-010 | Launch readiness: SEO metadata and Product JSON-LD, performance and accessibility targets, and full-site QA before go-live. | Section 8 |

## 8. Extra Details
### Connectivity
The store needs a network connection to reach the Shopify Storefront API for products, collections, and cart, and to open hosted checkout and accounts. Without it, product data, cart actions, and checkout all fail; static page copy that is built at deploy time can still render.

### Storage
On the client: the Shopify cart ID in a cookie, and the grid view-toggle choice. Everything else — products, collections, cart contents, orders, and customer accounts — lives on Shopify's servers.

### Accessibility
Every screen meets WCAG 2.1 AA — keyboard access for all controls, visible focus, labelled form fields, alt text on images, and colour contrast that passes.

### Performance
Every screen meets a Lighthouse target of 90+ on Performance, Accessibility, Best Practices, and SEO. Use Server Components, `next/image`, Suspense skeletons, and minimal client JavaScript.

### Security & Privacy
All Shopify calls run server-side; the Storefront access token and any secrets never ship to the client. Checkout, payment, and customer accounts are handled by Shopify, so the store never touches card data or account passwords. Personal data is covered by the Privacy Policy page.

### Integrations / External Services
- Shopify Storefront API — products, collections, cart.
- Shopify hosted checkout — payment, tax, shipping, discounts.
- Shopify hosted customer accounts — login and account.
- Vercel — hosting and deployment.
- Social profiles — Instagram, Facebook, TikTok (outbound links only).

### Environment / Config
- `SHOPIFY_STORE_DOMAIN` — the Shopify store domain.
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` — Storefront API token (server-side only).
- Repo config for D-004 Home content, D-005 Size chart TSV, and D-006 Site config.

### Active Items
| ID | Name | Status |
|---|---|---|
| US-001 | Browse from Home | Active |
| US-002 | Browse all products with grid toggle | Active |
| US-003 | Filter a category | Active |
| US-004 | View product detail | Active |
| US-005 | Pick options and add to cart | Active |
| US-006 | Buy Now | Active |
| US-007 | View size chart | Active |
| US-008 | Read shipping & returns | Active |
| US-009 | Review and edit cart, then checkout | Active |
| US-010 | Empty-cart state | Active |
| US-011 | Preorder when sold out | Active |
| F-001 | Home Hero & Featured Content | Active |
| F-002 | Product Catalogue & Grid | Active |
| F-003 | Grid View Toggle | Active |
| F-004 | Attribute Filter | Active |
| F-005 | Cart | Active |
| F-006 | Checkout | Active |
| F-007 | Size Chart | Active |
| F-008 | Shipping & Returns Info | Active |
| F-009 | Sold-Out Preorder Fallback | Active |
| D-001 | Product | Active |
| D-002 | Collection | Active |
| D-003 | Cart | Active |
| D-004 | Home content | Active |
| D-005 | Size chart | Active |
| D-006 | Site config | Active |
| D-007 | Page content | Active |
