"use client";

import { motion, type Variants } from "motion/react";
import { Activity } from "lucide-react";
import data from "@/data.json";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const IMAGE_MAP: Record<number, string> = {
  1: "https://framerusercontent.com/images/iWjIPE13Flu0JP6l05DPEJQ.png?width=1602&height=1048",
  2: "https://framerusercontent.com/images/NlShinj3SRLiU2GpzFKbH8loPs.png?width=1808&height=1124",
  3: "https://framerusercontent.com/images/T5LD7i0AQslhhwPvWrkU4ENnc.png?width=1536&height=1011",
};

export function ProcessSection() {
  const { pill, heading, headingItalic, subheading, steps } = data.process;

  return (
    <section className="relative z-10 flex flex-col items-center justify-center px-4 py-20 w-full max-w-6xl mx-auto mt-10" id="process">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={itemVariants}
        className="flex flex-col items-center text-center w-full"
      >
        <div className="flex items-center gap-2 mb-6 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-full px-4 py-1.5 shadow-lg">
          <Activity className="w-4 h-4 text-zinc-300" />
          <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">{pill}</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-4 text-center">
          {heading} <span className="font-serif italic font-light text-zinc-300">{headingItalic}</span>
        </h2>
        <p className="text-zinc-400 mb-16 text-lg text-center max-w-2xl">{subheading}</p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={itemVariants}
        className="w-full bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <Tabs defaultValue={steps[0].number} className="w-full">
          <TabsList className="flex items-center gap-4 mb-16 bg-transparent p-0 w-full h-auto">
            {steps.map((s) => (
              <TabsTrigger
                key={s.number}
                value={s.number}
                className="flex-1 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 bg-transparent text-zinc-600 hover:bg-white/5 hover:text-zinc-400 data-[state=active]:bg-[#151515] data-[state=active]:text-zinc-200 data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-white/5 outline-none"
              >
                STEP {s.step}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="relative" style={{ perspective: "1000px" }}>
            {steps.map((s) => (
              <TabsContent key={s.number} value={s.number} className="mt-0 w-full outline-none data-[state=inactive]:hidden">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                  {/* Dashboard Image */}
                  <div className="flex-1 w-full relative h-56 lg:h-110 flex items-center justify-center overflow-hidden">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, rotateY: 5, y: 20 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full h-full overflow-hidden"
                    >
                      <Image
                        src={IMAGE_MAP[s.step]}
                        alt={s.title}
                        className="w-full h-full object-contain object-center"
                        width={1920}
                        height={1080}
                        priority={s.step === 1}
                        decoding="async"
                      />
                    </motion.div>
                  </div>

                  {/* Text */}
                  <div className="flex-1 max-w-md">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <div className="text-zinc-600 font-serif italic text-xl mb-2 border-b border-zinc-800 pb-4 inline-block">{s.number}</div>
                      <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-4 mt-4">{s.title}</h3>
                      <p className="text-zinc-400 leading-relaxed text-sm md:text-base">{s.description}</p>
                    </motion.div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </motion.div>
    </section>
  );
}
