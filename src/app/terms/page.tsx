import { Navbar } from "@/components/landing/Navbar";
import { FooterBar } from "@/components/landing/FooterBar";
import { FileText } from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Hindustaan Innovations",
  description: "Read the terms and conditions for using Hindustaan Innovations services and website.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing our website (www.hindustaan.in) or engaging our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.

These terms apply to all visitors, clients, and users of our services. We reserve the right to update these terms at any time, and continued use of our services constitutes acceptance of the revised terms.`,
  },
  {
    title: "2. Services Provided",
    content: `Hindustaan Innovations provides digital services including but not limited to:

• Website and web application development
• Mobile application development
• AI automation and chatbot solutions
• Digital marketing (SEO, paid ads, social media)
• Cloud infrastructure and DevOps
• UI/UX design
• Custom software development
• E-commerce solutions

The specific scope of services for each client engagement is defined in a separate Statement of Work (SOW) or project agreement.`,
  },
  {
    title: "3. Client Responsibilities",
    content: `As a client, you agree to:

• Provide accurate and complete information required for project delivery
• Respond to communications and feedback requests in a timely manner
• Ensure you have the rights to all content, images, and materials you provide to us
• Comply with all applicable laws and regulations in your use of our deliverables
• Not use our services for any illegal, fraudulent, or harmful purpose
• Pay invoices by the due dates specified in your project agreement`,
  },
  {
    title: "4. Intellectual Property",
    content: `Upon receipt of full payment for a project:

• All custom-developed code, designs, and content created specifically for your project transfer to you
• We retain the right to display the project in our portfolio (unless you request otherwise in writing)
• Third-party tools, frameworks, and libraries used in your project remain subject to their respective licenses
• General methodologies, processes, and pre-existing code developed by us remain our property

We retain intellectual property rights to any work not fully paid for.`,
  },
  {
    title: "5. Payment Terms",
    content: `Payment terms are specified in individual project agreements. Generally:

• Projects require an upfront deposit (typically 30–50%) before work begins
• Remaining payments are milestone-based or monthly, as agreed
• Invoices are due within 7 days of issuance unless otherwise agreed
• Late payments may attract interest at 2% per month
• We reserve the right to pause or terminate work for significantly overdue payments

All prices are in Indian Rupees (INR) unless otherwise specified.`,
  },
  {
    title: "6. Confidentiality",
    content: `Both parties agree to keep confidential any proprietary information shared during the engagement. This includes business strategies, customer data, technical architecture, and pricing.

We will not disclose your confidential information to third parties without your consent, except as required by law or to trusted service providers involved in delivering your project.`,
  },
  {
    title: "7. Limitation of Liability",
    content: `To the maximum extent permitted by law, Hindustaan Innovations shall not be liable for:

• Indirect, incidental, or consequential damages
• Loss of revenue, profits, or business opportunities
• Data loss or corruption (clients are responsible for maintaining backups)
• Third-party service failures or outages

Our total liability for any claim arising from our services shall not exceed the total amount paid by you for the specific service giving rise to the claim.`,
  },
  {
    title: "8. Warranties & Disclaimer",
    content: `We warranty our deliverables to be free from defects for 30 days post-launch (for development projects). After this period, ongoing maintenance is available under a separate support agreement.

We do not guarantee specific business outcomes, search rankings, advertising performance, or revenue results from our marketing services — as these depend on numerous factors outside our control.`,
  },
  {
    title: "9. Termination",
    content: `Either party may terminate a project agreement with 14 days written notice. Upon termination:

• You will be invoiced for all work completed up to the termination date
• We will provide all completed deliverables and project assets
• Any outstanding payments must be settled within 7 days of termination
• Deposits are non-refundable once substantial work has commenced`,
  },
  {
    title: "10. Governing Law",
    content: `These Terms of Service are governed by the laws of India. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts in [City], India.

We encourage resolving disputes through good-faith negotiation first. If unresolved within 30 days, disputes may be referred to arbitration under the Arbitration and Conciliation Act, 1996.`,
  },
  {
    title: "11. Contact",
    content: `For any questions about these Terms of Service, please contact:

Hindustaan Innovations
Email: info@hindustaan.in
Website: www.hindustaan.in

Last updated: April 27, 2026`,
  },
];

export default function TermsPage() {
  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black z-0 pointer-events-none" />
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center px-4 pt-36 pb-12 max-w-3xl mx-auto text-center gap-5">
        <div className="flex items-center gap-2 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-full px-4 py-1.5">
          <FileText className="w-4 h-4 text-zinc-300" />
          <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">Terms of Service</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-100">
          Clear Terms,{" "}
          <span className="font-serif italic font-light text-zinc-300">No Surprises.</span>
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed">
          These terms govern your use of Hindustaan Innovations services. We've written them to be as clear and fair as possible.
        </p>
        <p className="text-xs text-zinc-600">Last updated: April 27, 2026</p>
      </section>

      {/* Terms content */}
      <section className="relative z-10 px-4 pb-24 w-full max-w-3xl mx-auto">
        <div className="bg-zinc-950 border border-white/8 rounded-3xl p-8 md:p-12 flex flex-col gap-10">
          {SECTIONS.map((sec) => (
            <div key={sec.title} className="flex flex-col gap-3 pb-10 border-b border-white/5 last:border-0 last:pb-0">
              <h2 className="text-lg font-bold text-zinc-100">{sec.title}</h2>
              <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">{sec.content}</p>
            </div>
          ))}
        </div>
      </section>

      <FooterBar />
    </div>
  );
}
