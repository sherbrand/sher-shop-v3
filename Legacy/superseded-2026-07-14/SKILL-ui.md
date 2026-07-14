---
name: ui
description: "Harvest reusable C-xxx component templates from a Claude Design export, and create or update DESIGN.md from the same export's tokens. Reads the export bundle (tokens, component source, and UI kit); writes DESIGN.md in the repo's DTCG format and Tailwind component templates bound to its tokens. Reports token changes as an FYI, flagging any renamed or removed token and the components it breaks."
---

# UI

Turn a Claude Design export into two things: the repo's DESIGN.md, and reusable C-xxx component templates bound to its tokens.

## Running it

Check CLAUDE.md first. If there's no CLAUDE.md at all, hand your work back in chat: read the inputs that are here, ask for the ones that aren't, then give back every new file and edit, and say which file each belongs in. Otherwise follow CLAUDE.md for where outputs go: read the inputs, save new outputs where it says, and change existing files in place.

## Inputs

- A Claude Design export bundle, named in the request. It holds the token files, the component source, and the homepage UI kit. This is the source for both DESIGN.md and the components.
- DESIGN.md (path in CLAUDE.md), if it already exists. Read it to reconcile against the export; the skill updates it.
- The existing C-xxx components (path in CLAUDE.md), if any. Read them to reuse before creating.

## Workflow

Work straight through.

### 1. Read

Read the export bundle: its tokens, its component source, and the UI kit. Read the existing DESIGN.md and C-xxx if they exist.

### 2. DESIGN.md

Write DESIGN.md from the export's tokens, in the repo's format (path in CLAUDE.md): DTCG token YAML on top, prose below, no Components section. Create it if none exists; update it to match the export if one does. After writing it, run `design:sync` per CLAUDE.md to export the theme file, and lint the tokens before trusting them.

Report the result as an FYI diff: list each token added, changed, renamed, or removed. Flag renamed or removed tokens loudly, with the count of C-xxx that use them, since those components break.

### 3. Harvest C-xxx

Pull each reusable piece from the export's components. Reuse before creating: if an existing C-xxx has the same shape, reuse or extend it. A variant (a mirror, a button, mobile) is a prop or optional slot under the same C-xxx. Mint a new C-xxx only for a new shape. Name it for its shape.

- Build each as a template: HTML with Tailwind classes bound to DESIGN.md tokens, so it ports to React near-losslessly.
- Capture a short usage note per component from the export's component notes.
- Save to the components directory (path in CLAUDE.md).

### 4. Report

List the new or extended C-xxx, and the DESIGN.md FYI diff from step 2.

## Output

- DESIGN.md, created or updated in the repo's format, with an FYI diff of the token changes.
- New or extended C-xxx templates (Tailwind, token-bound) in the components directory, each with a usage note.

## Scope

Harvest components and maintain DESIGN.md. Wiring sections to components is FE's job.

## Stop conditions

Stop and report instead of guessing when no export bundle is given.
