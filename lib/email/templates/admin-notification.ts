interface AdminNotificationData {
  name: string;
  email: string;
  phone: string;
  address: string;
  dogs: string;
  frequency: string;
  surface: string;
  services: string[];
  startTime: string;
  hearFrom: string;
}

const hearFromLabels: Record<string, string> = {
  fb: "Facebook",
  google: "Google",
  ys: "Yard Sign",
  sticker: "Sticker",
};

export function buildAdminNotificationHTML(data: AdminNotificationData): string {
  const servicesText = data.services.length > 0 ? data.services.join(", ") : "—";
  const hearFromText = hearFromLabels[data.hearFrom] || data.hearFrom || "—";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 0; background-color: #F5F2EF; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F2EF; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #ffffff; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color: #2c1c11; padding: 28px 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700;">
                New Lead Received
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px;">
              <div style="margin-bottom: 20px; padding: 16px; background-color: #429EBC15; border-radius: 8px; border-left: 4px solid #53aec6;">
                <h2 style="margin: 0 0 4px; color: #2c1c11; font-size: 18px; font-weight: 700;">
                  ${data.name}
                </h2>
                <p style="margin: 0; color: #8F7C70; font-size: 14px;">
                  ${data.email} &bull; ${data.phone}
                </p>
                <p style="margin: 4px 0 0; color: #8F7C70; font-size: 14px;">
                  ${data.address}
                </p>
              </div>

              <!-- Service Details -->
              <h3 style="margin: 0 0 12px; color: #8F7C70; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                Service Details
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F2EF; border-radius: 8px; border: 1px solid #E7DFDA;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E7DFDA;">
                    <span style="color: #8F7C70; font-size: 13px;">Dogs</span>
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E7DFDA; text-align: right;">
                    <span style="color: #2c1c11; font-size: 13px; font-weight: 700;">${data.dogs}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E7DFDA;">
                    <span style="color: #8F7C70; font-size: 13px;">Frequency</span>
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E7DFDA; text-align: right;">
                    <span style="color: #2c1c11; font-size: 13px; font-weight: 700;">${data.frequency}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E7DFDA;">
                    <span style="color: #8F7C70; font-size: 13px;">Surface</span>
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E7DFDA; text-align: right;">
                    <span style="color: #2c1c11; font-size: 13px; font-weight: 700;">${data.surface}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E7DFDA;">
                    <span style="color: #8F7C70; font-size: 13px;">Services</span>
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E7DFDA; text-align: right;">
                    <span style="color: #2c1c11; font-size: 13px; font-weight: 700;">${servicesText}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E7DFDA;">
                    <span style="color: #8F7C70; font-size: 13px;">Start Time</span>
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #E7DFDA; text-align: right;">
                    <span style="color: #2c1c11; font-size: 13px; font-weight: 700;">${data.startTime || "—"}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px;">
                    <span style="color: #8F7C70; font-size: 13px;">Heard From</span>
                  </td>
                  <td style="padding: 12px 16px; text-align: right;">
                    <span style="color: #2c1c11; font-size: 13px; font-weight: 700;">${hearFromText}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 32px; background-color: #F5F2EF; border-top: 1px solid #E7DFDA; text-align: center;">
              <p style="margin: 0; color: #8F7C70; font-size: 12px;">
                Paws &amp; Scoops Lead Management
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
