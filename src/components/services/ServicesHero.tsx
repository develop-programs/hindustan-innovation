"use client";
import { Layers, ArrowUpRight } from "lucide-react";

export function ServicesHero() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center px-4 pt-24 pb-4 w-full max-w-6xl mx-auto text-center">
      {/* Pill — identical to home page section pills */}
      <div className="flex items-center gap-2 mb-6 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-full px-4 py-1.5 shadow-lg">
        <Layers className="w-4 h-4 text-zinc-300" />
        <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">
          All Services
        </span>
      </div>

      {/* Heading — same size & weight as home sections */}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-4 text-center">
        Everything You Need,{" "}
        <span className="font-serif italic font-light text-zinc-300">
          All in One Place
        </span>
      </h1>

      <p className="text-zinc-400 mb-10 text-lg text-center max-w-2xl">
        From Web &amp; App Development to AI, Cloud, and Digital Marketing —
        end-to-end solutions that power your business forward.
      </p>

      <a
        href="#categories"
        className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-900 hover:bg-white px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
      >
        Explore All Services <ArrowUpRight className="w-4 h-4" />
      </a>
    </section>
  );
}
