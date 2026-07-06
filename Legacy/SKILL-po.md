---
name: po
description: Draft a product's PRD for one development iteration from the Planning TSV, with an optional idea as a steer. The plan's In-Progress rows set what this iteration builds and carry its version. Works for any platform, taking the stack from the project. Each run writes a new versioned PRD covering only that iteration's additions, with IDs continuing from the previous version. Outputs one PRD MD file — the Draft PRD the FE later finalises.
---

# PO

Turn the Planning TSV — and an optional idea — into one iteration's PRD: the build spec for what this version adds — functionality, behaviour, data, screens, navigation, and build order. Each run is a new version that carries IDs forward but lists only what's new.

## Running it

If you can read CLAUDE.md, you're in the repo: work from its paths — read the inputs, save new outputs, and apply this skill's changes to existing files in place. If you can't, you're in a chat: ask for the inputs this skill lists, then hand back everything that changed — new files to save, and edits to existing files for the user to apply — and say which file each change belongs in.

## Inputs

- The idea (optional) — a steer, if the request names one: extra emphasis, scope notes, or a capability the plan doesn't hold yet. The customer capabilities come from the plan, not from here. If none is given, skip it.
- The brand doc (path in CLAUDE.md) — brand positioning, audience, and selling points; grounds the overview, goals, and user stories.
- The Planning TSV (path in CLAUDE.md) — the plan, and the source of truth for this iteration. Rows marked **In Progress** are this iteration's items, and the version rides on that label — `In Progress (v3)` means this run is v3. `S-` rows are screens, `C-`/`F-` rows seed components and features. Each screen's job and its `functionality` seed the user stories. The `outline` column holds what's on a screen or in a component; the `functionality` column seeds behaviour (screens, components) or what-it-does (features).
- The previous PRD (versioned path in CLAUDE.md), if one exists — for the running ID maxes in its Active Items list.
- outline-notation.md (path in CLAUDE.md) — the notation; needed to read outlines and find image slots.
- The stack — from the project (CLAUDE.md or the repo's rules). Ask only if the idea and project both leave it unstated.

## Workflow

### 1. Gather

Take the version from the TSV's In-Progress label — `In Progress (v3)` means this run is v3. Use only the major part (`In Progress (v3.2)` → v3).

Read the previous PRD — the highest `…-v<n>` at the path in CLAUDE.md — for the running US/F/D maxes in its Active Items list. If there is none at that path, those IDs start at 1.

Before writing, verify every S-xxx screen the previous PRD relied on still exists in the plan (see Stop conditions).

Read the customer capabilities from the In-Progress rows — each screen's job and its `functionality` name what the customer can do. Turn each into a US, and add complementing (secondary) stories only where they round out one of those flows (an empty-cart state, reviewing the cart before checkout). Don't back-fill a story for a screen, feature, or behaviour you've added — content, policy, and contact pages are required by the plan, not by a story. The main capabilities must come from the plan, not be invented; an idea, if given, only steers emphasis or scope. Write the rest in one pass.

### 2. Write

Write only what this iteration adds — the new user stories, features, and data, the In-Progress screens, and this version's build order. Earlier items aren't repeated; the Active Items list carries the full active set. A section the version doesn't change reads "No change this version."

Build the spec outward from the confirmed user stories and the `C-`/`F-` rows the plan flags for this version — each layer answers the one before it:

- **Features** — what the product must do to deliver the stories, plus the `F-` rows the plan flags for this version. Take the planned ones as seeds and add what the stories still need; combine and de-duplicate per *Granularity*. Each: what it does, when it appears (trigger and route/screen), and how it fails. A story may need several features; a feature may serve several stories.
  - *Granularity* — a feature has substance of its own: it operates on data, runs a flow, or recurs across screens (browse, filter, add to cart, checkout, the shipping disclaimer). A behaviour owned by a single screen or component — chrome like a sticky header or nav menu, or a sub-step of one screen's main capability like gallery-switching, variant-picking, or an accordion — isn't a feature; it lives in that screen's or component's Behaviour.
- **Data** — for each feature, what the product must store or fetch to power it, and where it comes from.
  - *Granularity* — a distinct resource the product reads or stores, at the entity level. Fold a resource's fields and nested objects in (a product's variants, options, images, and attributes are the Product item); keep separate resources separate (product, collection, cart, page content), and group small config-like bits into one Site config item.
- **Screens & components** — place the features on the In-Progress screens (step 3). Components come from the plan's `C-` rows plus any chrome or drawer that recurs across screens; a recurring behaviour is a named component (C-xxx), not a per-screen feature.
- **Navigation** — each navigation surface (header, footer, menu, tab bar…) and where its items link.
- **Build steps** — the work ordered by dependency: foundation first, then what sits on it.
  - *Granularity* — group work that shares a pattern into one step (all static content pages; all category grids; the global chrome) rather than a step per screen or component. Give a step of its own only to work with real risk or its own logic — the data wrapper, the cart/checkout flow.
  - *Sequencing* — order the phases by the capability each delivers, not by technical layer (all data, then all logic, then all UI). Set up deployment in the foundation so the build stays shippable throughout, and end on a launch-readiness gate (performance, accessibility, QA). Front-load the riskiest integration so unknowns surface early.

Frame it with the overview and goals; bound it with the excluded list and the Active Items list (step 4). Write in plain language and short sentences (grade-5); use technical names only where they're the real ones — the stack, route or screen paths. Output gives the document order and the shape of each section.

ID rules:
- **S-xxx** come from the plan (append-only there). Mint a new one only to fill a key gap (see Screens).
- **C-xxx** name reusable components — named for their role (`C-Cart`, `C-HeroBanner`), not numbered; each name is used once and never reused. This skill defines the global chrome and drawers; the FE adds the per-screen blocks in the same family.
- **US, F, D** continue from the previous version's maxes in the Active Items list; a retired ID is never reused, and new items take the next number. With no previous PRD, they start at 1.
- **B** numbers from 1 within this version.

### 3. Screens

Write a `### S-xxx — <name>` entry for each In-Progress row; Output shows its four-part shape. The PO writes two parts now — **Feature** (the screen's `F-xxx`) and **Behaviour** (start from the row's `functionality`, then add what else it needs). The other two are placeholders for later hands: **What's on it** holds `(FE will update this)`, then a sub-bullet pointing to the row's outline; **Required assets** holds `(Director will update this)` over the image slots; a screen with no generated images gets just `None` on the line — no placeholder, no sub-bullet.

**Write the components.** Write each component as a `### C-xxx` entry — its content inline under **What's on it** (seeded from its `C-` row's `outline` if the plan has one), its **Behaviour** (from the row's `functionality`), plus **Feature** where it applies. List components after the screens.

**Mint a missing screen.** If a confirmed story needs a key screen the plan doesn't have, give it the next S-xxx after the plan's highest, write a stub entry — its name, **Feature**, and **Behaviour** from the story — and flag the human to add the row to the plan as In Progress. A stub has no outline yet, so its **What's on it** and **Required assets** read `(pending planning row)`.

**List required assets.** Read the screen's `outline` and number its top-level sections top to bottom from 1. A `>` child row stays under its parent and gets no number of its own. List a slot only for sections carrying images the Director generates, as `<screen_id>.<n> → <count>x <description>`; when one section holds several generated images, raise the count (e.g. `3x`) instead of giving each image its own number. Skip product grids and product-detail galleries — those render catalogue photos, not generated assets. A screen with no generated images gets `None`.

### 4. Extra Details

Most of this section is cross-cutting fallout of the spec you've already written. Read back over the features, data, and integrations and pull out:

- **Connectivity** — the network the product needs, and what breaks without it.
- **Storage** — what it keeps on the client (cookies, session/local) vs the server.
- **Security & privacy** — the sensitive data and secrets it handles, and what it delegates rather than touches.
- **Integrations / external services** — every external service it depends on, gathered in one place.
- **Environment / config** — the env vars and keys those services need.

The rest you declare, not derive:

- **Accessibility** — the standing bar every screen meets.
- **Features Excluded — Do Not Build** — a table fencing what this version leaves out: the deferred rows (later versions and Backlog) and what the stack owns (e.g. Shopify owns checkout and accounts). Columns: Feature, Target, Notes.
- **Active Items** — the running ID ledger.

Active Items is always written, even if the rest reads "No change this version." It's a table of every US, F, and D in effect after this iteration — `ID`, `Name`, `Status` (Active or Deprecated). Start from the previous version's list, add this version's new items as Active, and mark Deprecated any the idea retires. With no previous PRD, it's just this version's items. The next version reads this for its ID maxes, so retired IDs stay listed.

### 5. Save

Write the PRD MD file to the versioned path in CLAUDE.md, named for the product and this version (`…-v<n>`). Don't overwrite an earlier version.

## Output

A Markdown file: the scope blockquote, the title and metadata block, then sections 1–9, with the Active Items list under Extra Details.

````
> **This document defines version v<n> of the product. Earlier versions hold what came before; the Active Items list shows everything in effect now. Page outline and structure live in the Planning TSV; styling lives in the design system file; brand voice lives in the brand doc. Do not add features, screens, or data the idea and plan don't call for.**

---

# <Brand> — <Product> Requirements Document

**Platform:** <platform and stack>
**Version:** v<n>

## 1. Overview
<one paragraph — what the product is and what this version adds>

## 2. Main Goals
1. <goal — an outcome this version aims for>

## 3. User Stories
| ID | Story |
|---|---|
| US-012 | As a customer, I want to see prices in my local currency so I can shop with confidence. |

## 4. Features
### F-014 — <name>
- **What it does:** …
- **When it appears:** <trigger and route or screen>
- **If something goes wrong:** …

## 5. Data
| ID | What the Product Needs | Details |
|---|---|---|
| D-007 | <name> | … |

## 6. Screens & Components

### S-011 — <name>
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** (Director will update this)
  - S-011.1 → 3-5x Hero Carousel image
- **Feature:** F-014 <name>
- **Behaviour:**
  - <interaction>

### S-012 — <name>
- **What's on it:** (FE will update this)
  - Outline in the Planning TSV
- **Required assets:** None
- **Feature:** F-015 <name>
- **Behaviour:**
  - <interaction>

### C-Cart — Cart Drawer
- **What's on it:**
  - <inline content>
- **Behaviour:**
  - <interaction>

### C-Footer — Footer
- **What's on it:**
  - <inline content; links mapped in section 7>

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
### Security & Privacy
### Integrations / External Services
### Environment / Config
### Features Excluded — Do Not Build
| Feature | Target | Notes |
|---|---|---|
| <feature> | <target> | … |
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

- The plan's In-Progress rows — plus any idea given — name too few capabilities to define the product's core flows.
- A required input is missing: the stack, the brand doc, the Planning TSV, or outline-notation.md.
- An In-Progress `S-` row lacks a `screen_id` or an `outline`.
- An S-xxx screen the previous PRD relied on is missing from the plan or now names a different screen — including a prior mint not yet added. Align the plan first.
- The plan has no In-Progress rows and no idea adds anything new — nothing to build this version.
- Delivering the plan would need a main capability the plan and brand doc don't support — ask; don't invent it. (Complementing stories you may add; a key screen you may mint — see Screens.)
