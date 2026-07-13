> **This document defines version v3 of the product. Earlier versions hold what came before; the Active Items list shows everything in effect now. Page outline and structure live in the Planning TSV; styling lives in the design system file; brand voice lives in the brand doc. Do not add features, screens, or data the plan doesn't call for.**

---

# SHER — SHER Web Store Requirements Document

**Platform:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Shopify headless (Storefront API, hosted checkout, hosted customer accounts), deployed on Vercel.
**Version:** v3

## 1. Main Goals
1. Launch a store people can shop: browse the range, open a product, pick a size and color, add to cart, and check out through Shopify.
2. Win the category head terms with information-first pillar pages for corset tops, matching sets, and cocktail dresses.
3. Ship the full site chrome, the commerce browse and product pages, and the required content and policy pages.

## 2. User Stories
| ID | Story |
|---|---|
| US-001 | As a customer, I want to land on a home page that shows featured pieces and categories so I can start where I like. |
| US-002 | As a customer, I want to browse every product in one place so I can see the whole range. |
| US-003 | As a customer, I want to browse one category on its own so I can focus on one type. |
| US-004 | As a customer, I want to filter a category by its key attribute so I can narrow to what fits me. |
| US-005 | As a customer, I want to see a product's photos, price, colors, and sizes so I can decide to buy. |
| US-006 | As a customer, I want to add a product to my cart so I can keep shopping before I pay. |
| US-007 | As a customer, I want to review my cart and change amounts or remove items so I can confirm my order. |
| US-008 | As a customer, I want to check out securely so I can pay for my order. |

## 3. Features
### F-001 — Product Grid
- **What it does:** Shows a grid of products pulled from a Shopify collection. Reused on the Shop page, the three category pages, the Home featured block, and the "You May Also Like" block.
- **When it appears:** On any screen that lists products (S-001, S-002, S-003, S-004, S-005, S-006).
- **If something goes wrong:** If products fail to load, show a skeleton, then an error or retry state, not a blank grid. An empty collection shows a short "nothing here yet" note.

### F-002 — Attribute Filter
- **What it does:** Filters the category grid in place by one attribute: closure type (corset tops), set type (matching sets), or length (cocktail dresses). No page reload.
- **When it appears:** On the three category pages (S-003, S-004, S-005), above the grid, as Button Pills.
- **If something goes wrong:** If a filter matches no products, show a short empty message and keep the pills so the customer can clear it.

### F-003 — Grid View Toggle
- **What it does:** Lets the customer switch grid columns: 1 or 2 on mobile, 2 or 3 on desktop.
- **When it appears:** On the Shop and category pages (S-002, S-003, S-004, S-005), next to the grid.
- **If something goes wrong:** If no choice is set, fall back to the default (2 on mobile, 3 on desktop).

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
- **What it does:** Renders a product's size chart from the D-005 size-chart TSV. Shows only the measurements the product defines and works out the inches table from the cm values.
- **When it appears:** In the size chart drawer (C-Sizing), opened from the product page.
- **If something goes wrong:** If a product has no chart data, hide the size-guide link.

### F-008 — Home Content
- **What it does:** Renders the Home hero carousel, the category tiles, and the featured products from D-004 Home content. Each slot gives placement, image, overlay text, and link. The hero slides.
- **When it appears:** On the Home page (S-001).
- **If something goes wrong:** If content is missing, show the first hero banner only and leave any empty slot out.

### F-009 — Structured Data
- **What it does:** Adds JSON-LD Product data to each product page: name, description, image, price, currency, and availability. Placed in a script tag in the page's Server Component.
- **When it appears:** On every product page (S-006), in the server-rendered markup.
- **If something goes wrong:** If a field is missing, skip that field but still render the page.

## 4. Data
| ID | Data Item | Source | Details |
|---|---|---|---|
| D-001 | Product | Shopify Storefront API | Title, slug, description, price, images, color and size variants, availability, and type attribute (closure, set type, or length). |
| D-002 | Collection | Shopify Storefront API | The shop and three category collections, plus which products belong to each. Powers the Shop and category grids. |
| D-003 | Cart | Shopify Storefront API + cart ID cookie | Line items, quantities, subtotal, and checkout URL. The cart ID lives in a cookie. |
| D-004 | Home Content | App repo config file | Hero banners, category tiles, and featured product refs: slot placement, image, overlay text, and link. |
| D-005 | Size Chart | Size-chart TSV in app repo config | Per-style cm measurements. Inches are worked out from these. |
| D-006 | Page Content | Content MD files in `/docs/content/` | The copy for the info pillars, About, Contact, and policy pages. |
| D-007 | Site Config | App repo config | Announcement bar text, nav and footer links, social URLs, contact email, and warehouse address. |

## 5. Screens & Components

### S-001 — Home
- **What's on it:**
  - Refer to /docs/content/s-001_home.md
- **Feature:** F-008 Home Content, F-001 Product Grid
- **Behavior:**
  - The hero carousel slides through its banners.
  - The hero banners, category tiles, and featured products come from D-004 Home content.
  - The header starts transparent (C-Transparent); the sticky header (C-Sticky) takes over after 60vh of scroll.
- **Components & Assets:**
  - (to be updated later)

### S-002 — Shop
- **What's on it:**
  - Refer to /docs/content/s-002_shop.md
- **Feature:** F-001 Product Grid, F-003 Grid View Toggle
- **Behavior:**
  - The button pills link to the three category pages.
  - The view toggle sets 1 or 2 columns on mobile and 2 or 3 on desktop.
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
  - Media gallery: thumbnail strip and main image.
  - Breadcrumb: Shop › Category › product.
  - Product name, price, and description.
  - Color selector (image thumbnails per color) and size selector.
  - Quantity selector, Add to Cart button, and Buy Now button.
  - Type attribute: closure type for corsets, set type for matching sets, length for cocktail dresses.
  - A link that opens the Size Chart (C-Sizing) and a link that opens Shipping & Returns (C-Shipping).
  - "You May Also Like": a Back to Category button, a More about Category button, and a grid of 2 random products from the same category.
- **Feature:** F-004 Add to Cart, F-006 Checkout, F-001 Product Grid, F-009 Structured Data
- **Behavior:**
  - A thumbnail sets the main image; picking a color jumps to that color's image.
  - The breadcrumb trims the product name with an ellipsis on small screens; the full name stays in the markup.
  - Add to Cart opens C-Cart. Buy Now goes straight to Shopify checkout.
  - Sold-out sizes and colors are disabled. When every variant is sold out, the buy buttons swap to a Preorder link to /contact.
  - The sizing and shipping links open C-Sizing and C-Shipping.
- **Components & Assets:**
  - (to be updated later)

### S-007 — Corset Tops
- **What's on it:**
  - Refer to /docs/content/s-007_corset-tops.md
- **Feature:** None
- **Behavior:**
  - The FAQ accordion keeps one item open at a time.
- **Components & Assets:**
  - (to be updated later)

### S-008 — Matching Sets
- **What's on it:**
  - Refer to /docs/content/s-008_matching-sets.md
- **Feature:** None
- **Behavior:**
  - The FAQ accordion keeps one item open at a time.
- **Components & Assets:**
  - (to be updated later)

### S-009 — Cocktail Dresses
- **What's on it:**
  - Refer to /docs/content/s-009_cocktail-dresses.md
- **Feature:** None
- **Behavior:**
  - The FAQ accordion keeps one item open at a time.
- **Components & Assets:**
  - (to be updated later)

### S-010 — About Us
- **What's on it:**
  - Refer to /docs/content/s-010_about-us.md
- **Feature:** None
- **Behavior:**
  - None
- **Components & Assets:**
  - (to be updated later)

### S-011 — Contact
- **What's on it:**
  - Refer to /docs/content/s-011_contact.md
- **Feature:** None
- **Behavior:**
  - The social messaging links, email, and address come from D-007 Site config.
- **Components & Assets:**
  - (to be updated later)

### S-012 — Shipping & Returns
- **What's on it:**
  - Refer to /docs/content/s-012_shipping-returns.md
- **Feature:** None
- **Behavior:**
  - None
- **Components & Assets:**
  - (to be updated later)

### S-013 — Privacy Policy
- **What's on it:**
  - Refer to /docs/content/s-013_privacy-policy.md
- **Feature:** None
- **Behavior:**
  - None
- **Components & Assets:**
  - (to be updated later)

### S-014 — Terms of Service
- **What's on it:**
  - Refer to /docs/content/s-014_terms-of-service.md
- **Feature:** None
- **Behavior:**
  - None
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
  - "Shop Now": Corset Tops, Matching Sets, Cocktail Dress, Shop All
  - Our Story, Contact Us, and Login/Account (to the Shopify hosted account)
- **Behavior:**
  - Opens from the hamburger icon. A link closes the drawer and goes to the page.

### C-Cart — Cart Drawer
- **What's on it:**
  - "Your Cart"
  - Line items: image, name, options, quantity stepper, price, remove
  - Subtotal
  - Checkout button, and "Checkout securely in USD, powered by Shopify"
- **Feature:** F-005 Cart Management, F-006 Checkout
- **Behavior:**
  - Changing an item's quantity or removing it updates the cart and subtotal.
  - Checkout opens Shopify's hosted checkout.
  - Shows an empty state when the cart is empty.

### C-Footer — Footer
- **What's on it:**
  - "Shop & Learn": Corset Tops, Matching Sets, Cocktail Dress, Shop All
  - "More Information": Our Story, Contact, Shipping & Returns
  - "Connect with Us": Instagram, Facebook, TikTok
  - "© SHER {year}", Privacy Policy, and Terms of Service
- **Behavior:**
  - Social icons open the external profiles. Links mapped in section 6.

### C-Sizing — Size Chart Drawer
- **What's on it:**
  - "Size Chart" and the product name
  - A note: the guide is measurements-based and varies by style; each piece can be tailored; reach out if unsure
  - A cm measurements table and an inches measurements table
- **Feature:** F-007 Size Chart
- **Behavior:**
  - Renders only the measurements a product defines; one it omits (say, no Hip on a corset top) is left out of the table.
  - The inches table is worked out from the cm values. The cm values come from D-005 Size Chart.

### C-Shipping — Shipping & Returns Drawer
- **What's on it:**
  - Refer to /docs/content/s-012_shipping-returns.md
- **Behavior:**
  - Opens from the product page. Shows the same content as the /shipping-returns page.

## 6. Navigation

```
Header — every screen (C-Transparent on the Home hero, then C-Sticky after 60vh; C-Sticky everywhere else)
 ├── Hamburger → opens C-Menu
 ├── Logo → S-001
 └── Cart → opens C-Cart

Menu Drawer (C-Menu)
 ├── Shop Now
 │    ├── Corset Tops → S-007 (/corset-tops)
 │    ├── Matching Sets → S-008 (/matching-sets)
 │    ├── Cocktail Dress → S-009 (/cocktail-dresses)
 │    └── Shop All → S-002 (/shop)
 ├── Our Story → S-010 (/about)
 ├── Contact Us → S-011 (/contact)
 └── Login/Account → Shopify hosted account

Shop button pills — S-002
 ├── Corset Tops → S-003 (/shop/corset-tops)
 ├── Matching Sets → S-004 (/shop/matching-sets)
 └── Cocktail Dresses → S-005 (/shop/cocktail-dresses)

Product Detail — in page (S-006)
 ├── Sizing link → opens C-Sizing
 └── Shipping link → opens C-Shipping

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
| B-001 | Set up the project and deploy: Next.js 15 (TypeScript strict, Tailwind), env vars, design tokens and theme, and the Vercel pipeline. Keep it shippable from day one. | Stack, Section 8 |
| B-002 | Build the Shopify data layer: one `shopifyFetch()` wrapper, product and collection queries, and cart Server Actions. Front-load this risky integration. | D-001, D-002, D-003 |
| B-003 | Build the global chrome: C-Transparent, C-Sticky (with the 60vh takeover), C-Menu, C-Footer, the announcement bar, and the navigation. | C-Transparent, C-Sticky, C-Menu, C-Footer, D-007, Section 6 |

### Phase 2 — Browse
| Step | What to Build | References |
|---|---|---|
| B-004 | Build the product grid, the Shop hub, and the three category pages, with the attribute filter and the view toggle. | S-002, S-003, S-004, S-005, F-001, F-002, F-003, D-002 |
| B-005 | Build the Home page: hero carousel, category tiles, and featured products from Home content. | S-001, F-008, F-001, D-004 |

### Phase 3 — Product Detail
| Step | What to Build | References |
|---|---|---|
| B-006 | Build the Product Detail page: media gallery, variant selection, sold-out and preorder states, and the related grid. | S-006, F-001, D-001 |
| B-007 | Build the size chart drawer (from the size-chart TSV) and the shipping drawer. | C-Sizing, C-Shipping, F-007, D-005, D-006 |

### Phase 4 — Cart & Checkout
| Step | What to Build | References |
|---|---|---|
| B-008 | Build the cart drawer, add to cart, Buy Now, the empty state, and the checkout handoff to Shopify. | C-Cart, F-004, F-005, F-006, D-003 |

### Phase 5 — Content & Launch
| Step | What to Build | References |
|---|---|---|
| B-009 | Build the info pillars (with the accordion) and the About, Contact, and policy pages as one static-content set. | S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-014, D-006 |
| B-010 | Add SEO: per-page metadata, canonical URLs, JSON-LD Product structured data, the sitemap, and robots. | F-009, all screens, Section 8 |
| B-011 | Run the launch gate: hit the performance target, meet accessibility, and run full QA. | Section 8 |

## 8. Extra Details
### Connectivity
The store needs the network to reach the Shopify Storefront API for products, collections, and the cart, and to open Shopify hosted checkout. Without it, product data, cart, and checkout do not work. Content and policy pages render from repo content and the Home layout from repo config, so they hold up better.

### Storage
- **Client:** the Shopify cart ID in a cookie, so the cart survives page moves and refreshes. The view-toggle and filter state sit in the URL or local UI state.
- **Server:** none of its own. The cart lives in Shopify; content lives in the repo.

### Accessibility
Every screen meets WCAG 2.1 AA: keyboard access, visible focus, alt text on images, heading order that follows the H1, H2, H3 outline, and focus handling in the drawers and the accordion.

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
- Storefront API version
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
| US-005 | View product and pick variant | Active |
| US-006 | Add to cart | Active |
| US-007 | Review the cart | Active |
| US-008 | Checkout | Active |
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
| D-005 | Size Chart | Active |
| D-006 | Page Content | Active |
| D-007 | Site Config | Active |
