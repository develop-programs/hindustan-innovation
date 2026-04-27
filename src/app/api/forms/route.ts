import nodemailer from "nodemailer";
import { type NextRequest, NextResponse } from "next/server";

type Props = {
    name: string;
    email: string;
    interest: string;
    message: string;
}

export const runtime = "nodejs";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function GET() {
    return NextResponse.json({ message: "API is working" }, { status: 200 });
}


export async function POST(req: NextRequest) {
    const data: Props = await req.json();

    if (!data.name || !data.email || !data.message) {
        return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const emailSender = process.env.EMAIL_FROM;
    const emailReceiver = process.env.EMAIL_TO;

    if (!emailSender || !emailReceiver) {
        return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
    }

    try {
        if (!transporter) {
            return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
        }

        // Plain text email to admin
        const adminEmailText = `New Career Enquiry Received

Applicant Details:
Name: ${data.name}
Email: ${data.email}
Area of Interest: ${data.interest || 'Not specified'}

Message:
${data.message}

---
This is an automated notification from Hindustan Innovations Careers Portal
Sent on: ${new Date().toLocaleString()}`;

        // Plain text auto-reply to user
        const userEmailText = `Dear ${data.name},

Thank you for reaching out to Hindustan Innovations. We appreciate your interest and are excited to learn more about your career aspirations.

Your enquiry has been received and forwarded to our Human Resources team. We will carefully review your information and get in touch with you soon.

Expected Response Time:
Our team typically responds within 2-3 business days. If your inquiry is time-sensitive, please mention it in future communications.

What Happens Next?
Our HR team will review your application and contact you via email or phone to discuss potential opportunities that match your profile.

We're looking forward to connecting with you. If you have any additional questions in the meantime, feel free to reply to this email.

Best regards,
Hindustan Innovations Team
Building Tomorrow's Solutions Today

---
This is an automated confirmation email. Please do not reply to this message.`;

        // Send email to admin
        await transporter.sendMail({
            from: `"Hindustan Innovations Careers" <${emailSender}>`,
            replyTo: data.email,
            to: emailReceiver,
            subject: `New Career Enquiry from ${data.name}`,
            text: adminEmailText,
        });

        // Send auto-reply to user
        await transporter.sendMail({
            from: `"Hindustan Innovations Careers" <${emailSender}>`,
            to: data.email,
            subject: "Thank You for Your Enquiry - Hindustan Innovations",
            text: userEmailText,
        });

        return NextResponse.json({
            message: "Enquiry received successfully! We will get in touch with you soon."
        }, { status: 200 });
    }
    catch (error) {
        console.error("Error sending email: ", error);
        return NextResponse.json({ error: "Failed to process your enquiry. Please try again later." }, { status: 500 });
    }

}