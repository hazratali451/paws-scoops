"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/admin/SearchBar";
import StatusFilter from "@/components/admin/StatusFilter";
import LeadsTable from "@/components/admin/LeadsTable";
import Pagination from "@/components/admin/Pagination";

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

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });
      if (statusFilter !== "All") params.set("status", statusFilter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/leads?${params}`);
      if (res.status === 401) {
        router.push("/cr/paws-admin/login");
        return;
      }
      const data = await res.json();
      setLeads(data.leads || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, search, router]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleStatusChange = useCallback((status: string) => {
    setStatusFilter(status);
    setPage(1);
  }, []);

  const handleExport = (format: "csv" | "xlsx") => {
    const params = new URLSearchParams({ format });
    if (statusFilter !== "All") params.set("status", statusFilter);
    if (search) params.set("search", search);
    window.open(`/api/admin/leads/export?${params}`, "_blank");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-xl font-bold text-dark">Leads</h1>
          <p className="text-sm text-[#8F7C70]">
            {total} total lead{total !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport("csv")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border border-[#E7DFDA] text-[#8F7C70] bg-white hover:bg-[#F5F2EF] transition-colors cursor-pointer"
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            CSV
          </button>
          <button
            onClick={() => handleExport("xlsx")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border border-[#E7DFDA] text-[#8F7C70] bg-white hover:bg-[#F5F2EF] transition-colors cursor-pointer"
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Excel
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-4">
        <div className="max-w-xs">
          <SearchBar value={search} onChange={handleSearchChange} />
        </div>
        <StatusFilter active={statusFilter} onChange={handleStatusChange} />
      </div>

      <LeadsTable leads={leads} loading={loading} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
