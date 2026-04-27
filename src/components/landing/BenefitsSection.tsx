"use client";

import { motion, type Variants } from "motion/react";
import { Sparkles, Eclipse } from "lucide-react";
import data from "@/data.json";

function SpeedometerGraphic() {
  return (
    <div className="w-48 h-48 relative flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl" />
      <svg viewBox="0 0 100 50" className="absolute top-[20px] w-40 h-20 overflow-visible">
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-zinc-400 dark:text-zinc-700" />
      </svg>
      <div className="absolute top-[calc(50%+10px)] left-1/2 w-16 h-2.5 bg-zinc-300 dark:bg-zinc-800 rounded-full origin-left rotate-[15deg] flex items-center justify-end pr-0.5 shadow-lg border border-black/20 dark:border-white/5">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.8)] dark:shadow-[0_0_8px_rgba(147,197,253,0.8)]" />
      </div>
    </div>
  );
}

function BarChartGraphic() {
  return (
    <div className="flex items-end gap-3 h-24">
      <div className="w-7 h-10 bg-zinc-100 dark:bg-zinc-900 rounded-md border-t border-l border-black/10 dark:border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.02)]" />
      <div className="w-7 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-md border-t border-l border-black/10 dark:border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.02)]" />
      <div className="w-7 h-14 bg-zinc-100 dark:bg-zinc-900 rounded-md border-t border-l border-black/10 dark:border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.02)]" />
      <div className="w-7 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-md border-t border-l border-black/10 dark:border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.02)]" />
    </div>
  );
}

function NetworkGraphic() {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-zinc-300 dark:text-zinc-800 stroke-current z-0 overflow-visible">
        <line x1="50" y1="50" x2="20" y2="20" strokeWidth="2" />
        <line x1="50" y1="50" x2="80" y2="15" strokeWidth="2" />
        <line x1="50" y1="50" x2="90" y2="60" strokeWidth="2" />
        <line x1="50" y1="50" x2="70" y2="90" strokeWidth="2" />
        <line x1="50" y1="50" x2="15" y2="60" strokeWidth="2" />

        <g className="fill-blue-500 dark:fill-blue-300" stroke="none">
          <circle r="1.6" opacity="0.95">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M50 50 L20 20" />
          </circle>
          <circle r="1.6" opacity="0.9">
            <animateMotion dur="2.5s" begin="0.35s" repeatCount="indefinite" path="M50 50 L80 15" />
          </circle>
          <circle r="1.6" opacity="0.9">
            <animateMotion dur="2.1s" begin="0.7s" repeatCount="indefinite" path="M50 50 L90 60" />
          </circle>
          <circle r="1.6" opacity="0.95">
            <animateMotion dur="2.7s" begin="0.15s" repeatCount="indefinite" path="M50 50 L70 90" />
          </circle>
          <circle r="1.6" opacity="0.9">
            <animateMotion dur="2.4s" begin="0.5s" repeatCount="indefinite" path="M50 50 L15 60" />
          </circle>

          <circle r="1.3" opacity="0.75">
            <animateMotion dur="2.9s" begin="0.8s" repeatCount="indefinite" path="M20 20 L50 50" />
          </circle>
          <circle r="1.3" opacity="0.7">
            <animateMotion dur="3.1s" begin="0.4s" repeatCount="indefinite" path="M90 60 L50 50" />
          </circle>
        </g>
      </svg>
      <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-900 rounded-full border border-black/20 dark:border-white/10 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
        <Eclipse className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
      </div>
      <div className="absolute top-[18%] left-[18%] w-3.5 h-3.5 bg-zinc-300 dark:bg-zinc-800 rounded-full border border-black/20 dark:border-white/5 z-10" />
      <div className="absolute top-[13%] left-[78%] w-3.5 h-3.5 bg-zinc-300 dark:bg-zinc-800 rounded-full border border-black/20 dark:border-white/5 z-10" />
      <div className="absolute top-[58%] left-[88%] w-3.5 h-3.5 bg-zinc-300 dark:bg-zinc-800 rounded-full border border-black/20 dark:border-white/5 z-10" />
      <div className="absolute top-[88%] left-[68%] w-3.5 h-3.5 bg-zinc-300 dark:bg-zinc-800 rounded-full border border-black/20 dark:border-white/5 z-10" />
      <div className="absolute top-[58%] left-[13%] w-3.5 h-3.5 bg-zinc-300 dark:bg-zinc-800 rounded-full border border-black/20 dark:border-white/5 z-10" />
    </div>
  );
}

const GRAPHICS = [<SpeedometerGraphic key="speed" />, <BarChartGraphic key="bar" />, <NetworkGraphic key="net" />];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function BenefitsSection() {
  const { pill, heading, headingItalic, subheading, cards } = data.benefits;

  return (
    <section className="relative z-10 flex flex-col items-center justify-center px-4 py-20 w-full max-w-6xl mx-auto overflow-hidden after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-linear-to-r after:from-transparent dark:after:via-black/20 after:to-transparent">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={itemVariants}
        className="flex flex-col items-center text-center w-full"
      >
        <div className="flex items-center gap-2 mb-6 bg-zinc-100/40 dark:bg-zinc-900/40 backdrop-blur-md border border-black/10 dark:border-white/5 rounded-full px-4 py-1.5 shadow-lg">
          <Sparkles className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
          <span className="text-xs font-semibold tracking-wider text-zinc-600 dark:text-zinc-300 uppercase">{pill}</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
          {heading} <span className="font-serif italic font-light">{headingItalic}</span>
        </h2>

        <p className="text-zinc-600 dark:text-zinc-400 mb-16 text-lg">{subheading}</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
      >
        {cards.map((card, i) => (
          <motion.div
            variants={itemVariants}
            key={card.title}
            className="flex flex-col items-center p-8 bg-white dark:bg-black rounded-3xl border-t-2 border-black/15 dark:border-white/25 outline outline-black/10 dark:outline-white/10 overflow-hidden relative group"
          >
            <div className="w-full h-48 flex items-center justify-center mb-6 relative">
              {GRAPHICS[i]}
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 text-center">{card.title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-center text-sm leading-relaxed">{card.description}</p>
          </motion.div>
        ))}
      </motion.div>
      <div className="absolute mx-auto -bottom-150 size-200 rounded-full bg-slate-500/10 blur-3xl" />
    </section>
  );
}
