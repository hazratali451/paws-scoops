import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin/auth";

export default async function AdminDashboard() {
  const authed = await isAuthenticated();
  if (!authed) redirect("/cr/paws-admin/login");
  redirect("/cr/paws-admin/dashboard");
}
