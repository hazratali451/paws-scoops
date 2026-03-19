"use client";

import Image from "next/image";
import React from "react";
import ServiceSwitch, { ServiceItem } from "./ServiceSwitch";

// icon
import cleanUp from "../../../public/assets/icons/clean-up.svg";
import sanitize from "../../../public/assets/icons/sanitizing.svg";
import deodorization from "../../../public/assets/icons/deodorization.svg";
import deterrent from "../../../public/assets/icons/deterrent.svg";
import trash from "../../../public/assets/icons/trash.svg";
import SmallHeading from "@/components/common/SmallHeading";
interface ServicesProps {
  selectedService: string[];
  setSelectedService: React.Dispatch<React.SetStateAction<string[]>>;
}
export default function Services({
  selectedService,
  setSelectedService,
}: ServicesProps) {
  const MAGIC_ID = "5";

  const handleSelect = (id: string) => {
    setSelectedService((prev) => {
      // If Magic Bucket clicked
      if (id === MAGIC_ID) {
        // toggle magic only
        return prev.includes(id) ? [] : [id];
      }

      // If other clicked
      const updated = prev.filter((item) => item !== MAGIC_ID);

      if (updated.includes(id)) {
        // remove if already selected
        return updated.filter((item) => item !== id);
      } else {
        // add new
        return [...updated, id];
      }
    });
  };
  const isMagicSelected = selectedService.includes(MAGIC_ID);

  const options: ServiceItem[] = [
    {
      id: "1",
      label: "Poop scoop and haul away",
      des: "Essential clean-up service.",
      icon: <Image className="w-full" alt="" priority src={cleanUp} />,
    },
    {
      id: "2",
      label: "Backyard Sanitizing",
      des: "Sanitize the serviced area.",
      icon: <Image className="w-full" alt="" priority src={sanitize} />,
    },
    {
      id: "3",
      label: "Backyard Deodorization",
      des: "Help neutralize odors.",
      icon: <Image className="w-full" alt="" priority src={deodorization} />,
    },
    {
      id: "4",
      label: "Front Lawn Dog Deterrent",
      des: "Optional deterrent for front lawn.",
      icon: <Image className="w-full" alt="" priority src={deterrent} />,
    },
    {
      id: "5",
      label: "Magic Bucket",
      des: "We scoop the poop and put the waste in the bucket we set out. Weekly we clean the bucket, replace the bags inside, and take the waste with us.",
      icon: <Image className="w-full" alt="" priority src={trash} />,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <SmallHeading>Services</SmallHeading>

      <div className="flex flex-col gap-3 pt-1">
        {options.map((item) => {
          const isActive = selectedService.includes(item.id as string);
          const disabled = isMagicSelected && item.id !== MAGIC_ID;
          return (
            <ServiceSwitch
              disabled={disabled}
              key={item.id}
              item={item}
              isActive={isActive}
              handleSelect={() => handleSelect(item.id as string)}
            />
          );
        })}
      </div>
    </div>
  );
}
