---
version: alpha
name: SHER
description: Warm editorial minimalism for a structured-corsetry womenswear storefront.
colors:
  background: "#FAF9F6"
  tint: "#EFEBE7"
  surface: "#E4E2DC"
  text: "#514F4E"
  primary: "#A99D94"
  accent: "#7C736B"
  muted: "#929291"
  dark: "#333231"
  white: "#FFFFFF"
  border: "#D8D5CE"
  borderStrong: "#C3BFB6"
  accentHover: "#6B635B"
  scrim: "rgba(107,99,91,0.55)"
  veilLight: "rgba(250,249,246,0.90)"
  veilDark: "rgba(51,50,49,0.55)"
  scrimSoft: "rgba(51,50,49,0.28)"
  overlayHero: "linear-gradient(180deg, rgba(51,50,49,0.28) 0%, rgba(51,50,49,0.10) 40%, rgba(51,50,49,0.42) 100%)"
  borderInverse: "rgba(250,249,246,0.16)"
  dotIdle: "rgba(250,249,246,0.5)"
  surfacePage: "{colors.background}"
  surfaceTint: "{colors.tint}"
  surfaceRaised: "{colors.surface}"
  surfaceInverse: "{colors.dark}"
  textDefault: "{colors.text}"
  textStrong: "{colors.dark}"
  textMuted: "{colors.muted}"
  textMeta: "{colors.text}"
  textOnInverse: "{colors.background}"
  textOnPrimary: "{colors.dark}"
  borderDefault: "{colors.border}"
  borderFocus: "{colors.dark}"
typography:
  display-1:
    fontFamily: "'Cormorant Infant', Georgia, 'Times New Roman', serif"
    fontSize: 2.75rem
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: 0.05em
  h1:
    fontFamily: "'Cormorant Infant', Georgia, 'Times New Roman', serif"
    fontSize: 2.5rem
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: 0.05em
  h2:
    fontFamily: "'Cormorant Infant', Georgia, 'Times New Roman', serif"
    fontSize: 2.1rem
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0.05em
  h3:
    fontFamily: "'Cormorant Infant', Georgia, 'Times New Roman', serif"
    fontSize: 1.75rem
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0.05em
  h4:
    fontFamily: "'Cormorant Infant', Georgia, 'Times New Roman', serif"
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0.05em
  body:
    fontFamily: "'Cardo', Georgia, 'Times New Roman', serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0
  eyebrow:
    fontFamily: "'Cardo', Georgia, 'Times New Roman', serif"
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0.15em
  button:
    fontFamily: "'Cormorant Infant', Georgia, 'Times New Roman', serif"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.15em
  crumbTrail: 35ch
rounded:
  none: 0
  sm: 2px
  md: 4px
  btn: 0.7em
  pill: 999px
spacing:
  0: 0
  1: 0.25rem
  2: 0.5rem
  3: 0.75rem
  4: 1rem
  5: 1.5rem
  6: 2rem
  7: 3rem
  8: 4rem
  9: 6rem
  10: 8rem
  padBtnMd: 1.75rem
  padBtnLg: 2.5rem
  ctaMinWSm: 14rem
  ctaMinWMd: 18rem
  ctaMinW: 22rem
  padPillX: 1.25rem
  padPillY: 0.6rem
  padRowSm: 0.35rem
  padRowMd: 0.4rem
  editorialGap: 1.5rem
  swipeCommit: 56px
  controlHit: 44px
  controlWell: 40px
  controlMinW: 48px
  ppStripPad: 0.5rem
  ppThumbMax: 44px
  thumbAr: 44 / 58
  thumbW: 44px
  thumbWLg: 88px
  thumbH: 58px
  dotSm: 10px
  dotWide: 26px
  dotBarH: 2px
  hcArrowSize: 48px
  badgeSm: 30px
  logoWSm: 82px
  logoWMd: 96px
  logoWLg: 110px
  logoTopSm: 12px
  logoTopMd: 15px
  logoTopLg: 17px
  glyphHedge: 9px
components:
  Logo:
    size: 2.5rem
  Icon:
    textColor: "{colors.textStrong}"
    size: 1.25rem
  Button:
    backgroundColor: "{colors.surfaceInverse}"
    textColor: "{colors.textOnInverse}"
    typography: "{typography.button}"
    rounded: "{rounded.btn}"
    padding: 0.75rem
  ButtonPill:
    backgroundColor: "{colors.surfaceInverse}"
    textColor: "{colors.textOnInverse}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "{spacing.padPillY}"
  IconButton:
    textColor: "{colors.textStrong}"
    rounded: "{rounded.sm}"
    size: 2.75rem
  QuantityStepper:
    backgroundColor: "{colors.surfacePage}"
    textColor: "{colors.textStrong}"
    rounded: "{rounded.sm}"
  SizeSelector:
    backgroundColor: "{colors.surfaceInverse}"
    textColor: "{colors.textStrong}"
    rounded: "{rounded.sm}"
  Price:
    textColor: "{colors.textStrong}"
    typography: "{typography.body}"
  ProductCard:
    backgroundColor: "{colors.surfaceRaised}"
    textColor: "{colors.textStrong}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
  Divider:
    backgroundColor: "{colors.borderStrong}"
  Breadcrumb:
    textColor: "{colors.textMeta}"
    typography: "{typography.eyebrow}"
  ViewToggle:
    backgroundColor: "{colors.surfaceInverse}"
    textColor: "{colors.textStrong}"
  Accordion:
    textColor: "{colors.textStrong}"
    typography: "{typography.h4}"
  AnnouncementBar:
    backgroundColor: "{colors.surfaceInverse}"
    textColor: "{colors.textOnInverse}"
    height: 2rem
  Transparent:
    textColor: "{colors.white}"
    height: 4.5rem
  Sticky:
    backgroundColor: "{colors.surfacePage}"
    textColor: "{colors.textStrong}"
    height: 4.5rem
  HeroCarousel:
    backgroundColor: "{colors.surfaceInverse}"
    textColor: "{colors.white}"
    typography: "{typography.h1}"
  HeroTitle:
    textColor: "{colors.textStrong}"
    typography: "{typography.display-1}"
  ShopTitle:
    textColor: "{colors.textStrong}"
    typography: "{typography.h1}"
  CategoryGrid:
    backgroundColor: "{colors.border}"
    textColor: "{colors.white}"
    typography: "{typography.h3}"
  ProductGrid:
    typography: "{typography.eyebrow}"
  EditorialSplit:
    backgroundColor: "{colors.surfaceRaised}"
    textColor: "{colors.textDefault}"
    typography: "{typography.h2}"
  ShopEditorial:
    backgroundColor: "{colors.surfaceRaised}"
    textColor: "{colors.textDefault}"
    typography: "{typography.h2}"
  ShopFaq:
    textColor: "{colors.textStrong}"
    typography: "{typography.h2}"
  ProductPanel:
    textColor: "{colors.textStrong}"
    typography: "{typography.h1}"
  MediaGallery:
    backgroundColor: "{colors.surfaceRaised}"
  RelatedProducts:
    textColor: "{colors.textStrong}"
    typography: "{typography.h2}"
  ContentProse:
    textColor: "{colors.textDefault}"
    typography: "{typography.body}"
  ContactMethods:
    textColor: "{colors.textStrong}"
    typography: "{typography.h4}"
  Menu:
    backgroundColor: "{colors.surfacePage}"
    textColor: "{colors.textStrong}"
    padding: 1.5rem
  Cart:
    backgroundColor: "{colors.surfacePage}"
    textColor: "{colors.textStrong}"
    typography: "{typography.h3}"
    padding: 1.5rem
  Details:
    backgroundColor: "{colors.surfacePage}"
    textColor: "{colors.textStrong}"
    typography: "{typography.h3}"
    padding: 1.5rem
  Sizing:
    backgroundColor: "{colors.surfacePage}"
    textColor: "{colors.textStrong}"
    typography: "{typography.h3}"
    padding: 1.5rem
  Shipping:
    backgroundColor: "{colors.surfacePage}"
    textColor: "{colors.textStrong}"
    typography: "{typography.h3}"
    padding: 1.5rem
  Footer:
    backgroundColor: "{colors.surfaceInverse}"
    textColor: "{colors.textOnInverse}"
    padding: 6rem
---

## Overview

Tokens CSS holds the tokens. This file only describes them.

SHER is a modern womenswear storefront design system — warm editorial minimalism, tonal and photography-led. The palette is a closed set of warm neutrals; type pairs Cormorant Infant (uppercase display, nav, buttons) with Cardo (serif prose). Surfaces are flat, radii are small, and depth is reserved for edge-anchored overlays. Everything here is token-driven so it maps cleanly onto Next.js + Tailwind.

## Colors

Raw palette (`tokens/colors.css`): `background` #FAF9F6, `tint` #EFEBE7 (light primary), `surface` #E4E2DC, `text` #514F4E, `primary` #A99D94, `accent` #7C736B, `muted` #929291, `dark` #333231, `white` #FFFFFF, hairlines `border` #D8D5CE / `borderStrong` #C3BFB6, and `accentHover` #6B635B.

Semantic aliases reference the raw palette: `surfacePage`/`surfaceTint`/`surfaceRaised`/`surfaceInverse`, `textDefault`/`textStrong`/`textMeta`/`textMuted`, `textOnInverse`, `textOnPrimary`, `accent` (→ Accent, the white-text fill), `borderDefault`, `borderFocus`. Reference tokens with `{colors.<name>}`.

Every UI text/background pair passes WCAG AA: text on background 7.7:1, text on tint 7.1:1, text on surface 6.3:1, dark on background 12.2:1, white on accent 4.6:1, background on dark 12.2:1. Small-caps meta text — eyebrows, result counts, labels, table heads — uses `textMeta` (#514F4E), never `muted`: muted is only 3.0:1 on the page and 2.4:1 on surface, so it fails AA at label sizes. `primary` and `muted` are for fills, large text, and hairlines only — never body text on light grounds. **Primary (#A99D94) carries neither white nor dark text at AA for body copy** (dark-on-primary is 4.8:1 by luminance but reads poorly — not an approved pair); when a warm fill needs text, use `accent` (#7C736B) with white.

## Typography

Two families only. **Cormorant Infant** carries display, headings, nav and buttons — always uppercase. **Cardo** carries body prose, eyebrows and meta text. The scale is stepped (mobile / tablet / desktop), swapped at container breakpoints — not fluid clamp; the composite styles here list the desktop sizes. Headings render weight 400; buttons weight 500. Line heights: 1.1 display/h1, 1.3 h2–h4, 1.65 body.

Type roles are named for WHERE the type sits, never for an HTML tag — the ladder is `display` -> `hero` -> `section` -> `title` -> `sub`, and any of them can render as any h1-h4 via the Heading component's `level` prop. Two stepped body roles carry non-heading text: **item** (`--size-item-sm/md/lg`, 18 / 20 / 22) for product names and prices, and **body** (`--size-body-sm/md/lg`, 14 / 16 / 18) for descriptions and intro paragraphs. Pages alias them as `--fs-item` and `--fs-body` and step them at container breakpoints. Fixed sizes remain for `--size-base` (16 prose), `--size-sm` (14 meta), `--size-xs` (12 labels), `--size-nano` (10 cart badge), `--size-sub` (20 sub-headings, aliased as `--fs-sub`). The announcement bar keeps its own stepped role, `--size-announce-sm/lg` (10 / 11.5), aliased as `--fs-announce` and separate from `--size-nano` so it can move independently.

Tracking has four roles, named to match the type scale — never invent a value between them. `--tracking-display` `0.05em` for large display and nav headings. `--tracking-label` `0.15em` for every uppercase small-text element, interactive or static: buttons at every size, pills, breadcrumb, eyebrows, result counts, column heads, badges, size chips, the announcement bar. `--tracking-item` `0.02em` for small sentence-case UI text (footer/menu links, checkout notes), overridable per placement. `--tracking-body` `0` for prose.

Styles: `display-1`, `h1`, `h2`, `h3`, `h4`, `body`, `eyebrow`, `button`.

Layout components resolve every stepped size themselves, via CSS container queries on their own width (`tokens/components.css`) — the type-role classes `.t-display` / `.t-hero` / `.t-section` / `.t-title` / `.t-item` / `.t-body` inside a `.sher-band` container. Deliberate, controllable sizing without fluid `clamp` or viewport units, and no JS measurement.

## Layout

Breakpoints: 640 / 768 / 1024 / 1280 / 1536. Container max-width 1536px; wide media bands cap at 1536px (`--container-media`); readable prose measure 768px. The page edge padding (`--gutter`) is responsive, scaling with the band's own width: 1rem on mobile, 2rem on tablet, 3rem on desktop — driven by container queries at the breakpoints, not viewport units, and declared in `tokens/components.css` so the steps ship with the tokens rather than being re-authored per app.

**Integration note.** Those steps are `@container` queries, and an unnamed container query matches the nearest ANCESTOR container — so they need one to exist. The system ships `body { container-type: inline-size }` in `tokens/base.css` to establish it. An app that cannot cede `body` should put `container-type: inline-size` on its own layout root instead; any ancestor of the system's markup will do. Without a container somewhere above, the gutter stays at its 1rem base at every width. Header height 4.5rem, announcement bar 2rem at every width.

Note on rem: `tokens/base.css` sets the root to `81.25%`, a percentage so a reader who has changed their browser font size still scales the whole design. 1rem therefore renders as **13px** at the default, not 16px — so the gutter is 13 / 26 / 39px, the header 58.5px, the announcement bar 26px. Every rem in this document is the authored value; multiply by 13 for pixels.

Spacing follows a generous editorial rhythm — `spacing.1` (0.25rem) through `spacing.10` (8rem), rendering 3.25px to 104px at the 81.25% root. Lay groups out with flex/grid + `gap` on this scale.

Chrome behavior: a sticky header on every screen; a transparent, non-sticky header over the Home hero that hands off to the sticky header once the hero's bottom edge scrolls past. Overlays (menu, cart, size chart, shipping) are edge-anchored drawers.

Motion is quick and clean — 160ms/240ms/360ms durations on an ease-out curve (`cubic-bezier(.22,1,.36,1)`). Drawers slide; scrims fade. No bounce, no overshoot. Hover deepens or inverts fills and shifts links to `accentHover`; press is a color shift, never a scale change.

## Elevation & Depth

Depth is tonal and restrained — separation comes from color and hairline borders, not heavy shadow. Cards are flat: a surface fill or a hairline `borderDefault`, small radius, no drop shadow. Shadow is reserved for lifted overlays only: drawers use `-8px 0 40px rgba(51,50,49,0.12)`, raised surfaces `0 4px 24px rgba(51,50,49,0.08)`, and a hairline ring where a 1px outline reads better than a border.

## Shapes

Small radii throughout: `rounded.none` 0, `rounded.sm` 2px (default controls), `rounded.md` 4px (larger surfaces and images), `rounded.pill` 999px (filter and category pills). Nothing bubbly.

## Components

**Module Components** (`components/module/`)
- **Heading** — level-to-tag primitive; `level` sets h1–h4 for the outline without changing style. Props: `level`, `as`.
- **Logo** — monogram mark or square lockup; black / dark / text / meta / white. Props: `variant` ("mark"|"square"), `color` ("black"|"dark"|"text"|"meta"|"white"), `size`, `href`, `alt`.
- **Icon** — Lucide line UI glyphs (1.5px stroke) + Simple Icons social marks. Props: `name`, `size`, `strokeWidth`.
- **Button** — `surfaceInverse` fill, `textOnInverse`, `button` type, `rounded.btn` — an em radius, so the corner holds one ratio to the button's own type size at every size instead of reading heavier on a small button than a large one. `tint` is `surface` inverted (`surfaceTint` at rest, `surfaceRaised` on hover) — the quieter half of a stacked CTA pair, so it recedes beside an `accent` button. The `md`, `lg` and `xl` sizes step by breakpoint (smaller type and padding on mobile and tablet, full size from 1024), declared on `.sher-band` so a button resolves against the band it sits in; `sm` does not step, being already the smallest control. Every size has a `spacing.controlHit` (44px) minimum height, so no step can fall under the tap target. The shared CTA measure steps with them (`ctaMinWSm`/`ctaMinWMd`/`ctaMinW`, 14 → 18 → 22rem), since 22rem is wider than a phone's content column and would make every CTA full-bleed there. Props: `variant` (primary/accent/surface/tint/tonal/secondary/ghost), `size`, `fullWidth`, `disabled`, `as`, `href`, `target`, `rel`.
- **ButtonPill** — filter/category control; `rounded.pill`, inverts to `surfaceInverse` when `active`. Props: `active`, `as`, `href`, `target`, `rel`.
- **IconButton** — borderless 44px chrome control, `textStrong`, `rounded.sm`. Props: `label`, `size`.
- **QuantityStepper** — `surfacePage` on `borderStrong`, `rounded.sm`. Props: `value`/`defaultValue`, `min`, `max`, `onChange`, `size`, `disabled`.
- **Price** — `textStrong`, `body` type. Props: `amount`, `currency`, `compareAt`, `size`.
- **SizeSelector** — product size chips; sold-out sizes disabled and struck. `shape="chip"` inverts the selected chip to `surfaceInverse`; `shape="circle"` is a fixed `spacing.controlWell` (40px) round well, transparent with a `textStrong` hairline and label, matching a `secondary` button, the selected one filling `surfaceInverse` with `textOnInverse` and keeping its hairline so nothing shifts. `align="center"` centres label and row. Props: `sizes`, `value`/`defaultValue`, `onChange`, `label`, `shape`, `align`.
- **Divider** — section end mark closing a band or separating two; three treatments built from border tokens. Props: `variant` ("rule"|"mark"|"monogram"), `knockout`.
- **Breadcrumb** — page trail (Home › Shop); `eyebrow` type, `textMeta` links. Always one line and always exactly two crumbs (parent then current page). `--crumb-trail` (35ch) caps the whole trail, not each crumb, applied as `min(var(--crumb-trail, 35ch), 100%)` — the literal fallback keeps the cap alive if the token is ever absent, since `min()` would otherwise be discarded whole so it also never outgrows a narrower placement; the current crumb is the only one that shrinks and ellipsis-trims. Props: `items`, `separator`.
- **ViewToggle** — F-003 grid density control; segmented, active option on `surfaceInverse`. Props: `value`/`defaultValue`, `options`, `onChange`.
- **ProductCard** — F-001 grid unit; media (3:4) over a `category` eyebrow + title on the left with the price right-aligned on the same row; `surfaceRaised`, `rounded.sm`. Props: `title`, `price`, `currency`, `compareAt`, `category`, `href`, `src`/`media`, `soldOut`.
- **MediaGallery**  — thumb strip beside a 3:4 stage; video first, autoplaying muted/looped/inline once loaded, static under `prefers-reduced-motion`. Props: `media`.
- **Accordion** — FAQ disclosure rows; hairline rows, rotating chevron, one open at a time by default. Props: `items`, `headingLevel`, `single`, `defaultOpen`.
- **AnnouncementBar** — `surfaceInverse`/`textOnInverse`, height 2rem. Colours apply through `--announce-bg` / `--announce-fg`, each defaulting to the tone's own value, so a placement can scope a pair the tones do not cover (the bar sets its colours inline, so a page rule cannot otherwise reach them). Props: `tone` ("dark"|"light"|"accent"), `children`.

Every swipe CAROUSEL — C-ProductPanel's shot column and C-RelatedProducts' card rail — pairs `scroll-snap-type: x mandatory` with `scroll-snap-stop: always`: mandatory so a drag settles on a cell rather than resting between two, and the stop so one flick advances exactly one cell however hard it is thrown. Thumbnail STRIPS (C-MediaGallery, C-ProductPanel's thumbs) deliberately do not snap: a strip is scanned freely, not paged.

Every drawer (C-Cart, C-Menu, C-Sizing, C-Shipping, C-Details) is `aria-hidden` **and** `inert` when closed: hidden from assistive tech and out of the tab order, so a closed drawer's links and buttons cannot be reached by keyboard.

**Layout Components** (`components/layout/`) — every heading takes a `headingLevel` (h1–h4) prop that changes the tag only, not the style. Every component sets its own heading treatment inline (display face, uppercase, `tracking-display`, `leading-snug`, `textStrong`), so it renders correctly without a page loading `tokens/base.css`.
- **HeroCarousel** (C-HeroCarousel) — Home hero band (F-008), on a NATIVE SCROLL-SNAP RAIL: a swipe is the browser's own scrolling (`scroll-snap-type: x mandatory` + `scroll-snap-stop: always`, no JS drag), the arrows `scrollTo` one cell smoothly, the dots crossfade straight to their page rather than travelling through the ones between, and both wraps crossfade — forward from the last page and backward from the first — so there are no clone cells. Nothing ever smooth-scrolls more than one page: `scroll-snap-stop: always` halts the browser at every snap point it crosses, so a multi-page programmatic scroll cannot complete and every longer move goes through the overlay instead. Only the incoming layer fades, over a fully opaque rail. Autoplay pauses on a pointer, a scroll in flight and a hidden tab. Banners come in PAIRS and the pair is the page at every width, so eight banners are four pages on desktop (pages of two) and four on mobile (pages of one, the right of each pair being display:none) — the dot count never changes with the viewport, and a page never pairs the end with the beginning. Supply an even count; an odd one leaves a half-empty last page at 2-up. Peek layout: 1 banner mobile / 2 at 50% tablet+desktop, portrait crops (2:3 → 4:5). Banners are real `<img>`s — only the first eager with `fetchpriority="high"`, the rest `loading="lazy"` — a lazy image inside `display:none` is never fetched, so the hidden half of each pair costs a phone nothing, with `bg` painted behind to cover the wait, and the banners a reader is about to reach preloaded. A slide takes `crop` ("top" default | "center") — with `fillScreen` a desktop cell is proportionally wider than a 1792x2400 photograph and loses ~200px of height, so a centre crop takes ~100px off the top, which on a full-length shot is the head; the default anchors the loss to the bottom instead, and a banner whose subject sits low opts into "center". Applied in CSS, never inline, and shared with the crossfade overlay. Props: `slides`, `interval`, `autoPlay`, `indicator` ("dots"|"bars"), `fillScreen` (desktop-only, gated at the 1024px band width so it never fires on mobile or tablet: banners take one screen instead of the portrait ratio).
- **Details** (C-Details) — product details drawer; the prose counterpart to C-Sizing, sharing its drawer geometry and header block (heading + product name + close) with an intro paragraph and titled prose sections instead of a size table. Props: `open`, `onClose`, `headingLevel`, `heading`, `productName`, `intro`, `sections`.
- **ShopTitle** (C-ShopTitle) — the band spans the page and the readable cap sits on the description, not the root, so stepped headings reach their large size — Shop / category page header; breadcrumb + optional `h1` heading + `lead` description + optional filter pills (link or button), `align` center or start. An omitted `heading` renders no heading tag. Props: `breadcrumb`, `heading`, `headingLevel`, `description`, `filters`, `activeFilter`, `onFilter`, `align`, `measure`.
- **ProductGrid** (C-ProductGrid) — shop / category results band; count + ViewToggle toolbar over a responsive ProductCard grid. Columns come from one "mobile/tablet/desktop" string. A floating copy of the ViewToggle sticks to the scrollport bottom-left once the toolbar scrolls away. Props: `products`, `columns`, `heading`, `headingLevel`, `align` ("start"|"center" — the heading only; toolbar and cards keep their own), `label`, `count`, `onView`, `showToolbar`, `floatingToggle`, `pageSize`, `loadMoreLabel`, `endSlot` (page content closing an ended list, in place of the mark — e.g. a back-to-parent pair on a filtered view), `endMark` ("none"|"rule"|"mark"|"monogram"), `emptyMessage`.
- **EditorialSplit** (C-EditorialSplit) — two-up editorial band used on the About page; 4:5 media beside eyebrow + heading + paragraph, `mirror` swaps sides, stacks on mobile. Props: `eyebrow`, `heading`, `headingLevel`, `paragraph`, `media`, `mirror`, `mobileFirst` ("media"|"text"), `mediaRounded`, `background`, `children`.
- **ShopEditorial** (C-ShopEditorial)  — the two-up editorial band used across the Shop and category pages; same shape as C-EditorialSplit. `eyebrow`, `heading`, and `paragraph` are each optional and render no element when absent. Props: `eyebrow`, `heading`, `headingLevel`, `headingFont` ("display"|"body"), `paragraph`, `media`, `mirror`, `mobileFirst` ("media"|"text"), `mobileAlign` ("left"|"right"), `fullBleed`, `gap`, `ratio`, `background`, `children`.
- **ShopFaq** (C-ShopFaq)  — FAQ band; heading beside its accordion at two-up, stacking on mobile. Heading size and column gap step off its own measured width. Props: `heading`, `headingLevel`, `items`, `itemHeadingLevel`, `defaultOpen`, `single`, `align` ("center"|"start").
- **ProductPanel** (C-ProductPanel) — product page main band (S-006). `layout="beside"` puts the media gallery next to the purchase column (breadcrumb, name, price, type attribute, size, quantity, buy buttons, drawer links). `layout="stacked"` runs the gallery as a column of full-width shots beside a sticky, centred purchase panel — the shots collapse to a full-bleed swipe carousel below 768px with `indicator` dots or a draggable thumb strip (play badge on the video cell, drawn on `veilLight`), and sit 2-up from 1024px; the panel pairs a quieter Add to Cart over a `primary` Buy Now, with circle size chips; the product name and price both take the `section` role, so the page H1 is not smaller than the related-products heading; `addToCartVariant` overrides the quieter half alone. `onDetails` adds a Details link and moves the description into C-Details instead of printing it inline. All sizes sold out swaps the buy pair for a Preorder link. Props: `breadcrumb`, `name`, `headingLevel`, `price`, `compareAt`, `currency`, `description`, `attributeLabel`, `attributeValue`, `sizes`, `size`, `onSize`, `quantity`, `onQuantity`, `media`, `onAddToCart`, `onBuyNow`, `gallery` ("column"|"carousel" — carousel keeps the mobile one-shot swipe gallery at every width), `addToCartVariant`, `onDetails`, `onSizeChart`, `onShipping`, `sizeChartLabel`, `layout`, `indicator`, `transition` (stacked layout: "fade" crossfades an indicator-driven jump instead of scrolling through every shot between; a swipe stays the browser's own scroll), `showQuantity`, `preorderHref`, `stacked`.
- **ProductCarousel** (C-ProductCarousel) — a centred heading block above a horizontal rail of product cards; the generic shape behind S-006's "You May Also Like" and S-001's "Featured Products". `peek` sets how many cards are in view as "mobile/tablet/desktop" — a fraction clips the next card as the scroll cue, a whole number shows exactly that many — and the cell width is computed from the rail's own width in CSS, never measured in JS. The rail is the browser's own scroller (`scroll-snap-type: x mandatory`, `scroll-snap-stop: always`), so one swipe moves one card however hard it is thrown. `backLabel`/`backHref` and `children` add a card-shaped actions cell as the last cell. An optional `cta` ({label, href}) renders one centred button below the rail at the stepped CTA measure — inside the band, so it takes the stepped button sizes without a page wrapper; `ctaVariant` sets its fill ("primary" default). Props: `heading`, `headingLevel`, `subtitle`, `products`, `peek`, `cta`, `ctaVariant`, `backLabel`, `backHref`, `backVariant`, `children`.
- **RelatedProducts** (C-RelatedProducts)  — "You May Also Like" band. `layout="beside"` is the text column (heading + subtitle + actions) next to a small ProductCard grid. `layout="stacked"` centres the heading block on its own row above the products and runs them as a swipe carousel — ~2.2 cells below 1024px so the next card is clipped as a scroll cue, then a static 4-up grid, with the actions as the rail's last cell, card-shaped at `ratio.3-4`. Props: `heading`, `headingLevel`, `subtitle`, `backLabel`, `backHref`, `products`, `columns`, `backVariant` ("primary"|"accent"|"surface"|"tint"|"secondary"|"ghost"), `layout`, `actionsLayout`, `actionsMeasure`, `children`.
- **ContentProse** (C-ContentProse)  — full-width policy page band; centres heading + paragraph blocks at a readable measure (one or several paragraphs per heading), email addresses auto-linked. Owns its own band padding, content width, type sizes and block rhythm, stepped off its measured width. Props: `items`, `headingLevel`, `measure`, `contentWidth`, `background`, `paddingTop`, `children`.
- **ContactMethods** (C-ContactMethods)  — stacked contact rows; hairline-separated and centred, each a heading over social marks, a mailto link, or an address block. `contentWidth` caps the centred column the hairlines span, so the band owns its own measure. Props: `items`, `headingLevel`, `contentWidth`.
- **CategoryGrid** (C-CategoryGrid)  — full-bleed grid of category tiles, each label followed by a right chevron (never mirrored — it means forward — and aria-hidden, the anchor being named by the label); tile images are real `<img loading="lazy">` (no eager case — the grid never holds the LCP element), with `bg` painted behind to cover the wait; 1 col mobile / 2 tablet+desktop, portrait 4:5 crops, alternating bottom-left/right labels over a scrim. Props: `items`, `headingLevel`, `alternate`, `cta`.
- **HeroTitle** (C-HeroTitle) — editorial title band beneath the hero; optional breadcrumb + eyebrow + `display-1` heading + `lead` description + optional actions. `heading` is optional — omitted, no heading tag is rendered. Props: `breadcrumb`, `eyebrow`, `heading`, `headingLevel`, `description`, `align` ("center"|"start"), `measure`, `headingFont` ("display"|"body"), `headingMeasure`, `background`, `tone`, `children`.
- **Transparent** (C-Transparent) (`announcementTone` defaults to "accent" — the Home header sits on photography) — hero header, Home only; `white` text over imagery, height 4.5rem. Its oversized white square logo overflows below the bar; the mark's own SVG width and its wrapper's top offset both step with the header's width, from `logoW*` (82 / 96 / 110px) and `logoTop*` (12 / 15 / 17px), so no page CSS has to beat Logo's inline style. Props: `onMenu`, `onCart`, `cartCount`, `announcement`, `announcementTone` ("dark"|"light"|"accent"), `cartIcon` ("bag"|"tote"|"trolley"), `logoHref`.
- **Sticky** (C-Sticky) — sticky header on every screen; `surfacePage`/`textStrong`, height 4.5rem. `motion` is how it comes and goes: "fade" (default) changes opacity in place with no travel, dropping pointer-events and visibility while away so a tap reaches the band beneath and nothing invisible is announced; "slide" travels the bar's own height. Props: `onMenu`, `onCart`, `cartCount`, `announcement`, `announcementTone` ("dark"|"light"|"accent"), `motion` ("fade"|"slide"), `hiddenAtRest` (true, or "compact" — away at rest on mobile only, present and reserving its height from 768px) (root becomes `fixed` + `inset-inline: 0` so it reserves no height and the first band meets the top edge), `reveal` ("direction"|"threshold"|"scrolled" — "scrolled" comes in on the first movement away from the top; none latch, so scrolling back to the top re-hides the header), `revealTarget`, `revealRatio`, `scrollRoot`, `cartIcon` ("bag"|"tote"|"trolley"), `logoHref`, `showAnnouncement`.
- **Menu** (C-Menu) — left menu drawer; `surfacePage`, padding 1.5rem. Props: `open`, `onClose`, `nav` ("tabs"|"accordion"), `align` ("center"|"start"), `linkSize` ("item"|"title"), `accountSize` ("body"|"item"), `shopLinks`, `infoLinks`, `accountLink`, `socialLinks`, `onNavigate`, `logoHref`.
- **Cart** (C-Cart) — right cart drawer; `surfacePage`, `h3` title, padding 1.5rem. Props: `open`, `onClose`, `headingLevel`, `items`, `currency`, `onQuantityChange`, `onRemove`, `onCheckout`.
- **Sizing** (C-Sizing) — right size-chart drawer; `surfacePage`, `textBody`, padding 1.5rem. Inches are the source and are shown first; the centimetres table below is worked out from them (each number converts and rounds, separators and words like FS pass through), so an inch value may be a number, a range, FS, or a two-part set. A measure absent on every row drops from both tables. Props: `open`, `onClose`, `headingLevel`, `productName`, `chart`.
- **Shipping** (C-Shipping) — right shipping & returns drawer; `surfacePage`, `textBody`, padding 1.5rem. Props: `open`, `onClose`, `headingLevel`, `sections`, `children`.
- **Footer** (C-Footer) — dark footer band; `surfaceInverse`/`textOnInverse`, `eyebrow` column headings, padding 6rem. Responsive: logo row / shop+more / connect row on mobile/tablet, equal 4 columns on desktop. Props: `headingLevel`, `shopLinks`, `infoLinks`, `socialLinks`, `year`.

## Do's and Don'ts

- **Do** stay inside the closed neutral palette; never introduce a color outside `tokens/colors.css`.
- **Do** keep display/nav/button text uppercase in Cormorant Infant, and prose in Cardo.
- **Do** derive separation from tone and hairline borders; keep cards flat.
- **Do** lay out with flex/grid + `gap` on the spacing scale.
- **Don't** use `primary` or `muted` for ANY text, including small-caps labels and eyebrows (fails AA) — they are for hairlines, borders, fills, and decorative chrome only; use `textMeta` for meta text.
- **Don't** add gradients, heavy drop shadows on cards, or bounce/overshoot motion.
- **Don't** use large radii, emoji, or hand-rolled decorative SVG icons.

