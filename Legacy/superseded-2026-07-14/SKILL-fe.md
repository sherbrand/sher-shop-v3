---
name: fe
description: Wire each section of a page to a reusable component (C-xxx), creating new ones when needed, and record the component map and image slots in the PRD screen entry's Components & Assets line. Needs the page's Content MD already written.
---

# FE

Wire each section of a page to a reusable component (C-xxx): reuse what exists, create what doesn't, and record the result in the PRD.

## Running it

Check CLAUDE.md first. If there's no CLAUDE.md at all, hand your work back in chat: read the inputs that are here, ask for the ones that aren't, then give back every new file and edit — and say which file each belongs in. Otherwise follow CLAUDE.md for where outputs go — read the inputs, save new outputs where it says, and change existing files in place.

## Inputs

- The page — named in the request, or ask which to wire.
- Its Content MD (path in CLAUDE.md) — the sections, each with a section ID and layout notation (no component assigned yet).
- The existing components (C-xxx), in the components directory (path in CLAUDE.md) — to match against.
- outline-notation.md (path in CLAUDE.md) — the notation the sections are written in.
- DESIGN.md (path in CLAUDE.md) and the page's Lovable mockup (named in the PRD screen's References) — for building new components.

## Workflow

Work straight through, pausing only to get a new component signed off (Create).

### 1. Match

Match each section in the Content MD by shape, not copy. Read the shape from its notation (per outline-notation.md) — its operators, brackets, and slots, like `Image | (H2 / Paragraph)`. Reuse the existing C-xxx with the same shape. Different copy under the same shape shares one component. Variations within a shape, like a mirror (image left vs right), column order, or an optional extra like a button, are props or optional slots of that component, so its C-xxx stays the same. A new C-xxx is only for a genuinely different shape, like two columns vs three. Reuse before creating.

### 2. Create

When no existing component has the section's shape, build a new one; when a component has the shape but lacks a slot the section needs (a button, say), add that slot as optional, so pages already using it are unaffected. Either way, work from DESIGN.md and the page's mockup. A new component takes a fresh C-xxx named for its shape (`C-TwoColFeature`), never numbered and never reused. Its file is PascalCase, named to match. Existing names live in the PRD's Components & Assets lines and its `### C-xxx` entries. An extended component keeps its C-xxx. Generate a preview HTML for the user to confirm or revise; finalise only once they confirm.

### 3. Update

In the screen entry, write each section into **Components & Assets**: its section ID → the C-xxx you matched or built, plus `; N images` when the section declares generated image slots. Assets are named by the convention in CLAUDE.md and resolved from the assets folder, so record the count, not paths. Touch only that bullet; leave the entry's others, including the PO's **What's on it** pointer, untouched. Format per Output.

## Output

One bullet in the screen entry: **Components & Assets**, a line per section — its section ID → the C-xxx, plus `; N images` when the section declares generated image slots. A section with none is just section ID → C-xxx. Assets are named by the convention in CLAUDE.md and resolved from the assets folder, so record the count, never a path. Leave the entry's other bullets, including **What's on it**, as they are.

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
  - S-010.3 → C-TwoColFeature; 1 image
```

## Scope

Wire and build components, nothing else. Don't touch copy (the content file), the page's structure (the plan), or its behavior (the rest of the PRD).

## Stop conditions

Stop and report instead of guessing when:

- A section is missing its Section ID — FE records the map against Section IDs and must not invent them (that's the Writer's job). Report and ask for the page to be run through the Writer first.
- The page's Content MD is missing.
