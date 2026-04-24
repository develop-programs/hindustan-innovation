import { Layers, Scissors, Check, RotateCcw, User, Mail, Cpu, FileText, Box, Blocks, Smartphone, Target, Search, Code2, BarChart2, Sparkles, ArrowUpRight } from "lucide-react";
import data from "@/data.json";

function TaskListGraphic() {
  return (
    <div className="w-full h-48 flex flex-col items-center justify-center gap-4 mb-6 relative">
      <div className="flex items-center justify-between w-[90%] bg-zinc-900 border border-white/5 rounded-xl p-3 shadow-lg">
        <div className="flex items-center gap-3 text-zinc-300">
          <Scissors className="w-4 h-4 text-zinc-500" />
          <span className="text-xs font-medium">Social media post</span>
        </div>
        <Check className="w-4 h-4 text-zinc-500" />
      </div>
      <div className="flex items-center justify-between w-[100%] bg-zinc-900/80 border border-white/5 rounded-xl p-3 shadow-lg">
        <div className="flex items-center gap-3 text-zinc-300">
          <User className="w-4 h-4 text-zinc-500" />
          <span className="text-xs font-medium">Employee Tracking</span>
        </div>
        <RotateCcw className="w-4 h-4 text-zinc-500" />
      </div>
    </div>
  );
}

function WorkflowNodesGraphic() {
  return (
    <div className="w-full h-48 flex items-center justify-center mb-6 relative">
      <div className="relative z-10 w-20 h-20 bg-zinc-950 rounded-full border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] flex items-center justify-center">
        <Sparkles className="w-8 h-8 text-zinc-200" />
      </div>
      <div className="absolute top-[20%] left-[20%] w-10 h-10 bg-zinc-900 rounded-xl border border-white/5 flex items-center justify-center shadow-lg"><Mail className="w-5 h-5 text-zinc-500" /></div>
      <div className="absolute top-[10%] left-[45%] w-10 h-10 bg-zinc-900 rounded-xl border border-white/5 flex items-center justify-center shadow-lg"><Cpu className="w-5 h-5 text-zinc-500" /></div>
      <div className="absolute top-[60%] left-[25%] w-12 h-12 bg-zinc-900 rounded-xl border border-white/5 flex items-center justify-center shadow-lg"><User className="w-6 h-6 text-zinc-500" /></div>
      <div className="absolute top-[15%] right-[25%] w-8 h-8 bg-zinc-900 rounded-xl border border-white/5 flex items-center justify-center shadow-lg"><FileText className="w-4 h-4 text-zinc-500" /></div>
      <div className="absolute top-[30%] right-[10%] w-12 h-12 bg-zinc-900 rounded-xl border border-white/5 flex items-center justify-center shadow-lg"><span className="text-zinc-500 font-bold font-serif text-lg">X</span></div>
      <div className="absolute bottom-[20%] right-[30%] w-12 h-12 bg-zinc-900 rounded-xl border border-white/5 flex items-center justify-center shadow-lg"><span className="text-zinc-500 font-bold font-serif text-xl">N</span></div>
      <div className="absolute bottom-[25%] left-[55%] w-8 h-8 bg-zinc-900 rounded-xl border border-white/5 flex items-center justify-center shadow-lg"><Box className="w-4 h-4 text-zinc-500" /></div>
    </div>
  );
}

function SearchUIGraphic() {
  return (
    <div className="w-full h-48 flex flex-col items-center justify-center mb-6 relative">
      <div className="w-full bg-zinc-900/50 rounded-2xl border border-white/5 p-4 shadow-xl">
        <div className="flex items-center gap-2 bg-zinc-950 border border-white/10 rounded-full px-3 py-2 mb-4">
          <span className="text-[10px] text-zinc-500 flex-1">Research anything...</span>
          <div className="bg-zinc-800 text-zinc-300 text-[10px] px-2 py-0.5 rounded-full font-medium">Search</div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-zinc-900/80 border border-white/5 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2"><Blocks className="w-3 h-3 text-zinc-500" /><span className="text-[10px] text-zinc-400">Software & App Industry</span></div>
            <ArrowUpRight className="w-3 h-3 text-zinc-600" />
          </div>
          <div className="flex items-center justify-between bg-zinc-900/80 border border-white/5 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2"><Smartphone className="w-3 h-3 text-zinc-500" /><span className="text-[10px] text-zinc-400">UI & UX Design Industry</span></div>
            <ArrowUpRight className="w-3 h-3 text-zinc-600" />
          </div>
          <div className="flex items-center justify-between bg-zinc-900/80 border border-white/5 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2"><Target className="w-3 h-3 text-zinc-500" /><span className="text-[10px] text-zinc-400">High Converting Customer</span></div>
            <ArrowUpRight className="w-3 h-3 text-zinc-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeEditorGraphic() {
  return (
    <div className="w-full h-48 flex items-center justify-center mb-6 relative">
      <div className="w-full h-full bg-[#0d0d0d] rounded-2xl border border-white/10 shadow-xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/40 border-b border-white/5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-zinc-700" />
            <div className="w-2 h-2 rounded-full bg-zinc-700" />
            <div className="w-2 h-2 rounded-full bg-zinc-700" />
          </div>
          <div className="flex items-center gap-2">
            <Search className="w-3 h-3 text-zinc-500" />
            <div className="bg-zinc-800 text-zinc-400 text-[10px] px-2 py-0.5 rounded flex items-center gap-1">Code <Code2 className="w-3 h-3" /></div>
          </div>
        </div>
        <div className="p-4 text-[10px] font-mono text-zinc-400 leading-relaxed overflow-hidden">
          <div className="flex"><span className="text-zinc-600 w-4">1</span><span className="text-zinc-300">class AutomationAgent:</span></div>
          <div className="flex"><span className="text-zinc-600 w-4">2</span><span className="pl-4">def __init__(self, activation_limit):</span></div>
          <div className="flex"><span className="text-zinc-600 w-4">3</span><span className="pl-8">self.activation_limit =</span></div>
          <div className="flex"><span className="text-zinc-600 w-4">4</span><span className="pl-4">activation_limit</span></div>
          <div className="flex"><span className="text-zinc-600 w-4">5</span><span className="pl-8">self.current_mode = "idle"</span></div>
          <div className="flex mt-2"><span className="text-zinc-600 w-4"></span><span className="pl-4">def evaluate_task(self):</span></div>
        </div>
      </div>
    </div>
  );
}

function StrategyNodesGraphic() {
  return (
    <div className="w-full h-48 flex items-center justify-center mb-6 relative">
      <div className="relative w-full h-full flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full text-zinc-800 stroke-current z-0">
          <line x1="35%" y1="35%" x2="70%" y2="70%" strokeWidth="1.5" />
        </svg>
        <div className="absolute top-[10%] left-[15%] w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-zinc-950 shadow-lg z-10">
          <BarChart2 className="w-6 h-6 text-zinc-400" />
        </div>
        <div className="absolute bottom-[10%] right-[10%] w-20 h-20 rounded-full border border-white/10 flex items-center justify-center bg-zinc-950 shadow-lg z-10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <Sparkles className="w-6 h-6 text-zinc-200" />
        </div>
        <div className="absolute bottom-[35%] left-[25%] w-6 h-6 rounded-full border border-white/5 z-10" />
      </div>
    </div>
  );
}

const GRAPHICS: Record<string, React.ReactNode> = {
  "task-list": <TaskListGraphic key="task" />,
  "workflow-nodes": <WorkflowNodesGraphic key="workflow" />,
  "search-ui": <SearchUIGraphic key="search" />,
  "code-editor": <CodeEditorGraphic key="code" />,
  "strategy-nodes": <StrategyNodesGraphic key="strategy" />,
};

export function ServicesSection() {
  const { pill, heading, headingItalic, subheading, cards } = data.services;

  return (
    <section className="relative z-10 flex flex-col items-center justify-center px-4 py-20 w-full max-w-6xl mx-auto" id="services">
      <div className="flex items-center gap-2 mb-6 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-full px-4 py-1.5 shadow-lg">
        <Layers className="w-4 h-4 text-zinc-300" />
        <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">{pill}</span>
      </div>

      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-4 text-center">
        {heading} <span className="font-serif italic font-light text-zinc-300">{headingItalic}</span>
      </h2>
      <p className="text-zinc-400 mb-16 text-lg text-center max-w-2xl">{subheading}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`${"colSpan" in card && card.colSpan === 2 ? "md:col-span-2" : "md:col-span-1"} flex flex-col p-8 bg-zinc-950 rounded-3xl border border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden relative group`}
          >
            {GRAPHICS[card.graphic]}
            <h3 className="text-xl font-semibold text-zinc-100 mb-3">{card.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-lg">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
