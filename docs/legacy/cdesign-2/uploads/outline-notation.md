# Outline Notation

The grammar for writing a page or component outline. Markers set the structure, slots hold the content, elements name the UI pieces, and `{ }` marks what a source fills in. The same notation works in the Planning TSV and in a Content MD; where the two differ, the rule says so.

## Markers

A marker is a symbol that carries meaning, not content.

### Operators

| Symbol | Meaning |
|---|---|
| `/` | stack, small gap |
| `//` | stack, big gap — between page sections, or between big blocks in a component |
| `+` | row, tight |
| `\|` | row, big gap |

**Mixing operators.** One operator can repeat in a row. To mix different operators, group them with `( )` — and use `( )` for nothing else. A single-operator run needs none.

### Wrappers

| Symbol | Meaning |
|---|---|
| `"…"` | literal copy, written as-is; the role can sit inside |
| `( )` | group; like math parentheses, it sets the order |
| `< >` | one note about the word before it — a link target, a size, or a content brief; the word before it is the nearest slot, asset, or element on its left |
| `[ ]` | the literal contents of the slot or element before it — copy laid over an asset, or items held within a container |
| `{ }` | a variable (see Data-fed) |

**Mixing quoted text.** A role prefix names the slot it fills: `"H1: Shop Modern Womenswear"`. With no prefix it is a bare label: `"Shop & Learn"`.

**Unquoted text is a brief.** Anything unquoted that is not an operator, a wrapper, a slot, or an element. A brief holds the subject, plus any fact the copy must contain, and can be as loose as a mood to hit. Read it and write to it.

## Slots

A slot holds one piece of content.

### Text slots

| Slot | Meaning |
|---|---|
| `Eyebrow` | short kicker above a heading |
| `H1` `H2` `H3` | a heading; keep the level, it carries SEO weight |
| `Title` | short title with no fixed heading level |
| `Subtitle` | short body text |
| `Paragraph` | longer body text; can run to several paragraphs |
| `Btn` | button |
| `Link` | text link |

**Copy in the Planning TSV.** A text slot carries its copy inline: a literal in quotes, or a `< >` brief.

**Copy in a Content MD.** The slot shows its role name only, and its copy sits in a bullet beneath the line. `< >` stays in the line; it marks a target, a data-fed source, or a build-note, never copy.

**Numbering in a Content MD.** When a text role repeats on a line, key each `.n` in the line and its bullet, left to right (`H3.1`, `H3.2`); a text role that appears once takes none.

### Asset slots

| Slot | Meaning |
|---|---|
| `Image` | an image asset |
| `Image Link` | an image that links; the `< >` brief is its target |
| `Video` | a video asset |

**Brief/Alt in the Planning TSV.** An asset slot may carry a `< >` brief or alt for the asset, or skip it.

**Brief/Alt in a Content MD.** The brief or alt sits in a bullet beneath the line.

**Numbering in a Content MD.** Key every asset slot `#n` in the line and its bullet (`#1`, `#2`), from 1 across the section's assets, images and videos together, always.

## Elements

A named UI piece the build assembles, written as a bare noun. The list below is not complete — any named UI piece works; use the common name for it.

| Element | Meaning |
|---|---|
| `Hero Carousel` | sliding banners at the top of a page |
| `Media Gallery` | a main image with a thumbnail strip |
| `Product Grid` | a grid of product cards |
| `Accordion` | stacked items that open one at a time |
| `Button Pills` | a row of pill links or filters |
| `View Toggle` | switches how many columns a grid shows |
| `Breadcrumb` | the trail of parent pages |
| `Size Selector` | picks a size |
| `Price` | a formatted money amount |
| `Subtotal` | the cart's running total |

**Element brief.** An element carries a `< >` brief when there is something to say — its content, target, behavior, or variant — or `[ ]` contents. Where the name says it all, like `Price` or `Subtotal`, it needs none. This often pairs with the `functionality` column when applicable.

## Data-fed

Content that comes from a source when the page renders. `{ }` marks it. It works in a notation line, in a copy bullet, and in frontmatter.

**One value inside written copy.** `{ }` holds the field name instead of a sample: `"Btn: Back to {Category}"` gives "Back to Corset Tops".

**In a Content MD:**

- **Data-fed slot.** Its bullet holds a `{ }` sample: `Title.1: {Silk Lace Corset Top}`, `Image Link#1: {a corset top on a model, front view}`.
- **Data-fed element.** No bullet. The build assembles it, so there is no single text to sample.

## Examples

`"Eyebrow: Refined Sensuality" / "H1: Corset Tops & Matching Sets by SHER"`

A kicker stacked over a heading. Both are literal copy, so both sit in quotes with the role inside. `/` stacks them. No label is needed — the quotes name each slot.

`Image ["H2: Shop Corset Tops" / Btn <to /corset-tops>] | Image ["H2: Shop Matching Sets" / Btn <to /matching-sets>]`

Two image cards side by side (`|`). Each `[ ]` holds what sits on the image: the heading, then a button. The button's `< >` gives its link target. To also say what the photo is, add a second bracket — `Image <corset on model> ["H2: Shop Corset Tops" / Btn <to /corset-tops>]`. `< >` describes the photo; `[ ]` lays content on it.

`Image | ("H2: About our Corset Tops" / Paragraph <handcraft piece by piece> / Paragraph <attention to details> / Paragraph <can tell quality from afar> / Btn <to /corset-tops>)`

An image beside a stack of text. Each `Paragraph` carries a `< >` brief saying what to write. The row uses `|` and the stack uses `/`, two different operators, so the stack is grouped in `( )`. The row itself needs none, since it runs one operator.

`Line Items <image, name, options, qty stepper, price, remove> // Subtotal // "Btn: Checkout"`

A cart drawer — a component outline. `//` sets a big break between each block. `"Btn: Checkout"` is a quoted literal, so it renders as-is, while `Line Items <…>` has an unquoted brief in `< >`, describing what to build. `Subtotal` needs no brief; its name says it all.

`("H2: You May Also Like" / Subtitle <see the full category> / "Btn: Back to {Category}" <to /{category}>) | Product Grid <2 random products>`

A related block on a template page. `{Category}` and `{category}` are field names data fills in when the page renders — one inside quoted copy, one inside a link target. `Product Grid` is an element, so its `< >` says what to build and it gets no copy.
