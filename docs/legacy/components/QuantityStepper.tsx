"use client";

import { useState } from "react";
import type { ReactElement, CSSProperties } from "react";
import { Icon } from "@/components/Icon";

/* SHER quantity stepper — the − N + control on cart line items and the product
   page. Controlled (`value`) or uncontrolled; clamps to [min, max]. */

export interface QuantityStepperProps {
  /** Controlled value. Omit for uncontrolled. */
  value?: number;
  /** Initial value when uncontrolled. Default 1. */
  defaultValue?: number;
  /** Clamp bounds. Default min 1, max 99. */
  min?: number;
  max?: number;
  /** Fires with the new clamped value. */
  onChange?: (value: number) => void;
  /** Size. Default "md". */
  size?: "sm" | "md";
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function QuantityStepper({
  value,
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange,
  size = "md",
  disabled = false,
  className = "",
  style,
}: QuantityStepperProps): ReactElement {
  const [internal, setInternal] = useState(defaultValue);
  const val = value != null ? value : internal;
  const set = (n: number): void => {
    const clamped = Math.max(min, Math.min(max, n));
    if (value == null) setInternal(clamped);
    onChange?.(clamped);
  };
  const dim = size === "sm" ? 30 : 38;
  const step = (dir: "increase" | "decrease", name: "plus" | "minus", off: boolean): ReactElement => (
    <button
      type="button"
      aria-label={dir}
      disabled={off || disabled}
      onClick={() => set(val + (dir === "increase" ? 1 : -1))}
      className="inline-flex items-center justify-center border-none bg-transparent text-[var(--text-strong)] transition-opacity duration-[var(--dur-fast)] ease-[var(--ease-out)] enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
      style={{ width: dim, height: dim }}
    >
      <Icon name={name} size={size === "sm" ? 14 : 16} />
    </button>
  );
  return (
    <div
      className={`inline-flex items-center rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-[var(--surface-page)] ${className}`}
      style={style}
    >
      {step("decrease", "minus", val <= min)}
      <span
        className="text-center font-[family-name:var(--font-body)] text-[var(--text-strong)] [font-variant-numeric:tabular-nums]"
        style={{ minWidth: dim, fontSize: size === "sm" ? "0.875rem" : "1rem" }}
      >
        {val}
      </span>
      {step("increase", "plus", val >= max)}
    </div>
  );
}
