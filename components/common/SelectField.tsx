"use client";

import React from "react";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  required?: boolean;
  className?: string;
  placeholder?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
  className = "",
  placeholder = "Select an option",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-dark font-bold leading-[155%] text-[15px]">
        {label}
      </label>

      <div className="relative">
        <select
          required={required}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 pr-10 rounded-lg border border-[#E7DFDA] focus:border-primary-color bg-transparent text-[15px] leading-[155%] font-semibold outline-none transition-all ease-linear duration-300 appearance-none ${value ? "text-dark" : "text-black/60"}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-white"
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* React Icon Arrow */}
        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-dark pointer-events-none text-lg" />
      </div>
    </div>
  );
};

export default SelectField;
