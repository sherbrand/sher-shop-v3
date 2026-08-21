# SHER Web Store

## General

### How to work

#### Before you touch a file

- `Plan`: Before any edit, read the files it changes and the spec that governs them, then show a short plan. Do not change a file until I say go.
- `Clarify`: If anything is missing or unclear, ask follow-ups until you're confident you know what to build. Do not guess.

#### When writing a file

- `Simple`: Pick the simple option and write the least that does the job. Cut any clause that restates, caveats, or explains what the words already say. Don't add a guardrail, an exception, or what something isn't unless a real gap needs it. Say so when something looks over-built.
- `Plain`: Write in plain language and short sentences at a grade-5 reading level, in everything: docs, specs, and comments. Use US spelling for English. Use technical names only where they're the real ones.
- `Own`: Each spec or skill describes its own job through the artifacts it reads and writes. It does not name other roles or skills. The connections live in each skill's Inputs and Output.
- `Why`: Keep reasoning and "why" in chat. Never put them inside a spec or skill.
- `Dash`: Never two em-dashes in the same phrase, in any file (internal included). Prefer a period or colon.
- `Ref`: Reference another file's section by name, not number. Its numbering drifts as sections are added or reordered. A step number inside the same skill file is fine; it renumbers in place.
- `Path`: Refer to a file by its Name in Files & Folders. Add (path in CLAUDE.md) where the reader needs the path.
- `YAML`: Markdown frontmatter is YAML — quote free-text values (`title`, `description`, a skill's `description`); an unquoted colon breaks it.

#### When replying in chat

- `Push`: Push back only when it matters. Say what breaks or what gets worse, and be confident it's real. If you're unsure, push back only when the damage would be bad, and say you're unsure. Skip flattery.
- `Track`: Track open threads. When any are live, end the turn with a short numbered list: an edit still to apply, or a decision still to make. Drop each once it is applied or decided.
- `Name`: Each rule opens with its one-word name in backticks. Cite the rule you applied as `(rule: Name)`, on the part of the output it produced.

### Coding

- `Reuse`: Before creating a new component, utility, or type, check if it already exists. Avoid duplication — reuse existing code rather than recreating it. When the same pattern appears in two or more places, ask whether to extract it to a reusable component.
- `Envs`: Write code that takes into account the different environments: dev, test, and prod.
- `Scope`: Only make changes that are requested, or that are well understood and related to the change being requested.
- `Fix`: When fixing a bug, do not introduce a new pattern or technology without first exhausting options with the existing implementation. If you do introduce a new approach, remove the old implementation so logic doesn't duplicate.
- `Logs`: Add debug logs to logic and data code so it's easy to trace. Skip them in pure presentational components. Comment code for readability everywhere.
- `Clean`: Before opening a PR, remove every debug log you added to chase the problem. Logs that belong in logic and data code stay.
- `Scripts`: Avoid writing scripts in files if possible, especially if the script is likely to be run only once.
- `Size`: Avoid code files over 200–300 lines. Refactor at that point.
- `Mock`: Mocking data is only for tests. Never mock or stub data in dev or prod.
- `DotEnv`: Never overwrite the `.env` file without first asking and confirming.

### Design

- `Tiers`: Components come in two tiers: Module primitives like Button and Card, and Layout Components built from them like a feature row or category grid.
- `Cxxx`: A C-xxx is the ID of a Layout Component: `C-` plus its role or shape name (C-Cart, C-HeroBanner). Each name is used once, never reused. Module primitives take no C-xxx.
- `Spec`: `/app/tokens.css` owns the tokens. DESIGN.md describes them and documents every component (the Components section: each component and the tokens it uses). Component code lives in `/components/`; a Layout Component's C-xxx ties its doc entry to its code file.
- `Pair`: The DESIGN.md component docs and the component code stay in sync. Change both together. Wiring a page section to a Layout Component references it by its C-xxx.
- `Heading`: When building a page, set each section heading's level from its Content MD section — the notation marks H1–H4, and the level sets the HTML tag only, not the style.
- `Element`: Ask whether to update the design spec when introducing a new design system element: a color, typography level, spacing token, rounded value, or reusable component.
- `Icons`: See the design spec for icon library and defaults. Do not write custom SVGs unless explicitly requested.
- `Tokens`: `/app/tokens.css` is ported whole from the Claude Design export. Never hand-edit it, and never define a token anywhere else. Load it before the Tailwind entry, and keep `/app/base.css` inside `@layer base` so utilities still win.
- `Fonts`: Load the brand fonts with `next/font/google` in `app/layout.tsx`, and bind them to `--font-display` and `--font-body`. Never `@import` a webfont in CSS.

### Writing

- `Copy`: Take user-facing text from the Content MDs and the FinalPRD. Do not write new copy in the repo. Ask when a label is missing.

## Stack: Next.js + Shopify Headless

### Tech Stack

- Next.js 15 (App Router)
- TypeScript (strict mode)
- Tailwind CSS v4
- Shopify Storefront API (GraphQL)
- Shopify hosted checkout
- Shopify hosted customer accounts
- Vercel deployment

### Shopify MCP Tools

When available, use the Shopify MCP tools to look things up before guessing:

- `introspect_admin_schema` — check the Shopify Admin API GraphQL schema.
- `search_dev_docs` — search Shopify developer documentation.

Use these tools to confirm field names, query shapes, and API behavior instead of relying on memory.

### Next.js App Router

**React Server Components first.**

- Every component is a Server Component by default.
- Only add `'use client'` when the component needs interactivity.
- Interactive elements that need `'use client'`: cart buttons, quantity selectors, wishlist toggles, search/filter controls, mobile menu toggle.
- Product pages, collection pages, and any SEO-critical page must be Server Components.
- Product data fetching happens in Server Components, never in `useEffect`.

**File conventions.**

- Every route folder must have `page.tsx`.
- Add `error.tsx`, `loading.tsx`, and `not-found.tsx` alongside each `page.tsx`.
- Use `loading.tsx` with Suspense skeletons, not blank screens.
- All reusable components live in `/components/` (flat, no subfolders). Name a Layout Component's file for its C-xxx (`C-FeatureSplit.tsx`) and a Module primitive's file for its plain name (`Button.tsx`); each exports the plain component name (`FeatureSplit`, `Button`).

### Storefront API

**Single fetch wrapper.**

- Create one `shopifyFetch()` function that handles all Storefront API requests.
- This wrapper handles: the GraphQL POST, auth headers (`X-Shopify-Storefront-Access-Token`), error parsing, and response typing.
- Every Storefront API call goes through this wrapper. No direct `fetch()` calls to Shopify elsewhere.

**GraphQL queries.**

- Request only the fields you need. No over-fetching.
- Keep all GraphQL query strings in `/lib/shopify/queries/`.
- Keep all GraphQL mutation strings in `/lib/shopify/mutations/`.
- Type all query responses. No `any`.
- Shopify uses cursor-based pagination only (no page numbers). This works with any UI pattern including infinite scroll.

### Cart

**Cart ID.**

- Store the Shopify cart ID in a cookie.
- Create the cart on first add-to-cart, not on page load.
- The cookie persists the cart across page navigations and browser refreshes.

**Cart mutations.**

- Use Next.js Server Actions for cart add / remove / update operations.
- Do not create API routes just for cart mutations — Server Actions are simpler.
- After every cart mutation, revalidate the cart data.

**Checkout.**

- Redirect to Shopify hosted checkout via the cart's `checkoutUrl`.
- Do not build a custom checkout. Shopify Checkout handles payment, tax, shipping, and discounts.

### Server Actions and Data Fetching

**Server Actions.**

- Use Server Actions for all data mutations (cart, wishlist, customer actions).
- Server Actions keep mutation logic next to the UI that triggers it.
- Server Actions handle CSRF protection automatically.

**Revalidation.**

- After mutations, use `revalidatePath` or `revalidateTag` to refresh stale data.

### SEO and Structured Data

**Metadata.**

- Every product page and collection page must use `generateMetadata`.
- Include: title, description, Open Graph image, canonical URL.
- Category/collection pages need proper pagination metadata.
- No client-side-only rendering for any content search engines need to index.

**Structured data.**

- Every product page must include JSON-LD `Product` schema.
- Include: name, description, image, price, currency, availability.
- Place JSON-LD in a `<script type="application/ld+json">` tag in the page's Server Component.

### Performance

**Images.**

- Use `next/image` for all product and collection images.
- Set proper `width`, `height`, and `sizes` attributes.
- Use Shopify CDN URLs directly — they already support responsive sizing via URL parameters.

**Suspense.**

- Wrap async data-fetching sections in `<Suspense>` with skeleton fallbacks.
- Show skeleton UI that matches the final layout shape.

**Bundle size.**

- Keep client-side JavaScript minimal — Server Components do not add to the JS bundle.
- Only the small interactive pieces (`'use client'` components) ship JavaScript to the browser.
- Lazy load non-critical client components with `next/dynamic`.

### TypeScript and Code Style

**TypeScript.**

- `strict: true` in `tsconfig.json`.
- No `any`. Type everything.
- Explicitly type function return values.

**Exports.**

- Use named exports for components and utilities.
- No default exports, except for Next.js framework files that require them as defaults: `page.tsx`, `layout.tsx`, `error.tsx`, `loading.tsx`, `not-found.tsx`.
- No barrel `index.ts` files.

**Imports.**

- Use absolute imports from the `@/` alias configured in `tsconfig.json`.
- Never use relative imports like `../../components/...`.

**Styling.**

- Tailwind CSS only. No CSS modules, styled-components, or inline styles.
- No custom CSS files unless absolutely necessary and scoped.

### Security

- Never import server-side secrets (`SHOPIFY_STOREFRONT_ACCESS_TOKEN`, webhook secrets) in `'use client'` components.
- All Shopify API calls must happen server-side (Server Components, Server Actions, or API routes).
- Don't expose sensitive information in client-side JavaScript bundles.

## Project: SHER Web Store

The SHER web store lives at `sherbrand.co`.

### Files & Folders

Each file or folder and the job it owns.

| Name | Path | Owns |
|------|------|------|
| Claude Repo | `/CLAUDE.md` | The repo's rules and this index |
| Design MD | `/DESIGN.md` | The design system, and what each component is |
| Tokens CSS | `/app/tokens.css` | Every design token |
| Base CSS | `/app/base.css` | The site's document defaults |
| components/ | `/components/` | Every component the site uses |
| assets/ | `/public/assets/` | Every asset the site serves |
| content/ | `/docs/content/` | The final page content |
| FinalPRD | `/docs/prdfinal-shershop-v<n>.md` | The build spec for one version, filled in |
| Outline Notation | `/docs/outline-notation.md` | The layout grammar |

### Conflict Rules

- FinalPRD is the authority for US, F, and D IDs, in its Active Items list.

