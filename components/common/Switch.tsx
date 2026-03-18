"use client";

import React from "react";

interface SwitchProps {
  checked?: boolean;
  onChange?: (value: boolean) => void;
  activeColor?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  activeColor = "#e16e09",
}) => {
  const toggleSwitch = () => {
    onChange?.(!checked);
  };

  return (
    <div
      onClick={toggleSwitch}
      className="relative w-13 h-7.5 rounded-full transition-all duration-300 border border-[#E7DFDA]"
      style={{
        backgroundColor: checked ? activeColor : "#f5f2ef",
      }}
    >
      <span
        className="absolute top-1/2 -translate-y-1/2 left-px size-6 rounded-full transition-all duration-300 bg-white"
        style={{
          transform: checked ? "translateX(23px)" : "translateX(0px)",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
        }}
      />
    </div>
  );
};

export default Switch;
