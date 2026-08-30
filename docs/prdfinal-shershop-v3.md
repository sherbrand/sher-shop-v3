> **This document defines version v3 of the product. Earlier versions hold what came before; the Active Items list shows everything in effect now. Page outline and structure live in the Planning TSV; styling lives in the design system file; brand voice lives in the brand doc. Do not add features, screens, or data the plan doesn't call for.**

---

# SHER — SherShop Requirements Document

**Platform:** Next.js 15 (App Router), TypeScript in strict mode, Tailwind CSS v4, Shopify headless (Storefront API, hosted checkout, hosted customer accounts), deployed on Vercel.
**Version:** v3

## 1. Main Goals
1. Launch a store people can shop: browse the range, open a product, pick a size, add to cart, and pay through Shopify.
2. Win the four category head terms with information-first pillar pages for corset tops, matching sets, cocktail dresses, and beachwear.
3. Ship the full site chrome, the browse and product pages, and the content and policy pages the store needs to open.

## 2. User Stories
| ID | Story |
|---|---|
| US-001 | As a customer, I want a home page that shows featured pieces and the categories so I can start where I like. |
| US-002 | As a customer, I want to browse every product in one place so I can see the whole range. |
| US-003 | As a customer, I want to browse one category on its own so I can focus on one type. |
| US-004 | As a customer, I want to filter a category by its key attribute so I can narrow it to what fits me. |
| US-005 | As a customer, I want to see a product's photos, price, and sizes so I can decide to buy. |
| US-006 | As a customer, I want to add a product to my cart so I can keep shopping before I pay. |
| US-007 | As a customer, I want to check my cart and change amounts or remove items so I can confirm my order. |
| US-008 | As a customer, I want to check out securely so I can pay for my order. |
| US-009 | As a customer, when my cart is empty, I want a clear empty state so I know to keep shopping. |
| US-010 | As a customer, I want the size chart in cm or inches so I can measure before I buy. |
| US-011 | As a customer, I want a way to ask about a piece that is sold out so I can still order it. |

## 3. Features

### F-001 — Product Grid
- **What it does:** Shows a grid of products from a Shopify collection. Each card uses the media D-005 Product Data picks, counted from 1 the way the Shopify admin counts it, with the video counted. A product with no row, a number past the end, or a number that lands on the video falls back to the product's first image. Hovering a card on desktop, or holding a finger on it on tablet and mobile, moves the card to the product's first media, or its second where the first is already the card's own. A video there plays; an image just swaps in. It goes back when the pointer leaves or the finger lifts. Use `mouseenter` and `mouseleave` on desktop, and `touchstart` and `touchend` on tablet and mobile. The video plays muted, looped and inline, and loads nothing until the pointer arrives. A browser that cannot play it shows that video's own still frame instead. A product with nothing else to show does not swap. On the listing screens the grid fetches the whole collection server-side, shows 12, and a Load More button reveals the next 12. Load More keeps any active filter and column choice. A divider sits under the grid when nothing is left.
- **When it appears:** On the listing screens (S-002, S-003, S-004, S-005, S-012) and in the "You May Also Like" block on S-006. Load More appears only on the listing screens, and only when the collection holds more than 12 products.
- **If something goes wrong:** If products fail to load, show a skeleton, then an error and retry state, not a blank grid. An empty collection shows a short "nothing here yet" note. A collection over 250 products is more than one Storefront API fetch returns, so cap the query at 250 and log it.

### F-002 — Attribute Filter
- **What it does:** Filters the category grid in place by one type attribute: closure type on corset tops, set type on matching sets, length on cocktail dresses, swim type on beachwear. No page reload.
- **When it appears:** On the four category pages (S-003, S-004, S-005, S-012), as Button Pills above the grid.
- **If something goes wrong:** If a filter matches no products, show a short empty message and keep the pills so the customer can clear it.

### F-003 — Grid View Toggle
- **What it does:** Switches how many columns the grid shows: 1 or 2 on mobile, 2 or 3 on desktop. The choice holds while the customer stays on the page, including through Load More. The toggle sticks to the bottom-left once it scrolls out of view.
- **When it appears:** On the listing screens (S-002, S-003, S-004, S-005, S-012), next to the grid.
- **If something goes wrong:** If no choice is set, fall back to the default: 1 column on mobile, 2 on desktop.

### F-004 — Add to Cart
- **What it does:** Adds the chosen size variant to the Shopify cart and opens the cart drawer. Creates the cart on the first add and stores the cart ID in a cookie.
- **When it appears:** On the Product Detail page (S-006), from the Add to Cart button.
- **If something goes wrong:** If the add fails, keep the customer on the page and show a short error. Block the add when the variant is sold out.

### F-005 — Cart Management
- **What it does:** Shows the cart line items (image, name, options, quantity stepper, price, remove), and updates the cart and the subtotal when a quantity changes or an item is removed. Shows an empty state when the cart holds nothing. Keeps the header item count in step with the cart, and hides the count when the cart is empty.
- **When it appears:** In the cart drawer (C-Cart), opened from the header cart icon or after an add to cart. The item count shows in the header on every screen.
- **If something goes wrong:** If an update fails, keep the last good cart and show a short error.

### F-006 — Checkout
- **What it does:** Sends the customer to Shopify hosted checkout using the cart's checkout URL. Buy Now on the product page skips the cart and goes straight there. Checkout charges in USD and settles through the third-party gateway set up in Shopify.
- **When it appears:** From the Checkout button in C-Cart, and from Buy Now on S-006.
- **If something goes wrong:** If the checkout URL is missing, show an error and keep the cart as it is.

### F-007 — Size Chart
- **What it does:** Builds a product's size chart from D-005 Product Data. Shows only the measurements that product defines, and works out the cm table from the inch values.
- **When it appears:** In the size chart drawer (C-Sizing), opened from the product page.
- **If something goes wrong:** If a product has no chart data, hide the size chart link.

### F-008 — Slot Content
- **What it does:** Fills a screen's hand-placed slots from two TSV files in the repo. D-004 Media Slots gives a slot its image, its alt text, and an optional link. D-006 Slot Values gives a slot its text. The slot id is the key in both, so one slot can take its picture from one file and its words from the other.
- **When it appears:** Wherever a screen or the site chrome declares a slot.
- **If something goes wrong:** A slot with no row is left out, not rendered empty. Where a slot needs both files and only one of them has it, the slot is left out and logged.

### F-009 — Structured Data
- **What it does:** Adds JSON-LD in a script tag in the page's Server Component. Product data on each product page: name, description, image, price, currency, and availability. BreadcrumbList data that matches the visible trail.
- **When it appears:** Product data on the product page (S-006). BreadcrumbList wherever a page's outline carries a Breadcrumb, in the server-rendered markup.
- **If something goes wrong:** If a field is missing, skip that field and still render the page.

### F-010 — Product Media Gallery
- **What it does:** Shows the product's shots, the video first, then the images in the order Shopify gives them. On mobile the shots run as a full-bleed swipe carousel, one per view, with a thumbnail strip below it. The video's thumbnail carries a play icon, and picking any thumbnail moves the carousel to that shot. On tablet and desktop there is no strip: the shots stack in one column on tablet and two on desktop, and the customer scrolls the page to see them. The video cell shows a still from the clip straight away. The file waits until the browser goes idle, then plays muted, looped, and inline.
- **When it appears:** At the top of the Product Detail page (S-006).
- **If something goes wrong:** If the video fails to load, its cell keeps showing the still.

### F-011 — Size and Stock
- **What it does:** Lists the product's sizes and lets the customer pick one. Sold-out sizes still show but cannot be picked. When every size is sold out, the Add to Cart and Buy Now buttons swap to a Preorder link to S-008 Contact.
- **When it appears:** In the buy panel on the Product Detail page (S-006).
- **If something goes wrong:** If stock cannot be read, no size can be picked and the Preorder link shows instead.

### F-012 — Featured Products
- **What it does:** Shows two hand-picked products on Home. D-006 Slot Values names the slot and the product handle, and the name, price, and image come from D-001.
- **When it appears:** In the Featured Products block on S-001.
- **If something goes wrong:** If a handle no longer matches a live product, leave that slot out.

### F-013 — Breadcrumb Trail
- **What it does:** Shows the trail to the page. Every crumb links except the current one. The trail is one line and never wraps. It caps its width even where there is room, so a long trail does not read as clutter. When it runs past that cap the current crumb trims with an ellipsis, and the parent crumbs keep their full width. Trimming is visual only, so the full label stays in the markup for crawlers and screen readers.
- **When it appears:** At the top of every page except Home (S-001), and in the buy panel on the Product Detail page (S-006).
- **If something goes wrong:** If a page has no parent to name, it shows the current crumb alone.

## 4. Data
| ID | Data Item | Source | Details |
|---|---|---|---|
| D-001 | Product | Shopify Storefront API | Title, slug, description, price, images, video, size variants, availability, and the type attribute (closure type, set type, length, or swim type), held as a Shopify product metafield exposed to the Storefront API. |
| D-002 | Collection | Shopify Storefront API | The all-products collection and the four category collections, plus which products belong to each. Powers the listing grids. |
| D-003 | Cart | Shopify Storefront API, with the cart ID in a browser cookie | Line items, quantities, subtotal, and the checkout URL. |
| D-004 | Media Slots | `/data/d-004_media.tsv` | Every image the site places by hand, on any screen. One row per slot. Columns: `page`, `slot`, `image`, `alt`, `href`. `page` is the screen or surface the slot appears on, like `/shop` or `Footer`; it is a label for filtering and the code does not read it. `slot` is the key. `href` is optional and makes that media a link. |
| D-005 | Product Data | `/data/d-005_product-data.tsv` | Per-product data that is not in Shopify. One row per product, keyed by slug. Columns: which image to use as the grid thumbnail, and the inch measurements as one column per size (`bust_S`, `bust_M`, …). A measurement can be a single number, a range like `30-31`, `FS` for free size, or two numbers like `9 / 14` where a set has a separate top and bottom length. A product fills only the measurements it uses and leaves the rest blank. Centimeters are worked out from the inch values. |
| D-006 | Slot Values | `/data/d-006_slot-values.tsv` | Every value the site needs that is not an image and does not come from Shopify. One row per value. Columns: `page`, `slot`, `value`. `slot` is the key and the only column the code reads; `page` is the screen or surface the value appears on, like `/shop` or `Footer`, and is a label for filtering. |

## 5. Screens

### S-001 — Home
- **Outline:** Refer to /docs/content/s-001_home.md
- **Feature:** F-008 Slot Content, F-012 Featured Products
- **Behavior:**
  - The hero carousel slides through its banners. With one banner it does not slide.
  - A banner follows the finger when dragged sideways, and settles on the next banner
    or springs back on release. Dragging up or down scrolls the page as usual.
- **Assets:**
  - S-001.3 → D-004 Media Slots
  - S-001.4 → D-001 Product
- **Components:**
  - S-001.1 → C-HeroCarousel [indicator=bars]
  - S-001.2 → C-HeroTitle [headingLevel=1]
  - S-001.3 → C-CategoryGrid [cta]
  - S-001.4 → C-ProductGrid [align=center, showToolbar=false, columns=1/2/2]
  - S-001.5 → C-HeroTitle [headingLevel=2]

### S-002 — All Products
- **Outline:** Refer to /docs/content/s-002_all-products.md
- **Feature:** F-001 Product Grid, F-003 Grid View Toggle, F-008 Slot Content, F-009 Structured Data, F-013 Breadcrumb Trail
- **Behavior:**
  - The button pills link to the four category pages. They do not filter this grid.
- **Assets:** D-004 Media Slots
- **Components:**
  - S-002.1 → C-ShopTitle
  - S-002.2 → C-ProductGrid [columns=1/1/2, pageSize=12, endMark=mark]
  - S-002.3 → C-ShopEditorial [fullBleed, mobileFirst=media, mobileAlign=right]
  - S-002.4 → C-ShopEditorial [fullBleed, mirror, mobileFirst=media, mobileAlign=left]
  - S-002.5 → C-ShopEditorial [fullBleed, mobileFirst=media, mobileAlign=right]
  - S-002.6 → C-ShopEditorial [fullBleed, mirror, mobileFirst=media, mobileAlign=left]

### S-003 — Corset Tops
- **Outline:** Refer to /docs/content/s-003_corset-tops.md
- **Feature:** F-001 Product Grid, F-002 Attribute Filter, F-003 Grid View Toggle, F-008 Slot Content, F-009 Structured Data, F-013 Breadcrumb Trail
- **Behavior:**
  - The filter narrows the grid in place by closure type.
  - The FAQ accordion keeps one item open at a time.
- **Assets:** D-004 Media Slots
- **Components:**
  - S-003.1 → C-ShopTitle
  - S-003.2 → C-ProductGrid [columns=1/1/2, pageSize=12, endMark=mark]
  - S-003.3 → C-ShopEditorial [fullBleed, mobileFirst=media, mobileAlign=right]
  - S-003.4 → C-ShopEditorial [fullBleed, mirror, mobileFirst=media, mobileAlign=left]
  - S-003.5 → C-ShopEditorial [fullBleed, mobileFirst=media, mobileAlign=right]
  - S-003.6 → C-ShopFaq

### S-004 — Matching Sets
- **Outline:** Refer to /docs/content/s-004_matching-sets.md
- **Feature:** F-001 Product Grid, F-002 Attribute Filter, F-003 Grid View Toggle, F-008 Slot Content, F-009 Structured Data, F-013 Breadcrumb Trail
- **Behavior:**
  - The filter narrows the grid in place by set type.
  - The FAQ accordion keeps one item open at a time.
- **Assets:** D-004 Media Slots
- **Components:**
  - S-004.1 → C-ShopTitle
  - S-004.2 → C-ProductGrid [columns=1/1/2, pageSize=12, endMark=mark]
  - S-004.3 → C-ShopEditorial [fullBleed, mobileFirst=media, mobileAlign=right]
  - S-004.4 → C-ShopEditorial [fullBleed, mirror, mobileFirst=media, mobileAlign=left]
  - S-004.5 → C-ShopEditorial [fullBleed, mobileFirst=media, mobileAlign=right]
  - S-004.6 → C-ShopFaq

### S-005 — Cocktail Dresses
- **Outline:** Refer to /docs/content/s-005_cocktail-dresses.md
- **Feature:** F-001 Product Grid, F-002 Attribute Filter, F-003 Grid View Toggle, F-008 Slot Content, F-009 Structured Data, F-013 Breadcrumb Trail
- **Behavior:**
  - The filter narrows the grid in place by length.
  - The FAQ accordion keeps one item open at a time.
- **Assets:** D-004 Media Slots
- **Components:**
  - S-005.1 → C-ShopTitle
  - S-005.2 → C-ProductGrid [columns=1/1/2, pageSize=12, endMark=mark]
  - S-005.3 → C-ShopEditorial [fullBleed, mobileFirst=media, mobileAlign=right]
  - S-005.4 → C-ShopEditorial [fullBleed, mirror, mobileFirst=media, mobileAlign=left]
  - S-005.5 → C-ShopEditorial [fullBleed, mobileFirst=media, mobileAlign=right]
  - S-005.6 → C-ShopFaq

### S-012 — Beachwear
- **Outline:** Refer to /docs/content/s-012_beachwear.md
- **Feature:** F-001 Product Grid, F-002 Attribute Filter, F-003 Grid View Toggle, F-008 Slot Content, F-009 Structured Data, F-013 Breadcrumb Trail
- **Behavior:**
  - The filter narrows the grid in place by swim type.
  - The FAQ accordion keeps one item open at a time.
- **Assets:** D-004 Media Slots
- **Components:**
  - S-012.1 → C-ShopTitle
  - S-012.2 → C-ProductGrid [columns=1/1/2, pageSize=12, endMark=mark]
  - S-012.3 → C-ShopEditorial [fullBleed, mobileFirst=media, mobileAlign=right]
  - S-012.4 → C-ShopEditorial [fullBleed, mirror, mobileFirst=media, mobileAlign=left]
  - S-012.5 → C-ShopEditorial [fullBleed, mobileFirst=media, mobileAlign=right]
  - S-012.6 → C-ShopFaq

### S-006 — Product Detail
- **Outline:** Refer to /docs/content/s-006_product-detail.md
- **Feature:** F-001 Product Grid, F-004 Add to Cart, F-006 Checkout, F-007 Size Chart, F-009 Structured Data, F-010 Product Media Gallery, F-011 Size and Stock, F-013 Breadcrumb Trail
- **Behavior:**
  - The header starts hidden so the first gallery shot meets the top edge. C-Sticky covers how it comes back.
  - Add to Cart opens C-Cart. Buy Now goes straight to Shopify checkout.
  - The details link opens C-Details. The sizing link opens C-Sizing. The shipping link opens C-Shipping.
  - "You May Also Like" shows 3 random products from anywhere in the store, not just this product's category.
- **Assets:**
  - None
- **Components:**
  - S-006.1 → C-ProductPanel [layout=stacked, indicator=thumbs, showQuantity=false]
  - S-006.2 → C-RelatedProducts [layout=stacked, backVariant=tint]

### S-007 — About Us
- **Outline:** Refer to /docs/content/s-007_about-us.md
- **Feature:** F-008 Slot Content, F-013 Breadcrumb Trail
- **Behavior:**
  - None
- **Assets:** D-004 Media Slots
- **Components:**
  - S-007.1 → C-HeroTitle [headingLevel=1, measure=72ch]
  - S-007.2 → C-EditorialSplit
  - S-007.3 → C-EditorialSplit [mirror]

### S-008 — Contact
- **Outline:** Refer to /docs/content/s-008_contact.md
- **Feature:** F-008 Slot Content, F-013 Breadcrumb Trail
- **Behavior:**
  - The direct-message links open the SHER Instagram, Facebook, and TikTok profiles in a new tab.
  - The email address opens the visitor's mail app.
- **Assets:**
  - None
- **Components:**
  - S-008.1 → C-HeroTitle [headingLevel=1, measure=60ch]
  - S-008.2 → C-ContactMethods

### S-009 — Shipping & Returns
- **Outline:** Refer to /docs/content/s-009_shipping-returns.md
- **Feature:** F-008 Slot Content, F-013 Breadcrumb Trail
- **Behavior:**
  - This page and C-Shipping read the same content, so the two never drift.
- **Assets:**
  - None
- **Components:**
  - S-009.1 → C-HeroTitle [headingLevel=1]
  - S-009.2 → C-ContentProse
  - S-009.3 → C-ContentProse
  - S-009.4 → C-ContentProse
  - S-009.5 → C-ContentProse

### S-010 — Privacy Policy
- **Outline:** Refer to /docs/content/s-010_privacy-policy.md
- **Feature:** F-008 Slot Content, F-013 Breadcrumb Trail
- **Behavior:**
  - None
- **Assets:**
  - None
- **Components:**
  - S-010.1 → C-HeroTitle [headingLevel=1]
  - S-010.2 → C-ContentProse
  - S-010.3 → C-ContentProse
  - S-010.4 → C-ContentProse
  - S-010.5 → C-ContentProse
  - S-010.6 → C-ContentProse
  - S-010.7 → C-ContentProse

### S-011 — Terms of Service
- **Outline:** Refer to /docs/content/s-011_terms-of-service.md
- **Feature:** F-008 Slot Content, F-013 Breadcrumb Trail
- **Behavior:**
  - None
- **Assets:**
  - None
- **Components:**
  - S-011.1 → C-HeroTitle [headingLevel=1]
  - S-011.2 → C-ContentProse
  - S-011.3 → C-ContentProse
  - S-011.4 → C-ContentProse
  - S-011.5 → C-ContentProse
  - S-011.6 → C-ContentProse

## 6. Layout Components

### C-Transparent — Transparent Header
- **Component:** Refer to /components/C-Transparent.tsx
- **Feature:** F-005 Cart Management, F-008 Slot Content
- **Behavior:**
  - Home only. It sits over the hero, stays see-through, and scrolls away with the page.
  - C-Sticky takes over once the hero's bottom edge scrolls past the top.
  - The item count shows how many items are in the cart. It is hidden when the cart is empty.

### C-Sticky — Sticky Header
- **Component:** Refer to /components/C-Sticky.tsx
- **Feature:** F-005 Cart Management, F-008 Slot Content
- **Behavior:**
  - Sticks to the top of every screen and holds its own height. Below 1024px it stays put once it is there. From 1024px it hides on a downward scroll and returns on an upward one.
  - On Home it takes over once the hero's bottom edge scrolls past the top. Below 1024px it then stays. From 1024px it hides and returns with the scroll, as on every other page.
  - On the product page it starts hidden and holds no space, so the first gallery shot meets the top edge. Below 1024px it appears once the page has scrolled past about a third of the screen height, and hides again when it scrolls back inside that band. From 1024px it appears on an upward scroll and hides going down, and stays hidden at the very top.
  - The item count shows how many items are in the cart. It is hidden when the cart is empty.

### C-Menu — Menu Drawer
- **Component:** Refer to /components/C-Menu.tsx
- **Feature:** None
- **Behavior:**
  - Opens from the hamburger icon in the header. Picking a link closes the drawer and goes to the page.
  - Closes on the close control or a tap outside the drawer.
  - Login/Account leaves the store for Shopify hosted customer accounts.

### C-Cart — Cart Drawer
- **Component:** Refer to /components/C-Cart.tsx
- **Feature:** F-005 Cart Management, F-006 Checkout
- **Behavior:**
  - Opens from the header cart icon, and after an add to cart.
  - Closes on the close control or a tap outside the drawer.
  - Changing an item's quantity or removing it updates the cart and the subtotal.
  - Checkout opens Shopify's hosted checkout, which settles through the third-party gateway set up in Shopify.
  - Shows an empty state when the cart holds nothing.

### C-Footer — Footer
- **Component:** Refer to /components/C-Footer.tsx
- **Feature:** None
- **Behavior:**
  - Shows on every screen.
  - The social icons open the SHER profiles in a new tab.
  - The copyright line shows the current year.

### C-Details — Details Drawer
- **Component:** Refer to /components/C-Details.tsx
- **Feature:** None
- **Behavior:**
  - Opens from the Details link on the product page.
  - Closes on the close control or a tap outside the drawer.
  - Shows the product name and its description, read from D-001 Product.
  - Shows the type attribute below the description, under the label "Type", read from D-001 Product.

### C-Sizing — Size Chart Drawer
- **Component:** Refer to /components/C-Sizing.tsx
- **Feature:** F-007 Size Chart
- **Behavior:**
  - Opens from the size chart link on the product page.
  - Closes on the close control or a tap outside the drawer.
  - Shows only the measurements a product defines. One it leaves out, say Hip on a corset top, is left out of the table.
  - The inch values come from D-005 Product Data. The cm table is worked out from them.

### C-Shipping — Shipping & Returns Drawer
- **Component:** Refer to /components/C-Shipping.tsx
- **Feature:** None
- **Behavior:**
  - Opens from the shipping link on the product page.
  - Closes on the close control or a tap outside the drawer.
  - Shows the same content as S-009 Shipping & Returns, read from the same source.

## 7. Navigation

```
Header — every screen (C-Transparent over the Home hero, then C-Sticky once the hero scrolls out of view; C-Sticky everywhere else)
 ├── Hamburger → opens C-Menu
 ├── Logo → S-001 (/)
 └── Cart → opens C-Cart

Menu Drawer (C-Menu)
 ├── Shop Now
 │    ├── Corset Tops → S-003 (/corset-tops)
 │    ├── Matching Sets → S-004 (/matching-sets)
 │    ├── Cocktail Dresses → S-005 (/cocktail-dresses)
 │    ├── Beachwear → S-012 (/beachwear)
 │    └── View all → S-002 (/shop)
 ├── More Info
 │    ├── Our Story → S-007 (/about)
 │    ├── Contact Us → S-008 (/contact)
 │    └── Shipping & Returns → S-009 (/shipping-returns)
 ├── Login / Account → /account (Shopify hosted customer accounts)
 └── Connect with Us
      ├── Instagram → external URL
      ├── Facebook → external URL
      └── TikTok → external URL

Home tiles — S-001
 ├── Shop Corset Tops → S-003 (/corset-tops)
 ├── Shop Matching Sets → S-004 (/matching-sets)
 ├── Shop Cocktail Dresses → S-005 (/cocktail-dresses)
 ├── Shop Beachwear → S-012 (/beachwear)
 ├── Shop All Products button → S-002 (/shop)
 └── Featured product → S-006 (/products/[product-slug])

Shop button pills — S-002
 ├── Corset Tops → S-003 (/corset-tops)
 ├── Matching Sets → S-004 (/matching-sets)
 ├── Cocktail Dresses → S-005 (/cocktail-dresses)
 └── Beachwear → S-012 (/beachwear)

Product Detail — in page (S-006)
 ├── Details link → opens C-Details
 ├── Sizing link → opens C-Sizing
 ├── Shipping link → opens C-Shipping
 ├── Add to Cart → opens C-Cart
 ├── Buy Now → Shopify hosted checkout
 ├── Preorder (every size sold out) → S-008 (/contact)
 └── Back to {Category} → S-003, S-004, S-005, or S-012

Footer (C-Footer) — every screen
 ├── Logo → S-001 (/)
 ├── Shop & Learn
 │    ├── Corset Tops → S-003 (/corset-tops)
 │    ├── Matching Sets → S-004 (/matching-sets)
 │    ├── Cocktail Dresses → S-005 (/cocktail-dresses)
 │    ├── Beachwear → S-012 (/beachwear)
 │    └── View all → S-002 (/shop)
 ├── More Info
 │    ├── Our Story → S-007 (/about)
 │    ├── Contact → S-008 (/contact)
 │    └── Shipping & Returns → S-009 (/shipping-returns)
 ├── Connect with Us
 │    ├── Instagram → external URL
 │    ├── Facebook → external URL
 │    └── TikTok → external URL
 └── Bottom bar
      ├── Privacy Policy → S-010 (/privacy-policy)
      └── Terms of Service → S-011 (/terms-of-service)
```

## 8. Build Steps

### Phase 1 — Foundation
| Step | What to Build | References |
|---|---|---|
| B-001 | Set up the project and the deploy pipeline: Next.js 15 with TypeScript strict and Tailwind, the env vars, the design tokens and theme, the brand fonts through `next/font`, and Vercel. Keep it shippable from day one. | Platform, Extra Details |
| B-002 | Build the Shopify data layer: one `shopifyFetch()` wrapper, the product and collection queries, and the cart Server Actions. Front-load this integration so the unknowns surface early. | D-001, D-002, D-003 |
| B-003 | Build the global chrome and the navigation: C-Transparent, C-Sticky with the hero takeover, C-Menu, C-Footer, and the announcement bar. | C-Transparent, C-Sticky, C-Menu, C-Footer, Navigation, /docs/knowledge-sher.md |

### Phase 2 — Browse
| Step | What to Build | References |
|---|---|---|
| B-004 | Build the product grid and the five listing pages, with the attribute filter, the view toggle, and the FAQ accordion. | S-002, S-003, S-004, S-005, S-012, F-001, F-002, F-003, D-002, D-005 |

### Phase 3 — Product Detail
| Step | What to Build | References |
|---|---|---|
| B-005 | Build the Product Detail page: media gallery with the video, size choice, sold-out and preorder states, and the related grid. | S-006, F-001, F-010, F-011, D-001 |
| B-006 | Build the two product drawers: the size chart and shipping and returns. | C-Sizing, C-Shipping, F-007, D-005, S-009 |

### Phase 4 — Cart & Checkout
| Step | What to Build | References |
|---|---|---|
| B-007 | Build the cart drawer, add to cart, Buy Now, the empty state, and the handoff to Shopify checkout. | C-Cart, F-004, F-005, F-006, D-003 |

### Phase 5 — Content & Launch
| Step | What to Build | References |
|---|---|---|
| B-008 | Build the Home page: hero carousel, category tiles with the shop-all button, and featured products from the slot files. | S-001, F-008, F-012, D-004, D-006 |
| B-009 | Build About, Contact, and the three policy pages as one static-content set. | S-007, S-008, S-009, S-010, S-011, /docs/knowledge-sher.md |
| B-010 | Add the SEO layer: per-page metadata, canonical URLs, Product and BreadcrumbList structured data, the sitemap, and robots. | F-009, all screens, Planning TSV `seo_role` |
| B-011 | Run the launch gate: hit the performance target, meet the accessibility bar, and run full QA. | Extra Details |

## 9. Extra Details

### Connectivity
The store needs the network to reach the Shopify Storefront API for products, collections, and the cart, and to open Shopify hosted checkout. Without it, product data, the cart, and checkout do not work. The content and policy pages render from repo content, and Home renders from repo config, so they hold up better.

### Storage
- **Client:** the Shopify cart ID in a cookie, so the cart survives page moves and refreshes. The view-toggle and filter choices sit in the URL or in local UI state.
- **Server:** none of its own. The cart lives in Shopify, and the content lives in the repo.

### Accessibility
Every screen meets WCAG 2.2 AA: keyboard access, visible focus, alt text on images, heading order that follows the H1, H2, H3 outline, and focus handling in the drawers and the accordion. Reduced motion is respected by the hero carousel and the product video.

### Performance
Every screen scores 90 or higher on Lighthouse for performance, accessibility, best practices, and SEO, measured on mobile.

### Security & Privacy
- The Storefront access token is used server-side only and never ships in the client bundle.
- Shopify hosted checkout handles all payment and personal data, so the store never touches card data.
- The only cookie the store sets is the cart ID.
- The Privacy Policy page states what data is collected and how.

### Integrations / External Services
- Shopify Storefront API (products, collections, cart)
- Shopify hosted checkout (payment, tax, shipping, discounts), settling through a third-party gateway set up in Shopify
- Shopify hosted customer accounts (the Login/Account link)
- Shopify CDN (product images and video)
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
| US-001 | Home page with featured pieces and categories | Active |
| US-002 | Browse every product in one place | Active |
| US-003 | Browse one category on its own | Active |
| US-004 | Filter a category by its key attribute | Active |
| US-005 | See a product's photos, price, and sizes | Active |
| US-006 | Add a product to the cart | Active |
| US-007 | Check the cart and change amounts | Active |
| US-008 | Check out securely | Active |
| US-009 | Clear empty-cart state | Active |
| US-010 | Size chart in cm or inches | Active |
| US-011 | Ask about a sold-out piece | Active |
| F-001 | Product Grid | Active |
| F-002 | Attribute Filter | Active |
| F-003 | Grid View Toggle | Active |
| F-004 | Add to Cart | Active |
| F-005 | Cart Management | Active |
| F-006 | Checkout | Active |
| F-007 | Size Chart | Active |
| F-008 | Slot Content | Active |
| F-009 | Structured Data | Active |
| F-010 | Product Media Gallery | Active |
| F-011 | Size and Stock | Active |
| F-012 | Featured Products | Active |
| F-013 | Breadcrumb Trail | Active |
| D-001 | Product | Active |
| D-002 | Collection | Active |
| D-003 | Cart | Active |
| D-004 | Media Slots | Active |
| D-005 | Product Data | Active |
| D-006 | Slot Values | Active |
| C-Transparent | Transparent Header | Active |
| C-Sticky | Sticky Header | Active |
| C-Menu | Menu Drawer | Active |
| C-Cart | Cart Drawer | Active |
| C-Footer | Footer | Active |
| C-Details | Details Drawer | Active |
| C-Sizing | Size Chart Drawer | Active |
| C-Shipping | Shipping & Returns Drawer | Active |
| C-HeroCarousel | Hero Carousel | Active |
| C-HeroTitle | Hero Title | Active |
| C-CategoryGrid | Category Grid | Active |
| C-ProductGrid | Product Grid | Active |
| C-ShopTitle | Shop Title | Active |
| C-ShopEditorial | Shop Editorial | Active |
| C-ShopFaq | Shop FAQ | Active |
| C-ProductPanel | Product Panel | Active |
| C-RelatedProducts | Related Products | Active |
| C-EditorialSplit | Editorial Split | Active |
| C-ContactMethods | Contact Methods | Active |
| C-ContentProse | Content Prose | Active |
