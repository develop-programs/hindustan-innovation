"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

interface Job {
  id: string;
  title: string;
  description: string;
  accent: string;
  department: string;
  items?: string[];
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
}

export default function JobDetailsClient({ job }: { job: Job }) {
  return (
    <motion.main
      className="relative z-10 flex-1 flex flex-col items-center px-4 sm:px-6 pt-24 pb-16 w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href="/career"
        className="self-start inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Careers
      </Link>

      <div className="w-full">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold uppercase text-zinc-300">
            {job.department}
          </span>
          {job.items?.map((item) => (
            <span
              key={item}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold uppercase text-zinc-400"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Title & description */}
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">{job.title}</h1>
        <p className="text-lg text-zinc-400 mb-10">{job.description}</p>

        {/* Responsibilities */}
        {job.responsibilities && job.responsibilities.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">What You'll Do</h2>
            <ul className="space-y-2">
              {job.responsibilities.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-zinc-300">
                  <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${job.accent}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Requirements */}
        {job.requirements && job.requirements.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">Requirements</h2>
            <ul className="space-y-2">
              {job.requirements.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-zinc-300">
                  <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${job.accent}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Apply CTA */}
        <div className="mt-10 flex justify-center">
          <a href={`mailto:info@hindustaan.in?subject=Application for ${job.title}`}>
            <HoverBorderGradient
              containerClassName="rounded-xl"
              className="flex items-center gap-2 px-6 py-3 bg-white text-black"
            >
              <span>Apply for this role</span>
              <ArrowUpRight className="w-4 h-4" />
            </HoverBorderGradient>
          </a>
        </div>
      </div>
    </motion.main>
  );
}
