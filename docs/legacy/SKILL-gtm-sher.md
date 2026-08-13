---
name: gtm
description: "Find a brand's go-to-market channels for winning first-time customers. Builds one board of every channel worth considering, scored for this brand in its chosen markets, using competitor research to find channels a list would miss. Plots commitment against how warm the buyer is, sizes each by CAC, and rings the ones the brand already wants. Outputs one HTML file."
---

# GTM

Turn a competitor list and a ranked market list into one board: every channel that can win a first-time customer, placed by what it costs to commit to and how warm the buyer is when it reaches them.

The board is acquisition only. Keeping a customer and turning them into an advocate are real work and a different board.

## Run in Chat

With no CLAUDE.md, hand your work back in chat: read the inputs that are here, ask for any required one that's missing, then give back every new file and edit, and say which file each belongs in.

## Inputs

- The brand doc — its competitor list, and its company overview, including where the brand operates from. Ask for anything it does not carry.
- The shortlisted markets, ranked — where the brand wants to sell, best first, and which markets are out of scope. Ask for either if missing.
- [Optional] The shortlisted GTM, ranked — the channels the brand already wants, best first. Ringed on the board, and what is missing from them is a finding.

## Workflow

### 1. Create the list

Take all three lists in Channel list and turn them into one working list for this business.

- **Localize or specify the channels, and split when necessary.** The source lists are generic. Name each channel as this business knows it, split one entry into several where the pieces differ in nature, and add each shortlisted market's own equivalents. "Existing platforms" is a marketplace, an in-app shop and a social shop, and the discovery app that leads one market may be absent in the next.
- **Group by market, roadblock and key success factor.** Two channels are one dot when all three match, and one group when the roadblock and the success factor match whatever the market. Read the success factor at the decision in front of you, not the one after it. A real group also answers "what else is like this?" with a candidate.
  - **Shopee and Lazada** — same market, same local-company requirement, same listings-and-search game. One dot.
  - **Instagram and Facebook Shop** — no company requirement at all, so they sit apart from those two, however alike all three look.
  - **Television, radio and outdoor** — one roadblock, a minimum spend. One group.
  - **TikTok Shop and Xiaohongshu Shop** — same roadblock, same success factor, different markets. One group, two dots.
  - **Douyin, WeChat and Tmall** — they play differently once you are inside China, but from outside the only thing deciding any of them is whether you understand China. One dot, until that changes.
- **Clean the list, but keep the bad ideas.** Drop a channel only if it cannot win a new customer, or if it plainly makes no sense for this business. A policy is not a channel: returns terms, duty handling and payment methods condition every channel rather than being one. Every drop is listed in the report with its reason, and anything the brand should still act on, like a policy or a loyalty play, also goes in **My suggestion**.

### 2. Research & Reconcile

The aim is channels, not brand profiles. Every finding attaches to a channel.

**Tools, used by all three sweeps below.**

- **Ad library** — search the brand name as an exact phrase; a plain keyword search returns unrelated advertisers that happen to use the word. Read off how many ads are active, the oldest start date still running, and the creative shape: length, copy length, whether a creator is named, whether an offer appears. An ad alive for months is a profitable ad.
- **Site teardown** — footer and nav, for an affiliate or ambassador program, a stockists page, policy pages, social links, and the currency or country selector. Note where the brand is based.
- **The channel's own surface** — search the platform itself. A brand either has an account, a shop, a listing or a presence there, or it does not.
- **Anything else that answers the question** — job ads, press, a partner's site, a marketplace search. A brand hiring for a channel is running that channel.

**Sweep 1, from the channel list.** Walk each channel and ask which competitors run it. This finds the channels that are proven, and the ones nobody touches.

**Sweep 2, from the competitors.** Walk each brand and ask what it runs that is not on the list. This finds the channels no list would have named, and it is the only sweep that can.

**[If provided] Sweep 3, from the shortlisted GTM.** Walk each strategy twice: do rivals run it, and which channels on the board does it map to?

**As you go.** Flag these rather than settle them quietly.

- **Research changes the list.** A channel nobody named turns up: add it, and mark it in the table as a find rather than a list entry. Two channels turn out to be one decision: plot them apart and leave the merge to the human. Both go in the run report.
- **A channel that was not researched.** Say whether it was skipped by choice or by running out of road. A choice usually explains itself in a few words; running out of road can be fixed with an iteration. Both go in the report under *Left open*.
- **A fix the research points to that is not a channel.** A rival's free-shipping threshold, the returns terms every one of them runs, a payment method they all carry and this brand does not, a guarantee that takes the risk off the buyer. None of it gets a dot, and all of it is worth doing. Note each one for **My suggestion**.

### 3. Fill the scorecard

One row per channel. Every value is a judgment regarding this brand in the ranked markets: not the channel's general reputation. Score how hard a channel is for the markets you're targeting — not for the market you're already in.

- **Market** (from Shortlisted markets) — which one it serves, or All when it works anywhere without a local entity.
- **Start** (inbound or outbound) — who starts it. They come to you, or you go to them uninvited.
- **Commit** (0 to 100) — money and founder weeks sunk before you learn whether it works. One-time buys count here, not in CAC: a batch of guest posts, a photoshoot, a platform deposit.
- **CAC** (0 to 100) — what one new customer costs through that channel.
- **Interest** (0 to 100, in four bands) — not looking, wants the category, comparing brands, ready to buy. Place each channel at its center of gravity, so it can sit between two bands.
- **Note** (one line) — the roadblock a score cannot carry, or what the research showed.

### 4. Plot in HTML

Self-contained. No external requests.

- **Y** is Commit, inverted: low at the top.
- **X** is Interest, in four labelled bands.
- **Dot size** is CAC.
- **Dot color** is Start.
- **A double ring** marks a shortlisted channel. Say what each strategy maps to under **Shortlisted GTM**.
- Number every dot and print a numbered key under the board.
- Nudge overlapping dots apart by a capped distance, and say the cap beside the plot.
- Give every dot a hover tooltip. The scorecard holds the exact values, so nothing is reachable only by hover.

**Shortlisted markets** and **Shortlisted GTM** carry the brand's input into the file, and whatever the analysis has to add beside it.

### 5. Report & Save

Each report is written into the file and pasted verbatim in chat. Each is a snapshot of one run, so the copies cannot drift. Output shows both shapes.

**Run report** — the calls made without asking.

**Findings report**, in this order:

- **From the matrix** — what the shape of the board says: where it is crowded, where it is empty, what sits together. Count and average from the scorecard rather than eyeballing the plot.
- **From competitors** — what the research turned up, with the date behind it. A channel earns a line when the evidence changes what you would do, not because it was checked.
- **My suggestion** — opinion, marked as opinion. What to start, what to rule out on purpose, and every fix the research turned up that is not a channel.

Save the HTML file to its path in CLAUDE.md, named `gtm-matrix-<brand>`, built to the example in Output. Leave out a section whose input was not supplied.

Add any channel now on the board that Channel list does not already name to **From the Iterations**, so the next run starts with it.

## Iteration

The board changes shape several times before it is right.

- **Say what changed after each pass.** The run report carries what left the board and what joined it. Say what the change did to the scores and the findings. A board that changes silently cannot be argued with.
- **Propose splits and merges; do not make them alone.** Both happen several times in a run, and the human sees the ones you will not. Say what you notice and let them call it.
  - **Split** when one name hides two plays with a different market, a different roadblock or a different success factor. Cold outreach and an owned list are both "email" and share none of the three.
  - **Merge** when two share all three.
- **Recount every stat after every change.** Every count and every average moves when one dot moves. A stale number reads as a fact.
- **Say what a change costs.** When a regroup or a deletion loses a finding, name the finding and offer the revert. Then do what was asked.

## Output

The HTML file, by example: `business/gtm-matrix-sher.html`. Its sections, in order:

````
Shortlisted markets — From you
Shortlisted GTM — From you
Scorecard — Table view
Matrix — Commitment × Interest
Findings report — From the analysis
Run report — From the analysis
````

The run report, in the file and in chat:

````
Taken off the board:
* [Dropped] <channel> — <why it cannot win a new customer, or why it makes no sense here>
* [Merged into <channel>] <channel> — <why>

Put on the board:
* [Added from research] <channel> — <which competitor runs it>
* [Split from <channel>] <channel> — <why>

Left open:
* [Merge not made] <two channels> — <what would decide it>
* [Not researched] <channel> — <what was not checked>
* [Judgement only] <channel> — <what evidence is missing>
````

The findings report, in the file and in chat:

````
From the matrix:
* <a count, an average, or an empty band, and what it means>

From competitors:
* <channel> — <what the evidence proves, disproves or leaves open, and the date behind it>

My suggestion:
* <what to start now, what to rule out on purpose, or what to decide>
````

## Channel list

Each list holds only what it adds to the one above, so each channel is named once and its source is exact. Create the list merges them.

### From Traction

The nineteen channels of the Bullseye framework, as Weinberg and Mares wrote them.

- Targeting blogs
- Publicity
- Unconventional PR
- Search engine marketing
- Social and display ads
- Offline ads
- Search engine optimization
- Content marketing
- Email marketing
- Viral marketing
- Engineering as marketing
- Business development
- Sales
- Affiliate programs
- Existing platforms
- Trade shows
- Offline events
- Speaking engagements
- Community building

### From the AI GTM Playbook

Its re-cut of the nineteen into twenty-five. Six are genuinely new; the rest are the list above, renamed.

- Product-led growth: a free tier, trial or sample that sells the paid thing
- Waitlist hype
- Viral loops, as a built mechanism distinct from word of mouth
- Short-form video and audio
- Cloud marketplaces
- Influencer and creator ecosystems, as a channel rather than a tactic

### From the Iterations

Named by neither list above. Most are routes to market, because both lists were written for software.

- Own site
- In-app shops on content platforms
- Regional marketplaces
- Category and premium marketplaces
- Wholesale and stockists
- Pop-ups and temporary retail
- Ecosystem partners: whoever already advises or resells to the buyer
- Ecosystem-led growth
- Press and celebrity seeding
- Customer content
- Review platforms
- Retargeting
- Brand collaborations
- Tools that answer the doubt that stops a first purchase
- The founder as the face: on camera, and a broadcast channel

Add a fourth list here when a new published one is worth carrying, and keep the same rule: only what it adds.
