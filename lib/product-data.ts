import { readRows } from "@/lib/tsv";
import type { SizeChart, SizeRow } from "@/components/C-Sizing";

/* D-005 Product Data — the per-product facts that are not in Shopify, keyed by
   the product's slug. Today that is the size chart. The file holds one column
   per measure and size (`bust_XS`, `bust_S`, …).

   The values are inches, and they are text, not numbers: a measurement can be a
   single number, a range like 30-31, FS for a free size, or two numbers like
   9 / 14 where a set has a separate top and bottom length. C-Sizing works the
   centimetres out from them.

   A product with no row gets an empty chart, and C-Sizing renders no table. */

const SOURCE = "data/d-005_product-data.tsv";

// Column order in the chart, left to right. A measure no size fills is dropped
// by C-Sizing, so every product can be read against the same list.
const MEASURES = [
  { key: "bust", label: "Bust" },
  { key: "waist", label: "Waist" },
  { key: "hip", label: "Hip" },
  { key: "length", label: "Length" },
];

// Row order in the chart, top to bottom. A size the product does not sell has
// no values and is left out.
const SIZES = ["XS", "S", "M", "L"];

const EMPTY: SizeChart = { measures: [], rows: [] };

const BY_SLUG = new Map(readRows(SOURCE).map((row) => [row.slug, row]));

/* The size chart for one product, or an empty chart when D-005 has no row for
   it. Only the sizes that carry a measurement become rows. */
export function sizeChart(slug: string): SizeChart {
  const row = BY_SLUG.get(slug);
  if (!row) {
    console.warn(`[D-005] no row for "${slug}" — the size chart is left empty.`);
    return EMPTY;
  }

  const rows: SizeRow[] = [];
  for (const size of SIZES) {
    const values: Record<string, string> = {};
    for (const measure of MEASURES) {
      const value = row[`${measure.key}_${size}`];
      if (value) values[measure.key] = value;
    }
    // A size the product does not sell leaves every column blank.
    if (Object.keys(values).length > 0) rows.push({ size, in: values });
  }

  if (rows.length === 0) {
    console.warn(`[D-005] "${slug}" has a row but no measurements — chart left empty.`);
    return EMPTY;
  }
  return { measures: MEASURES, rows };
}

/* A media position from D-005, counted the way Shopify's admin counts it: from
   1, with the video counted. 0 when the column is blank or the row is missing.

   A position moves when media does. Add a video, or reorder the images, and the
   card quietly shows a different picture, so both columns are worth checking
   whenever a product's media changes. */
function position(slug: string, column: "thumb" | "hover"): number {
  const raw = BY_SLUG.get(slug)?.[column];
  if (!raw) return 0;
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 1) {
    console.warn(`[D-005] "${slug}" has ${column}="${raw}", which is not a position — ignored.`);
    return 0;
  }
  return n;
}

/* Which media the grid card shows. 0 leaves the card on the featured image. */
export function thumbIndex(slug: string): number {
  return position(slug, "thumb");
}

/* Which media the card moves to on hover. 0 means the column is blank, and the
   card falls back to the first media that is not its own. */
export function hoverIndex(slug: string): number {
  return position(slug, "hover");
}
