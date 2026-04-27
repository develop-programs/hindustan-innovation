"use client";

import { motion, type Variants } from "motion/react";
import { Plug } from "lucide-react";
import data from "@/data.json";
import Image from "next/image";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const integrationIcons = [
  <svg key="1" viewBox="0 0 24 24" className="w-6 h-6 text-zinc-400" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" /></svg>,
  <svg key="2" viewBox="0 0 24 24" className="w-6 h-6 text-zinc-400" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.15 1.22-5.15s-.31-.62-.31-1.54c0-1.44.84-2.52 1.88-2.52.88 0 1.31.66 1.31 1.46 0 .89-.57 2.23-.86 3.47-.24 1.03.51 1.88 1.52 1.88 1.82 0 3.04-2.34 3.04-5.12 0-2.11-1.42-3.69-3.99-3.69-2.9 0-4.72 2.17-4.72 4.6 0 .84.24 1.42.62 1.88.18.21.2.3.14.54-.04.18-.15.61-.19.78-.06.25-.25.34-.46.25-1.29-.53-1.89-1.96-1.89-3.56 0-2.64 2.23-5.84 6.64-5.84 3.56 0 5.91 2.58 5.91 5.35 0 3.67-2.04 6.43-5.02 6.43-.95 0-1.85-.51-2.16-1.09l-.59 2.27c-.19.72-.57 1.44-.9 2.01A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" /></svg>,
  <svg key="3" viewBox="0 0 24 24" className="w-6 h-6 text-zinc-400" fill="currentColor"><path d="M4 0h16v8h-8L4 0zm0 8h8l8 8H4V8zm0 8h8v8L4 16z" /></svg>,
  <svg key="4" viewBox="0 0 24 24" className="w-6 h-6 text-zinc-400" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  <svg key="5" viewBox="0 0 24 24" className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="12" height="16" rx="2" /><path d="M8 6h5M8 10h5M8 14h3" /></svg>,
  <svg key="6" viewBox="0 0 24 24" className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" /></svg>,
  <svg key="7" viewBox="0 0 24 24" className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg>,
  <svg key="8" viewBox="0 0 24 24" className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
  <svg key="9" viewBox="0 0 24 24" className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" /><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" /><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" /><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" /><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" /></svg>,
  <svg key="10" viewBox="0 0 24 24" className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg>,
  <span key="11" className="text-zinc-400 font-bold font-serif text-xl">N</span>,
  <svg key="12" viewBox="0 0 24 24" className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="4" /><path d="M8 12h8M12 8v8" strokeLinecap="round" /></svg>,
];

import { Marquee } from "../ui/marquee";

export function IntegrationsSection() {
  const integrations = data.integrations;
  // Using fixed pseudo-random indices to avoid hydration mismatches
  const firstRow = [0, 4, 7, 1, 9, 11].map(i => integrationIcons[i]);
  const secondRow = [2, 5, 8, 3, 10, 6].map(i => integrationIcons[i]);
  const thirdRow = [11, 1, 6, 9, 4, 0].map(i => integrationIcons[i]);

  return (
    <>
      {/* ── Integrations ── */}
      <section
        className="relative z-10 flex flex-col items-center justify-center px-4 py-24 w-full max-w-7xl mx-auto mt-10 overflow-hidden after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-linear-to-r after:from-transparent after:via-white/20 after:to-transparent"
        id="integrations"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={itemVariants}
          className="flex flex-col items-center text-center w-full"
        >
          <div className="flex items-center gap-2 mb-6 bg-zinc-100/40 dark:bg-zinc-900/40 backdrop-blur-md border border-black/10 dark:border-white/5 rounded-full px-4 py-1.5 shadow-lg">
            <Plug className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
            <span className="text-xs font-semibold tracking-wider text-zinc-600 dark:text-zinc-300 uppercase">{integrations.pill}</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 mb-4 text-center">
            {integrations.heading} <span className="font-serif italic font-light text-zinc-300">{integrations.headingItalic}</span>
          </h2>
          <p className="text-zinc-400 mb-14 text-base md:text-lg text-center max-w-2xl">{integrations.subheading}</p>
        </motion.div>

        {/* Marquee scrolling icons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
          className="w-full max-w-5xl bg-radial-[at_20%_75%] from-black/50 via-black/10 to-white/10 border-t-2 border-white/25 rounded-3xl outline outline-white/10 py-10 overflow-hidden relative"
        >
          <div className="flex flex-col gap-6">
            <Marquee pauseOnHover className="[--duration:20s]">
              {firstRow.map((icon, i) => (
                <div key={i} className="flex items-center justify-center w-14 h-14 mx-3 bg-[#151515] border border-white/5 rounded-xl hover:border-white/20 hover:bg-zinc-800/50 transition-all duration-300 cursor-pointer shrink-0 shadow-lg">
                  {icon}
                </div>
              ))}
            </Marquee>
            <Marquee pauseOnHover reverse className="[--duration:20s]">
              {secondRow.map((icon, i) => (
                <div key={i} className="flex items-center justify-center w-14 h-14 mx-3 bg-[#151515] border border-white/5 rounded-xl hover:border-white/20 hover:bg-zinc-800/50 transition-all duration-300 cursor-pointer shrink-0 shadow-lg">
                  {icon}
                </div>
              ))}
            </Marquee>
            <Marquee pauseOnHover className="[--duration:20s]">
              {thirdRow.map((icon, i) => (
                <div key={i} className="flex items-center justify-center w-14 h-14 mx-3 bg-[#151515] border border-white/5 rounded-xl hover:border-white/20 hover:bg-zinc-800/50 transition-all duration-300 cursor-pointer shrink-0 shadow-lg">
                  {icon}
                </div>
              ))}
            </Marquee>
          </div>
        </motion.div>


        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={itemVariants}
          className="text-zinc-600 dark:text-zinc-500 text-sm italic mt-10 text-center max-w-md"
        >
          &ldquo;{integrations.quote}&rdquo;
        </motion.p>
        <div className="absolute mx-auto -bottom-150 size-200 rounded-full bg-slate-500/10 blur-3xl" />
      </section>
    </>
  );
}
