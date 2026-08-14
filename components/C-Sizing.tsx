"use client";

import type { ReactElement } from "react";
import { Heading } from "@/components/Heading";
import type { HeadingLevel } from "@/components/Heading";
import { IconButton } from "@/components/IconButton";
import { Icon } from "@/components/Icon";

/* C-Sizing — the size-chart drawer. Renders only the measurements a product
   defines; the inches table is worked out from the cm values. Slides from the
   right. */

export interface SizeMeasure {
  key: string;
  label: string;
}

export interface SizeRow {
  size: string;
  cm: Record<string, number>;
}

export interface SizeChart {
  measures: SizeMeasure[];
  rows: SizeRow[];
}

export interface SizingProps {
  open?: boolean;
  onClose?: () => void;
  /** HTML level (h1–h4) for the "Size Chart" heading — tag only, not style. Default 2. */
  headingLevel?: HeadingLevel;
  productName?: string;
  /** Measures + per-size cm rows. Omitted measures are dropped from the table. */
  chart?: SizeChart;
  className?: string;
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

// Stepped title size, resolved against the drawer's own width.
const STEP_TITLE =
  "text-[length:var(--size-title-sm)] @min-[640px]:text-[length:var(--size-title-md)] @min-[1024px]:text-[length:var(--size-title-lg)]";

const EYEBROW =
  "font-[family-name:var(--font-body)] text-[length:var(--size-xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-meta)]";

const CELL =
  "border-b border-[var(--border-default)] px-[var(--space-3)] py-[var(--pad-pill-y)] text-left font-[family-name:var(--font-body)] text-[length:var(--size-sm)]";
const HEAD = `${CELL} text-[length:var(--size-xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-meta)]`;

const toInch = (cm: number): number => Math.round((cm / 2.54) * 10) / 10;

function Table({
  measures,
  rows,
  unit,
}: {
  measures: SizeMeasure[];
  rows: SizeRow[];
  unit: "cm" | "in";
}): ReactElement {
  return (
    <table className="mb-[var(--space-5)] w-full border-collapse">
      <thead>
        <tr>
          <th className={HEAD}>Size</th>
          {measures.map((measure) => (
            <th key={measure.key} className={`${HEAD} text-right`}>
              {measure.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.size}>
            <td className={`${CELL} text-[var(--text-strong)]`}>{row.size}</td>
            {measures.map((measure) => (
              <td
                key={measure.key}
                className={`${CELL} text-right tabular-nums text-[var(--text-default)]`}
              >
                {unit === "in" ? toInch(row.cm[measure.key]) : row.cm[measure.key]}
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
}: SizingProps): ReactElement {
  // Keep only measures that at least one row actually defines.
  const measures = chart.measures.filter((measure) =>
    chart.rows.some((row) => row.cm[measure.key] != null),
  );

  return (
    <div
      aria-hidden={!open}
      inert={!open}
      className={`fixed inset-0 z-[var(--z-drawer)] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-[var(--scrim)] transition-opacity duration-[var(--dur-med)] ease-[var(--ease-out)] ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        aria-label="Size chart"
        className={[
          "@container absolute bottom-0 right-0 top-0 flex w-[min(94vw,460px)] flex-col",
          "bg-[var(--surface-page)] shadow-[var(--shadow-drawer)]",
          "transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)]",
          open ? "translate-x-0" : "translate-x-full",
          className,
        ].join(" ")}
      >
        <div className="flex items-start justify-between border-b border-[var(--border-default)] p-[var(--space-5)]">
          <div>
            <Heading
              level={headingLevel}
              className={`m-0 font-[family-name:var(--font-display)] font-normal uppercase leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[var(--text-strong)] ${STEP_TITLE}`}
            >
              Size Chart
            </Heading>
            {productName && (
              <p className="m-0 mt-[0.25rem] text-[length:var(--size-sm)] text-[var(--text-meta)]">
                {productName}
              </p>
            )}
          </div>
          <IconButton label="Close size chart" onClick={onClose}>
            <Icon name="close" size={24} />
          </IconButton>
        </div>

        <div className="flex-1 overflow-y-auto p-[var(--space-5)]">
          <p className="mt-0 text-[length:var(--size-sm)] leading-[var(--leading-normal)] text-[var(--text-default)]">
            This guide is measurements-based and varies by style. Every piece can be tailored —
            reach out if you&apos;re unsure and we&apos;ll help you choose.
          </p>
          <p className={`mb-[var(--space-2)] mt-[var(--space-5)] ${EYEBROW}`}>Centimetres</p>
          <Table measures={measures} rows={chart.rows} unit="cm" />
          <p className={`mb-[var(--space-2)] mt-0 ${EYEBROW}`}>Inches</p>
          <Table measures={measures} rows={chart.rows} unit="in" />
        </div>
      </aside>
    </div>
  );
}
