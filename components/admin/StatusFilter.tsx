"use client";

import React from "react";

const statuses = ["All", "New", "Contacted", "Quoted", "Won", "Lost"];

interface StatusFilterProps {
  active: string;
  onChange: (status: string) => void;
  counts?: Record<string, number>;
}

export default function StatusFilter({ active, onChange, counts }: StatusFilterProps) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {statuses.map((status) => {
        const isActive = active === status;
        return (
          <button
            key={status}
            onClick={() => onChange(status)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              isActive
                ? "bg-primary-color text-white"
                : "bg-white text-[#8F7C70] border border-[#E7DFDA] hover:bg-[#F5F2EF]"
            }`}
          >
            {status}
            {counts && counts[status] !== undefined && (
              <span className={`ml-1.5 text-xs ${isActive ? "text-white/70" : "text-[#C4B8B0]"}`}>
                {counts[status]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
