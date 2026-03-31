import { NextResponse } from "next/server";
import { isAuthenticated, changePassword, destroySession } from "@/lib/admin/auth";
import { log } from "@/lib/logger";

export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Both fields are required" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 });
    }

    const success = await changePassword(currentPassword, newPassword);
    if (!success) {
      log.auth.warn("Password change failed — incorrect current password");
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
    }

    await destroySession();
    log.auth.info("Admin password changed successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    log.auth.error("Password change failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Failed to change password" }, { status: 500 });
  }
}
