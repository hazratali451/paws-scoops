"use client";

import SelectStep, { OptionItem } from "@/components/common/SelectStep";
import React from "react";
import dog1 from "../../../public/assets/icons/single-dog.svg";
import dogs2 from "../../../public/assets/icons/2-dogs.svg";
import dogs3 from "../../../public/assets/icons/3-dogs.png";
import dogs4 from "../../../public/assets/icons/4-dogs.svg";
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
      id: "2",
      label: "2 Dogs",
      icon: <Image className="w-full" alt="" priority src={dogs2} />,
    },
    {
      id: "3",
      label: "3 Dogs",
      icon: <Image className="w-full" alt="" priority src={dogs3} />,
    },
    {
      id: "4+",
      label: "4+ Dogs",
      icon: <Image className="w-full" alt="" priority src={dogs4} />,
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
