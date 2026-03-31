import { cookies } from "next/headers";
import { timingSafeEqual } from "crypto";
import connectDB from "@/lib/db";
import Admin, { getAdmin, hashPassword } from "@/lib/models/Admin";

const COOKIE_NAME = "paws_admin_session";

export async function verifyPassword(password: string): Promise<boolean> {
  await connectDB();
  const admin = await getAdmin();

  const inputHash = hashPassword(password);
  const inputBuf = Buffer.from(inputHash);
  const correctBuf = Buffer.from(admin.passwordHash);

  if (inputBuf.length !== correctBuf.length) return false;
  return timingSafeEqual(inputBuf, correctBuf);
}

async function getSessionToken(): Promise<string> {
  await connectDB();
  const admin = await getAdmin();
  return admin.passwordHash;
}

export async function createSession() {
  const token = await getSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);
  if (!sessionCookie) return false;

  try {
    const expectedToken = await getSessionToken();
    const cookieBuf = Buffer.from(sessionCookie.value);
    const expectedBuf = Buffer.from(expectedToken);

    if (cookieBuf.length !== expectedBuf.length) return false;
    return timingSafeEqual(cookieBuf, expectedBuf);
  } catch {
    return false;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<boolean> {
  const isValid = await verifyPassword(currentPassword);
  if (!isValid) return false;

  await connectDB();
  const admin = await getAdmin();
  admin.passwordHash = hashPassword(newPassword);
  await admin.save();

  return true;
}
