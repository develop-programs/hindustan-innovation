import { Star } from "lucide-react";
import data from "@/data.json";

/**
 * Renders the quote text, wrapping {italic} segments in serif italic spans.
 * Segments enclosed in {curly braces} are rendered in zinc-200 serif italic.
 */
function FormattedQuote({ text }: { text: string }) {
  const parts = text.split(/(\{[^}]+\})/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("{") && part.endsWith("}")) {
          return (
            <span key={i} className="font-serif italic text-zinc-200">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function QuoteSection() {
  const { pill, text, authorRole, authorAvatar } = data.quote;

  return (
    <section className="relative z-10 flex flex-col items-center justify-center px-4 py-24 w-full max-w-4xl mx-auto text-center mt-10">
      {/* Pill */}
      <div className="flex items-center gap-2 mb-10 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-full px-4 py-1.5 shadow-lg">
        <Star className="w-4 h-4 text-zinc-200 fill-zinc-200" />
        <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">
          {pill}
        </span>
      </div>

      {/* Quote Text */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.6] tracking-tight text-zinc-400 mb-12 max-w-3xl">
        <FormattedQuote text={text} />&quot;
      </h2>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full overflow-hidden bg-zinc-800 border border-white/10 shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={authorAvatar} alt={authorRole} className="w-full h-full object-cover" />
        </div>
        <span className="text-sm font-medium text-zinc-200">{authorRole}</span>
      </div>
    </section>
  );
}
