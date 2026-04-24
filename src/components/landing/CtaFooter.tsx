import { ArrowUpRight } from "lucide-react";
import data from "@/data.json";

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "twitter") return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
  if (icon === "instagram") return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
  if (icon === "facebook") return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return null;
}

export function CtaFooter() {
  const { dividerLabel, heading, headingLine2, headingItalic, subheading, ctaLabel, socials, email } = data.cta;

  return (
    <footer className="relative z-10 flex flex-col items-center justify-center px-4 py-28 w-full text-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-zinc-800/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex items-center gap-3 mb-8">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-zinc-700" />
        <span className="text-zinc-500 text-xs italic font-medium tracking-wide">{dividerLabel}</span>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-zinc-700" />
      </div>

      <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-100 mb-4 leading-tight">
        {heading}<br />
        {headingLine2} <span className="font-serif italic font-light text-zinc-300">{headingItalic}</span>
      </h2>

      <p className="text-zinc-400 text-base mb-10">{subheading}</p>

      <button className="group flex items-center gap-3 bg-zinc-100 text-black px-8 py-4 rounded-xl font-semibold text-base hover:bg-white transition-all shadow-[0_8px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_40px_rgba(255,255,255,0.2)] mb-12">
        {ctaLabel}
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>

      <div className="flex items-center gap-6 mb-8 text-zinc-500">
        {socials.map((s, i) => (
          <span key={s.label} className="flex items-center gap-6">
            <a href={s.href} aria-label={s.label} className="hover:text-zinc-200 transition-colors">
              <SocialIcon icon={s.icon} />
            </a>
            {i < socials.length - 1 && <div className="h-4 w-px bg-zinc-700" />}
          </span>
        ))}
      </div>

      <a href={`mailto:${email}`} className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">
        {email}
      </a>
    </footer>
  );
}
