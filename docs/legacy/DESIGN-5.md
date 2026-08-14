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
  scrim: "rgba(51,50,49,0.32)"
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
rounded:
  none: 0
  sm: 2px
  md: 4px
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
  padPillX: 1.25rem
  padPillY: 0.6rem
  padRowSm: 0.35rem
  padRowMd: 0.4rem
  editorialGap: 1.5rem
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
    rounded: "{rounded.sm}"
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
    height: 2.25rem
  C-Transparent:
    textColor: "{colors.white}"
    height: 4.5rem
  C-Sticky:
    backgroundColor: "{colors.surfacePage}"
    textColor: "{colors.textStrong}"
    height: 4.5rem
  C-HeroCarousel:
    backgroundColor: "{colors.surfaceInverse}"
    textColor: "{colors.white}"
    typography: "{typography.h1}"
  C-HeroTitle:
    textColor: "{colors.textStrong}"
    typography: "{typography.display-1}"
  C-ShopTitle:
    textColor: "{colors.textStrong}"
    typography: "{typography.h1}"
  C-CategoryGrid:
    backgroundColor: "{colors.border}"
    textColor: "{colors.white}"
    typography: "{typography.h3}"
  C-ProductGrid:
    typography: "{typography.eyebrow}"
  C-EditorialSplit:
    backgroundColor: "{colors.surfaceRaised}"
    textColor: "{colors.textDefault}"
    typography: "{typography.h2}"
  C-ShopEditorial:
    backgroundColor: "{colors.surfaceRaised}"
    textColor: "{colors.textDefault}"
    typography: "{typography.h2}"
  C-FeatureColumns:
    textColor: "{colors.textDefault}"
    typography: "{typography.h2}"
  C-ShopFaq:
    textColor: "{colors.textStrong}"
    typography: "{typography.h2}"
  C-ProductPanel:
    textColor: "{colors.textStrong}"
    typography: "{typography.h1}"
  C-MediaGallery:
    backgroundColor: "{colors.surfaceRaised}"
  C-RelatedProducts:
    textColor: "{colors.textStrong}"
    typography: "{typography.h2}"
  C-ContentProse:
    textColor: "{colors.textDefault}"
    typography: "{typography.body}"
  C-ContactMethods:
    textColor: "{colors.textStrong}"
    typography: "{typography.h4}"
  C-Menu:
    backgroundColor: "{colors.surfacePage}"
    textColor: "{colors.textStrong}"
    padding: 1.5rem
  C-Cart:
    backgroundColor: "{colors.surfacePage}"
    textColor: "{colors.textStrong}"
    typography: "{typography.h3}"
    padding: 1.5rem
  C-Sizing:
    backgroundColor: "{colors.surfacePage}"
    textColor: "{colors.textStrong}"
    typography: "{typography.h3}"
    padding: 1.5rem
  C-Shipping:
    backgroundColor: "{colors.surfacePage}"
    textColor: "{colors.textStrong}"
    typography: "{typography.h3}"
    padding: 1.5rem
  C-Footer:
    backgroundColor: "{colors.surfaceInverse}"
    textColor: "{colors.textOnInverse}"
    padding: 6rem
---

## Overview

SHER is a modern womenswear storefront design system — warm editorial minimalism, tonal and photography-led. The palette is a closed set of warm neutrals; type pairs Cormorant Infant (uppercase display, nav, buttons) with Cardo (serif prose). Surfaces are flat, radii are small, and depth is reserved for edge-anchored overlays. Everything here is token-driven so it maps cleanly onto Next.js + Tailwind.

## Colors

Raw palette: `background` #FAF9F6, `tint` #EFEBE7 (light primary), `surface` #E4E2DC, `text` #514F4E, `primary` #A99D94, `accent` #7C736B, `muted` #929291, `dark` #333231, `white` #FFFFFF, hairlines `border` #D8D5CE / `borderStrong` #C3BFB6, and `accentHover` #6B635B.

Semantic aliases reference the raw palette: `surfacePage`/`surfaceTint`/`surfaceRaised`/`surfaceInverse`, `textDefault`/`textStrong`/`textMeta`/`textMuted`, `textOnInverse`, `textOnPrimary`, `borderDefault`, `borderFocus`. `accent` is a raw color and is referenced directly. Reference tokens with `{colors.<name>}`.

Five tokens are translucent, for overlays: `scrim` and `scrimSoft` (drawer and image veils), `overlayHero` (the hero text gradient), `borderInverse` (hairline on dark surfaces), and `dotIdle` (inactive carousel dot).

Every UI text/background pair passes WCAG AA: text on background 7.7:1, text on tint 7.1:1, text on surface 6.3:1, dark on background 12.2:1, white on accent 4.6:1, background on dark 12.2:1. Small-caps meta text (eyebrows, result counts, labels, table heads) uses `textMeta` (#514F4E), never `muted`: muted is only 3.0:1 on the page and 2.4:1 on surface, so it fails AA at label sizes. `primary` and `muted` are for fills, large text, and hairlines only, never body text on light grounds. **Primary (#A99D94) carries neither white nor dark text at AA for body copy** (dark-on-primary is 4.8:1 by luminance but reads poorly, so it is not an approved pair); when a warm fill needs text, use `accent` (#7C736B) with white.

## Typography

Two families only. **Cormorant Infant** carries display, headings, nav and buttons — always uppercase. **Cardo** carries body prose, eyebrows and meta text. The scale is stepped (mobile / tablet / desktop), swapped at container breakpoints, not fluid clamp; the composite styles here list the desktop sizes. Headings render weight 400; buttons weight 500. Line heights: 1.1 display/h1, 1.3 h2–h4, 1.65 body.

Type roles are named for WHERE the type sits, never for an HTML tag — the ladder is `display` -> `hero` -> `section` -> `title` -> `sub`, and any of them can render as any h1–h4 via the Heading component's `level` prop. Two stepped body roles carry non-heading text: **item** (`--size-item-sm/md/lg`, 16 / 18 / 20) for product names and prices, and **body** (`--size-body-sm/md/lg`, 14 / 16 / 18) for descriptions and intro paragraphs. Fixed sizes remain for `--size-base` (16 prose), `--size-sm` (14 meta), `--size-xs` (12 labels), `--size-nano` (10 cart badge), and `--size-sub` (20 sub-headings). The announcement bar has its own stepped role, `--size-announce-sm/lg` (10 / 11.5), separate from `--size-nano` so it can move independently.

Tracking has four roles, named to match the type scale — never invent a value between them. `--tracking-display` `0.05em` for large display and nav headings. `--tracking-label` `0.15em` for every uppercase small-text element, interactive or static: buttons at every size, pills, breadcrumb, eyebrows, result counts, column heads, badges, size chips, the announcement bar. `--tracking-item` `0.02em` for small sentence-case UI text (footer and menu links, checkout notes). `--tracking-body` `0` for prose.

Styles: `display-1`, `h1`, `h2`, `h3`, `h4`, `body`, `eyebrow`, `button`.

Each Layout Component resolves its own stepped sizes: it declares a container on its root and steps the type off its own width at the system breakpoints. Deliberate, controllable sizing without fluid `clamp` or viewport units, and no JS measurement.

## Layout

Breakpoints: 640 / 768 / 1024 / 1280 / 1536. Container max-width 1280px; readable prose measure 720px. The page edge padding (`--gutter`) is responsive, scaling with the frame: 1rem (16px) on mobile, 1.5rem (24px) on tablet, 3rem (48px) on desktop. The app layout sets it; every band reads it. Header height 4.5rem, announcement bar 2.25rem.

Spacing follows a 4px base on a generous editorial rhythm — `spacing.1` (0.25rem) through `spacing.10` (8rem). Lay groups out with flex/grid + `gap` on this scale. Six paddings sit off the 4px grid on purpose, for optical balance on caps: `padBtnMd` / `padBtnLg` (button), `padPillX` / `padPillY` (pill), and `padRowSm` / `padRowMd` (stacked link rows and table cells). `editorialGap` is the editorial band's column gap.

Every Layout Component is self-contained: it declares a container on its own root and steps its type, columns, gaps, and crops off its own width at the system breakpoints. A page only places the band and passes props. Where a placement legitimately varies, the band takes a prop or reads a custom property (`--editorial-gap`, `--cols-sm/-md/-lg`, `--fc-count`).

Chrome behavior: a sticky header on every screen; a transparent, non-sticky header over the Home hero that hands off to the sticky header after 60vh. Overlays (menu, cart, size chart, shipping) are edge-anchored drawers.

Motion is quick and clean — 160ms/240ms/360ms durations on an ease-out curve (`cubic-bezier(.22,1,.36,1)`). Drawers slide; scrims fade. No bounce, no overshoot. Hover deepens or inverts fills and shifts links to `accentHover`; press is a color shift, never a scale change.

## Elevation & Depth

Depth is tonal and restrained — separation comes from color and hairline borders, not heavy shadow. Cards are flat: a surface fill or a hairline `borderDefault`, small radius, no drop shadow. Shadow is reserved for lifted overlays only: drawers use `-8px 0 40px rgba(51,50,49,0.12)`, raised surfaces `0 4px 24px rgba(51,50,49,0.08)`, and a hairline ring where a 1px outline reads better than a border.

Two defaults are document-level, so the app base layer owns them, not the components: the focus ring (2px `borderFocus`, 2px offset) and the link hover to `accentHover`.

## Shapes

Small radii throughout: `rounded.none` 0, `rounded.sm` 2px (default controls), `rounded.md` 4px (larger surfaces and images), `rounded.pill` 999px (filter and category pills). Nothing bubbly.

## Components

**Module Components** (`/components/`, plain-named primitives)
- **Heading** — level-to-tag primitive; `level` sets h1–h4 for the outline without changing style. Props: `level`, `as`, `children`.
- **Logo** — monogram mark or square lockup; black / white / dark. Props: `variant`, `color`, `size`, `href`, `alt`, `assetBase`.
- **Icon** — Lucide line UI glyphs (1.5px stroke) + Simple Icons social marks. Props: `name`, `size`, `strokeWidth`.
- **Button** — `surfaceInverse` fill, `textOnInverse`, `button` type, `rounded.sm`. Props: `variant` (primary/accent/surface/tonal/secondary/ghost), `size`, `fullWidth`, `disabled`, `as`, `href`, `target`, `rel`.
- **ButtonPill** — filter/category control; `rounded.pill`, inverts to `surfaceInverse` when `active`. Props: `active`, `as`, `href`, `target`, `rel`.
- **IconButton** — borderless 44px chrome control, `textStrong`, `rounded.sm`. Props: `label`, `size`, `children`.
- **QuantityStepper** — `surfacePage` on `borderStrong`, `rounded.sm`. Props: `value`/`defaultValue`, `min`, `max`, `onChange`, `size`, `disabled`.
- **Price** — `textStrong`, `body` type; optional struck compare-at. Props: `amount`, `currency`, `compareAt`, `size`.
- **SizeSelector** — product size chips; sold-out sizes disabled and struck, selected chip inverted to `surfaceInverse`. Props: `sizes`, `value`/`defaultValue`, `onChange`, `label`.
- **Breadcrumb** — page trail (Home › Shop); `eyebrow` type, `textMeta` links. Props: `items`, `separator`.
- **ViewToggle** — grid density control; segmented, active option on `surfaceInverse`. Props: `value`/`defaultValue`, `options`, `onChange`.
- **ProductCard** — grid unit; media (3:4) over a `category` eyebrow + title on the left with the price right-aligned on the same row; `surfaceRaised`, `rounded.sm`. Props: `title`, `price`, `currency`, `compareAt`, `category`, `href`, `src`/`media`, `soldOut`.
- **Accordion** — FAQ disclosure rows; hairline rows, rotating chevron, one open at a time by default. Props: `items`, `headingLevel`, `single`, `defaultOpen`.
- **AnnouncementBar** — `surfaceInverse`/`textOnInverse`, height 2.25rem. Props: `tone` ("dark"|"light"|"accent"), `children`.

**Layout Components** (`/components/`, `C-xxx`) — every heading takes a `headingLevel` (h1–h4) prop that changes the tag only, not the style. Every band sets its own heading treatment inline (display face, uppercase, `tracking-display`, `leading-snug`, `textStrong`), so it renders without a document base layer.
- **C-HeroCarousel** — Home hero band; sliding peek carousel, 1 banner mobile / 2 at 50% from 768px, portrait crops (2:3 → 4:5 at 1024px). Auto-advances by one with wrap; arrows + dots. Props: `slides`, `interval`, `autoPlay`.
- **C-HeroTitle** — editorial title band beneath the hero; optional breadcrumb + eyebrow + `display-1` heading + lead description + optional actions. Props: `breadcrumb`, `eyebrow`, `heading`, `headingLevel`, `description`, `align` ("center"|"start"), `measure`, `headingFont` ("display"|"body"), `headingMeasure`, `background`, `tone`, `children`.
- **C-ShopTitle** — Shop / category page header; breadcrumb + `h1` heading + lead description + optional filter pills (link or button). Props: `breadcrumb`, `heading`, `headingLevel`, `description`, `filters`, `activeFilter`, `onFilter`, `align` ("center"|"start"), `measure`.
- **C-ProductGrid** — shop / category results band; count + ViewToggle toolbar over a responsive ProductCard grid. Columns come from one "mobile/tablet/desktop" string. A floating copy of the ViewToggle sticks to the scrollport bottom-left once the toolbar scrolls away. Props: `products`, `columns`, `label`, `count`, `onView`, `showToolbar`, `floatingToggle`, `pageSize`, `loadMoreLabel`, `endMark` ("none"|"rule"|"mark"|"monogram"), `emptyMessage`.
- **C-CategoryGrid** — full-bleed grid of category tiles; 1 col mobile / 2 from 640px, portrait 4:5 crops, alternating bottom-left/right labels over a scrim. Props: `items`, `headingLevel`, `alternate`.
- **C-EditorialSplit** — two-up editorial band used on the About page; 4:5 media beside eyebrow + heading + paragraph, `mirror` swaps sides, stacks below 768px. Props: `eyebrow`, `heading`, `headingLevel`, `paragraph`, `media`, `mirror`, `mobileFirst` ("media"|"text"), `mediaRounded`, `background`, `children`. Column gap reads `--editorial-gap`.
- **C-ShopEditorial** — the two-up editorial band used across the Shop and category pages; same shape as C-EditorialSplit, and it steps its own gap and media crop (4:3 → 1:1 → 5:4) off its width. Props: `eyebrow`, `heading`, `headingLevel`, `headingFont` ("display"|"body"), `paragraph`, `media`, `mirror`, `mobileFirst` ("media"|"text"), `mobileAlign` ("left"|"right"), `gap`, `ratio`, `background`, `children`.
- **C-FeatureColumns** — eyebrow + heading over 2–3 media columns, each with a subheading and paragraph. Props: `eyebrow`, `heading`, `headingLevel`, `itemHeadingLevel`, `items`.
- **C-ShopFaq** — FAQ band; heading beside its accordion at two-up, stacking below 768px. Props: `heading`, `headingLevel`, `items`, `itemHeadingLevel`, `defaultOpen`, `single`, `align` ("center"|"start").
- **C-ProductPanel** — product page main band; media gallery beside the purchase column (breadcrumb, name, price, type attribute, size, quantity, buy buttons, drawer links). All sizes sold out swaps the buy pair for a Preorder link. Props: `breadcrumb`, `name`, `headingLevel`, `price`, `compareAt`, `currency`, `description`, `attributeLabel`, `attributeValue`, `sizes`, `size`, `onSize`, `quantity`, `onQuantity`, `media`, `onAddToCart`, `onBuyNow`, `onSizeChart`, `onShipping`, `preorderHref`, `stacked`.
- **C-MediaGallery** — thumb strip beside a 3:4 stage; video first, autoplaying muted/looped/inline once loaded, static under `prefers-reduced-motion`. The strip turns vertical at 380px of its own width. Props: `media`.
- **C-RelatedProducts** — "You May Also Like" band; heading + subtitle + back-to-category button over a small ProductCard grid. Props: `heading`, `headingLevel`, `subtitle`, `backLabel`, `backHref`, `products`, `columns`, `backVariant`, `actionsLayout` ("row"|"stack"), `actionsMeasure`, `children`.
- **C-ContentProse** — full-width policy page band; centers heading + paragraph blocks at a readable measure (one or several paragraphs per heading), email addresses auto-linked. Owns its band padding, content width, type sizes and block rhythm. Props: `items`, `headingLevel`, `measure`, `contentWidth`, `background`, `paddingTop`, `children`.
- **C-ContactMethods** — stacked contact rows; hairline-separated, each a heading over social marks, a mailto link, or an address block. Props: `items`, `headingLevel`.
- **C-Transparent** — hero header, Home only; `white` text over imagery, height 4.5rem. Props: `onMenu`, `onCart`, `cartCount`, `announcement`, `announcementTone` ("dark"|"light"|"accent"), `logoHref`.
- **C-Sticky** — sticky header on every screen; `surfacePage`/`textStrong`, height 4.5rem. Props: `onMenu`, `onCart`, `cartCount`, `announcement`, `announcementTone`, `logoHref`, `showAnnouncement`.
- **C-Menu** — left menu drawer; `surfacePage`, padding 1.5rem. Props: `open`, `onClose`, `headingLevel`, `shopLinks`, `secondaryLinks`, `onNavigate`, `logoHref`.
- **C-Cart** — right cart drawer; `surfacePage`, `h3` title, padding 1.5rem. Props: `open`, `onClose`, `headingLevel`, `items`, `currency`, `onQuantityChange`, `onRemove`, `onCheckout`.
- **C-Sizing** — right size-chart drawer; `surfacePage`, `h3` title, padding 1.5rem. Props: `open`, `onClose`, `headingLevel`, `productName`, `chart`.
- **C-Shipping** — right shipping & returns drawer; `surfacePage`, `h3` title, padding 1.5rem. Props: `open`, `onClose`, `headingLevel`, `sections`, `children`.
- **C-Footer** — dark footer band; `surfaceInverse`/`textOnInverse`, `eyebrow` column headings, padding 6rem. Responsive: logo row / shop + more / connect row on mobile and tablet, equal 4 columns on desktop. Props: `headingLevel`, `shopLinks`, `infoLinks`, `socialLinks`, `year`.

## Do's and Don'ts

- **Do** stay inside the closed neutral palette; never introduce a color outside the color tokens.
- **Do** keep display/nav/button text uppercase in Cormorant Infant, and prose in Cardo.
- **Do** derive separation from tone and hairline borders; keep cards flat.
- **Do** lay out with flex/grid + `gap` on the spacing scale.
- **Do** drive a band's responsive behavior from its own container width, never the viewport.
- **Don't** use `primary` or `muted` for ANY text, including small-caps labels and eyebrows (fails AA) — they are for hairlines, borders, fills, and decorative chrome only; use `textMeta` for meta text.
- **Don't** add gradients, heavy drop shadows on cards, or bounce/overshoot motion.
- **Don't** use large radii, emoji, or hand-rolled decorative SVG icons.
