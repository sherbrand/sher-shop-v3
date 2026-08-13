---
name: ui2
description: "Harvest a Claude Design export into the repo: port its token CSS as the repo's token layer, and port each component as Tailwind React bound to those tokens, Layout Components as reusable C-xxx and Module Components as supporting primitives. Reads the export (tokens/*.css, the token manifest, and the components); writes the token CSS, the base CSS, and the components, plus DESIGN.md as a bonus doc. Reports the token changes, and flags any token that was renamed or removed and the components it breaks."
---

# UI2

Turn a Claude Design export into the repo's design system: the token CSS the components read, and the components themselves. Layout Components become reusable C-xxx, Module Components become the primitives they build on.

## Run in Chat

With no CLAUDE.md, hand your work back in chat: read the inputs that are here, ask for any required one that's missing, then give back every new file and edit, and say which file each belongs in.

## Inputs

- The components to harvest — named in the request, or every one in the export.
- cdesign/ (path in CLAUDE.md), named in the request. It holds:
  - `tokens/*.css` — the tokens as CSS custom properties. This is what the components consume, so it is the authority on every token value.
  - `_ds_manifest.json` — a reliable machine index of every component (its name and source path).
  - The component folders — every component sits in one of two folders that set its tier: `components/module/` (Module primitives) or `components/layout/` (Layout Components: full-width bands, chrome, and overlays). Each component has a `.jsx` and a `.d.ts` (its props).
  - [Optional] `DESIGN.md` — the design system as a readable doc. Not a token source. The skill rewrites it as a bonus output.
  - The page HTML kits at the export root are reference for how components compose. You do not harvest them.
- The repo's assets (path in CLAUDE.md) — the served files the components point at.
- [Optional] The existing components (path in CLAUDE.md). Read them to reuse before creating.

## Workflow

### 1. Read

Read `tokens/*.css`, `_ds_manifest.json`, and the Module and Layout components. Read the existing components if they exist.

### 2. Tokens

The export's token CSS becomes the repo's token layer, so every token the components read is defined. Two files come out:

- **tokens.css** (path in CLAUDE.md). Join `colors.css`, `typography.css`, and `spacing.css` into one file, in that order. Keep their comments: they carry the contrast ratios and the reasons behind off-grid values. Change no value and rename no token.
- **base.css** (path in CLAUDE.md). Port `base.css` with three edits:
  - Set the root font size to `81.25%`. The export writes a fixed pixel value, which throws away a reader's own font size setting. `81.25%` renders the same for a reader on the standard 16px default, and scales for one who changed it.
  - Drop every rule scoped to the export's preview container (`sherframe`). It never matches in the repo.
  - Drop every helper class no ported component uses. Step 3 folds those styles into the components.

Two files do not port. `fonts.css` loads webfonts over the network; name its font families in the Report instead, so they can be loaded the framework's way. `components.css` holds the class rules step 3 folds into the components.

Keep a list of what changed since the last run: each token added, changed, renamed, or removed. Flag renamed or removed tokens loudly, with the count of components that use them, since those components break.

### 3. Harvest components

A token change from step 2 ports every component in the export, whatever the request named.

Port each component to a Tailwind React component, one to one: map its styles and CSS-var tokens to Tailwind classes bound to the token CSS from step 2, and keep its props from its `.d.ts` one to one. A value with a token binds to it; a value with no token stays as-is and gets flagged for the Report's fix prompt. Type each per CLAUDE.md. Reuse before creating: if an existing component is the same, reuse it. The two tiers are named differently:

- **`components/layout/` → C-xxx.** A component in `components/layout/` (a full-width band, chrome, or overlay) is a reusable C-xxx: `C-` plus its name in the export (`Hero` → `C-Hero`). The export's card may tag a component with an F-xxx feature ID. That is not its name. Every `components/layout/` component becomes a C-xxx, whatever the card calls it. These are what pages compose. A name is used once, never reused. Name the file and its export per CLAUDE.md.
- **`components/module/` → primitives.** A component in `components/module/` (a small self-contained piece: button, card, icon, heading) is a supporting primitive, not a C-xxx. Port it too, since the Layout Components import it, but name it plainly (`Button` → `Button.tsx`), no `C-`.
- **Staging.** Skip a component whose name ends in `Stg`.
- **Flat.** The export's tier folders flatten away; every component lands in one directory.
- **Global CSS.** The export's class rules become Tailwind classes on the component. Nothing from `components.css` or `base.css` ports into a component as a class name.
- **Variant.** A presentational variant (a mirror, a moved label) is whatever the export made it: a prop (like `imageSide`) or a separate named component. Keep the export's choice.
- **Heading level.** A Layout Component should take its level as a `headingLevel` prop that sets the tag only. If one hardcodes its level instead, flag it to add the prop on Claude Design.
- **Assets.** A component that references an asset file (like the Logo's images) points at the export path. Rewire it to the repo's served asset path (`/public/assets/`, referenced as `/assets/<name>`), matching the repo's asset filenames. Where no repo filename matches, use the closest one, or a placeholder path when nothing is close, and say which in the Report. The skill rewires paths; it copies no asset file.

List a component for saving only when it is fully ready. If a blocker stops it, leave it off the list. A flag is not a blocker: keep a flagged-but-working component on the list and fix it through the Report prompt.

### 4. Save

Write tokens.css and base.css first, then each listed component to components/ (path in CLAUDE.md), writing one that is new or replacing one that is already there (see On a rerun).

Then write DESIGN.md (path in CLAUDE.md) as a bonus doc. Adopt the export's, with three changes: name each Layout Component by its C-xxx, leave every staging component out, and say at the top that tokens.css is the token source and DESIGN.md only describes it. Do not correct it. Compare each token value against tokens.css and each component's prop list against its `.d.ts`, and name what does not match in the Report.

A problem writing DESIGN.md does not fail the run. The token CSS and the components are the output that matters.

### 5. Report

Report what the run did: the new or extended components (C-xxx and primitives), any component skipped as blocked, each staging component skipped, each asset name it guessed or replaced with a placeholder, the token changes from step 2, and the font families from `fonts.css` with a note that they need loading the framework's way.

Name any component in components/ that the export no longer has. It is orphaned: no export refreshes it, and any page still importing it renders a frozen version. Say whether a similarly-shaped new component suggests a rename, and list what needs to be updated.

Then give the human one paste-ready prompt for Claude Design. The export regenerates the tokens and the components every time, so any patch this run makes to them is undone on the next export. The prompt fixes the source. Cover only what would otherwise come back:

- a token renamed or removed, and the components it breaks,
- an asset whose name does not match the repo file (rename it to the repo name),
- a component value with no token (add the token, or confirm it is a one-off),
- a Layout Component that hardcodes its heading level (add a `headingLevel` prop),
- a DESIGN.md value that does not match the token CSS,
- a prop the DESIGN.md doc names that the code does not have,
- a component the export regressed (say what the old version had, so the next export keeps it),
- a component skipped as blocked (name it, say what blocked it, and what to fix so the next export is ready).

If none came up, say so and skip the prompt.

## Output

- tokens.css, the export's token CSS joined into the repo's token layer.
- base.css, the export's document defaults with the preview-only and folded-in rules removed.
- New or extended components (Tailwind React, token-bound) in components/: Layout Components as C-xxx, Module Components as plain-named primitives.
- DESIGN.md, adopted from the export as a bonus doc.
- A list of the token changes.

## On a rerun

The export is the base. Every file is replaced whole, never merged. Follow the `Replace` rule in CLAUDE.md, grouping a component under `components/`.

base.css is replaced too. Its three edits are re-applied each run, so nothing hand-written survives there.

## Stop conditions

Stop and report instead of guessing when:

- A required input is missing.
- The export is present but incomplete: `tokens/*.css` or `_ds_manifest.json` is missing, or the manifest lists a component that has no code.
