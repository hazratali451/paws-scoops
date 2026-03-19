"use client";

import SelectStep, { OptionItem } from "@/components/common/SelectStep";
import React from "react";
import grass from "../../../public/assets/icons/grass.webp";
import turf from "../../../public/assets/icons/turf.webp";
import rocks from "../../../public/assets/icons/rocks.webp";
import dirt from "../../../public/assets/icons/dirt.webp";
import Image from "next/image";

export default function ChooseSurface({
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
      label: "Grass",
      icon: <Image className="w-full" alt="" priority src={grass} />,
      type: "img",
    },
    {
      id: "2",
      label: "Turf",
      icon: <Image className="w-full" alt="" priority src={turf} />,
      type: "img",
    },
    {
      id: "3",
      label: "Rocks",
      icon: <Image className="w-full" alt="" priority src={rocks} />,
      type: "img",
    },
    {
      id: "4",
      label: "Dirt",
      icon: <Image className="w-full" alt="" priority src={dirt} />,
      type: "img",
    },
  ];

  return (
    <div>
      <SelectStep
        title="What is the surface mostly, of your backyard?"
        description="Choose the primary surface."
        step={3}
        options={options}
        onChange={(val) => onChange && onChange(val)}
        onNext={() => onNext && onNext()}
        onBack={() => onBack && onBack()}
      />
    </div>
  );
}
