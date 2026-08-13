"use client";

import { useState } from "react";
import type { ReactElement } from "react";

/* ViewToggle — the grid density control. A compact segmented control that switches
   the product grid's density (fewer vs more columns). Each option renders a glyph
   of N vertical bars indicating its column count. Controlled or uncontrolled. */

export interface ViewOption {
  key: string;
  barsMobile: number;
  barsDesktop: number;
  label: string;
}

export interface ViewToggleProps {
  value?: string;
  defaultValue?: string;
  /** Options; each shows barsMobile bars, revealing up to barsDesktop at ≥1024px. Defaults to comfortable/compact. */
  options?: ViewOption[];
  onChange?: (key: string) => void;
  className?: string;
}

const DEFAULT_OPTIONS: ViewOption[] = [
  { key: "comfortable", barsMobile: 1, barsDesktop: 2, label: "Larger cards" },
  { key: "compact", barsMobile: 2, barsDesktop: 3, label: "Smaller cards" },
];

/* Bars past the mobile count only appear where the grid actually gains a column.
   The query resolves against the surrounding C-ProductGrid band, not the toggle,
   so the glyph mirrors the real column count at every size. */
function Bars({
  mobile,
  desktop,
  active,
}: {
  mobile: number;
  desktop: number;
  active: boolean;
}): ReactElement {
  return (
    <span className="inline-flex h-[14px] items-stretch gap-[2px]">
      {Array.from({ length: desktop }).map((_, k) => (
        <span
          key={k}
          className={[
            "w-[3px] rounded-[1px]",
            active ? "bg-[var(--text-on-inverse)]" : "bg-[var(--text-strong)]",
            k >= mobile ? "hidden @min-[1024px]:block" : "",
          ].join(" ")}
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
}: ViewToggleProps): ReactElement {
  const [internal, setInternal] = useState(defaultValue ?? options[0].key);
  const current = value ?? internal;
  const select = (key: string): void => {
    if (value == null) setInternal(key);
    onChange?.(key);
  };

  return (
    <div
      role="group"
      aria-label="Grid view"
      className={`inline-flex overflow-hidden border border-[var(--border-strong)] rounded-[var(--radius-sm)] ${className}`}
    >
      {options.map((option) => {
        const active = option.key === current;
        return (
          <button
            key={option.key}
            type="button"
            aria-label={option.label}
            title={option.label}
            aria-pressed={active}
            onClick={() => select(option.key)}
            className={`inline-flex h-[34px] w-[40px] cursor-pointer items-center justify-center border-none p-0 transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] ${
              active ? "bg-[var(--surface-inverse)]" : "bg-transparent"
            }`}
          >
            <Bars mobile={option.barsMobile} desktop={option.barsDesktop} active={active} />
          </button>
        );
      })}
    </div>
  );
}
