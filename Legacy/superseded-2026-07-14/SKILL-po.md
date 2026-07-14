---
name: po
description: Draft a product's PRD for one development iteration from the Planning TSV. The plan's In-Progress rows set what this iteration builds and carry its version. Works for any platform, taking the stack from the project. Each run writes a new versioned PRD covering only that iteration's additions, with IDs continuing from the previous version. Outputs one PRD MD file — the Draft PRD the FE later finalises.
---

# PO

Turn the Planning TSV into one iteration's PRD: the build spec for what this version adds — functionality, behavior, data, screens, navigation, and build order. Each run is a new version that carries IDs forward but lists only what's new.

## Running it

Check CLAUDE.md first. If there's no CLAUDE.md at all, hand your work back in chat: read the inputs that are here, ask for the ones that aren't, then give back every new file and edit — and say which file each belongs in. Otherwise follow CLAUDE.md for where outputs go — read the inputs, save new outputs where it says, and change existing files in place.

## Inputs

- The Planning TSV (path in CLAUDE.md) — the plan, and the source of truth for this iteration. Rows marked **In Progress** are this iteration's items. `S-` rows are screens, `C-`/`F-` rows seed components and features. Each screen's job and its `functionality` seed the user stories. The `outline` column holds what's on a screen or in a component; the `functionality` column seeds behavior (screens, components) or what-it-does (features).
- The previous PRD (versioned path in CLAUDE.md), if one exists — for the running ID maxes in its Active Items list.
- outline-notation.md (path in CLAUDE.md) — the notation; needed to read outlines.
- The Content MD files (path in CLAUDE.md), if they exist — the source for a screen's or component's **What's on it**. One whose copy lives in a Content MD points to it; one without lists its contents inline. Optional: with none yet, everything lists inline.

## Workflow

### 1. Gather

Take the version from the TSV. If the In-Progress label names it, like `In Progress (v3)`, that's this run. If it just says `In Progress`, the version is one below the next version group (a `v4` group → this run is v3).

Read the previous PRD (the highest `…-v<n>` at the path in CLAUDE.md) for the running US/F/D maxes in its Active Items list. If there is none at that path, those IDs start at 1.

### 2. User Stories

Read the customer capabilities from the In-Progress rows — a screen's job, and the capability-level items (not the behaviors) in its `functionality` (add to cart, filter, check out). Turn those into user stories, and add a secondary story only when a main flow has a gap that needs one — the empty-cart view, or a cart-review step before checkout. Don't back-fill a story for a screen, feature, or behavior you've added — content, policy, and contact pages are required by the plan, not by a story.

### 3. Write the Specs

Build the spec outward from the confirmed user stories and the `C-`/`F-` rows the plan flags for this version — each layer answers the one before it:

- **Features** — what the product must do to deliver the stories, plus the `F-` rows the plan flags for this version. Take the planned ones as seeds and add what the stories still need; combine and de-duplicate per *Granularity*. Each: what it does, when it appears (trigger and route/screen), and how it fails. A story may need several features; a feature may serve several stories.
  - *Granularity* — a feature has substance of its own: it operates on data, runs a flow, or is a capability that recurs across screens (browse, filter, add to cart, checkout, the shipping disclaimer). A single-screen element is a feature too when the plan drives it from its own dedicated data resource — a separate content source with its own D-xxx, not the fields of an entity the screen already shows: a hero carousel fed by Home content is a feature; a product gallery fed by the product's own images is not. Anything else owned by one screen (a sub-step like variant-picking, or chrome like a sticky header or nav menu) isn't a feature; it lives in that screen's or component's Behavior.
- **Data** — for each feature, what the product must store or fetch to power it, and where it lives: the concrete source that holds it (a specific API, store, field, external service, or the app's own config/repo), not a vague "ours vs theirs". Name the source on every resource. When the plan doesn't say where a resource lives, ask — don't assume.
  - *Granularity* — a distinct resource the product reads or stores, at the entity level. Fold a resource's fields and nested objects in (a product's variants, options, images, and attributes are the Product item); keep separate resources separate (product, collection, cart, page content), and group small config-like bits into one Site config item.
- **Screens & components** — place the features on the In-Progress screens (step 4). Components come from the plan's `C-` rows plus any chrome or drawer that recurs across screens; a recurring behavior is a named component (C-xxx), not a per-screen feature.
- **Navigation** — each navigation surface (header, footer, menu, tab bar…) and where its items link.
- **Build steps** — the work ordered by dependency: foundation first, then what sits on it.
  - *Granularity* — group work that shares a pattern into one step (all static content pages; all category grids; the global chrome) rather than a step per screen or component. Give a step of its own only to work with real risk or its own logic — the data wrapper, the cart/checkout flow.
  - *Sequencing* — order the phases by the capability each delivers, not by technical layer (all data, then all logic, then all UI). Set up deployment in the foundation so the build stays shippable throughout, and end on a launch-readiness gate (performance, accessibility, QA). Front-load the riskiest integration so unknowns surface early.

ID rules:
- **S-xxx** come from the plan (append-only there). Mint a new one only to fill a key gap (see Screens).
- **C-xxx** name reusable components — named for their role (`C-Cart`, `C-HeroBanner`), not numbered; each name is used once and never reused. This skill defines the global chrome and drawers; the FE adds the per-screen blocks in the same family.
- **US, F, D** continue from the previous version's maxes in the Active Items list; a retired ID is never reused, and new items take the next number. With no previous PRD, they start at 1.
- **B** numbers from 1 within this version.

### 4. Screens

Write a `### S-xxx — <name>` entry for each In-Progress row; Output shows its four-part shape. The PO writes three parts now — **What's on it**, **Feature** (the screen's `F-xxx`), and **Behavior** (start from the row's `functionality`, then add what else it needs). A screen with no feature or no behavior writes `None` on that line. **What's on it** points to the Content MD that owns the screen's copy (`Refer to /docs/content/<file>`) when one exists; a dynamic screen with no Content MD lists its contents inline instead, seeded from the row's `outline`. The fourth part, **Components & Assets**, is a placeholder for later hands — it holds `(to be updated later)` on a sub-bullet.

**Write the components.** Write each component as a `### C-xxx` entry. Its **What's on it** follows the same rule as a screen: when a Content MD owns its copy, as with a component whose `outline` is `(same as /page)`, point to that Content MD; otherwise list its content inline, seeded from its `C-` row's `outline`. Add its **Behavior** (from the row's `functionality`), plus **Feature** where it applies. A component takes no Components & Assets line. List components after the screens.

**Mint a missing screen.** If a confirmed story needs a key screen the plan doesn't have, give it the next S-xxx after the plan's highest, write a stub entry (its name, **Feature**, and **Behavior** from the story) and flag the human to add the row to the plan as In Progress. A stub has no outline yet, so its **What's on it** and **Components & Assets** read `(pending planning row)`.

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

Then the running ID ledger, carried forward:

- **Active Items** — a table of every US, F, and D in effect after this iteration, each Active or Deprecated. Start from the previous version's list, add this version's new items as Active, and mark Deprecated any the plan retires.

### 6. Save

Write the PRD MD file to the versioned path in CLAUDE.md, named for the product and this version (`…-v<n>`). Don't overwrite an earlier version.

## Output

A Markdown file: the scope blockquote, the title and metadata block, then sections 1–8, with the Active Items list under Extra Details. A section this version doesn't change reads "No change this version."

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

## 5. Screens & Components

### S-011 — <name>
- **What's on it:**
  - Refer to /docs/content/s-011_<slug>.md
- **Feature:** None
- **Behavior:**
  - None
- **Components & Assets:**
  - (to be updated later)

### S-012 — <name>
- **What's on it:**
  - <inline content; dynamic screen, no Content MD>
- **Feature:** F-015 <name>
- **Behavior:**
  - <interaction>
- **Components & Assets:**
  - (to be updated later)

### C-Cart — Cart Drawer
- **What's on it:**
  - <inline content>
- **Behavior:**
  - <interaction>

### C-Footer — Footer
- **What's on it:**
  - <inline content; links mapped in section 7>

## 6. Navigation

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

## 7. Build Steps
### Phase 1
| Step | What to Build | References |
|---|---|---|
| B-001 | <step> | <IDs> |

## 8. Extra Details
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
| US-012 | Local-currency pricing | Active |
| F-014 | Currency switcher | Active |
| D-007 | Locale | Active |
| F-009 | Single-currency price display | Deprecated |
````

## Stop conditions

Stop and report instead of guessing when:

- A required input is missing: the Planning TSV or outline-notation.md.
- An In-Progress `S-` row lacks a `screen_id` or an `outline`.
- The plan has no In-Progress rows — nothing to build this version.
- The plan can't support the core flows — its In-Progress rows are too few to define them, or a main capability they need is absent. Ask; don't invent it. (Complementing stories you may add; a key screen you may mint — see Screens.)
