import { Resend } from "resend";
import { buildConfirmationHTML } from "./templates/confirmation";
import { buildAdminNotificationHTML } from "./templates/admin-notification";

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
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) return;

  await getResend().emails.send({
    from: `Paws & Scoops Leads <${fromEmail}>`,
    to: adminEmail,
    subject: `New Lead: ${data.name} — ${data.frequency}`,
    html: buildAdminNotificationHTML(data),
  });
}
