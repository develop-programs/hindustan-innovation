import { Command } from "lucide-react";

export function FloatingActionButton() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button className="flex items-center gap-2 bg-white text-black px-4 py-2.5 rounded-full text-sm font-semibold shadow-xl hover:bg-zinc-200 transition-colors border border-zinc-200">
        <Command className="w-4 h-4" />
        Edit Landio
      </button>
    </div>
  );
}
