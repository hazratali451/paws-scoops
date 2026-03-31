"use client";

import React, { useState, useEffect } from "react";
import StepLayout from "@/components/common/StepLayout";
import PickBox, { PickBoxItem } from "@/components/common/PickBox";
import Image from "next/image";
import grass from "../../../public/assets/icons/grass.webp";
import turf from "../../../public/assets/icons/turf.webp";
import rocks from "../../../public/assets/icons/rocks.webp";
import dirt from "../../../public/assets/icons/dirt.webp";
import concrete from "../../../public/assets/icons/concrete.svg";

interface SurfaceOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  type?: string;
}

const options: SurfaceOption[] = [
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
  {
    id: "5",
    label: "Concrete",
    icon: <Image className="w-full" alt="" priority src={concrete} />,
    type: "img",
  },
];

export default function ChooseSurface({
  onNext,
  onBack,
  onChange,
}: {
  onNext?: () => void;
  onBack?: () => void;
  onChange?: (value: string) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const labels = selected.map(
      (sid) => options.find((o) => o.id === sid)?.label || ""
    );
    onChange?.(labels.join(", "));
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <StepLayout
      title="What is the surface of your backyard?"
      description="Select all that apply."
      step={3}
    >
      {/* Selected */}
      <div className="flex items-center gap-3 justify-between">
        <span className="text-[15px] leading-[150%] text-dark font-semibold">
          Selected
        </span>
        <span className="bg-[#F5F2EF] text-dark px-3 py-0.5 font-bold rounded-[0.6rem] text-[15px]">
          {selected.length > 0
            ? selected
                .map((sid) => options.find((o) => o.id === sid)?.label)
                .join(", ")
            : "—"}
        </span>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
        {options.map((item) => (
          <PickBox
            isActive={selected.includes(item.id)}
            key={item.id}
            item={item as PickBoxItem}
            handleSelect={() => handleSelect(item.id)}
          />
        ))}
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
          disabled={selected.length === 0}
          className={`text-white flex-1 py-3.5 font-semibold text-sm rounded-[0.65rem] bg-[#429EBC]/85 border border-[#429EBC] ${
            selected.length === 0
              ? "cursor-not-allowed! opacity-60"
              : "cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>
    </StepLayout>
  );
}
