# Content Writing Rules

Two kinds of rule. **Brand policy** (voice, banned phrases, keyword strategy, CTAs) is authoritative — apply it directly, never look it up. **Craft mechanics** (paragraph and snippet length, structured data, E-E-A-T and AI-citability patterns — anything that shifts when Google or the AI search engines change) is looked up fresh before each page; the workflow is in §2.

---

## 1. Brand policy (authoritative — do not look this up)

### 1.1 Voice and clarity

Write with specificity and conviction. Every sentence earns its place by saying something concrete. The default AI-writing failure mode is hedging broadly to be safe — that produces polished prose that says nothing. Avoid it.

- **No hedging with "or" to cover all angles.** Don't write "whether you're looking for comfort or style" — pick the angle that matches the outline and commit.
- **No filler sentences.** If a sentence could apply to any topic by swapping one noun, it's filler. Cut it.
- **No broad-to-be-safe claims.** Don't write "this can work well for both casual and formal occasions" unless the outline specifically calls for that comparison.
- **No generic advice.** "Find what works best for your needs and preferences" says nothing. Replace with a specific recommendation or cut entirely.
- **Commit to claims.** If the research supports a position, state it directly. Don't soften with "may," "could," "might," or "it's possible that" unless genuine uncertainty exists.
- **Prefer short, direct sentences over long, qualified ones.** If a sentence has more than one comma-separated qualifier, it's probably hedging.
- **No slow-start preambles.** The opening paragraph hooks immediately with a specific observation or direct answer — not a setup paragraph about what the article will cover.

### 1.2 Banned phrases

Never use any of these:

- "In today's digital landscape"
- "It is important to note"
- "It's worth noting that"
- "Let's dive in"
- "Without further ado"
- "At the end of the day"
- "When it comes to [topic]"
- "In the world of [topic]"
- "In this article we will explore..."
- "Are you looking for..."
- "Look no further"
- "Navigate" (metaphorical — fine for literal site navigation)
- "Game-changer"
- "Revolutionary"
- "Secret hack"
- "Guaranteed results"

### 1.3 Keyword placement *strategy* (not mechanics)

Where the keyword goes by content type. The *number* of times, *density*, and exact placement counts are craft conventions — look those up.

- **Pillar** — main keyword in title, H1, intro, and at least one supporting H2. Brand name appears prominently.
- **Cluster** — keyword and semantic variants throughout. Links up to its Pillar (`seo_parent`).
- **Information** — keyword as the definition anchor, present in the first substantive paragraph and the closing section.
- **Blog** — hook opens with the keyword or a near-variant, links up to its Pillar.
- **Home** — keyword is a **category anchor** (broad brand or category term). Brand name prominent.
- **Collection** — keyword in title, H1, and intro copy; used naturally in any supporting section.
- **Utility** — no keyword target. Brand name appears once.

Prioritize natural language over hitting any density number — semantic variants and related terms are how modern relevance models read intent.

### 1.4 Heading hierarchy

These are HTML / accessibility standards, not SEO trends — they don't rot.

- One H1 per page (the title from the outline).
- H2 → H3 → H4, no level skipping.
- Every heading is followed by substantive content (never two headings back-to-back).

### 1.5 Internal linking

- Information pages link **down** to their cluster posts and to shop pages.
- Blog posts link **up** to their Pillar (`seo_parent`).
- Cluster pages link **up** to their Pillar.
- Pillar pages can link sideways to other Pillars when topically related.

### 1.6 CTAs

CTA references the specific product, collection, or action relevant to this piece. Not "shop now" — `Shop the Lace-Up Collection`, `See How a Corset Top Is Made`, `Read the Bridal Corset Guide`, etc.

### 1.7 Freshness signal

- **Blog posts** get a freshness signal (date, "updated for [year]", current-year stats).
- **Information / Pillar pages** stay evergreen — no dates.
- **Collection / Home / Product** — no dates.
- **Utility** — no dates.

### 1.8 Factual density

- Replace vague claims with specific numbers. "Many users" → "over 60% of users".
- Every claim is backed by evidence or clearly marked as brand opinion.
- For Blog posts, cite sources by name (full entity name on first mention — "Shopify Inc." not "Shopify"). For Information pages, state brand and product facts first-hand.

---

## 2. Craft framework (look this up before you write)

The mechanics of how to write *for current search engines and AI* — paragraph length, sentence variety, snippet length targets, FAQ schema patterns, E-E-A-T signal mechanics, AI citability patterns, structured data evolution — change every algorithm cycle. Anything in this bucket is **looked up, not hardcoded**.

### 2.1 Before writing each page

1. **WebSearch** for current best practices on the dimensions relevant to this page's `type`. Suggested queries:
   - `<content_type> SEO best practices <current_year>` (e.g. "Collection page SEO best practices 2026")
   - `paragraph length AI search citability <current_year>`
   - `Google featured snippet length <current_year>`
   - `E-E-A-T signals for <content_type> <current_year>`
   - `GEO best practices Perplexity AIO ChatGPT <current_year>`
   - `Google Helpful Content Update <content_type> <current_year>`
2. **Base your choices on at least 2 sources** published within the last 12 months. Prefer named SEO leads (Aleyda Solis, Lily Ray, Marie Haynes, Brian Dean, AJ Kohn, Glenn Gabe), engineering blogs from search platforms, and Google's own developer docs.
3. **Pick the conventions** that fit this page's intent: commercial / informational / transactional / brand.
4. **Apply them.**

### 2.2 Conflict resolution

- Craft research **contradicts** brand policy → brand policy wins.
- Craft research **is silent** on the question → use writer judgment.
- Craft research **adds** a constraint brand policy doesn't address → apply it.

### 2.3 Bucket reference — what belongs in §2 (don't hardcode here)

Use this list to recognize craft questions. When a question falls in this bucket, **look it up** — don't write what you remember:

- Paragraph length, sentence variety, intra-paragraph rhythm
- Title-tag character limits, meta description length
- Snippet length targets, snippet eligibility patterns
- FAQ answer length, FAQ schema requirements
- E-E-A-T signal mechanics (author bios, citations, schema)
- AI citability patterns (self-contained chunks, definition placement, table extractability)
- Structured data — what types, which fields, current Google validation rules
- Image alt-text length and pattern conventions
- Internal-link count targets
- External-link count and authority threshold targets
- Bold/italic/list density for scannability
- Table-of-contents thresholds
- Featured-snippet formatting (paragraph vs list vs table)

---

## 3. Page-type quick map (combining §1 and §2)

For convenience — what brand policy + craft framework looks like applied to each `type`:

- **Pillar (Information)** — §1 voice/banned + Pillar keyword strategy + evergreen + first-hand authority. Craft: look up E-E-A-T mechanics, AI citability patterns, definition formatting.
- **Cluster (Blog)** — §1 voice/banned + Blog keyword + freshness date + cite external authorities. Craft: look up Blog length conventions, internal/external link counts, snippet patterns.
- **Information** — §1 voice/banned + Information keyword + evergreen + first-hand. Craft: look up definition formatting, AI citability, structured data type.
- **Collection** — §1 voice/banned + Collection keyword + product-specific CTA + no dates. Craft: look up Collection page length, where the intro paragraph goes, snippet patterns.
- **Product** — §1 voice/banned + product details + structured data (Product schema). Craft: look up Product description length, schema field completeness, image alt-text.
- **Home** — §1 voice/banned + category anchor keyword + brand prominence + no dates. Craft: look up Home page length conventions, hero copy patterns.
- **Utility** — §1 voice/banned + no keyword + no dates. Craft: minimal — these don't compete for search.
- **Blog (How-To / Listicle)** — §1 voice/banned + freshness + external authority cite. Craft: look up format patterns for the specific subtype.
