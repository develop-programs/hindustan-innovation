import { NextRequest, NextResponse } from 'next/server';
import blogsData from '@/blog.json';

// Type definitions
interface BlogPost {
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
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  content: {
    intro: string;
    sections: Array<{
      heading: string;
      body: string;
    }>;
    conclusion: string;
  };
}

interface BlogResponse {
  success: boolean;
  data: BlogPost[];
  total: number;
  category?: string;
  searchQuery?: string;
}

/**
 * GET /api/blogs
 * Fetches blogs with optional filtering
 * 
 * Query Parameters:
 * - category: Filter by blog category (ai, automation, web-dev, cloud, business, all)
 * - search: Search blogs by title, excerpt, or tags
 * - limit: Maximum number of posts to return (default: 10, max: 50)
 * - page: Pagination page number (default: 1)
 * - sortBy: Sort order - 'latest' (default) or 'oldest'
 * 
 * Examples:
 * GET /api/blogs
 * GET /api/blogs?category=ai
 * GET /api/blogs?search=automation
 * GET /api/blogs?category=ai&limit=5&page=1
 * GET /api/blogs?sortBy=oldest
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search')?.toLowerCase() || '';
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50);
    const page = Math.max(parseInt(searchParams.get('page') || '1'), 1);
    const sortBy = searchParams.get('sortBy') || 'latest';

    // Filter blogs by category
    let filteredPosts: BlogPost[] = blogsData.posts;

    if (category !== 'all') {
      filteredPosts = filteredPosts.filter((post) => post.category === category);
    }

    // Filter by search query (searches in title, excerpt, and tags)
    if (search) {
      filteredPosts = filteredPosts.filter((post) => {
        const searchableText = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase();
        return searchableText.includes(search);
      });
    }

    // Sort posts
    if (sortBy === 'oldest') {
      filteredPosts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else {
      // Default: latest first
      filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    // Pagination
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    // Return response
    const response: BlogResponse & { page?: number; totalPages?: number } = {
      success: true,
      data: paginatedPosts,
      total: totalPosts,
      category: category !== 'all' ? category : undefined,
      searchQuery: search || undefined,
      page,
      totalPages,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/blogs
 * Endpoint for future use - can be extended for admin functionality
 */
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { success: false, error: 'POST method not allowed. Use GET to fetch blogs.' },
    { status: 405 }
  );
}
