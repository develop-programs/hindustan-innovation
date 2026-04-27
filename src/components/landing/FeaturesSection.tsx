"use client";

import { motion, type Variants } from "motion/react";
import {
  GitMerge, BrainCircuit, SlidersHorizontal, Settings,
  Bot, Sparkles, Maximize2, PieChart, TrendingUp,
  BarChart3, Plug, Database, Package, type LucideIcon,
} from "lucide-react";
import data from "@/data.json";

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

const ICON_MAP: Record<string, LucideIcon> = {
  GitMerge, BrainCircuit, SlidersHorizontal, Settings,
  Bot, Sparkles, Maximize2, PieChart, TrendingUp,
  BarChart3, Plug, Database,
};

export function FeaturesSection() {
  const { pill, heading, headingItalic, subheading, cards } = data.features;

  return (
    <section className="relative z-10 flex flex-col items-center justify-center px-4 py-20 w-full max-w-6xl mx-auto mt-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={itemVariants}
        className="flex flex-col items-center text-center w-full"
      >
        <div className="flex items-center gap-2 mb-6 bg-zinc-100/40 dark:bg-zinc-900/40 backdrop-blur-md border border-black/10 dark:border-white/5 rounded-full px-4 py-1.5 shadow-lg">
          <Package className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
          <span className="text-xs font-semibold tracking-wider text-zinc-600 dark:text-zinc-300 uppercase">{pill}</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4 text-center">
          {heading} <span className="font-serif italic font-light text-zinc-700 dark:text-zinc-300">{headingItalic}</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-16 text-lg text-center max-w-2xl">{subheading}</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
      >
        {cards.map((card) => {
          const [Icon1, Icon2] = card.icons.map((name) => ICON_MAP[name]);
          return (
            <motion.div
              variants={itemVariants}
              key={card.title}
              className="flex flex-col items-center px-6 py-12 bg-white dark:bg-black rounded-3xl border-t-2 border-black/10 dark:border-white/25 outline outline-black/5 dark:outline-white/10 shadow-[0_0_30px_rgba(0,0,0,0.05)] dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] group transition-colors space-y-12"
            >
              <div className="p-4 bg-zinc-100 dark:bg-[#151515] rounded-xl border border-black/10 dark:border-white/5 flex items-center justify-center shadow-inner relative group-hover:scale-110 transition-all duration-500 gap-6">
                <div className="flex items-center justify-center w-1/2 h-full">
                  {Icon1 && <Icon1 className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors" />}
                </div>
                <div className="w-[1px] h-6 bg-black/10 dark:bg-white/5" />
                <div className="flex items-center justify-center w-1/2 h-full">
                  {Icon2 && <Icon2 className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors" />}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 text-center">{card.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-center text-sm leading-relaxed">{card.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
