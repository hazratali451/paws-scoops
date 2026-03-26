"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
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
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange?.(val);
    setOpen(false);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`} ref={wrapperRef}>
      <label className="text-dark font-bold text-[15px]">
        {label} {required && "*"}
      </label>

      {/* Wrapper for absolute positioning */}
      <div className="relative">
        {/* Trigger */}
        <div
          onClick={() => setOpen(!open)}
          className={`w-full px-4 py-3 rounded-lg border border-[#E7DFDA]
          bg-transparent text-[15px] font-semibold cursor-pointer flex items-center justify-between
          ${value ? "text-dark" : "text-black/60"}`}
        >
          <span>{selectedOption ? selectedOption.label : placeholder}</span>

          <FiChevronDown
            className={`text-dark text-lg transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Dropdown */}
        <ul
          className={`absolute left-0 top-full mt-2 w-full bg-white border border-[#E7DFDA]
          rounded-lg shadow-lg max-h-60 overflow-y-auto z-50
          transform transition-all duration-300 origin-top
          ${
            open
              ? "opacity-100 scale-y-100 visible"
              : "opacity-0 scale-y-95 invisible"
          }`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`px-4 py-3 cursor-pointer text-[15px] font-medium
              hover:bg-gray-100 transition
              ${
                value === option.value ? "bg-gray-100 text-dark" : "text-black"
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectField;
