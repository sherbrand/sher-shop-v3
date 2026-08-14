import React from "react";
import { Heading } from "../module/Heading.jsx";
import { IconButton } from "../module/IconButton.jsx";
import { Icon } from "../module/Icon.jsx";

/* C-Sizing — Size Chart Drawer (F-007 Size Chart).
   Renders only the measurements a product defines; the inches table is worked out
   from the cm values (D-005). Slides from the right. */


const DEFAULT_CHART = {
  measures: [
    { key: "bust", label: "Bust" },
    { key: "waist", label: "Waist" },
    { key: "length", label: "Length" },
  ],
  rows: [
    { size: "XS", cm: { bust: 78, waist: 60, length: 38 } },
    { size: "S", cm: { bust: 82, waist: 64, length: 39 } },
    { size: "M", cm: { bust: 87, waist: 69, length: 40 } },
    { size: "L", cm: { bust: 93, waist: 75, length: 41 } },
    { size: "XL", cm: { bust: 99, waist: 81, length: 42 } },
  ],
};

const toInch = (cm) => Math.round((cm / 2.54) * 10) / 10;

function Table({ measures, rows, unit }) {
  const cell = {
    padding: "var(--pad-pill-y) var(--space-3)", textAlign: "left", fontFamily: "var(--font-body)",
    fontSize: "var(--size-sm)", borderBottom: "1px solid var(--border-default)",
  };
  const head = { ...cell, color: "var(--text-meta)", textTransform: "uppercase",
    letterSpacing: "var(--tracking-label)", fontSize: "var(--size-xs)" };
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "var(--space-5)" }}>
      <thead>
        <tr>
          <th style={head}>Size</th>
          {measures.map((m) => <th key={m.key} style={{ ...head, textAlign: "right" }}>{m.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.size}>
            <td style={{ ...cell, color: "var(--text-strong)" }}>{r.size}</td>
            {measures.map((m) => (
              <td key={m.key} style={{ ...cell, textAlign: "right", color: "var(--text-default)",
                fontVariantNumeric: "tabular-nums" }}>
                {unit === "in" ? toInch(r.cm[m.key]) : r.cm[m.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Sizing({
  open = false,
  onClose,
  headingLevel = 2,
  productName = "",
  chart = DEFAULT_CHART,
  className = "",
  style = {},
}) {
  // keep only measures that at least one row actually defines
  const measures = chart.measures.filter((m) => chart.rows.some((r) => r.cm[m.key] != null));
  return (
    <div aria-hidden={!open} style={{ position: "fixed", inset: 0, zIndex: "var(--z-drawer)",
      pointerEvents: open ? "auto" : "none" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0,
        background: "var(--scrim)", opacity: open ? 1 : 0,
        transition: "opacity var(--dur-med) var(--ease-out)" }} />
      <aside
        className={"sher-band " + className}
        aria-label="Size chart"
        style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: "min(94vw, 460px)",
          background: "var(--surface-page)", boxShadow: "var(--shadow-drawer)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform var(--dur-med) var(--ease-out)",
          display: "flex", flexDirection: "column", ...style,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          padding: "var(--space-5)", borderBottom: "1px solid var(--border-default)" }}>
          <div>
            <Heading level={headingLevel} className="t-title" style={{
              margin: 0, fontFamily: "var(--font-display)", textTransform: "uppercase",
              letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-snug)",
              color: "var(--text-strong)", fontWeight: 400,
            }}>Size Chart</Heading>
            {productName && <p style={{ margin: "0.25rem 0 0", color: "var(--text-meta)",
              fontSize: "var(--size-sm)" }}>{productName}</p>}
          </div>
          <IconButton label="Close size chart" onClick={onClose}><Icon name="close" size={24} /></IconButton>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "var(--space-5)" }}>
          <p style={{ marginTop: 0, color: "var(--text-default)", fontSize: "var(--size-sm)",
            lineHeight: "var(--leading-normal)" }}>
            This guide is measurements-based and varies by style. Every piece can be tailored —
            reach out if you're unsure and we'll help you choose.
          </p>
          <p className="sher-eyebrow" style={{ margin: "var(--space-5) 0 var(--space-2)" }}>Centimetres</p>
          <Table measures={measures} rows={chart.rows} unit="cm" />
          <p className="sher-eyebrow" style={{ margin: "0 0 var(--space-2)" }}>Inches</p>
          <Table measures={measures} rows={chart.rows} unit="in" />
        </div>
      </aside>
    </div>
  );
}
