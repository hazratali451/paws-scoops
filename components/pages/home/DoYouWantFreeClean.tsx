"use client";
import { OptionItem } from "@/components/common/SelectStep";
import Image from "next/image";
import React from "react";
import check from "../../../public/assets/icons/check-mark.svg";
import cross from "../../../public/assets/icons/cross-mark.svg";
import PickBox, { PickBoxItem } from "@/components/common/PickBox";
import SmallHeading from "@/components/common/SmallHeading";

export default function DoYouWantFreeClean({
  freeCleaning,
  setFreeCleaning,
}: {
  freeCleaning: string;
  setFreeCleaning: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleSelect = (id: string) => {
    setFreeCleaning(id);
  };
  const options: OptionItem[] = [
    {
      id: "1",
      label: "Yes",
      icon: <Image className="w-full" alt="" priority src={check} />,
    },
    {
      id: "2",
      label: "No",
      icon: <Image className="w-full" alt="" priority src={cross} />,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <SmallHeading>Do you want the free cleaning?</SmallHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {options.map((item) => {
          const isActive = freeCleaning === item.id;

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
    </div>
  );
}
