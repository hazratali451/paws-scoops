"use client";
import { OptionItem } from "@/components/common/SelectStep";
import Image from "next/image";
import React, { useState } from "react";
import grass from "../../../public/assets/icons/grass.webp";
import turf from "../../../public/assets/icons/turf.webp";
import PickBox, { PickBoxItem } from "@/components/common/PickBox";

export default function DoYouWantFreeClean() {
  const [selected, setSelected] = useState<string | undefined>("");

  const handleSelect = (id: string) => {
    setSelected(id);
  };
  const options: OptionItem[] = [
    {
      id: "1",
      label: "Yes",
      icon: <Image className="w-full" alt="" src={grass} />,
    },
    {
      id: "2",
      label: "No",
      icon: <Image className="w-full" alt="" src={turf} />,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <h6 className="text-dark font-bold leading-[155%] text-[15px]">
        Do you want the free cleaning?
      </h6>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {options.map((item) => {
          const isActive = selected === item.id;

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
