import { NextRequest, NextResponse } from 'next/server';
import blogsData from '@/blog.json';

interface SearchResult {
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

/**
 * GET /api/blogs/search?q=query
 * Full-text search across all blogs
 * 
 * Query Parameters:
 * - q (required): Search query (minimum 2 characters)
 * 
 * Searches in:
 * - Blog titles
 * - Blog excerpts
 * - Blog tags
 * 
 * Example:
 * GET /api/blogs/search?q=automation
 * GET /api/blogs/search?q=AI
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q')?.trim().toLowerCase();

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          error: 'Search query is required',
          suggestions: 'Use ?q=your-search-term',
        },
        { status: 400 }
      );
    }

    if (query.length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: 'Search query must be at least 2 characters',
        },
        { status: 400 }
      );
    }

    // Search across title, excerpt, and tags
    const results: SearchResult[] = blogsData.posts
      .filter((post) => {
        const searchableText = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase();
        return searchableText.includes(query);
      })
      .map((post) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        categoryLabel: post.categoryLabel,
        date: post.date,
        readTime: post.readTime,
        icon: post.icon,
        accentColor: post.accentColor,
      }));

    const response = {
      success: true,
      query,
      results,
      totalResults: results.length,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error searching blogs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search blogs' },
      { status: 500 }
    );
  }
}
