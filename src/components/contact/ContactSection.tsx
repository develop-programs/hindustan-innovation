"use client";

import { Mail, Headphones, Phone } from "lucide-react";
import { motion, type Variants } from "motion/react";
import data from "@/data.json";
import { BackgroundEffects } from "../landing/BackgroundEffects";
import { Navbar } from "../landing/Navbar";

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

export function ContactSection() {
    const { contactPage } = data;

    return (
        <div className="relative min-h-screen after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-linear-to-r after:from-transparent after:via-black/20 dark:after:via-white/20 after:to-transparent overflow-hidden">
            <Navbar />
            <motion.section
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 flex flex-col items-center justify-center px-4 pt-32 pb-20 w-full max-w-5xl mx-auto text-center"
            >
                {/* Pill */}
                <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6 bg-zinc-100/40 dark:bg-zinc-900/40 backdrop-blur-md border border-black/10 dark:border-white/5 rounded-full px-4 py-1.5 shadow-lg">
                    <Phone className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
                    <span className="text-xs font-semibold tracking-wider text-zinc-600 dark:text-zinc-300 uppercase">
                        {contactPage.pill}
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4 text-center">
                    {contactPage.heading}{" "}
                    <span className="font-serif italic font-light text-zinc-700 dark:text-zinc-300">
                        {contactPage.headingItalic}
                    </span>
                </motion.h1>
                <motion.p variants={itemVariants} className="text-zinc-600 dark:text-zinc-400 mb-14 text-sm md:text-base text-center max-w-xl">
                    {contactPage.subheading}
                </motion.p>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
                    {/* Left Column (Cards) */}
                    <div className="flex flex-col gap-6">
                        {/* Email Card */}
                        <motion.div variants={itemVariants} className="flex flex-col p-8 bg-zinc-100/40 dark:bg-zinc-950/40 backdrop-blur-sm rounded-2xl border-t-2 border-black/10 dark:border-white/25 outline outline-1 outline-black/5 dark:outline-white/5 hover:border-black/20 dark:hover:border-white/10 transition-colors shadow-2xl">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-200 dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-inner shrink-0">
                                    <Mail className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                                </div>
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{contactPage.emailUs.title}</h3>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 leading-relaxed">
                                {contactPage.emailUs.description}
                            </p>
                            <a href={`mailto:${contactPage.emailUs.email}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors underline underline-offset-4 decoration-black/20 dark:decoration-white/20 hover:decoration-black/50 dark:hover:decoration-white/50 w-fit">
                                {contactPage.emailUs.email}
                            </a>
                        </motion.div>

                        {/* Contact Sales Card */}
                        <motion.div variants={itemVariants} className="flex flex-col p-8 bg-zinc-100/40 dark:bg-zinc-950/40 backdrop-blur-sm rounded-2xl border-t-2 border-black/10 dark:border-white/25 outline outline-1 outline-black/5 dark:outline-white/5 hover:border-black/20 dark:hover:border-white/10 transition-colors shadow-2xl">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-200 dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-inner shrink-0">
                                    <Headphones className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                                </div>
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{contactPage.contactSales.title}</h3>
                            </div>
                            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                                {contactPage.contactSales.description}
                            </p>
                            <a href="tel:+917712994005" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/50 w-fit">
                                {contactPage.contactSales.linkText}
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Column (Form) */}
                    <motion.div variants={itemVariants} className="flex flex-col p-8 bg-zinc-950/40 backdrop-blur-sm rounded-2xl border-t-2 border-white/25 outline outline-1 outline-white/5 shadow-2xl">
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-900 border border-white/10 shadow-inner mb-4">
                                <Headphones className="w-5 h-5 text-zinc-300" />
                            </div>
                            <h3 className="text-lg font-semibold text-zinc-100">{contactPage.form.heading}</h3>
                        </div>

                        <form className="flex flex-col gap-5 w-full">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-medium text-zinc-300 ml-1">{contactPage.form.fields.name.label}</label>
                                <input
                                    type="text"
                                    placeholder={contactPage.form.fields.name.placeholder}
                                    className="w-full bg-zinc-900/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-medium text-zinc-300 ml-1">{contactPage.form.fields.email.label}</label>
                                <input
                                    type="email"
                                    placeholder={contactPage.form.fields.email.placeholder}
                                    className="w-full bg-zinc-900/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-medium text-zinc-300 ml-1">{contactPage.form.fields.subject.label}</label>
                                <input
                                    type="text"
                                    placeholder={contactPage.form.fields.subject.placeholder}
                                    className="w-full bg-zinc-900/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-medium text-zinc-300 ml-1">{contactPage.form.fields.message.label}</label>
                                <textarea
                                    placeholder={contactPage.form.fields.message.placeholder}
                                    rows={4}
                                    className="w-full bg-zinc-900/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all resize-none"
                                />
                            </div>

                            <button
                                type="button"
                                className="w-full mt-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm py-3.5 rounded-xl transition-all duration-200"
                            >
                                {contactPage.form.submitLabel}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </motion.section>
            <div className="absolute mx-auto w-full -bottom-150 size-200 rounded-full bg-slate-500/10 blur-3xl" />
        </div>
    );
}
