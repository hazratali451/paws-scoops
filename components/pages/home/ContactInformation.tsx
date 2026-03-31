"use client";

import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import StepLayout from "@/components/common/StepLayout";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface FormData {
  dogs: string;
  frequency: string;
  surface: string;
  services: string[];
  startTime: string;
}

interface ContactProps {
  onNext?: () => void;
  onBack?: () => void;
  formData?: FormData;
}

export default function ContactInformation({ onNext, onBack, formData }: ContactProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [hearFrom, setHearFrom] = useState("");
  const [loading, setLoading] = useState(false);
  const isDisabled = !name || !email || !phone || !address || !hearFrom;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled || loading) return;
    setLoading(true);
    if (onNext) onNext();

    const payload = {
      name,
      email,
      phone,
      address,
      hearFrom,
      dogs: formData?.dogs || "",
      frequency: formData?.frequency || "",
      surface: formData?.surface || "",
      services: formData?.services || [],
      startTime: formData?.startTime || "",
    };

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Lead submission failed:", err);
    }

    const params = new URLSearchParams({
      name,
      email,
      phone,
      address,
      dogs: formData?.dogs || "",
      frequency: formData?.frequency || "",
      surface: formData?.surface || "",
      services: formData?.services?.join(", ") || "",
      startTime: formData?.startTime || "",
    });
    router.push(`/v?${params.toString()}`);
  };

  return (
    <StepLayout
      title="Contact information"
      description="Share the best way to reach you. We’ll show your instant quote next."
      step={5}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <InputField
          label="Full name"
          placeholder="Jane Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <InputField
          label="Email"
          placeholder="you@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <InputField
          label="Phone"
          placeholder="(555) 555-5555"
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <SelectField
          label="How did you hear about us?"
          value={hearFrom}
          onChange={(val) => setHearFrom(val)}
          options={[
            { label: "Facebook", value: "fb" },
            { label: "Google", value: "google" },
            { label: "Yard Sign", value: "ys" },
            { label: "Sticker", value: "sticker" },
          ]}
          placeholder="Select one"
        />

        <InputField
          label="Address"
          placeholder="123 Main St, City, ST"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        {/* Info box */}
        <div className="p-3 px-2.5 rounded-lg flex justify-between gap-2 items-center bg-[#f5f2ef] border border-[#E7DFDA]">
          <span className="text-sm leading-[155%] font-normal text-[#8f7c70]">
            Need to update your selections?
          </span>
          <button
            onClick={onBack}
            type="button"
            className="px-3 py-1.75 border border-[#E7DFDA] rounded-lg text-sm font-semibold leading-[155%] bg-[#f7f4f2]"
            style={{ boxShadow: "0 6px 16px -12px rgba(24, 24, 27, .08)" }}
          >
            Edit
          </button>
        </div>

        {/* Submit */}
        <div className="pt-2 flex flex-col gap-2">
          <button
            type="submit"
            disabled={isDisabled || loading}
            className={`flex-1 py-3.5 font-semibold text-sm rounded-[0.65rem] text-white border border-primary-color w-full ${isDisabled || loading ? "bg-primary-color/50 cursor-not-allowed opacity-60" : "bg-primary-color/85 cursor-pointer"}`}
          >
            {loading ? "Loading..." : "See my instant quote"}
          </button>

          <p className="text-[#8f7c70] text-xs font-normal leading-[158%]">
            We never share your info.
          </p>
        </div>
      </form>
    </StepLayout>
  );
}
