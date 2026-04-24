export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Radial gradient for the subtle spotlight */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-slate-800/20 blur-[120px] rounded-full" />
      
      {/* Tiny stars/particles simulation */}
      <div className="absolute top-[30%] left-[20%] w-0.5 h-0.5 bg-white/40 rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.4)]" />
      <div className="absolute top-[40%] left-[80%] w-1 h-1 bg-white/30 rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.3)]" />
      <div className="absolute top-[60%] left-[30%] w-[3px] h-[3px] bg-white/20 rounded-full shadow-[0_0_12px_3px_rgba(255,255,255,0.2)]" />
      <div className="absolute top-[70%] left-[60%] w-0.5 h-0.5 bg-white/40 rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.4)]" />
      <div className="absolute top-[85%] left-[25%] w-[2px] h-[2px] bg-white/20 rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.2)]" />
      <div className="absolute top-[80%] left-[75%] w-[1.5px] h-[1.5px] bg-white/50 rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.5)]" />
      
      {/* Bottom abstract blurred shapes */}
      <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-[#050505] to-transparent z-10" />
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-full max-w-5xl h-[300px] opacity-20 blur-[2px] flex items-end justify-center">
        {/* Simulated 3D stepped platforms */}
        <div className="w-[800px] h-[200px] bg-gradient-to-b from-zinc-700 to-transparent absolute bottom-0 rounded-[100%] blur-3xl transform scale-y-50 translate-y-1/2" />
        <div className="w-[600px] h-[150px] bg-gradient-to-b from-zinc-600 to-transparent absolute bottom-10 rounded-[100%] blur-2xl transform scale-y-50 translate-y-1/2" />
        <div className="w-[400px] h-[100px] bg-gradient-to-b from-zinc-500 to-transparent absolute bottom-20 rounded-[100%] blur-xl transform scale-y-50 translate-y-1/2" />
      </div>
    </div>
  );
}
