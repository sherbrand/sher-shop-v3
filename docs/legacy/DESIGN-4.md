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
  surfacePage: "{colors.background}"
  surfaceTint: "{colors.tint}"
  surfaceRaised: "{colors.surface}"
  surfaceInverse: "{colors.dark}"
  textBody: "{colors.text}"
  textStrong: "{colors.dark}"
  textMuted: "{colors.muted}"
  textMeta: "{colors.text}"
  textOnInverse: "{colors.background}"
  textOnPrimary: "{colors.dark}"
  borderDefault: "{colors.border}"
  borderFocus: "{colors.dark}"
  scrim: "rgba(51,50,49,0.32)"
  scrimSoft: "rgba(51,50,49,0.28)"
  overlayHero: "linear-gradient(180deg, rgba(51,50,49,0.28) 0%, rgba(51,50,49,0.10) 40%, rgba(51,50,49,0.42) 100%)"
  borderInverse: "rgba(250,249,246,0.16)"
  dotIdle: "rgba(250,249,246,0.5)"
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
    letterSpacing: 0.18em
  button:
    fontFamily: "'Cormorant Infant', Georgia, 'Times New Roman', serif"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.14em
rounded:
  none: 0
  sm: 2px
  md: 4px
  pill: 999px
spacing:
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
components:
  Logo:
    size: 40
  Icon:
    textColor: "{colors.textStrong}"
    size: 20
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
    padding: 0.75rem
  IconButton:
    textColor: "{colors.textStrong}"
    rounded: "{rounded.sm}"
    size: 44
  QuantityStepper:
    backgroundColor: "{colors.surfacePage}"
    textColor: "{colors.textStrong}"
    rounded: "{rounded.sm}"
  Price:
    textColor: "{colors.textStrong}"
    typography: "{typography.body}"
  SizeSelector:
    textColor: "{colors.textStrong}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
  Breadcrumb:
    textColor: "{colors.textMeta}"
    typography: "{typography.eyebrow}"
  ViewToggle:
    backgroundColor: "{colors.surfaceInverse}"
    textColor: "{colors.textStrong}"
    rounded: "{rounded.sm}"
  ProductCard:
    backgroundColor: "{colors.surfaceRaised}"
    textColor: "{colors.textStrong}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
  Accordion:
    textColor: "{colors.textStrong}"
    typography: "{typography.h4}"
  AnnouncementBar:
    backgroundColor: "{colors.surfaceInverse}"
    textColor: "{colors.textOnInverse}"
    height: 2.25rem
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
  C-ProductGrid:
    textColor: "{colors.textMeta}"
    typography: "{typography.eyebrow}"
  C-CategoryGrid:
    backgroundColor: "{colors.border}"
    textColor: "{colors.white}"
    typography: "{typography.h2}"
  C-EditorialSplit:
    textColor: "{colors.textBody}"
    typography: "{typography.h2}"
  C-ShopEditorial:
    textColor: "{colors.textBody}"
    typography: "{typography.h2}"
  C-FeatureColumns:
    textColor: "{colors.textBody}"
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
    textColor: "{colors.textBody}"
    typography: "{typography.h2}"
  C-ContactMethods:
    textColor: "{colors.textBody}"
    typography: "{typography.h4}"
  C-Transparent:
    textColor: "{colors.white}"
    height: 4.5rem
  C-Sticky:
    backgroundColor: "{colors.surfacePage}"
    textColor: "{colors.textStrong}"
    height: 4.5rem
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
    textColor: "{colors.textBody}"
    padding: 1.5rem
  C-Shipping:
    backgroundColor: "{colors.surfacePage}"
    textColor: "{colors.textBody}"
    padding: 1.5rem
  C-Footer:
    backgroundColor: "{colors.surfaceInverse}"
    textColor: "{colors.textOnInverse}"
    typography: "{typography.eyebrow}"
    padding: 6rem
---

## Overview

SHER is a modern womenswear storefront design system — warm editorial minimalism, tonal and photography-led. The palette is a closed set of warm neutrals; type pairs Cormorant Infant (uppercase display, nav, buttons) with Cardo (serif prose). Surfaces are flat, radii are small, and depth is reserved for edge-anchored overlays. Everything here is token-driven so it maps cleanly onto Next.js + Tailwind.

## Colors

Raw palette (`tokens/colors.css`): `background` #FAF9F6, `tint` #EFEBE7 (light primary), `surface` #E4E2DC, `text` #514F4E, `primary` #A99D94, `accent` #7C736B, `muted` #929291, `dark` #333231, `white` #FFFFFF, hairlines `border` #D8D5CE / `borderStrong` #C3BFB6, and `accentHover` #6B635B.

Semantic aliases reference the raw palette: `surfacePage`/`surfaceTint`/`surfaceRaised`/`surfaceInverse`, `textBody`/`textStrong`/`textMeta`/`textMuted`, `textOnInverse`, `textOnPrimary`, `borderDefault`, `borderFocus`. `accent` is a raw color and is referenced directly. Reference tokens with `{colors.<name>}`.

Five tokens are translucent, for overlays: `scrim` and `scrimSoft` (drawer and image veils), `overlayHero` (the hero text gradient), `borderInverse` (hairline on dark surfaces), and `dotIdle` (inactive carousel dot).

Every UI text/background pair passes WCAG AA: text on background 7.7:1, text on tint 7.1:1, text on surface 6.3:1, dark on background 12.2:1, white on accent 4.6:1, background on dark 12.2:1. Small-caps meta text — eyebrows, result counts, labels, table heads — uses `textMeta` (#514F4E), never `muted`: muted is only 3.0:1 on the page and 2.4:1 on surface, so it fails AA at label sizes. `primary` and `muted` are for fills, large text, and hairlines only, never body text on light grounds. **Primary (#A99D94) carries neither white nor dark text at AA for body copy** (dark-on-primary is 4.8:1 by luminance but reads poorly, so it is not an approved pair); when a warm fill needs text, use `accent` (#7C736B) with white.

## Typography

Two families only. **Cormorant Infant** carries display, headings, nav and buttons — always uppercase. **Cardo** carries body prose, eyebrows and meta text. The scale is stepped (mobile / tablet / desktop), swapped at container breakpoints, not fluid clamp; the composite styles here list the desktop sizes. Headings render weight 400; buttons weight 500. Line heights: 1.1 display/h1, 1.3 h2–h4, 1.65 body.

Type roles are named for WHERE the type sits, never for an HTML tag — the ladder is `display` -> `hero` -> `section` -> `title` -> `sub`, and any of them can render as any h1–h4 via the Heading component's `level` prop. Two stepped body roles carry non-heading text: **item** (`--text-item-sm/md/lg`, 16 / 18 / 20) for product names and prices, and **body** (`--text-body-sm/md/lg`, 14 / 16 / 18) for descriptions and intro paragraphs. Pages may alias them as `--fs-item` and `--fs-body`. Fixed sizes remain for `--text-base` (16 prose), `--text-sm` (14 meta), `--text-xs` (12 labels), `--text-nano` (10 cart badge). The announcement bar has its own stepped role, `--text-announce-sm/lg` (10 / 11.5), separate from `--text-nano` so it can move independently, aliased as `--fs-announce`.

Tracking has exactly three roles — never invent a value between them: `--tracking-display` `0.05em` for large display and nav headings, `--tracking-control` `0.14em` for interactive small caps (buttons at every size, pills, breadcrumb), and `--tracking-label` `0.18em` for static small caps (eyebrows, result counts, column heads, badges). Body prose is `0`.

Styles: `display-1`, `h1`, `h2`, `h3`, `h4`, `body`, `eyebrow`, `button`.

The Heading primitive sets the tag only. Each component carries its own heading treatment: display face, weight 400, uppercase, `tracking-display`, `leading-snug` (`leading-tight` at display and hero sizes), and `textStrong`.

## Layout

Breakpoints: 640 / 768 / 1024 / 1280 / 1536. Container max-width 1280px; readable prose measure 720px. The page edge padding (`--gutter`) is responsive, scaling with the frame: 1rem (16px) on mobile, 1.5rem (24px) on tablet, 3rem (48px) on desktop. The app layout sets it; every band reads it. Header height 4.5rem, announcement bar 2.25rem.

Spacing follows a 4px base on a generous editorial rhythm — `spacing.1` (0.25rem) through `spacing.10` (8rem). Lay groups out with flex/grid + `gap` on this scale. Control paddings sit off the 4px grid on purpose, for optical balance on caps (CSS-level, in `tokens/spacing.css`): `padBtnMd` / `padBtnLg` (button) and `padPillX` / `padPillY` (pill).

Every Layout Component is self-contained: it declares a CSS container on its own root and steps its type, columns, gaps, and crops off its own width at the system breakpoints. A page only places the band and passes props. Where a placement legitimately varies, the band takes a prop or reads a custom property (`--editorial-gap`, `--cols-sm/-md/-lg`, `--fc-count`).

Chrome behavior: a sticky header on every screen; a transparent, non-sticky header over the Home hero that hands off to the sticky header after 60vh. Overlays (menu, cart, size chart, shipping) are edge-anchored drawers.

Motion is quick and clean — 160ms/240ms/360ms durations on an ease-out curve (`cubic-bezier(.22,1,.36,1)`). Drawers slide; scrims fade. No bounce, no overshoot. Hover deepens or inverts fills and shifts links to `accentHover`; press is a color shift, never a scale change.

Two defaults are document-level, so the app base layer owns them, not the components: the focus ring (2px `borderFocus`, 2px offset) and the link hover to `accentHover`.

## Elevation & Depth

Depth is tonal and restrained — separation comes from color and hairline borders, not heavy shadow. Cards are flat: a surface fill or a hairline `borderDefault`, small radius, no drop shadow. Shadow is reserved for lifted overlays only: drawers use `-8px 0 40px rgba(51,50,49,0.12)`, raised surfaces `0 4px 24px rgba(51,50,49,0.08)`, and a hairline ring where a 1px outline reads better than a border.

## Shapes

Small radii throughout: `rounded.none` 0, `rounded.sm` 2px (default controls), `rounded.md` 4px (larger surfaces and images), `rounded.pill` 999px (filter and category pills). Nothing bubbly.

## Components

**Module Components** (`/components/`, plain-named primitives)
- **Heading** — level-to-tag primitive; `level` sets h1–h4 for the outline without changing style. Props: `level`, `as`.
- **Logo** — monogram mark or square lockup; black / white / dark. Props: `variant`, `color`, `size`, `href`, `alt`, `assetBase`.
- **Icon** — Lucide line UI glyphs (1.5px stroke) + Simple Icons social marks. Props: `name`, `size`, `strokeWidth`.
- **Button** — `surfaceInverse` fill, `textOnInverse`, `button` type, `rounded.sm`. Props: `variant` (primary/accent/secondary/ghost), `size`, `fullWidth`, `as`, `href`, `disabled`.
- **ButtonPill** — filter/category control; `rounded.pill`, inverts to `surfaceInverse` when `active`. Props: `active`, `as`, `href`.
- **IconButton** — borderless 44px chrome control, `textStrong`, `rounded.sm`. Props: `label`, `size`.
- **QuantityStepper** — `surfacePage` on `borderStrong`, `rounded.sm`. Props: `value`/`defaultValue`, `min`, `max`, `onChange`, `size`, `disabled`.
- **Price** — `textStrong`, `body` type; optional struck compare-at. Props: `amount`, `currency`, `compareAt`, `size`.
- **SizeSelector** — product size chips; sold-out sizes disabled and struck, selected chip inverted to `surfaceInverse`. Props: `sizes`, `value`/`defaultValue`, `onChange`, `label`.
- **Breadcrumb** — page trail (Home › Shop); `eyebrow` type, `textMeta` links. Props: `items`, `separator`.
- **ViewToggle** — grid density control; segmented, active option on `surfaceInverse`. Props: `value`/`defaultValue`, `options`, `onChange`.
- **ProductCard** — grid unit; media (3:4) over a `category` eyebrow + title on the left with the price right-aligned on the same row; `surfaceRaised`, `rounded.sm`. Props: `title`, `price`, `currency`, `compareAt`, `category`, `href`, `src`/`media`, `soldOut`.
- **Accordion** — FAQ disclosure rows; hairline rows, rotating chevron, one open at a time by default. Props: `items`, `headingLevel`, `single`, `defaultOpen`.
- **AnnouncementBar** — `surfaceInverse`/`textOnInverse`, height 2.25rem. Props: `tone` ("dark"|"light"|"accent"), `children`.

**Layout Components** (`/components/`, `C-xxx`) — every heading takes a `headingLevel` (h1–h4) prop that changes the tag only, not the style.
- **C-HeroCarousel** — Home hero band; sliding peek carousel, 1 banner mobile / 2 at 50% from 768px, portrait crops (2:3 → 4:5 at 1024px). Auto-advances by one with wrap; arrows + dots. Props: `slides`, `interval`, `autoPlay`.
- **C-HeroTitle** — editorial title band beneath the hero; optional breadcrumb + eyebrow + `display` heading + lead description + optional actions. Props: `breadcrumb`, `eyebrow`, `heading`, `headingLevel`, `description`, `align` ("center"|"start"), `measure`, `headingFont` ("display"|"body"), `headingMeasure`, `background`, `children`.
- **C-ShopTitle** — Shop / category page header; breadcrumb + `hero` heading + lead description + optional filter pills (link or button). Props: `breadcrumb`, `heading`, `headingLevel`, `description`, `filters`, `activeFilter`, `onFilter`, `align` ("center"|"start"), `measure`.
- **C-ProductGrid** — shop / category results band; count + ViewToggle toolbar over a responsive ProductCard grid. Columns come from one "mobile/tablet/desktop" string. A floating copy of the ViewToggle sticks to the scrollport bottom-left once the toolbar scrolls away. With `pageSize` set, a centered large `primary` "Load More" button reveals the next page. Props: `products`, `columns`, `label`, `count`, `onView`, `showToolbar`, `floatingToggle`, `pageSize`, `loadMoreLabel`, `emptyMessage`.
- **C-CategoryGrid** — full-bleed grid of category tiles; 1 col mobile / 2 from 640px, portrait 4:5 crops, alternating bottom-left/right labels over a scrim. Props: `items`, `headingLevel`, `alternate`.
- **C-EditorialSplit** — two-up editorial band used on the About page; fixed 4:5 media beside eyebrow + heading + paragraph, `mirror` swaps sides, stacks below 768px. Props: `eyebrow`, `heading`, `headingLevel`, `paragraph`, `media`, `mirror`, `mobileFirst` ("media"|"text"), `mediaRounded`, `background`, `children`. Column gap reads `--editorial-gap`.
- **C-ShopEditorial** — the two-up editorial band used across the Shop and category pages; same shape as C-EditorialSplit, but it steps its own gap (24 → 64px) and media crop (4:3 → 1:1 → 5:4) off its width. Props: `eyebrow`, `heading`, `headingLevel`, `headingFont` ("display"|"body"), `paragraph`, `media`, `mirror`, `mobileFirst`, `mobileAlign` ("left"|"right"), `gap`, `ratio`, `background`, `children`.
- **C-FeatureColumns** — eyebrow + heading over 2–3 media columns, each with a subheading and paragraph. Props: `eyebrow`, `heading`, `headingLevel`, `itemHeadingLevel`, `items`.
- **C-ShopFaq** — FAQ band; heading beside its accordion at two-up, stacking below 768px. Props: `heading`, `headingLevel`, `items`, `itemHeadingLevel`, `defaultOpen`, `single`, `align` ("center"|"start").
- **C-ProductPanel** — product page main band; media gallery beside the purchase column (breadcrumb, name, price, size, quantity, buy buttons, description, type attribute, drawer links). All sizes sold out swaps the buy pair for a Preorder link. Props: `breadcrumb`, `name`, `headingLevel`, `price`, `compareAt`, `currency`, `description`, `attributeLabel`, `attributeValue`, `sizes`, `size`, `onSize`, `quantity`, `onQuantity`, `media`, `onAddToCart`, `onBuyNow`, `onSizeChart`, `onShipping`, `preorderHref`, `stacked`.
- **C-MediaGallery** — thumb strip beside a 3:4 stage; video first, autoplaying muted/looped/inline once loaded, static under `prefers-reduced-motion`. The strip turns vertical at 380px of its own width. Props: `media`.
- **C-RelatedProducts** — "You May Also Like" band; heading + subtitle + back-to-category button over a small ProductCard grid. Props: `heading`, `headingLevel`, `subtitle`, `backLabel`, `backHref`, `products`, `columns`, `backVariant`, `actionsLayout` ("row"|"stack"), `actionsMeasure`, `children`.
- **C-ContentProse** — full-width policy page band; centers heading + paragraph blocks at a readable measure (one or several paragraphs per heading), email addresses auto-linked. Owns its band padding, content width, type sizes and block rhythm. Props: `items`, `headingLevel`, `measure`, `contentWidth`, `background`, `paddingTop`, `children`.
- **C-ContactMethods** — stacked contact rows; hairline-separated, each a heading over social marks, a mailto link, or an address block. Props: `items`, `headingLevel`.
- **C-Transparent** — hero header, Home only; `white` text over imagery, height 4.5rem. Props: `announcement`, `announcementTone` ("dark"|"light"|"accent"), `onMenu`, `onCart`, `cartCount`, `logoHref`.
- **C-Sticky** — sticky header on every screen; `surfacePage`/`textStrong`, height 4.5rem. Props: `announcement`, `announcementTone`, `onMenu`, `onCart`, `cartCount`, `logoHref`, `showAnnouncement`.
- **C-Menu** — left menu drawer; `surfacePage`, padding 1.5rem. Props: `open`, `onClose`, `headingLevel`, `shopLinks`, `secondaryLinks`, `onNavigate`, `logoHref`.
- **C-Cart** — right cart drawer; `surfacePage`, `h3` title, padding 1.5rem. Props: `open`, `onClose`, `headingLevel`, `items`, `currency`, `onQuantityChange`, `onRemove`, `onCheckout`.
- **C-Sizing** — right size-chart drawer; `surfacePage`, `textBody`, padding 1.5rem. Props: `open`, `onClose`, `headingLevel`, `productName`, `chart`.
- **C-Shipping** — right shipping & returns drawer; `surfacePage`, `textBody`, padding 1.5rem. Props: `open`, `onClose`, `headingLevel`, `sections`, `children`.
- **C-Footer** — dark footer band; `surfaceInverse`/`textOnInverse`, `eyebrow` column headings, padding 6rem. Responsive: logo row / shop + more / connect row on mobile and tablet, equal 4 columns on desktop. Props: `headingLevel`, `shopLinks`, `infoLinks`, `socialLinks`, `year`.

## Do's and Don'ts

- **Do** stay inside the closed neutral palette; never introduce a color outside `tokens/colors.css`.
- **Do** keep display/nav/button text uppercase in Cormorant Infant, and prose in Cardo.
- **Do** derive separation from tone and hairline borders; keep cards flat.
- **Do** lay out with flex/grid + `gap` on the spacing scale.
- **Do** drive a band's responsive behavior from its own container width, never the viewport.
- **Don't** use `primary` or `muted` for ANY text, including small-caps labels and eyebrows (fails AA) — they are for hairlines, borders, fills, and decorative chrome only; use `textMeta` for meta text.
- **Don't** add gradients, heavy drop shadows on cards, or bounce/overshoot motion.
- **Don't** use large radii, emoji, or hand-rolled decorative SVG icons.
