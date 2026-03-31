import { isAuthenticated } from "@/lib/admin/auth";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin | Paws & Scoops",
  robots: "noindex, nofollow",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();

  if (!authed) {
    return <>{children}</>;
  }

  return <AdminShell>{children}</AdminShell>;
}
