# Runbook: PRD

## Objective

Turn a raw idea into a first DraftPRD, ready to iterate on. From here the DraftPRD is built from the plan and versioned by the PO skill, not written by hand. This runbook ends at that switch.

|  |  |
|---|---|
| **Run this when** | You are starting a new project and have nothing but an idea and a rough picture of what you want. |
| **Time** | 30 to 90 minutes. |
| **Owner** | You. |

## Deliverable

A first DraftPRD (MD), ready to iterate on, not final. You are done when every kept ID is one you can defend and you would not cut it on a second read.

---

## Before you start

- [ ] Your rough idea, and some quiet time to shape it into a brief.
- [ ] This runbook, with the mega-prompt in step 2.

---

## Steps

### 1. Write the project brief

Turn your idea into a short brief. Do not stop at what it does, who it is for, and what it must not do. Write it yourself. Do not ask the AI to write the idea for you. You can think in terms of:

- **Overview** — what it does, and who it is for.
- **User stories** — the things a user should be able to do ("As a user, I want to … so that …").
- **Functionality** — what the product does to make each of those work.

Keep going until the brief covers all of these. A thin brief makes a thin draft.

Example brief:

```
What it does: A "Tip Calculator" app that lets users quickly enter a bill amount, choose a tip percentage, see the total amount, and optionally split the bill between multiple people. It’s for anyone who wants to quickly figure out tips in restaurants or cafes.
```

```
User Stories (Tip Calculator):
- As a user, I want to enter a bill amount so I can start.
- As a user, I want to pick a tip percent so I do not do the math myself.
- As a user, I want to split the total between people so each person knows what they owe.
```

```
Functionality (Tip Calculator):
- Type in the bill amount.
- Tap a set tip percent, or type your own.
- Show the tip, the total, and the amount per person.
- Change the number of people and watch the split update.
```

### 2. Fill the mega-prompt and run it

Copy the mega-prompt in the box below. Replace the PROJECT BRIEF slot with your whole brief from step 1, not a one-line summary. Then run it and keep the whole output.

```
(Switch the PROJECT BRIEF below with your simplified business project brief)

You are an experienced product developer who explains things in grade 5 level english without technical jargon.
Create a simple, step-by-step REQUIREMENTS DOCUMENT for a product idea.

The goal is for this document to:
1. Be easy to understand for someone who codes for fun.
2. Use plain language, not technical jargon.
3. Number each item clearly so I can refer to them later when asking you to implement them.

## Sections to include (in order):

1. **Product Overview**
   - A short paragraph explaining what the product does and who it's for.

2. **Main Goals**
   - A short numbered list of the main things the product should achieve.

3. **User Stories** (US-001, US-002, …)
   - Write short "As a user, I want to … so that …" sentences for each thing the user should be able to do.

4. **Features** (F-001, F-002, …)
   - Numbered list of product features.
   - For each: what it does, when it appears, and what should happen if something goes wrong.

5. **Screens** (S-001, S-002, …)
   - Numbered list of the screens/pages in the product.
   - For each: what's on the screen, and how you get there from another screen.

6. **Data** (D-001, D-002, …)
   - List any information the product needs to remember.
   - Write it in plain English (e.g., "List of saved activities with name and date").

7. **Extra Details**
   - Things like: does it need the internet? Does it store data on the device? Does it need any device permissions (camera, location, etc.)? Does it need dark mode?

8. **Build Steps** (B-001, B-002, …)
   - A simple step-by-step order to build the product from start to finish.
   - Each step should refer back to the numbers above (e.g., "Build S-001 and F-001 first, then add D-001 to save data").

## Style & Clarity Rules
- Keep it simple.
- Use short sentences.
- No advanced architecture or design patterns.
- No heavy technical words unless explained in plain English.
- Format this document in markdown

----
PROJECT BRIEF:
[replace with your brief from step 1]
----
```

### 3. Review the DraftPRD line-by-line & fine-tune

Read the draft against your idea, not against itself. Look for what the AI added that you never asked for, and mark every item that was not in your brief. Keep only the ones you want.

Go through it by ID type and ask:

- Does it deserve to be a US-xxx, or not?
- Is it really an F-xxx, or a screen behavior?
- Is S-xxx a real screen, or another state?
- Is any D-xxx missing, or can it be combined?
- Is B-xxx in the right order and grouping?

Then send your fixes, each named by its ID. Fine-tune it as many times as you need.

Say what is wrong in each fix, not "make it better." If you are unsure about an item, leave it marked. Do not keep an item because it sounds smart, and do not send vague notes.

### 4. Regenerate the DraftPRD, then fine-tune again

Do this after the project has firmed up, not right away. By now you should have most of the files the PO skill needs (e.g. Brand MD, Planning TSV, ...). If not, proceed to build its required and optional inputs. Then:

1. Move the old hand-made PRD into the `legacy` folder.
2. Run the PO skill to build a fresh DraftPRD from the plan.
3. Pull the old PRD out of `legacy` so the AI can read it. Have it compare the two, give you the list of deltas, and tell you which is better and why.
4. Use the better one as the base, then fold in the best of the other so the result beats both.

Repeat this step whenever you revise an input file. Run it as often as you need.

---

## Troubleshooting

**Still wrong after a few rounds**
The brief is the problem, not the draft. Start over: rewrite the brief, go to step 1.

**The draft is correct but you cannot explain it**
Ask for the same document in simpler words. Do not sign off on wording you would not have written.

**Two parts contradict each other**
Decide it yourself. Do not ask the AI to fix it. It will pick one and hide the other.

**Scope keeps growing each round**
You are letting new items through in step 3. Every item you do not mark is one you kept.
