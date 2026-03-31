import mongoose, { Schema, Document } from "mongoose";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/constants";

export { LEAD_STATUSES, type LeadStatus };

export interface ILead extends Document {
  dogs: string;
  frequency: string;
  surface: string;
  services: string[];
  startTime: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  hearFrom: string;
  status: LeadStatus;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    dogs: { type: String, required: true },
    frequency: { type: String, required: true },
    surface: { type: String, required: true },
    services: { type: [String], default: [] },
    startTime: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    hearFrom: { type: String, default: "" },
    status: {
      type: String,
      enum: LEAD_STATUSES,
      default: "New",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ status: 1 });
LeadSchema.index({ email: 1 });

export default mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);
