import { NextRequest, NextResponse } from 'next/server';
import careersData from '@/careers.json';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: string;
  department: string;
  items: string[];
}

/**
 * GET /api/careers/search?q=query
 * Full-text search across all job postings
 * 
 * Query Parameters:
 * - q (required): Search query (minimum 2 characters)
 * 
 * Searches in:
 * - Job titles
 * - Job descriptions
 * - Job requirements
 * 
 * Example:
 * GET /api/careers/search?q=React
 * GET /api/careers/search?q=remote
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

    // Search across all jobs
    const results: (SearchResult & { departmentName: string })[] = [];

    for (const dept of careersData.departments) {
      for (const job of dept.jobs) {
        const searchableText = `${job.title} ${job.description} ${job.requirements.join(' ')} ${dept.pill}`.toLowerCase();

        if (searchableText.includes(query)) {
          results.push({
            id: job.id,
            title: job.title,
            description: job.description,
            icon: job.icon,
            accent: job.accent,
            department: dept.id,
            departmentName: dept.pill,
            items: job.items,
          });
        }
      }
    }

    const response = {
      success: true,
      query,
      results,
      totalResults: results.length,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error searching careers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search careers' },
      { status: 500 }
    );
  }
}
