"use client";

import type { ReactElement, CSSProperties } from "react";
import { Heading } from "@/components/Heading";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";

/* C-Sizing — Size Chart Drawer.
   Renders only the measurements a product defines; the inches table is worked out
   from the cm values. Slides from the right. */

interface Measure {
  key: string;
  label: string;
}
interface SizeRow {
  size: string;
  cm: Record<string, number>;
}
interface SizeChart {
  measures: Measure[];
  rows: SizeRow[];
}

export interface SizingProps {
  open?: boolean;
  onClose?: () => void;
  /** HTML level (h1–h4) for the "Size Chart" heading — tag only, not style. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4;
  productName?: string;
  /** Measures + per-size cm rows. Omitted measures are dropped from the table. */
  chart?: SizeChart;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_CHART: SizeChart = {
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

const toInch = (cm: number): number => Math.round((cm / 2.54) * 10) / 10;

function Table({ measures, rows, unit }: { measures: Measure[]; rows: SizeRow[]; unit: "cm" | "in" }): ReactElement {
  // 0.6rem vertical cell padding sits off the spacing scale — see the design fix prompt.
  const cell = "border-b border-[var(--border-default)] px-[var(--space-3)] py-[0.6rem] font-[family-name:var(--font-body)] text-[length:var(--text-sm)]";
  const head = "border-b border-[var(--border-default)] px-[var(--space-3)] py-[0.6rem] text-[length:var(--text-xs)] uppercase tracking-[var(--tracking-2)] text-[var(--text-muted)]";
  return (
    <table className="mb-[var(--space-5)] w-full border-collapse">
      <thead>
        <tr>
          <th className={`${head} text-left`}>Size</th>
          {measures.map((m) => (
            <th key={m.key} className={`${head} text-right`}>
              {m.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.size}>
            <td className={`${cell} text-left text-[var(--text-strong)]`}>{r.size}</td>
            {measures.map((m) => (
              <td key={m.key} className={`${cell} text-right text-[var(--text-body)] [font-variant-numeric:tabular-nums]`}>
                {unit === "in" ? toInch(r.cm[m.key]) : r.cm[m.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const EYEBROW =
  "mb-[var(--space-2)] font-[family-name:var(--font-body)] text-[length:var(--text-xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-muted)]";

export function Sizing({
  open = false,
  onClose,
  headingLevel = 2,
  productName = "",
  chart = DEFAULT_CHART,
  className = "",
  style,
}: SizingProps): ReactElement {
  // keep only measures that at least one row actually defines
  const measures = chart.measures.filter((m) => chart.rows.some((r) => r.cm[m.key] != null));
  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[var(--z-drawer)] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[var(--scrim)] transition-opacity duration-[var(--dur-med)] ease-[var(--ease-out)]"
        style={{ opacity: open ? 1 : 0 }}
      />
      <aside
        aria-label="Size chart"
        className={`absolute bottom-0 right-0 top-0 flex w-[min(94vw,460px)] flex-col bg-[var(--surface-page)] shadow-[var(--shadow-drawer)] transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)] ${
          open ? "translate-x-0" : "translate-x-full"
        } ${className}`}
        style={style}
      >
        <div className="flex items-start justify-between border-b border-[var(--border-default)] p-[var(--space-5)]">
          <div>
            <Heading
              level={headingLevel}
              className="m-0 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] font-normal uppercase tracking-[var(--tracking-display)] text-[var(--text-strong)]"
            >
              Size Chart
            </Heading>
            {productName && (
              <p className="mt-[0.25rem] text-[length:var(--text-sm)] text-[var(--text-muted)]">{productName}</p>
            )}
          </div>
          <IconButton label="Close size chart" onClick={onClose}>
            <Icon name="close" size={24} />
          </IconButton>
        </div>

        <div className="flex-1 overflow-y-auto p-[var(--space-5)]">
          <p className="text-[length:var(--text-sm)] leading-[var(--leading-normal)] text-[var(--text-body)]">
            This guide is measurements-based and varies by style. Every piece can be tailored — reach out if you&apos;re
            unsure and we&apos;ll help you choose.
          </p>
          <p className={`mt-[var(--space-5)] ${EYEBROW}`}>Centimetres</p>
          <Table measures={measures} rows={chart.rows} unit="cm" />
          <p className={EYEBROW}>Inches</p>
          <Table measures={measures} rows={chart.rows} unit="in" />
        </div>
      </aside>
    </div>
  );
}
