---
name: po
description: Draft a product's PRD for one development iteration from the Planning TSV. The plan's In-Progress rows set what this iteration builds and carry its version. Works for any platform, taking the stack from the project. Each run writes a new versioned PRD covering only that iteration's additions, with IDs continuing from the previous version. Outputs one DraftPRD MD file.
---

# PO

Turn the Planning TSV into one iteration's PRD: the build spec for what this version adds — functionality, behavior, data, screens, navigation, and build order. Each run is a new version that carries IDs forward but lists only what's new.

## Run in Chat

With no CLAUDE.md, hand your work back in chat: read the inputs that are here, ask for any required one that's missing, then give back every new file and edit, and say which file each belongs in.

## Inputs

- The Planning TSV (path in CLAUDE.md) — the plan, and the source of truth for this iteration. Rows marked **In Progress** are this iteration's items. `S-` rows are screens, `C-`/`F-` rows seed components and features. Each screen's job and its `functionality` seed the user stories. The `outline` column holds what's on a screen or in a component; the `functionality` column seeds behavior (screens, components) or what-it-does (features). A `functionality` cell can point to another row by URL for a shared behavior; read that row and write the behavior out in full.
- Outline Notation (path in CLAUDE.md) — the notation; needed to read outlines.
- [Optional] The previous FinalPRD (path in CLAUDE.md) — for the running ID maxes in its Active Items list. With none, IDs start at 1.
- [Optional] The Content MD files (path in CLAUDE.md) — to see which screens already have one, so an **Outline** can point to its path.

## Workflow

### 1. Gather

Take the version from the TSV. If the In-Progress label names it, like `In Progress (v3)`, that's this run. If it just says `In Progress`, the version is one below the next version group (a `v4` group → this run is v3).

Read the previous FinalPRD (the highest `…-v<n>` below this run, at the path in CLAUDE.md) for the running US/F/D maxes in its Active Items list. If there is none at that path, those IDs start at 1.

### 2. User Stories

Read the customer capabilities from the In-Progress rows — a screen's job, and the capability-level items (not the behaviors) in its `functionality` (add to cart, filter, check out). Turn those into user stories, and add a secondary story only when a main flow has a gap that needs one — the empty-cart view, or a cart-review step before checkout. Don't back-fill a story for a screen, feature, or behavior you've added — content, policy, and contact pages are required by the plan, not by a story.

### 3. Write the Specs

Build the spec outward from the confirmed user stories and the `C-`/`F-` rows the plan flags for this version — each layer answers the one before it:

- **Features** — what the product must do to deliver the stories, plus the `F-` rows the plan flags for this version. Take the planned ones as seeds and add what the stories still need; combine and de-duplicate per *Granularity*. Each: what it does, when it appears (trigger and route/screen), and how it fails. A story may need several features; a feature may serve several stories.
  - *Granularity* — a feature has substance of its own: it operates on data, runs a flow, or is a capability that recurs across screens (browse, filter, add to cart, checkout, the shipping disclaimer). A single-screen element is a feature too when the plan drives it from its own dedicated data resource — a separate content source with its own D-xxx, not the fields of an entity the screen already shows: a hero carousel fed by Home content is a feature; a product gallery fed by the product's own images is not. Anything else owned by one screen (a sub-step like variant-picking, or chrome like a sticky header or nav menu) isn't a feature; it lives in that screen's or component's Behavior.
- **Data** — for each feature, what the product must store or fetch to power it, and where it lives: the concrete source that holds it (a specific API, store, field, external service, or the app's own config/repo), not a vague "ours vs theirs". Name the source on every resource. When the plan doesn't say where a resource lives, ask — don't assume.
  - *Granularity* — a distinct resource a feature or component reads or writes to drive behavior, at the entity level. Fold a resource's fields and nested objects in (a product's variants, options, images, and attributes are the Product item); keep separate resources separate (product, collection, cart, a config file that drives a component).
- **Screens and Layout Components** — place the features on the In-Progress screens (step 4). Layout Components come from the plan's `C-` rows plus any chrome or drawer that recurs across screens; a recurring behavior is a named Layout Component (C-xxx), not a per-screen feature.
- **Navigation** — each navigation surface (header, footer, menu, tab bar…) and where its items link.
- **Build steps** — the work ordered by dependency: foundation first, then what sits on it.
  - *Granularity* — group work that shares a pattern into one step (all static content pages; all category grids; the global chrome) rather than a step per screen or component. Give a step of its own only to work with real risk or its own logic — the data wrapper, the cart/checkout flow.
  - *Sequencing* — order the phases by the capability each delivers, not by technical layer (all data, then all logic, then all UI). Set up deployment in the foundation so the build stays shippable throughout, and end on a launch-readiness gate (performance, accessibility, QA). Front-load the riskiest integration so unknowns surface early.

ID rules:
- **S-xxx** come from the plan (append-only there). Mint a new one only to fill a key gap (see Screens).
- **C-xxx** name Layout Components — named for their role (`C-Cart`, `C-HeroBanner`), not numbered; each name is used once and never reused. This skill defines the global chrome and drawers.
- **US, F, D** continue from the previous version's maxes in the Active Items list; a retired ID is never reused, and new items take the next number. With no previous FinalPRD, they start at 1.
- **B** numbers from 1 within this version.

### 4. Screens & Layout Components

Write a `### S-xxx — <name>` entry for each In-Progress row; Output shows its five-part shape. The PO writes three parts now — **Outline**, **Feature** (the screen's `F-xxx`), and **Behavior** (start from the row's `functionality`, then add what else it needs). A screen with no feature or no behavior writes `None` on that line. **Outline** points to the Content MD that owns the screen's copy (`Refer to /docs/content/<file>`) when one exists, and carries the row's `outline` verbatim on a backticked line when it doesn't. The last two, **Components** and **Assets**, are placeholders for later hands — each holds `(to be updated later)` on a sub-bullet.

**Write the Layout Components.** Write each Layout Component as a `### C-xxx` entry in the Layout Components section. Copy the `C-` row's `outline` verbatim onto a backticked line. Add its **Behavior** (start from the row's `functionality`, then add what else it needs), plus **Feature** where it applies. A Layout Component takes no Components or Assets line. Put these in the Layout Components section, after Screens.

**Mint a missing screen.** If a confirmed story needs a key screen the plan doesn't have, give it the next S-xxx after the plan's highest, write a stub entry (its name, **Feature**, and **Behavior** from the story) and flag the human to add the row to the plan as In Progress. A stub has no outline yet, so its **Outline**, **Components**, and **Assets** read `(pending planning row)`.

### 5. Extra Details

Most of this section is cross-cutting fallout of the spec you've already written. Read back over the features, data, and integrations and pull out:

- **Connectivity** — the network the product needs, and what breaks without it.
- **Storage** — what it keeps on the client (cookies, session/local) vs the server.
- **Security & privacy** — the sensitive data and secrets it handles, and what it delegates rather than touches.
- **Integrations / external services** — every external service it depends on, gathered in one place.
- **Environment / config** — the env vars and keys those services need.

The rest you declare, not derive:

- **Accessibility** — the standing bar every screen meets.
- **Performance** — the standing performance bar every screen meets (e.g. the Lighthouse target).

Then the ID ledger:

- **Active Items** — the previous version's list, copied forward unchanged. With no previous FinalPRD, write `None`.

### 6. Save

Save the DraftPRD MD file to its path in CLAUDE.md. Name it `prddraft-<product>-v<n>`. Never replace an earlier version. If this run's version already exists, see On a Rerun.

## Output

A Markdown file: the scope blockquote, the title and metadata block, then each numbered section in order, with the Active Items list under Extra Details. A section this version doesn't change reads "No change this version."

````
> **This document defines version v<n> of the product. Earlier versions hold what came before; the Active Items list shows everything in effect now. Page outline and structure live in the Planning TSV; styling lives in the design system file; brand voice lives in the brand doc. Do not add features, screens, or data the plan doesn't call for.**

---

# <Brand> — <Product> Requirements Document

**Platform:** <platform and stack>
**Version:** v<n>

## 1. Main Goals
1. <goal — an outcome this version delivers, from the plan>

## 2. User Stories
| ID | Story |
|---|---|
| US-012 | As a customer, I want to see prices in my local currency so I can shop with confidence. |

## 3. Features
### F-014 — <name>
- **What it does:** …
- **When it appears:** <trigger and route or screen>
- **If something goes wrong:** …

## 4. Data
| ID | Data Item | Source | Details |
|---|---|---|---|
| D-007 | <name> | <the specific API, store, field, or file> | … |

## 5. Screens

### S-011 — <name>
- **Outline:** Refer to /docs/content/s-011_<slug>.md
- **Feature:** None
- **Behavior:**
  - None
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

### S-012 — <name>
- **Outline:** `<the row's outline, verbatim; no Content MD yet>`
- **Feature:** F-015 <name>
- **Behavior:**
  - <interaction>
- **Components:**
  - (to be updated later)
- **Assets:**
  - (to be updated later)

## 6. Layout Components

### C-Cart — Cart Drawer
- **Outline:** `<the C- row's outline, verbatim>`
- **Feature:** F-xxx <name>
- **Behavior:**
  - <interaction>

### C-LogoStrip — Logo Strip
- **Outline:** `<the C- row's outline, verbatim>`
- **Feature:** None
- **Behavior:**
  - None

## 7. Navigation

```
Header — every screen
 ├── <Group>
 │    ├── <Item> → S-002
 │    └── <Item> → S-003
 ├── Logo → S-001
 └── Cart → opens C-Cart

Footer — every screen
 ├── <Group>
 │    └── <Item> → S-009
 └── <Item> → <external URL>
```

(or "No change this version")

## 8. Build Steps
### Phase 1
| Step | What to Build | References |
|---|---|---|
| B-001 | <step> | <IDs> |

## 9. Extra Details
### Connectivity
### Storage
### Accessibility
### Performance
### Security & Privacy
### Integrations / External Services
### Environment / Config
### Active Items
| ID | Name | Status |
|---|---|---|
| US-011 | <the previous version's rows, unchanged> | Active |
````

## On a Rerun

Only a rerun of the same `v<n>` replaces a DraftPRD. Follow the `Replace` rule in CLAUDE.md. Move any FinalPRD for this version there too, since it no longer matches. Then say which one you'd keep and why, and ask which to use as the base. If it's the original, swap them back. Either way, merge in the better parts of the other, one listed change at a time.

## Stop Conditions

Stop and report instead of guessing when:

- A required input is missing.
- An In-Progress `S-` row lacks an `id` or an `outline`.
- The plan has no In-Progress rows — nothing to build this version.
- The plan can't support the core flows — its In-Progress rows are too few to define them, or a main capability they need is absent. Ask; don't invent it. (Complementing stories you may add; a key screen you may mint — see Screens.)
