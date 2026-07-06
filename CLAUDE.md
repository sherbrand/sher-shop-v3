# CLAUDE.md

This folder holds SherShop files. Each file is a draft. Fine-tune it here, then copy it to the SherShop repo. Nothing here is live code.

## How to work here

- Ask first. Do not change a file until I say go.
- Show a short plan before any edit.
- Push back when you disagree. Skip flattery.
- Keep reasoning and "why" in chat. Never put them inside a file.
- Write at a grade-5 reading level.
- If something is missing or unclear, ask. Do not guess.
- Pick the simple option. Say so when something looks over-built.
- Write the least that does the job. Cut any clause that restates, caveats, or explains what the words already say.
- Don't add guardrails, exceptions, or "just in case" rules by default. Add one only when a real gap needs it.
- Ignore the `Legacy/` folder — set-aside drafts, not inputs. Never read it or treat it as a source of truth.

## Files

Each file owns one job. Do not repeat its content in another file.

| File | Owns |
|------|------|
| claude-repo.md | Coding, design, writing, and stack rules, plus the source-of-truth index |
| prd-shershop.md | The build spec — features, data, screens, behaviour, and build steps |
| planning-shershop.tsv | Versioned plan — pages (URLs, SEO, keywords, hreflang), components, and features |
| brand-sher.md | Brand voice, audience, positioning, and references |
| outline-notation.md | Outline notation — the layout grammar |
| writing-rules.md | Writing standards: voice, SEO, GEO, banned phrases |
| SKILL-po.md | PO role: drafts the PRD |
| SKILL-ui.md | UI role: harvests design tokens into DESIGN.md; reconciles screen copy |
| SKILL-writer.md | Writer role: writes content from outlines |
| SKILL-fe.md | FE role: builds reusable components |

## On port

- `claude-repo.md` becomes `CLAUDE.md` at the repo root.
- Each `SKILL-*.md` becomes `SKILL.md` in its own folder under `.claude/skills/`.
- Every other file keeps its name.
