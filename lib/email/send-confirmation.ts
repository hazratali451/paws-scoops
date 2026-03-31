import { Resend } from "resend";
import { buildConfirmationHTML } from "./templates/confirmation";
import { buildAdminNotificationHTML } from "./templates/admin-notification";
import connectDB from "@/lib/db";
import { getAdmin } from "@/lib/models/Admin";
import { log } from "@/lib/logger";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    log.email.error("RESEND_API_KEY is not set in environment variables");
  }
  return new Resend(apiKey);
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
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  if (!fromEmail) {
    log.email.warn("RESEND_FROM_EMAIL not set, skipping customer confirmation email");
    return;
  }

  const firstName = data.name.split(" ")[0];
  log.email.info(`Sending confirmation email to ${data.email}`);

  try {
    const result = await getResend().emails.send({
      from: `Paws & Scoops <${fromEmail}>`,
      to: data.email,
      subject: `Thanks for your quote request, ${firstName}!`,
      html: buildConfirmationHTML(data),
    });
    log.email.info(`Confirmation email sent to ${data.email}`, { id: result.data?.id });
  } catch (err) {
    log.email.error(`Failed to send confirmation email to ${data.email}`, err instanceof Error ? err.message : err);
    throw err;
  }
}

export async function sendAdminNotification(data: LeadEmailData) {
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  if (!fromEmail) {
    log.email.warn("RESEND_FROM_EMAIL not set, skipping admin notification");
    return;
  }

  await connectDB();
  const admin = await getAdmin();
  const emails = admin.notificationEmails;

  if (!emails || emails.length === 0) {
    log.email.info("No admin notification emails configured, skipping");
    return;
  }

  log.email.info(`Sending admin notification to ${emails.length} recipient(s): ${emails.join(", ")}`);

  const results = await Promise.allSettled(
    emails.map((email: string) =>
      getResend().emails.send({
        from: `Paws & Scoops Leads <${fromEmail}>`,
        to: email,
        subject: `New Lead: ${data.name} — ${data.frequency}`,
        html: buildAdminNotificationHTML(data),
      })
    )
  );

  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      log.email.info(`Admin notification sent to ${emails[i]}`, { id: result.value.data?.id });
    } else {
      log.email.error(`Admin notification failed for ${emails[i]}`, result.reason?.message || result.reason);
    }
  });
}
