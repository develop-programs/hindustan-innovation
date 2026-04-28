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
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function GET() {
  return NextResponse.json({ message: "API is working" }, { status: 200 });
}

// ─── Interest-aware content map ───────────────────────────────────────────────

type InterestType = "career" | "project" | "partnership" | "enquiry" | string;

function getInterestMeta(interest: InterestType) {
  const map: Record<string, { label: string; adminTitle: string; adminSubtitle: string; userHeadline: string; userBody: string; step1: string; step2: string; step3: string; senderName: string; subjectAdmin: string; subjectUser: string }> = {
    career: {
      label: "Career",
      adminTitle: "New Career Application",
      adminSubtitle: "A candidate has submitted their details via the Contact page.",
      userHeadline: "We've received your career application!",
      userBody: "Your application has been received and will be reviewed by our team. We're always looking for talented people and will reach out if there's a good fit.",
      step1: "Application received - your details are with our team.",
      step2: "Our team will review your profile and match it with current opportunities.",
      step3: "Expect a reply within <em>3 - 5 business days</em>.",
      senderName: "Hindustan Innovations",
      subjectAdmin: "New Career Application",
      subjectUser: "We've Received Your Application - Hindustan Innovations",
    },
    project: {
      label: "Project",
      adminTitle: "New Project Inquiry",
      adminSubtitle: "Someone has reached out about a potential project collaboration.",
      userHeadline: "Thanks for sharing your project idea!",
      userBody: "We've received the details of your project and our team will review it carefully. We love working on exciting ideas and will get back to you with our thoughts soon.",
      step1: "Project details received - our team is on it.",
      step2: "We'll evaluate scope, feasibility, and the best way we can help.",
      step3: "Expect a reply within <em>2 - 3 business days</em>.",
      senderName: "Hindustan Innovations",
      subjectAdmin: "New Project Inquiry",
      subjectUser: "We've Received Your Project Inquiry - Hindustan Innovations",
    },
    partnership: {
      label: "Partnership",
      adminTitle: "New Partnership Request",
      adminSubtitle: "A potential partner has reached out to explore collaboration.",
      userHeadline: "Excited to explore this with you!",
      userBody: "Thank you for considering Hindustan Innovations as a potential partner. We've received your message and our team will review the opportunity and follow up with you shortly.",
      step1: "Request received - our team will review the opportunity.",
      step2: "We'll assess alignment and potential collaboration areas.",
      step3: "Expect a reply within <em>2 - 4 business days</em>.",
      senderName: "Hindustan Innovations",
      subjectAdmin: "New Partnership Request",
      subjectUser: "Partnership Inquiry Received - Hindustan Innovations",
    },
    enquiry: {
      label: "General Enquiry",
      adminTitle: "New General Enquiry",
      adminSubtitle: "A new message has been submitted via the contact form.",
      userHeadline: "We've got your message!",
      userBody: "Thank you for reaching out to Hindustan Innovations. We've received your enquiry and one of our team members will get back to you as soon as possible.",
      step1: "Message received - our team has been notified.",
      step2: "We'll review your enquiry and prepare a response.",
      step3: "Expect a reply within <em>1 - 2 business days</em>.",
      senderName: "Hindustan Innovations",
      subjectAdmin: "New General Enquiry",
      subjectUser: "We've Received Your Enquiry - Hindustan Innovations",
    },
  };

  const key = (interest || "enquiry").toLowerCase();
  return map[key] ?? map["enquiry"];
}

// ─── HTML Templates ────────────────────────────────────────────────────────────

function adminEmailHtml({ name, email, phone, interest, message }: Props): string {
  const meta = getInterestMeta(interest);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${meta.adminTitle}</title>
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
              <h1 style="margin:6px 0 0;color:#ffffff;font-size:22px;font-weight:700;">${meta.adminTitle}</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 36px;">
              <p style="margin:0 0 24px;color:#555;font-size:15px;">${meta.adminSubtitle}</p>

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
                          <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Type</span><br/>
                          <span style="color:#1a1a2e;font-size:15px;">${meta.label}</span>
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
                Automated notification · Hindustan Innovations · ${new Date().toLocaleString()}
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

function userEmailHtml({ name, interest }: Pick<Props, "name" | "interest">): string {
  const meta = getInterestMeta(interest);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${meta.subjectUser}</title>
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
              <h1 style="margin:6px 0 0;color:#ffffff;font-size:22px;font-weight:700;">Hi ${name}, ${meta.userHeadline}</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 36px;">
              <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.7;">
                ${meta.userBody}
              </p>

              <!-- Steps -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:6px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;padding-top:2px;">
                          <div style="width:24px;height:24px;background:#4f46e5;border-radius:50%;text-align:center;line-height:24px;color:#fff;font-size:12px;font-weight:700;">1</div>
                        </td>
                        <td style="padding-left:12px;color:#333;font-size:14px;line-height:1.6;">${meta.step1}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;padding-top:2px;">
                          <div style="width:24px;height:24px;background:#4f46e5;border-radius:50%;text-align:center;line-height:24px;color:#fff;font-size:12px;font-weight:700;">2</div>
                        </td>
                        <td style="padding-left:12px;color:#333;font-size:14px;line-height:1.6;">${meta.step2}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;padding-top:2px;">
                          <div style="width:24px;height:24px;background:#4f46e5;border-radius:50%;text-align:center;line-height:24px;color:#fff;font-size:12px;font-weight:700;">3</div>
                        </td>
                        <td style="padding-left:12px;color:#333;font-size:14px;line-height:1.6;">${meta.step3}</td>
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
              <p style="margin:2px 0 0;color:#888;font-size:12px;font-style:italic;">Building Tomorrow's Solutions Today</p>
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

  const meta = getInterestMeta(data.interest);

  try {
    // Send HTML email to admin
    await transporter.sendMail({
      from: `"Hindustan Innovations" <${emailSender}>`,
      replyTo: data.email,
      to: emailReceiver,
      subject: `${meta.subjectAdmin} from ${data.name}`,
      html: adminEmailHtml(data),
    });

    // Send HTML auto-reply to user
    await transporter.sendMail({
      from: `"Hindustan Innovations" <${emailSender}>`,
      to: data.email,
      subject: meta.subjectUser,
      html: userEmailHtml({ name: data.name, interest: data.interest }),
    });

    return NextResponse.json(
      { message: "Message received successfully! We will get in touch with you soon." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email: ", error);
    return NextResponse.json(
      { error: "Failed to process your message. Please try again later." },
      { status: 500 }
    );
  }
}