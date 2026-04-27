import { NextRequest, NextResponse } from 'next/server';
import careersData from '@/careers.json';

// Type definitions
interface Job {
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

interface Department {
  id: string;
  pill: string;
  heading: string;
  headingItalic: string;
  subheading: string;
  jobs: Job[];
}

interface CareersResponse {
  success: boolean;
  data?: Department[] | Job[];
  total?: number;
  error?: string;
  department?: string;
}

/**
 * GET /api/careers
 * Fetches all careers data - departments with jobs
 * 
 * Query Parameters:
 * - department: Filter by department ID (engineering, design)
 * - limit: Maximum jobs per department (default: 10)
 * 
 * Examples:
 * GET /api/careers
 * GET /api/careers?department=engineering
 * GET /api/careers?limit=5
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const department = searchParams.get('department') || '';
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50);

    let departments = [...careersData.departments];

    // Filter by department if specified
    if (department) {
      departments = departments.filter((d) => d.id === department);
      
      if (departments.length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: `Department "${department}" not found`,
          },
          { status: 404 }
        );
      }
    }

    // Apply limit to jobs per department
    const processedDepartments = departments.map((dept) => ({
      ...dept,
      jobs: dept.jobs.slice(0, limit),
    }));

    // Calculate total jobs
    const totalJobs = processedDepartments.reduce(
      (sum, dept) => sum + dept.jobs.length,
      0
    );

    const response: CareersResponse & { totalDepartments?: number } = {
      success: true,
      data: processedDepartments,
      total: totalJobs,
      totalDepartments: processedDepartments.length,
      department: department || 'all',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching careers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch careers data' },
      { status: 500 }
    );
  }
}
