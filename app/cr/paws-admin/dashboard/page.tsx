"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LeadStatusBadge from "@/components/admin/LeadStatusBadge";

interface Stats {
  total: number;
  statusCounts: Record<string, number>;
  thisWeek: number;
  thisMonth: number;
  lastMonth: number;
  monthGrowth: number;
  conversionRate: number;
  referrals: { source: string; count: number }[];
  recentLeads: { _id: string; name: string; status: string; createdAt: string; frequency: string }[];
  trend: { label: string; count: number }[];
}

function StatCard({
  label,
  value,
  subtitle,
  accent,
}: {
  label: string;
  value: string | number;
  subtitle?: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#E7DFDA] p-4 shadow-[0_4px_12px_-6px_rgba(66,158,188,0.15)]">
      <p className="text-xs font-semibold text-[#8F7C70] uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className={`text-2xl font-bold ${accent ? "text-primary-color" : "text-dark"}`}>
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-[#8F7C70] mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.status === 401) {
          router.push("/cr/paws-admin/login");
          return;
        }
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [router]);

  if (loading || !stats) {
    return (
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl font-bold text-dark mb-5">Dashboard</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E7DFDA] p-4 h-24 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const maxTrend = Math.max(...stats.trend.map((t) => t.count), 1);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-xl font-bold text-dark mb-5">Dashboard</h1>

      {/* Top stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total Leads" value={stats.total} />
        <StatCard
          label="This Month"
          value={stats.thisMonth}
          subtitle={
            stats.monthGrowth > 0
              ? `+${stats.monthGrowth}% vs last month`
              : stats.monthGrowth < 0
                ? `${stats.monthGrowth}% vs last month`
                : "Same as last month"
          }
        />
        <StatCard label="This Week" value={stats.thisWeek} />
        <StatCard
          label="Conversion Rate"
          value={`${stats.conversionRate}%`}
          subtitle={`${stats.statusCounts["Won"] || 0} won of ${stats.total}`}
          accent
        />
      </div>

      {/* Status breakdown */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {["New", "Contacted", "Quoted", "Won", "Lost"].map((status) => (
          <div
            key={status}
            onClick={() => router.push(`/cr/paws-admin/leads?status=${status}`)}
            className="bg-white rounded-xl border border-[#E7DFDA] p-3 text-center hover:bg-[#FAFAF8] cursor-pointer transition-colors"
          >
            <p className="text-lg font-bold text-dark">{stats.statusCounts[status] || 0}</p>
            <LeadStatusBadge status={status} />
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Monthly trend */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E7DFDA] p-5 shadow-[0_4px_12px_-6px_rgba(66,158,188,0.15)]">
          <h2 className="text-sm font-semibold text-dark mb-4">Monthly Trend</h2>
          {stats.trend.length > 0 ? (
            <div className="flex items-end gap-2 h-40">
              {stats.trend.map((t) => (
                <div key={t.label} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-semibold text-dark">{t.count}</span>
                  <div
                    className="w-full bg-primary-color/20 rounded-t-md relative overflow-hidden"
                    style={{ height: `${(t.count / maxTrend) * 100}%`, minHeight: 4 }}
                  >
                    <div
                      className="absolute bottom-0 w-full bg-primary-color rounded-t-md"
                      style={{ height: "100%" }}
                    />
                  </div>
                  <span className="text-[10px] text-[#8F7C70] whitespace-nowrap">{t.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#C4B8B0] text-center py-8">No data yet</p>
          )}
        </div>

        {/* Top referrals */}
        <div className="bg-white rounded-xl border border-[#E7DFDA] p-5 shadow-[0_4px_12px_-6px_rgba(66,158,188,0.15)]">
          <h2 className="text-sm font-semibold text-dark mb-4">Top Referral Sources</h2>
          {stats.referrals.length > 0 ? (
            <div className="flex flex-col gap-3">
              {stats.referrals.map((r) => {
                const pct = stats.total > 0 ? Math.round((r.count / stats.total) * 100) : 0;
                return (
                  <div key={r.source}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-dark font-medium">{r.source}</span>
                      <span className="text-xs text-[#8F7C70]">
                        {r.count} ({pct}%)
                      </span>
                    </div>
                    <div className="h-2 bg-[#F5F2EF] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-color rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-[#C4B8B0] text-center py-8">No data yet</p>
          )}
        </div>
      </div>

      {/* Recent leads */}
      <div className="mt-4 bg-white rounded-xl border border-[#E7DFDA] p-5 shadow-[0_4px_12px_-6px_rgba(66,158,188,0.15)]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-dark">Recent Leads</h2>
          <button
            onClick={() => router.push("/cr/paws-admin/leads")}
            className="text-xs text-primary-color font-semibold hover:underline cursor-pointer"
          >
            View all
          </button>
        </div>
        <div className="divide-y divide-[#E7DFDA]">
          {stats.recentLeads.map((lead) => (
            <div
              key={lead._id}
              onClick={() => router.push(`/cr/paws-admin/leads/${lead._id}`)}
              className="flex items-center justify-between py-3 hover:bg-[#FAFAF8] -mx-2 px-2 rounded-lg cursor-pointer transition-colors"
            >
              <div>
                <p className="text-sm font-semibold text-dark">{lead.name}</p>
                <p className="text-xs text-[#8F7C70]">{lead.frequency}</p>
              </div>
              <div className="flex items-center gap-3">
                <LeadStatusBadge status={lead.status} />
                <span className="text-xs text-[#C4B8B0] whitespace-nowrap">
                  {timeAgo(lead.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
