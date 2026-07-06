# Outline Notation

## Rules

- **Quoted vs unquoted.** `"…"` is literal copy — write it as-is. The role can sit inside the quotes: `"H1: …"`, `"Eyebrow: …"`. Anything not in quotes is structure.
- **Interpret rule.** An unquoted word that is not an operator, a bracket, a slot, or an element is a brief. Read it and write to it.
- **`< >` qualifies the word before it.** `< >` adds one note about the word right before it — a link target, a size, or a content brief. "The word before it" means the nearest slot, asset, or element on its left.
- **Mixing.** One operator can repeat in a row. To mix different operators, group them with `( )` — and use `( )` for nothing else. A single-operator run needs none.
- **Condition scope.** A `{condition}` gates its enclosing `( )` group.
- **No bare text slot.** Every text slot needs literal copy or a `< >` brief. Asset slots may skip the brief.
- **No bare element.** Every element carries a `< >` brief — its content, target, behavior, or variant — or `[ ]` contents. This often pairs with the `functionality` column when applicable.

## Markers

### Operators

| Symbol | Meaning |
|---|---|
| `/` | stack, small gap |
| `//` | stack, big gap — between page sections, or between big blocks in a component |
| `+` | row, tight |
| `\|` | row, big gap |

### Brackets

| Symbol | Meaning |
|---|---|
| `( )` | group; like math parentheses, it sets the order |
| `< >` | qualify the word before it (see Rules) |
| `[ ]` | the element's literal contents — a button's label, copy laid over an asset, or items held within a container |
| `{ }` | variable or condition (e.g. `{Color}`, `{Corsets only}`) |

### Copy

| Marker | Meaning |
|---|---|
| `"…"` | literal copy, written as-is; the role can sit inside |
| `H1:` `H2:` `H3:` | keep the level — it carries SEO weight |

## Slots & elements

### Text slots

| Slot | Meaning |
|---|---|
| `Eyebrow` | short kicker above a heading |
| `Title` | short section title |
| `Subtitle` | 1–3 sentences |
| `Paragraph` | 4+ sentences, or 50+ words |
| `Btn` | button |

### Asset slots

| Slot | Meaning |
|---|---|
| `Image` | an image asset |
| `Image Link` | an image that links; the `< >` brief is its target |
| `Video` | a video asset |

### Elements

A named UI piece, written as a bare noun — `Hero Carousel`, `Accordion`, `Button Pills`, `Product Grid`, `Link`. See Rules for its brief.

## Examples

`"Eyebrow: Refined Sensuality" / "H1: Corset Tops & Matching Sets by SHER"`

A kicker stacked over a heading. Both are literal copy, so both sit in quotes with the role inside. `/` stacks them. No label is needed — the quotes name each slot.

`Image ["H2: Shop Corset Tops" / Btn <to /corset-tops>] | Image ["H2: Shop Matching Sets" / Btn <to /shop/matching-sets>]`

Two image cards side by side (`|`). Each `[ ]` holds what sits on the image: the heading, then a button. The button's `< >` gives its link target. To also say what the photo is, add a second bracket — `Image <corset on model> ["H2: Shop Corset Tops" / Btn <to /corset-tops>]`. `< >` describes the photo; `[ ]` lays content on it.

`(Image | ("H2: About our Corset Tops" / Paragraph <handcraft piece by piece> / Paragraph <attention to details> / Paragraph <can tell quality from afar> / Btn <to /corset-tops>))`

An image beside a stack of text. Each `Paragraph` carries a `< >` brief, so no text slot is bare. The row uses `|` and the stack uses `/` — two different operators — so each side is wrapped in `( )`.

`Line Items <image, name, options, qty stepper, price, remove> // Subtotal // Btn ["Checkout"]`

A cart drawer — a component outline. `//` sets a big break between each block. `Btn ["Checkout"]` holds its label in `[ ]` (the button's contents), so it renders as-is, while `Line Items <…>` has an unquoted brief in `< >`, describing what to build.
