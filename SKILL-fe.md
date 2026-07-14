---
name: fe
description: "Assign each section of a page to an existing reusable component (C-xxx) and its image assets, and record the map in the PRD screen entry's Components & Assets line. Needs the page's Content MD already written."
---

# FE

For each section in the page's Content MD, assign a matching C-xxx and its image assets, then record `section ID → C-xxx; assets` in the PRD. Assign what exists; where nothing fits, record `TBC` and flag it to generate upstream. FE does not build components or assets.

## Running it

Check CLAUDE.md first. If there's no CLAUDE.md at all, hand your work back in chat: read the inputs that are here, ask for the ones that aren't, then give back every new file and edit, and say which file each belongs in. Otherwise follow CLAUDE.md for where outputs go: read the inputs, save new outputs where it says, and change existing files in place.

## Inputs

- The page — named in the request, or ask which to wire.
- Its Content MD (path in CLAUDE.md) — the sections, each with a section ID and layout notation.
- The existing components (C-xxx), in the components directory (path in CLAUDE.md) — to match against.
- outline-notation.md (path in CLAUDE.md) — the notation the sections are written in.
- The page's image assets, in the assets folder (path in CLAUDE.md) — to assign to image slots.

## Workflow

Work straight through.

### 1. Assign

For each section, read its shape from the layout notation (per outline-notation.md) — its operators, brackets, and slots, like `Image | (H2 / Paragraph)`. Match the shape, not the copy, to an existing C-xxx:

| Section vs the C-xxx library | Assign |
|---|---|
| Same shape as an existing C-xxx | that C-xxx |
| Same shape, different copy | the same C-xxx |
| A variation of the shape — a mirror (image left vs right), column order, or an optional extra like a button | the same C-xxx (it is a prop or optional slot) |
| A genuinely different shape, like two columns vs three | a different existing C-xxx |
| No existing C-xxx fits | `TBC`, and flag it to generate the component on Claude Design |

For each image slot the section's notation declares, assign its asset from the assets folder. If the asset is not there, record the slot as `TBC` and flag it to generate the asset on Figma Weave.

### 2. Record

In the screen entry, write each section into **Components & Assets**: its section ID → the C-xxx you assigned, plus `; N images` when the section declares image slots. Record the count, not paths. A section with no matching C-xxx records `→ TBC`; a missing asset marks its slot `TBC`. Touch only that bullet; leave the entry's others, including the PO's **What's on it** pointer, untouched. Then report a **Flags** list in chat, per Output.

## Output

One bullet in the screen entry: **Components & Assets**, a line per section — its section ID → the C-xxx, plus `; N images` when the section declares image slots. A section with none is just section ID → C-xxx. An unmatched section is `→ TBC`; a missing asset marks its slot `TBC`. Assets are named by the convention in CLAUDE.md and resolved from the assets folder, so record the count, never a path. Leave the entry's other bullets, including **What's on it**, as they are.

Plus a **Flags** list in chat: one line per `TBC` — what to generate and where, with the section's shape or the slot's image brief so it can be made. A component gap points to Claude Design; an asset gap points to Figma Weave.

```
### S-010 — About Us
- **What's on it:**
  - Refer to /docs/content/s-010_about-us.md
- **Feature:** None
- **Behavior:**
  - Static content; no interactive behavior.
- **Components & Assets:**
  - S-010.1 → C-PageIntro
  - S-010.2 → C-TwoColFeature; 1 image
  - S-010.3 → TBC; 1 image (asset TBC)
```

Flags (in chat):
- S-010.3 — no C-xxx fits → generate on Claude Design (shape: `Image | (H2 / Paragraph)`).
- S-010.3 image → generate on Figma Weave (brief: the section's image).

## Scope

Assign and record, nothing else. Don't build components, and don't touch the copy, the page's structure, or its behavior.

## Stop conditions

Stop and report instead of guessing when:

- A section is missing its Section ID — FE records the map against Section IDs and must not invent them (that's the Writer's job). Report and ask for the page to be run through the Writer first.
- The page's Content MD is missing.
