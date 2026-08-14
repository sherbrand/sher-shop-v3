"use client";

import { useState } from "react";
import type { ReactElement } from "react";

/* SizeSelector — the product page's size chips. Sold-out sizes render disabled
   with a struck label; the selected chip inverts to the dark fill. Controlled
   (`value`/`onChange`) or uncontrolled. */

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

  return (
    <div className={`flex flex-col gap-[var(--space-3)] ${className}`}>
      <span className="font-[family-name:var(--font-body)] text-[length:var(--text-xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-meta)]">
        {label}
      </span>
      <div role="group" aria-label={label} className="flex flex-wrap gap-[var(--space-2)]">
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
                "min-h-[44px] min-w-[48px] border px-[var(--space-3)] font-[family-name:var(--font-button)]",
                "text-[length:var(--text-xs)] uppercase tracking-[var(--tracking-control)]",
                "rounded-[var(--radius-sm)] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]",
                active
                  ? "border-[var(--surface-inverse)] bg-[var(--surface-inverse)] text-[var(--text-on-inverse)]"
                  : "border-[var(--border-strong)] bg-transparent text-[var(--text-strong)]",
                option.soldOut
                  ? "cursor-not-allowed line-through opacity-35"
                  : "cursor-pointer",
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
