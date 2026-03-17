"use client";

import React, { useState } from "react";
import StepLayout from "./StepLayout";

export interface OptionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  type?: string;
}

interface SelectStepProps {
  title: string;
  description?: string;
  step: number;
  options: OptionItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  onNext?: () => void;
  onBack?: () => void;
}

const SelectStep: React.FC<SelectStepProps> = ({
  title,
  description,
  step,
  options,
  defaultValue,
  onChange,
  onNext,
  onBack,
}) => {
  const [selected, setSelected] = useState<string | undefined>(defaultValue);

  const handleSelect = (id: string) => {
    setSelected(id);

    const selectedOption = options.find((o) => o.id === id);

    if (onChange && selectedOption) {
      onChange(selectedOption.label);
    }
  };
  return (
    <StepLayout
      title={title}
      description={description ? description : ""}
      step={step}
    >
      {/* Selected */}
      <div className="flex items-center gap-3 justify-between ">
        <span className="text-[15px] leading-[150%] text-dark font-semibold">
          Selected
        </span>

        <span className="bg-[#F5F2EF] text-dark px-3 py-0.5 font-bold rounded-[0.6rem] text-[15px]">
          {selected ? options.find((o) => o.id === selected)?.label : "—"}
        </span>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
        {options.map((item) => {
          const isActive = selected === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`border rounded-xl transition-all ease-linear duration-300 hover:-translate-y-0.5 
                ${
                  isActive
                    ? "border-primary-color shadow-[0_18px_40px_-26px_#E16E0999] bg-[linear-gradient(180deg,#E16E0999_0%,#F4F1EE_100%)] "
                    : "border-[#E7DFDA] hover:border-primary-color hover:shadow-[0_18px_40px_-26px_#E16E0999] "
                }`}
            >
              <div className="bg-white/95 flex flex-col gap-3 items-center w-full h-full rounded-[11px] p-4">
                <div
                  className={`border border-[#E7DFDA] bg-white  rounded-lg size-14 flex justify-center items-center overflow-hidden ${item.type === "img" ? "" : "p-1.5"}`}
                  style={{ boxShadow: "0 4px 14px -10px rgba(0, 0, 0, 0.25)" }}
                >
                  {item.icon}
                </div>

                <span className="text-[15px] font-semibold leading-[150%]">
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-8">
        <button
          onClick={onBack}
          className={`  flex-1 py-3.5 font-semibold text-sm text-dark rounded-[0.65rem] border border-[#E7DFDA] bg-linear-to-t from-[#FCFAF8] to-[#F5F2EF] ${step === 1 ? "cursor-not-allowed! opacity-60" : "cursor-pointer"}`}
        >
          Back
        </button>

        <button
          onClick={onNext}
          disabled={!selected}
          className={`text-white  flex-1 py-3.5 font-semibold text-sm rounded-[0.65rem] bg-[#F6831E]/85 border border-[#E16E09] ${!selected ? "cursor-not-allowed! opacity-60" : "cursor-pointer"}`}
        >
          Next
        </button>
      </div>
    </StepLayout>
  );
};

export default SelectStep;
