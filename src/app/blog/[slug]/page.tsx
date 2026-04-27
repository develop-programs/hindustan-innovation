import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailView } from "@/components/blog/BlogDetailView";

interface Props {
  params: Promise<{ slug: string }>;
}

// Note: Dynamic routes with API fetching may not support static generation
// Keeping the route dynamic for real-time data fetching
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/blogs/${slug}`,
      { cache: "no-store" }
    );
    const data = await response.json();

    if (data.success && data.data) {
      const post = data.data;
      return {
        title: `${post.title} | Hindustaan Innovations Blog`,
        description: post.excerpt,
        icons: { icon: "/logo.png" },
      };
    }
    return {};
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {};
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/blogs/${slug}`,
      { cache: "no-store" }
    );
    const data = await response.json();

    if (!data.success || !data.data) {
      notFound();
    }

    return (
      <BlogDetailView
        post={data.data}
        related={data.related || []}
        navigation={data.navigation}
      />
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    notFound();
  }
}
