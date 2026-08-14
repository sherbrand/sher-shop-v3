---
name: SHER
colors:
  background: "#FFFFFF"
  background-alt: "#FBF9F9"
  primary: "#A99D94"
  text: "#665D55"
  icon-static: "#94A3B8"
  white: "#FFFFFF"
typography:
  heading-lg:
    fontFamily: "Cormorant Infant"
    fontSize: "28px"
    fontWeight: "400"
    lineHeight: "1.2"
    textTransform: "uppercase"
  heading-sm:
    fontFamily: "Cormorant Infant"
    fontSize: "22px"
    fontWeight: "400"
    lineHeight: "1.2"
    textTransform: "uppercase"
  body-lg:
    fontFamily: "Cardo"
    fontSize: "20px"
    fontWeight: "400"
    lineHeight: "1.6"
  body-md:
    fontFamily: "Cardo"
    fontSize: "15px"
    fontWeight: "400"
    lineHeight: "1.6"
  label-lg:
    fontFamily: "Manrope"
    fontSize: "13px"
    fontWeight: "600"
  label-sm:
    fontFamily: "Manrope"
    fontSize: "11px"
    fontWeight: "500"
    textTransform: "uppercase"
    letterSpacing: "0.1em"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "64px"
  3xl: "96px"
breakpoints:
  sm: "640px"
  md: "768px"
  lg: "1024px"
  xl: "1280px"
  2xl: "1536px"
container:
  display:
    max-width: "1600px"
    padding: "{spacing.sm}"
  prose:
    max-width: "800px"
    padding: "{spacing.md}"
rounded:
  default: "5px"
motion:
  duration:
    fast: "200ms"
    base: "300ms"
    slow: "500ms"
  easing:
    standard: "cubic-bezier(0, 0, 0.2, 1)"
    emphasized: "cubic-bezier(0.4, 0, 0.2, 1)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.default}"
    padding: "12px 24px"
  drawer:
    backgroundColor: "{colors.background}"
    rounded: "0"
  product-card:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.default}"
  hero:
    width: "100vw"
    height: "100vh"
  announcement-bar:
    backgroundColor: "{colors.background-alt}"
    textColor: "{colors.text}"
    typography: "{typography.label-sm}"
---

# SHER Design System

## Overview

SHER is a premium womenswear brand built around handcrafted corset tops. The brand personality is magnetic, sensual, feminine, and refined — drawing aesthetic reference from Chanel, Dior, and Saint Laurent. The visual language should feel like a high-end fashion magazine: confident, unhurried, and image-led.

The editorial quality of the brand comes from photography, not from empty space. Large, uncompromised images are the primary carrier of brand perception. Spacing and layout exist to protect and frame those images — not to signal premium on their own.

**Voice:** Direct, assured, quietly seductive. Never playful, never promotional.

**Taglines (approved for use across surfaces):**

- Refined sensuality
- The corset top, rewritten
- Modern femininity with effortless confidence
- Feminine silhouette with a magnetic presence

## Colors

The palette is intentionally restrained. The primary — a warm sandy grey — is the signature SHER tone and the only colour used for interactive elements.

- **Background** `#FFFFFF` — default page background
- **Background Alt** `#FBF9F9` — alternate section background for subtle contrast
- **Primary** `#A99D94` — sandy grey; primary buttons, active states, highlights
- **Text** `#665D55` — all body text, headings, and labels
- **Icon Static** `#94A3B8` — non-interactive icons only

No additional colours should be introduced.

## Typography

Three typefaces, each with a distinct role. Do not substitute or reassign.

**Cormorant Infant** is the display face. Always uppercase. High contrast, decorative, and distinctly fashion-forward at large sizes. Used only for headings and sub-headers — never for body text or UI chrome.

**Cardo** is the editorial text face. Designed for readability at smaller sizes while retaining a refined serif quality. Used for all product-facing content: names, prices, and descriptions.

**Manrope** is the functional face. A clean, modern sans-serif for UI elements that should recede: navigation, labels, buttons, metadata. It supports the brand rather than expressing it.

| Token | Font | Size | Weight | Line height | Applies to |
|---|---|---|---|---|---|
| `heading-lg` | Cormorant Infant | 28px | 400 | 1.2 | H1, H2 |
| `heading-sm` | Cormorant Infant | 22px | 400 | 1.2 | H3 |
| `body-lg` | Cardo | 20px | 400 | 1.6 | Product names, lead-ins |
| `body-md` | Cardo | 15px | 400 | 1.6 | Body, descriptions, prices |
| `label-lg` | Manrope | 13px | 600 | — | Nav, buttons |
| `label-sm` | Manrope | 11px | 500 | — | Eyebrows, labels, meta |

Token names describe the style; the Applies-to column and the prose describe where each is used. H1 and H2 share `heading-lg` — hierarchy between them comes from position and spacing, not scale. H3 (`heading-sm`) stays smaller because it sits directly beneath H2, where the contrast is needed.

The eyebrow — the short line above a heading — is a usage of `label-sm`, not a separate size. It renders uppercase and letter-spaced; the same token covers metadata and captions. Likewise, product names use `body-lg` and prices use `body-md` — they share the editorial Cardo styles rather than owning dedicated tokens.

## Layout

Layouts are image-led. Full-bleed photography drives the editorial feel; spacing exists to protect imagery and maintain visual hierarchy — not to create it.

Hero images fill the full viewport (100vw × 100vh). Product card images use a 3:4 portrait ratio and cover their container without cropping interference. No image should be constrained by surrounding UI elements.

### Container

Two named containers frame text and content within consistent widths. Hero, lookbook, and image-led sections bypass these and go full-bleed.

**Breakpoints** (Tailwind defaults):

| Token | Min viewport |
|---|---|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

**Containers:**

- **Display** — 1600px max-width, 8px horizontal padding. Used for product grids, lookbook layouts, and any image-led content.
- **Prose** — 800px max-width, 16px horizontal padding. Used for long-form text pages: /about, /size-guide, /shipping-returns, /corset-quality, /womenswear-quality.

Padding is the minimum gutter when the viewport is narrower than the container's max-width. On larger viewports, the container centers within the available space.

Full-bleed sections (hero, dedicated lookbook galleries) bypass both containers and use the full viewport width.

### Spacing scale

| Token | Value |
|---|---|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 40px |
| 2xl | 64px |
| 3xl | 96px |

Use xl–3xl for section-level separation. Use md–lg for component-level padding. Use xs–sm for internal element spacing.

## Elevation & Depth

The store is mostly flat. Depth is created through background colour contrast (white vs background-alt) and image scale — not through heavy shadows.

Subtle shadows appear only on product cards and right-side drawers. Use `0 2px 8px rgba(0,0,0,0.06)` for cards and `0 0 24px rgba(0,0,0,0.08)` for drawers. No shadows elsewhere.

## Shapes

All rounded elements use a single corner radius: 5px. Apply it consistently across buttons, cards, and inputs.

Never mix rounded and sharp corners in the same view. Elements with no natural need for rounding — drawers, full-bleed sections, image containers — stay sharp.

## Iconography

The icon language is thin-line and geometric, with consistent stroke weight that complements the editorial typography. Icons are functional and quiet — they support the interface without competing with photography or text.

**Library:** `lucide-react`. Do not mix icon libraries. Custom SVGs only by explicit request.

**Defaults:**

- Size: 20px
- Stroke width: 1.5
- Color: `{colors.icon-static}` for non-interactive icons, `{colors.text}` for interactive icons

## Components

**Primary Button** — Primary background (`#A99D94`), white text, `label-lg` (Manrope 13px/600), 5px radius, 12px × 24px padding. Used for Add to Cart, Checkout, and primary CTAs.

**Right-Side Drawer** — Used for Size Chart, Shipping & Returns, and Cart. Sharp corners (no radius). Subtle shadow on the leading edge (`0 0 24px rgba(0,0,0,0.08)`). Background white. All three drawers share an identical container style.

**Product Card** — Subtle shadow (`0 2px 8px rgba(0,0,0,0.06)`). 3:4 image aspect ratio, `object-fit: cover`. Product name in `body-lg`, price in `body-md` below it, colour names in `label-sm` as supporting text.

**Hero** — Full-bleed, full-viewport (100vw × 100vh). Image covers with `object-position: center`. Overlay text, if any, uses `heading-lg`. No UI elements should compete with the hero image.

**Announcement Bar** — Background-alt fill, `label-sm` (Manrope 11px/500), centred text. Sits above the header.

## Motion

Motion is restrained and brand-led. It makes transitions feel considered, never to entertain or draw attention to itself. Movement reads as unhurried and confident, in keeping with the editorial tone. Nothing bounces, springs, or overshoots.

### Duration

| Token | Value | Use |
|---|---|---|
| fast | 200ms | Hover states — colour and opacity shifts |
| base | 300ms | Fades, dropdowns, drawer content |
| slow | 500ms | Drawer slide-in, hero and section reveals |

### Easing

- **Standard** `cubic-bezier(0, 0, 0.2, 1)` — the default. Entrances and most transitions decelerate into place.
- **Emphasized** `cubic-bezier(0.4, 0, 0.2, 1)` — elements that both enter and exit, such as the right-side drawer.

### Hover behaviour

- **Interactive text** (navigation, links) — colour shifts to primary with an underline reveal. Never scale text.
- **Primary buttons** — background darkens one step on the primary shade.
- **Product card images** — a slow scale from 1.0 to 1.03 within a fixed, clipped frame. This is the only place scale is used.

### Constraints

- Honour `prefers-reduced-motion`: disable non-essential transitions.
- No motion competes with photography. Hero and lookbook imagery animate only on deliberate reveal, never on hover.
- No spring, bounce, or elastic easing anywhere.

## Do's and Don'ts

- Let images fill their containers at full size. An image that is cropped, padded, or constrained by UI chrome undermines the editorial direction.
- Use consistent 5px corner radius on all rounded elements.
- Use spacing to frame and protect content — not as a standalone signal of quality.
- Keep the palette closed. The five defined colours are sufficient for every surface.
- Use Manrope for all UI chrome. Cormorant Infant and Cardo should never appear in buttons, navigation, or labels.
- Don't mix rounded and sharp corners in the same view.
- Don't introduce new typefaces or font weights outside the defined scale.
- Don't use shadows outside of product cards and drawers.
