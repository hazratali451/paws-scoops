import { NextResponse } from "next/server";
import { verifyPassword, createSession } from "@/lib/admin/auth";
import { checkRateLimit } from "@/lib/admin/rate-limit";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { allowed, retryAfter } = checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        { error: `Too many attempts. Try again in ${retryAfter}s` },
        { status: 429 }
      );
    }

    const { password } = await request.json();

    if (!password || !(await verifyPassword(password))) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    await createSession();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
