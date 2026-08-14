---
version: alpha
name: SHER
description: Warm editorial minimalism for a structured-corsetry womenswear storefront.
colors:
  background: "#FAF9F6"
  surface: "#E4E2DC"
  text: "#514F4E"
  primary: "#A99D94"
  muted: "#929291"
  dark: "#333231"
  white: "#FFFFFF"
  border: "#D8D5CE"
  borderStrong: "#C3BFB6"
  accentHover: "#9A8E85"
  surfacePage: "{colors.background}"
  surfaceRaised: "{colors.surface}"
  surfaceInverse: "{colors.dark}"
  textBody: "{colors.text}"
  textStrong: "{colors.dark}"
  textMuted: "{colors.muted}"
  textOnInverse: "{colors.background}"
  textOnPrimary: "{colors.dark}"
  accent: "{colors.primary}"
  borderDefault: "{colors.border}"
  borderFocus: "{colors.dark}"
typography:
  display-1:
    fontFamily: "'Cormorant Infant', Georgia, 'Times New Roman', serif"
    fontSize: 4.5rem
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: 0.05em
  h1:
    fontFamily: "'Cormorant Infant', Georgia, 'Times New Roman', serif"
    fontSize: 3.25rem
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: 0.05em
  h2:
    fontFamily: "'Cormorant Infant', Georgia, 'Times New Roman', serif"
    fontSize: 2.25rem
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0.05em
  h3:
    fontFamily: "'Cormorant Infant', Georgia, 'Times New Roman', serif"
    fontSize: 1.5rem
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
    letterSpacing: 0.18em
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
  QuantityStepper:
    backgroundColor: "{colors.surfacePage}"
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
  ViewToggle:
    backgroundColor: "{colors.surfaceInverse}"
    textColor: "{colors.textStrong}"
    rounded: "{rounded.sm}"
  Breadcrumb:
    textColor: "{colors.textMuted}"
    typography: "{typography.eyebrow}"
  AnnouncementBar:
    backgroundColor: "{colors.surfaceInverse}"
    textColor: "{colors.textOnInverse}"
    height: 2.25rem
  C-Sticky:
    backgroundColor: "{colors.surfacePage}"
    textColor: "{colors.textStrong}"
    height: 4.5rem
  C-Transparent:
    textColor: "{colors.white}"
    height: 4.5rem
  C-HeroCarousel:
    backgroundColor: "{colors.surfaceInverse}"
    textColor: "{colors.white}"
    typography: "{typography.display-1}"
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

Raw palette (`tokens/colors.css`): `background` #FAF9F6, `surface` #E4E2DC, `text` #514F4E, `primary` #A99D94, `muted` #929291, `dark` #333231, `white` #FFFFFF, hairlines `border` #D8D5CE / `borderStrong` #C3BFB6, and `accentHover` #9A8E85.

Semantic aliases reference the raw palette: `surfacePage`/`surfaceRaised`/`surfaceInverse`, `textBody`/`textStrong`/`textMuted`, `textOnInverse`, `textOnPrimary`, `accent`, `borderDefault`, `borderFocus`. Reference tokens with `{colors.<name>}`.

Translucent tokens for overlays (CSS-level, in `tokens/colors.css`): `scrim` and `scrimSoft` (drawer and image veils), `overlayHero` (the hero text gradient), `borderInverse` (hairline on dark surfaces), and `dotIdle` (inactive carousel dot).

Every UI text/background pair passes WCAG AA: text on background 7.7:1, text on surface 6.3:1, dark on background 12.2:1, dark on primary 4.8:1, background on dark 12.2:1. `primary` and `muted` fail AA as body text on light grounds — use them for fills, large text, and hairlines only, never as body copy color.

## Typography

Two families only. **Cormorant Infant** — display, headings, nav, buttons — is always uppercase with `0.05em` tracking (`0.18em` on the button style). **Cardo** carries body prose and eyebrows (eyebrows uppercase, `0.18em`). The scale is fluid via clamp in CSS; the composite styles here list the upper-bound sizes. Headings render weight 400; buttons weight 500. Line heights: 1.1 display/h1, 1.3 h2–h4, 1.65 body.

Composite styles: `display-1`, `h1`, `h2`, `h3`, `h4`, `body`, `eyebrow`, `button`. The CSS size scale also carries a few role sizes used by components (CSS-level, in `tokens/typography.css`): `hero` (fluid hero heading), `md` (emphasized price), `micro` (announcement bar), `nano` (count badge). Uppercase caps get their own tracking steps `tracking-1` (0.06em) through `tracking-6` (0.16em), since caps need looser spacing at smaller sizes.

## Layout

Breakpoints: 640 / 768 / 1024 / 1280 / 1536. Container max-width 1280px; readable prose measure 720px; page gutter 1.5rem. Header height 4.5rem, announcement bar 2.25rem.

Spacing follows a 4px base on a generous editorial rhythm — `spacing.1` (0.25rem) through `spacing.10` (8rem). Lay groups out with flex/grid + `gap` on this scale. Control paddings sit off the 4px grid on purpose, for optical balance on caps (CSS-level, in `tokens/spacing.css`): `padBtnMd` / `padBtnLg` (button) and `padPillX` / `padPillY` (pill).

Chrome behavior: a sticky header on every screen; a transparent, non-sticky header over the Home hero that hands off to the sticky header after 60vh. Overlays (menu, cart, size chart, shipping) are edge-anchored drawers.

Motion is quick and clean — 160ms/240ms/360ms durations on an ease-out curve (`cubic-bezier(.22,1,.36,1)`). Drawers slide; scrims fade. No bounce, no overshoot. Hover deepens or inverts fills and shifts links to `accentHover`; press is a color shift, never a scale change.

## Elevation & Depth

Depth is tonal and restrained — separation comes from color and hairline borders, not heavy shadow. Cards are flat: a surface fill or a hairline `borderDefault`, small radius, no drop shadow. Shadow is reserved for lifted overlays only: drawers use `-8px 0 40px rgba(51,50,49,0.12)`, raised surfaces `0 4px 24px rgba(51,50,49,0.08)`, and a hairline ring where a 1px outline reads better than a border.

## Shapes

Small radii throughout: `rounded.none` 0, `rounded.sm` 2px (default controls), `rounded.md` 4px (larger surfaces and images), `rounded.pill` 999px (filter and category pills). Nothing bubbly.

## Components

**Module Components** (`components/`, plain-named primitives)
- **Heading** — level-to-tag primitive; `level` sets h1–h4 for the outline without changing style. Props: `level`, `as`.
- **Logo** — monogram mark or square lockup; black / white / dark. Props: `variant`, `color`, `size`, `href`, `assetBase`.
- **Icon** — Lucide line UI glyphs (1.5px stroke) + Simple Icons social marks. Props: `name`, `size`, `strokeWidth`.
- **Button** — `surfaceInverse` fill, `textOnInverse`, `button` type, `rounded.sm`. Props: `variant` (primary/accent/secondary/ghost), `size`, `fullWidth`, `disabled`.
- **ButtonPill** — filter/category control; `rounded.pill`, inverts to `surfaceInverse` when `active`. Props: `active`, `as`.
- **IconButton** — borderless 44px chrome control, `textStrong`, `rounded.sm`. Props: `label`, `size`.
- **QuantityStepper** — `surfacePage` on `borderStrong`, `rounded.sm`. Props: `value`/`defaultValue`, `min`, `max`, `onChange`, `size`.
- **Price** — `textStrong`, `body` type. Props: `amount`, `currency`, `compareAt`, `size`.
- **Breadcrumb** — page trail (Home › Shop); `eyebrow` type, `textMuted` links. Props: `items`, `separator`.
- **ViewToggle** — grid density control; segmented, active option on `surfaceInverse`. Props: `value`/`defaultValue`, `options`, `onChange`.
- **ProductCard** — grid unit; media (3:4) over title + price on `surfaceRaised`, `rounded.sm`. Props: `title`, `price`, `compareAt`, `href`, `src`/`media`, `soldOut`.
- **AnnouncementBar** — `surfaceInverse`/`textOnInverse`, height 2.25rem. Props: `tone`, `children`.

**Layout Components** (`components/`, `C-xxx`) — every heading takes a `headingLevel` (h1–h4) prop that changes the tag only, not the style.
- **C-HeroCarousel** — full-bleed Home hero band; `surfaceInverse` panel, `white` overlay text, `display-1` heading. Auto-advances with arrows and dots. Props: `slides`, `interval`, `height`, `autoPlay`.
- **C-Transparent** — hero header, Home only; `white` text over imagery, height 4.5rem. Props: `onMenu`, `onCart`, `cartCount`, `announcement`.
- **C-Sticky** — sticky header on every screen; `surfacePage`/`textStrong`, height 4.5rem. Props: `onMenu`, `onCart`, `cartCount`, `showAnnouncement`.
- **C-Menu** — left menu drawer; `surfacePage`, padding 1.5rem. Props: `open`, `onClose`, `headingLevel`, `shopLinks`, `secondaryLinks`, `onNavigate`.
- **C-Cart** — right cart drawer; `surfacePage`, `h3` title, padding 1.5rem. Props: `open`, `onClose`, `headingLevel`, `items`, `onQuantityChange`, `onRemove`, `onCheckout`.
- **C-Sizing** — right size-chart drawer; `surfacePage`, `textBody`, padding 1.5rem. Props: `open`, `onClose`, `headingLevel`, `productName`, `chart`.
- **C-Shipping** — right shipping & returns drawer; `surfacePage`, `textBody`, padding 1.5rem. Props: `open`, `onClose`, `headingLevel`, `sections`, `children`.
- **C-Footer** — dark footer band; `surfaceInverse`/`textOnInverse`, `eyebrow` column headings, padding 6rem. Props: `headingLevel`, `shopLinks`, `infoLinks`, `socialLinks`, `year`.

## Do's and Don'ts

- **Do** stay inside the closed neutral palette; never introduce a color outside `tokens/colors.css`.
- **Do** keep display/nav/button text uppercase in Cormorant Infant, and prose in Cardo.
- **Do** derive separation from tone and hairline borders; keep cards flat.
- **Do** lay out with flex/grid + `gap` on the spacing scale.
- **Don't** use `primary` or `muted` as body-text color on light grounds (fails AA).
- **Don't** add gradients, heavy drop shadows on cards, or bounce/overshoot motion.
- **Don't** use large radii, emoji, or hand-rolled decorative SVG icons.
