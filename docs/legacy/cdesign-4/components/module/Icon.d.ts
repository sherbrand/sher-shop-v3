import * as React from "react";

/**
 * SHER icon set. UI glyphs render in the brand's Lucide line style (1.5px stroke);
 * social names render as filled Simple Icons marks (official social links only).
 */
export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Glyph name. UI: menu, close, bag, chevron-down, chevron-right, chevron-left,
   *  arrow-right, minus, plus, trash, ruler. Brand: instagram, facebook, tiktok. */
  name:
    | "menu" | "close" | "bag" | "tote" | "trolley" | "chevron-down" | "chevron-right" | "chevron-left"
    | "arrow-right" | "minus" | "plus" | "trash" | "ruler"
    | "instagram" | "facebook" | "tiktok";
  /** Pixel size (width & height). Default 20. */
  size?: number;
  /** Stroke width for UI icons. Default 1.5. Ignored by brand marks. */
  strokeWidth?: number;
}

export function Icon(props: IconProps): JSX.Element;
