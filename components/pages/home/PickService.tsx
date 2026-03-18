import StepLayout from "@/components/common/StepLayout";
import React, { useState } from "react";
import DoYouWantFreeClean from "./DoYouWantFreeClean";
import Services from "./Services";

export default function PickService({
  onNext,
  onBack,
  //   onChange,
}: {
  onNext?: () => void;
  onBack?: () => void;
  onChange?: (value: string) => void;
}) {
  const [selected, setSelected] = useState(false);
  return (
    <StepLayout
      title="What services do you need? (Select all that apply)"
      description="Pick your preferred services."
      step={4}
    >
      <Services />
      <DoYouWantFreeClean />
      {/* Actions */}
      <div className="flex gap-2 mt-8">
        <button
          onClick={onBack}
          className={`  flex-1 py-3.5 font-semibold text-sm text-dark rounded-[0.65rem] border border-[#E7DFDA] bg-linear-to-t from-[#FCFAF8] to-[#F5F2EF] `}
        >
          Back
        </button>

        <button
          onClick={onNext}
          //   disabled={!selected}
          className={`text-white  flex-1 py-3.5 font-semibold text-sm rounded-[0.65rem] bg-[#F6831E]/85 border border-[#E16E09] ${!selected ? "cursor-not-allowed! opacity-60" : "cursor-pointer"}`}
        >
          Review
        </button>
      </div>
    </StepLayout>
  );
}
