import { NextRequest, NextResponse } from 'next/server';
import blogsData from '@/blog.json';

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

/**
 * GET /api/blogs/[slug]
 * Fetches a single blog post by slug
 * 
 * Response includes:
 * - Full blog post data including content sections
 * - Related posts (3 posts from the same category)
 * - Previous and next posts in chronological order
 * 
 * Example:
 * GET /api/blogs/future-of-ai-automation
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Find the blog post by slug
    const post = blogsData.posts.find((p) => p.slug === slug);

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          error: 'Blog post not found',
          slug,
        },
        { status: 404 }
      );
    }

    // Get related posts from the same category (exclude current post)
    const relatedPosts = blogsData.posts
      .filter((p) => p.category === post.category && p.id !== post.id)
      .slice(0, 3);

    // Get chronologically sorted posts for navigation
    const sortedByDate = [...blogsData.posts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const currentIndex = sortedByDate.findIndex((p) => p.id === post.id);
    const previousPost = currentIndex < sortedByDate.length - 1 ? sortedByDate[currentIndex + 1] : null;
    const nextPost = currentIndex > 0 ? sortedByDate[currentIndex - 1] : null;

    // Return enriched response
    const response = {
      success: true,
      data: post,
      related: relatedPosts.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        categoryLabel: p.categoryLabel,
        date: p.date,
        readTime: p.readTime,
        icon: p.icon,
        accentColor: p.accentColor,
      })),
      navigation: {
        previous: previousPost ? {
          id: previousPost.id,
          slug: previousPost.slug,
          title: previousPost.title,
          date: previousPost.date,
        } : null,
        next: nextPost ? {
          id: nextPost.id,
          slug: nextPost.slug,
          title: nextPost.title,
          date: nextPost.date,
        } : null,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}
