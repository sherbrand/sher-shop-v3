---
name: fe
description: Wire each section of a page to a reusable component (C-xxx), creating new ones when needed, and record the component map and assets in the PRD's screen entry. Needs the page's Content MD already written.
---

# FE

Wire each section of a page to a reusable component (C-xxx) — reusing what exists, creating what doesn't — and record the result in the PRD.

## Running it

If you can read CLAUDE.md, you're in the repo: work from its paths — read the inputs, save new outputs, and apply this skill's changes to existing files in place. If you can't, you're in a chat: ask for the inputs this skill lists, plus the project's `CLAUDE.md` (repo rules) the repo reads by default, then hand back everything that changed — new files to save, and edits to existing files for the user to apply — and say which file each change belongs in.

## Inputs

- The page — named in the request, or ask which to wire.
- Its Content MD (path in CLAUDE.md) — the sections, each with a section ID and layout notation (no component assigned yet).
- The existing components (C-xxx), in the components directory (path in CLAUDE.md) — to match against.
- outline-notation.md (path in CLAUDE.md) — the notation the sections are written in.
- DESIGN.md (path in CLAUDE.md) and the page's Lovable mockup (named in the PRD screen's References) — for building new components.

## Workflow

Work straight through, pausing only to get a new component signed off (Create).

### 1. Match

Match each section in the Content MD by shape, not copy. Read the shape from its notation (per outline-notation.md) — the bracketed label and its slots, like `[2-Col: Image · (Title / Paragraph)]` — and reuse the existing C-xxx with the same shape. Different copy under the same shape shares one component. Variations within a shape — a mirror (image left vs right), column order, or an optional extra like a button — are props or optional slots of that component, so its C-xxx stays the same. A new C-xxx is only for a genuinely different shape, like two columns vs three. Reuse before creating.

### 2. Create

When no existing component has the section's shape, build a new one; when a component has the shape but lacks a slot the section needs — a button, say — add that slot as optional, so pages already using it are unaffected. Either way, work from DESIGN.md and the page's mockup. A new component takes the next unused C-xxx — IDs are tracked in the PRD's What's on it (path in CLAUDE.md), append-only, never renumber — with a PascalCase file named for its shape; an extended component keeps its C-xxx. Generate a preview HTML for the user to confirm or revise; finalise only once they confirm.

### 3. Update

In the screen entry, write each section's C-xxx into **What's on it** and each image slot into **Required assets** (target `TBC` until the file exists). Touch only those two bullets — leave the entry's others untouched. Format per Output.

## Output

Two bullets in the screen entry. **What's on it** maps each section to a component — a line per section: its section ID, a short label, and the C-xxx. **Required assets** lists each image slot the section's notation declares — a line per slot, target `TBC` until the file exists. Other sub-bullets in the entry are left as they are.

```
#### S-010 — About Us
- **What's on it:** (content → `content/about-us.md`)
  - S-010.1 Hero — "Our SHER Brand" → C-010 Hero Banner
  - S-010.2 "Sensuality That Elevates" → C-011 Two-Column Feature
  - S-010.3 "For the Woman who Notices" → C-011 Two-Column Feature
  - S-010.4 "The Woman Behind It" → C-011 Two-Column Feature
- **Required assets:**
  - Image in S-010.1 → TBC
  - Image in S-010.2 → TBC
  - Image in S-010.3 → TBC
  - Image in S-010.4 → TBC
```

## Scope

Wire and build components, nothing else. Don't touch copy (the content file), the page's structure (the plan), or its behaviour (the rest of the PRD).

## Stop conditions

Stop and report instead of guessing when:

- A section is missing its Section ID — FE records the map against Section IDs and must not invent them (that's the Writer's job). Report and ask for the page to be run through the Writer first.
- The page's Content MD is missing.
