import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lead from "@/lib/models/Lead";
import { sendConfirmationEmail, sendAdminNotification } from "@/lib/email/send-confirmation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, address, dogs, frequency, surface, services, freeCleaning, hearFrom } = body;

    if (!name || !email || !phone || !address || !dogs || !frequency || !surface) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

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

    // Fire emails in background — don't await, don't block the response
    const emailData = {
      name, email, phone, address, dogs, frequency, surface,
      services: services || [],
      freeCleaning: freeCleaning || "",
      hearFrom: hearFrom || "",
    };

    sendConfirmationEmail(emailData).catch((err) =>
      console.error("Customer email failed:", err)
    );
    sendAdminNotification(emailData).catch((err) =>
      console.error("Admin notification failed:", err)
    );

    return NextResponse.json({ success: true, leadId: lead._id }, { status: 201 });
  } catch (error) {
    console.error("Lead creation failed:", error);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
