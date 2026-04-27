"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowUpRight, MapPin, Briefcase, Clock, Users } from "lucide-react";
import { motion } from "motion/react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

type ApplicationForm = {
  name: string;
  email: string;
  phone: string;
  experience: string;
  portfolio: string;
  message: string;
};

export default function JobDetailsClient({ job }: { job: Job }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hindustaan.in";
  const jobUrl = `${siteUrl.replace(/\/$/, "")}/career/${job.id}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`;
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [applicationForm, setApplicationForm] = useState<ApplicationForm>({
    name: "",
    email: "",
    phone: "",
    experience: "",
    portfolio: "",
    message: "",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Parse job items for better display
  const jobDetails = {
    location: job.items?.find(item => ["Remote", "Hybrid", "On-site"].includes(item)) || "Not specified",
    type: job.items?.find(item => ["Full-time", "Part-time", "Contract"].includes(item)) || "Not specified",
    level: job.items?.find(item => ["Junior", "Mid", "Senior"].includes(item)) || "Not specified",
  };

  const resetForm = () => {
    setApplicationForm({
      name: "",
      email: "",
      phone: "",
      experience: "",
      portfolio: "",
      message: "",
    });
  };

  const handleApplicationSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: applicationForm.name,
          email: applicationForm.email,
          interest: `Career Application: ${job.title}`,
          message: applicationForm.message,
          phone: applicationForm.phone,
          experience: applicationForm.experience,
          portfolio: applicationForm.portfolio,
          jobId: job.id,
          jobTitle: job.title,
          jobDepartment: job.department,
          jobUrl,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      setSubmitStatus({ type: "success", message: "Application submitted successfully. We'll be in touch soon." });
      resetForm();
    } catch {
      setSubmitStatus({ type: "error", message: "Could not submit your application. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.main
      className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 pt-24 pb-16 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back Button */}
      <motion.div variants={itemVariants} className="max-w-5xl mx-auto w-full mb-8">
        <Link
          href="/career"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Careers
        </Link>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto w-full"
      >
        {/* Header Section with Gradient Background */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-950 border border-white/10 p-8 sm:p-12 mb-8 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 via-transparent to-transparent rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Department Tag */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 mb-4"
            >
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-300">{job.department}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl font-bold text-white mb-4 tracking-tight"
            >
              {job.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-xl text-zinc-300 mb-8 max-w-2xl leading-relaxed"
            >
              {job.description}
            </motion.p>

            {/* Job Details Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {/* Location */}
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                <MapPin className={`w-5 h-5 shrink-0 ${job.accent}`} />
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">Location</p>
                  <p className="text-sm font-semibold text-zinc-100">{jobDetails.location}</p>
                </div>
              </div>

              {/* Type */}
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                <Clock className={`w-5 h-5 shrink-0 ${job.accent}`} />
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">Type</p>
                  <p className="text-sm font-semibold text-zinc-100">{jobDetails.type}</p>
                </div>
              </div>

              {/* Level */}
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                <Users className={`w-5 h-5 shrink-0 ${job.accent}`} />
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">Level</p>
                  <p className="text-sm font-semibold text-zinc-100">{jobDetails.level}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <motion.section variants={itemVariants}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-1 h-8 rounded-full ${job.accent}`} />
                  <h2 className="text-2xl font-bold text-white">What You'll Do</h2>
                </div>
                <div className="space-y-3 pl-4">
                  {job.responsibilities.map((item, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="flex items-start gap-3 group"
                    >
                      <CheckCircle2 className={`w-5 h-5 mt-1 shrink-0 ${job.accent} group-hover:scale-110 transition-transform`} />
                      <span className="text-zinc-300 group-hover:text-zinc-100 transition-colors">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Divider */}
            <motion.div variants={itemVariants} className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <motion.section variants={itemVariants}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-1 h-8 rounded-full ${job.accent}`} />
                  <h2 className="text-2xl font-bold text-white">What We're Looking For</h2>
                </div>
                <div className="space-y-3 pl-4">
                  {job.requirements.map((item, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="flex items-start gap-3 group"
                    >
                      <CheckCircle2 className={`w-5 h-5 mt-1 shrink-0 ${job.accent} group-hover:scale-110 transition-transform`} />
                      <span className="text-zinc-300 group-hover:text-zinc-100 transition-colors">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Divider */}
            <motion.div variants={itemVariants} className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <motion.section variants={itemVariants}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-1 h-8 rounded-full ${job.accent}`} />
                  <h2 className="text-2xl font-bold text-white">What We Offer</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {job.benefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 transition-all group"
                    >
                      <CheckCircle2 className={`w-5 h-5 mt-1 shrink-0 ${job.accent} group-hover:scale-110 transition-transform`} />
                      <span className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <motion.aside
            variants={itemVariants}
            className="lg:col-span-1 h-fit space-y-6"
          >
            {/* Apply Card */}
            <motion.div
              variants={itemVariants}
              className="relative rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 overflow-hidden group sticky top-24"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />

              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-2">Ready to apply?</h3>
                <p className="text-sm text-blue-100 mb-6">Submit your application and let us know why you'd be perfect for this role.</p>

                <HoverBorderGradient
                  containerClassName="rounded-xl w-full"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center justify-center space-x-2 px-6 py-3 w-full"
                  onClick={() => {
                    setSubmitStatus(null);
                    setIsApplyDialogOpen(true);
                  }}
                >
                  <span
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span className="font-semibold">Apply Now</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </HoverBorderGradient>
              </div>
            </motion.div>

            {/* Job Summary Card */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 p-6"
            >
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Job Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">Department</p>
                  <p className="text-sm font-semibold text-zinc-100 mt-1">{job.department}</p>
                </div>
                <div className="h-px bg-white/5" />
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">Tags</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.items?.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded text-zinc-300 hover:bg-white/10 hover:text-zinc-100 transition-all"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Share Card */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 p-6"
            >
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Share this job</h3>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20${job.title}%20role%20at%20Hindustan%20Innovation`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-3 py-2 text-sm font-medium bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all text-zinc-300"
                >
                  Twitter
                </a>
                <a
                  href={linkedinShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-3 py-2 text-sm font-medium bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all text-zinc-300"
                >
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </motion.aside>
        </div>
      </motion.div>

      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent className="max-w-2xl border-white/10 bg-zinc-950 p-6 text-zinc-100 sm:p-8" showCloseButton>
          <DialogHeader className="mb-2">
            <p className="text-xs uppercase tracking-widest text-zinc-500">Application Form</p>
            <DialogTitle className="mt-1 text-2xl font-bold text-white">Apply for {job.title}</DialogTitle>
            <DialogDescription className="mt-2 text-sm text-zinc-400">
              Share your details and we will email the hiring team directly.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleApplicationSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="applicant-name" className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                  Full Name
                </label>
                <input
                  id="applicant-name"
                  type="text"
                  required
                  value={applicationForm.name}
                  onChange={(event) => setApplicationForm(prev => ({ ...prev, name: event.target.value }))}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-500 focus:border-white/30"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="applicant-email" className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                  Email
                </label>
                <input
                  id="applicant-email"
                  type="email"
                  required
                  value={applicationForm.email}
                  onChange={(event) => setApplicationForm(prev => ({ ...prev, email: event.target.value }))}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-500 focus:border-white/30"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="applicant-phone" className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                  Phone
                </label>
                <input
                  id="applicant-phone"
                  type="tel"
                  required
                  value={applicationForm.phone}
                  onChange={(event) => setApplicationForm(prev => ({ ...prev, phone: event.target.value }))}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-500 focus:border-white/30"
                  placeholder="+91 98XXXXXXXX"
                />
              </div>

              <div>
                <label htmlFor="applicant-experience" className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                  Experience
                </label>
                <input
                  id="applicant-experience"
                  type="text"
                  required
                  value={applicationForm.experience}
                  onChange={(event) => setApplicationForm(prev => ({ ...prev, experience: event.target.value }))}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-500 focus:border-white/30"
                  placeholder="e.g. 4 years"
                />
              </div>
            </div>

            <div>
              <label htmlFor="applicant-portfolio" className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                Portfolio / LinkedIn URL
              </label>
              <input
                id="applicant-portfolio"
                type="url"
                value={applicationForm.portfolio}
                onChange={(event) => setApplicationForm(prev => ({ ...prev, portfolio: event.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-500 focus:border-white/30"
                placeholder="https://"
              />
            </div>

            <div>
              <label htmlFor="applicant-message" className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                Why are you a great fit?
              </label>
              <textarea
                id="applicant-message"
                required
                rows={5}
                value={applicationForm.message}
                onChange={(event) => setApplicationForm(prev => ({ ...prev, message: event.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-500 focus:border-white/30"
                placeholder="Tell us about your background and why this role fits you"
              />
            </div>

            {submitStatus && (
              <p className={`rounded-lg border px-3 py-2 text-sm ${submitStatus.type === "success" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-red-500/30 bg-red-500/10 text-red-300"}`}>
                {submitStatus.message}
              </p>
            )}

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsApplyDialogOpen(false)}
                className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Submit Application"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </motion.main>
  );
}
