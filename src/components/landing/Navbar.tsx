import { Eclipse, Sparkles } from "lucide-react";
import data from "@/data.json";
import Image from "next/image";

export function Navbar() {
  const { brand } = data;
  const { navLinks, ctaLabel } = data.navbar;

  return (
    <header className="relative z-20 flex bg-linear-to-b from-black/95 via-black-50 to-transparent items-center justify-between px-6 py-4 md:px-10 lg:px-12 w-full max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="Logo" width={100} height={100} decoding="async" loading="lazy" fetchPriority="high" className="size-24" />
        <span className="text-xl font-medium tracking-tight text-zinc-100">{brand.name}</span>
      </div>

      <nav className="hidden md:flex items-center space-x-1 bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-full px-1 py-1">
        {navLinks.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="px-5 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-white/5 rounded-full transition-all duration-300"
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="flex items-center">
        <button className="flex items-center gap-2 bg-zinc-900/50 backdrop-blur-md border border-white/10 hover:bg-zinc-800/80 text-zinc-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          {ctaLabel}
        </button>
      </div>
    </header>
  );
}
