import StepLayout from "@/components/common/StepLayout";
import SmallHeading from "@/components/common/SmallHeading";
import PickBox, { PickBoxItem } from "@/components/common/PickBox";
import Switch from "@/components/common/Switch";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import deodorization from "../../../public/assets/icons/deodorization.svg";

interface PickServiceProps {
  onNext?: () => void;
  onBack?: () => void;
  onServicesChange?: (value: string[]) => void;
  onStartTimeChange?: (value: string) => void;
}

const startOptions = [
  { id: "1", label: "ASAP" },
  { id: "2", label: "Next Week" },
  { id: "3", label: "Just Exploring" },
];

export default function PickService({
  onNext,
  onBack,
  onServicesChange,
  onStartTimeChange,
}: PickServiceProps) {
  const [deodorizingSelected, setDeodorizingSelected] = useState(false);
  const [startTime, setStartTime] = useState("");

  useEffect(() => {
    onServicesChange?.(
      deodorizingSelected ? ["Deodorizing & Disinfecting"] : []
    );
  }, [deodorizingSelected]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const label = startOptions.find((o) => o.id === startTime)?.label || "";
    onStartTimeChange?.(label);
  }, [startTime]); // eslint-disable-line react-hooks/exhaustive-deps

  const isDisabled = !startTime;

  return (
    <StepLayout
      title="Additional services & timing"
      description="Choose any add-ons and when you'd like to start."
      step={4}
    >
      {/* Deodorizing & Disinfecting toggle */}
      <div className="flex flex-col gap-3">
        <SmallHeading>Services</SmallHeading>
        <button
          type="button"
          onClick={() => setDeodorizingSelected((prev) => !prev)}
          className={`border rounded-xl transition-all ease-linear duration-300 w-full ${
            deodorizingSelected
              ? "border-primary-color shadow-[0_18px_40px_-26px_#429EBC99] bg-[linear-gradient(180deg,#429EBC99_0%,#F4F1EE_100%)]"
              : "border-[#E7DFDA] hover:border-primary-color hover:shadow-[0_18px_40px_-26px_#429EBC99]"
          }`}
        >
          <div className="bg-white/95 flex items-center w-full h-full rounded-[11px] p-3 gap-3">
            <div
              className="border border-[#E7DFDA] bg-white rounded-lg size-8 shrink-0 flex justify-center items-center overflow-hidden p-0.5"
              style={{
                boxShadow: "0 4px 14px -10px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Image
                className="w-full"
                alt=""
                priority
                src={deodorization}
              />
            </div>
            <div className="flex-1 flex flex-col items-start gap-1 min-w-0">
              <span className="text-[15px] font-semibold leading-[150%]">
                Deodorizing & Disinfecting
              </span>
              <p className="text-sm leading-[135%] text-[#8F7C70] text-start">
                Neutralize odors and sanitize the serviced area.
              </p>
            </div>
            <div className="flex flex-col items-center gap-px shrink-0">
              <Switch checked={deodorizingSelected} />
              <span className="text-[15px] font-bold text-dark">Add</span>
            </div>
          </div>
        </button>
      </div>

      {/* When would you like to get started? */}
      <div className="flex flex-col gap-3 mt-6">
        <SmallHeading>When would you like to get started?</SmallHeading>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {startOptions.map((item) => (
            <PickBox
              key={item.id}
              isActive={startTime === item.id}
              item={
                {
                  id: item.id,
                  label: item.label,
                  icon: null,
                } as unknown as PickBoxItem
              }
              handleSelect={() => setStartTime(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-8">
        <button
          onClick={onBack}
          className="flex-1 py-3.5 font-semibold text-sm text-dark rounded-[0.65rem] border border-[#E7DFDA] bg-linear-to-t from-[#FCFAF8] to-[#F5F2EF] cursor-pointer"
        >
          Back
        </button>

        <button
          onClick={onNext}
          disabled={isDisabled}
          className={`flex-1 py-3.5 font-semibold text-sm rounded-[0.65rem] text-white border border-primary-color ${
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
