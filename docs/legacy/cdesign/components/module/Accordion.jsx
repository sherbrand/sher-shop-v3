import React from "react";
import { Heading } from "./Heading.jsx";
import { Icon } from "./Icon.jsx";

/* Accordion — stacked disclosure rows for FAQ blocks. One item open at a time by
   default (`single`), or allow many. Rows are hairline-separated; the trigger is
   a full-width button with a rotating chevron. */

export function Accordion({
  items = [],
  headingLevel = 3,
  single = true,
  defaultOpen = null,
  className = "",
  style = {},
}) {
  const [open, setOpen] = React.useState(defaultOpen == null ? [] : [defaultOpen]);
  const isOpen = (i) => open.indexOf(i) !== -1;
  const toggle = (i) => setOpen((prev) => {
    if (prev.indexOf(i) !== -1) return prev.filter((x) => x !== i);
    return single ? [i] : prev.concat(i);
  });

  return (
    <div className={className} style={{ borderTop: "1px solid var(--border-default)", ...style }}>
      {items.map((it, i) => {
        const o = isOpen(i);
        return (
          <div key={i} style={{ borderBottom: "1px solid var(--border-default)" }}>
            <Heading level={headingLevel} style={{ margin: 0 }}>
              <button type="button" onClick={() => toggle(i)} aria-expanded={o}
                style={{ width: "100%", display: "flex", alignItems: "center",
                  justifyContent: "space-between", gap: "var(--space-4)",
                  padding: "var(--space-5) 0", background: "none", border: "none",
                  cursor: "pointer", textAlign: "left", color: "var(--text-strong)",
                  font: "inherit", fontFamily: "var(--font-display)",
                  textTransform: "uppercase", letterSpacing: "var(--tracking-display)",
                  fontSize: "var(--fs-sub, var(--text-sub))", lineHeight: "var(--leading-snug)" }}>
                <span>{it.q}</span>
                <span style={{ flexShrink: 0, display: "inline-flex",
                  transform: o ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform var(--dur-med) var(--ease-out)" }}>
                  <Icon name="chevron-down" size={20} />
                </span>
              </button>
            </Heading>
            <div style={{ overflow: "hidden",
              maxHeight: o ? 600 : 0, opacity: o ? 1 : 0,
              transition: "max-height var(--dur-slow) var(--ease-out), opacity var(--dur-med) var(--ease-out)" }}>
              <p style={{ margin: 0, paddingBottom: "var(--space-5)",
                color: "var(--text-default)", fontSize: "var(--fs-body, var(--text-body-lg))",
                lineHeight: "var(--leading-normal)", maxWidth: "72ch" }}>{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
