import { BackgroundEffects } from "@/components/landing/BackgroundEffects";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { QuoteSection } from "@/components/landing/QuoteSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { IntegrationsSection } from "@/components/landing/IntegrationsSection";
import { CtaFooter } from "@/components/landing/CtaFooter";
import { FooterBar } from "@/components/landing/FooterBar";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col text-zinc-50 overflow-hidden">
      <BackgroundEffects />
      <Navbar />
      <HeroSection />
      <QuoteSection />
      <BenefitsSection />
      <ServicesSection />
      <FeaturesSection />
      <ProcessSection />
      <IntegrationsSection />
      <CtaFooter />
      <FooterBar />
    </div>
  );
}
