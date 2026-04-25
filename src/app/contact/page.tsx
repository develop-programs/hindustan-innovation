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
      <div className="mx-auto max-w-7xl text-center px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Our Location</h1>
        <div className="p-6 rounded-2xl border-t-2 border-zinc-700 outline outline-zinc-700/50">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7439.507900907457!2d81.66653746665727!3d21.201931149897856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1777108763120!5m2!1sen!2sin" loading="eager" className="w-full aspect-video rounded-xl shadow-xl" title="Hindustan Innovation Location Map" width={800} height={450}></iframe>
        </div>
      </div>
      <FooterBar />
    </div>
  );
}
