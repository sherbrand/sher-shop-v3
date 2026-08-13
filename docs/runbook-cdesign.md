# Runbook: Claude Design

## Objective

Turn the brand, style, and DraftPRD into a working design system in Claude Design: tokens, components, a DESIGN.md, and laid-out pages. The export feeds the UI skill, which adopts it into the repo: the repo DESIGN.md, the C-xxx components, and their primitives. This runbook ends at the export.

**Note:** On the word "project", in Claude Design a container is called a *project*. It comes in two types:

- **Design System** — solo, one living workspace.
- **Project** — stable versions, many consumers, sharing.

This runbook uses the **Design System** type. Below, "the Design System" means that container.

|  |  |
|---|---|
| **Run this when** | The DraftPRD has a Layout Components section and a Navigation section, and Style MD is filled in (some "None yet" is fine). Steps 1 to 3 seed the system once. Steps 4 and 5 repeat per page and as needed. |
| **Time** | 60 to 120 minutes to seed. Then per page after that. |
| **Owner** | You. |

## Deliverable

A downloaded zip design system: DESIGN.md, tokens, the manifest, and the components. This is what the UI skill reads. You are done when steps 1 to 3 are done, every page you need is laid out and audited clean, and the zip is exported.

---

## Before you start

- [ ] A Claude Design account, and a new Design System open.
- [ ] Files ready to upload: `brand-sher.md`, `style-sher.md`, the three logos (black monogram, white square, black square), the DraftPRD (with its Layout Components, F-xxx, and Navigation sections), `outline-notation.md`, and the page content MDs (S-xxx). Once FE has renamed it, upload the FinalPRD instead.
- [ ] This runbook, with the five prompts below.

---

## Steps

### 1. Set up and seed the Design System

Create a new Design System in Claude Design. Fill Company Description and upload the files, then send the Notes and design instruction below as one prompt. It resolves every "None yet" and builds the components.

**Company Description**

```
SHER v2
```

**Uploaded Files**

```
- Style MD
- Brand MD
- Logo x3
- PRD MD
- Outline Notation MD
```

**Notes**

```
Attached:
- Brand MD — brand guide: voice, audience, copy tone.
- Style MD — visual style: palette, type, feel. "None yet" = an open decision for you to propose.
- Logo x3  — black monogram logo, white square logo, black square logo
- PRD MD  — the product spec. Use ONLY these parts: the Layout Components section (each C-xxx component's name, what's on it, and behavior), the F-xxx features those components reference (to understand their behavior), and the Navigation section. Ignore everything else.
- Outline Notation MD — the layout grammar each component's Outline is written in; use it to read them.

Design the SHER design system from these. Build it as a reusable, token-driven component system — I'll hand it to Claude Code (Next.js + Tailwind) after, so keep it clean and reuse the same pieces across sections. Build the Layout Components listed in the PRD's Layout Components section. Name each one after its PRD C-xxx without the C- prefix (C-Cart → Cart), following what's on it and behavior — using each component's referenced F-xxx to elaborate that behavior. Do not create a separate component for an F-xxx, a feature, or a screen; those are built later, when the screens are built. Do not build any UI kit. Organize components in the Design System tab into two groups: Module Components (small, self-contained pieces) and Layout Components (full-width page bands plus chrome and overlays). Every heading in a Layout Component takes its level (h1–h4) as a prop that changes only the HTML tag, not the style. Design responsively across mobile, tablet, and desktop.

Wherever Style MD says "None yet" (background, surface/text colors, type sizes, spacing rhythm, content width), propose options with a short reason, drawing on Brand MD's voice and audience to guide the call. Every text/background pair must pass WCAG AA.

Organize the Design System tab into these groups, one card per sub-concept (split by concept, not token count):
- Brand — Logo; Taglines & Voice
- Colors — Core Palette; Approved Pairs (WCAG AA)
- Type — Display; Body; Type Scale
- Spacing — Spacing Scale; Radius & Depth
- Module Components — one card per family of related primitives, not one per component
- Layout Components — one card per component (bands, chrome, overlays); only drawers/overlays may share a card
```

### 2. Normalize the workspace

Paste these two prompts in order. The first fixes tags, groups, names, and folders; the second sets the component and layout rules.

```
Remove every @startingPoint tag so components appear only in the Design System gallery, not in a separate Starting Points picker.

Additionally, add a @dsCard tag to every Page so it appears in the Design System tab, except thumbnail.html. Put all Pages in a Pages group. Then order the Design System groups so Module Components is fourth-last, Layout Components third-last, Pages second-last, and Reference last (adjust the numeric group prefixes accordingly). Add this as a standing rule in CLAUDE.md so every future Page gets a @dsCard tag too.

Add a Reference group after Pages, holding two cards that surface the project's inputs and rules. Both are viewport="1600x900", full-width, body scrollable (overflow-y: auto) with 2 columns max. guidelines/sources.card.html — a scannable manifest (not a reader) of every uploads/ file, grouped by kind, showing its front-matter title. Link each filename to open it. guidelines/rules.card.html — the standing rules from the root CLAUDE.md, each ## heading with its body in file order, with a link to CLAUDE.md at the top. Add this as a standing rule in CLAUDE.md so every export regenerates the Reference group and its cards.

Name every component so the name works as a code identifier: start with a letter, use letters and digits only, no spaces, dashes, punctuation, or symbols, and make each name unique across the whole system. The gallery card label can stay decorative — dashes and parentheses are fine there, just not in the name. Add this as a standing rule in CLAUDE.md so every future component follows it too.

Put every component in exactly two folders: components/module/ for Module Components (small, self-contained primitives) and components/layout/ for Layout Components (full-width page bands, chrome, and overlays). Never use semantic subfolders. Add this as a standing rule in CLAUDE.md so every export keeps the two-folder layout.
```

Then paste this:

```
For a variation of a component that changes only its optional content or layout (with or without a title, zero to two buttons, a left/right mirror), it belongs as a prop on that component — never a duplicate component or one-off page markup. But while we're still exploring a direction, do not add the prop yet: prototype the variation inline on the page, and ask me before touching the shared component. Only once I confirm the variation should be kept do you formalize it as a prop. A prop is not "done" until it is (1) typed in the component's .d.ts, (2) described in its .prompt.md, (3) reflected in DESIGN.md, and (4) demonstrated as a visible state/variant in that component's @dsCard card, and (5) summarized in that card's subtitle as (propName = value1, value2 | propName2 = …). When a prop is removed, strip it from all five in the same pass. A genuinely different shape is its own component. Add this as a standing rule in CLAUDE.md so every future variation follows it too.

Every visual value must come from a design-system token, and every UI element from an existing system component — never hardcode a raw value (color, size, space, radius, shadow, timing, tracking) or rebuild a component in page markup. Prefer stepped sizes over fluid clamp, drive responsive changes with container queries at the system breakpoints (never viewport units), and if a needed token is missing, add and document it in the system first, then reference it. Never measure width in JavaScript, and never take a breakpoint as a prop. Genuinely non-scale values (ch measures, aspect-ratio, frame widths, breakpoints) are exempt. Add this as a standing rule in CLAUDE.md so every page and component follows it too.

A layout component must be self-contained: everything that sets how it looks and how it responds (including its column counts, breakpoint behavior, and content and text max-widths) lives inside the component, driven by CSS container queries on its own width. A page may only place the component (outer margins, a background band) and pass props. If a placement needs a different value, expose it as a prop or a documented CSS custom property with a sensible default — never !important over the component's inline styles. Staging is exempt: explore freely there, and turn any override into a prop or custom property when you promote to Main. Add this as a standing rule in CLAUDE.md so every future layout component follows it too.
```

### 3. Generate DESIGN.md

Paste this after the build. A fresh export ships `readme.md` but no DESIGN.md, so you ask for one. The schema is written into the prompt so Claude Design does not fall back to an old format. When it is done, confirm it actually created DESIGN.md and made `readme.md` identical.

```
Now add a DESIGN.md at the project root in the DESIGN.md format. Do not fetch anything and do not rely on any remembered version of the spec — follow the schema written out below exactly.

YAML front matter — use only these token groups, in this shape:

  version: alpha
  name: SHER
  description: <one short line>
  colors:
    <name>: <CSS color>              # raw palette values, e.g. from tokens/colors.css
    <name>: "{colors.<name>}"        # semantic aliases as token references
  typography:
    <style-name>:                    # composite type styles, e.g. display-1, display-2, h1, h2, h3, h4, body, eyebrow
      fontFamily: <string>
      fontSize: <number+unit>
      fontWeight: <number>
      lineHeight: <number or number+unit>
      letterSpacing: <number+unit>
  rounded:
    <name>: <number+unit>            # e.g. sm, md, lg
  spacing:
    <name>: <number+unit>
  components:
    <ComponentName>:
      backgroundColor: "{colors.<name>}"
      textColor: "{colors.<name>}"
      typography: "{typography.<style>}"
      rounded: "{rounded.<name>}"
      padding: <number+unit>

Rules for the front matter:
- These are the ONLY token groups: colors, typography, rounded, spacing, and components. There is no group for shadow or motion.
- Component property keys are limited to: backgroundColor, textColor, typography, rounded, padding, size, height, width.
- Reference other tokens with {path.to.token} (e.g. "{colors.text}").
- Every value must match tokens/*.css exactly. Add no new values.
- Build the typography styles as composite objects that match the Heading component's sizes, pulling fontFamily / fontSize / fontWeight / lineHeight / letterSpacing from tokens/*.css.
- Map the semantic color aliases (--color-*) as token references to the raw palette.

Prose sections below the front matter — use ## headings, only these names, in exactly this order (skip any that don't apply, but never reorder):
Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts.
- Put shadow/depth guidance in "Elevation & Depth" and motion guidance in "Layout", since neither has a token group.
- In "Components", list each Module and Layout Component with the tokens and key props it uses.

Scope: design system only — tokens, components, visual and layout guidance. Do not put brand voice, audience, or imagery direction in DESIGN.md; those stay in the Brand cards and the uploaded brand guide.

Make readme.md identical to DESIGN.md (same content), so the design system shows in the Design System interface.

Then add a standing rule to CLAUDE.md: every export regenerates DESIGN.md in exactly this format and keeps readme.md identical to it.
```

### 4. Lay out each page

Run this once per page. Swap `S-xxx` for the page you are laying out. It builds the page and adds a device switcher.

If a layout or copy does not work once you see it rendered, go back and edit that page's content MD in the working folder, then re-run this step.

```
Attached:
- S-xxx MD — the page's content: sections, copy, links. Lay this out. Curly braces mark data: drop them when a whole bullet is wrapped, and substitute a plausible value when they sit inside a sentence.
- Outline Notation MD — the layout grammar S-xxx is written in; use it to read the layout.

Design S-xxx as an editable standalone page, composing the system's components, at the project root — save it as s-xxx_<name>.html, using the same slug as the attached content MD (e.g. s-001_home.html), and add a @dsCard tag. Reuse existing design-system components where they fit; build any PRD-defined component the system lacks (headers, drawers, pills, toggles) as a proper new component — .jsx, .d.ts, .prompt.md, and an @dsCard card, classified Module or Layout and saved in components/module/ or components/layout/ accordingly — not one-off page markup. From the PRD MD, read the Screens section's ### S-xxx entry for this page's features (F-), behavior, and components/drawers (C-), and the Navigation section for link targets; wire up the behaviors it lists (filters, toggles, drawers, carousels) as working interactions.

Add a floating device switcher: Mobile / Tablet / Desktop / Wide buttons, a Main / Staging toggle, and a button that rotates the panel between the four corners. Make the switcher as small as possible — icon-only, no text labels, with aria-label/title tooltips on each.

Build the centered preview frame as a device-accurate, scrollable frame, not a fluid box. Take each class's width from the design system's breakpoints and pair it with a fixed portrait height set here (mobile 844, tablet 1112). Desktop fills the stage up to a maximum of 1440 wide, at full height. Wide fills the stage between 1440 and 1920 wide, at full height, for checking max-width and container behavior above the top breakpoint. Set the frame's container-type: size so component layout can respond to both its width and height. When the frame is taller or wider than the screen, the gray stage scrolls in that axis to reveal it at true 1:1, no scaling.

Main follows S-xxx's layout faithfully; Staging may diverge as an alternate direction.
```

As you iterate, keep the system DRY:

- **Extract a repeated block** into a reusable Layout Component, then swap the inline markup for it.
- **Change a value at the system level**, not on one page, so it spreads. Ask Claude Design to find the lever first, and to stop and ask if more than one lever would change different amounts.
- **Name a Staging-only component with an `Stg` suffix** (e.g. `HeroCarouselStg`), so it stays out of the repo. Drop the suffix when you promote it to Main.

### 5. Audit

After pages exist, audit the system against its rules. Each prompt flags anything needing my decision and does not redesign.

Run the Style MD audit when the style brief changes:

```
Audit the whole design system against uploaded Style MD. Re-read it, then check every token file, component, and Page (including the Pages' inline CSS) against it — especially which typeface each text role uses, plus casing, colors, spacing, and radius. Show me a table of deviations (file · current · required · fix) before changing anything, and flag any rule that's ambiguous or that you decided for me
```

Run the CLAUDE.md audit when components or pages changed:

```
Audit the system against CLAUDE.md. Run these two audits in order. Complete and report each one fully before starting the next.

AUDIT 1 — Components and pages: reuse, override safety, and structure.

1. Reuse: flag any page markup that rebuilds something a system component already does, and any repeated inline pattern that should be a component. Do not extract it yourself; list it for my call.
2. Override safety: flag component inline styles that a page tries to override in CSS (the inline style wins). Each needs a documented --custom-property hook; list them, do not add the hooks yourself.
3. Structure: confirm every component is directly in components/module/ or components/layout/, every name is a valid code identifier and unique, every page except thumbnail.html has a @dsCard in 7. Pages, the Reference group holds sources.card.html and rules.card.html, and the group numbering order is intact. Fix a misplaced file or wrong group order; flag a name collision for my call.

AUDIT 2 — CSS values: tokens, stepped sizes, responsive method, and contrast.

1. Tokens: find every hardcoded color, font-size, spacing, radius, shadow, tracking, or timing value in components and pages. ch measures, aspect-ratio, breakpoints, and frame sizes are exempt. Fix each by swapping in the right token; if the token is missing, flag it, do not invent one.
2. Stepped sizes: list every --fs-* alias each page references, and confirm each is defined in all three #root blocks (base / 640 / 1024). Flag any alias referenced but not stepped.
3. Responsive method: flag any viewport @media, vh/vw, or fluid clamp() in pages or components, and fix it to @container at the matching system breakpoint. Flag any that can't be swapped mechanically.
4. Contrast: list every text-color-on-background pair in use and its ratio. Flag anything under 4.5:1 (or 3:1 for text ≥24px). Change no colors: a failing pair is my decision. Confirm --text-muted and --primary are used only for hairlines, borders, and fills, never text.
```

### 6. Export and hand off

Run this before every export:

```
Check the system is in sync before export.

1. Prop docs: for every component, build a matrix of each prop in its .jsx signature against (a) .d.ts, (b) .prompt.md, (c) DESIGN.md, (d) a visible state in its @dsCard card, (e) that card's subtitle in (propName = value1, value2 | …) form. Mark props missing any of the five, and props documented but no longer in the code. Fix only a doc entry you can copy straight from the code; flag anything else.
2. Dead references: flag any src, href, var(--…), or component name in pages/cards/docs that no longer resolves. Remove or repoint only where the fix is obvious; flag ambiguous ones.
3. Docs: confirm readme.md is byte-identical to DESIGN.md, and DESIGN.md's front matter matches tokens/*.css exactly with no invented values. Fix readme.md to match, and correct any front-matter value to its token; flag an invented value with no token. Flag any token declared more than once in tokens/*.css: the last one wins, so it may resolve to the wrong value.

Then run check_design_system and report it clean.
```

Download the design system as a zip.

The zip should hold `DESIGN.md`, `tokens/*.css`, `_ds_manifest.json`, and the component folders. If DESIGN.md is missing, you skipped step 3; run it and export again.

The zip also carries Claude Design's own files: a `sher-design` SKILL.md and a thin project `CLAUDE.md`. **Do not port either.** The repo ignores them.

---

## Troubleshooting

**Claude Design builds a component the DraftPRD did not list**
It read an F-xxx or a screen as a component. Remind it: F-xxx elaborates behavior only; components come from the Layout Components section.

**DESIGN.md comes out in an old format**
It fetched or remembered a stale spec. Re-run step 3 with the schema pasted in full, and tell it not to fetch.

**A value in DESIGN.md does not match the tokens**
The CSS is the truth. Point at the line and have it fix the value to the CSS.

**A page change did not spread to other pages**
You changed one page, not the system. Redo it at the token or component level.

**Names break on hand-off**
A component name has a space, dash, or symbol. Re-run the naming rule from step 2.
