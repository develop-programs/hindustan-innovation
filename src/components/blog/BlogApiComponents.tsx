/**
 * Blog API Integration Examples - Real-time UI Components
 * 
 * This file contains ready-to-use React components that integrate with the Blog API
 */

"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Loader2, Search, Filter, X } from "lucide-react";
import Link from "next/link";

// Type definitions
interface BlogPost {
  id: string;
  slug: string;
  category: string;
  categoryLabel: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: { name: string; role: string; avatar: string };
  accentColor: string;
  icon: string;
}

interface Category {
  id: string;
  label: string;
  count?: number;
}

// ============================================
// COMPONENT 1: Blog Search with Real-time Results
// ============================================

export function BlogSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const searchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/blogs/search?q=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        if (data.success) {
          setResults(data.results || []);
          setShowResults(true);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchBlogs, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="flex items-center gap-2 bg-zinc-900/60 border border-white/8 rounded-xl px-4 py-2.5">
        <Search className="w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search blogs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-zinc-500 hover:text-zinc-300"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-white/8 rounded-xl overflow-hidden shadow-lg z-50"
        >
          {loading ? (
            <div className="p-4 flex items-center justify-center gap-2 text-zinc-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Searching...</span>
            </div>
          ) : results.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={`/blog/${result.slug}`}
                  className="block px-4 py-3 hover:bg-zinc-800 transition-colors border-b border-white/5 last:border-b-0"
                  onClick={() => setQuery("")}
                >
                  <p className="text-sm font-medium text-zinc-200">
                    {result.title}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">{result.excerpt}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-zinc-500">
              No results found
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// ============================================
// COMPONENT 2: Blog Filter with Category Selection
// ============================================

interface BlogFilterProps {
  onCategoryChange: (category: string) => void;
  activeCategory?: string;
}

export function BlogFilter({ onCategoryChange, activeCategory = "all" }: BlogFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/blogs/categories");
        const data = await response.json();
        if (data.success) {
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-10 w-24 bg-zinc-900 rounded-full animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === cat.id
              ? "bg-zinc-100 text-zinc-900"
              : "bg-zinc-900/60 border border-white/8 text-zinc-400 hover:text-zinc-200"
          }`}
        >
          {cat.label}
          {cat.count !== undefined && (
            <span className="ml-2 text-xs opacity-70">({cat.count})</span>
          )}
        </button>
      ))}
    </div>
  );
}

// ============================================
// COMPONENT 3: Blog List with Real-time Loading
// ============================================

interface BlogListProps {
  category?: string;
  limit?: number;
}

export function BlogList({ category = "all", limit = 10 }: BlogListProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (category !== "all") {
          params.append("category", category);
        }
        params.append("limit", limit.toString());

        const response = await fetch(`/api/blogs?${params}`);
        const data = await response.json();

        if (data.success) {
          setBlogs(data.data || []);
        } else {
          setError(data.error || "Failed to load blogs");
        }
      } catch (error) {
        setError("Failed to load blogs");
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [category, limit]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 bg-zinc-900/60 border border-white/8 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-zinc-500">No blogs found in this category</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <Link
          key={blog.id}
          href={`/blog/${blog.slug}`}
          className="block p-4 bg-zinc-900/60 border border-white/8 rounded-xl hover:bg-zinc-900 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-zinc-100 hover:text-white">
                {blog.title}
              </h3>
              <p className="text-sm text-zinc-500 mt-1">{blog.excerpt}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-zinc-600">
                <span>{blog.author.name}</span>
                <span>{blog.date}</span>
                <span>{blog.readTime}</span>
              </div>
            </div>
            <span className="ml-4 px-3 py-1 bg-zinc-800 rounded-full text-xs font-medium text-zinc-400">
              {blog.categoryLabel}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

// ============================================
// COMPONENT 4: Featured Blog Carousel
// ============================================

export function FeaturedBlogCarousel() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs?limit=5&sortBy=latest");
        const data = await response.json();
        if (data.success) {
          setBlogs(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching featured blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="h-64 bg-zinc-900/60 rounded-xl animate-pulse" />;
  }

  if (blogs.length === 0) {
    return null;
  }

  const currentBlog = blogs[currentIndex];

  return (
    <div className="relative bg-zinc-900/60 border border-white/8 rounded-xl overflow-hidden">
      {/* Featured Image Area */}
      <div className="h-64 bg-gradient-to-r from-violet-900/20 to-purple-900/20 flex items-center justify-center">
        <span className="text-zinc-600">Featured Blog Post</span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
            {currentBlog.categoryLabel}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">
          {currentBlog.title}
        </h2>
        <p className="text-zinc-500 text-sm mb-4">{currentBlog.excerpt}</p>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href={`/blog/${currentBlog.slug}`}
            className="text-violet-400 font-semibold hover:text-violet-300 transition-colors"
          >
            Read Article →
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() =>
                setCurrentIndex((i) => (i - 1 + blogs.length) % blogs.length)
              }
              className="px-3 py-1 bg-zinc-800 rounded text-sm hover:bg-zinc-700"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentIndex((i) => (i + 1) % blogs.length)}
              className="px-3 py-1 bg-zinc-800 rounded text-sm hover:bg-zinc-700"
            >
              →
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex gap-2 mt-4">
          {blogs.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1 transition-all ${
                i === currentIndex ? "w-8 bg-violet-500" : "w-1 bg-zinc-700"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// COMPONENT 5: Blog Statistics
// ============================================

export function BlogStatistics() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    categories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/blogs/categories");
        const data = await response.json();
        if (data.success) {
          setStats({
            totalBlogs: data.totalPosts || 0,
            categories: (data.categories || []).length - 1, // Excluding "all"
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 bg-zinc-900/60 border border-white/8 rounded-xl text-center">
        <div className="text-2xl font-bold text-zinc-100">{stats.totalBlogs}</div>
        <div className="text-xs text-zinc-500 mt-1">Total Articles</div>
      </div>
      <div className="p-4 bg-zinc-900/60 border border-white/8 rounded-xl text-center">
        <div className="text-2xl font-bold text-zinc-100">{stats.categories}</div>
        <div className="text-xs text-zinc-500 mt-1">Categories</div>
      </div>
    </div>
  );
}
