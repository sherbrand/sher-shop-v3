import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { HeroSlide } from "@/components/C-HeroCarousel";
import type { CategoryItem } from "@/components/C-CategoryGrid";

/* D-004 Home Content — the slot data behind the Home page (S-001, B-008):
   hero banners (F-008), category tiles (F-008), and featured products (F-012).

   The data lives in a TSV so it can be edited in a spreadsheet without touching
   code. Source: docs/content/d-004_home.tsv. This file only reads that TSV and
   shapes it into the props the components take.

   Page copy (the intro title and the closing CTA) is NOT here. It sits inline in
   app/page.tsx, the same as every other page. D-004 holds slots, not prose. */

const SOURCE = "docs/content/d-004_home.tsv";

// Design fallback, not content: a hero slot with no image shows the brand tone,
// so the transparent site header still reads over it.
const HERO_FALLBACK_BG = "var(--sher-dark)";

type Row = Record<string, string>;

/* Reads the TSV into rows keyed by column name. Note lines (#) and blank lines
   are dropped, and the first line left is the header. */
function readRows(): Row[] {
  const path = join(process.cwd(), SOURCE);
  const lines = readFileSync(path, "utf8")
    .split("\n")
    .filter((line) => line.trim() !== "" && !line.startsWith("#"));

  // The file is edited in a spreadsheet, so it can come back empty. No header
  // means no slots, which the page already handles.
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

const ROWS = readRows();

/* The rows of one type, in the order they appear in the file. */
function ofType(type: string): Row[] {
  return ROWS.filter((row) => row.type === type);
}

/* S-001.1 — hero banners. Home REQUIRES a hero band: the site header renders as
   a transparent overlay over it and only hands off to the sticky header once the
   hero scrolls past (see SiteHeader). The carousel slides once there is more
   than one banner. Overlay text is optional per slot. */
export const HERO_SLIDES: HeroSlide[] = ofType("hero").map((row) => ({
  bg: HERO_FALLBACK_BG,
  image: row.image || undefined,
  alt: row.alt || undefined,
  eyebrow: row.eyebrow || undefined,
  heading: row.heading || undefined,
  cta: row.label && row.link ? { label: row.label, href: row.link } : undefined,
}));

/* S-001.3 — category tiles. A tile with no image falls back to its tone. The
   slot name doubles as the React key, matching the design export's slot ids.

   The slot's alt is not read here on purpose. Each tile is a link that already
   shows its label, so the label is the link's name. Adding the alt as well would
   make a screen reader read the photo and then the label. The alt column stays in
   the TSV as the note for whoever picks the photo. */
export const HOME_CATEGORIES: CategoryItem[] = ofType("tile").map((row) => ({
  label: row.label,
  href: row.link,
  id: row.slot,
  image: row.image || undefined,
}));

/* S-001.4 — featured products (F-012), hand-picked by Shopify handle. A row with
   no handle is skipped, and with none set the Home page leaves the whole
   Featured block out. */
export const FEATURED_HANDLES: string[] = ofType("featured")
  .map((row) => row.handle)
  .filter((handle) => handle !== "");
