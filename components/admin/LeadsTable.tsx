"use client";

import React from "react";
import LeadStatusBadge from "./LeadStatusBadge";
import { useRouter } from "next/navigation";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  dogs: string;
  frequency: string;
  status: string;
  createdAt: string;
}

interface LeadsTableProps {
  leads: Lead[];
  loading?: boolean;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function LeadsTable({ leads, loading }: LeadsTableProps) {
  const router = useRouter();

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-[#E7DFDA] overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="px-5 py-4 border-b border-[#E7DFDA] last:border-0">
            <div className="h-4 bg-[#F5F2EF] rounded animate-pulse w-3/4 mb-2" />
            <div className="h-3 bg-[#F5F2EF] rounded animate-pulse w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#E7DFDA] p-12 text-center">
        <div className="text-[#C4B8B0] mb-2">
          <svg className="mx-auto" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
        </div>
        <p className="text-[#8F7C70] text-sm font-medium">No leads found</p>
        <p className="text-[#C4B8B0] text-xs mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#E7DFDA] overflow-hidden shadow-[0_4px_12px_-6px_rgba(66,158,188,0.15)]">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#FAFAF8] border-b border-[#E7DFDA]">
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#8F7C70] uppercase tracking-wider">
                Contact
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#8F7C70] uppercase tracking-wider">
                Service
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#8F7C70] uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#8F7C70] uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead._id}
                onClick={() => router.push(`/cr/paws-admin/leads/${lead._id}`)}
                className="border-b border-[#E7DFDA] last:border-0 hover:bg-[#FAFAF8] cursor-pointer transition-colors"
              >
                <td className="px-5 py-3.5">
                  <p className="text-sm font-semibold text-dark">{lead.name}</p>
                  <p className="text-xs text-[#8F7C70] mt-0.5">{lead.email}</p>
                </td>
                <td className="px-5 py-3.5">
                  <p className="text-sm text-dark">{lead.frequency}</p>
                  <p className="text-xs text-[#8F7C70] mt-0.5">{lead.dogs}</p>
                </td>
                <td className="px-5 py-3.5">
                  <LeadStatusBadge status={lead.status} />
                </td>
                <td className="px-5 py-3.5">
                  <p className="text-sm text-dark">{formatDate(lead.createdAt)}</p>
                  <p className="text-xs text-[#8F7C70] mt-0.5">{formatTime(lead.createdAt)}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-[#E7DFDA]">
        {leads.map((lead) => (
          <div
            key={lead._id}
            onClick={() => router.push(`/cr/paws-admin/leads/${lead._id}`)}
            className="p-4 hover:bg-[#FAFAF8] cursor-pointer transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-semibold text-dark">{lead.name}</p>
                <p className="text-xs text-[#8F7C70] mt-0.5">{lead.email}</p>
              </div>
              <LeadStatusBadge status={lead.status} />
            </div>
            <div className="flex items-center gap-4 text-xs text-[#8F7C70]">
              <span>{lead.frequency}</span>
              <span>{lead.dogs}</span>
              <span className="ml-auto">{formatDate(lead.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
