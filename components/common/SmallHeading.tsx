import React from "react";

export default function SmallHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h6 className="text-dark font-bold leading-[155%] text-[15px]">
      {children}
    </h6>
  );
}
