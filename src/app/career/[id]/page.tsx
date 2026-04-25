import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";
import { FooterBar } from "@/components/landing/FooterBar";
import { BackgroundEffects } from "@/components/landing/BackgroundEffects";
import careersData from "@/careers.json";
import JobDetailsClient from "@/components/career/JobDetailsClient";

function getJobById(id: string) {
  for (const dept of careersData.departments) {
    for (const job of dept.jobs) {
      if (job.id === id) {
        return { ...job, department: dept.heading };
      }
    }
  }
  return null;
}

export async function generateStaticParams() {
  const params: { id: string }[] = [];
  for (const dept of careersData.departments) {
    for (const job of dept.jobs) {
      params.push({ id: job.id });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const job = getJobById(id);
  if (!job) return { title: "Job Not Found" };
  return {
    title: `${job.title} | Hindustan Innovation Careers`,
    description: job.description,
  };
}

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = getJobById(id);
  if (!job) notFound();

  return (
    <div className="relative min-h-screen flex flex-col text-zinc-50 bg-black overflow-hidden">
      <Navbar />
      <JobDetailsClient job={job} />
      <FooterBar />
    </div>
  );
}
