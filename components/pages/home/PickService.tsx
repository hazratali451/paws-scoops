import StepLayout from "@/components/common/StepLayout";
import React, { useEffect, useState } from "react";
import DoYouWantFreeClean from "./DoYouWantFreeClean";
import Services from "./Services";

interface PickServiceProps {
  onNext?: () => void;
  onBack?: () => void;
  onServicesChange?: (value: string[]) => void;
  onFreeCleaningChange?: (value: string) => void;
}

export default function PickService({ onNext, onBack, onServicesChange, onFreeCleaningChange }: PickServiceProps) {
  const [selectedService, setSelectedService] = useState<string[]>([]);
  const [freeCleaning, setFreeCleaning] = useState<string>("");

  const serviceLabels: Record<string, string> = {
    "1": "Poop scoop and haul away",
    "2": "Backyard Sanitizing",
    "3": "Backyard Deodorization",
    "4": "Front Lawn Dog Deterrent",
    "5": "Magic Bucket",
  };

  useEffect(() => {
    onServicesChange?.(selectedService.map((id) => serviceLabels[id] || id));
  }, [selectedService]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    onFreeCleaningChange?.(freeCleaning === "1" ? "Yes" : freeCleaning === "2" ? "No" : "");
  }, [freeCleaning]); // eslint-disable-line react-hooks/exhaustive-deps

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
          className={`flex-1 py-3.5 font-semibold text-sm rounded-[0.65rem] text-white border border-primary-color
          ${
            isDisabled
              ? "bg-[#429EBC]/50 cursor-not-allowed! opacity-60"
              : "bg-[#429EBC]/85 cursor-pointer"
          }`}
        >
          Review
        </button>
      </div>
    </StepLayout>
  );
}
