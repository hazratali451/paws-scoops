"use client";

import React, { useState, useEffect, useCallback } from "react";

export default function SettingsPage() {
  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Email state
  const [emails, setEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailsLoading, setEmailsLoading] = useState(true);

  const mismatch = newPassword !== confirmPassword && confirmPassword.length > 0;
  const passwordDisabled =
    !currentPassword || !newPassword || !confirmPassword || mismatch || newPassword.length < 6 || passwordLoading;

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);

  const fetchEmails = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/emails");
      if (res.ok) {
        const data = await res.json();
        setEmails(data.emails || []);
      }
    } catch (err) {
      console.error("Failed to fetch emails:", err);
    } finally {
      setEmailsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordDisabled) return;

    setPasswordLoading(true);
    setPasswordError("");

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
        setPasswordError(data.error || "Failed to change password");
      }
    } catch {
      setPasswordError("Something went wrong");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleAddEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail || emailLoading) return;

    setEmailLoading(true);
    setEmailError("");

    try {
      const res = await fetch("/api/admin/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail }),
      });

      if (res.ok) {
        const data = await res.json();
        setEmails(data.emails);
        setNewEmail("");
      } else {
        const data = await res.json();
        setEmailError(data.error || "Failed to add email");
      }
    } catch {
      setEmailError("Something went wrong");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleRemoveEmail = async (email: string) => {
    try {
      const res = await fetch("/api/admin/emails", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        const data = await res.json();
        setEmails(data.emails);
      }
    } catch (err) {
      console.error("Failed to remove email:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-4">
      <h1 className="text-xl font-bold text-dark">Settings</h1>

      {/* Notification Emails */}
      <div className="bg-white rounded-xl border border-[#E7DFDA] p-5 shadow-[0_4px_12px_-6px_rgba(66,158,188,0.15)]">
        <h2 className="text-sm font-semibold text-dark mb-1">Notification Emails</h2>
        <p className="text-xs text-[#8F7C70] mb-4">
          All these emails will receive a notification when a new lead comes in.
        </p>

        {/* Email list */}
        {emailsLoading ? (
          <div className="h-10 bg-[#F5F2EF] rounded-lg animate-pulse mb-3" />
        ) : emails.length > 0 ? (
          <div className="flex flex-col gap-2 mb-4">
            {emails.map((email) => (
              <div
                key={email}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-[#E7DFDA] bg-[#FAFAF8]"
              >
                <span className="text-sm text-dark truncate">{email}</span>
                <button
                  onClick={() => handleRemoveEmail(email)}
                  className="shrink-0 ml-2 text-[#C4B8B0] hover:text-[#C62828] transition-colors cursor-pointer"
                  title="Remove email"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#C4B8B0] mb-4">No notification emails added yet.</p>
        )}

        {/* Add email form */}
        <form onSubmit={handleAddEmail} className="flex gap-2">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
              setEmailError("");
            }}
            placeholder="name@example.com"
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#E7DFDA] text-sm text-dark placeholder:text-[#C4B8B0] focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color/30 transition-colors"
          />
          <button
            type="submit"
            disabled={!isValidEmail || emailLoading}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold text-white shrink-0 transition-colors ${
              !isValidEmail || emailLoading
                ? "bg-primary-color/40 cursor-not-allowed"
                : "bg-primary-color hover:bg-primary-color/90 cursor-pointer"
            }`}
          >
            {emailLoading ? "Adding..." : "Add"}
          </button>
        </form>

        {emailError && (
          <p className="text-xs text-red-500 mt-2">{emailError}</p>
        )}
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl border border-[#E7DFDA] p-5 shadow-[0_4px_12px_-6px_rgba(66,158,188,0.15)]">
        <h2 className="text-sm font-semibold text-dark mb-1">Change Password</h2>
        <p className="text-xs text-[#8F7C70] mb-5">
          You will be signed out after changing your password.
        </p>

        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
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

          {passwordError && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              {passwordError}
            </p>
          )}

          <button
            type="submit"
            disabled={passwordDisabled}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-colors ${
              passwordDisabled
                ? "bg-primary-color/40 cursor-not-allowed"
                : "bg-primary-color hover:bg-primary-color/90 cursor-pointer"
            }`}
          >
            {passwordLoading ? "Changing password..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
