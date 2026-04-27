/**
 * Blog API Type Definitions and Utilities
 * 
 * This file contains TypeScript types and helper functions for working with the blog API
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogSection {
  heading: string;
  body: string;
}

export interface BlogContent {
  intro: string;
  sections: BlogSection[];
  conclusion: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  categoryLabel: string;
  title: string;
  excerpt: string;
  coverGradient: string;
  accentColor: string;
  accentBg: string;
  icon: string;
  readTime: string;
  date: string;
  author: Author;
  tags: string[];
  content: BlogContent;
}

export interface BlogListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  date: string;
  readTime: string;
  icon: string;
  accentColor: string;
}

export interface Category {
  id: string;
  label: string;
  count?: number;
}

export interface BlogsResponse {
  success: boolean;
  data?: BlogPost[];
  total?: number;
  category?: string;
  searchQuery?: string;
  page?: number;
  totalPages?: number;
  error?: string;
}

export interface SingleBlogResponse {
  success: boolean;
  data?: BlogPost;
  related?: BlogListItem[];
  navigation?: {
    previous: { id: string; slug: string; title: string; date: string } | null;
    next: { id: string; slug: string; title: string; date: string } | null;
  };
  error?: string;
}

export interface CategoriesResponse {
  success: boolean;
  hero?: {
    pill: string;
    heading: string;
    headingItalic: string;
    subheading: string;
  };
  categories?: Category[];
  totalPosts?: number;
  error?: string;
}

export interface SearchResponse {
  success: boolean;
  query?: string;
  results?: BlogListItem[];
  totalResults?: number;
  error?: string;
}

// ============================================
// API ENDPOINTS
// ============================================

export const BLOG_API_ENDPOINTS = {
  // Get all blogs with optional filtering
  getAllBlogs: (params?: {
    category?: string;
    search?: string;
    limit?: number;
    page?: number;
    sortBy?: 'latest' | 'oldest';
  }) => {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.page) query.append('page', params.page.toString());
    if (params?.sortBy) query.append('sortBy', params.sortBy);
    return `/api/blogs${query.toString() ? '?' + query.toString() : ''}`;
  },

  // Get single blog by slug
  getBlogBySlug: (slug: string) => `/api/blogs/${slug}`,

  // Get all categories
  getCategories: () => '/api/blogs/categories',

  // Search blogs
  searchBlogs: (query: string) => `/api/blogs/search?q=${encodeURIComponent(query)}`,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Format date to readable format
 * @param dateString - ISO date string
 * @returns Formatted date (e.g., "April 20, 2026")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Calculate reading time in minutes
 * @param text - Blog content text
 * @returns Reading time in minutes
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Get excerpt from content (first N characters)
 * @param content - Full blog content
 * @param length - Maximum length (default: 150)
 * @returns Truncated excerpt with ellipsis
 */
export function getExcerpt(content: string, length: number = 150): string {
  if (content.length <= length) return content;
  return content.substring(0, length).trim() + '...';
}

/**
 * Highlight search term in text
 * @param text - Text to highlight in
 * @param term - Term to highlight
 * @returns Text with highlighted term
 */
export function highlightSearchTerm(text: string, term: string): string {
  const regex = new RegExp(`(${term})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

/**
 * Get blogs grouped by category
 * @param blogs - Array of blog posts
 * @returns Object with categories as keys and blogs array as values
 */
export function groupBlogsByCategory(
  blogs: BlogPost[]
): Record<string, BlogPost[]> {
  return blogs.reduce(
    (acc, blog) => {
      if (!acc[blog.category]) {
        acc[blog.category] = [];
      }
      acc[blog.category].push(blog);
      return acc;
    },
    {} as Record<string, BlogPost[]>
  );
}

/**
 * Get related tags for a blog
 * @param blog - Blog post
 * @param allBlogs - All blogs
 * @param limit - Number of related tags (default: 5)
 * @returns Array of related tags
 */
export function getRelatedTags(
  blog: BlogPost,
  allBlogs: BlogPost[],
  limit: number = 5
): string[] {
  const allTags = new Set<string>();

  allBlogs
    .filter((b) => b.category === blog.category && b.id !== blog.id)
    .forEach((b) => {
      b.tags.forEach((tag) => allTags.add(tag));
    });

  return Array.from(allTags).slice(0, limit);
}

/**
 * Paginate array
 * @param array - Array to paginate
 * @param pageNumber - Page number (1-indexed)
 * @param pageSize - Items per page
 * @returns Paginated array and metadata
 */
export function paginate<T>(
  array: T[],
  pageNumber: number = 1,
  pageSize: number = 10
): {
  data: T[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
} {
  const totalPages = Math.ceil(array.length / pageSize);
  const currentPage = Math.max(1, Math.min(pageNumber, totalPages));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    data: array.slice(startIndex, endIndex),
    currentPage,
    pageSize,
    totalItems: array.length,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}
