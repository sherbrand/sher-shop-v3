import * as React from "react";

/**
 * SHER quantity stepper — the − N + control for cart line items (F-005) and the
 * product page quantity selector. Controlled (`value`) or uncontrolled.
 */
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
}

export function QuantityStepper(props: QuantityStepperProps): JSX.Element;
