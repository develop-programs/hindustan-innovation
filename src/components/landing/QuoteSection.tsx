"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import data from "@/data.json";

/**
 * Renders the quote text, wrapping {italic} segments in serif italic spans.
 * Segments enclosed in {curly braces} are rendered in zinc-200 serif italic.
 */
function FormattedQuote({ text }: { text: string }) {
  const parts = text.split(/(\{[^}]+\})/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("{") && part.endsWith("}")) {
          return (
            <span key={i} className="font-serif italic text-zinc-700 dark:text-zinc-200">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function QuoteSection() {
  const { pill, text, authorRole, authorAvatar } = data.quote;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10 flex flex-col items-center gap-12 justify-center px-4 py-32 w-full max-w-4xl mx-auto text-center overflow-hidden after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-linear-to-r after:from-transparent after:via-black/20 dark:after:via-white/20 after:to-transparent"
    >
      {/* Pill */}
      <div className="flex items-center gap-2 bg-zinc-100/40 dark:bg-zinc-900/40 backdrop-blur-md border border-black/10 dark:border-white/5 rounded-full px-4 py-1.5 shadow-lg">
        <Star className="w-4 h-4 text-zinc-600 dark:text-zinc-200 fill-zinc-600 dark:fill-zinc-200" />
        <span className="text-xs font-semibold tracking-wider text-zinc-600 dark:text-zinc-300 uppercase">
          {pill}
        </span>
      </div>

      {/* Quote Text */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.6] tracking-tight text-zinc-700 dark:text-zinc-400  max-w-3xl">
        <FormattedQuote text={text} />&quot;
      </h2>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 border border-black/10 dark:border-white/10 shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={authorAvatar} alt={authorRole} className="w-full h-full object-cover invert dark:invert" />
        </div>
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">{authorRole}</span>
      </div>
      <div className="absolute mx-auto -bottom-150 size-200 rounded-full bg-slate-500/10 blur-3xl" />
    </motion.section>
  );
}
