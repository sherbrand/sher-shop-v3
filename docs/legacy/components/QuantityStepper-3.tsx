"use client";

import { useState } from "react";
import type { ReactElement } from "react";
import { Icon } from "@/components/Icon";

/* SHER quantity stepper — the − N + control on cart line items and the product
   page. Controlled or uncontrolled; clamps to [min, max]. */

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
}: QuantityStepperProps): ReactElement {
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;

  // Clamp first, then report — the parent never sees an out-of-range value.
  const set = (next: number): void => {
    const clamped = Math.max(min, Math.min(max, next));
    if (value == null) setInternal(clamped);
    onChange?.(clamped);
  };

  const dim = size === "sm" ? 30 : 38;
  const step = (
    direction: "increase" | "decrease",
    name: "plus" | "minus",
    atLimit: boolean,
  ): ReactElement => (
    <button
      type="button"
      aria-label={direction}
      disabled={atLimit || disabled}
      onClick={() => set(current + (direction === "increase" ? 1 : -1))}
      className="inline-flex items-center justify-center border-none bg-transparent text-[var(--text-strong)] transition-opacity duration-[var(--dur-fast)] ease-[var(--ease-out)] disabled:cursor-not-allowed disabled:opacity-30 enabled:cursor-pointer"
      style={{ width: dim, height: dim }}
    >
      <Icon name={name} size={size === "sm" ? 14 : 16} />
    </button>
  );

  return (
    <div
      className={`inline-flex items-center border border-[var(--border-strong)] bg-[var(--surface-page)] rounded-[var(--radius-sm)] ${className}`}
    >
      {step("decrease", "minus", current <= min)}
      <span
        className={`text-center font-[family-name:var(--font-body)] text-[var(--text-strong)] tabular-nums ${
          size === "sm" ? "text-[length:var(--size-sm)]" : "text-[length:var(--size-base)]"
        }`}
        style={{ minWidth: dim }}
      >
        {current}
      </span>
      {step("increase", "plus", current >= max)}
    </div>
  );
}
