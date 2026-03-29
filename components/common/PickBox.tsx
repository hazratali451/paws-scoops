import React from "react";

export interface PickBoxItem {
  id: string | number;
  label: string;
  icon: React.ReactNode;
  type?: "img" | "icon";
}

interface PickBoxProps {
  item: PickBoxItem;
  isActive: boolean;
  handleSelect: (id: string | number) => void;
}

export default function PickBox({
  item,
  isActive,
  handleSelect,
}: PickBoxProps) {
  return (
    <button
      type="button"
      onClick={() => handleSelect(item.id)}
      className={`border rounded-xl transition-all ease-linear duration-300 hover:-translate-y-0.5 w-full
        ${
          isActive
            ? "border-primary-color shadow-[0_18px_40px_-26px_#429EBC99] bg-[linear-gradient(180deg,#429EBC99_0%,#F4F1EE_100%)]"
            : "border-[#E7DFDA] hover:border-primary-color hover:shadow-[0_18px_40px_-26px_#429EBC99]"
        }`}
    >
      <div className="bg-white/95 flex flex-col gap-3 items-center w-full h-full rounded-[11px] p-4">
        <div
          className={`border border-[#E7DFDA] bg-white rounded-lg size-14 flex justify-center items-center overflow-hidden ${
            item.type === "img" ? "" : "p-1.5"
          }`}
          style={{ boxShadow: "0 4px 14px -10px rgba(0, 0, 0, 0.25)" }}
        >
          {item.icon}
        </div>

        <span className="text-[15px] font-semibold leading-[150%]">
          {item.label}
        </span>
      </div>
    </button>
  );
}
