import { readFileSync } from "node:fs";
import { join } from "node:path";

/* F-008 Slot Content — the hand-placed slots behind Home (S-001) and the five
   commerce screens (S-002, S-003, S-004, S-005, S-012).

   Two files, each with one job. D-004 Media Slots gives a slot its image, its
   alt text, and an optional link. D-006 Slot Values gives a slot its text. The
   slot id is the key in both, so one slot can take its picture from one file and
   its words from the other. Both are TSVs, so they can be edited in a
   spreadsheet without touching code.

   A slot with no row is left out, not rendered empty. Where a slot needs both
   files and only one of them has it, the slot is left out and logged.

   A row that is present with an empty value is a deliberate blank: it renders
   nothing and says nothing. A slot with NO row is a missing slot, and it logs.
   That is what tells a typo apart from an empty band on purpose.

   This file is the reader every screen shares. Slot data shaped into one
   screen's component props lives with that screen: see lib/home. */

const MEDIA_SOURCE = "data/d-004_media.tsv";
const VALUES_SOURCE = "data/d-006_slot-values.tsv";

type Row = Record<string, string>;

/* Reads a TSV into rows keyed by column name. Note lines (#) and blank lines are
   dropped, and the first line left is the header. */
function readRows(source: string): Row[] {
  const path = join(process.cwd(), source);
  const lines = readFileSync(path, "utf8")
    .split("\n")
    .filter((line) => line.trim() !== "" && !line.startsWith("#"));

  // The files are edited in a spreadsheet, so one can come back empty. No header
  // means no slots, which every screen already handles.
  const [headerLine, ...bodyLines] = lines;
  if (!headerLine) return [];

  const header = headerLine.split("\t").map((key) => key.trim());
  return bodyLines.map((line) => {
    const cells = line.split("\t");
    return Object.fromEntries(
      header.map((key, i) => [key, (cells[i] ?? "").trim()]),
    );
  });
}

export interface MediaSlot {
  image: string;
  alt: string;
  href: string;
}

/* D-004, keyed by slot. `page` is a label for filtering in a spreadsheet and is
   never read here. */
const MEDIA = new Map<string, MediaSlot>(
  readRows(MEDIA_SOURCE).map((row) => [
    row.slot,
    { image: row.image, alt: row.alt, href: row.href },
  ]),
);

/* D-006, keyed by slot. Same rule: `page` is a filtering label, not a key. */
const VALUES = new Map<string, string>(
  readRows(VALUES_SOURCE).map((row) => [row.slot, row.value]),
);

/* The text for one slot, or undefined when D-006 has no row for it. A missing
   slot logs, so a typo'd key does not pass as a blank on purpose. */
export function slotText(slot: string): string | undefined {
  const value = VALUES.get(slot);
  if (value === undefined) {
    console.warn(`[F-008] D-006 has no row for slot "${slot}" — left out.`);
  }
  return value;
}

/* The slot numbers of one family (hero-1, featured-2), in numeric order. The
   slot name carries the order, so re-sorting rows in a spreadsheet cannot
   silently reshuffle them. */
function numberedSlots(slots: Iterable<string>, prefix: string): string[] {
  return [...slots]
    .filter((slot) => new RegExp(`^${prefix}-\\d+$`).test(slot))
    .sort(
      (a, b) =>
        Number(a.slice(prefix.length + 1)) - Number(b.slice(prefix.length + 1)),
    );
}

export interface BandCopy {
  eyebrow?: string;
  heading?: string;
  paragraph?: string;
}

/* The three text slots of one editorial band, keyed <section-id>.<role> — so
   band s-003.3 reads s-003.3.eyebrow, .heading and .paragraph. Any role with no
   row comes back undefined and the band leaves it out. */
export function bandCopy(id: string): BandCopy {
  return {
    eyebrow: slotText(`${id}.eyebrow`),
    heading: slotText(`${id}.heading`),
    paragraph: slotText(`${id}.paragraph`),
  };
}

export interface FaqItem {
  q: string;
  a: string;
}

/* The question and answer pairs of one FAQ section, keyed <section-id>.qN and
   <section-id>.aN, in numeric order.

   A pair is atomic. Everywhere else a missing slot just leaves a field blank,
   but here a question with no answer renders a row that opens onto nothing, so
   the whole pair is left out and logged. Indexes come from the rows themselves,
   so a gap in the numbering skips that pair instead of ending the list. */
export function faqItems(id: string): FaqItem[] {
  const escaped = id.replace(/\./g, "\\.");
  const pattern = new RegExp(`^${escaped}\\.[qa](\\d+)$`);

  const indexes = new Set<number>();
  for (const slot of VALUES.keys()) {
    const match = slot.match(pattern);
    if (match) indexes.add(Number(match[1]));
  }

  const items: FaqItem[] = [];
  for (const n of [...indexes].sort((a, b) => a - b)) {
    const q = VALUES.get(`${id}.q${n}`);
    const a = VALUES.get(`${id}.a${n}`);
    if (q === undefined || a === undefined) {
      console.warn(
        `[F-008] FAQ pair ${id}-${n} has no ${q === undefined ? "question" : "answer"} — pair left out.`,
      );
      continue;
    }
    items.push({ q, a });
  }
  return items;
}

export interface ProseSection {
  heading: string;
  paragraph: string;
}

/* The run of heading-and-paragraph sections that make up a prose screen, keyed
   <section-id>.<n>.heading and .paragraph. Section 1 is the page title, so the
   run starts at 2.

   Like an FAQ pair, a section is atomic: a heading with no body would print a
   title over nothing, so the section is left out and logged. */
export function proseSections(id: string, from = 2): ProseSection[] {
  const escaped = id.replace(/\./g, "\\.");
  const pattern = new RegExp(`^${escaped}\\.(\\d+)\\.(?:heading|paragraph)$`);

  const numbers = new Set<number>();
  for (const slot of VALUES.keys()) {
    const match = slot.match(pattern);
    if (match && Number(match[1]) >= from) numbers.add(Number(match[1]));
  }

  const sections: ProseSection[] = [];
  for (const n of [...numbers].sort((a, b) => a - b)) {
    const heading = VALUES.get(`${id}.${n}.heading`);
    const paragraph = VALUES.get(`${id}.${n}.paragraph`);
    if (heading === undefined || paragraph === undefined) {
      console.warn(
        `[F-008] prose section ${id}.${n} has no ${heading === undefined ? "heading" : "body"} — section left out.`,
      );
      continue;
    }
    sections.push({ heading, paragraph });
  }
  return sections;
}

export interface MetaCopy {
  title?: string;
  description?: string;
}

/* A screen's title tag and meta description, keyed <section-id>.meta.title and
   .meta.description. Each is a full title, so pages pass it through as an
   absolute title rather than the "%s · SHER" template. A missing one is left
   out, which falls back to the site default rather than emitting an empty tag. */
export function metaCopy(id: string): MetaCopy {
  return {
    title: slotText(`${id}.meta.title`),
    description: slotText(`${id}.meta.description`),
  };
}

/* One media slot from D-004, or undefined when the file has no row for it. */
export function mediaSlot(slot: string): MediaSlot | undefined {
  return MEDIA.get(slot);
}

/* The slot names of one numbered media family (hero-1, hero-2), in order. */
export function mediaSlots(prefix: string): string[] {
  return numberedSlots(MEDIA.keys(), prefix);
}

/* The slot names of one numbered value family (featured-1, featured-2), in
   order. */
export function valueSlots(prefix: string): string[] {
  return numberedSlots(VALUES.keys(), prefix);
}
