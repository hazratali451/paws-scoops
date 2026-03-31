"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import LeadDetailCard from "@/components/admin/LeadDetailCard";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dogs: string;
  frequency: string;
  surface: string;
  services: string[];
  freeCleaning: string;
  hearFrom: string;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await fetch(`/api/admin/leads/${id}`);
        if (res.status === 401) {
          router.push("/cr/paws-admin/login");
          return;
        }
        if (!res.ok) {
          setError("Lead not found");
          return;
        }
        const data = await res.json();
        setLead(data);
      } catch {
        setError("Failed to load lead");
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, [id, router]);

  const handleUpdate = async (updates: { status?: string; notes?: string }) => {
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const updated = await res.json();
      setLead(updated);
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/cr/paws-admin/leads");
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="h-8 bg-[#E7DFDA] rounded animate-pulse w-48 mb-4" />
        <div className="h-64 bg-white rounded-xl border border-[#E7DFDA] animate-pulse" />
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl border border-[#E7DFDA] p-12 text-center">
          <p className="text-[#8F7C70] text-sm font-medium">{error || "Lead not found"}</p>
          <button
            onClick={() => router.push("/cr/paws-admin/leads")}
            className="mt-3 text-sm text-primary-color font-semibold hover:underline cursor-pointer"
          >
            Back to leads
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={() => router.push("/cr/paws-admin/leads")}
        className="flex items-center gap-1.5 text-sm text-[#8F7C70] hover:text-dark transition-colors mb-4 cursor-pointer"
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <polyline points="15,18 9,12 15,6" />
        </svg>
        Back to leads
      </button>

      <LeadDetailCard lead={lead} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
}
