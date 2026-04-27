"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { Clock, ArrowUpRight, Bot, Globe, Cloud, Zap, TrendingUp, Brain } from "lucide-react";
import Link from "next/link";
import blogData from "@/blog.json";

/* ── Icon map ── */
const IconMap: Record<string, React.FC<{ className?: string }>> = {
  Bot,
  Globe,
  Cloud,
  Zap,
  TrendingUp,
  Brain,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

type Post = (typeof blogData.posts)[number];

function BlogCard({ post }: { post: Post }) {
  const Icon = IconMap[post.icon] ?? Bot;

  return (
    <motion.article
      variants={cardVariants}
      layout
      className="group flex flex-col bg-zinc-950 rounded-3xl border-t-2 border-slate-300/40 outline outline-slate-800 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_60px_rgba(255,255,255,0.04)] transition-shadow duration-500 relative"
    >
      {/* Gradient banner */}
      <div className={`h-44 bg-gradient-to-br ${post.coverGradient} relative flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.05)_0%,transparent_60%)]" />
        <div className={`w-16 h-16 rounded-2xl ${post.accentBg} border backdrop-blur-sm flex items-center justify-center`}>
          <Icon className={`w-7 h-7 ${post.accentColor}`} />
        </div>
        {/* Category badge */}
        <span className={`absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full ${post.accentBg} border ${post.accentColor} backdrop-blur-sm`}>
          {post.categoryLabel}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-7 h-7 rounded-full ring-1 ring-white/10 object-cover"
          />
          <div>
            <p className="text-xs text-zinc-300 font-medium leading-none">{post.author.name}</p>
            <p className="text-[10px] text-zinc-600 leading-none mt-0.5">{post.date}</p>
          </div>
          <div className="ml-auto flex items-center gap-1 text-zinc-600">
            <Clock className="w-3 h-3" />
            <span className="text-[11px]">{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-zinc-100 mb-2 leading-snug group-hover:text-white transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-zinc-500 leading-relaxed mb-4 flex-1">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium text-zinc-500 bg-zinc-900 border border-white/5 rounded-full px-2.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={`/blog/${post.slug}`}
          className={`inline-flex items-center gap-1.5 text-sm font-semibold ${post.accentColor} hover:gap-3 transition-all duration-200`}
        >
          Read Article <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.article>
  );
}

export function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { categories, posts } = blogData;

  const filtered = activeCategory === "all"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <section className="relative z-10 w-full max-w-6xl mx-auto px-4 py-20">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-14">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeCategory === cat.id
                ? "bg-zinc-100 text-zinc-900 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                : "bg-zinc-900/60 border border-white/8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <motion.div
        key={activeCategory}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-24 text-zinc-600">
          <p className="text-lg">No posts in this category yet.</p>
        </div>
      )}
    </section>
  );
}
