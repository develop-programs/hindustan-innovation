"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { MessageCircleQuestion, ArrowUpRight, ChevronDown, HelpCircle } from "lucide-react";
import data from "@/data.json";

export default function FaqSection() {
    const { faq } = data;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="relative z-10 flex flex-col items-center justify-center px-4 py-20 
        outline rounded-2xl  w-full max-w-6xl mx-auto overflow-hidden after:absolute after:top-0 after:left-0 after:w-full after:h-full dark:after:bg-linear-to-b after:from-transparent after:via-transparent after:to-black/20 dark:after:to-black/80 after:-z-10 after:pointer-events-none" id="faq">
            <div className="flex flex-col items-center text-center w-full mb-16">
                <div className="flex items-center gap-2 mb-6 bg-zinc-100/40 dark:bg-zinc-900/40 backdrop-blur-md border border-black/10 dark:border-white/5 rounded-full px-4 py-1.5 shadow-lg">
                    <MessageCircleQuestion className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
                    <span className="text-xs font-semibold tracking-wider text-zinc-600 dark:text-zinc-300 uppercase">{faq.pill}</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4 text-center">
                    {faq.heading} <span className="font-serif italic font-light text-zinc-700 dark:text-zinc-300">{faq.headingItalic}</span>
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-base text-center max-w-xl">{faq.subheading}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                {/* Left Column: Contact Box */}
                <div className="lg:col-span-1 h-fit">
                    <div className="flex flex-col items-center text-center p-8 bg-zinc-100/40 dark:bg-zinc-950/40 rounded-2xl border-t-2 border-black/10 dark:border-white/25 outline-1 outline-black/5 dark:outline-white/5 ">
                        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-200 dark:bg-zinc-900 border border-black/10 dark:border-white/10 mb-6 shadow-inner">
                            <HelpCircle className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{faq.contactBox.title}</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-8 leading-relaxed">
                            {faq.contactBox.text}
                        </p>
                        <Link href={"contact"}>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 rounded-lg text-sm font-medium text-zinc-900 dark:text-zinc-200 transition-all duration-200 group">
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            {faq.contactBox.buttonLabel}
                        </button>
                        </Link>
                    </div>
                </div>

                {/* Right Column: Accordion */}
                <div className="lg:col-span-2 flex flex-col gap-3">
                    {faq.questions.map((q, i) => (
                        <div
                            key={i}
                            className="flex flex-col bg-zinc-100/40 dark:bg-zinc-950/40 rounded-xl border-t-2 border-black/10 dark:border-white/25 outline-1 outline-black/5 dark:outline-white/5 overflow-hidden transition-colors hover:border-black/20 dark:hover:border-white/10"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="flex items-center justify-between w-full p-5 text-left"
                            >
                                <span className="text-[15px] font-medium text-zinc-900 dark:text-zinc-200">{q.question}</span>
                                <ChevronDown
                                    className={`w-4 h-4 text-zinc-500 dark:text-zinc-500 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-5 pb-5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                            {q.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute mx-auto -bottom-150 size-200 rounded-full bg-slate-500/10 blur-3xl" />

        </section>
    );
}
