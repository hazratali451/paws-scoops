"use client";

import React, { useState } from "react";
import LeadStatusBadge from "./LeadStatusBadge";
import { LEAD_STATUSES } from "@/lib/constants";

const hearFromLabels: Record<string, string> = {
  fb: "Facebook",
  google: "Google",
  ys: "Yard Sign",
  sticker: "Sticker",
};

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
  startTime: string;
  hearFrom: string;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface LeadDetailCardProps {
  lead: Lead;
  onUpdate: (updates: { status?: string; notes?: string }) => Promise<void>;
  onDelete: () => Promise<void>;
}

function formatDateTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start py-3 border-b border-[#E7DFDA] last:border-0 gap-2">
      <span className="text-[#8F7C70] text-sm shrink-0">{label}</span>
      <span className="text-dark text-sm font-semibold text-right">{value || "—"}</span>
    </div>
  );
}

export default function LeadDetailCard({ lead, onUpdate, onDelete }: LeadDetailCardProps) {
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const hasChanges = status !== lead.status || notes !== lead.notes;

  const handleSave = async () => {
    setSaving(true);
    await onUpdate({ status, notes });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete();
  };

  return (
    <div className="grid lg:grid-cols-5 gap-4">
      {/* Left: Lead info (3 cols) */}
      <div className="lg:col-span-3 flex flex-col gap-4">
        {/* Contact card */}
        <div className="bg-white rounded-xl border border-[#E7DFDA] p-5 shadow-[0_4px_12px_-6px_rgba(66,158,188,0.15)]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-dark">{lead.name}</h2>
              <p className="text-sm text-[#8F7C70] mt-0.5">
                Submitted {formatDateTime(lead.createdAt)}
              </p>
            </div>
            <LeadStatusBadge status={lead.status} />
          </div>

          <div className="grid sm:grid-cols-2 gap-x-6">
            <div>
              <h3 className="text-xs font-semibold text-[#8F7C70] uppercase tracking-wider mb-1 mt-2">
                Contact Details
              </h3>
              <InfoRow label="Email" value={lead.email} />
              <InfoRow label="Phone" value={lead.phone} />
              <InfoRow label="Address" value={lead.address} />
              <InfoRow label="Heard From" value={hearFromLabels[lead.hearFrom] || lead.hearFrom} />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[#8F7C70] uppercase tracking-wider mb-1 mt-2">
                Service Details
              </h3>
              <InfoRow label="Dogs" value={lead.dogs} />
              <InfoRow label="Frequency" value={lead.frequency} />
              <InfoRow label="Surface" value={lead.surface} />
              <InfoRow label="Services" value={lead.services.join(", ")} />
              <InfoRow label="Start Time" value={lead.startTime} />
            </div>
          </div>
        </div>
      </div>

      {/* Right: Actions (2 cols) */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        {/* Status & notes */}
        <div className="bg-white rounded-xl border border-[#E7DFDA] p-5 shadow-[0_4px_12px_-6px_rgba(66,158,188,0.15)]">
          <h3 className="text-sm font-semibold text-dark mb-4">Manage Lead</h3>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#8F7C70] uppercase tracking-wider mb-1.5">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7DFDA] text-sm text-dark bg-white focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color/30 transition-colors cursor-pointer"
            >
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#8F7C70] uppercase tracking-wider mb-1.5">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add notes about this lead..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7DFDA] text-sm text-dark placeholder:text-[#C4B8B0] focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color/30 transition-colors resize-none"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-colors ${
              !hasChanges || saving
                ? "bg-primary-color/40 cursor-not-allowed"
                : "bg-primary-color hover:bg-primary-color/90 cursor-pointer"
            }`}
          >
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-xl border border-[#E7DFDA] p-5">
          <h3 className="text-sm font-semibold text-dark mb-2">Danger Zone</h3>
          <p className="text-xs text-[#8F7C70] mb-3">
            Permanently delete this lead. This action cannot be undone.
          </p>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-[#C62828] border border-[#FFCDD2] bg-[#FFEBEE] hover:bg-[#FFCDD2] transition-colors cursor-pointer"
            >
              Delete Lead
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#C62828] hover:bg-[#B71C1C] transition-colors cursor-pointer"
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-[#8F7C70] border border-[#E7DFDA] hover:bg-[#F5F2EF] transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
