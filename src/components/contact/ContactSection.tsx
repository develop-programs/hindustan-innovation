"use client";

import { Mail, Headphones, Phone } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useState } from "react";
import data from "@/data.json";
import { BackgroundEffects } from "../landing/BackgroundEffects";
import { Navbar } from "../landing/Navbar";
import Link from "next/link";

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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          interest: "",
          message: "",
        });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        setError(result.error || "Failed to submit form. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Form submission error:", err);
    } finally {
      setLoading(false);
    }
  };

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
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 mb-6 bg-zinc-100/40 dark:bg-zinc-900/40 backdrop-blur-md border border-black/10 dark:border-white/5 rounded-full px-4 py-1.5 shadow-lg"
        >
          <Phone className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
          <span className="text-xs font-semibold tracking-wider text-zinc-600 dark:text-zinc-300 uppercase">
            {contactPage.pill}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4 text-center"
        >
          {contactPage.heading}{" "}
          <span className="font-serif italic font-light text-zinc-700 dark:text-zinc-300">
            {contactPage.headingItalic}
          </span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-zinc-600 dark:text-zinc-400 mb-14 text-sm md:text-base text-center max-w-xl"
        >
          {contactPage.subheading}
        </motion.p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
          {/* Left Column (Cards) */}
          <div className="flex flex-col gap-6">
            {/* Email Card */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col p-8 bg-zinc-100/40 dark:bg-zinc-950/40 backdrop-blur-sm rounded-2xl border-t-2 border-black/10 dark:border-white/25 outline outline-1 outline-black/5 dark:outline-white/5 hover:border-black/20 dark:hover:border-white/10 transition-colors shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-200 dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-inner shrink-0">
                  <Mail className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {contactPage.emailUs.title}
                </h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 leading-relaxed">
                {contactPage.emailUs.description}
              </p>
              <a
                href={`mailto:${contactPage.emailUs.email}`}
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors underline underline-offset-4 decoration-black/20 dark:decoration-white/20 hover:decoration-black/50 dark:hover:decoration-white/50 w-fit"
              >
                {contactPage.emailUs.email}
              </a>
            </motion.div>

            {/* Contact Sales Card */}
            <motion.a
              href="tel:+917712994005"
              variants={itemVariants}
              className="flex flex-col p-8 bg-zinc-100/40 dark:bg-zinc-950/40 backdrop-blur-sm rounded-2xl border-t-2 border-black/10 dark:border-white/25 outline outline-1 outline-black/5 dark:outline-white/5 hover:border-black/20 dark:hover:border-white/10 transition-colors shadow-2xl cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-200 dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-inner shrink-0">
                  <Headphones className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {contactPage.contactSales.title}
                </h3>
              </div>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                {contactPage.contactSales.description}
              </p>
              <span className="text-sm font-medium text-zinc-300 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/50 w-fit">
                {contactPage.contactSales.linkText}
              </span>
            </motion.a>
          </div>

          {/* Right Column (Form) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col p-8 bg-zinc-950/40 backdrop-blur-sm rounded-2xl border-t-2 border-white/25 outline outline-1 outline-white/5 shadow-2xl"
          >
            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-900 border border-white/10 shadow-inner mb-4">
                <Headphones className="w-5 h-5 text-zinc-300" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-100">
                {contactPage.form.heading}
              </h3>
            </div>

            {submitted && (
              <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <p className="text-sm text-green-400">
                  ✓ Thank you! Your message has been sent successfully. We'll
                  get in touch with you soon.
                </p>
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <form
              className="flex flex-col gap-5 w-full"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-xs font-medium text-zinc-300 ml-1"
                >
                  {contactPage.form.fields.name.label}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder={contactPage.form.fields.name.placeholder}
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full bg-zinc-900/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-zinc-300 ml-1"
                >
                  {contactPage.form.fields.email.label}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder={contactPage.form.fields.email.placeholder}
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full bg-zinc-900/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="interest"
                  className="text-xs font-medium text-zinc-300 ml-1"
                >
                  {contactPage.form.fields.subject.label}
                </label>
                <input
                  id="interest"
                  type="text"
                  placeholder={contactPage.form.fields.subject.placeholder}
                  value={formData.interest}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full bg-zinc-900/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-xs font-medium text-zinc-300 ml-1"
                >
                  {contactPage.form.fields.message.label}
                </label>
                <textarea
                  id="message"
                  placeholder={contactPage.form.fields.message.placeholder}
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full bg-zinc-900/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm py-3.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : contactPage.form.submitLabel}
              </button>
            </form>
          </motion.div>
        </div>
      </motion.section>
      <div className="absolute mx-auto w-full -bottom-150 size-200 rounded-full bg-slate-500/10 blur-3xl" />
    </div>
  );
}
