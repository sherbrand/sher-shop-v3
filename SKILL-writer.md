---
name: writer
description: Write page content from the Planning TSV. Takes each page's outline notation, keeps its layout structure, writes the copy and alt text for images into bullets under each section, and tags each with a screen-qualified Section ID. Outputs one Content MD file per page.
---

# Writer

Turn a page's outline in the Planning TSV into a Content MD file: the layout kept as notation, with the copy written into bullets beneath each section.

## Running it

Check CLAUDE.md first. If there's no CLAUDE.md at all, hand your work back in chat: read the inputs that are here, ask for the ones that aren't, then give back every new file and edit — and say which file each belongs in. Otherwise follow CLAUDE.md for where outputs go — read the inputs, save new outputs where it says, and change existing files in place.

## Inputs

- The page(s) — named in the request, or ask which to write (one or several).
- The Planning TSV (path in CLAUDE.md) — the assigned rows. The `outline` column holds the page outline; `type`, `seo_keyword`, `seo_role`, and `seo_parent` set which rules and keyword placement apply.
- outline-notation.md (path in CLAUDE.md) — the notation and its content slots.
- The brand doc (path in CLAUDE.md) — brand voice and key terms; the voice the copy is written in.
- The writing rules (path in CLAUDE.md) — voice, SEO, GEO, and banned phrases; the standards the copy must follow.

## Workflow

Work straight through; the page is the only thing to ask about.

### 1. Write

Read the assigned rows from the Planning TSV. Keep the layout structure (operators, brackets, targets, and elements) but strip each text slot to a bare role marker and write its copy into a bullet beneath the line (per outline-notation.md and Output).

**General & Sectioning.**
- Give each top-level section a screen-qualified Section ID at the front of its notation line — `<screen_id>.<n>:`, numbered top to bottom from 1 (see Output). A container's items (an Accordion's questions, a column group's cards) stay inline on the section's line and take no ID of their own; `.n`/`#n` keys them instead.
- A section with nothing to write, only bare structure like an element fed whole from a source (a Hero Carousel, a Product Grid), gets its notation line and nothing beneath.
- A data-fed slot is one whose content comes from a source — flagged `<D-xxx: …>`/`<F-xxx: …>`, or plainly a data value. A computed or system value (a price, a cart total, a quantity) and an element fed whole (a Hero Carousel, a Product Grid) get no bullet.

**Text slots.**
- Move each slot's copy to a bullet; the slot in the line becomes its bare role (`H2`, `Subtitle`). Keep `< >` in the line — it marks a target, a data-fed source (`<D-xxx: …>` / `<F-xxx: …>`), or an element build-note.
- If it's data-fed *copy* (a product name, a banner headline), give it a placeholder bullet: realistic sample text, so the page still renders in design; the source stays the truth.
- When a text role repeats on the same line, key each `.n` in the line and on its bullet, left to right (`H3.1`, `H3.2`). A text role that appears once takes none.
- Write to a `< >` brief. It says what to write, not the words themselves. Write it fresh; don't reword the brief. Only quoted literal copy and headings are echoed as-is.
- Write in the brand voice and follow the writing rules; the row's `type` selects which apply.
- Treat the row's `seo_keyword` as the target keyword and place it per the writing rules; with no `seo_keyword`, write with no keyword target.

**Asset slots.**
- Give each asset slot (`Image`, `Video`) an alt bullet: what it should show, written for SEO and GEO as per the writing rules. List these after the section's copy bullets.
- A data-fed image (a product photo, or a config-fed banner or tile) gets no bullet; its source owns the alt.
- Key each asset slot that gets a bullet `#n` in the line and on its bullet (`#1`, `#2`), from 1 across the section's assets, images and videos together, always.

### 2. Save

Save the Content MD file to the content directory (path in CLAUDE.md). Name it `<screen_id>_<title>` from the planning row, all lowercase with spaces hyphenated — e.g. `s-001_home`, `s-010_about-us`. If that name already exists, add a number to the end (`-2`, `-3`, …) instead of overwriting.

## Output

A Markdown file (`.md`): frontmatter, then each top-level section's notation line, prefixed with its Section ID, wrapped in backticks, its text slots reduced to bare role markers (`.n` when a text role repeats; asset slots keyed `#n`), with each slot's copy written as a bullet beneath. A container's items stay inline on the line; their `.n`/`#n` keys them to their bullets.

```
---
title: "[the page's H1 if it has one, else an SEO title 50–60 chars]"
description: "[meta description, 150–160 chars]"
url: [page url from the plan]
---

`S-007.1: H1 / Subtitle / Btn <to /shop/corset-tops>`
- H1: Corset Tops: Built by Hand for the Modern Woman
- Subtitle: <copy>
- Btn: <copy>

`S-007.2: (Eyebrow / H2 / Paragraph) | Image#1`
- Eyebrow: What is a Corset Top?
- H2: Structured Boning That Commands the Silhouette
- Paragraph: <copy>
- Image#1: <what it should show>

`S-007.3: Image#1 | (Eyebrow / H2 / Paragraph)`
- Eyebrow: How is SHER different?
- H2: Each Bone Set by Hand, Not by Machine
- Paragraph: <copy>
- Image#1: <what it should show>

`S-007.4: Eyebrow / H2 / (Image#1 [H3.1 / Paragraph.1] | Image#2 [H3.2 / Paragraph.2])`
- Eyebrow: Pick your Corset Closure Type
- H2: Each Corset Closure Designed for a Different Priority
- H3.1: Lace Closure: Adjustable Fit
- Paragraph.1: <copy>
- H3.2: Zip Closure: Effortless to Wear
- Paragraph.2: <copy>
- Image#1: <what it should show>
- Image#2: <what it should show>

`S-007.5: Image#1 | (Eyebrow / H2 / Paragraph)`
- Eyebrow: Quality from Inside Out
- H2: Built with High Quality Fabrics, Materials and Craft
- Paragraph: <copy>
- Image#1: <what it should show>

`S-007.6: H2 | Accordion [H3.1 / Paragraph.1 / H3.2 / Paragraph.2 / H3.3 / Paragraph.3]`
- H2: Frequently Asked Questions
- H3.1: How do I measure for a corset top?
- Paragraph.1: <copy>
- H3.2: How should a corset top fit?
- Paragraph.2: <copy>
- H3.3: What if I am between sizes?
- Paragraph.3: <copy>
```

Data-fed slots and no-copy sections (from S-001 Home):

```
`S-001.1: Hero Carousel <F-xxx: featured banners>`

`S-001.4: H2 / (Image Link <to product> [Title.1 <D-xxx: product name>] | Image Link <to product> [Title.2 <D-xxx: product name>])`
- H2: Featured Products
- Title.1: Silk Lace Corset Top
- Title.2: Satin Trouser Set
```

## Stop conditions

Stop and report instead of guessing when:

- An assigned page has no outline to write from (the `outline` cell is empty).
- The page is a template, not a single page — its `outline` carries a `{}` variable (e.g. `{Color}`) or its `url` carries a dynamic segment (e.g. `[facet-color]`). Report and ask for it to be split into concrete rows in the plan first.
- The assigned page has no `screen_id` — Section IDs are screen-qualified, so report and ask for one to be assigned first.
- The outline is an inheritance reference, not notation — it begins with `(same as` (e.g. localized `/en-[country]/` mirrors). Report the page it inherits from.
- A `Pillar` page has no `seo_keyword` — Pillars must target one. Report and ask for it to be added.
- The Planning TSV is missing.
