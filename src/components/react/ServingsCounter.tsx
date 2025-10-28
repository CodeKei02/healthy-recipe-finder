import React, { useEffect } from "react";
import useRecipeStore from "../../stores/useRecipeStore";

export interface ServingsCounterProps {
  value?: number; // controlled value
  defaultValue?: number; // uncontrolled initial value
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  "aria-label"?: string;
}

/**
 * ServingsCounter
 * - Supports controlled (pass `value`) and uncontrolled (pass `defaultValue`) modes.
 * - Enforces min/max and step.
 * - Accessible buttons and number input.
 */
const ServingsCounter: React.FC<ServingsCounterProps> = ({
  value,
  defaultValue = 1,
  onChange,
  min = 1,
  max,
  step = 1,
  className,
  ["aria-label"]: ariaLabel = "servings",
}) => {
  const isControlled = value !== undefined;
  const storeServings = useRecipeStore((s) => s.servings);
  const setStoreServings = useRecipeStore((s) => s.setServings);

  // If uncontrolled, use the global store value.
  // Initialize store to defaultValue on mount if it differs.
  useEffect(() => {
    if (!isControlled) {
      const target = Math.max(min, Math.floor(defaultValue));
      if (storeServings !== target) setStoreServings(target);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = isControlled ? (value as number) : storeServings;

  const clamp = (n: number) => {
    let v = Math.floor(n);
    if (isNaN(v)) v = min;
    if (typeof max === "number") v = Math.min(max, v);
    v = Math.max(min, v);
    return v;
  };

  const setValue = (next: number) => {
    const v = clamp(next);
    if (!isControlled) setStoreServings(v);
    onChange?.(v);
  };

  const dec = () => setValue(current - step);
  const inc = () => setValue(current + step);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value, 10);
    if (Number.isNaN(parsed)) return;
    setValue(parsed);
  };

  return (
    <div className={className ? className : "flex items-center gap-2"}>
      <button
        type="button"
        aria-label={`Decrease ${ariaLabel}`}
        onClick={dec}
        className="inline-flex items-center justify-center rounded-md border px-3 py-1 text-sm hover:bg-neutral-100 disabled:opacity-40"
        disabled={current <= min}
      >
        −
      </button>

      <input
        aria-label={ariaLabel}
        type="number"
        value={current}
        onChange={onInputChange}
        min={min}
        max={max}
        step={step}
        className="w-14 text-center rounded-md border px-2 py-1 text-sm"
      />

      <button
        type="button"
        aria-label={`Increase ${ariaLabel}`}
        onClick={inc}
        className="inline-flex items-center justify-center rounded-md border px-3 py-1 text-sm hover:bg-neutral-100 disabled:opacity-40"
        disabled={typeof max === "number" ? current >= max : false}
      >
        +
      </button>
    </div>
  );
};

export default ServingsCounter;
