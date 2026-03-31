import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lead from "@/lib/models/Lead";
import { sendConfirmationEmail, sendAdminNotification } from "@/lib/email/send-confirmation";
import { log } from "@/lib/logger";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, address, dogs, frequency, surface, services, freeCleaning, hearFrom } = body;

    if (!name || !email || !phone || !address || !dogs || !frequency || !surface) {
      log.leads.warn("Lead submission missing required fields", { name, email, dogs, frequency, surface });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    log.leads.info(`New lead submission from ${name} (${email})`);

    await connectDB();

    const lead = await Lead.create({
      name,
      email,
      phone,
      address,
      dogs,
      frequency,
      surface,
      services: services || [],
      freeCleaning: freeCleaning || "",
      hearFrom: hearFrom || "",
      status: "New",
    });

    log.leads.info(`Lead saved to database`, { leadId: lead._id, name, email });

    // Fire emails in background — don't await, don't block the response
    const emailData = {
      name, email, phone, address, dogs, frequency, surface,
      services: services || [],
      freeCleaning: freeCleaning || "",
      hearFrom: hearFrom || "",
    };

    sendConfirmationEmail(emailData).catch((err) =>
      log.email.error(`Customer email failed for ${email}`, err instanceof Error ? err.message : err)
    );
    sendAdminNotification(emailData).catch((err) =>
      log.email.error("Admin notification failed", err instanceof Error ? err.message : err)
    );

    return NextResponse.json({ success: true, leadId: lead._id }, { status: 201 });
  } catch (error) {
    log.leads.error("Lead creation failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
