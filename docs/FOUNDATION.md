# Phase 1 — Foundation Runbook

A shared runbook for **humans and AI agents**. It says what "Phase 1 — Foundation"
needs, **who does each step**, and how the two hand off. Read it top to bottom the
first time; after that, jump to the **Status** block at the bottom to see where things stand.

> **Why a runbook, not an automated skill?** Some steps only a human can do — logging
> into the Shopify admin, generating API tokens, approving a merge. An agent can do the
> rest. This doc lets both work from the same page and hand off cleanly, instead of
> re-reading a chat thread each time.

This file is written to be **reused on any project**. Fill in §1, keep the process, and
change only what the variables say.

---

## 0. How to read this

Every step is tagged with an **owner**:

- 🧑 **Human** — only a person can do it (admin login, generating secrets, approvals).
- 🤖 **Agent** — an AI agent (or any dev) can do it unattended.
- 🔒 **Gate** — the agent stops here and waits for a human to finish a 🧑 step, then resumes.
- ✅ **Done-check** — a concrete, verifiable condition that proves the step is finished.

**Rule:** whenever a step changes state, update the **Status** block (§9). That block —
not the chat history — is the source of truth for "where are we."

---

## 1. Project variables

Fill these once per project. Everything below refers back to them.

| Variable | This project (SHER Shop V3) |
|---|---|
| `PROJECT` | SHER Shop V3 |
| `REPO` | github.com/sherbrand/sher-shop-v3 |
| `FRAMEWORK` | Next.js App Router · TypeScript (strict) · Tailwind v4 |
| `BACKEND` | Shopify Headless — Storefront API |
| `STORE_DOMAIN` | set in `.env.local` (e.g. `your-store.myshopify.com`) |
| `GH_ACCOUNT` | `sherbrand` |
| `DEPLOY_TARGET` | Vercel (provisioned by the owner) |

> Reusing this on another project? Swap `BACKEND` (Shopify / Supabase / a custom API),
> the framework, and the account. The **step structure stays the same.**

---

## 2. Environment & gotchas — read before touching anything

These are traps already paid for once. Avoid repeating them.

- **Use `npm`, not `pnpm`.** On some Windows setups `pnpm install` fails with `EPERM`.
  If that happens, fall back to `npm install` — same result.
- **Push with the right account.** This machine has more than one GitHub login. Switch to
  the account for **this** repo before any push: `gh auth switch -u <GH_ACCOUNT>`
  (here: `sherbrand`).
- **`.gitignore` trap.** A blanket `.env.*` ignore also hides `.env.example`. Add an
  un-ignore line so the template still gets committed: `!.env.example`.
- **`NEXT_PUBLIC_` is browser-exposed.** Any env var with that prefix is bundled into
  client JS and readable in DevTools. **Never** put a secret token behind it.
- **Paths with spaces** (e.g. a folder named with spaces) can break some toolchains.
  If a build behaves oddly, suspect the path first.
- **No AI attribution** in commits, README, or LICENSE. Commit as a normal author.

---

## 3. Phase 1 at a glance

Foundation makes the app shippable, wires the data layer, and puts the global UI shell in
place — so every later phase has a floor to build on.

| Step | Title | Owner | Depends on |
|---|---|---|---|
| S0 | Read the project plan | 🤖 | — |
| S1 | Provision the backend | 🧑 → 🔒 | S0 |
| S1v | Backend readiness check | 🤖 | S1 |
| S2 | Scaffold the app | 🤖 | S0 |
| S3 | Secrets hygiene | 🤖 + 🧑 → 🔒 | S1, S2 |
| S4 | Verify the build | 🤖 | S2 |
| S5 | Ship (branch → PR → merge) | 🤖 → 🔒 | S4 |
| S6 | Checkpoint | 🤖 | S5 |

Tick these off as you go: ☐ S0 ☐ S1 ☐ S1v ☐ S2 ☐ S3 ☐ S4 ☐ S5 ☐ S6

---

## 4. Steps

Each step uses the same shape: **Owner · Preconditions · Do this · Inputs → Outputs · Done-check.**

### S0 — Read the project plan  🤖
- **Preconditions:** repo is cloned.
- **Do this:** read the project's own planning docs (PRD, `CLAUDE.md`, `claude-repo.md`,
  any planning sheet) and extract *this* project's Phase-1 step list and each step's
  dependencies. **Do not assume** the steps — read them.
- **Inputs → Outputs:** repo docs → a written Phase-1 step list (like §3 above).
- ✅ **Done-check:** the step list and dependencies are written down and agreed.
- *SHER:* Phase 1 = **B-001** scaffold · **B-002** `shopifyFetch()` wrapper · **B-003** global chrome (`prd-shershop-v3.md` §7).

### S1 — Provision the backend  🧑 → 🔒
- **Preconditions:** S0 done; someone has admin access to the backend.
- **Do this (human):** in the backend admin, make sure the app/channel exists, the right
  **scopes** are enabled, and **API tokens** are generated.
  - *SHER (Shopify):* Admin → **Headless** channel → **Storefront API**. Confirm scopes for
    **products**, **cart/checkout**, and **customers**; generate the **public** token
    (client) and **private** token (server).
  - **Starting from zero** (no store / channel / tokens yet)? Follow the full click-path in
    **Appendix B**, then come back here.
- **🔒 Gate:** the agent cannot generate secrets. It waits until the human confirms tokens exist.
- **Inputs → Outputs:** backend admin → public + private tokens, store/endpoint domain.
- ✅ **Done-check:** required scopes are on, and both tokens exist (values stay with the human for S3).

### S1v — Backend readiness check  🤖
- **Preconditions:** S1 confirmed.
- **Do this:** verify what's actually set — scopes, channel, token presence. If needed,
  drive the admin UI to read it. Produce a **READY / BLOCKED / NEEDS-HUMAN** list.
- **Inputs → Outputs:** backend admin state → a readiness list.
- ✅ **Done-check:** every Phase-2 data dependency is marked READY, or its blocker is named.
- *SHER:* products + cart/checkout + customer scopes = READY; tokens present (do **not** copy token values into any doc).

### S2 — Scaffold the app  🤖
- **Preconditions:** S0 done. (Can run in parallel with S1.)
- **Do this:** create the app skeleton per `FRAMEWORK`:
  1. App project — strict TypeScript, styling, `@/` path alias, image config for the CDN.
  2. **One** typed data-fetch wrapper (server-only) — the single door to the backend
     (*SHER:* `lib/shopify/index.ts` → `shopifyFetch()`).
  3. Global chrome — header, nav/menu, footer — to spec. Use neutral placeholders where a
     design token or asset is still pending; **do not invent brand assets** — flag and wait.
- **Inputs → Outputs:** framework + spec → running skeleton that builds.
- ✅ **Done-check:** app builds and serves a placeholder page; the API wrapper compiles.

### S3 — Secrets hygiene  🤖 + 🧑 → 🔒
- **Preconditions:** S2 (files exist), S1 (tokens exist).
- **Do this (agent):** set up secret handling (see §6 for the full rules):
  - commit `.env.example` (names only, no values); ignore `.env` and `.env.local`;
    add `!.env.example` so the template survives; confirm with `git check-ignore`.
- **Do this (human):** paste the **real** tokens into `.env.local` (never committed), and
  into the deploy target's env settings. **🔒 Gate:** agent waits for this before any live data step.
- **Inputs → Outputs:** tokens (from S1) → `.env.local` + deploy env; safe template in git.
- ✅ **Done-check:** `git check-ignore .env.local` returns it as ignored; `.env.example` is tracked; no real token is in git.

### S4 — Verify the build  🤖
- **Preconditions:** S2 done.
- **Do this:** run a clean build + type-check. Run a dependency audit and **patch any known
  CVE** in the scaffolded framework (bump to the nearest safe version). Handle machine
  gotchas from §2 (npm fallback, path with spaces).
- **Inputs → Outputs:** source → clean build, no type errors, no known-critical vulns.
- ✅ **Done-check:** build passes with zero type/build errors; no critical advisories left.

### S5 — Ship  🤖 → 🔒
- **Preconditions:** S4 green.
- **Do this (agent):** `gh auth switch -u <GH_ACCOUNT>` → create a branch → commit
  (no AI attribution) → push → open a PR. Commit **only** safe files (never `.env.local`,
  `node_modules`, or the build dir — dry-run the staged list first).
- **🔒 Gate:** a human reviews and approves the merge.
- **Do this (agent, after approval):** merge to `main`, delete the branch.
- **Inputs → Outputs:** verified code → merged PR on `main`.
- ✅ **Done-check:** PR merged; branch deleted; local `main` in sync with origin.

### S6 — Checkpoint  🤖
- **Preconditions:** S5 merged (or work paused mid-phase).
- **Do this:** update the **Status** block (§9) and write a short resume note to persistent
  memory: what's done, what's blocked and on whom, what to pick up next.
- **Inputs → Outputs:** current state → durable, resumable record.
- ✅ **Done-check:** §9 reflects reality; a future session can resume from it without reading chat.

---

## 5. Human ↔ agent handoff protocol

A 🔒 gate is where the two meet. Keep it tight:

1. **Agent → human:** post *exactly* what's needed — the link, what to click or paste, and
   why. One clear ask, not a wall of text.
2. **Human:** do it, then tick the step in §3 and note anything odd in §9.
3. **Agent:** read §9, resume from the next step.

That loop — state lives in this doc, not in chat — is the whole point. It's how we stop
re-reading threads to remember where we were.

---

## 6. Secrets & security rules

1. **Two kinds of env file.** `.env.example` = names only, committed. `.env` / `.env.local`
   = real values, never committed.
2. **Fix the ignore.** `.env.*` hides the example too — add `!.env.example`. Verify with
   `git check-ignore`.
3. **`NEXT_PUBLIC_` = public.** Only non-secret values (like a public token or a store
   domain) may carry that prefix. Secret tokens stay server-side, read via `process.env`
   in server code only — never imported into a client component.
4. **Deploy env parity.** Set the same variables in the deploy target (e.g. Vercel →
   Settings → Environment Variables). Pull them locally with the platform CLI; never commit them.
5. **If a secret leaks, it's dead.** Rotate it at the source (generate a new token),
   update `.env.local` and the deploy env immediately.

---

## 7. Definition of Done — Phase 1

- ✅ App scaffolds and builds clean (no type/build errors).
- ✅ Single typed data-fetch wrapper in place.
- ✅ Global chrome (header / menu / footer) present (brand-final look may wait on design).
- ✅ Secrets handled: `.env.example` committed, real tokens only in `.env.local` + deploy env.
- ✅ PR merged to `main`; branch cleaned up.
- ✅ Checkpoint written (§9).

When all six are ticked, Phase 1 is done and the next phase can start.

---

## 8. Appendix A — copy-paste templates

**`.env.example`** (names only — no real values):
```
# Server-only (secret) — never prefix with NEXT_PUBLIC_
SHOPIFY_STORE_DOMAIN=
SHOPIFY_STOREFRONT_ACCESS_TOKEN=
# Public (safe to expose) — only if truly non-secret
# NEXT_PUBLIC_SOMETHING=
```

**`.gitignore`** (the essential lines):
```
.env
.env.*
!.env.example
node_modules/
.next/
```

**Single API client — shape** (server-only, one door to the backend):
```
// lib/<backend>/index.ts  — server-only
// - reads secrets from process.env (never NEXT_PUBLIC_)
// - one typed fetch function the whole app calls
// - returns typed data; no `any`
```

**Commands cheat-sheet:**
```
gh auth switch -u <GH_ACCOUNT>     # correct account before push
npm install                        # (fallback if pnpm EPERM)
npm run build                      # clean build + type-check
git check-ignore .env.local        # must report it as ignored
```

---

## 8b. Appendix B — set up Shopify from zero (S1 in detail)

Use this the **first time**, when there's no store, channel, or token yet. Every step
here is 🧑 **human** — only a person can log into the admin and generate secrets. (If your
`BACKEND` isn't Shopify, replace this appendix with your provider's equivalent.)

0. **Have a Shopify store + admin access.** A plan that allows the Storefront API. If there's
   no store yet, create one at shopify.com first.
1. **Install the Headless channel.** Admin → *Settings → Apps and sales channels* →
   **Shopify App Store** → search **"Headless"** → add Shopify's official **Headless** channel.
2. **Create a storefront.** Open the **Headless** channel → **Create storefront**. This gives
   you a storefront with the **Storefront API** and **Customer Account API**.
3. **Storefront API — tokens + permissions.** In the storefront's **Storefront API** section:
   - Note the **Public access token** (client-side) and create a **Private access token** (server-side).
   - **Manage API permissions** and enable the scopes you need:
     - **Products** — read product listings, inventory, tags (browse the catalog).
     - **Checkout** — `read_checkouts` **and `write_checkouts`** (this is what makes selling work).
     - **Customers** — read/write (sign up / login).
     - **Content** and **Selling plans** as needed.
4. **Put tokens in env.** Copy the tokens + your store domain (`your-store.myshopify.com`) into
   `.env.local` — **private → server, public → client** — and into the deploy target's env
   (see §6). Never commit them.
5. **Publish products to the channel.** A product is only readable through the API once it's
   **published to the Headless storefront/channel**. Publish the catalog (or the test products).

**Alternative — custom app** (instead of the Headless channel): Admin → *Settings → Apps* →
**Develop apps** → create an app → enable **Storefront API** scopes → **Install** → reveal the
**Storefront API access token**.

> Shopify moves menu labels between UI versions. If a label here doesn't match, an agent can
> drive the admin screen to find and confirm it (that's step **S1v**).

---

## 9. Status / Resume block  ← update every session

**Project:** SHER Shop V3
**State:** 🟢 **Live** — https://sher-shop-v3.vercel.app (production; Vercel git-integration, auto-deploys on every merge to `main`). HEAD = design rebuild (PR #3).

- **Last done (2026-07-13):**
  - Foundation B-001/002/003 merged (PR #1); this runbook merged (PR #2).
  - **Design rebuild** from the design source-of-truth zip (PR #3, merged): applied `Legacy/DESIGN.md`
    (5-colour palette `#A99D94`/`#665D55`/`#FBF9F9`, Cormorant Infant · Cardo · Manrope via next/font,
    5px radius, motion tokens), real logos (white lockup over hero / dark emblem when solid), Home
    rebuilt to `s-001_home.md`. `next build` clean.
  - **Vercel** connected under team **SHER** (`sherbrand`), project `sher-shop-v3`, git-integrated.
- **Not done / blocked:**
  - `SHOPIFY_STOREFRONT_ACCESS_TOKEN` not set anywhere (no `.env.local`) → needed before live product data.
  - Category/product tiles are brand-tone **placeholders** — real product/hero photography still pending
    (the zip shipped only mood boards, not clean photos).
  - Pages `s-002..s-014` (shop, categories, about, contact, legal) not built yet — routes currently 404.
  - Open: whether to move `brand-xxx.md` / `style-xxx.md` into `Legacy/` (asked Stamp, unanswered).
- **Next pickup:** build the remaining page routes `s-002..s-014` (auto-deploy on merge); wire Shopify
  product data (needs token) for shop + PDP; optionally attach custom domain `sherbrand.co`.
