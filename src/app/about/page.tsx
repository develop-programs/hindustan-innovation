import type { Metadata } from "next";
import { AboutUs } from "@/components/about/aboutus";

export const metadata: Metadata = {
  title: "About Us | Hindustaan Innovation",
  description:
    "Learn about Hindustaan Innovation — our story, mission, vision, values, team, and how we help Indian businesses automate smarter with AI.",
};

export default function AboutPage() {
  return <AboutUs />;
}
