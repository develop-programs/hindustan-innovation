import type { Metadata } from "next";
import { FooterBar } from "@/components/landing/FooterBar";
import { ContactSection } from "@/components/contact/ContactSection";
import FaqSection from "@/components/landing/FaqSection";

export const metadata: Metadata = {
  title: "Contact | Hindustan Innovation",
  description: "Get in touch with us to discuss your automation and tech needs.",
  icons: {
    icon: "/logo.png",
  },
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen flex flex-col text-zinc-50 overflow-hidden">
      <ContactSection />
      <FaqSection />
      <FooterBar />
    </div>
  );
}
