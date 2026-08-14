---
name: fe
description: "Check each page's Claude Design export against its Content MD and update the sectioning and headings, assign every section to an existing Layout Component (C-xxx) with its props and image assets, record the map in the PRD screen entries, and reconcile the PRD's Active Items list of C-xxx. Needs the Content MDs already written."
---

# FE

For each section of every page, assign a matching Layout Component with its props and image assets, then record `section ID → C-xxx; assets` in the PRD. Assign what exists; where nothing fits, record `TBC` and flag it to generate upstream. FE does not build components or assets.

## Run in Chat

With no CLAUDE.md, hand your work back in chat: read the inputs that are here, ask for any required one that's missing, then give back every new file and edit, and say which file each belongs in.

## Overwriting

Before replacing a whole file, move the original to the legacy folder (path in CLAUDE.md). End the run by listing what changed between the two, then ask which one to keep as the base.

If the answer is the original, swap them: the new file goes to legacy and the original returns to its live path. Either way, fold in the better parts of the other, one listed change at a time, so nothing on the list is dropped.

## Inputs

- The Content MDs (path in CLAUDE.md) — the sections of each page, each with a section ID and layout notation.
- The Planning TSV (path in CLAUDE.md) — each page's `outline`, updated here.
- The Claude Design export (path in CLAUDE.md) — its page files hold the rendered sections and copy to check against.
- The existing Layout Components (C-xxx), in the components directory (path in CLAUDE.md) — to match against, and their `.d.ts` for props.
- The PRD (path in CLAUDE.md) — the screen entry the map is written into, and the Active Items list to reconcile.
- outline-notation.md (path in CLAUDE.md) — the notation the sections are written in.
- [Optional] The image assets, in the assets folder (path in CLAUDE.md) — to assign to image slots. A missing asset's slot records TBC.

## Workflow

Run steps 1 to 3 for every page that has a Content MD, or for the one named in the request. Step 4 onward runs once.

### 1. Check and update

Read the page's export and compare it against the Content MD. A page with no export yet has nothing to check, so go straight to Assign.

- **Sectioning.** Where the export splits or merges sections, update the plan's `outline` and the Content MD to match.
- **Slots.** Where the export adds or drops a slot inside a section (a second button, an extra image), update the notation in both the plan's `outline` and the Content MD.
- **Quoted literal copy.** Where a heading or a label differs, update both the plan's `outline` and the Content MD. This copy is verbatim in both, so they stay in step.
- **Copy written from a brief.** Change nothing; it goes in the Report. The plan holds the brief, not the words, so rewriting the Content MD would lose the edit the next time the page is written.
- **The PRD.** Where a screen or a C-xxx carries a verbatim outline rather than a pointer, update it to match the plan.

Skip data-bound slots. A `{c.label}`-style binding renders from data, so it always differs.

### 2. Assign

For each section, read its shape from the layout notation (per outline-notation.md) — its operators, brackets, and slots, like `Image | (H2 / Paragraph)`. Match the shape, not the copy, to an existing Layout Component:

| Section vs the Layout Component library | Assign |
|---|---|
| Same shape as an existing Layout Component | that C-xxx |
| Same shape, different copy | the same C-xxx |
| A variation an existing Layout Component supports — a prop, or a separate variant C-xxx (`C-HeroTileBottomLeft`) | that C-xxx or its variant |
| A variation no Layout Component supports yet | `TBC`, and flag it to add the variant on Claude Design |
| A genuinely different shape, like two columns vs three | a different existing C-xxx |
| No existing Layout Component fits | `TBC`, and flag it to generate the component on Claude Design |

Then set each prop from the notation and the component's `.d.ts`: `imageSide` from which side the image sits on, `headingLevel` from the heading marker. Write them as `(imageSide=left, headingLevel=h2)`.

For each image slot the section's notation declares, write its expected path in the assets folder, named `<section-id>-<n>.<ext>` from the section ID and the slot's `#n`. If the file is not there, write the path anyway and flag it, so the human knows where to save it.

### 3. Record

In the screen entry, write each section into **Components & Assets**: its section ID → the C-xxx you assigned with its props, plus each image path. A section with no matching C-xxx records `→ TBC`.

### 4. Reconcile

Once every page is recorded, reconcile the PRD's **Active Items** list. Add an Active row for any C-xxx you used that isn't listed yet. Then check every Active C-xxx still has a file in the components directory. If one is missing, look for a rename among the components that are there and write `Deprecated (renamed to C-xxx)`, since a name is never reused. If there is no rename, report it as missing and name the copy in the legacy folder to restore from.

### 5. Save

Write the plan and the PRD, edited in place. A Content MD that only gained a heading is edited in place too. One whose sectioning changed is rewritten, so follow Overwriting, grouping it under `content/` in the legacy folder. Treat the run as one Overwriting: move every rewritten Content MD, then list what changed across them and ask once.

### 6. Report

Report a list in chat, one line per `TBC`: what to generate and where, with the section's shape or the slot's image brief so it can be made. A component gap goes to Claude Design; an asset gap goes to Figma Weave.

Add a line for each Active C-xxx whose file is missing: whether a rename took its place, or which copy in the legacy folder to restore from.

Add a line for each copy difference you did not apply, so the human can fold it into the brief, and one for each page skipped for missing Section IDs.

## Output

One bullet in the screen entry: **Components & Assets**, a line per section — its section ID → the C-xxx with its props, plus each image path. An unmatched section is `→ TBC`; a missing asset keeps its path and is flagged. Leave the entry's other bullets, including **Outline**, as they are.

Plus the plan's `outline` and the Content MD, updated where the export changed the sectioning or a quoted heading.

Plus the PRD's **Active Items** rows: a C-xxx you used added as Active, and an Active one whose file is gone marked `Deprecated (renamed to C-xxx)` or reported as missing.

Plus a report in chat: one line per `TBC` — what to generate and where, with the section's shape or the slot's image brief so it can be made. A component gap points to Claude Design; an asset gap points to Figma Weave.

```
### S-007 — About Us
- **Outline:** Refer to /docs/content/s-007_about-us.md
- **Feature:** None
- **Behavior:**
  - Static content; no interactive behavior.
- **Components & Assets:**
  - S-007.1 → C-PageIntro (headingLevel=h1)
  - S-007.2 → C-TwoColFeature (imageSide=left, headingLevel=h2); s-007.2-1.webp
  - S-007.3 → TBC; s-007.3-1.webp (asset TBC)
```

Active Items (in the PRD):

```
| ID | Name | Status |
|---|---|---|
| C-PageIntro | Page Intro | Active |
| C-TwoColFeature | Two Column Feature | Active |
| C-PolicySections | Policy Sections | Deprecated (renamed to C-ContentProse) |
```

Report (in chat):
- S-007.3 — no Layout Component fits → generate on Claude Design (shape: `Image | (H2 / Paragraph)`).
- S-007.3 image → generate on Figma Weave (brief: the section's image), save as `s-007.3-1.webp`.

## Stop conditions

Stop and report instead of guessing when:

- A required input is missing.
- Every assigned page is missing its Section IDs. The map is keyed to them and they are not invented here. A single page missing them is skipped and reported, not a stop.
