import mongoose, { Schema, Document } from "mongoose";
import { createHash } from "crypto";

export interface IAdmin extends Document {
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
export default Admin;

export function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

/**
 * Get or create the admin document.
 * On first run, seeds from ADMIN_PASSWORD env var.
 */
export async function getAdmin(): Promise<IAdmin> {
  let admin = await Admin.findOne();
  if (!admin) {
    const seedPassword = process.env.ADMIN_PASSWORD || "admin";
    admin = await Admin.create({ passwordHash: hashPassword(seedPassword) });
  }
  return admin;
}
