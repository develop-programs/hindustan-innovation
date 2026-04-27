import type { Metadata } from "next";
import { notFound } from "next/navigation";
import blogData from "@/blog.json";
import { BlogDetailView } from "@/components/blog/BlogDetailView";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogData.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogData.posts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Hindustaan Innovation Blog`,
    description: post.excerpt,
    icons: { icon: "/logo.png" },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogData.posts.find((p) => p.slug === slug);

  if (!post) notFound();

  return <BlogDetailView post={post} />;
}
