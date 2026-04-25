"use client";
import { motion, type Variants } from "motion/react";
import { ArrowUpRight, Send } from "lucide-react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import careersData from "@/careers.json";
import Link from "next/link";

export function CareerCtaBanner() {
  const { ctaBanner } = careersData;

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative z-10 flex flex-col items-center justify-center px-4 py-24 w-full max-w-4xl mx-auto text-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={itemVariants}
        className="relative w-full rounded-3xl p-10 md:p-16 overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl"
      >
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />

        <div className="flex flex-col items-center relative z-10">
          <div className="flex items-center gap-2 mb-6 bg-zinc-900/60 backdrop-blur-md border border-white/5 rounded-full px-4 py-1.5">
            <Send className="w-4 h-4 text-zinc-400" />
            <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">
              {ctaBanner.pill}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-4">
            {ctaBanner.heading}{" "}
            <span className="font-serif italic font-light text-zinc-300">
              {ctaBanner.headingItalic}
            </span>
          </h2>

          <p className="text-zinc-400 mb-10 text-lg max-w-xl">
            {ctaBanner.subheading}
          </p>

          <HoverBorderGradient
            containerClassName="rounded-xl"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-8 py-3"
          >
            <Link href={ctaBanner.ctaLink} >
              <span>{ctaBanner.ctaText}</span>
            </Link>
            <ArrowUpRight className="w-4 h-4" />
          </HoverBorderGradient>
        </div>
      </motion.div>
    </section>
  );
}
