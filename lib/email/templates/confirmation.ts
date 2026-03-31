interface ConfirmationData {
  name: string;
  dogs: string;
  frequency: string;
  surface: string;
  services: string[];
  freeCleaning: string;
}

export function buildConfirmationHTML(data: ConfirmationData): string {
  const firstName = data.name.split(" ")[0];
  const servicesText = data.services.length > 0 ? data.services.join(", ") : "—";

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
            <td style="background-color: #53aec6; padding: 28px 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">
                Paws &amp; Scoops
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 8px; color: #2c1c11; font-size: 20px; font-weight: 700;">
                Thanks for your quote request, ${firstName}!
              </h2>
              <p style="margin: 0 0 24px; color: #8F7C70; font-size: 15px; line-height: 1.5;">
                One of our team members will be reaching out shortly. Here&rsquo;s a summary of your selections:
              </p>

              <!-- Summary Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F2EF; border-radius: 8px; border: 1px solid #E7DFDA;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #E7DFDA;">
                    <span style="color: #8F7C70; font-size: 14px;">Service Frequency</span>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #E7DFDA; text-align: right;">
                    <span style="color: #2c1c11; font-size: 14px; font-weight: 700;">${data.frequency}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #E7DFDA;">
                    <span style="color: #8F7C70; font-size: 14px;">Dog Count</span>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #E7DFDA; text-align: right;">
                    <span style="color: #2c1c11; font-size: 14px; font-weight: 700;">${data.dogs}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #E7DFDA;">
                    <span style="color: #8F7C70; font-size: 14px;">Backyard Surface</span>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #E7DFDA; text-align: right;">
                    <span style="color: #2c1c11; font-size: 14px; font-weight: 700;">${data.surface}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #E7DFDA;">
                    <span style="color: #8F7C70; font-size: 14px;">Selected Services</span>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #E7DFDA; text-align: right;">
                    <span style="color: #2c1c11; font-size: 14px; font-weight: 700;">${servicesText}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px;">
                    <span style="color: #8F7C70; font-size: 14px;">Free Cleaning</span>
                  </td>
                  <td style="padding: 16px 20px; text-align: right;">
                    <span style="color: #2c1c11; font-size: 14px; font-weight: 700;">${data.freeCleaning || "—"}</span>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <div style="margin-top: 24px; padding: 20px; background-color: #F5F2EF; border-radius: 8px; border: 1px dashed #E7DFDA; text-align: center;">
                <p style="margin: 0 0 4px; color: #2c1c11; font-size: 15px; font-weight: 700;">
                  Questions? Call or text us
                </p>
                <a href="tel:7085005016" style="color: #53aec6; font-size: 18px; font-weight: 700; text-decoration: none;">
                  (708) 500-5016
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #F5F2EF; border-top: 1px solid #E7DFDA; text-align: center;">
              <p style="margin: 0; color: #8F7C70; font-size: 12px; line-height: 1.5;">
                Paws &amp; Scoops &mdash; Chicago Pet Waste Removal<br />
                We never share your info.
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
