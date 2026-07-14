---
type: style-reference
brand: `[Brand Name]`
---

# Visual Style

This is the confirmed visual style that seeds the design system and its components. Pairs with the brand file — read both. It owns voice, positioning, and audience. For each section, and each part within a line: fill it, or write **None yet.** (still open — decide in real designs).

## 1. Look & Feel
Concept — the aesthetic in one sentence ("warm editorial, photography-led"). Personality and Resemblance are copied from the brand file; it is the source of truth.
- concept: `[one sentence on the aesthetic]`
- personality: `[3–5 adjectives]`
- resemblance: `[a brand or person, and why]`

## 2. Color
One line per color: name, role ("base background", "body text", "interactive accent"), and hex. Name the set and never go outside it. Some are required; others optional ("white", "dark", "muted").

Required — always in the palette:
- background (base background): `[#hex]`
- surface (secondary background): `[#hex]`
- text (body text): `[#hex]`
- primary (interactive accent): `[#hex]`

Optional — add each only if the design uses it:
- `[name (role, if any)]`: `[#hex]`

Approved pairs — which text sits on which background and passes WCAG AA ("text on background", "white on dark").
- `[name on name]`

## 3. Typography
One line per role: name, use, typeface ("Georgia"), case ("Title Case", otherwise "Sentence case"), letter-spacing ("0.04em"), and size ("16/24/32/48px"). Some are required; others optional ("H3-H6", "title", "label", "nav", "buttons").

Required — always defined:
- display (H1-H2): `[Typeface]` (`[case; letter-spacing; size]`)
- body (prose): `[Typeface]` (`[size]`)

Optional — add each only if the design uses it:
- `[name (use)]`: `[Typeface]` (`[case; size]`)

## 4. Logo
One line per variation ("wordmark", "monogram") with its colors, then the clear space ("one cap-height") and misuses to ban ("never stretch or recolour").

Variations:
- `[variation (description)]`: `[colors]`

Clear space:
- `[...]`

Don'ts:
- `[...]`

## 5. Imagery
What the photos show and how they look — location ("studio, city street"), palette ("earth tones"), and lighting ("golden hour").
- location: `[...]`
- palette: `[...]`
- lighting: `[...]`

## 6. Iconography
The icon library ("Lucide"), fill ("line"), stroke ("1.5px"), and corners ("rounded").
- library: `[...]`

- fill: `[...]`
- stroke: `[...]`
- corners: `[...]`

## 7. Layout & Grid
Breakpoints in px ("640 / 768 / 1024"), container widths + padding ("content — 1200 / 24"), and the spacing rhythm ("generous, 4px base").
- breakpoints: `[list in px]`
- containers: `[name — max-width / padding]`
- spacing rhythm: `[tight/generous; base unit]`

## 8. Shape & Depth
Corner-radius character ("small / 4px"), flat vs layered ("flat"), and shadow philosophy ("depth from tone, not shadow").
- radius: `[...]`
- layering: `[flat / layered]`
- shadow: `[...]`

## 9. Motion
Speed ("quick"), easing ("ease-out"), and motion to ban ("no bounce or overshoot").
- speed: `[...]`
- easing: `[...]`
- avoid: `[...]`

## 10. Do's & Don'ts
Approved moves to encourage ("full-bleed imagery"), and anti-patterns to ban, including generic-AI tells ("no gradients", "no drop shadows").

Do's:
- `[...]`

Don'ts:
- `[...]`
