---
name: writer
description: Write page content from the Planning TSV. Takes each page's outline notation, carries the layout across unchanged, writes the copy into it, and tags each section with a screen-qualified Section ID. Outputs one Content MD file per page.
---

# Writer

Turn a page's outline in the Planning TSV into a Content MD file: the layout notation carried across unchanged, with the copy written into it.

## Running it

If you can read CLAUDE.md, you're in the repo: work from its paths — read the inputs, save new outputs, and apply this skill's changes to existing files in place. If you can't, you're in a chat: ask for the inputs this skill lists, plus the project's `CLAUDE.md` (repo rules) the repo reads by default, then hand back everything that changed — new files to save, and edits to existing files for the user to apply — and say which file each change belongs in.

## Inputs

- The page(s) — named in the request, or ask which to write (one or several).
- The Planning TSV (path in CLAUDE.md) — the assigned rows. The `outline` column holds the page outline; `type`, `seo_keyword`, `seo_role`, and `seo_parent` set which rules and keyword placement apply.
- outline-notation.md (path in CLAUDE.md) — the notation and its content slots.
- The brand doc (path in CLAUDE.md) — brand voice and key terms; the voice the copy is written in.
- The writing rules (path in CLAUDE.md) — voice, SEO, GEO, and banned phrases; the standards the copy must follow.

## Workflow

Work straight through; the page is the only thing to ask about.

### 1. Write

Read the assigned rows from the Planning TSV. Carry the outline notation across unchanged and write the copy into its text slots (per outline-notation.md). Never translate the notation into sentences, reorder it, or alter the layout markers.

- Give each top-level section a screen-qualified Section ID at the front of its notation line — `<screen_id>.<n>`, numbered top to bottom from 1 (see Output). Items nested in a container — the `>` lines under a 3-Col, Accordion, and the like — stay under their parent and take no ID.
- A section with no text slots gets its notation line and nothing beneath.
- Use `P:` text verbatim — it's copy already specified.
- Keep the H1/H2/H3 wording the outline gives; where a heading is only a placeholder, write it.
- A `Title` slot takes its governing heading — the nearest `H1`/`H2`/`H3` above it.
- An `Eyebrow` slot takes the paired `P:` text (`P: … → H2: …`).
- Under an `Accordion`, write an answer beneath each `H3` question.
- Write fresh copy for a slot only when the outline gives it nothing to echo.
- Write in the brand voice and follow the writing rules; the row's `type` selects which apply.
- Treat the row's `seo_keyword` as the target keyword and place it per the writing rules; with no `seo_keyword`, write with no keyword target.
- If the row's `seo_role` is Cluster, link to its `seo_parent`.

There is no separate review pass.

### 2. Save

Save the Content MD file to the content directory (path in CLAUDE.md). Name it `<screen_id>_<title>` from the planning row, all lowercase with spaces hyphenated — e.g. `s-001_home`, `s-010_about-us`. If that name already exists, add a number to the end (`-2`, `-3`, …) instead of overwriting.

## Output

A Markdown file (`.md`): frontmatter, then each top-level section's notation line — prefixed with its Section ID and wrapped in backticks — with the copy written into its slots as bullets beneath. Items nested in a container (the `>` lines) keep their notation line but take no ID.

```
---
title: [the page's H1 if it has one, else an SEO title 50–60 chars]
description: [meta description, 150–160 chars]
url: [page url from the plan]
---

`S-010.1 | P: About Us → H1: How our brand all began [Hero Image: Eyebrow / Title]`
- Eyebrow: About Us
- Title: How our brand all began

`S-010.2 | H2: What We Do [2-Col: Image · (Title / Paragraph)]`
- Title: What We Do
- Paragraph: <copy>

`S-010.3 | H2: How It Started [2-Col: (Title / Paragraph) · Image]`
- Title: How It Started
- Paragraph: <copy>

`S-010.4 | H2: What We Believe [Title / 3-Col]`
- Title: What We Believe

`> H3: Craft [Image / Title / Paragraph]`
- Title: Craft
- Paragraph: <copy>

`> H3: Fit [Image / Title / Paragraph]`
- Title: Fit
- Paragraph: <copy>
```

## Stop conditions

Stop and report instead of guessing when:

- An assigned page has no outline to write from (the `outline` cell is empty).
- The page is a template, not a single page — its `outline` carries a `{}` variable (e.g. `{Color}`) or its `url` carries a dynamic segment (e.g. `[facet-color]`). Report and ask for it to be split into concrete rows in the plan first.
- The assigned page has no `screen_id` — Section IDs are screen-qualified, so report and ask for one to be assigned first.
- The outline is an inheritance reference, not notation — it begins with `(same as` (e.g. localized `/en-[country]/` mirrors). Report the page it inherits from.
- A `Pillar` page has no `seo_keyword` — Pillars must target one. Report and ask for it to be added.
- The Planning TSV is missing.
