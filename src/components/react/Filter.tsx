interface FilterOption {
  label: string;
  value: string;
}

interface FiltersProps {
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  className?: string;
  name?: string;
}

import React, { useState } from "react";

const Filter: React.FC<FiltersProps> = ({
  options,
  selected,
  onChange,
  className,
  name,
}) => {
  const [open, setOpen] = useState(false);

  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const handleClear = () => {
    onChange([]);
  };

  const handleOpen = () => setOpen((prev) => !prev);
  return (
    <div className={`relative ${className} w-1/3`}>
      <button
        type="button"
        onClick={handleOpen}
        className={`w-full flex items-center justify-between rounded-lg px-4 py-2 bg-white hover:bg-gray-50 transition mb-2 ${
          open && "border"
        }`}
        aria-expanded={open}
      >
        <span>{name}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <ul className="absolute bg-white md:min-w-[200px] rounded space-y-2 mb-2 p-1 z-10">
          {options.map((option) => (
            <li
              key={option.value}
              className={`flex items-center gap-2 p-2 rounded-lg ${
                selected.includes(option.value)
                  ? "border-2 border-[var(--neutral-900)]"
                  : ""
              }`}
            >
              <div className="relative">
                {selected.includes(option.value) && (
                  <div className="absolute w-4.5 h-4.5 bottom-[4px] left-[-3px] rounded-full border-2 transition-colors duration-150 border-[var(--neutral-900)]" />
                )}
                <input
                  type="radio"
                  id={`filter-${option.value}`}
                  checked={selected.includes(option.value)}
                  onChange={() => handleToggle(option.value)}
                  className={
                    `cursor-pointer w-3 h-3 appearance-none rounded-full border-2 transition-colors duration-150 ` +
                    (selected.includes(option.value)
                      ? "border-[var(--neutral-900)] bg-[var(--neutral-900)]"
                      : "border-gray-400 bg-white")
                  }
                  style={{ accentColor: "unset" }}
                />
              </div>

              <label
                htmlFor={`filter-${option.value}`}
                className="cursor-pointer select-none"
              >
                {option.label}
              </label>
            </li>
          ))}
          <button
            type="button"
            onClick={handleClear}
            className="w-full rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 transition"
          >
            Clear
          </button>
        </ul>
      )}
    </div>
  );
};

export default Filter;
