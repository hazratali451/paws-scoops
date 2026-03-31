"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        window.location.href = "/cr/paws-admin/dashboard";
        return;
      } else {
        const data = await res.json();
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2EF] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Image
            src="/assets/image/logo.webp"
            alt="Paws & Scoops"
            width={180}
            height={48}
            priority
          />
        </div>

        <div className="bg-white rounded-xl border border-[#E7DFDA] p-6 shadow-[0_12px_28px_-24px_rgba(66,158,188,0.55)]">
          <h1 className="text-lg font-bold text-dark text-center mb-1">
            Admin Panel
          </h1>
          <p className="text-sm text-[#8F7C70] text-center mb-6">
            Enter your password to continue
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7DFDA] text-sm text-dark placeholder:text-[#C4B8B0] focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color/30 transition-colors"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!password || loading}
              className={`w-full py-3 font-semibold text-sm rounded-lg text-white transition-colors ${
                !password || loading
                  ? "bg-primary-color/50 cursor-not-allowed"
                  : "bg-primary-color hover:bg-primary-color/90 cursor-pointer"
              }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
