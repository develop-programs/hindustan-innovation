import { ArrowUpRight, Eclipse } from "lucide-react";
import data from "@/data.json";
import Image from "next/image";
import { SparklesCore } from "../ui/sparkles";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

export function HeroSection() {
  const { pill, headingLine1, headingLine2, headingItalic, subheading, ctaLabel } = data.hero;

  return (
    <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 w-full max-w-5xl mx-auto mb-32">
      {/* Central Icon */}
      <div className="relative mb-12 animate-fade-in-up flex items-center ">
        <div className="absolute inset-0 rounded-full" />
        <Image src="/logo.png" alt="Logo" width={100} height={100} decoding="async" loading="lazy" fetchPriority="high" className="size-24" />
        <div className="text-2xl w-44 font-bold tracking-none  text-zinc-100 uppercase">{data.brand.name}</div>
      </div>

      {/* Pill */}
      <div className="flex items-center gap-2 mb-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
        <span className="text-xs font-bold tracking-wider text-zinc-300 uppercase">
          {pill}
        </span>
      </div>

      {/* Hero Heading */}
      <h1 className="text-center text-5xl md:text-7xl lg:text-[4.5rem] font-bold leading-[1.1] tracking-tight mb-6 animate-fade-in-up bg-radial from-white/50 to-black/60 text-transparent bg-clip-text" style={{ animationDelay: "200ms" }}>
        <span className="text-zinc-200">{headingLine1} </span>
        <span className="text-zinc-400">{headingLine2.split(" ")[0]}</span>
        <br />
        <span className="text-zinc-400">{headingLine2.split(" ").slice(1).join(" ")} </span>
        <span className="font-serif italic text-zinc-300 font-light pr-2">{headingItalic}</span>
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-zinc-400 max-w-2xl text-center mb-10 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
        {subheading}
      </p>

      {/* CTA Button */}
      <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
        <HoverBorderGradient
          containerClassName="rounded-2xl"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-10 py-2"
        >
          <span>Book A Call</span>
        </HoverBorderGradient>
      </div>

      <div className="w-80 h-40 relative rounded-t-full">
        {/* Gradients */}
        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </main>
  );
}
