import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";
import { FooterBar } from "@/components/landing/FooterBar";
import { BackgroundEffects } from "@/components/landing/BackgroundEffects";
import JobDetailsClient from "@/components/career/JobDetailsClient";

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export async function generateStaticParams() {
  try {
    const response = await fetch(`${BASE_URL}/api/careers`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    const data = await response.json();

    const params: { id: string }[] = [];
    if (data.success) {
      for (const dept of data.data) {
        for (const job of dept.jobs) {
          params.push({ id: job.id });
        }
      }
    }
    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const response = await fetch(`${BASE_URL}/api/careers/${id}`);
    const data = await response.json();

    if (data.success && data.data) {
      return {
        title: `${data.data.title} | Hindustan Innovation Careers`,
        description: data.data.description,
      };
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }

  return { title: "Job Details | Hindustan Innovation Careers" };
}

export const revalidate = 3600; // Revalidate every hour

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const response = await fetch(`${BASE_URL}/api/careers/${id}`, {
      next: { revalidate: 3600 },
    });
    const data = await response.json();

    if (!data.success || !data.data) {
      notFound();
    }

    return (
      <div className="relative min-h-screen flex flex-col text-zinc-50 bg-black overflow-hidden">
        <Navbar />
        <JobDetailsClient job={data.data} />
        <FooterBar />
      </div>
    );
  } catch (error) {
    console.error("Error fetching job details:", error);
    notFound();
  }
}
