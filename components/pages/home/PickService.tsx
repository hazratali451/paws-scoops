import StepLayout from "@/components/common/StepLayout";
import React, { useState } from "react";
import DoYouWantFreeClean from "./DoYouWantFreeClean";
import Services from "./Services";

interface PickServiceProps {
  onNext?: () => void;
  onBack?: () => void;
  onChange?: (value: string) => void;
}

export default function PickService({ onNext, onBack }: PickServiceProps) {
  const [selectedService, setSelectedService] = useState<string[]>([]);
  const [freeCleaning, setFreeCleaning] = useState<string>("");

  // ✅ condition: at least one must be selected
  const isDisabled = selectedService.length === 0 && !freeCleaning;

  return (
    <StepLayout
      title="What services do you need? (Select all that apply)"
      description="Pick your preferred services."
      step={4}
    >
      <Services
        setSelectedService={setSelectedService}
        selectedService={selectedService}
      />

      <DoYouWantFreeClean
        freeCleaning={freeCleaning}
        setFreeCleaning={setFreeCleaning}
      />

      {/* Actions */}
      <div className="flex gap-2 mt-8">
        <button
          onClick={onBack}
          className="flex-1 py-3.5 font-semibold text-sm text-dark rounded-[0.65rem] border border-[#E7DFDA] bg-linear-to-t from-[#FCFAF8] to-[#F5F2EF]"
        >
          Back
        </button>

        <button
          onClick={onNext}
          disabled={isDisabled}
          className={`flex-1 py-3.5 font-semibold text-sm rounded-[0.65rem] text-white border border-[#E16E09] 
          ${
            isDisabled
              ? "bg-[#F6831E]/50 cursor-not-allowed! opacity-60"
              : "bg-[#F6831E]/85 cursor-pointer"
          }`}
        >
          Review
        </button>
      </div>
    </StepLayout>
  );
}
