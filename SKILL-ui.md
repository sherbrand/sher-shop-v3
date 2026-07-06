---
name: ui
description: Absorb a design input into the repo's design sources. Reads a design input — a prompt or brief, a Claude Design handoff, a screenshot, or a URL — and reconciles its tokens into DESIGN.md, creating DESIGN.md thin from the brand if it doesn't exist yet. When the input is a whole screen, also folds copy and layout changes back into that screen's Content MD. Flags any token invented beyond the brand. Tokens only — never components.
---

# UI

Take a design input and fold it into the repo's sources of truth: tokens into DESIGN.md, and — when the input is a whole screen — copy and layout into that screen's Content MD.

## Running it

If you can read CLAUDE.md, you're in the repo: work from its paths — read the inputs, save new outputs, and apply this skill's changes to existing files in place. If you can't, you're in a chat: ask for the inputs this skill lists, plus the project's `CLAUDE.md` (repo rules) the repo reads by default, then hand back everything that changed — new files to save, and edits to existing files for the user to apply — and say which file each change belongs in.

## Inputs

- A design input, named in the request — a prompt or brief, a Claude Design handoff (`design.html` + `screenshots/` + `design-notes.md`), a screenshot, or a URL. At least one.
- DESIGN.md (path in CLAUDE.md) — the current tokens, to grow. Create it if it doesn't exist yet.
- brand-sher.md (path in CLAUDE.md) — brand and feel, to seed and judge tokens.
- [screen input only] The screen's Content MD — given directly, or named by its S-xxx and found in the content folder (path in CLAUDE.md). It carries the layout notation, copy, and Section IDs.
- [screen input only] outline-notation.md (path in CLAUDE.md) — to read and write the layout notation in the Content MD.

## Workflow

Work straight through. A **screen input** is a design of a whole page that maps to a Content MD; anything smaller — an element, a palette, one component — is a fragment.

### 1. Read

Read the current DESIGN.md — or note it's missing — the brand doc, and the design input; for a Claude Design handoff, read its `design-notes.md` for intent.

### 2. Tokens → DESIGN.md

Pull the primitives the input shows — color, type, spacing, radius, motion, and the like. A handoff or screenshot gives pixels; map each to a named token, not a raw value. Add new tokens; grow what's there.

- If DESIGN.md doesn't exist, create it thin from the brand's sure things, in the DESIGN.md format (see claude-repo.md): DTCG token YAML with `{...}` aliasing, prose below.
- Tokens only — leave the format's Components section empty.
- Use a value the brand doesn't cover only when the design needs it, and flag it.

### 3. Content MD — screen input only

If the input is a whole screen, fold its copy and layout changes back into the Content MD under their Section IDs — notation line and copy in sync. Keep edits small; don't re-architect or rewrite.

- A new slot (a button, say) goes in the notation line and gets a copy bullet.
- A reordered section keeps its ID; a new section takes the next free number; existing IDs never renumber.

Skip a section that didn't change. Skip this whole step when the input isn't a screen.

### 4. Report

List every token flagged in step 2. Run `pnpm design:sync` to export `/app/theme.css` and lint DESIGN.md; report any lint failure (broken refs, AA contrast).

## Output

- DESIGN.md created or grown — tokens only.
- The Content MD updated — only when the input was a screen.
- A flag for any token used beyond the brand.

## Scope

Tokens and screen copy, nothing else. Don't build or name components (FE owns C-xxx), don't touch a page's structure (the plan) or its behaviour (the PRD).

## Stop conditions

Stop and report instead of guessing when:

- No design input is given.
- A screen input is named but its Content MD is missing.
- brand-sher.md is missing.
- outline-notation.md is missing (screen input only).
