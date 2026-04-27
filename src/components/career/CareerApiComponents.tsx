/**
 * Career API Components - Ready-to-use UI components for displaying career data
 * 
 * This file contains production-ready React components that integrate with the Careers API
 */

"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Loader2, Search, X, Briefcase } from "lucide-react";
import Link from "next/link";

// Type definitions
interface Job {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: string;
  items: string[];
}

interface Department {
  id: string;
  pill: string;
  heading: string;
  headingItalic: string;
  subheading: string;
  jobCount: number;
}

// ============================================
// COMPONENT 1: Job Search
// ============================================

export function JobSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<(Job & { departmentName: string })[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const searchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/careers/search?q=${encodeURIComponent(query)}`
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

    const debounceTimer = setTimeout(searchJobs, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="flex items-center gap-2 bg-zinc-900/60 border border-white/8 rounded-xl px-4 py-2.5">
        <Search className="w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search job titles..."
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
                  href={`/career/${result.id}`}
                  className="block px-4 py-3 hover:bg-zinc-800 transition-colors border-b border-white/5 last:border-b-0"
                  onClick={() => setQuery("")}
                >
                  <p className="text-sm font-medium text-zinc-200">
                    {result.title}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">{result.departmentName}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-zinc-500">
              No jobs found
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// ============================================
// COMPONENT 2: Department Filter
// ============================================

interface DepartmentFilterProps {
  onDepartmentChange: (department: string) => void;
  activeDepartment?: string;
}

export function DepartmentFilter({
  onDepartmentChange,
  activeDepartment = "all",
}: DepartmentFilterProps) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("/api/careers/departments");
        const data = await response.json();
        if (data.success) {
          setDepartments(data.departments || []);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-10 w-32 bg-zinc-900 rounded-full animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onDepartmentChange("all")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          activeDepartment === "all"
            ? "bg-zinc-100 text-zinc-900"
            : "bg-zinc-900/60 border border-white/8 text-zinc-400 hover:text-zinc-200"
        }`}
      >
        All Departments
      </button>
      {departments.map((dept) => (
        <button
          key={dept.id}
          onClick={() => onDepartmentChange(dept.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeDepartment === dept.id
              ? "bg-zinc-100 text-zinc-900"
              : "bg-zinc-900/60 border border-white/8 text-zinc-400 hover:text-zinc-200"
          }`}
        >
          {dept.pill.split(" ")[0]}
          <span className="ml-2 text-xs opacity-70">({dept.jobCount})</span>
        </button>
      ))}
    </div>
  );
}

// ============================================
// COMPONENT 3: Job List
// ============================================

interface JobListProps {
  department?: string;
  limit?: number;
}

export function JobList({ department = "all", limit = 10 }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (department !== "all") {
          params.append("department", department);
        }
        params.append("limit", limit.toString());

        const response = await fetch(`/api/careers?${params}`);
        const data = await response.json();

        if (data.success) {
          // Flatten jobs from all departments
          const allJobs = (data.data || []).flatMap((dept: any) => dept.jobs);
          setJobs(allJobs);
        } else {
          setError(data.error || "Failed to load jobs");
        }
      } catch (error) {
        setError("Failed to load job positions");
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [department, limit]);

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

  if (jobs.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-zinc-500">No jobs found in this department</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Link
          key={job.id}
          href={`/career/${job.id}`}
          className="block p-4 bg-zinc-900/60 border border-white/8 rounded-xl hover:bg-zinc-900 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-zinc-100 hover:text-white">
                {job.title}
              </h3>
              <p className="text-sm text-zinc-500 mt-1">{job.description}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-zinc-600 flex-wrap">
                {job.items.map((item, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-zinc-500" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <span className={`ml-4 px-3 py-1 bg-zinc-800 rounded-full text-xs font-medium ${job.accent}`}>
              View Details
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

// ============================================
// COMPONENT 4: Featured Jobs
// ============================================

export function FeaturedJobs() {
  const [jobs, setJobs] = useState<(Job & { departmentName: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/careers?limit=3");
        const data = await response.json();
        if (data.success) {
          const allJobs = (data.data || []).flatMap((dept: any) =>
            dept.jobs.map((job: any) => ({ ...job, departmentName: dept.pill }))
          );
          setJobs(allJobs.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching featured jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading || jobs.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-zinc-100">Featured Positions</h3>
      {jobs.map((job) => (
        <Link
          key={job.id}
          href={`/career/${job.id}`}
          className="block p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/8 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${job.accent} bg-zinc-900 border border-white/10 flex items-center justify-center`}>
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white">{job.title}</p>
              <p className="text-xs text-zinc-500">{job.departmentName}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

// ============================================
// COMPONENT 5: Job Stats
// ============================================

export function JobStats() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    departments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/careers/departments");
        const data = await response.json();
        if (data.success) {
          setStats({
            totalJobs: data.totalJobs || 0,
            departments: (data.departments || []).length,
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
        <div className="text-2xl font-bold text-zinc-100">{stats.totalJobs}</div>
        <div className="text-xs text-zinc-500 mt-1">Open Positions</div>
      </div>
      <div className="p-4 bg-zinc-900/60 border border-white/8 rounded-xl text-center">
        <div className="text-2xl font-bold text-zinc-100">{stats.departments}</div>
        <div className="text-xs text-zinc-500 mt-1">Departments</div>
      </div>
    </div>
  );
}
