/**
 * Careers API Type Definitions and Utilities
 * 
 * This file contains TypeScript types and helper functions for working with the careers API
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface Job {
  id: string;
  title: string;
  icon: string;
  accent: string;
  description: string;
  items: string[];
  graphic: string;
  graphicIcons?: string[];
  graphicTags?: string[];
  colSpan?: number;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export interface Department {
  id: string;
  pill: string;
  heading: string;
  headingItalic: string;
  subheading: string;
  jobs: Job[];
  jobCount?: number;
}

export interface HeroData {
  pill: string;
  heading: string;
  headingItalic: string;
  subheading: string;
  ctaText: string;
  ctaLink: string;
}

export interface CTABannerData {
  pill: string;
  heading: string;
  headingItalic: string;
  subheading: string;
  ctaText: string;
  ctaLink: string;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: string;
  department: string;
  departmentName: string;
  items: string[];
}

export interface CareersResponse {
  success: boolean;
  data?: Department[];
  total?: number;
  totalDepartments?: number;
  error?: string;
  department?: string;
}

export interface JobResponse {
  success: boolean;
  data?: Job;
  department?: {
    id: string;
    heading: string;
    headingItalic: string;
  };
  related?: Array<{
    id: string;
    title: string;
    icon: string;
    accent: string;
    department: string;
  }>;
  error?: string;
}

export interface DepartmentsResponse {
  success: boolean;
  hero?: HeroData;
  ctaBanner?: CTABannerData;
  departments?: Array<{
    id: string;
    pill: string;
    heading: string;
    headingItalic: string;
    subheading: string;
    jobCount: number;
  }>;
  totalJobs?: number;
  error?: string;
}

export interface SearchResponse {
  success: boolean;
  query?: string;
  results?: SearchResult[];
  totalResults?: number;
  error?: string;
}

// ============================================
// API ENDPOINTS
// ============================================

export const CAREERS_API_ENDPOINTS = {
  // Get all departments and jobs
  getAllCareers: (params?: {
    department?: string;
    limit?: number;
  }) => {
    const query = new URLSearchParams();
    if (params?.department) query.append('department', params.department);
    if (params?.limit) query.append('limit', params.limit.toString());
    return `/api/careers${query.toString() ? '?' + query.toString() : ''}`;
  },

  // Get single job by ID
  getJobById: (id: string) => `/api/careers/${id}`,

  // Get departments
  getDepartments: () => '/api/careers/departments',

  // Search jobs
  searchJobs: (query: string) => `/api/careers/search?q=${encodeURIComponent(query)}`,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Format job level from items array
 * @param items - Job items (e.g., ["Full-time", "Remote", "Mid-Level"])
 * @returns Formatted level string
 */
export function getJobLevel(items: string[]): string {
  const levelKeywords = ['Junior', 'Mid', 'Senior', 'Lead', 'Principal'];
  const level = items.find((item) =>
    levelKeywords.some((keyword) => item.includes(keyword))
  );
  return level || 'Professional';
}

/**
 * Format job type from items array
 * @param items - Job items array
 * @returns Formatted job type
 */
export function getJobType(items: string[]): string {
  const typeKeywords = ['Full-time', 'Contract', 'Part-time', 'Freelance'];
  const type = items.find((item) =>
    typeKeywords.some((keyword) => item.includes(keyword))
  );
  return type || 'Full-time';
}

/**
 * Get job location from items array
 * @param items - Job items array
 * @returns Location string
 */
export function getJobLocation(items: string[]): string {
  const locationKeywords = ['Remote', 'Hybrid', 'On-site', 'Office'];
  const location = items.find((item) =>
    locationKeywords.some((keyword) => item.includes(keyword))
  );
  return location || 'Remote';
}

/**
 * Group jobs by department
 * @param departments - Array of departments
 * @returns Object with department IDs as keys
 */
export function groupJobsByDepartment(
  departments: Department[]
): Record<string, Job[]> {
  return departments.reduce(
    (acc, dept) => {
      acc[dept.id] = dept.jobs;
      return acc;
    },
    {} as Record<string, Job[]>
  );
}

/**
 * Get jobs filtered by level
 * @param departments - Array of departments
 * @param level - Job level to filter by
 * @returns Filtered jobs array
 */
export function filterJobsByLevel(
  departments: Department[],
  level: string
): Job[] {
  const jobs: Job[] = [];
  for (const dept of departments) {
    jobs.push(
      ...dept.jobs.filter((job) =>
        job.items.some((item) => item.includes(level))
      )
    );
  }
  return jobs;
}

/**
 * Get all unique job types across departments
 * @param departments - Array of departments
 * @returns Array of unique job types
 */
export function getUniqueJobTypes(departments: Department[]): string[] {
  const types = new Set<string>();
  for (const dept of departments) {
    for (const job of dept.jobs) {
      const type = getJobType(job.items);
      types.add(type);
    }
  }
  return Array.from(types);
}

/**
 * Get all unique locations
 * @param departments - Array of departments
 * @returns Array of unique locations
 */
export function getUniqueLocations(departments: Department[]): string[] {
  const locations = new Set<string>();
  for (const dept of departments) {
    for (const job of dept.jobs) {
      const location = getJobLocation(job.items);
      locations.add(location);
    }
  }
  return Array.from(locations);
}

/**
 * Match job based on filters
 * @param job - Job to check
 * @param filters - Filters to apply
 * @returns Whether job matches filters
 */
export function matchJobFilters(
  job: Job,
  filters: {
    level?: string;
    type?: string;
    location?: string;
    department?: string;
  }
): boolean {
  if (filters.level && !getJobLevel(job.items).includes(filters.level)) {
    return false;
  }
  if (filters.type && !getJobType(job.items).includes(filters.type)) {
    return false;
  }
  if (filters.location && !getJobLocation(job.items).includes(filters.location)) {
    return false;
  }
  return true;
}
