import { NextRequest, NextResponse } from 'next/server';
import careersData from '@/careers.json';

/**
 * GET /api/careers/departments
 * Fetches all departments with hero and CTA banner data
 * 
 * Response includes:
 * - Hero section data
 * - CTA banner data
 * - Departments list with job counts
 * - Total open positions
 * 
 * Example:
 * GET /api/careers/departments
 */
export async function GET(request: NextRequest) {
  try {
    const departments = careersData.departments.map((dept) => ({
      id: dept.id,
      pill: dept.pill,
      heading: dept.heading,
      headingItalic: dept.headingItalic,
      subheading: dept.subheading,
      jobCount: dept.jobs.length,
    }));

    const totalJobs = careersData.departments.reduce(
      (sum, dept) => sum + dept.jobs.length,
      0
    );

    const response = {
      success: true,
      hero: careersData.hero,
      ctaBanner: careersData.ctaBanner,
      departments,
      totalJobs,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch departments' },
      { status: 500 }
    );
  }
}
