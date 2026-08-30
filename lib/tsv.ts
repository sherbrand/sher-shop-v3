import { readFileSync } from "node:fs";
import { join } from "node:path";

/* The reader every data/ TSV shares. The files are edited in a spreadsheet, so
   they are read as text: note lines (#) and blank lines are dropped, and the
   first line left is the header.

   Read on the server at module load. A dev server holds the parsed copy in
   memory, so restart it after editing a file in data/. */

export type TsvRow = Record<string, string>;

export function readRows(source: string): TsvRow[] {
  const path = join(process.cwd(), source);
  const lines = readFileSync(path, "utf8")
    .split("\n")
    .filter((line) => line.trim() !== "" && !line.startsWith("#"));

  // A file can come back empty from a spreadsheet. No header means no rows,
  // which every caller already handles.
  const [headerLine, ...bodyLines] = lines;
  if (!headerLine) return [];

  const header = headerLine.split("\t").map((key) => key.trim());
  return bodyLines.map((line) => {
    const cells = line.split("\t");
    return Object.fromEntries(header.map((key, i) => [key, (cells[i] ?? "").trim()]));
  });
}
