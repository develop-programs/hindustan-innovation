import type { Metadata } from "next";
import { BackgroundEffects } from "@/components/landing/BackgroundEffects";
import { Navbar } from "@/components/landing/Navbar";
import { FooterBar } from "@/components/landing/FooterBar";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesCategoryGrid } from "@/components/services/ServicesCategoryGrid";
import { ServicesCtaBanner } from "@/components/services/ServicesCtaBanner";

export const metadata: Metadata = {
  title: "Services | Hindustan Innovation",
  description:
    "Explore our full range of services — Web Development, AI, Cloud Computing, UI/UX Design, Digital Marketing and more.",
  icons: {
    icon: "/logo.png",
  },
};

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen flex flex-col text-zinc-50 overflow-hidden">
      <BackgroundEffects />
      <Navbar />
      <ServicesHero />
      <ServicesCategoryGrid />
      <ServicesCtaBanner />
      <FooterBar />
    </div>
  );
}
