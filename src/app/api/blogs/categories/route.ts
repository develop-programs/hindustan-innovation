import { NextRequest, NextResponse } from 'next/server';
import blogsData from '@/blog.json';

interface Category {
  id: string;
  label: string;
}

interface CategoryWithCount extends Category {
  count: number;
}

/**
 * GET /api/blogs/categories
 * Fetches all available blog categories with post counts
 * 
 * Response includes:
 * - Hero section data
 * - All categories with post count for each
 * - Total number of posts
 * 
 * Example:
 * GET /api/blogs/categories
 */
export async function GET(request: NextRequest) {
  try {
    // Get hero data
    const hero = blogsData.hero;

    // Get categories and count posts in each
    const categoriesWithCounts: CategoryWithCount[] = blogsData.categories.map((category) => {
      let count = 0;

      if (category.id === 'all') {
        count = blogsData.posts.length;
      } else {
        count = blogsData.posts.filter((post) => post.category === category.id).length;
      }

      return {
        id: category.id,
        label: category.label,
        count,
      };
    });

    const response = {
      success: true,
      hero,
      categories: categoriesWithCounts,
      totalPosts: blogsData.posts.length,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
