"use client";

import React, { useState } from "react";
import StepLayout from "./StepLayout";
import PickBox, { PickBoxItem } from "./PickBox";

export interface OptionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  type?: string;
  des?: string;
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
            <PickBox
              isActive={isActive}
              key={item.id}
              item={item as PickBoxItem}
              handleSelect={() => handleSelect(item.id)}
            />
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
          className={`text-white  flex-1 py-3.5 font-semibold text-sm rounded-[0.65rem] bg-[#429EBC]/85 border border-[#429EBC] ${!selected ? "cursor-not-allowed! opacity-60" : "cursor-pointer"}`}
        >
          Next
        </button>
      </div>
    </StepLayout>
  );
};

export default SelectStep;
