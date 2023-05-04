import React from "react";

type SelectProps = {
  options: string[];
  label: string;
  onChange: (value: string) => void;
  selectedValue: string;
};

export const Select = ({
  options,
  label,
  onChange,
  selectedValue,
}: SelectProps) => {
  return (
    <label>
      {label}
      <select
        onChange={(event) => {
          onChange(event.target.value);
        }}
        value={selectedValue}
      >
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </label>
  );
};
