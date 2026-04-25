"use client";

import {
  Globe, Smartphone, Palette, ShoppingCart, Code2, Megaphone, Wrench,
  Bot, Brain, TrendingUp, Eye, Cpu, Cloud, Server, GitBranch, Shield,
  Database, Monitor, Plug, Lock, Package, BarChart2, Zap, Settings,
  FlaskConical, HardDrive, Mail, MapPin, Check, ArrowUpRight,
  Sparkles, Layers,
} from "lucide-react";

// ─── Mini graphic components (matches home page style) ────────────────────────

function IconClusterGraphic({ icons, accent }: { icons: React.ReactNode[]; accent: string }) {
  return (
    <div className="w-full h-40 flex items-center justify-center mb-6 relative">
      <div className={`relative z-10 w-16 h-16 bg-zinc-900 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.04)] flex items-center justify-center ${accent}`}>
        {icons[0]}
      </div>
      {icons[1] && (
        <div className="absolute top-[15%] left-[18%] w-10 h-10 bg-zinc-900 rounded-xl border border-white/5 flex items-center justify-center shadow-lg text-zinc-500">
          {icons[1]}
        </div>
      )}
      {icons[2] && (
        <div className="absolute bottom-[15%] right-[18%] w-10 h-10 bg-zinc-900 rounded-xl border border-white/5 flex items-center justify-center shadow-lg text-zinc-500">
          {icons[2]}
        </div>
      )}
      {icons[3] && (
        <div className="absolute top-[12%] right-[22%] w-8 h-8 bg-zinc-900 rounded-xl border border-white/5 flex items-center justify-center shadow-lg text-zinc-600">
          {icons[3]}
        </div>
      )}
    </div>
  );
}

function TagListGraphic({ tags }: { tags: string[] }) {
  return (
    <div className="w-full h-40 flex flex-col gap-2 justify-center mb-6">
      {tags.map((t, i) => (
        <div key={t} className={`flex items-center justify-between bg-zinc-900/80 border border-white/5 rounded-xl px-3 py-2 shadow ${i === 1 ? "w-full" : "w-[90%]"}`}>
          <div className="flex items-center gap-2">
            <Check className="w-3 h-3 text-zinc-500" />
            <span className="text-[11px] text-zinc-400 font-medium">{t}</span>
          </div>
          <ArrowUpRight className="w-3 h-3 text-zinc-600" />
        </div>
      ))}
    </div>
  );
}

function NodesGraphic({ accent }: { accent: string }) {
  return (
    <div className="w-full h-40 flex items-center justify-center mb-6 relative">
      <svg className="absolute inset-0 w-full h-full text-zinc-800 stroke-current z-0">
        <line x1="30%" y1="30%" x2="70%" y2="70%" strokeWidth="1" />
        <line x1="70%" y1="25%" x2="50%" y2="50%" strokeWidth="1" />
        <line x1="25%" y1="65%" x2="50%" y2="50%" strokeWidth="1" />
      </svg>
      <div className={`relative z-10 w-14 h-14 bg-zinc-950 rounded-full border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)] ${accent}`}>
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="absolute top-[18%] left-[22%] w-9 h-9 bg-zinc-900 rounded-full border border-white/5 flex items-center justify-center text-zinc-500"><Cpu className="w-4 h-4" /></div>
      <div className="absolute top-[15%] right-[22%] w-9 h-9 bg-zinc-900 rounded-full border border-white/5 flex items-center justify-center text-zinc-500"><Globe className="w-4 h-4" /></div>
      <div className="absolute bottom-[18%] left-[20%] w-9 h-9 bg-zinc-900 rounded-full border border-white/5 flex items-center justify-center text-zinc-500"><Database className="w-4 h-4" /></div>
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

const GROUPS: Group[] = [
  // ── Web & App ──────────────────────────────────────────────────────────────
  {
    id: "web-app",
    pill: "WEB & APP",
    heading: "Build Your Digital",
    headingItalic: "Presence",
    subheading: "Full-stack websites, mobile apps, and stunning UI/UX designs",
    cards: [
      {
        id: "web-dev", title: "Web Development", icon: <Globe className="w-7 h-7" />, accent: "text-blue-400",
        description: "From static sites to complex web apps with admin panels, e-commerce, portfolios and custom solutions.",
        items: ["Static Website", "Dynamic + Admin Panel", "E-commerce Store", "Custom Web App", "Portfolio & Landing Page"],
        graphic: "tags", graphicTags: ["Static Website", "E-commerce Store", "Custom Web App"],
        colSpan: 3,
      },
      {
        id: "app-dev", title: "App Development", icon: <Smartphone className="w-7 h-7" />, accent: "text-purple-400",
        description: "Native Android & iOS apps, and cross-platform builds with React Native / Flutter.",
        items: ["Android App", "iOS App", "React Native / Flutter", "Custom Business Apps"],
        graphic: "cluster",
        graphicIcons: [<Smartphone key="s" className="w-7 h-7" />, <Globe key="g" className="w-4 h-4" />, <Code2 key="c" className="w-4 h-4" />],
        colSpan: 3,
      },
      {
        id: "ui-ux", title: "UI/UX Design", icon: <Palette className="w-7 h-7" />, accent: "text-pink-400",
        description: "Pixel-perfect designs in Figma & Adobe XD — websites, apps and dashboard redesigns.",
        items: ["Website UI Design", "Mobile App UI", "Dashboard Design", "Redesign Existing Site"],
        graphic: "nodes",
        colSpan: 2,
      },
      {
        id: "ecommerce", title: "E-commerce Solutions", icon: <ShoppingCart className="w-7 h-7" />, accent: "text-green-400",
        description: "Complete online stores with payment gateways, cart systems, and product management.",
        items: ["Online Store Setup", "Razorpay / Stripe", "Cart & Checkout", "Product Management"],
        graphic: "tags", graphicTags: ["Payment Gateway", "Cart System", "Product Mgmt"],
        colSpan: 2,
      },
      {
        id: "software", title: "Custom Software", icon: <Code2 className="w-7 h-7" />, accent: "text-orange-400",
        description: "School ERP, CRM, and Inventory systems — tailored to your exact business workflow.",
        items: ["School Management", "CRM System", "ERP Solutions", "Inventory Management"],
        graphic: "cluster",
        graphicIcons: [<Code2 key="c" className="w-7 h-7" />, <Settings key="s" className="w-4 h-4" />, <Database key="d" className="w-4 h-4" />, <Layers key="l" className="w-4 h-4" />],
        colSpan: 2,
      },
    ],
  },

  // ── Marketing & Support ────────────────────────────────────────────────────
  {
    id: "marketing",
    pill: "MARKETING & SUPPORT",
    heading: "Grow Faster,",
    headingItalic: "Stay Strong",
    subheading: "Digital marketing campaigns and ongoing website maintenance & support",
    cards: [
      {
        id: "marketing", title: "Digital Marketing", icon: <Megaphone className="w-7 h-7" />, accent: "text-yellow-400",
        description: "SEO, Social Media, Google Ads and Content Marketing to grow your online audience.",
        items: ["SEO Optimization", "Social Media Marketing", "Google Ads", "Content Marketing"],
        graphic: "nodes", colSpan: 4,
      },
      {
        id: "maintenance", title: "Maintenance & Support", icon: <Wrench className="w-7 h-7" />, accent: "text-cyan-400",
        description: "Keep your site fast and secure with ongoing bug fixes, updates and performance tuning.",
        items: ["Website Maintenance", "Bug Fixing", "Performance Optimization", "Security Updates"],
        graphic: "tags", graphicTags: ["Bug Fixing", "Performance", "Security Updates"],
      },
    ],
  },

  // ── AI Services ────────────────────────────────────────────────────────────
  {
    id: "ai",
    pill: "AI SERVICES",
    heading: "Intelligent Solutions,",
    headingItalic: "Powered by AI",
    subheading: "Chatbots, NLP, machine learning, computer vision and custom AI systems",
    cards: [
      {
        id: "chatbot", title: "AI Chatbot Development", icon: <Bot className="w-7 h-7" />, accent: "text-indigo-400",
        description: "Website, WhatsApp & Telegram bots that automate customer support and generate leads.",
        items: ["Website Chatbots", "WhatsApp / Telegram Bots", "AI FAQ Bots", "Lead Generation Bots"],
        graphic: "cluster",
        graphicIcons: [<Bot key="b" className="w-7 h-7" />, <Mail key="m" className="w-4 h-4" />, <Sparkles key="sp" className="w-4 h-4" />],
        colSpan: 4,
      },
      {
        id: "nlp", title: "NLP Services", icon: <Brain className="w-7 h-7" />, accent: "text-violet-400",
        description: "Text analysis, sentiment detection, auto-reply systems and language translation.",
        items: ["Text Analysis", "Sentiment Analysis", "Auto Reply Systems", "Language Translation"],
        graphic: "tags", graphicTags: ["Sentiment Analysis", "Auto Reply", "Translation"],
      },
      {
        id: "ml", title: "Machine Learning", icon: <TrendingUp className="w-7 h-7" />, accent: "text-emerald-400",
        description: "Prediction systems, recommendation engines (like Amazon/Netflix), and fraud detection.",
        items: ["Prediction Systems", "Recommendation Engine", "Fraud Detection"],
        graphic: "nodes",
      },
      {
        id: "vision", title: "Computer Vision", icon: <Eye className="w-7 h-7" />, accent: "text-rose-400",
        description: "Image recognition, face detection, OCR and object detection solutions.",
        items: ["Image Recognition", "Face Detection", "OCR (Text from Image)", "Object Detection"],
        graphic: "cluster",
        graphicIcons: [<Eye key="e" className="w-7 h-7" />, <Monitor key="m" className="w-4 h-4" />, <Cpu key="c" className="w-4 h-4" />],
      },
      {
        id: "custom-ai", title: "Custom AI Solutions", icon: <Cpu className="w-7 h-7" />, accent: "text-sky-400",
        description: "AI dashboards, automation tools, and AI integration into your existing systems.",
        items: ["AI-based Dashboards", "Automation Tools", "AI System Integration"],
        graphic: "tags", graphicTags: ["AI Dashboards", "Automation", "Integration"],
        colSpan: 2,
      },
    ],
  },

  // ── Cloud Computing ─────────────────────────────────────────────────────────
  {
    id: "cloud",
    pill: "CLOUD COMPUTING",
    heading: "Scale Without",
    headingItalic: "Limits",
    subheading: "AWS, GCP, Azure — hosting, migration, DevOps, security and monitoring",
    cards: [
      {
        id: "cloud-host", title: "Cloud Hosting & Deployment", icon: <Cloud className="w-7 h-7" />, accent: "text-teal-400",
        description: "Deploy websites and apps on AWS, Google Cloud or Azure with scalable infrastructure.",
        items: ["Website Hosting", "App Deployment", "AWS / GCP / Azure", "Scalable Setup"],
        graphic: "nodes", colSpan: 4,
      },
      {
        id: "devops", title: "DevOps & CI/CD", icon: <GitBranch className="w-7 h-7" />, accent: "text-lime-400",
        description: "Auto deployment pipelines with Git, Docker, Kubernetes and Jenkins.",
        items: ["Auto Deployment", "Git Integration", "CI/CD Pipelines", "Docker & Kubernetes"],
        graphic: "cluster",
        graphicIcons: [<GitBranch key="g" className="w-7 h-7" />, <Server key="s" className="w-4 h-4" />, <Settings key="st" className="w-4 h-4" />],
      },
      {
        id: "cloud-sec", title: "Cloud Security", icon: <Shield className="w-7 h-7" />, accent: "text-red-400",
        description: "Data encryption, backup systems, firewall setup and access control for your cloud.",
        items: ["Data Encryption", "Backup Systems", "Firewall Setup", "Access Control"],
        graphic: "tags", graphicTags: ["Data Encryption", "Firewall", "Access Control"],
      },
      {
        id: "migration", title: "Cloud Migration", icon: <Server className="w-7 h-7" />, accent: "text-amber-400",
        description: "Move from local servers to the cloud — database migration and legacy system upgrades.",
        items: ["Local → Cloud Transfer", "Database Migration", "Legacy Upgrade"],
        graphic: "nodes",
      },
      {
        id: "cloud-store", title: "Cloud Storage & Monitoring", icon: <Database className="w-7 h-7" />, accent: "text-fuchsia-400",
        description: "Secure file storage, backup & recovery, auto-scaling and server performance monitoring.",
        items: ["Secure File Storage", "Backup & Recovery", "Cost Optimization", "Auto Scaling"],
        graphic: "cluster",
        graphicIcons: [<Database key="d" className="w-7 h-7" />, <Monitor key="m" className="w-4 h-4" />, <BarChart2 key="b" className="w-4 h-4" />, <Shield key="s" className="w-4 h-4" />],
        colSpan: 2,
      },
    ],
  },

  // ── Advanced Add-ons ────────────────────────────────────────────────────────
  {
    id: "addons",
    pill: "ADVANCED ADD-ONS",
    heading: "More Power,",
    headingItalic: "More Growth",
    subheading: "APIs, cybersecurity, SaaS, analytics, automation, ERP, consulting and more",
    cards: [
      {
        id: "api", title: "API Development & Integration", icon: <Plug className="w-7 h-7" />, accent: "text-blue-300",
        description: "Connect Razorpay, Stripe, Twilio and build custom APIs for system-to-system integration.",
        items: ["Custom API Dev", "Payment APIs", "SMS / Email APIs", "System Integration"],
        graphic: "nodes", colSpan: 4,
      },
      {
        id: "cyber", title: "Cybersecurity", icon: <Lock className="w-7 h-7" />, accent: "text-red-300",
        description: "Website security audits, vulnerability testing, SSL hardening and data protection.",
        items: ["Security Audit", "Vulnerability Testing", "SSL Hardening", "Data Protection"],
        graphic: "tags", graphicTags: ["Security Audit", "SSL Setup", "Data Protection"],
      },
      {
        id: "saas", title: "SaaS Product Development", icon: <Package className="w-7 h-7" />, accent: "text-violet-300",
        description: "Build subscription-based SaaS with multi-user dashboards and role-based access.",
        items: ["Subscription Software", "Multi-user Dashboards", "Role-based Access", "CRM / School SaaS"],
        graphic: "cluster",
        graphicIcons: [<Package key="p" className="w-7 h-7" />, <Settings key="s" className="w-4 h-4" />, <Globe key="g" className="w-4 h-4" />],
      },
      {
        id: "analytics", title: "Data Analytics & BI", icon: <BarChart2 className="w-7 h-7" />, accent: "text-green-300",
        description: "Power BI & Tableau dashboards, real-time analytics and actionable business insights.",
        items: ["Data Dashboards", "Reports & Insights", "Real-time Analytics", "Power BI / Tableau"],
        graphic: "tags", graphicTags: ["Data Dashboards", "Real-time Analytics", "Power BI"],
        colSpan: 4,
      },
      {
        id: "automation", title: "Automation Services", icon: <Zap className="w-7 h-7" />, accent: "text-yellow-300",
        description: "Workflow, email and CRM automation with intelligent task scheduling.",
        items: ["Workflow Automation", "Email Automation", "CRM Automation", "Task Scheduling"],
        graphic: "nodes",
      },
      {
        id: "erp", title: "ERP & CRM Customization", icon: <Settings className="w-7 h-7" />, accent: "text-cyan-300",
        description: "Business management software, customer tracking and sales pipeline systems.",
        items: ["Business Management", "Customer Tracking", "Sales Pipeline"],
        graphic: "cluster",
        graphicIcons: [<Settings key="s" className="w-7 h-7" />, <BarChart2 key="b" className="w-4 h-4" />, <Plug key="p" className="w-4 h-4" />],
      },
      {
        id: "consulting", title: "AI Training & Consulting", icon: <FlaskConical className="w-7 h-7" />, accent: "text-indigo-300",
        description: "Help businesses adopt AI — strategy planning, model selection and implementation.",
        items: ["AI Strategy Planning", "Model Selection", "Implementation Support"],
        graphic: "tags", graphicTags: ["AI Strategy", "Model Selection", "Consulting"],
      },
      {
        id: "hosting", title: "Domain, Hosting & Email", icon: <Mail className="w-7 h-7" />, accent: "text-pink-300",
        description: "Domain registration, business email setup and hosting management via GoDaddy & Hostinger.",
        items: ["Domain Registration", "Business Email", "Hosting Management", "GoDaddy / Hostinger"],
        graphic: "cluster",
        graphicIcons: [<Mail key="m" className="w-7 h-7" />, <Globe key="g" className="w-4 h-4" />, <Server key="s" className="w-4 h-4" />],
        colSpan: 4,
      },
      {
        id: "backup", title: "Backup & Disaster Recovery", icon: <HardDrive className="w-7 h-7" />, accent: "text-rose-300",
        description: "Data backup systems, recovery planning and cloud restore setup so you never lose data.",
        items: ["Data Backup", "Recovery Planning", "Cloud Restore"],
        graphic: "nodes",
      },
      {
        id: "perf", title: "Performance & Testing", icon: <TrendingUp className="w-7 h-7" />, accent: "text-lime-300",
        description: "Website speed, database & server tuning — plus manual, automated & performance QA testing.",
        items: ["Speed Optimization", "Database Tuning", "Manual Testing", "Automation Testing"],
        graphic: "tags", graphicTags: ["Speed Optimization", "DB Tuning", "QA Testing"],
      },
      {
        id: "it", title: "IT Consulting & Digital Transformation", icon: <MapPin className="w-7 h-7" />, accent: "text-sky-300",
        description: "Take your business offline → online with process digitization and a technology roadmap.",
        items: ["Offline → Online", "Process Digitization", "Technology Roadmap"],
        graphic: "cluster",
        graphicIcons: [<MapPin key="m" className="w-7 h-7" />, <Globe key="g" className="w-4 h-4" />, <Sparkles key="sp" className="w-4 h-4" />],
        colSpan: 4,
      },
    ],
  },
];

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
    <div
      className={`${spanClass} flex flex-col p-8 bg-zinc-950 rounded-3xl border border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden relative group hover:border-white/10 transition-all duration-300`}
    >
      {/* subtle glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

      {renderGraphic()}

      {/* Icon + Title */}
      <div className="flex items-center gap-3 mb-3">
        <div className={`flex-shrink-0 ${card.accent}`}>{card.icon}</div>
        <h3 className="text-xl font-semibold text-zinc-100">{card.title}</h3>
      </div>

      <p className="text-zinc-400 text-sm leading-relaxed mb-5">{card.description}</p>

      {/* Sub-items */}
      <div className="mt-auto grid grid-cols-2 gap-x-4 gap-y-1.5">
        {card.items.map((item) => (
          <div key={item} className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Check className={`w-3 h-3 flex-shrink-0 ${card.accent}`} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Group section ────────────────────────────────────────────────────────────

function GroupSection({ group }: { group: Group }) {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center px-4 py-20 w-full max-w-6xl mx-auto">
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

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 w-full">
        {group.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>

      {/* section divider */}
      <div className="mt-20 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
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
