"use client";

import { useState } from "react";
import type { ReactElement, CSSProperties } from "react";

/* ViewToggle — the grid view toggle. A compact segmented control that switches the
   product grid density (fewer vs more columns). Each option renders a glyph of N
   vertical bars for its column count. Controlled (`value`) or uncontrolled. */

interface ViewOption {
  key: string;
  bars: number;
  label: string;
}

export interface ViewToggleProps {
  value?: string;
  defaultValue?: string;
  /** Options; each shows N bars for its column count. Defaults to comfortable/compact. */
  options?: ViewOption[];
  onChange?: (key: string) => void;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_OPTIONS: ViewOption[] = [
  { key: "comfortable", bars: 2, label: "Larger cards" },
  { key: "compact", bars: 3, label: "Smaller cards" },
];

function Bars({ n, active }: { n: number; active: boolean }): ReactElement {
  return (
    <span className="inline-flex h-[14px] items-stretch gap-[2px]">
      {Array.from({ length: n }).map((_, k) => (
        <span
          key={k}
          className={`w-[3px] rounded-[1px] ${active ? "bg-[var(--text-on-inverse)]" : "bg-[var(--text-strong)]"}`}
        />
      ))}
    </span>
  );
}

export function ViewToggle({
  value,
  defaultValue,
  options = DEFAULT_OPTIONS,
  onChange,
  className = "",
  style,
}: ViewToggleProps): ReactElement {
  const [internal, setInternal] = useState(defaultValue ?? options[0].key);
  const val = value != null ? value : internal;
  const set = (k: string): void => {
    if (value == null) setInternal(k);
    onChange?.(k);
  };
  return (
    <div
      role="group"
      aria-label="Grid view"
      className={`inline-flex overflow-hidden rounded-[var(--radius-sm)] border border-[var(--border-strong)] ${className}`}
      style={style}
    >
      {options.map((o) => {
        const active = o.key === val;
        return (
          <button
            key={o.key}
            type="button"
            aria-label={o.label}
            title={o.label}
            aria-pressed={active}
            onClick={() => set(o.key)}
            className={`inline-flex h-[34px] w-[40px] cursor-pointer items-center justify-center border-none p-0 transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] ${
              active ? "bg-[var(--surface-inverse)]" : "bg-transparent"
            }`}
          >
            <Bars n={o.bars} active={active} />
          </button>
        );
      })}
    </div>
  );
}
