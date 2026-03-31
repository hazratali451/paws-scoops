"use client";

import React, { useState } from "react";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const mismatch = newPassword !== confirmPassword && confirmPassword.length > 0;
  const isDisabled =
    !currentPassword || !newPassword || !confirmPassword || mismatch || newPassword.length < 6 || loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (res.ok) {
        window.location.href = "/cr/paws-admin/login";
      } else {
        const data = await res.json();
        setError(data.error || "Failed to change password");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-dark mb-5">Settings</h1>

      <div className="bg-white rounded-xl border border-[#E7DFDA] p-5 shadow-[0_4px_12px_-6px_rgba(66,158,188,0.15)]">
        <h2 className="text-sm font-semibold text-dark mb-1">Change Password</h2>
        <p className="text-xs text-[#8F7C70] mb-5">
          You will be signed out after changing your password.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#8F7C70] uppercase tracking-wider mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7DFDA] text-sm text-dark placeholder:text-[#C4B8B0] focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color/30 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8F7C70] uppercase tracking-wider mb-1.5">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7DFDA] text-sm text-dark placeholder:text-[#C4B8B0] focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color/30 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8F7C70] uppercase tracking-wider mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-dark placeholder:text-[#C4B8B0] focus:outline-none focus:ring-1 transition-colors ${
                mismatch
                  ? "border-red-300 focus:border-red-400 focus:ring-red-200"
                  : "border-[#E7DFDA] focus:border-primary-color focus:ring-primary-color/30"
              }`}
            />
            {mismatch && (
              <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-colors ${
              isDisabled
                ? "bg-primary-color/40 cursor-not-allowed"
                : "bg-primary-color hover:bg-primary-color/90 cursor-pointer"
            }`}
          >
            {loading ? "Changing password..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
