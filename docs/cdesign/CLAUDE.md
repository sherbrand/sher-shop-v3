# SHER Design System — standing rules

These rules apply to every future change in this project.

## Component naming
Every component name must work as a code identifier: start with a letter, use letters and digits only — no spaces, dashes, punctuation, or symbols — and be unique across the whole system. The gallery card **label** may stay decorative (dashes and parentheses are fine there), but the component name itself may not.

## Two-folder component layout
Put every component in exactly two folders:
- `components/module/` — Module Components (small, self-contained primitives).
- `components/layout/` — Layout Components (full-width page bands, chrome, and overlays).

Never use semantic subfolders. All component files (`.jsx`, `.d.ts`, `.prompt.md`, card `.html`) live directly inside one of these two folders.

## Pages must carry a @dsCard tag
Every Page (standalone rendered HTML that isn't a component card or a foundation card) must have a `@dsCard` tag so it appears in the Design System tab, in the **Pages** group — except `thumbnail.html`, which stays untagged.

## DESIGN.md is regenerated every export
Every export regenerates `DESIGN.md` at the project root in the DESIGN.md format (YAML front matter with only these token groups — colors, typography, rounded, spacing, components; component keys limited to backgroundColor, textColor, typography, rounded, padding, size, height, width; token refs as `{path.to.token}`; every value matching `tokens/*.css` exactly; prose sections in this exact order — Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts, with shadow guidance under Elevation & Depth and motion guidance under Layout). Keep `readme.md` byte-identical to `DESIGN.md` so the system renders in the Design System interface. No brand voice, audience, or imagery direction in either file.

## Variations are props, not new components
For a variation of a component that changes only its optional content or layout (with or without a title, zero to two buttons, a left/right mirror), it belongs as a prop on that component — never a duplicate component or one-off page markup. But while we're still exploring a direction, do not add the prop yet: prototype the variation inline on the page, and ask me before touching the shared component. Only once I confirm the variation should be kept do you formalize it as a prop. A prop is not "done" until it is (1) typed in the component's .d.ts, (2) described in its .prompt.md, (3) reflected in DESIGN.md, and (4) demonstrated as a visible state/variant in that component's @dsCard card, and (5) summarized in that card's subtitle as (propName = value1, value2 | propName2 = …). When a prop is removed, strip it from all five in the same pass. A genuinely different shape is its own component.

## Everything comes from tokens and existing components
Every visual value must come from a design-system token, and every UI element from an existing system component — never hardcode a raw value (color, size, space, radius, shadow, timing, tracking) or rebuild a component in page markup. Prefer stepped sizes over fluid `clamp`, drive responsive changes with container queries at the system breakpoints (never viewport units), and if a needed token is missing, add and document it in the system first, then reference it. Never measure width in JavaScript, and never take a breakpoint as a prop. Genuinely non-scale values (`ch` measures, `aspect-ratio`, frame widths, breakpoints) are exempt.

## Layout components are self-contained
A layout component must be self-contained: everything that sets how it looks and how it responds (including its column counts, breakpoint behavior, and content and text max-widths) lives inside the component, driven by CSS container queries on its own width. A page may only place the component (outer margins, a background band) and pass props. If a placement needs a different value, expose it as a prop or a documented CSS custom property with a sensible default — never `!important` over the component's inline styles. Staging is exempt: explore freely there, and turn any override into a prop or custom property when you promote to Main.

## Reference group is regenerated every export
Every export regenerates the `8. Reference` group and its two cards, so the inputs and rules stay in sync with the project:
- `guidelines/sources.card.html` — a scannable manifest (not a reader) of every file in `uploads/`, grouped by kind, each filename linked to open it and MDs showing their front-matter `title`.
- `guidelines/rules.card.html` — the standing rules from the root `CLAUDE.md`, each `##` heading with its body in file order, linking to `CLAUDE.md` at the top. Numbered lists must render as `<ol>` with digits intact, since some are literal API.

Both are `viewport="1600x900"`, full-width, body scrollable (`overflow-y: auto`), two columns max.

## Root font size is a percentage
The root font size in `tokens/base.css` must be a percentage, never a fixed pixel value. A pixel value overrides the reader's own browser font size setting. A percentage renders the same for a reader on the standard 16px default, and still scales for a reader who changed it.

## Design System tab group order
Groups use numeric prefixes to control order. Keep this ordering, with Module Components fourth-last, Layout Components third-last, Pages second-last, and Reference last:
1. Brand
2. Colors
3. Type
4. Spacing
5. Module Components
6. Layout Components
7. Pages
8. Reference
