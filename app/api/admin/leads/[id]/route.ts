import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import connectDB from "@/lib/db";
import Lead from "@/lib/models/Lead";
import { log } from "@/lib/logger";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { id } = await params;
    const lead = await Lead.findById(id).lean();

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json(lead);
  } catch (error) {
    log.admin.error("Failed to fetch lead", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Failed to fetch lead" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { id } = await params;
    const updates = await request.json();

    // Only allow updating specific fields
    const allowedFields = ["status", "notes"];
    const sanitized: Record<string, unknown> = {};
    for (const key of allowedFields) {
      if (key in updates) {
        sanitized[key] = updates[key];
      }
    }

    const lead = await Lead.findByIdAndUpdate(id, sanitized, { new: true }).lean();

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    log.admin.info(`Lead ${id} updated`, sanitized);
    return NextResponse.json(lead);
  } catch (error) {
    log.admin.error("Failed to update lead", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { id } = await params;
    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    log.admin.info(`Lead ${id} deleted`, { name: lead.name, email: lead.email });
    return NextResponse.json({ success: true });
  } catch (error) {
    log.admin.error("Failed to delete lead", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
