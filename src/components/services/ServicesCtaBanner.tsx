"use client";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion, type Variants } from "motion/react";
import servicesData from "@/services.json";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function ServicesCtaBanner() {
  const { ctaBanner } = servicesData;

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={itemVariants}
      className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 pb-24"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
        {/* Glow */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-10 md:p-14">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                {ctaBanner.pill}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 leading-tight mb-3">
              {ctaBanner.heading}{" "}
              <span className="font-serif italic font-light text-zinc-400">
                {ctaBanner.headingItalic}
              </span>
            </h2>
            <p className="text-zinc-400 max-w-lg">
              {ctaBanner.subheading}
            </p>
          </div>

          <a
            href={ctaBanner.ctaLink}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-zinc-900 hover:bg-zinc-100 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            {ctaBanner.ctaText} <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.section>
  );
}
