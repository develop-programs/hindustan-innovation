import nodemailer from "nodemailer";
import { type NextRequest, NextResponse } from "next/server";

type Props = {
    name: string;
    email: string;
    phone?: string;
    interest: string;
    message: string;
};

export const runtime = "nodejs";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: (process.env.EMAIL_SECURE === "true") || false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function GET() {
    return NextResponse.json({ message: "API is working" }, { status: 200 });
}

// ─── HTML Templates ────────────────────────────────────────────────────────────

function adminEmailHtml({ name, email, phone, interest, message }: Props): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Career Enquiry</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#1a1a2e;padding:28px 36px;">
              <p style="margin:0;color:#a0a8d0;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Hindustan Innovations</p>
              <h1 style="margin:6px 0 0;color:#ffffff;font-size:22px;font-weight:700;">New Career Enquiry</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 36px;">
              <p style="margin:0 0 24px;color:#555;font-size:15px;">A new application has been submitted via the Careers Portal.</p>

              <!-- Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9ff;border-left:4px solid #4f46e5;border-radius:4px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;">
                          <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Name</span><br/>
                          <span style="color:#1a1a2e;font-size:15px;font-weight:600;">${name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;border-top:1px solid #e8eaf6;">
                          <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</span><br/>
                          <a href="mailto:${email}" style="color:#4f46e5;font-size:15px;text-decoration:none;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;border-top:1px solid #e8eaf6;">
                          <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Phone</span><br/>
                          ${phone
            ? `<a href="tel:${phone}" style="color:#4f46e5;font-size:15px;text-decoration:none;">${phone}</a>`
            : `<span style="color:#aaa;font-size:15px;">Not provided</span>`
        }
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;border-top:1px solid #e8eaf6;">
                          <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Area of Interest</span><br/>
                          <span style="color:#1a1a2e;font-size:15px;">${interest || "Not specified"}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <p style="margin:0 0 8px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message</p>
              <div style="background:#fafafa;border:1px solid #e5e7eb;border-radius:6px;padding:16px 20px;color:#333;font-size:14px;line-height:1.7;white-space:pre-wrap;">${message}</div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8f9ff;padding:16px 36px;border-top:1px solid #e8eaf6;">
              <p style="margin:0;color:#aaa;font-size:12px;">
                Automated notification · Careers Portal · ${new Date().toLocaleString()}
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

function userEmailHtml({ name }: Pick<Props, "name">): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Thank You – Hindustan Innovations</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#1a1a2e;padding:28px 36px;">
              <p style="margin:0;color:#a0a8d0;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Hindustan Innovations</p>
              <h1 style="margin:6px 0 0;color:#ffffff;font-size:22px;font-weight:700;">Thank You, ${name}!</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 36px;">
              <p style="margin:0 0 16px;color:#333;font-size:15px;line-height:1.7;">
                Thank you for reaching out to <strong>Hindustan Innovations</strong>. We appreciate your interest and are excited to learn more about your career aspirations.
              </p>
              <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.7;">
                Your enquiry has been received and forwarded to our Human Resources team. We will carefully review your information and get in touch with you soon.
              </p>

              <!-- Steps -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:4px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;padding-top:2px;">
                          <div style="width:24px;height:24px;background:#4f46e5;border-radius:50%;text-align:center;line-height:24px;color:#fff;font-size:12px;font-weight:700;">1</div>
                        </td>
                        <td style="padding-left:12px;color:#333;font-size:14px;line-height:1.6;">
                          <strong>Enquiry Received</strong> — Your details are with our HR team.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;padding-top:2px;">
                          <div style="width:24px;height:24px;background:#4f46e5;border-radius:50%;text-align:center;line-height:24px;color:#fff;font-size:12px;font-weight:700;">2</div>
                        </td>
                        <td style="padding-left:12px;color:#333;font-size:14px;line-height:1.6;">
                          <strong>Review</strong> — We'll assess your profile against current openings.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;padding-top:2px;">
                          <div style="width:24px;height:24px;background:#4f46e5;border-radius:50%;text-align:center;line-height:24px;color:#fff;font-size:12px;font-weight:700;">3</div>
                        </td>
                        <td style="padding-left:12px;color:#333;font-size:14px;line-height:1.6;">
                          <strong>We'll be in touch</strong> — Expect a reply within <em>2–3 business days</em>.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0;color:#555;font-size:14px;line-height:1.7;">
                We look forward to connecting with you. If you have any questions in the meantime, feel free to reply to this email.
              </p>
            </td>
          </tr>

          <!-- Sign-off -->
          <tr>
            <td style="padding:0 36px 28px;">
              <p style="margin:0;color:#333;font-size:14px;">Warm regards,</p>
              <p style="margin:4px 0 0;color:#1a1a2e;font-size:15px;font-weight:700;">Hindustan Innovations Team</p>
              <p style="margin:2px 0 0;color:#888;font-size:12px;font-style:italic;">Precision | Products | Progress</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8f9ff;padding:16px 36px;border-top:1px solid #e8eaf6;">
              <p style="margin:0;color:#aaa;font-size:12px;">
                This is an automated confirmation. Please do not reply directly to this message.
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

// ─── POST Handler ──────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
    const data: Props = await req.json();

    if (!data.name || !data.email || !data.message) {
        return NextResponse.json(
            { error: "Name, email, and message are required" },
            { status: 400 }
        );
    }

    const emailSender = process.env.EMAIL_FROM;
    const emailReceiver = process.env.EMAIL_TO;

    if (!emailSender || !emailReceiver) {
        return NextResponse.json(
            { error: "Email service is not configured" },
            { status: 500 }
        );
    }

    try {
        // Send HTML email to admin
        await transporter.sendMail({
            from: `"Hindustan Innovations Careers" <${emailSender}>`,
            replyTo: data.email,
            to: emailReceiver,
            subject: `New Career Enquiry from ${data.name}`,
            html: adminEmailHtml(data),
        });

        // Send HTML auto-reply to user
        await transporter.sendMail({
            from: `"Hindustan Innovations Careers" <${emailSender}>`,
            to: data.email,
            subject: "Thank You for Your Enquiry - Hindustan Innovations",
            html: userEmailHtml({ name: data.name }),
        });

        return NextResponse.json(
            { message: "Enquiry received successfully! We will get in touch with you soon." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email: ", error);
        return NextResponse.json(
            { error: "Failed to process your enquiry. Please try again later." },
            { status: 500 }
        );
    }
}