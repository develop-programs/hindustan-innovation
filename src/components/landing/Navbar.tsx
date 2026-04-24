import { Eclipse, Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-4 md:px-10 lg:px-12 w-full max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="bg-zinc-800/80 p-1.5 rounded-full ring-1 ring-white/10 backdrop-blur-md">
          <Eclipse className="w-5 h-5 text-zinc-300" />
        </div>
        <span className="text-xl font- font-medium tracking-tight text-zinc-100">Hindustan Innovation</span>
      </div>

      <nav className="hidden md:flex items-center space-x-1 bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-full px-1 py-1">
        {["Services", "Process", "Pricing", "Blog", "Contact"].map((item) => (
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
          Get Template
        </button>
      </div>
    </header>
  );
}
