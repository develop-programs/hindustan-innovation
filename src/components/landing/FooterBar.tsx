"use client";

import Image from "next/image";
import Link from "next/link";
import data from "@/data.json";

/* ── Social Icons ── */
function SocialIcon({ icon }: { icon: string }) {
  if (icon === "twitter")
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  if (icon === "facebook")
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (icon === "instagram")
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    );
  if (icon === "linkedin")
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="9" width="4" height="12" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="4" cy="4" r="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  if (icon === "dribbble")
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
      </svg>
    );
  return null;
}

/* ── Static footer columns data ── */
const COLUMNS = [
  {
    heading: "Services",
    links: [
      { label: "Web Development", href: "/services" },
      { label: "AI Automation", href: "/services" },
      { label: "Cloud & DevOps", href: "/services" },
      { label: "UI/UX Design", href: "/services" },
      { label: "Digital Marketing", href: "/services" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/career" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Case Studies", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
];

const STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "3x", label: "Avg Productivity Boost" },
  { value: "24/7", label: "Support Available" },
];

/* ── Main Footer ── */
export function FooterBar() {
  const { socials, copyright, email } = data.footer;
  const { name, tagline } = data.brand;

  return (
    <footer className="relative z-10 w-full bg-[#050505] border-t border-white/5 overflow-hidden">

      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[1px] blur-sm bg-white/10" />

      {/* ── Stats bar ── */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/5">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center px-4">
              <span className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">{stat.value}</span>
              <span className="text-xs text-zinc-600 mt-1 tracking-wide">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-5 text-zinc-500">
          {socials.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label} className="hover:text-zinc-200 transition-colors">
              <FooterSocialIcon icon={s.icon} />
            </a>
          ))}
        </div>
      </div>

      {/* Nav links */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 max-w-7xl mx-auto mb-6">
        {navLinks.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">
            {link}
          </a>
        ))}
      </div>

      <div className="border-t border-white/5 max-w-7xl mx-auto mb-5" />

      {/* Bottom row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 max-w-7xl mx-auto">
        <span className="text-xs text-zinc-600">{copyright}</span>
        <div className="flex items-center gap-6">
          <span className="text-xs text-zinc-600">
            {madeByLabel}{" "}
            <a href="#" className="text-zinc-400 hover:text-zinc-200 transition-colors underline underline-offset-2">
              {madeByName}
            </a>
          </span>
          <a href={`mailto:${email}`} className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors">
            {email}
          </a>
        </div>
      </div>
    </footer>
  );
}
