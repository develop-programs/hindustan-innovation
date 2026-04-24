"use client";
import { useState } from "react";
import { Activity, TrendingUp, Zap, Landmark, ShoppingCart } from "lucide-react";

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="relative z-10 flex flex-col items-center justify-center px-4 py-20 w-full max-w-6xl mx-auto mt-10" id="process">
      {/* Pill */}
      <div className="flex items-center gap-2 mb-6 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-full px-4 py-1.5 shadow-lg">
        <Activity className="w-4 h-4 text-zinc-300" />
        <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">
          PROCESS
        </span>
      </div>

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-4 text-center">
        Our Simple & <span className="font-serif italic font-light text-zinc-300">Smart Process</span>
      </h2>
      
      {/* Subheading */}
      <p className="text-zinc-400 mb-16 text-lg text-center max-w-2xl">
        Everything you need to collaborate, create, and scale, all in one place.
      </p>

      {/* Main Container */}
      <div className="w-full bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Step Navigation */}
        <div className="flex items-center gap-4 mb-16">
          {[1, 2, 3].map((step) => (
            <button
              key={step}
              onClick={() => setActiveStep(step)}
              className={`flex-1 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                activeStep === step 
                  ? "bg-[#151515] text-zinc-200 shadow-md border border-white/5" 
                  : "bg-transparent text-zinc-600 hover:bg-white/5 hover:text-zinc-400"
              }`}
            >
              STEP {step}
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left: Mockup UI */}
          <div className="flex-1 w-full relative min-h-[350px] flex items-center justify-center">
            {/* Back Card */}
            <div className="absolute left-0 top-0 w-[85%] bg-[#0f0f0f] border border-white/5 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
              <div className="flex gap-4">
                {/* Mini Chart 1 */}
                <div className="flex-1 bg-[#151515] border border-white/5 rounded-xl p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-zinc-500">Customers</span>
                    <span className="text-[8px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">+10.5%</span>
                  </div>
                  <div className="text-lg font-semibold text-zinc-200 mb-2">-32%</div>
                  <div className="w-full h-8 relative">
                    {/* Fake SVG Chart */}
                    <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                      <path d="M0,20 Q10,15 20,25 T40,15 T60,20 T80,10 T100,15" fill="none" stroke="#52525b" strokeWidth="2" strokeLinecap="round" />
                      <path d="M0,20 Q10,15 20,25 T40,15 T60,20 T80,10 T100,15 L100,30 L0,30 Z" fill="url(#grad1)" opacity="0.2" />
                      <defs>
                        <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#52525b" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#52525b" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                {/* Mini Chart 2 */}
                <div className="flex-1 bg-[#151515] border border-white/5 rounded-xl p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-zinc-500">Debt Management</span>
                    <span className="text-[8px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">-10.5%</span>
                  </div>
                  <div className="text-lg font-semibold text-zinc-200 mb-2">-54%</div>
                  <div className="w-full h-8 relative">
                    <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                      <path d="M0,15 Q10,25 20,15 T40,25 T60,20 T80,25 T100,15" fill="none" stroke="#52525b" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Bottom Stat */}
              <div className="bg-[#151515] border border-white/5 rounded-xl p-4 flex justify-between items-center mt-2">
                <div>
                  <div className="text-[10px] text-zinc-500 mb-1">Sales</div>
                  <div className="text-xl font-bold text-zinc-200 flex items-baseline gap-2">
                    $103,428 <span className="text-[10px] text-zinc-500 font-normal">/ month</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-zinc-800/50 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-zinc-400" />
                </div>
              </div>
            </div>

            {/* Overlapping Card */}
            <div className="absolute right-0 bottom-[-20px] w-[75%] bg-[#121212] border border-white/10 rounded-2xl p-5 shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-10 backdrop-blur-xl">
              <div className="text-xs font-medium text-zinc-400 mb-4">Module Systems</div>
              <div className="flex flex-col gap-4">
                {/* Row 1 */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-800/80 rounded-md flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-zinc-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] text-zinc-300">Marketing & ads</span>
                      <span className="text-[10px] text-zinc-500">82% <span className="text-[8px]">Score</span></span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-zinc-400 rounded-full" style={{ width: "82%" }} />
                    </div>
                  </div>
                </div>
                
                {/* Row 2 */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-800/80 rounded-md flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-zinc-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] text-zinc-300">AI Automation</span>
                      <span className="text-[10px] text-zinc-500">14% <span className="text-[8px]">Score</span></span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-zinc-400 rounded-full" style={{ width: "14%" }} />
                    </div>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-800/80 rounded-md flex items-center justify-center shrink-0">
                    <Landmark className="w-4 h-4 text-zinc-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] text-zinc-300">Money & Finance</span>
                      <span className="text-[10px] text-zinc-500">44% <span className="text-[8px]">Score</span></span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-zinc-400 rounded-full" style={{ width: "44%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="flex-1 max-w-md">
            <div className="text-zinc-600 font-serif italic text-xl mb-2 border-b border-zinc-800 pb-4 inline-block">01</div>
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-4 mt-4">Discover & Analyze</h3>
            <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
              We audit your existing workflows, tools, and customer data to uncover inefficiencies and automation opportunities. Every system is mapped for clarity.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
