---
name: fe
description: "Check each page's Claude Design export against its Content MD and update the sectioning and headings, read each section's Layout Component (C-xxx) and props off the export and pair it with its image assets, record the map in the PRD screen entries, and reconcile the PRD's Active Items list of C-xxx. Needs the Content MDs already written."
---

# FE

For each section of every page, read its Layout Component and props off the export, pair it with its image assets, then record `section ID → C-xxx; assets` in the PRD. Where nothing fits, record `(MISSING)` and flag it to generate upstream. FE does not build components or assets.

## Run in Chat

With no CLAUDE.md, hand your work back in chat: read the inputs that are here, ask for any required one that's missing, then give back every new file and edit, and say which file each belongs in.

## Inputs

- The Content MDs (path in CLAUDE.md) — the sections of each page, each with a section ID and layout notation.
- The Planning TSV (path in CLAUDE.md) — each page's `outline`, updated here.
- The Claude Design export (path in CLAUDE.md) — one page file per page, holding the rendered sections and copy to check against. See Reading the export.
- The existing Layout Components (C-xxx), in the components directory (path in CLAUDE.md) — to check each assignment has a file, and to match against when a page has no export. Each file exports its props interface.
- The PRD (path in CLAUDE.md) — the screen entry the map is written into, and the Active Items list to reconcile.
- outline-notation.md (path in CLAUDE.md) — the notation the sections are written in.
- [Optional] The image assets, in the assets folder (path in CLAUDE.md) — to assign to image slots. A missing asset keeps its path and is flagged.

## Reading the export

A page file holds two versions: Main, which follows the page's layout, and Staging, an alternate direction. Read Main only. `App` names both, as `mode === "main" ? <Main…/> : <Staging…/>`; take the name from there, since it varies by page.

Main is a run of sections, each one a component with its props. Read it into that list, in order:

- Skip the chrome when listing the sections. A header, footer, or drawer is not a page section, wherever it sits.
- Expand a loop (`BANDS.map((b, i) => …)`) into one section per item.
- Work out a prop written as an expression (`mirror={i % 2 === 1}`) for that section.
- A `{c.label}`-style binding renders from data, so its copy always differs.

## Workflow

Run steps 1 to 3 for every page that has a Content MD, or for the one named in the request. Step 4 onward runs once.

### 1. Check and update

Read the page's export (see Reading the export) and compare it against the Content MD. A page with no export yet has nothing to check, so go straight to Assign.

- **Sectioning.** Where the export splits or merges sections, update the plan's `outline` and the Content MD to match, then renumber the Content MD's section IDs top to bottom from 1.
- **Slots.** Where the export adds or drops a slot inside a section (a second button, an extra image), update the notation in both the plan's `outline` and the Content MD.
- **Copy.** Where the export's copy differs, update the Content MD to match. Then update the plan to match too: a quoted literal takes the same words; a brief becomes the shortest one that would produce that copy.

Skip Content MD copy carrying `{ }`; it holds a sample or a field name, not the words that render.

### 2. Assign

Take the export's list of sections (see Reading the export) and read the assignment off it, section by section, in order. A section's C-xxx is `C-` plus the component's name there, so `<EditorialSplit mirror …>` is `C-EditorialSplit`.

Record the props that set the layout, like `mirror` or `headingLevel`, written as `[mirror, headingLevel=1]`. Leave out the ones carrying copy or media; the Content MD and the assets own those.

Then check each C-xxx has a file in the components directory. If it doesn't, keep the assignment and flag it: the export has the component, the repo has not harvested it yet.

Where a component covers only part of a section and the rest is page markup (a bare `<h2>` beside the component), record the component and flag the prop it is missing, so the leftover has somewhere to go.

A page with no export has no assignment to read. Match each section instead: read its shape from the layout notation (per outline-notation.md), its operators, brackets, and slots, like `Image | (H2 / Paragraph)`, then match that shape, not the copy, against the existing Layout Components. Where nothing fits, record `(MISSING)` and flag it to generate the component on Claude Design.

For each image slot the section's notation declares, look in the assets folder for `<section-id>-<n>*`, from the section ID and the slot's `#n`, and write the path you find. If nothing is there, name it `<section-id>-<n>-<slug>.webp`, mark it `(MISSING)`, and flag it, so the human knows what to save and where. The slug is three to five words from the alt bullet, lowercase and hyphenated: the subject of the image, not the whole sentence. Skip a slot whose bullet is wrapped in `{ }`; its image comes from a source, not the assets folder.

### 3. Record

In the screen entry, write each section into **Components**: its section ID → the C-xxx you assigned with its props. A section with no matching C-xxx records `→ (MISSING)`.

Then write each image slot into **Assets**: its section ID → the path. A screen whose sections declare no image slots writes `None`.

### 4. Reconcile

Once every page is recorded, reconcile the PRD's **Active Items** list. Add an Active row for any C-xxx you used that isn't listed yet. Then check every C-xxx that was already Active still has a file in the components directory. If one is missing, look for a rename among the components that are there. Report the candidate and ask before writing `Deprecated (renamed C-xxx)`, since a name is never reused. If there is no candidate, report it as missing and name the copy in the legacy folder to restore from.

### 5. Save

Write the PRD and the plan by targeted edit: change the named entry, row, or cell and leave the rest of the file as it was.

A Content MD that changed is rewritten. Move the original to the legacy folder (path in CLAUDE.md) first, grouping it under `content/`, then write the new one in its place.

### 6. Report

Open with one line counting what the run filled in the PRD, then two lists. Leave out a list with nothing in it.

```
Filled 38 of 41 components and 12 of 15 assets, across 11 screens.
```

**Missing Log.** What isn't there, and what it needs: a component or a prop is generated on Claude Design, an image on Figma Weave, a Content MD is written, a component the export has and the repo doesn't is harvested.

```
[Component] C-xxx is missing for S-012.3 (nothing fits)
[Component] C-ProductGrid is missing a heading prop (S-001.4's H2 is left out)
[Component] C-ShopFaq is missing from the components directory (in the export, not harvested)
[Content] Missing for S-013 (screen was skipped)
[Asset] Missing image s-007.3-1-sherilyn-founder-studio.webp for S-007.3
```

**Non-PRD Changelog.** What the run overwrote outside the PRD, one line each: the file, the screen, and what changed. FE writes only the plan's `outline` and the Content MDs, so `Planning` and `Content` are the only labels. For a rewritten Content MD, diff it against the copy in legacy rather than listing what you set out to change.

```
[Planning → S-003] Revised <the corset tops range and the two closures> to <the two closures and how to pick>
[Planning → S-004] Added Btn after Paragraph
[Content → S-003] Merged S-003.4 into S-003.3, IDs renumbered
```

Then anything else, in plain sentences: a brief you rewrote and want confirmed, a C-xxx whose file is gone and the rename that looks like it.

## Output

- The screen entry's **Components** bullet, a line per section: its section ID → the C-xxx with its layout props in `[ ]`. An unmatched section is `→ (MISSING)`.
- The screen entry's **Assets** bullet, a line per image slot: its section ID → the path. One with no file keeps its path and takes `(MISSING)` after it. A screen with no image slots writes `None`.
- The entry's other bullets, including **Outline**, are left as they are.
- The PRD's **Active Items** rows, reconciled.
- The plan's `outline` and the Content MD, updated where the export changed the sectioning, a slot, or the copy.

```
### S-007 — About Us
- **Outline:** Refer to /docs/content/s-007_about-us.md
- **Feature:** None
- **Behavior:**
  - Static content; no interactive behavior.
- **Components:**
  - S-007.1 → C-HeroTitle [headingLevel=1]
  - S-007.2 → C-EditorialSplit
  - S-007.3 → C-EditorialSplit [mirror]
  - S-007.4 → (MISSING)
- **Assets:**
  - S-007.2 → s-007.2-1-woman-in-corset-top.webp
  - S-007.3 → s-007.3-1-sherilyn-founder-studio.webp (MISSING)
```

Active Items (in the PRD):

```
| ID | Name | Status |
|---|---|---|
| C-HeroTitle | Hero Title | Active |
| C-EditorialSplit | Editorial Split | Active |
| C-PolicySections | Policy Sections | Deprecated (renamed C-ContentProse) |
```

## Stop conditions

Stop and report instead of guessing when:

- A required input is missing.
