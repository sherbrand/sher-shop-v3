/* The page's vertical rhythm.

   Every band sits on the same stepped scale, so the page breathes more as it
   gets wider: --space-7 on a phone, --space-8 from 640, --space-9 from 1024.
   The design system carries this as `.sec` padding; the repo has no equivalent
   class, so each band wrapper takes it from here rather than writing the three
   steps out again.

   These are container queries, not viewport ones. `body` is the query container
   (base.css declares it), and every band is a descendant, so they resolve
   against the page's own width the way the design system intends.

   Horizontal padding is not here: a band pairs this with `px-[var(--gutter)]`,
   and --gutter already steps on its own. */

/** Vertical padding for a band that draws its own top and bottom space. */
export const SECTION_Y =
  "py-[var(--space-7)] @min-[640px]:py-[var(--space-8)] @min-[1024px]:py-[var(--space-9)]";

/** The same scale as a flex/grid gap, for a page that spaces its bands instead
 *  of padding each one. */
export const SECTION_GAP =
  "gap-[var(--space-7)] @min-[640px]:gap-[var(--space-8)] @min-[1024px]:gap-[var(--space-9)]";

/** Bottom margin on the same scale, for a mark that opens a band. */
export const SECTION_MB =
  "mb-[var(--space-7)] @min-[640px]:mb-[var(--space-8)] @min-[1024px]:mb-[var(--space-9)]";
