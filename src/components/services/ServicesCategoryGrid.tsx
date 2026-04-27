"use client";

import {
  Globe, Smartphone, Palette, ShoppingCart, Code2, Megaphone, Wrench,
  Bot, Brain, TrendingUp, Eye, Cpu, Cloud, Server, GitBranch, Shield,
  Database, Monitor, Plug, Lock, Package, BarChart2, Zap, Settings,
  FlaskConical, HardDrive, Mail, MapPin, Check, ArrowUpRight,
  Sparkles, Layers,
} from "lucide-react";
import Link from "next/link";
import { AnimatedList } from "../ui/animated-list";
import { motion, type Variants } from "motion/react";
import servicesData from "@/services.json";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const IconMap: Record<string, React.FC<any>> = {
  Globe, Smartphone, Palette, ShoppingCart, Code2, Megaphone, Wrench,
  Bot, Brain, TrendingUp, Eye, Cpu, Cloud, Server, GitBranch, Shield,
  Database, Monitor, Plug, Lock, Package, BarChart2, Zap, Settings,
  FlaskConical, HardDrive, Mail, MapPin, Sparkles, Layers
};

// ─── Mini graphic components (matches home page style) ────────────────────────

function IconClusterGraphic({ icons, accent }: { icons: React.ReactNode[]; accent: string }) {
  return (
    <div className="w-full h-40 flex items-center justify-center mb-6 relative">
      <div className={`relative z-10 w-16 h-16 bg-white dark:bg-zinc-900 rounded-2xl border border-black/10 dark:border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.05)] dark:shadow-[0_0_30px_rgba(255,255,255,0.04)] flex items-center justify-center ${accent}`}>
        {icons[0]}
      </div>
      {icons[1] && (
        <div className="absolute top-[15%] left-[18%] w-10 h-10 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-black/10 dark:border-white/5 flex items-center justify-center shadow-lg text-zinc-600 dark:text-zinc-500">
          {icons[1]}
        </div>
      )}
      {icons[2] && (
        <div className="absolute bottom-[15%] right-[18%] w-10 h-10 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-black/10 dark:border-white/5 flex items-center justify-center shadow-lg text-zinc-600 dark:text-zinc-500">
          {icons[2]}
        </div>
      )}
      {icons[3] && (
        <div className="absolute top-[12%] right-[22%] w-8 h-8 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-black/10 dark:border-white/5 flex items-center justify-center shadow-lg text-zinc-700 dark:text-zinc-600">
          {icons[3]}
        </div>
      )}
    </div>
  );
}

function TagListGraphic({ tags }: { tags: string[] }) {
  // Triple the tags so AnimatedList has enough items to loop continuously
  const loopedTags = [...tags, ...tags, ...tags];
  return (
    <div className="w-full h-40 flex flex-col mb-6 relative overflow-hidden mask-[linear-gradient(to_bottom,white_40%,transparent_100%)]">
      <AnimatedList delay={1200} className="w-full gap-2">
        {loopedTags.map((t, i) => (
          <div
            key={`${t}-${i}`}
            className={`flex items-center justify-between bg-zinc-100 dark:bg-zinc-900/80 border border-black/10 dark:border-white/5 rounded-xl px-3 py-2 shadow ${i % tags.length === 1 ? "w-full" : "w-[90%]"}`}
          >
            <div className="flex items-center gap-2">
              <Check className="w-3 h-3 text-zinc-600 dark:text-zinc-500" />
              <span className="text-[11px] text-zinc-700 dark:text-zinc-400 font-medium">{t}</span>
            </div>
            <ArrowUpRight className="w-3 h-3 text-zinc-700 dark:text-zinc-600" />
          </div>
        ))}
      </AnimatedList>
    </div>
  );
}

function NodesGraphic({ accent }: { accent: string }) {
  return (
    <div className="w-full h-40 flex items-center justify-center mb-6 relative">
      <svg className="absolute inset-0 w-full h-full text-zinc-300 dark:text-zinc-800 stroke-current z-0">
        <line x1="30%" y1="30%" x2="70%" y2="70%" strokeWidth="1" />
        <line x1="70%" y1="25%" x2="50%" y2="50%" strokeWidth="1" />
        <line x1="25%" y1="65%" x2="50%" y2="50%" strokeWidth="1" />
      </svg>
      <div className={`relative z-10 w-14 h-14 bg-zinc-100 dark:bg-zinc-950 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] ${accent}`}>
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="absolute top-[18%] left-[22%] w-9 h-9 bg-zinc-200 dark:bg-zinc-900 rounded-full border border-black/10 dark:border-white/5 flex items-center justify-center text-zinc-700 dark:text-zinc-500"><Cpu className="w-4 h-4" /></div>
      <div className="absolute top-[15%] right-[22%] w-9 h-9 bg-zinc-200 dark:bg-zinc-900 rounded-full border border-black/10 dark:border-white/5 flex items-center justify-center text-zinc-700 dark:text-zinc-500"><Globe className="w-4 h-4" /></div>
      <div className="absolute bottom-[18%] left-[20%] w-9 h-9 bg-zinc-200 dark:bg-zinc-900 rounded-full border border-black/10 dark:border-white/5 flex items-center justify-center text-zinc-700 dark:text-zinc-500"><Database className="w-4 h-4" /></div>
    </div>
  );
}

// ─── Group / Card data ────────────────────────────────────────────────────────

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: React.ReactNode;
  accent: string;
  graphic: "cluster" | "tags" | "nodes";
  graphicIcons?: React.ReactNode[];
  graphicTags?: string[];
  colSpan?: number;
}

interface Group {
  id: string;
  pill: string;
  heading: string;
  headingItalic: string;
  subheading: string;
  cards: ServiceCard[];
}

// Map JSON string icons to Lucide components
const GROUPS: Group[] = servicesData.categories.map((group: any) => ({
  id: group.id,
  pill: group.pill,
  heading: group.heading,
  headingItalic: group.headingItalic,
  subheading: group.subheading,
  cards: group.cards.map((card: any) => {
    const IconComponent = IconMap[card.icon] || Globe;
    return {
      ...card,
      icon: <IconComponent className="w-7 h-7" />,
      graphicIcons: card.graphicIcons?.map((iconName: string, i: number) => {
        const GraphicIcon = IconMap[iconName] || Globe;
        const sizeClass = i === 0 ? "w-7 h-7" : "w-4 h-4";
        return <GraphicIcon key={`${card.id}-${i}`} className={sizeClass} />;
      }),
    };
  }),
}));

// ─── Single card ──────────────────────────────────────────────────────────────

const COL_SPAN: Record<number, string> = {
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  6: "md:col-span-6",
};

function Card({ card }: { card: ServiceCard }) {
  const renderGraphic = () => {
    if (card.graphic === "tags" && card.graphicTags)
      return <TagListGraphic tags={card.graphicTags} />;
    if (card.graphic === "nodes")
      return <NodesGraphic accent={card.accent} />;
    return (
      <IconClusterGraphic
        icons={card.graphicIcons ?? [card.icon]}
        accent={card.accent}
      />
    );
  };

  const spanClass = COL_SPAN[card.colSpan ?? 2] ?? "md:col-span-2";

  return (
    <motion.div
      variants={itemVariants}
      className={`${spanClass} flex flex-col`}
    >
      <Link
        href={`/services/${card.id}`}
        className="flex flex-col flex-1 p-8 bg-zinc-950 rounded-3xl border-t-2 border-slate-300/50 outline outline-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden relative group transition-all duration-300 hover:outline-slate-600 hover:-translate-y-1 hover:shadow-[0_8px_50px_rgba(0,0,0,0.6)]"
      >
        {/* subtle glow on hover */}
        <div className="absolute inset-0 bg-linear-to-br from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

        {renderGraphic()}

        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`shrink-0 ${card.accent}`}>{card.icon}</div>
          <h3 className="text-xl font-semibold text-zinc-100 group-hover:text-white transition-colors">{card.title}</h3>
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed mb-5">{card.description}</p>

        {/* Sub-items */}
        <div className="mt-auto grid grid-cols-2 gap-x-4 gap-y-1.5 mb-5">
          {card.items.map((item) => (
            <div key={item} className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Check className={`w-3 h-3 shrink-0 ${card.accent}`} />
              {item}
            </div>
          ))}
        </div>

        {/* View Details */}
        <div className={`inline-flex items-center gap-1.5 text-xs font-semibold ${card.accent} opacity-0 group-hover:opacity-100 transition-all duration-200`}>
          View Details <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </Link>
    </motion.div>
  );
}


// ─── Group section ────────────────────────────────────────────────────────────

function GroupSection({ group }: { group: Group }) {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center px-4 py-20 w-full max-w-6xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={itemVariants}
        className="flex flex-col items-center text-center w-full"
      >
        {/* Pill */}
        <div className="flex items-center gap-2 mb-6 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-full px-4 py-1.5 shadow-lg">
          <Layers className="w-4 h-4 text-zinc-300" />
          <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">{group.pill}</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-4 text-center">
          {group.heading}{" "}
          <span className="font-serif italic font-light text-zinc-300">{group.headingItalic}</span>
        </h2>
        <p className="text-zinc-400 mb-16 text-lg text-center max-w-2xl">{group.subheading}</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-6 gap-6 w-full"
      >
        {group.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </motion.div>

      {/* section divider */}
      <div className="mt-20 w-full h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function ServicesCategoryGrid() {
  return (
    <div id="categories" className="w-full">
      {GROUPS.map((group) => (
        <GroupSection key={group.id} group={group} />
      ))}
    </div>
  );
}
