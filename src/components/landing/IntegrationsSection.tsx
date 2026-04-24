import { Plug, ArrowUpRight, Blocks, Smartphone, Target } from "lucide-react";
import data from "@/data.json";

const integrationIcons = [
  <svg key="1" viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>,
  <svg key="2" viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.15 1.22-5.15s-.31-.62-.31-1.54c0-1.44.84-2.52 1.88-2.52.88 0 1.31.66 1.31 1.46 0 .89-.57 2.23-.86 3.47-.24 1.03.51 1.88 1.52 1.88 1.82 0 3.04-2.34 3.04-5.12 0-2.11-1.42-3.69-3.99-3.69-2.9 0-4.72 2.17-4.72 4.6 0 .84.24 1.42.62 1.88.18.21.2.3.14.54-.04.18-.15.61-.19.78-.06.25-.25.34-.46.25-1.29-.53-1.89-1.96-1.89-3.56 0-2.64 2.23-5.84 6.64-5.84 3.56 0 5.91 2.58 5.91 5.35 0 3.67-2.04 6.43-5.02 6.43-.95 0-1.85-.51-2.16-1.09l-.59 2.27c-.19.72-.57 1.44-.9 2.01A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg>,
  <svg key="3" viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400" fill="currentColor"><path d="M4 0h16v8h-8L4 0zm0 8h8l8 8H4V8zm0 8h8v8L4 16z"/></svg>,
  <svg key="4" viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  <svg key="5" viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="12" height="16" rx="2"/><path d="M8 6h5M8 10h5M8 14h3"/></svg>,
  <svg key="6" viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round"/></svg>,
  <svg key="7" viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>,
  <svg key="8" viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  <svg key="9" viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/></svg>,
  <svg key="10" viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  <span key="11" className="text-zinc-400 font-bold font-serif text-lg">N</span>,
  <svg key="12" viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="4"/><path d="M8 12h8M12 8v8" strokeLinecap="round"/></svg>,
];

export function IntegrationsSection() {
  const integrations = data.integrations;
  const testimonials = data.testimonials;

  return (
    <>
      {/* ── Integrations ── */}
      <section className="relative z-10 flex flex-col items-center justify-center px-4 py-20 w-full max-w-4xl mx-auto mt-10" id="integrations">
        <div className="flex items-center gap-2 mb-6 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-full px-4 py-1.5 shadow-lg">
          <Plug className="w-4 h-4 text-zinc-300" />
          <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">{integrations.pill}</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-4 text-center">
          {integrations.heading} <span className="font-serif italic font-light text-zinc-300">{integrations.headingItalic}</span>
        </h2>
        <p className="text-zinc-400 mb-12 text-base text-center max-w-xl">{integrations.subheading}</p>

        <div className="w-full max-w-xl bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-4 gap-y-6 gap-x-4">
            {integrationIcons.map((icon, i) => (
              <div key={i} className="flex items-center justify-center w-12 h-12 mx-auto bg-[#151515] border border-white/5 rounded-xl hover:border-white/10 hover:bg-zinc-800/40 transition-colors cursor-pointer">
                {icon}
              </div>
            ))}
          </div>
        </div>

        <p className="text-zinc-500 text-sm italic mt-10 text-center max-w-md">
          &ldquo;{integrations.quote}&rdquo;
        </p>
      </section>

      {/* ── Testimonials ── */}
      <section className="relative z-10 flex flex-col items-center justify-center px-4 py-20 w-full max-w-6xl mx-auto mt-10" id="reviews">
        <div className="flex items-center gap-2 mb-6 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-full px-4 py-1.5 shadow-lg">
          <span className="text-zinc-300 text-xs">★</span>
          <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">{testimonials.pill}</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-4 text-center">
          {testimonials.heading} <span className="font-serif italic font-light text-zinc-300">{testimonials.headingItalic}</span>
        </h2>
        <p className="text-zinc-400 mb-14 text-base text-center max-w-xl">{testimonials.subheading}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16">
          {testimonials.reviews.map((t) => (
            <div key={t.name} className="flex flex-col p-6 bg-[#0a0a0a] rounded-2xl border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.4)] hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-zinc-700 border border-white/10 overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-zinc-100">{t.name}</div>
                  <div className="text-[10px] text-zinc-500">{t.role}</div>
                </div>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 w-full border-t border-white/5 pt-10">
          {testimonials.brands.map((brand, i) => (
            <span key={brand} className={`text-zinc-500 font-semibold tracking-wide text-base hover:text-zinc-300 transition-colors cursor-pointer ${i % 2 !== 0 ? "underline underline-offset-4" : ""}`}>
              {brand}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
