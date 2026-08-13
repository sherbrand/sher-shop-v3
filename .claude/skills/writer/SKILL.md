---
name: writer
description: Write page content from the Planning TSV. Takes each page's outline notation, keeps its layout structure, writes the copy and alt text for images into bullets under each section, and tags each with a screen-qualified Section ID. Outputs one Content MD file per page.
---

# Writer

Turn a page's outline in the Planning TSV into a Content MD file: the layout kept as notation, with the copy written into bullets beneath each section.

## Run in Chat

With no CLAUDE.md, hand your work back in chat: read the inputs that are here, ask for any required one that's missing, then give back every new file and edit, and say which file each belongs in.

## Inputs

- The page(s) — named in the request, or ask which to write (one or several).
- The Planning TSV (path in CLAUDE.md) — the assigned rows. The `id` column holds the page's screen ID (`S-007`); the `outline` column holds the page outline; `type`, `seo_keyword`, `seo_role`, and `seo_parent` set which rules and keyword placement apply.
- Outline Notation (path in CLAUDE.md) — the notation and its content slots.
- The brand doc (path in CLAUDE.md) — brand voice and key terms; the voice the copy is written in.
- [Optional] The writing rules (path in CLAUDE.md) — voice, SEO, GEO, and banned phrases; the standards the copy must follow.
- [Optional] The knowledge file (path in CLAUDE.md) — the facts for the page: company, contact, orders, and product.

## Workflow

### 1. Write

Read the assigned rows from the Planning TSV. Keep the layout structure — operators, brackets, targets, and elements — and write each page per Outline Notation and Output.

**General & Sectioning.**
- Give each top-level section a screen-qualified Section ID at the front of its notation line — `<screen_id>.<n>:`, numbered top to bottom from 1 (see Output). A container's items (an Accordion's questions, a column group's cards) stay inline on the section's line and take no ID of their own; `.n`/`#n` keys them instead.
- A section with nothing to write, only bare structure like an element fed whole from a source (a Hero Carousel, a Product Grid), gets its notation line and nothing beneath.

**Text slots.**
- Move each slot's copy to a bullet; the slot in the line becomes its bare role (`H2`, `Subtitle`). Keep `< >` in the line — it marks a target, a data-fed source, or an element build-note.
- When a text role repeats on the same line, key each `.n` in the line and on its bullet, left to right (`H3.1`, `H3.2`). A text role that appears once takes none.
- Write to a `< >` brief. It says what to write, not the words themselves. Write it fresh; don't reword the brief. Only quoted literal copy and headings are echoed as-is. A loose brief is room to write. Take the feeling from the brand doc and fill it out.
- Write in the brand voice and follow the writing rules; the row's `type` selects which apply.
- Treat the row's `seo_keyword` as the target keyword and place it per the writing rules; with no `seo_keyword`, write with no keyword target.

**Asset slots.**
- Give each asset slot an alt bullet: what it should show, written for SEO and GEO as per the writing rules. List these after the section's copy bullets.
- Key each asset slot `#n` in the line and on its bullet (`#1`, `#2`), from 1 across the section's assets, images and videos together, always.

**Data-fed slots.**
- A data-fed slot gets a bullet holding a sample, wrapped in `{ }` (per Outline Notation) — a product name, a description, a product photo's alt. The design renders the sample; real data replaces it.
- A data-fed element gets none. The build assembles it, so there is no single text to sample.

**Template pages.**
- A page whose `url` carries a dynamic segment (`/products/[product-slug]`) is one Content MD, not many. Keep the `url` exactly as the plan has it, dynamic segment included.
- Keep every `{ }` the plan's outline carries.
- Write the frontmatter `title` and `description` with the field name in `{ }` — `title: "{product name} | SHER"`. No notation line sits above them to name the source.
- Keep both fields in quotes. An unquoted value that starts with `{` breaks the YAML.

### 2. Save

Save the Content MD file to content/ (path in CLAUDE.md). Name it `<screen_id>_<title>` from the planning row, all lowercase with spaces hyphenated — e.g. `s-001_home`, `s-010_about-us`. If it already exists, see On a Rerun.

### 3. Report

Report in chat every fact you invented: any fact in the copy that is not in the knowledge file. Group by page so the human can confirm or replace each one.

Report each template page's `{ }` variables and where each value comes from. Where a `{ }` sits in the H1, say that each value is its own page while the row carries one `seo_keyword`.

## Output

One Content MD per page: frontmatter, then a backticked notation line per top-level section, each with its Section ID and its copy in bullets beneath.

A written page:

```
---
title: "Corset Tops: Built by Hand for the Modern Woman"
description: "Corset tops by SHER, built on real corsetry with each bone set by hand. Choose Lace Closure for an adjustable fit or Zip Closure for effortless wear."
url: /corset-tops
---

`S-003.1: Breadcrumb <Shop › Corset Tops> / H1 / Subtitle / Button Pills <filter by closure type>`
- H1: Shop Corset Tops
- Subtitle: Shop corset tops built on real corsetry, in two closures. Pick Lace Closure for an adjustable fit, or Zip Closure for the easiest way in and out.

`S-003.2: View Toggle <grid columns> / Product Grid <1 col mobile, 2 col desktop> / Btn`
- Btn: Load More

`S-003.3: Image#1 | (Eyebrow / H2 / Paragraph)`
- Eyebrow: What is a Corset Top?
- H2: Structured Boning That Commands the Silhouette
- Paragraph: A corset top is a fitted top built on corsetry. Thin bones run through the fabric to shape the waist and support the bust.
- Image#1: A SHER corset top on a model, showing its shaped waist and structured bust.

`S-003.4: (Eyebrow / H2 / Paragraph) | Image#1`
- Eyebrow: Pick your Corset Closure Type
- H2: Each Corset Closure Designed for a Different Priority
- Paragraph: The Lace Closure laces up the back through metal eyelets. The Zip Closure uses a separating zip.
- Image#1: A SHER corset top shown from both sides, with back lacing on one and a separating zip on the other.

`S-003.6: H2 | Accordion [H3.1 / Paragraph.1 / H3.2 / Paragraph.2]`
- H2: Frequently Asked Questions
- H3.1: How do I measure for a corset top?
- Paragraph.1: Measure your bust, waist, hip, and length. Bust matters most on a corset top, so get that one right.
- H3.2: How should a corset top fit?
- Paragraph.2: It should feel firm but never painful. The top edge sits flat against your chest with no gap.
```

Data-fed slots and no-copy sections:

```
`S-001.1: Hero Carousel <featured banners>`

`S-001.4: H2 / (Image Link#1 <to product> [Title.1 <product name>] | Image Link#2 <to product> [Title.2 <product name>])`
- H2: Featured Products
- Title.1: {Silk Lace Corset Top}
- Title.2: {Satin Trouser Set}
- Image Link#1: {a silk lace corset top on a model, front view}
- Image Link#2: {a satin trouser set on a model, full length}
```

A template page:

```
---
title: "{product name} | SHER"
description: "Shop the {product name} by SHER. Built on real corsetry, with every bone set by hand."
url: /products/[product-slug]
---

`S-006.1: Media Gallery <thumbnail strip + main image; fixed order: video then images> | (Breadcrumb <Shop › {Category} (to /{category}) › product> / Title <product name> / Price / Size Selector <available sizes> / (Quantity Selector + Btn.1 + Btn.2) / (Paragraph <product description> + Type Attribute <closure type for corsets, set type for matching sets, length for cocktail dresses>) / (Link.1 <opens C-Sizing> + Link.2 <opens C-Shipping>))`
- Title: {Silk Lace Corset Top}
- Btn.1: Add to Cart
- Btn.2: Buy Now
- Paragraph: {A corset top built on real corsetry. Thin bones run through the fabric to shape the waist and hold the bust, each one set by hand on a mannequin so it follows the curve of a real body.}
- Link.1: View Size Chart
- Link.2: Shipping & Returns

`S-006.2: H2 / Subtitle / Btn <to /{category}> | Product Grid <2 random products>`
- H2: You May Also Like
- Subtitle: See the full {category} range, each piece built the same way.
- Btn: Back to {Category}
```

## On a Rerun

Follow the `Replace` rule in CLAUDE.md, grouping the original under `content/`. Then say which one you'd keep and why, and ask which to use as the base. If it's the original, swap them back. Either way, merge in the better parts of the other, one listed change at a time.

## Stop Conditions

Stop and report instead of guessing when:

- A required input is missing.
- An assigned page has no outline to write from (the `outline` cell is empty).
- The assigned page's `id` is empty — Section IDs are screen-qualified, so report and ask for one to be assigned first.
- A `Pillar` page has no `seo_keyword` — Pillars must target one. Report and ask for it to be added.
