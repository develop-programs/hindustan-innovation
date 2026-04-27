"use client";

import { motion, type Variants } from "motion/react";
import data from "@/data.json";

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


export default function Testimonial() {
    const testimonials = data.testimonials;
    return (
        <section className="relative z-10 flex flex-col items-center justify-center px-4 py-20 w-full max-w-6xl
      bg-radial mx-auto mt-10 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-linear-to-r after:from-transparent dark:after:via-white/20 after:to-transparent overflow-hidden" id="reviews">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={itemVariants}
                className="flex flex-col items-center text-center w-full"
            >
                <div className="flex items-center gap-2 mb-6 bg-zinc-100/40 dark:bg-zinc-900/40 backdrop-blur-md border border-black/10 dark:border-white/5 rounded-full px-4 py-1.5 shadow-lg">
                    <span className="text-zinc-600 dark:text-zinc-300 text-xs">★</span>
                    <span className="text-xs font-semibold tracking-wider text-zinc-600 dark:text-zinc-300 uppercase">{testimonials.pill}</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4 text-center">
                    {testimonials.heading} <span className="font-serif italic font-light text-zinc-700 dark:text-zinc-300">{testimonials.headingItalic}</span>
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-14 text-base text-center max-w-xl">{testimonials.subheading}</p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-16"
            >
                {testimonials.reviews.map((t) => (
                    <motion.div variants={itemVariants} key={t.name} className="flex flex-col p-6 bg-white dark:bg-black rounded-2xl border-t-2 border-black/10 dark:border-white/25 outline outline-black/5 dark:outline-white/10 hover:border-black/20 dark:hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-full bg-zinc-300 dark:bg-zinc-700 border border-black/10 dark:border-white/10 overflow-hidden shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{t.name}</div>
                                <div className="text-[10px] text-zinc-600 dark:text-zinc-500">{t.role}</div>
                            </div>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={itemVariants}
                className="flex flex-wrap items-center justify-center gap-8 md:gap-12 w-full border-t border-black/10 dark:border-white/5 pt-10"
            >
                {testimonials.brands.map((brand, i) => (
                    <span key={brand} className={`text-zinc-600 dark:text-zinc-500 font-semibold tracking-wide text-base hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors cursor-pointer ${i % 2 !== 0 ? "underline underline-offset-4" : ""}`}>
                        {brand}
                    </span>
                ))}
            </motion.div>
            <div className="absolute mx-auto -bottom-150 size-200 rounded-full bg-slate-500/10 blur-3xl" />
        </section>
    )
}
