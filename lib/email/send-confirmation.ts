import { Resend } from "resend";
import { buildConfirmationHTML } from "./templates/confirmation";
import { buildAdminNotificationHTML } from "./templates/admin-notification";
import connectDB from "@/lib/db";
import { getAdmin } from "@/lib/models/Admin";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

interface LeadEmailData {
  name: string;
  email: string;
  phone: string;
  address: string;
  dogs: string;
  frequency: string;
  surface: string;
  services: string[];
  freeCleaning: string;
  hearFrom: string;
}

export async function sendConfirmationEmail(data: LeadEmailData) {
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const firstName = data.name.split(" ")[0];

  // Send confirmation to customer
  await getResend().emails.send({
    from: `Paws & Scoops <${fromEmail}>`,
    to: data.email,
    subject: `Thanks for your quote request, ${firstName}!`,
    html: buildConfirmationHTML(data),
  });
}

export async function sendAdminNotification(data: LeadEmailData) {
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  await connectDB();
  const admin = await getAdmin();
  const emails = admin.notificationEmails;

  if (!emails || emails.length === 0) return;

  await Promise.all(
    emails.map((email: string) =>
      getResend().emails.send({
        from: `Paws & Scoops Leads <${fromEmail}>`,
        to: email,
        subject: `New Lead: ${data.name} — ${data.frequency}`,
        html: buildAdminNotificationHTML(data),
      })
    )
  );
}
