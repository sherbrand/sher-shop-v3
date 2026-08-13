import * as React from "react";

/**
 * Divider — the end/section mark that closes a band or separates one from the
 * next. C-ProductGrid uses it for its `endMark`; pages place it directly above or
 * below a section.
 */
export interface DividerProps {
  /** "rule" (short centred hairline), "mark" (diamond on a tapered hairline,
   *  default), or "monogram" (the SHER mark between two outward-fading rules). */
  variant?: "rule" | "mark" | "monogram";
  /** Ring colour knocked out behind the "mark" diamond — set it to the band's own
   *  background when the divider sits on a tinted section. Default surfacePage. */
  knockout?: string;
}

export function Divider(props: DividerProps): JSX.Element;
