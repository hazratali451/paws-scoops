"use client";

import Switch from "@/components/common/Switch";
import React from "react";

export interface ServiceItem {
  id: string | number;
  label: string;
  des: string;

  icon: React.ReactNode;
  type?: "img" | "icon";
}

interface ServiceProps {
  item: ServiceItem;
  isActive: boolean;
  disabled?: boolean;
  handleSelect: (id: string | number) => void;
}

export default function ServiceSwitch({
  item,
  isActive,
  disabled,
  handleSelect,
}: ServiceProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => handleSelect(item.id)}
      className={`border rounded-xl transition-all ease-linear duration-300 w-full disabled:opacity-50! disabled:border-[#E7DFDA]! disabled:shadow-none! disabled:cursor-not-allowed!
        ${
          isActive
            ? "border-primary-color shadow-[0_18px_40px_-26px_#429EBC99] bg-[linear-gradient(180deg,#429EBC99_0%,#F4F1EE_100%)]"
            : "border-[#E7DFDA] hover:border-primary-color hover:shadow-[0_18px_40px_-26px_#429EBC99]"
        }`}
    >
      <div className="bg-white/95 flex gap-3.5 items-center w-full h-full rounded-[11px] p-3 ">
        <div className="flex-1 flex sm:items-center max-sm:items-end max-sm:flex-col gap-3.5">
          <div className="flex-1 w-full flex items-center gap-3">
            <div
              className={`border border-[#E7DFDA] bg-white rounded-lg size-8 flex justify-center items-center overflow-hidden ${
                item.type === "img" ? "" : "p-0.5"
              }`}
              style={{ boxShadow: "0 4px 14px -10px rgba(0, 0, 0, 0.25)" }}
            >
              {item.icon}
            </div>
            <div className="flex-1 flex flex-col items-start gap-1">
              <span className="text-[15px] font-semibold leading-[150%]">
                {item.label}
              </span>
              <p className="text-sm leading-[135%] text-[#8F7C70] text-start">
                {item.des}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-px">
            <Switch checked={isActive} />
            <span className="text-[15px] font-bold text-dark">Add</span>
          </div>
        </div>
      </div>
    </button>
  );
}
