import { Eclipse } from "lucide-react";

const navLinks = ["Services", "Pricing", "Contact", "Blog", "Privacy", "Terms"];

export function FooterBar() {
  return (
    <footer className="relative z-10 w-full border-t border-white/5 bg-[#050505] px-6 md:px-10 lg:px-16 pt-6 pb-8">
      {/* Top row: Logo + Social Icons */}
      <div className="flex items-center justify-between max-w-7xl mx-auto mb-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-zinc-800/80 p-1.5 rounded-full ring-1 ring-white/10">
            <Eclipse className="w-4 h-4 text-zinc-300" />
          </div>
          <span className="text-base font-serif italic font-medium tracking-tight text-zinc-100">Landio</span>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5 text-zinc-500">
          {/* X */}
          <a href="#" aria-label="X / Twitter" className="hover:text-zinc-200 transition-colors">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Facebook */}
          <a href="#" aria-label="Facebook" className="hover:text-zinc-200 transition-colors">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Instagram */}
          <a href="#" aria-label="Instagram" className="hover:text-zinc-200 transition-colors">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
          </a>

          {/* Dribbble */}
          <a href="#" aria-label="Dribbble" className="hover:text-zinc-200 transition-colors">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
            </svg>
          </a>
        </div>
      </div>

      {/* Nav Links row */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 max-w-7xl mx-auto mb-6">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-white/5 max-w-7xl mx-auto mb-5" />

      {/* Bottom row: Copyright + Credits + Email */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 max-w-7xl mx-auto">
        <span className="text-xs text-zinc-600">© 2025 Landio Template</span>

        <div className="flex items-center gap-6">
          <span className="text-xs text-zinc-600">
            Made by{" "}
            <a href="#" className="text-zinc-400 hover:text-zinc-200 transition-colors underline underline-offset-2">
              Framebase
            </a>
          </span>
          <a
            href="mailto:landio@support.com"
            className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors"
          >
            landio@support.com
          </a>
        </div>
      </div>
    </footer>
  );
}
