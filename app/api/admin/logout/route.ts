import { NextResponse } from "next/server";
import { destroySession } from "@/lib/admin/auth";
import { log } from "@/lib/logger";

export async function POST() {
  await destroySession();
  log.auth.info("Admin logged out");
  return NextResponse.json({ success: true });
}
