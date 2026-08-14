import React from "react";
import { Heading } from "../module/Heading.jsx";

/* ContentProse — the policy page band (shipping & returns, privacy, terms):
   a full-width section that centres a run of heading + paragraph blocks at a
   readable measure. Owns its own band padding, content width, heading/body sizes
   and block rhythm, all stepped by CSS container queries on its OWN width — a
   page only places it.
   `paragraph` takes a string or an array of strings (the notation allows a section
   to run to several paragraphs). Email addresses render as mailto links. */


// split a paragraph so any email address becomes a mailto link.
// the domain group repeats \.[\w-]+ so it can't end on a dot — a trailing
// sentence period stays outside the address.
function withLinks(text) {
  const parts = String(text).split(/([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g);
  return parts.map((p, i) =>
    /^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/.test(p)
      ? <a key={i} href={`mailto:${p}`} style={{ color: "var(--text-strong)",
          textDecoration: "underline", textUnderlineOffset: "0.2em" }}>{p}</a>
      : p);
}

export function ContentProse({
  items = [],
  headingLevel = 2,
  measure = "72ch",
  contentWidth = "var(--container-prose)",
  background,
  paddingTop,
  children,
  className = "",
  style = {},
}) {
  return (
    <section className={"sher-band sher-contentprose " + className} style={{
      paddingTop: paddingTop != null ? paddingTop : undefined,
      background: background || "transparent", ...style,
    }}>
      <div className="sher-contentprose-inner" style={{ maxWidth: contentWidth, margin: "0 auto" }}>
        {items.map((it, i) => (
          <div key={it.heading || i} style={{ display: "flex", flexDirection: "column",
            gap: "var(--space-3)" }}>
            <Heading level={headingLevel} className="t-section" style={{ margin: 0 }}>
              {it.heading}
            </Heading>
            {(Array.isArray(it.paragraph) ? it.paragraph : [it.paragraph])
              .filter(Boolean).map((para, k) => (
                <p key={k} className="t-body" style={{ margin: 0, color: "var(--text-default)",
                  lineHeight: "var(--leading-normal)", maxWidth: measure }}>
                  {withLinks(para)}
                </p>
              ))}
          </div>
        ))}
        {children && <div style={{ marginTop: "var(--space-5)", display: "flex",
          gap: "var(--space-3)", flexWrap: "wrap" }}>{children}</div>}
      </div>
    </section>
  );
}
