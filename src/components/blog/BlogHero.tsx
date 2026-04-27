"use client";

import { motion, type Variants } from "motion/react";
import { BookOpen } from "lucide-react";
import { BackgroundEffects } from "@/components/landing/BackgroundEffects";
import { Navbar } from "@/components/landing/Navbar";
import blogData from "@/blog.json";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function BlogHero() {
  const { hero } = blogData;

  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
      <BackgroundEffects />
      <Navbar />
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 pt-10 pb-16 w-full max-w-5xl mx-auto text-center"
      >
        {/* Pill */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 mb-6 bg-zinc-900/50 backdrop-blur-md border border-white/8 rounded-full px-4 py-1.5 shadow-lg"
        >
          <BookOpen className="w-4 h-4 text-zinc-300" />
          <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">
            {hero.pill}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-100 mb-5 text-center leading-[1.1]"
        >
          {hero.heading}{" "}
          <span className="font-serif italic font-light text-zinc-300">
            {hero.headingItalic}
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-zinc-400 text-lg md:text-xl text-center max-w-2xl leading-relaxed"
        >
          {hero.subheading}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-zinc-600 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-zinc-500 to-transparent"
          />
        </motion.div>
      </motion.section>
    </div>
  );
}
