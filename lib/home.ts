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

  const header = lines[0].split("\t").map((key) => key.trim());
  const rows = lines.slice(1).map((line) => {
    const cells = line.split("\t");
    return Object.fromEntries(
      header.map((key, i) => [key, (cells[i] ?? "").trim()]),
    );
  });

  console.debug(`[D-004] read ${rows.length} slot rows from ${SOURCE}`);
  return rows;
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
  eyebrow: row.eyebrow || undefined,
  heading: row.heading || undefined,
  cta: row.label && row.link ? { label: row.label, href: row.link } : undefined,
}));

/* S-001.3 — category tiles. A tile with no image falls back to its tone. The
   slot name doubles as the React key, matching the design export's slot ids. */
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

console.debug(
  `[D-004] ${HERO_SLIDES.length} hero, ${HOME_CATEGORIES.length} tiles, ${FEATURED_HANDLES.length} featured`,
);
