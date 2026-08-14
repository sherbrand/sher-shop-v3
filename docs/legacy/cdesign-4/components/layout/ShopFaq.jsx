import React from "react";
import { Heading } from "../module/Heading.jsx";
import { Accordion } from "../module/Accordion.jsx";

/* ShopFaq — the FAQ band: a heading beside its accordion at two-up, stacking to
   one column below 768px. The heading sits vertically centred against the
   accordion. Layout and heading size come from CSS container queries on the
   band's OWN width (tokens/components.css) — no JS measurement. */


export function ShopFaq({
  heading = "Frequently Asked Questions",
  headingLevel = 2,
  items = [],
  itemHeadingLevel = 3,
  defaultOpen = 0,
  single = true,
  align = "center",      // heading block: "center" | "start" (vertical, at two-up)
  className = "",
  style = {},
}) {
  return (
    <div className={"sher-band " + className} style={style}>
      <div className={"sher-shopfaq" + (align === "center" ? " align-center" : "")}>
        <Heading level={headingLevel} className="hd t-section"
          style={{ margin: 0,
            fontFamily: "var(--font-display)", textTransform: "uppercase",
            letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-snug)",
            color: "var(--text-strong)", fontWeight: 400, }}>{heading}</Heading>
        <Accordion items={items} headingLevel={itemHeadingLevel}
          defaultOpen={defaultOpen} single={single} />
      </div>
    </div>
  );
}
