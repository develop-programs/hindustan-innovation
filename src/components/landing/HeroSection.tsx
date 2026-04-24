import { ArrowUpRight, Eclipse } from "lucide-react";

export function HeroSection() {
  return (
    <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 w-full max-w-5xl mx-auto mt-20 mb-32">
      {/* Central Icon */}
      <div className="relative mb-12 animate-fade-in-up">
        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
        <div className="relative bg-gradient-to-b from-zinc-800 to-zinc-950 p-6 rounded-[2rem] border border-white/10 shadow-2xl">
          <div className="bg-white rounded-full p-2">
            <Eclipse className="w-10 h-10 text-black" strokeWidth={2.5} />
          </div>
          <div className="absolute -bottom-2 -right-2 w-full h-full bg-blue-500/10 blur-2xl rounded-full -z-10" />
        </div>
      </div>

      {/* Pill */}
      <div className="flex items-center gap-2 mb-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
        <span className="text-xs font-bold tracking-wider text-zinc-300 uppercase">
          New Gen AI Automation Partner
        </span>
      </div>

      {/* Hero Heading */}
      <h1 className="text-center text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.1] tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <span className="text-zinc-200">Automate Smarter. </span>
        <span className="text-zinc-400">Grow</span>
        <br />
        <span className="text-zinc-400">Faster. </span>
        <span className="font-serif italic text-zinc-300 font-light pr-2">With AI.</span>
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-zinc-400 max-w-2xl text-center mb-10 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
        AI Automation for Modern Businesses Made Simple
      </p>

      {/* CTA Button */}
      <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
        <button className="group relative flex items-center gap-3 bg-zinc-950 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-zinc-900 transition-all shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_10px_25px_rgba(0,0,0,0.6)]">
          <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity pointer-events-none" />
          Book A Free Call
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </main>
  );
}
