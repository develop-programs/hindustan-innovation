import { 
  Package, 
  GitMerge, 
  BrainCircuit, 
  SlidersHorizontal, 
  Settings, 
  Bot, 
  Sparkles, 
  Maximize2, 
  PieChart, 
  TrendingUp, 
  BarChart3, 
  Plug, 
  Database 
} from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center px-4 py-20 w-full max-w-6xl mx-auto mt-10">
      {/* Pill */}
      <div className="flex items-center gap-2 mb-6 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-full px-4 py-1.5 shadow-lg">
        <Package className="w-4 h-4 text-zinc-300" />
        <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">
          FEATURES
        </span>
      </div>

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-4 text-center">
        All features in <span className="font-serif italic font-light text-zinc-300">one place</span>
      </h2>
      
      {/* Subheading */}
      <p className="text-zinc-400 mb-16 text-lg text-center max-w-2xl">
        Everything you need to automate operations, boost productivity
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {/* Card 1 */}
        <div className="flex flex-col items-center px-6 py-12 bg-[#0a0a0a] rounded-3xl border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)] group hover:border-white/10 transition-colors">
          <div className="w-32 h-14 mb-8 bg-[#151515] rounded-xl border border-white/5 flex items-center justify-center shadow-inner relative">
            <div className="flex items-center justify-center w-1/2 h-full">
              <GitMerge className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            </div>
            <div className="w-[1px] h-6 bg-white/5" />
            <div className="flex items-center justify-center w-1/2 h-full">
              <BrainCircuit className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-3 text-center">Workflow Automation</h3>
          <p className="text-zinc-400 text-center text-sm leading-relaxed">
            Automate complex business processes<br />to boost speed, clarity, and efficiency.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center px-6 py-12 bg-[#0a0a0a] rounded-3xl border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)] group hover:border-white/10 transition-colors">
          <div className="w-32 h-14 mb-8 bg-[#151515] rounded-xl border border-white/5 flex items-center justify-center shadow-inner relative">
            <div className="flex items-center justify-center w-1/2 h-full">
              <SlidersHorizontal className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            </div>
            <div className="w-[1px] h-6 bg-white/5" />
            <div className="flex items-center justify-center w-1/2 h-full">
              <Settings className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-3 text-center">Custom AI Solutions</h3>
          <p className="text-zinc-400 text-center text-sm leading-relaxed">
            Build tailored AI systems that align with<br />your business goals and challenges.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center px-6 py-12 bg-[#0a0a0a] rounded-3xl border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)] group hover:border-white/10 transition-colors">
          <div className="w-32 h-14 mb-8 bg-[#151515] rounded-xl border border-white/5 flex items-center justify-center shadow-inner relative">
            <div className="flex items-center justify-center w-1/2 h-full">
              <Bot className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            </div>
            <div className="w-[1px] h-6 bg-white/5" />
            <div className="flex items-center justify-center w-1/2 h-full">
              <Sparkles className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-3 text-center">AI Assistant</h3>
          <p className="text-zinc-400 text-center text-sm leading-relaxed">
            Deploy intelligent virtual agents to<br />streamline tasks.
          </p>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col items-center px-6 py-12 bg-[#0a0a0a] rounded-3xl border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)] group hover:border-white/10 transition-colors">
          <div className="w-32 h-14 mb-8 bg-[#151515] rounded-xl border border-white/5 flex items-center justify-center shadow-inner relative">
            <div className="flex items-center justify-center w-1/2 h-full">
              <Maximize2 className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            </div>
            <div className="w-[1px] h-6 bg-white/5" />
            <div className="flex items-center justify-center w-1/2 h-full">
              <PieChart className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-3 text-center">Sales & Marketing</h3>
          <p className="text-zinc-400 text-center text-sm leading-relaxed">
            Leverage AI to optimize campaigns,<br />track leads, and personalize outreach.
          </p>
        </div>

        {/* Card 5 */}
        <div className="flex flex-col items-center px-6 py-12 bg-[#0a0a0a] rounded-3xl border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)] group hover:border-white/10 transition-colors">
          <div className="w-32 h-14 mb-8 bg-[#151515] rounded-xl border border-white/5 flex items-center justify-center shadow-inner relative">
            <div className="flex items-center justify-center w-1/2 h-full">
              <TrendingUp className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            </div>
            <div className="w-[1px] h-6 bg-white/5" />
            <div className="flex items-center justify-center w-1/2 h-full">
              <BarChart3 className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-3 text-center">Performance Tracking</h3>
          <p className="text-zinc-400 text-center text-sm leading-relaxed">
            Track automation results in real time to<br />improve and scale your workflows.
          </p>
        </div>

        {/* Card 6 */}
        <div className="flex flex-col items-center px-6 py-12 bg-[#0a0a0a] rounded-3xl border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)] group hover:border-white/10 transition-colors">
          <div className="w-32 h-14 mb-8 bg-[#151515] rounded-xl border border-white/5 flex items-center justify-center shadow-inner relative">
            <div className="flex items-center justify-center w-1/2 h-full">
              <Plug className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            </div>
            <div className="w-[1px] h-6 bg-white/5" />
            <div className="flex items-center justify-center w-1/2 h-full">
              <Database className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-3 text-center">Seamless Integrations</h3>
          <p className="text-zinc-400 text-center text-sm leading-relaxed">
            Connect your tools and apps for<br />smooth, unified AI-powered workflows.
          </p>
        </div>
      </div>
    </section>
  );
}
