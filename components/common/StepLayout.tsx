import React from "react";

export default function StepLayout({
  children,
  step,
  title,
  description,
}: {
  children: React.ReactNode;
  step: number;
  title: string;
  description: string;
}) {
  return (
    <div className="w-full mx-auto flex flex-col gap-4.5">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between flex-wrap gap-1 gap-y-1.5">
          <h2 className="text-[21.6px] leading-[120%] text-dark font-bold">
            {title}
          </h2>
          {step && (
            <span className="text-[11px] font-semibold leading-[155%] bg-[#e16e0924] text-primary-color px-3 flex items-center rounded-full uppercase py-1">
              STEP {step} OF 5
            </span>
          )}
        </div>
        {description && <p className="text-[#8F7C70]">{description}</p>}
      </div>

      {children}
    </div>
  );
}
