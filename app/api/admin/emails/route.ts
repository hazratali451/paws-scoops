import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import connectDB from "@/lib/db";
import { getAdmin } from "@/lib/models/Admin";

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const admin = await getAdmin();
  return NextResponse.json({ emails: admin.notificationEmails });
}

export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    await connectDB();
    const admin = await getAdmin();

    if (admin.notificationEmails.includes(email)) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    admin.notificationEmails.push(email);
    await admin.save();

    return NextResponse.json({ emails: admin.notificationEmails });
  } catch {
    return NextResponse.json({ error: "Failed to add email" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email } = await request.json();

    await connectDB();
    const admin = await getAdmin();

    admin.notificationEmails = admin.notificationEmails.filter(
      (e: string) => e !== email
    );
    await admin.save();

    return NextResponse.json({ emails: admin.notificationEmails });
  } catch {
    return NextResponse.json({ error: "Failed to remove email" }, { status: 500 });
  }
}
