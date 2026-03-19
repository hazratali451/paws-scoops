"use client";

import SelectStep, { OptionItem } from "@/components/common/SelectStep";
import React from "react";
import dog1 from "../../../public/assets/icons/single-dog.svg";
import dogs2 from "../../../public/assets/icons/2-dogs.svg";
import dogs4 from "../../../public/assets/icons/4-dogs.svg";
import dogs6 from "../../../public/assets/icons/6-dogs.svg";
import Image from "next/image";

export default function PickDogsNumber({
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
      label: "1 Dog",
      icon: <Image className="w-full" alt="" priority src={dog1} />,
    },
    {
      id: "2-3",
      label: "2-3 Dogs",
      icon: <Image className="w-full" alt="" priority src={dogs2} />,
    },
    {
      id: "4-5",
      label: "4-5 Dogs",
      icon: <Image className="w-full" alt="" priority src={dogs4} />,
    },
    {
      id: "6+",
      label: "6+ Dogs",
      icon: <Image className="w-full" alt="" priority src={dogs6} />,
    },
  ];

  return (
    <div>
      <SelectStep
        title="How many dogs do you have?"
        description="Pick the number of dogs."
        step={1}
        options={options}
        onChange={(val) => onChange && onChange(val)}
        onNext={() => onNext && onNext()}
        onBack={() => onBack && onBack()}
      />
    </div>
  );
}
