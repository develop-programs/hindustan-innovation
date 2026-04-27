"use client";
import { Briefcase, ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { BackgroundEffects } from "../landing/BackgroundEffects";
import { Navbar } from "../landing/Navbar";
import careersData from "@/careers.json";

export function CareerHero() {
  const { hero } = careersData;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="relative h-screen">
      <BackgroundEffects />
      <Navbar />
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute z-10 inset-0 h-full grid place-content-center  px-4 pt-24 pb-4 w-full"
      >
        <div className="flex flex-col justify-center items-center">
          {/* Pill */}
          <motion.div variants={itemVariants} className="max-w-44 flex items-center justify-center gap-2 mb-6 bg-zinc-100/40 dark:bg-zinc-900/40 backdrop-blur-md border border-black/10 dark:border-white/5 rounded-full px-4 py-1.5 shadow-lg">
            <Briefcase className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
            <span className="text-xs font-semibold tracking-wider text-zinc-600 dark:text-zinc-300 uppercase">
              {hero.pill}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4 text-center">
            {hero.heading}{" "}
            <span className="font-serif italic font-light text-zinc-700 dark:text-zinc-300">
              {hero.headingItalic}
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-zinc-600 dark:text-zinc-400 mb-10 text-lg text-center max-w-2xl">
            {hero.subheading}
          </motion.p>

          <motion.a
            variants={itemVariants}
            href={hero.ctaLink}
            className="inline-flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            {hero.ctaText} <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}
