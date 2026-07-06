# SHER Web Store

## General

### Important rules

- Write in plain language and short sentences — grade-5 reading level — in everything: docs, specs, and comments. Use technical names only where they're the real ones.
- Always add debug logs and comments in the code for easier debug and readability.
- Every time you apply a rule, explicitly state the rule in the output. Abbreviate to a single word or phrase if needed.
- Do not make any changes until you have 95% confidence that you know what to build. Ask follow-up questions until you reach that confidence.

### Coding

- Always prefer simple solutions.
- Before creating a new component, utility, or type, check if it already exists. Avoid duplication — reuse existing code rather than recreating it. When the same pattern appears in two or more places, ask whether to extract it to a reusable component.
- Write code that takes into account the different environments: dev, test, and prod.
- Only make changes that are requested, or that are well understood and related to the change being requested.
- When fixing a bug, do not introduce a new pattern or technology without first exhausting options with the existing implementation. If you do introduce a new approach, remove the old implementation so logic doesn't duplicate.
- Keep the codebase clean and organized.
- Avoid writing scripts in files if possible, especially if the script is likely to be run only once.
- Avoid code files over 200–300 lines. Refactor at that point.
- Mocking data is only for tests. Never mock data for dev or prod.
- Never add stubbing or fake data patterns to code that affects the dev or prod environments.
- Never overwrite the `.env` file without first asking and confirming.

### Design

- When introducing a new design system element — color, typography level, spacing token, rounded value, or reusable component — ask whether to update the design spec.
- See the design spec for icon library and defaults. Do not write custom SVGs unless explicitly requested.

### Writing

- For any user-facing text — UI labels, microcopy, product descriptions, marketing copy, page content — apply brand voice from `/docs/brand-sher.md`.
- For substantial prose (blog posts, information pages, collection pages, home copy), also apply `/docs/writing-rules.md`.

## Stack: Next.js + Shopify Headless

### Tech Stack

- Next.js 15 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Shopify Storefront API (GraphQL)
- Shopify hosted checkout
- Shopify hosted customer accounts
- Vercel deployment

### Shopify MCP Tools

When available, use the Shopify MCP tools to look things up before guessing:

- `introspect_admin_schema` — check the Shopify Admin API GraphQL schema.
- `search_dev_docs` — search Shopify developer documentation.

Use these tools to confirm field names, query shapes, and API behaviour instead of relying on memory.

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
- All reusable components live in `/components/` (flat, no subfolders). PascalCase filenames.

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

### Source of Truth

- `/docs/prd-shershop-v<n>.md` is the single source of truth for features, screens, data, design, and scope — one file per version, the highest `v<n>` is live. Always read the latest before building anything.
- `/docs/brand-sher.md` is the single source of truth for brand voice, audience, product categories, selling points, key terms, competitor positioning, and words to avoid. Always read it before writing content, SEO copy, or marketing materials.
- `/docs/writing-rules.md` is the single source of truth for content writing standards — voice, SEO, GEO, and banned phrases. Apply it when writing any prose content.
- `/docs/planning-shershop.tsv` is the plan of what to build — pages (URLs, titles, outline, SEO) and planned components and features, each tagged by version. It seeds each version's PRD and isn't a historical record; once a version's PRD is generated, that PRD owns the spec (see Conflict Rules). Read it before creating or modifying a page, and update it in the same change.
- `/docs/outline-notation.md` is the single source of truth for the outline notation — the layout grammar used in the plan's `outline` column and in Content MD layout lines. Read it before writing or interpreting a page outline.
- `/DESIGN.md` is the single source of truth for the design system — colors, typography, spacing, radius, motion, icons, container widths. It follows Google's DESIGN.md format — DTCG token YAML on top, prose below, no Components section. Always read it before doing design work. After editing, run `pnpm design:sync` to export `/app/theme.css` (and `tokens.json`) and lint the tokens; it uses Google's exporter, falling back to the W3C `tokens.json` standard if the alpha format breaks. Lint before trusting the tokens.

### Conflict Rules

- Planning handoffs — a planning column or row seeds a downstream doc, then stops being the live source:
  - `outline` → a content file in `/docs/content/`. Once that file exists, it owns the page's outline and copy; until then, the plan's outline is the source.
  - `functionality` → a screen's Behaviour in the PRD. Once that entry exists, the PRD owns the behaviour; until then, the plan's functionality is the source.
  - `C-`/`F-` rows → components and features in the PRD. The plan seeds them (name, what's in it, behaviour); once the PRD is generated, the PRD owns their spec.
- The plan is forward-looking — it plans what's coming, by version. The PRD is the historical source of truth and the ID authority (US/F/D maxes, the Active Items ledger); the plan's IDs may be incomplete.

### Documentation Map

- `/docs/content/` — final SEO content: Markdown pages with frontmatter, plus grid TSVs that are the source for page families sharing an outline
- `/docs/design/` — Figma exports, PNG/HTML mockups, and other visual design reference
- `/docs/assets/` — images, icons, fonts, and other static assets referenced from docs
