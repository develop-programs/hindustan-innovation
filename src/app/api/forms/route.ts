import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    name: string;
    email: string;
    interest: string;
    message: string;
    phone?: string;
    experience?: string;
    portfolio?: string;
    jobId?: string;
    jobTitle?: string;
    jobDepartment?: string;
    jobUrl?: string;
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


export async function POST(req: NextRequest) {
    const data: Props = await req.json();

    if (!data.name || !data.email || !data.message) {
        return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const emailSender = process.env.EMAIL_USER;
    const emailReceiver = process.env.EMAIL_RECEIVER;

    if (!emailSender || !emailReceiver) {
        return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
    }

    const subjectPrefix = data.jobTitle ? `Career Application: ${data.jobTitle}` : `New Inquiry from ${data.name}`;
    const details = [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.phone ? `Phone: ${data.phone}` : null,
        data.experience ? `Experience: ${data.experience}` : null,
        data.portfolio ? `Portfolio: ${data.portfolio}` : null,
        data.interest ? `Interest: ${data.interest}` : null,
        data.jobId ? `Job ID: ${data.jobId}` : null,
        data.jobDepartment ? `Job Department: ${data.jobDepartment}` : null,
        data.jobUrl ? `Job URL: ${data.jobUrl}` : null,
        "",
        "Message:",
        data.message,
    ].filter(Boolean).join("\n");

    try {
        await transporter.sendMail({
            from: `"Hindustan Innovations Careers" <${emailSender}>`,
            replyTo: data.email,
            to: emailReceiver,
            subject: `${subjectPrefix} - ${data.name}`,
            text: details,
        });
        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

}