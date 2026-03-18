"use client";

import React from "react";

interface InputFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-dark font-bold leading-[155%] text-[15px]">
        {label}
        {/* {required && <span className="text-red-500 ml-0.5">*</span>} */}
      </label>

      <input
        required={required}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border border-[#E7DFDA] focus:border-primary-color bg-transparent text-[15px] leading-[155%] text-dark outline-none transition-all ease-linear duration-300 "
      />
    </div>
  );
};

export default InputField;
