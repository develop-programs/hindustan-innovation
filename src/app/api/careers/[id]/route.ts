import { NextRequest, NextResponse } from 'next/server';
import careersData from '@/careers.json';

interface Job {
  id: string;
  title: string;
  icon: string;
  accent: string;
  description: string;
  items: string[];
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

interface Department {
  id: string;
  heading: string;
  headingItalic: string;
}

/**
 * GET /api/careers/[id]
 * Fetches a single job posting by ID
 * 
 * Response includes:
 * - Full job details
 * - Department info
 * - Other jobs from the same department (for sidebar)
 * 
 * Example:
 * GET /api/careers/full-stack-dev
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Find the job across all departments
    let job: Job | undefined;
    let departmentInfo: Department | undefined;

    for (const dept of careersData.departments) {
      const foundJob = dept.jobs.find((j) => j.id === id);
      if (foundJob) {
        job = foundJob;
        departmentInfo = {
          id: dept.id,
          heading: dept.heading,
          headingItalic: dept.headingItalic,
        };
        break;
      }
    }

    if (!job || !departmentInfo) {
      return NextResponse.json(
        {
          success: false,
          error: 'Job posting not found',
          id,
        },
        { status: 404 }
      );
    }

    // Get other jobs from the same department
    const department = careersData.departments.find((d) => d.id === departmentInfo.id);
    const relatedJobs = department?.jobs
      .filter((j) => j.id !== id)
      .slice(0, 3)
      .map((j) => ({
        id: j.id,
        title: j.title,
        icon: j.icon,
        accent: j.accent,
        department: departmentInfo.id,
      })) || [];

    const response = {
      success: true,
      data: job,
      department: departmentInfo,
      related: relatedJobs,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch job details' },
      { status: 500 }
    );
  }
}
