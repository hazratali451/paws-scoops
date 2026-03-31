import React from "react";

const statusStyles: Record<string, { bg: string; text: string }> = {
  New: { bg: "bg-[#429EBC24]", text: "text-[#429EBC]" },
  Contacted: { bg: "bg-[#F5F2EF]", text: "text-[#8F7C70]" },
  Quoted: { bg: "bg-[#FFF3E0]", text: "text-[#E65100]" },
  Won: { bg: "bg-[#E8F5E9]", text: "text-[#2E7D32]" },
  Lost: { bg: "bg-[#FFEBEE]", text: "text-[#C62828]" },
};

export default function LeadStatusBadge({ status }: { status: string }) {
  const style = statusStyles[status] || statusStyles.New;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}
    >
      {status}
    </span>
  );
}
