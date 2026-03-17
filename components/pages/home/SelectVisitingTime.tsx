"use client";

import SelectStep, { OptionItem } from "@/components/common/SelectStep";
import React from "react";
import twiceWeekly from "../../../public/assets/icons/twice-weekly.svg";
import weekly from "../../../public/assets/icons/weekly.svg";
import biWeekly from "../../../public/assets/icons/bi-weekly.svg";
import monthly from "../../../public/assets/icons/monthly.svg";
import oneTime from "../../../public/assets/icons/one-time.svg";
import Image from "next/image";

export default function SelectVisitingTime({
  onNext,
  onBack,
  onChange,
}: {
  onNext?: () => void;
  onBack?: () => void;
  onChange?: (value: string) => void;
}) {
  const options: OptionItem[] = [
    {
      id: "1",
      label: "Twice Weekly",
      icon: <Image className="w-full" alt="" src={twiceWeekly} />,
    },
    {
      id: "2",
      label: "Weekly",
      icon: <Image className="w-full" alt="" src={weekly} />,
    },
    {
      id: "3",
      label: "Bi-Weekly",
      icon: <Image className="w-full" alt="" src={biWeekly} />,
    },
    {
      id: "4",
      label: "Monthly",
      icon: <Image className="w-full" alt="" src={monthly} />,
    },
    {
      id: "5",
      label: "One Time",
      icon: <Image className="w-full" alt="" src={oneTime} />,
    },
  ];

  return (
    <div>
      <SelectStep
        title="What frequency of service do you need?"
        description="Select how often we should visit"
        step={2}
        options={options}
        onChange={(val) => onChange && onChange(val)}
        onNext={() => onNext && onNext()}
        onBack={() => onBack && onBack()}
      />
    </div>
  );
}
