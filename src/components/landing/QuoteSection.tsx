import { Star } from "lucide-react";

export function QuoteSection() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center px-4 py-24 w-full max-w-4xl mx-auto text-center mt-10">
      {/* Pill */}
      <div className="flex items-center gap-2 mb-10 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-full px-4 py-1.5 shadow-lg">
        <Star className="w-4 h-4 text-zinc-200 fill-zinc-200" />
        <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">
          We Analyze Your Data
        </span>
      </div>

      {/* Quote Text */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.6] tracking-tight text-zinc-400 mb-12 max-w-3xl">
        We find what to <span className="font-serif italic text-zinc-200">automate</span>, who your users are &amp; how AI can optimize your <span className="font-serif italic text-zinc-200">workflow</span>. Best part is we also build and launch <span className="font-serif italic text-zinc-200">real solutions.</span>&quot;
      </h2>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full overflow-hidden bg-zinc-800 border border-white/10 shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://i.pravatar.cc/150?img=11" alt="Co-founder avatar" className="w-full h-full object-cover" />
        </div>
        <span className="text-sm font-medium text-zinc-200">Co-founder &amp; AI Strategy Lead</span>
      </div>
    </section>
  );
}
