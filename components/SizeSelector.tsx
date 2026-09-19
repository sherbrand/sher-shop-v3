"use client";

import { useState } from "react";
import type { ReactElement } from "react";

/* SizeSelector — the product page's size chips. Sold-out sizes render disabled
   with a struck label. Controlled (`value`/`onChange`) or uncontrolled.

   `shape`: "chip" is the wide rounded chip, the selected one inverting to the dark
   fill. "circle" is the minimal round well — transparent at rest with a hairline and a
   strong label, the SELECTED one taking the dark fill with textOnInverse. It keeps its
   hairline when selected, so selection reads as a fill change and nothing shifts.
   `align` centres the label and the row for a centred purchase panel. */

export interface SizeOption {
  /** Size label, e.g. "S". */
  label: string;
  /** Render disabled and struck through. */
  soldOut?: boolean;
}

export interface SizeSelectorProps {
  sizes?: SizeOption[];
  /** Controlled selected size label. */
  value?: string | null;
  /** Initial selection when uncontrolled. Defaults to the first in-stock size. */
  defaultValue?: string;
  onChange?: (label: string) => void;
  /** Chip shape. Default "chip". */
  shape?: "chip" | "circle";
  /** "center" centres the label and the chip row. Default "start". */
  align?: "start" | "center";
  /** Group label above the chips. Default "Size". */
  label?: string;
  className?: string;
}

export function SizeSelector({
  sizes = [],
  value,
  defaultValue,
  onChange,
  label = "Size",
  shape = "chip",
  align = "start",
  className = "",
}: SizeSelectorProps): ReactElement {
  const firstInStock = sizes.find((s) => !s.soldOut);
  const [internal, setInternal] = useState<string | null>(
    defaultValue ?? firstInStock?.label ?? null,
  );
  const current = value !== undefined ? value : internal;

  const select = (option: SizeOption): void => {
    if (option.soldOut) return;
    if (value === undefined) setInternal(option.label);
    onChange?.(option.label);
  };

  const circle = shape === "circle";
  const mid = align === "center";

  return (
    <div
      className={`flex flex-col gap-[var(--space-3)] ${mid ? "items-center" : ""} ${className}`}
    >
      {label && (
        <span className="font-[family-name:var(--font-body)] text-[length:var(--size-xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-meta)]">
          {label}
        </span>
      )}
      <div
        role="group"
        aria-label={label || "Size"}
        className={[
          "flex flex-wrap",
          circle ? "gap-[var(--space-3)]" : "gap-[var(--space-2)]",
          mid ? "justify-center" : "",
        ].join(" ")}
      >
        {sizes.map((option) => {
          const active = option.label === current;
          return (
            <button
              key={option.label}
              type="button"
              disabled={option.soldOut}
              aria-pressed={active}
              aria-label={option.soldOut ? `${option.label} — sold out` : option.label}
              onClick={() => select(option)}
              className={[
                "border",
                "font-[family-name:var(--font-button)] uppercase tracking-[var(--tracking-label)]",
                "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]",
                circle
                  ? /* --control-well, not --control-hit: the circle is a size chip in a
                       tight cluster, where the 44px tap target reads as chunky. The wide
                       chip keeps the 44px floor.
                       It holds one fixed body size at every width: it is a control, not
                       running copy, and stepping it would break the well. */
                    "h-[var(--control-well)] w-[var(--control-well)] min-h-[var(--control-well)] min-w-0 p-0 rounded-[var(--radius-pill)] text-[length:var(--size-body-md)]"
                  : "min-h-[var(--control-hit)] min-w-[var(--control-min-w)] px-[var(--space-3)] py-0 rounded-[var(--radius-sm)] text-[length:var(--size-xs)]",
                /* Selection is the DARK fill. --surface-raised read as a hover or a
                   disabled well rather than a choice, since it is also the purchase
                   panel's own surface tone. --sher-dark is the strongest ink in the
                   system and nothing else in the panel wears it.
                   An unselected circle wears the same ink and hairline as the secondary
                   button below it, so the chips and the Add to Cart outline read as one
                   family. The old --text-meta / --border-strong pair made the chips look
                   disabled beside it. Hover matches `secondary` too. */
                active
                  ? circle
                    ? "border-[var(--surface-inverse)] bg-[var(--sher-dark)] text-[var(--text-on-inverse)]"
                    : "border-[var(--surface-inverse)] bg-[var(--surface-inverse)] text-[var(--text-on-inverse)]"
                  : circle
                    ? "border-[var(--text-strong)] bg-transparent text-[var(--text-strong)]"
                    : "border-[var(--border-strong)] bg-transparent text-[var(--text-strong)]",
                !active && !option.soldOut ? "hover:bg-[var(--surface-tint)]" : "",
                option.soldOut ? "cursor-not-allowed line-through opacity-35" : "cursor-pointer",
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
