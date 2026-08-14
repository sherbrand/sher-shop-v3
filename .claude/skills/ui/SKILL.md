---
name: ui
description: "Harvest a Claude Design export into the repo: port its token CSS as the repo's token layer, and port each component as Tailwind React bound to those tokens, Layout Components as reusable C-xxx and Module Components as supporting primitives. Reads the export (tokens/*.css, the token manifest, and the components); writes the token CSS, the base CSS, and the components, plus DESIGN.md as a bonus doc. Reports any token renamed or removed, since code outside the components may still use the old name."
---

# UI

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

### 1. Write CSS Files

Read `tokens/*.css`, `_ds_manifest.json`, and the Module and Layout components. Read the existing components if they exist. The export's token CSS becomes the repo's token layer, so every token the components read is defined. Two files come out:

- **tokens.css** (path in CLAUDE.md). Join `colors.css`, `typography.css`, and `spacing.css` into one file, in that order. Keep their comments: they carry the contrast ratios and the reasons behind off-grid values. Change no value and rename no token.
- **base.css** (path in CLAUDE.md). Port `base.css` with three edits:
  - Wrap every rule in `@layer base`. Unlayered CSS beats every Tailwind layer whatever its specificity, so an unwrapped element rule overrides the classes the components set.
  - Drop every rule scoped to the export's preview container (`sherframe`). It names the export's own preview shell, so the rule never matches in the repo. Report any token those rules set, since the app has to set it instead.
  - Drop every helper class no ported component uses, like an eyebrow or a footer grid class. Step 2 turns those styles into Tailwind classes on the component, so the class here is dead.

Two files do not port:

- `fonts.css` loads webfonts over the network. The app loads fonts its own way, per CLAUDE.md's stack rules.
- `components.css` holds class rules. Step 2 turns each one into Tailwind classes on the component that used it.

Write both files. They are loaded once, at the app root, tokens.css before the app's Tailwind entry. Say so in the Report; the app owns that file, not this skill.

### 2. Port Components

A token change from step 1 ports every component in the export, whatever the request named.

Port each component to a Tailwind React component, one to one: map its styles and CSS-var tokens to Tailwind classes bound to the token CSS from step 1, and keep its props from its `.d.ts` one to one. A value with a token binds to it; a value with no token stays as-is and gets flagged for the Report's fix prompt. Type each per CLAUDE.md. Reuse before creating: if an existing component is the same, reuse it. The two tiers are named differently:

- **`components/layout/` → C-xxx.** A component in `components/layout/` (a full-width band, chrome, or overlay) is a reusable C-xxx: `C-` plus its name in the export (`Hero` → `C-Hero`). The export's card may tag a component with an F-xxx feature ID. That is not its name. Every `components/layout/` component becomes a C-xxx, whatever the card calls it. These are what pages compose. A name is used once, never reused. Name the file and its export per CLAUDE.md.
- **`components/module/` → primitives.** A component in `components/module/` (a small self-contained piece: button, card, icon, heading) is a supporting primitive, not a C-xxx. Port it too, since the Layout Components import it, but name it plainly (`Button` → `Button.tsx`), no `C-`.
- **Staging.** Skip a component whose name ends in `Stg`.
- **Flat.** The export's tier folders flatten away; every component lands in one directory.
- **Global CSS.** The export's class rules become Tailwind classes on the component. Nothing from `components.css` or `base.css` ports into a component as a class name.
- **Variant.** A presentational variant (a mirror, a moved label) is whatever the export made it: a prop (like `imageSide`) or a separate named component. Keep the export's choice.
- **Heading level.** A Layout Component should take its level as a `headingLevel` prop that sets the tag only. If one hardcodes its level instead, flag it to add the prop on Claude Design.
- **Assets.** A component that references an asset file (like the Logo's images) points at the export path. Rewire it to the repo's served asset path (`/public/assets/`, referenced as `/assets/<name>`), matching the repo's asset filenames. Where no repo filename matches, use the closest one, or a placeholder path when nothing is close, and say which in the Report.

List a component for saving only when it is fully ready. If a blocker stops it, leave it off the list. A flag is not a blocker: keep a flagged-but-working component on the list and fix it through the Report prompt.

Write each listed component to components/ (path in CLAUDE.md), writing one that is new or replacing one that is already there (see On a Rerun).

### 3. Write DESIGN.md

DESIGN.md (path in CLAUDE.md) describes the design system for a reader. It is a bonus output, so write it last, and a problem here does not fail the run.

Adopt the export's DESIGN.md; do not rewrite it from scratch. Make four changes:

- **Say what it is.** Add a line at the top: tokens.css holds the tokens, and DESIGN.md only describes them.
- **Tie the doc to the code.** In the Components section, name each Layout Component by its C-xxx and each primitive by its plain name, so each entry ties to its code file.
- **Drop staging.** Leave a staging component out of the YAML `components:` block and the Components section.
- **Keep it design-only.** DESIGN.md holds tokens, components, and visual and layout guidance. Drop any brand voice, audience, or imagery that leaked in; those live in their own files (paths in CLAUDE.md).

Do not correct it. Compare it instead, and name what does not match in the Report:

- **Values.** Compare each token value in the YAML front matter against tokens.css. Match each one by value, not by name: the YAML writes a short name (`borderStrong`) where the CSS writes a long one (`--sher-border-strong`). Leave pointers alone: a YAML value like `{colors.background}` and a CSS `var(--sher-background)` are the same pointer, both correct. Flag any YAML value with no token behind it, like a line height that is not in the tokens.
- **Props.** Compare each component's prop list in the Components section against its `.d.ts`. The `.d.ts` wins.

### 4. Report

Open with one line counting what came across, and on a rerun what was already in sync and which files were rewritten. Then three lists: what did not port, what the run assumed, and the numbered flags. Then one paste-ready prompt for Claude Design, and a close naming which flags it fixes and what each of the rest needs. Leave out a list with nothing in it. See Output for the format.

Then in plain sentences, for each orphan: whether a similarly-shaped new component suggests a rename, and what would need updating.

The export regenerates the tokens and the components every time, so any patch this run makes to them is undone on the next export. The prompt fixes the source, so cover only what would otherwise come back.

## Output

- tokens.css, the export's token CSS joined into the repo's token layer.
- base.css, the export's document defaults with the preview-only and folded-in rules removed.
- New or extended components (Tailwind React, token-bound) in components/: Layout Components as C-xxx, Module Components as plain-named primitives.
- DESIGN.md, adopted from the export as a bonus doc.

The Report:

```
18 of 20 C-xxx and 16 of 16 primitives in sync. Rewrote base.css and 6 components; tokens.css unchanged.

Did not port:
* HeroCarouselStg (staging)
* C-Sizing (see flag 1)

Assumed — tell me if any is wrong:
* Logo wanted logo-mark.png; used /assets/logo-icon-black.png
* Kept the existing Divider.tsx; the export's version is the same

Flags — each needs someone to act:
1. C-Sizing blocked (its .d.ts lists no props)
2. C-FeatureColumns is orphaned
3. --gutter no longer steps; the app layout must set it
4. --space-4 renamed to --spacing-4; code outside components/ breaks
5. DESIGN.md h2 fontSize 2.0rem does not match --size-section-lg 2.1rem

Prompt — paste to Claude Design:
* Rename the Logo asset to logo-icon-black.png
* Give C-Sizing its props, or say it is content-only
* Set DESIGN.md h2 fontSize to 2.1rem, from --size-section-lg

That fixes flags 1 and 5. Left over:
* Flag 2 is yours to retire
* Flag 3 is for the app layout
* Flag 4 needs a sweep of code outside components/
```

## On a Rerun

The export is the base. Every file, including base.css, is replaced whole, never merged. Skip a file that would come out identical; it needs no replacing. Follow the `Replace` rule in CLAUDE.md, grouping a component under `components/`.

## Stop Conditions

Stop and report instead of guessing when:

- A required input is missing.
- The export is present but incomplete: `tokens/*.css` or `_ds_manifest.json` is missing, or the manifest lists a component that has no code.
