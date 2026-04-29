import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Number(process.env.EMAIL_PORT) === 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const emailSender = process.env.EMAIL_FROM;
const emailReceiver = process.env.EMAIL_TO;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { leads } = body;

        if (!leads || !Array.isArray(leads) || leads.length === 0) {
            return NextResponse.json({ error: "Leads array is required" }, { status: 400 });
        }

        const uniqueLeads = Array.from(new Set(leads));

        await transporter.sendMail({
            from: `"Hindustan Innovations" <${emailSender}>`,
            to: emailReceiver,
            subject: `Lead Mobile numbers from Popup (${uniqueLeads.length} leads)`,
            text: `Here are the collected lead mobile numbers:\n\n${uniqueLeads.join('\n')}`
        });

        return NextResponse.json({ success: true, message: "Emails sent successfully" }, { status: 200 });

    } catch (error) {
        console.error("Popup API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}