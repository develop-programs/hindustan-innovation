import { Navbar } from "@/components/landing/Navbar";
import { FooterBar } from "@/components/landing/FooterBar";
import { Map } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sitemap | Hindustaan Innovations",
  description: "Navigate through Hindustaan Innovations' website efficiently.",
};

const SITEMAP_LINKS = [
  {
    category: "Main Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Services Overview", href: "/services" },
      { label: "Careers", href: "/career" },
      { label: "FAQs", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    category: "Our Services",
    links: [
      { label: "Web Development", href: "/services/web-dev" },
      { label: "AI Automation", href: "/services/custom-ai" },
      { label: "Cloud & DevOps", href: "/services/devops" },
      { label: "UI/UX Design", href: "/services/ui-ux" },
      { label: "Digital Marketing", href: "/services/marketing" },
    ],
  },
  {
    category: "Legal & Support",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Support & Resources", href: "/support" },
      { label: "Contact Form", href: "/contact" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black z-0 pointer-events-none" />
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center px-4 pt-36 pb-12 max-w-3xl mx-auto text-center gap-5">
        <div className="flex items-center gap-2 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-full px-4 py-1.5">
          <Map className="w-4 h-4 text-zinc-300" />
          <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">Sitemap</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-100">
          Navigate Our <span className="font-serif italic font-light text-zinc-300">Website.</span>
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed">
          Find exactly what you're looking for with our comprehensive directory of pages.
        </p>
      </section>

      {/* Sitemap Links */}
      <section className="relative z-10 px-4 pb-24 w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SITEMAP_LINKS.map((section) => (
            <div key={section.category} className="bg-zinc-950 border border-white/8 rounded-3xl p-8 flex flex-col gap-6">
              <h2 className="text-xl font-bold text-zinc-100 border-b border-white/5 pb-4">{section.category}</h2>
              <ul className="flex flex-col gap-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-zinc-400 hover:text-zinc-100 transition-colors duration-200 flex items-center gap-2 group w-fit"
                    >
                      <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-200 text-zinc-600">›</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <FooterBar />
    </div>
  );
}
