"use client";

import Image from "next/image";
import React, { useState } from "react";
import grass from "../../../public/assets/icons/grass.webp";
import turf from "../../../public/assets/icons/turf.webp";
import ServiceSwitch, { ServiceItem } from "./ServiceSwitch";

export default function Services() {
  const [selected, setSelected] = useState<string[]>([]);

  const MAGIC_ID = "5";

  const handleSelect = (id: string) => {
    setSelected((prev) => {
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
  const isMagicSelected = selected.includes(MAGIC_ID);

  const options: ServiceItem[] = [
    {
      id: "1",
      label: "Poop scoop and haul away",
      des: "Essential clean-up service.",
      icon: <Image className="w-full" alt="" src={grass} />,
    },
    {
      id: "2",
      label: "Backyard Sanitizing",
      des: "Sanitize the serviced area.",
      icon: <Image className="w-full" alt="" src={turf} />,
    },
    {
      id: "3",
      label: "Backyard Deodorization",
      des: "Help neutralize odors.",
      icon: <Image className="w-full" alt="" src={grass} />,
    },
    {
      id: "4",
      label: "Front Lawn Dog Deterrent",
      des: "Optional deterrent for front lawn.",
      icon: <Image className="w-full" alt="" src={turf} />,
    },
    {
      id: "5",
      label: "Magic Bucket",
      des: "We scoop the poop and put the waste in the bucket we set out. Weekly we clean the bucket, replace the bags inside, and take the waste with us.",
      icon: <Image className="w-full" alt="" src={grass} />,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <h6 className="text-dark font-bold leading-[155%] text-[15px]">
        Services
      </h6>

      <div className="flex flex-col gap-3 pt-1">
        {options.map((item) => {
          const isActive = selected.includes(item.id as string);
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
