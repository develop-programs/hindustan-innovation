import { Eclipse } from "lucide-react";
import data from "@/data.json";
import Image from "next/image";

function FooterSocialIcon({ icon }: { icon: string }) {
  if (icon === "twitter") return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
  if (icon === "facebook") return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (icon === "instagram") return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
  if (icon === "dribbble") return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
    </svg>
  );
  return null;
}

export function FooterBar() {
  const { navLinks, socials, copyright, madeByLabel, madeByName, email } = data.footer;
  const { name } = data.brand;

  return (
    <footer className="relative z-10 w-full border-t border-black/10 dark:border-white/5 bg-white dark:bg-[#050505] px-6 md:px-10 lg:px-16 pt-6 pb-8">
      {/* Top row */}
      <div className="flex items-center justify-between max-w-7xl mx-auto mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-zinc-200 dark:bg-zinc-800/80 p-1.5 rounded-full ring-1 ring-black/10 dark:ring-white/10">
            <Image src="/logo.png" alt="logo" width={20} height={20} />
          </div>
          <span className="text-base font-medium tracking-tight text-zinc-900 dark:text-zinc-100">{name}</span>
        </div>

        <div className="flex items-center gap-5 text-zinc-600 dark:text-zinc-500">
          {socials.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label} className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
              <FooterSocialIcon icon={s.icon} />
            </a>
          ))}
        </div>
      </div>

      {/* Nav links */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 max-w-7xl mx-auto mb-6">
        {navLinks.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
            {link}
          </a>
        ))}
      </div>

      <div className="border-t border-black/10 dark:border-white/5 max-w-7xl mx-auto mb-5" />

      {/* Bottom row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 max-w-7xl mx-auto">
        <span className="text-xs text-zinc-600 dark:text-zinc-600">{copyright}</span>
        <div className="flex items-center gap-6">
          <span className="text-xs text-zinc-600 dark:text-zinc-600">
            {madeByLabel}{" "}
            <a href="#" className="text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors underline underline-offset-2">
              {madeByName}
            </a>
          </span>
          <a href={`mailto:${email}`} className="text-xs text-zinc-600 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">
            {email}
          </a>
        </div>
      </div>
    </footer>
  );
}
