import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import connectDB from "@/lib/db";
import Lead from "@/lib/models/Lead";
import * as XLSX from "xlsx";
import { log } from "@/lib/logger";

const hearFromLabels: Record<string, string> = {
  fb: "Facebook",
  google: "Google",
  ys: "Yard Sign",
  sticker: "Sticker",
};

export async function GET(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const format = searchParams.get("format") || "csv";
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const filter: Record<string, unknown> = {};
    if (status && status !== "All") filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
      ];
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 }).lean();

    log.admin.info(`Exporting ${leads.length} leads as ${format}`, { status, search });

    const rows = leads.map((lead) => ({
      Name: lead.name,
      Email: lead.email,
      Phone: lead.phone,
      Address: lead.address,
      Dogs: lead.dogs,
      Frequency: lead.frequency,
      Surface: lead.surface,
      Services: lead.services?.join(", ") || "",
      "Free Cleaning": lead.freeCleaning || "",
      "Heard From": hearFromLabels[lead.hearFrom] || lead.hearFrom || "",
      Status: lead.status,
      Notes: lead.notes || "",
      "Created At": new Date(lead.createdAt).toLocaleString("en-US"),
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");

    if (format === "xlsx") {
      const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
      return new NextResponse(buf, {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="paws-scoops-leads.xlsx"`,
        },
      });
    }

    // CSV
    const csv = XLSX.utils.sheet_to_csv(ws);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="paws-scoops-leads.csv"`,
      },
    });
  } catch (error) {
    log.admin.error("Export failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
