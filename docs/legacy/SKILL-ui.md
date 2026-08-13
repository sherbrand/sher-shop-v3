---
name: ui
description: "Adopt a Claude Design export into the repo design system: reconcile the export's DESIGN.md against its own tokens, and harvest each Layout Component as a reusable C-xxx and each Module Component as a supporting primitive, all Tailwind React bound to those tokens. Reads the export (DESIGN.md, tokens/*.css, the token manifest, and the components); writes the repo DESIGN.md, the C-xxx components, and the supporting primitives. Reports the token changes, and flags any DESIGN.md value that drifts from the tokens or any token that was renamed or removed and the components it breaks."
---

# UI

Turn a Claude Design export into two things: the repo's DESIGN.md, and its components bound to the tokens — Layout Components as reusable C-xxx, Module Components as the primitives they build on.

## Run in Chat

With no CLAUDE.md, hand your work back in chat: read the inputs that are here, ask for any required one that's missing, then give back every new file and edit, and say which file each belongs in.

## Inputs

- The components to harvest — named in the request, or every one in the export.
- cdesign/ (path in CLAUDE.md), named in the request. It holds:
  - `DESIGN.md` — the design system in DESIGN.md format: tokens as YAML front matter, prose below, and a Components section. `readme.md` mirrors it, so read `DESIGN.md`.
  - `tokens/*.css` — the tokens as CSS custom properties. This is what the components consume.
  - `_ds_manifest.json` — a reliable machine index of every component (its name and source path). For token values, `tokens/*.css` above is the authority.
  - The component folders — every component sits in one of two folders that set its tier: `components/module/` (Module primitives) or `components/layout/` (Layout Components: full-width bands, chrome, and overlays). Each component has a `.jsx` and a `.d.ts` (its props).
  - The page HTML kits at the export root are reference for how components compose. You do not harvest them.
- The repo's assets (path in CLAUDE.md) — the served files the components point at.
- [Optional] The repo DESIGN.md (path in CLAUDE.md). Read it to reconcile against the export; the skill updates it. With none, create it.
- [Optional] The existing components (path in CLAUDE.md). Read them to reuse before creating.

## Workflow

### 1. Read

Read the export's `DESIGN.md`, `tokens/*.css`, `_ds_manifest.json`, and the Module and Layout components. Read the existing repo DESIGN.md and components if they exist.

### 2. DESIGN.md

The export already ships a DESIGN.md in the repo's format. Adopt it as the repo DESIGN.md; do not rewrite it from scratch. Reconcile it before trusting it:

- **Check and fix the values.** Compare each token value in the YAML front matter against `_ds_manifest.json` and `tokens/*.css`. If a value does not match, fix it to the CSS value, since the CSS is what the components consume. Match each one by value, not by name: the YAML writes a short name (`borderStrong`) where the CSS writes a long one (`--sher-border-strong`). Leave pointers alone: a YAML value like `{colors.background}` and a CSS `var(--sher-background)` are the same pointer, both correct, so neither needs a fix. Go the other way too: if `tokens/*.css` holds a token the front matter left out, add it, so the front matter lists every token the components consume. Pull only from `tokens/*.css`; skip vars in `base.css` or `components.css` and any preview-only rule (like `sherframe`), which are not design tokens. Flag any YAML value with no token behind it, like a line height that is not in the tokens.
- **Keep it design-only.** DESIGN.md holds tokens, components, and visual and layout guidance. Drop any brand voice, audience, or imagery that leaked in; those live in their own files (paths in CLAUDE.md).
- **Tie the doc to the code.** In the Components section, name each Layout Component by its C-xxx and each primitive by its plain name, so each doc entry ties to its code file.
- **Check the props too.** Compare each component's prop list in the Components section against its `.d.ts`. The `.d.ts` wins. Flag any prop the doc names that the code does not have.
- **Drop staging.** Leave a staging component out of the YAML `components:` block and the Components section.
- Build the repo DESIGN.md from the export, whether or not one already exists. Step 4 writes it.

Keep a list of what changed: each token added, changed, renamed, or removed, plus any value the check-and-fix corrected. Flag renamed or removed tokens loudly, with the count of components that use them, since those components break.

### 3. Harvest components

A token change from Step 2 ports every component in the export, whatever the request named.

Port each component to a Tailwind React component, one to one: map its styles and CSS-var tokens to Tailwind classes bound to the DESIGN.md tokens, and keep its props from its `.d.ts` one to one. A value with a token binds to it; a value with no token stays as-is and gets flagged for the Report's fix prompt. Type each per CLAUDE.md. Reuse before creating: if an existing component is the same, reuse it. The two tiers are named differently:

- **`components/layout/` → C-xxx.** A component in `components/layout/` (a full-width band, chrome, or overlay) is a reusable C-xxx: `C-` plus its name in the export (`Hero` → `C-Hero`). The export's card may tag a component with an F-xxx feature ID. That is not its name. Every `components/layout/` component becomes a C-xxx, whatever the card calls it. These are what pages compose and get wired to page sections. A name is used once, never reused; the C-xxx ties the DESIGN.md entry to the code file. Name the file and its export per CLAUDE.md.
- **`components/module/` → primitives.** A component in `components/module/` (a small self-contained piece: button, card, icon, heading) is a supporting primitive, not a C-xxx. Port it too, since the Layout Components import it, but name it plainly (`Button` → `Button.tsx`), no `C-`.
- **Staging.** Skip a component whose name ends in `Stg`.
- **Flat.** The export's tier folders flatten away; every component lands in one directory.
- **Global CSS.** The export's global CSS becomes Tailwind classes on the component. Nothing from `tokens/components.css` or `base.css` ports as a file. Rules scoped to the export's preview container (`sherframe`) do not port at all.
- **Variant.** A presentational variant (a mirror, a moved label) is whatever the export made it: a prop (like `imageSide`) or a separate named component. Keep the export's choice.
- **Heading level.** A Layout Component should take its level as a `headingLevel` prop that sets the tag only. If one hardcodes its level instead, flag it to add the prop on Claude Design.
- **Assets.** A component that references an asset file (like the Logo's images) points at the export path. Rewire it to the repo's served asset path (`/public/assets/`, referenced as `/assets/<name>`), matching the repo's asset filenames. Where no repo filename matches, use the closest one, or a placeholder path when nothing is close, and say which in the Report.

List a component for saving only when it is fully ready. If a blocker stops it, leave it off the list. A flag is not a blocker: keep a flagged-but-working component on the list and fix it through the Report prompt.

### 4. Save

Write DESIGN.md, then run `design:sync` if it is available (per CLAUDE.md) to export the theme file and tokens, and lint the tokens. If DESIGN.md already exists, see On a Rerun. A failed lint stops the run here, before any component is written.

Then write each listed component to components/ (path in CLAUDE.md), writing one that is new or replacing one that is already there (see On a Rerun).

### 5. Report

Report what the run did: the new or extended components (C-xxx and primitives), any component skipped as blocked, each staging component skipped, each asset name it guessed or replaced with a placeholder, and the DESIGN.md token changes from step 2 (including any corrected values).

Name any component in components/ that DESIGN.md does not document. It is orphaned: no export refreshes it, and any page still importing it renders a frozen version. Say whether a similarly-shaped new component suggests a rename, and list what needs to be updated.

Then give the human one paste-ready prompt for Claude Design. The export regenerates DESIGN.md, the tokens, and the components every time, so any patch this run makes to them is undone on the next export. The prompt fixes the source. Cover only what would otherwise come back:

- a DESIGN.md value that did not match the tokens (step 2 corrected it),
- a prop the doc names that the code does not have (regenerate the prop list from the `.d.ts`),
- a token renamed or removed, and the components it breaks,
- an asset whose name does not match the repo file (rename it to the repo name),
- a component value with no token (add the token, or confirm it is a one-off),
- a Layout Component that hardcodes its heading level (add a `headingLevel` prop),
- a component the export regressed (say what the old version had, so the next export keeps it),
- a component skipped as blocked (name it, say what blocked it, and what to fix so the next export is ready).

If none came up, say so and skip the prompt.

## Output

- The repo DESIGN.md, adopted from the export and reconciled against its tokens, with a list of the token changes.
- New or extended components (Tailwind React, token-bound) in components/: Layout Components as C-xxx, Module Components as plain-named primitives.

## On a Rerun

The export is the base. DESIGN.md and each component are replaced whole, never merged. Follow the `Replace` rule in CLAUDE.md, grouping a component under `components/`.

## Stop Conditions

Stop and report instead of guessing when:

- A required input is missing.
- The export is present but incomplete: a core piece is missing (`DESIGN.md`, `tokens/*.css`, or `_ds_manifest.json`), or the manifest lists a component that has no code.
