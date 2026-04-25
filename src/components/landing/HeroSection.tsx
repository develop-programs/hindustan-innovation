"use client";

import { motion, type Variants } from "motion/react";
import { ArrowUpRight, Eclipse } from "lucide-react";
import data from "@/data.json";
import Image from "next/image";
import { SparklesCore } from "../ui/sparkles";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { BackgroundEffects } from "./BackgroundEffects";
import { Navbar } from "./Navbar";

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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function HeroSection() {
  const { pill, headingLine1, headingLine2, headingItalic, subheading, ctaLabel } = data.hero;

  return (
    <div className="relative h-screen">
      <Navbar />
      <BackgroundEffects />
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-20 w-full max-w-5xl mx-auto mb-32 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-linear-to-r after:from-transparent after:via-white/20 after:to-transparent"
      >
        <div className="grid gap-8 justify-items-center">
          {/* Central Icon */}
          <motion.div variants={itemVariants} className="relative flex items-end ">
            <div className="absolute inset-0 rounded-full" />
            <Image src="/logo.png" alt="Logo" width={100} height={100} decoding="async" loading="eager" fetchPriority="high" className="size-20" />
            <div className="text-4xl w-50 font-medium tracking-tight leading-8 text-zinc-100 uppercase">{data.brand.name}</div>
          </motion.div>

          {/* Pill */}
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            <span className="text-xs font-bold tracking-wider text-zinc-300 uppercase">
              {pill}
            </span>
          </motion.div>

          {/* Hero Heading */}
          <motion.h1 variants={itemVariants} className="text-center text-5xl md:text-7xl lg:text-[4.5rem] font-bold leading-[1.1] tracking-tight mb-6 bg-radial from-white/50 to-black/60 text-transparent bg-clip-text">
            <span className="text-zinc-200">{headingLine1} </span>
            <span className="text-zinc-400">{headingLine2.split(" ")[0]}</span>
            <br />
            <span className="text-zinc-400">{headingLine2.split(" ").slice(1).join(" ")} </span>
            <span className="font-serif italic text-zinc-300 font-light pr-2">{headingItalic}</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-zinc-400 max-w-2xl text-center">
            {subheading}
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <HoverBorderGradient
              containerClassName="rounded-2xl"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-10 py-2"
            >
              <span>Book A Call</span>
            </HoverBorderGradient>
          </motion.div>

        </div>
        <motion.div variants={itemVariants} className="w-80 h-40 relative rounded-t-full mt-10">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={200}
            className="w-full h-full"
            particleColor="#F9F9F9"
          />
        </motion.div>
      </motion.main>
    </div>
  );
}
