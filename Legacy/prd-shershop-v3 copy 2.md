> **This document defines version v3 of the product. Earlier versions hold what came before; the Active Items list shows everything in effect now. Page outline and structure live in the Planning TSV; styling lives in the design system file; brand voice lives in the brand doc. Do not add features, screens, or data the plan doesn't call for.**

---

# SHER — SherShop Requirements Document

**Platform:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Shopify Storefront API, Shopify hosted checkout, Vercel
**Version:** v3

## 1. Main Goals
1. Let shoppers browse the full SHER range and each category from one store.
2. Let shoppers open a product, pick a color and size, and add it to a cart.
3. Take shoppers to Shopify's hosted checkout to buy.
4. Give each product type an information page that ranks for its search term.
5. Give the store its brand, policy, and contact pages.

## 2. User Stories
| ID | Story |
|---|---|
| US-001 | As a shopper, I want to see featured products and categories on the home page so I can find what SHER sells. |
| US-002 | As a shopper, I want to browse all products in one shop so I can see the full range. |
| US-003 | As a shopper, I want to browse a single category so I can focus on one product type. |
| US-004 | As a shopper, I want to filter a category by its attribute so I can narrow to my choice. |
| US-005 | As a shopper, I want to open a product and see its images and options so I can decide to buy. |
| US-006 | As a shopper, I want to pick a color and size so I can order the right one. |
| US-007 | As a shopper, I want to add a product to my cart so I can buy it. |
| US-008 | As a shopper, I want to review and change my cart so I can confirm my order. |
| US-009 | As a shopper, I want to check out safely so I can pay and finish. |
| US-010 | As a shopper, I want to see a size chart so I can pick the right fit. |
| US-011 | As a shopper, I want to preorder a sold-out product so I can still buy it. |
| US-012 | As a shopper, I want to reach my account so I can see my orders. |

## 3. Features

### F-001 — Product Browsing
- **What it does:** Fetches the products for a collection and shows them as a grid of cards. Each card has the image, name, and price, and links to the product page. The same grid runs on Shop, the three category pages, the Home featured row, and the "You May Also Like" row.
- **When it appears:** On load of `/`, `/shop`, `/shop/[category]`, and `/products/[product-slug]`.
- **If something goes wrong:** If products fail to load, show a short error state, not a blank grid. An empty collection shows a "no products yet" note.

### F-002 — Attribute Filter
- **What it does:** Filters the products on a category page by one attribute, in place, with no page reload. Corset tops filter by closure type, matching sets by set type, cocktail dresses by length.
- **When it appears:** As button pills above the grid on `/shop/corset-tops`, `/shop/matching-sets`, and `/shop/cocktail-dresses`.
- **If something goes wrong:** If a filter matches nothing, show an empty state and let the shopper clear the filter.

### F-003 — View Toggle
- **What it does:** Lets the shopper change how many columns the grid shows. Mobile switches between 1 and 2 columns. Desktop switches between 2 and 3 columns.
- **When it appears:** Above the grid on Shop and the three category pages.
- **If something goes wrong:** If no choice is saved, use the default of 2 columns on mobile and 3 on desktop.

### F-004 — Shopping Cart
- **What it does:** Holds the items a shopper wants to buy. Creates a Shopify cart on the first add. Adds, updates quantity, and removes line items, and shows the subtotal. Saves the cart ID in a cookie so the cart stays across pages and refreshes.
- **When it appears:** Opens as the C-Cart drawer from the header cart icon, and after Add to Cart on the product page.
- **If something goes wrong:** If a cart action fails, keep the last good cart and show a short error. If the saved cart is gone, start a new one.

### F-005 — Checkout
- **What it does:** Sends the shopper to Shopify's hosted checkout using the cart's `checkoutUrl`. Buy Now on the product page goes straight there.
- **When it appears:** From the Checkout button in C-Cart, and the Buy Now button on the product page.
- **If something goes wrong:** If no checkout URL is ready, keep the shopper on the site and show an error.

### F-006 — Size Chart
- **What it does:** Shows a product's size chart in a drawer. Reads the cm measurements from a size-chart TSV in the repo, shows only the measurements that product defines, and works out the inches table from the cm values.
- **When it appears:** From the size-guide link on the product page, in the C-Sizing drawer.
- **If something goes wrong:** If a product has no size data, hide the size-guide link.

### F-007 — Hero Carousel
- **What it does:** Shows a sliding set of hero banners at the top of Home. Each slide has an image, overlay text, and a link. The slides come from the Home content config in the repo.
- **When it appears:** At the top of Home (`/`).
- **If something goes wrong:** If Home content is missing, show one static fallback banner.

## 4. Data
| ID | What the Product Needs | Source | Details |
|---|---|---|---|
| D-001 | Product | Shopify Storefront API | Title, slug, price, description, images, options, and variants (color, size, inventory, type attribute). |
| D-002 | Collection | Shopify Storefront API | The three category collections and their products. Handles: corset-tops, matching-sets, cocktail-dresses. |
| D-003 | Cart | Shopify Storefront API + cookie | Line items, quantities, subtotal, and `checkoutUrl`. Cart ID saved in a cookie. |
| D-004 | Home content | Repo config | Hero slides, category slots, and featured slots: image, overlay text, and link for each. |
| D-005 | Size chart | Size-chart TSV in repo config | Per-product cm measurements. Inches worked out from cm. |
| D-006 | Page content | `/docs/content/` MD files | The written copy for Home and every static and SEO page, plus the contact email and warehouse address. |
| D-007 | Site config | Repo config | Announcement bar text, social media URLs (Instagram, Facebook, TikTok), and the footer link map. |

## 5. Screens & Components

### S-001 — Home
- **What's on it:**
  - Refer to /docs/content/s-001_home.md
- **Feature:** F-007 Hero Carousel, F-001 Product Browsing
- **Behavior:**
  - The hero is a sliding carousel.
  - Hero banners, category images, and product images come from D-004 Home content.
- **Components & Assets:**
  - (FE & Director will update this)

### S-002 — Shop
- **What's on it:**
  - Refer to /docs/content/s-002_shop.md
- **Feature:** F-001 Product Browsing, F-003 View Toggle
- **Behavior:**
  - The view toggle sets the grid to 1 or 2 columns on mobile, 2 or 3 on desktop.
- **Components & Assets:**
  - (FE & Director will update this)

### S-003 — Shop Corset Tops
- **What's on it:**
  - Refer to /docs/content/s-003_shop-corset-tops.md
- **Feature:** F-001 Product Browsing, F-002 Attribute Filter, F-003 View Toggle
- **Behavior:**
  - The attribute filter narrows the grid by closure type, in place.
  - The view toggle sets the grid to 1 or 2 columns on mobile, 2 or 3 on desktop.
- **Components & Assets:**
  - (FE & Director will update this)

### S-004 — Shop Matching Sets
- **What's on it:**
  - Refer to /docs/content/s-004_shop-matching-sets.md
- **Feature:** F-001 Product Browsing, F-002 Attribute Filter, F-003 View Toggle
- **Behavior:**
  - The attribute filter narrows the grid by set type, in place.
  - The view toggle sets the grid to 1 or 2 columns on mobile, 2 or 3 on desktop.
- **Components & Assets:**
  - (FE & Director will update this)

### S-005 — Shop Cocktail Dresses
- **What's on it:**
  - Refer to /docs/content/s-005_shop-cocktail-dresses.md
- **Feature:** F-001 Product Browsing, F-002 Attribute Filter, F-003 View Toggle
- **Behavior:**
  - The attribute filter narrows the grid by length, in place.
  - The view toggle sets the grid to 1 or 2 columns on mobile, 2 or 3 on desktop.
- **Components & Assets:**
  - (FE & Director will update this)

### S-006 — Product Detail
- **What's on it:**
  - Media gallery: thumbnail strip and main image.
  - Breadcrumb: Shop › {Category} › product.
  - Product name and price.
  - Color selector: image thumbnails, one per color.
  - Size selector: the available sizes.
  - Quantity selector, Add to Cart button, Buy Now button.
  - Product description and the type attribute (closure type, set type, or length).
  - Links that open C-Sizing and C-Shipping.
  - "You May Also Like": a subtitle, a Back to {Category} button, a More about {Category} button, and a grid of 2 random products from the same category.
- **Feature:** F-001 Product Browsing, F-004 Shopping Cart, F-005 Checkout, F-006 Size Chart
- **Behavior:**
  - A thumbnail sets the main image. Picking a color jumps to that color's image.
  - The breadcrumb cuts the product name with an ellipsis on small screens. The full name stays in the markup.
  - Add to Cart opens C-Cart.
  - Buy Now goes to Shopify checkout.
  - Sold-out sizes and colors are disabled. When every option is sold out, the buy buttons swap to a Preorder link to /contact.
- **Components & Assets:**
  - (FE & Director will update this)

### S-007 — Corset Tops
- **What's on it:**
  - Refer to /docs/content/s-007_corset-tops.md
- **Behavior:**
  - The FAQ accordion keeps one item open at a time.
- **Components & Assets:**
  - (FE & Director will update this)

### S-008 — Matching Sets
- **What's on it:**
  - Refer to /docs/content/s-008_matching-sets.md
- **Behavior:**
  - The FAQ accordion keeps one item open at a time.
- **Components & Assets:**
  - (FE & Director will update this)

### S-009 — Cocktail Dresses
- **What's on it:**
  - Refer to /docs/content/s-009_cocktail-dresses.md
- **Behavior:**
  - The FAQ accordion keeps one item open at a time.
- **Components & Assets:**
  - (FE & Director will update this)

### S-010 — About Us
- **What's on it:**
  - Refer to /docs/content/s-010_about-us.md
- **Behavior:**
  - No change this version.
- **Components & Assets:**
  - (FE & Director will update this)

### S-011 — Contact
- **What's on it:**
  - Refer to /docs/content/s-011_contact.md
- **Behavior:**
  - No change this version.
- **Components & Assets:**
  - (FE & Director will update this)

### S-012 — Shipping & Returns
- **What's on it:**
  - Refer to /docs/content/s-012_shipping-returns.md
- **Behavior:**
  - No change this version.
- **Components & Assets:**
  - (FE & Director will update this)

### S-013 — Privacy Policy
- **What's on it:**
  - Refer to /docs/content/s-013_privacy-policy.md
- **Behavior:**
  - No change this version.
- **Components & Assets:**
  - (FE & Director will update this)

### S-014 — Terms of Service
- **What's on it:**
  - Refer to /docs/content/s-014_terms-of-service.md
- **Behavior:**
  - No change this version.
- **Components & Assets:**
  - (FE & Director will update this)

### C-Transparent — Transparent Header
- **What's on it:**
  - Announcement bar: "Delivers Worldwide. Free Global Shipping over $250".
  - Hamburger icon (opens C-Menu).
  - White square logo, links to /, sized large so it overflows below the header.
  - Cart icon (opens C-Cart).
- **Behavior:**
  - Home only. It is see-through and does not stick. It scrolls away with the page.

### C-Sticky — Sticky Header
- **What's on it:**
  - Announcement bar: "Delivers Worldwide. Free Global Shipping over $250".
  - Hamburger icon (opens C-Menu).
  - Dark symbol logo, links to /.
  - Cart icon (opens C-Cart).
- **Behavior:**
  - Solid and sticky on every screen. On Home it takes over after 60vh of scroll.

### C-Menu — Menu Drawer
- **What's on it:**
  - Dark symbol logo, links to /.
  - "Shop Now" group: Corset Tops, Matching Sets, Cocktail Dress, Shop All (links mapped in section 6).
  - Our Story and Contact Us links.
  - Login/Account link to the Shopify account.
- **Behavior:**
  - Opens from the header hamburger. Links close the drawer and go to the page.

### C-Cart — Cart Drawer
- **What's on it:**
  - "Your Cart" title.
  - Line items: image, name, options, quantity stepper, price, remove.
  - Subtotal.
  - Checkout button and the note "Checkout securely in USD, powered by Shopify".
- **Feature:** F-004 Shopping Cart, F-005 Checkout
- **Behavior:**
  - Changing an item's quantity or removing it updates the cart and the subtotal.
  - Checkout opens Shopify's hosted checkout.
  - Shows an empty state when the cart is empty.

### C-Footer — Footer
- **What's on it:**
  - Shop & Learn: Corset Tops, Matching Sets, Cocktail Dress, Shop All.
  - More Information: Our Story, Contact, Shipping & Returns.
  - Connect with Us: Instagram, Facebook, TikTok icons.
  - Bottom row: "© SHER {year}", Privacy Policy, Terms of Service.
  - Links mapped in section 6.

### C-Sizing — Size Chart Drawer
- **What's on it:**
  - "Size Chart" title.
  - Product name.
  - A note: the guide is based on measurements and varies by style. Each piece can be tailored. Reach out if unsure.
  - Measurements in cm.
  - Measurements in inches.
- **Feature:** F-006 Size Chart
- **Behavior:**
  - Shows only the measurements a product defines. One it leaves out (say, no Hip on a corset top) is dropped from the table.
  - The inches table is worked out from the cm values. The cm values come from a size-chart TSV in repo config.

### C-Shipping — Shipping & Returns Drawer
- **What's on it:**
  - Refer to /docs/content/s-012_shipping-returns.md
- **Behavior:**
  - Shows the same content as the /shipping-returns page.

## 6. Navigation

```
Header — every screen (C-Transparent on Home, C-Sticky elsewhere and after 60vh on Home)
 ├── Hamburger → opens C-Menu
 ├── Logo → S-001 (/)
 └── Cart → opens C-Cart

Menu (C-Menu)
 ├── Shop Now
 │    ├── Corset Tops → S-007 (/corset-tops)
 │    ├── Matching Sets → S-008 (/matching-sets)
 │    ├── Cocktail Dress → S-009 (/cocktail-dresses)
 │    └── Shop All → S-002 (/shop)
 ├── Our Story → S-010 (/about)
 ├── Contact Us → S-011 (/contact)
 └── Login/Account → Shopify account

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
 │    ├── Instagram → external
 │    ├── Facebook → external
 │    └── TikTok → external
 └── Bottom
      ├── Privacy Policy → S-013 (/privacy-policy)
      └── Terms of Service → S-014 (/terms-of-service)
```

## 7. Build Steps

### Phase 1 — Foundation
| Step | What to Build | References |
|---|---|---|
| B-001 | Set up the Next.js, TypeScript, and Tailwind project, the design tokens and theme, the base layout, and the Vercel deploy pipeline. Keep the site shippable from here on. | — |
| B-002 | Build the single Shopify Storefront API wrapper, with typed queries and mutations, and product and collection fetching. Do this first so the riskiest integration is proven early. | D-001, D-002 |
| B-003 | Build the global chrome: C-Transparent, C-Sticky (with the 60vh takeover), C-Menu, C-Footer, the announcement bar, and site navigation. | D-007, Navigation |

### Phase 2 — Browse and Content
| Step | What to Build | References |
|---|---|---|
| B-004 | Build the product grid and card, the view toggle, and the attribute filter. Wire up Shop and the three category pages. | S-002, S-003, S-004, S-005, F-001, F-002, F-003, D-002 |
| B-005 | Build all static and SEO pages from `/docs/content/`: the three info pillars with the accordion, About, Contact, and the three policy pages. | S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-014, D-006 |
| B-006 | Build Home: the hero carousel and the featured product row, fed by Home content. | S-001, F-007, F-001, D-004 |

### Phase 3 — Product and Cart Flow
| Step | What to Build | References |
|---|---|---|
| B-007 | Build the product page: media gallery, color and size selection, sold-out and preorder logic, and the related grid. Add C-Sizing (from the size-chart TSV) and C-Shipping. | S-006, F-006, D-001, D-005 |
| B-008 | Build the cart and checkout: C-Cart, the add, update, and remove Server Actions, the cart cookie, the subtotal, the empty state, the checkout redirect, and Buy Now. | C-Cart, F-004, F-005, D-003 |

### Phase 4 — Launch Readiness
| Step | What to Build | References |
|---|---|---|
| B-009 | Add SEO: `generateMetadata` on product and collection pages, JSON-LD Product schema, canonical URLs, and a sitemap. | S-006, S-002, S-003, S-004, S-005 |
| B-010 | Run the launch gate: performance (Lighthouse target), accessibility (WCAG AA), and cross-device QA. | All |

## 8. Extra Details

### Connectivity
The store needs the network to reach the Shopify Storefront API for products, collections, and the cart, and to reach Shopify's hosted checkout and accounts. Without it, product data, the cart, and checkout do not work. Static and SEO pages render from the repo, so they still load.

### Storage
- **Client:** the cart ID cookie, the view-toggle choice, and cookie or consent settings.
- **Server:** none owned by the app. Product and cart state live in Shopify. Page content and config live in the repo.

### Accessibility
Every screen meets WCAG 2.1 AA. This covers keyboard use, visible focus, image alt text, heading order that follows the H1, H2, H3 outline, and ARIA on the accordion and drawers.

### Performance
Every screen meets the Lighthouse target (90+). Use `next/image`, Suspense skeletons, Server Components, and minimal client JavaScript.

### Security & Privacy
Keep the Storefront token and all secrets server-side. Never import them into client components. All Shopify calls run server-side. Payment, checkout, and customer accounts are handled by Shopify, so the app never touches card data. The Privacy Policy page states how data is used.

### Integrations / External Services
- Shopify Storefront API (products, collections, cart)
- Shopify hosted checkout
- Shopify customer accounts
- Shopify CDN (product images)
- Vercel (hosting and deploy)
- Social links out to Instagram, Facebook, and TikTok

### Environment / Config
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- Shopify store domain and Storefront API endpoint
- Storefront API version
- Site base URL

### Active Items
| ID | Name | Status |
|---|---|---|
| US-001 | See featured products and categories on Home | Active |
| US-002 | Browse all products | Active |
| US-003 | Browse a category | Active |
| US-004 | Filter a category | Active |
| US-005 | Open a product | Active |
| US-006 | Pick color and size | Active |
| US-007 | Add to cart | Active |
| US-008 | Review and change the cart | Active |
| US-009 | Check out | Active |
| US-010 | See a size chart | Active |
| US-011 | Preorder a sold-out product | Active |
| US-012 | Reach my account | Active |
| F-001 | Product Browsing | Active |
| F-002 | Attribute Filter | Active |
| F-003 | View Toggle | Active |
| F-004 | Shopping Cart | Active |
| F-005 | Checkout | Active |
| F-006 | Size Chart | Active |
| F-007 | Hero Carousel | Active |
| D-001 | Product | Active |
| D-002 | Collection | Active |
| D-003 | Cart | Active |
| D-004 | Home content | Active |
| D-005 | Size chart | Active |
| D-006 | Page content | Active |
| D-007 | Site config | Active |
